import { describe, it, expect } from "vitest";
import {
  monthlyRate,
  calculateSnowball,
  calculateAvalanche,
  calculateAutoLoan,
  calculateEmergencyFund,
  formatCurrency,
  formatMonths,
} from "@/lib/calculators";
import type { Debt } from "@/types";

// ─── Helpers ───────────────────────────────────────────────���───────────────────

const SAMPLE_DEBTS: Debt[] = [
  { id: "1", name: "Card A", balance: 1000, interestRate: 20, minimumPayment: 30 },
  { id: "2", name: "Card B", balance: 3000, interestRate: 15, minimumPayment: 60 },
  { id: "3", name: "Loan", balance: 5000, interestRate: 10, minimumPayment: 120 },
];

// ─── monthlyRate ──────────────────────────────────────────────���────────────────

describe("monthlyRate", () => {
  it("converts 12% annual to 1% monthly", () => {
    expect(monthlyRate(12)).toBeCloseTo(0.01, 6);
  });

  it("returns 0 for 0%", () => {
    expect(monthlyRate(0)).toBe(0);
  });

  it("handles fractional rates", () => {
    expect(monthlyRate(24.99)).toBeCloseTo(24.99 / 100 / 12, 8);
  });
});

// ─── calculateAutoLoan ─────────────────────────────────────────────────────────

describe("calculateAutoLoan", () => {
  it("calculates the correct monthly payment for a known loan", () => {
    // $10,000 at 6% for 60 months → $193.33
    const result = calculateAutoLoan(10000, 6, 60);
    expect(result.monthlyPayment).toBeCloseTo(193.33, 0);
  });

  it("total paid = monthly payment × term (approximately)", () => {
    const result = calculateAutoLoan(10000, 6, 60);
    expect(result.totalPaid).toBeCloseTo(result.monthlyPayment * 60, 0);
  });

  it("total interest = total paid - principal", () => {
    const result = calculateAutoLoan(10000, 6, 60);
    expect(result.totalInterest).toBeCloseTo(result.totalPaid - 10000, 0);
  });

  it("generates the correct number of schedule rows", () => {
    const result = calculateAutoLoan(10000, 6, 60);
    expect(result.schedule).toHaveLength(60);
  });

  it("final balance in schedule is 0", () => {
    const result = calculateAutoLoan(10000, 6, 60);
    expect(result.schedule[result.schedule.length - 1].balance).toBeCloseTo(0, 0);
  });

  it("handles 0% interest", () => {
    const result = calculateAutoLoan(12000, 0, 12);
    expect(result.monthlyPayment).toBeCloseTo(1000, 0);
    expect(result.totalInterest).toBeCloseTo(0, 0);
  });
});

// ─── calculateSnowball ─────────────────────────────────────────────────────────

describe("calculateSnowball", () => {
  it("pays off smallest balance first", () => {
    const result = calculateSnowball(SAMPLE_DEBTS, 50);
    expect(result.debtPayoffOrder[0]).toBe("Card A"); // $1000 is smallest
  });

  it("returns a positive payoff month count", () => {
    const result = calculateSnowball(SAMPLE_DEBTS, 50);
    expect(result.payoffMonths).toBeGreaterThan(0);
  });

  it("total paid >= total of all balances", () => {
    const result = calculateSnowball(SAMPLE_DEBTS, 50);
    const totalBalance = SAMPLE_DEBTS.reduce((s, d) => s + d.balance, 0);
    expect(result.totalPaid).toBeGreaterThanOrEqual(totalBalance);
  });

  it("extra payment reduces payoff time vs no extra payment", () => {
    const withExtra = calculateSnowball(SAMPLE_DEBTS, 200);
    const withoutExtra = calculateSnowball(SAMPLE_DEBTS, 0);
    expect(withExtra.payoffMonths).toBeLessThan(withoutExtra.payoffMonths);
  });

  it("extra payment reduces total interest", () => {
    const withExtra = calculateSnowball(SAMPLE_DEBTS, 200);
    const withoutExtra = calculateSnowball(SAMPLE_DEBTS, 0);
    expect(withExtra.totalInterestPaid).toBeLessThan(withoutExtra.totalInterestPaid);
  });
});

// ─── calculateAvalanche ────────────────────────────────────────────────────────

describe("calculateAvalanche", () => {
  it("pays off highest interest rate first", () => {
    const result = calculateAvalanche(SAMPLE_DEBTS, 50);
    expect(result.debtPayoffOrder[0]).toBe("Card A"); // 20% is highest
  });

  it("avalanche pays less interest than snowball on these debts", () => {
    const avalanche = calculateAvalanche(SAMPLE_DEBTS, 100);
    const snowball = calculateSnowball(SAMPLE_DEBTS, 100);
    // Avalanche should pay equal or less interest (may be equal if highest rate = smallest balance)
    expect(avalanche.totalInterestPaid).toBeLessThanOrEqual(snowball.totalInterestPaid + 1);
  });

  it("payoff order is all 3 debts", () => {
    const result = calculateAvalanche(SAMPLE_DEBTS, 100);
    expect(result.debtPayoffOrder).toHaveLength(3);
  });
});

// ─── calculateEmergencyFund ────────────────────────────────────────────────────

describe("calculateEmergencyFund", () => {
  it("reaches target balance", () => {
    const result = calculateEmergencyFund(5000, 500, 4, 0);
    expect(result.finalBalance).toBeGreaterThanOrEqual(5000);
  });

  it("takes fewer months with higher contribution", () => {
    const slow = calculateEmergencyFund(5000, 200, 4, 0);
    const fast = calculateEmergencyFund(5000, 500, 4, 0);
    expect(fast.months).toBeLessThan(slow.months);
  });

  it("initial balance reduces months needed", () => {
    const fromZero = calculateEmergencyFund(5000, 300, 4, 0);
    const withHead = calculateEmergencyFund(5000, 300, 4, 2000);
    expect(withHead.months).toBeLessThan(fromZero.months);
  });

  it("earns some interest with nonzero rate", () => {
    const result = calculateEmergencyFund(5000, 500, 5, 0);
    expect(result.totalInterestEarned).toBeGreaterThan(0);
  });

  it("zero interest means interest earned is 0", () => {
    const result = calculateEmergencyFund(3000, 300, 0, 0);
    expect(result.totalInterestEarned).toBeCloseTo(0, 1);
  });
});

// ─── formatCurrency ────────────────────────────────────────────────────────────

describe("formatCurrency", () => {
  it("formats whole dollars", () => {
    expect(formatCurrency(1500)).toBe("$1,500");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("formats large amounts with comma", () => {
    expect(formatCurrency(10000)).toBe("$10,000");
  });
});

// ─── formatMonths ──────────────────────────────────────────────────────────────

describe("formatMonths", () => {
  it("shows months for < 12", () => {
    expect(formatMonths(6)).toBe("6 months");
    expect(formatMonths(1)).toBe("1 month");
  });

  it("shows years for exact multiples of 12", () => {
    expect(formatMonths(24)).toBe("2 years");
  });

  it("shows years and months for non-multiples", () => {
    expect(formatMonths(14)).toBe("1 year 2 mo");
  });
});
