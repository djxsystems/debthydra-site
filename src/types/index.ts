// Debt and calculator types

export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // annual percentage, e.g. 19.99
  minimumPayment: number;
}

export interface PayoffMonth {
  month: number;
  debtId: string;
  debtName: string;
  startingBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
}

export interface DebtPayoffResult {
  schedule: PayoffMonth[];
  totalInterestPaid: number;
  totalPaid: number;
  payoffMonths: number;
  debtPayoffOrder: string[]; // debt names in order paid off
}

export interface AutoLoanResult {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  schedule: AutoLoanPaymentRow[];
}

export interface AutoLoanPaymentRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface EmergencyFundResult {
  months: number;
  totalContributions: number;
  totalInterestEarned: number;
  finalBalance: number;
  schedule: EmergencyFundRow[];
}

export interface EmergencyFundRow {
  month: number;
  contribution: number;
  interest: number;
  balance: number;
}

export interface GuideMetadata {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  tags: string[];
  relatedTools?: string[];
}
