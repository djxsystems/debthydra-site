/**
 * Core financial calculation logic for DebtHydra.
 *
 * All functions are pure — no side effects, no UI dependencies.
 * This makes them easy to unit-test and reuse across calculators.
 */

import type {
  Debt,
  DebtPayoffResult,
  PayoffMonth,
  AutoLoanResult,
  AutoLoanPaymentRow,
  EmergencyFundResult,
  EmergencyFundRow,
} from "@/types";

// ─── Shared helpers ────────────────────────────────────────────────────────────

/** Convert an annual interest rate (%) to a monthly decimal rate */
export function monthlyRate(annualRatePercent: number): number {
  return annualRatePercent / 100 / 12;
}

// ─── Debt Snowball ─────────────────────────────────────────────────────────────

/**
 * Debt snowball: pay off smallest balance first, then roll payments forward.
 *
 * Algorithm:
 * 1. Sort debts by balance ascending.
 * 2. Each month, pay minimums on all debts.
 * 3. Any extra payment goes to the smallest remaining balance.
 * 4. When a debt is paid off, its payment amount is added to the next debt.
 */
export function calculateSnowball(
  debts: Debt[],
  extraMonthlyPayment: number = 0
): DebtPayoffResult {
  return runPayoffSchedule([...debts].sort((a, b) => a.balance - b.balance), extraMonthlyPayment);
}

// ─── Debt Avalanche ────────────────────────────────────────────────────────────

/**
 * Debt avalanche: pay off highest interest rate first, then roll payments forward.
 * Mathematically optimal — minimises total interest paid.
 */
export function calculateAvalanche(
  debts: Debt[],
  extraMonthlyPayment: number = 0
): DebtPayoffResult {
  return runPayoffSchedule(
    [...debts].sort((a, b) => b.interestRate - a.interestRate),
    extraMonthlyPayment
  );
}

/**
 * Shared payoff engine used by both snowball and avalanche.
 * @param orderedDebts - Debts pre-sorted in target payoff order
 * @param extraPayment - Additional monthly payment on top of minimums
 */
function runPayoffSchedule(orderedDebts: Debt[], extraPayment: number): DebtPayoffResult {
  // Work with mutable balances
  const balances = orderedDebts.map((d) => d.balance);
  const schedule: PayoffMonth[] = [];
  let totalInterestPaid = 0;
  let totalPaid = 0;
  const debtPayoffOrder: string[] = [];
  let month = 0;
  const MAX_MONTHS = 600; // 50-year safety limit

  while (balances.some((b) => b > 0.005) && month < MAX_MONTHS) {
    month++;
    let remainingExtra = extraPayment;

    // First, apply minimums to all debts and collect freed-up payments
    for (let i = 0; i < orderedDebts.length; i++) {
      if (balances[i] <= 0.005) continue;

      const rate = monthlyRate(orderedDebts[i].interestRate);
      const interest = balances[i] * rate;
      const minPay = Math.min(orderedDebts[i].minimumPayment, balances[i] + interest);
      const principal = Math.max(0, minPay - interest);

      balances[i] = Math.max(0, balances[i] - principal);
      totalInterestPaid += interest;
      totalPaid += minPay;

      schedule.push({
        month,
        debtId: orderedDebts[i].id,
        debtName: orderedDebts[i].name,
        startingBalance: balances[i] + principal,
        payment: minPay,
        principal,
        interest,
        endingBalance: balances[i],
      });
    }

    // Then apply extra payment + freed minimums to the first unpaid debt (target debt)
    // Freed minimums from paid-off debts roll forward automatically because
    // we just apply remainingExtra to the first non-zero balance.
    // Recalculate freed amounts by checking which debts were paid off this month.
    for (let i = 0; i < orderedDebts.length; i++) {
      if (balances[i] <= 0.005 && !debtPayoffOrder.includes(orderedDebts[i].name)) {
        debtPayoffOrder.push(orderedDebts[i].name);
        remainingExtra += orderedDebts[i].minimumPayment;
      }
    }

    // Apply remaining extra to the focus (first unpaid) debt
    for (let i = 0; i < orderedDebts.length; i++) {
      if (balances[i] > 0.005 && remainingExtra > 0) {
        const rate = monthlyRate(orderedDebts[i].interestRate);
        const interest = balances[i] * rate;
        const extraPrincipal = Math.min(remainingExtra, balances[i]);
        balances[i] = Math.max(0, balances[i] - extraPrincipal);
        totalPaid += extraPrincipal;
        totalInterestPaid += interest; // already counted above, this is the delta
        remainingExtra = 0;

        // Update the schedule entry for this debt/month
        const entry = schedule.findLast(
          (e) => e.month === month && e.debtId === orderedDebts[i].id
        );
        if (entry) {
          entry.payment += extraPrincipal;
          entry.principal += extraPrincipal;
          entry.endingBalance = balances[i];
        }
        break;
      }
    }
  }

  return {
    schedule,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    payoffMonths: month,
    debtPayoffOrder,
  };
}

// ─── Auto Loan Calculator ──────────────────────────────────────────────────────

/**
 * Standard amortising auto loan.
 * Uses the annuity formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateAutoLoan(
  principal: number,
  annualRatePercent: number,
  termMonths: number
): AutoLoanResult {
  const r = monthlyRate(annualRatePercent);
  let monthlyPayment: number;

  if (r === 0) {
    monthlyPayment = principal / termMonths;
  } else {
    monthlyPayment = (principal * (r * Math.pow(1 + r, termMonths))) / (Math.pow(1 + r, termMonths) - 1);
  }

  const schedule: AutoLoanPaymentRow[] = [];
  let balance = principal;
  let totalInterest = 0;

  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * r;
    const payment = month === termMonths ? balance + interest : monthlyPayment;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;

    schedule.push({
      month,
      payment: Math.round(payment * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPaid: Math.round(monthlyPayment * termMonths * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    schedule,
  };
}

// ─── Emergency Fund Growth Calculator ─────────────────────────────────────────

/**
 * Models a savings account growing via regular monthly contributions
 * and compound interest (monthly compounding).
 */
export function calculateEmergencyFund(
  targetBalance: number,
  monthlyContribution: number,
  annualRatePercent: number,
  initialBalance: number = 0
): EmergencyFundResult {
  const r = monthlyRate(annualRatePercent);
  const schedule: EmergencyFundRow[] = [];
  let balance = initialBalance;
  let totalContributions = 0;
  let totalInterestEarned = 0;
  let months = 0;
  const MAX_MONTHS = 600;

  while (balance < targetBalance && months < MAX_MONTHS) {
    months++;
    const interest = balance * r;
    balance = balance + monthlyContribution + interest;
    totalContributions += monthlyContribution;
    totalInterestEarned += interest;

    schedule.push({
      month: months,
      contribution: monthlyContribution,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }

  return {
    months,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    finalBalance: Math.round(balance * 100) / 100,
    schedule,
  };
}

// ─── Formatting helpers ────────────────────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMonths(months: number): string {
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const yr = `${years} year${years === 1 ? "" : "s"}`;
  return rem > 0 ? `${yr} ${rem} mo` : yr;
}
