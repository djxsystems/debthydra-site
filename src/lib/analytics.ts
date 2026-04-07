import { track } from "@vercel/analytics";

type CalculatorName = "snowball" | "avalanche" | "auto_loan" | "emergency_fund";

function bucketCurrency(value: number) {
  if (value <= 0) return "0";
  if (value < 100) return "1-99";
  if (value < 500) return "100-499";
  if (value < 1000) return "500-999";
  if (value < 5000) return "1000-4999";
  return "5000+";
}

function bucketCount(value: number) {
  if (value <= 0) return "0";
  if (value === 1) return "1";
  if (value <= 3) return "2-3";
  if (value <= 5) return "4-5";
  return "6+";
}

function bucketMonths(value: number) {
  if (value < 12) return "<12";
  if (value < 24) return "12-23";
  if (value < 60) return "24-59";
  if (value < 120) return "60-119";
  return "120+";
}

function bucketMessageLength(value: number) {
  if (value < 100) return "<100";
  if (value < 300) return "100-299";
  if (value < 800) return "300-799";
  return "800+";
}

export function trackCalculatorStarted(
  calculator: CalculatorName,
  details?: {
    debtCount?: number;
  }
) {
  track("calculator_started", {
    calculator,
    debtCountBucket:
      typeof details?.debtCount === "number" ? bucketCount(details.debtCount) : undefined,
  });
}

export function trackCalculatorCompleted(
  calculator: CalculatorName,
  details: {
    debtCount?: number;
    monthlyExtra?: number;
    payoffMonths?: number;
    loanAmount?: number;
    targetBalance?: number;
    monthlyContribution?: number;
  }
) {
  track("calculator_completed", {
    calculator,
    debtCountBucket:
      typeof details.debtCount === "number" ? bucketCount(details.debtCount) : undefined,
    monthlyExtraBucket:
      typeof details.monthlyExtra === "number" ? bucketCurrency(details.monthlyExtra) : undefined,
    payoffMonthsBucket:
      typeof details.payoffMonths === "number" ? bucketMonths(details.payoffMonths) : undefined,
    loanAmountBucket:
      typeof details.loanAmount === "number" ? bucketCurrency(details.loanAmount) : undefined,
    targetBalanceBucket:
      typeof details.targetBalance === "number" ? bucketCurrency(details.targetBalance) : undefined,
    monthlyContributionBucket:
      typeof details.monthlyContribution === "number"
        ? bucketCurrency(details.monthlyContribution)
        : undefined,
  });
}

export function trackContactFormSubmitted(messageLength: number) {
  track("contact_form_submitted", {
    messageLengthBucket: bucketMessageLength(messageLength),
  });
}
