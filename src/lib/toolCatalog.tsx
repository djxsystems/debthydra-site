import type { ReactNode } from "react";

export interface ToolDefinition {
  href: string;
  title: string;
  description: string;
  color: string;
  badge?: string;
  icon: ReactNode;
}

export const TOOL_CATALOG: ToolDefinition[] = [
  {
    href: "/tools/debt-snowball-calculator",
    title: "Debt Snowball Calculator",
    description: "Pay off smallest balances first. Build momentum and stay motivated.",
    color: "bg-teal-50 text-teal-600",
    badge: "Popular",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    href: "/tools/debt-avalanche-calculator",
    title: "Debt Avalanche Calculator",
    description: "Attack highest interest rates first. Save the most money overall.",
    color: "bg-teal-50 text-teal-600",
    badge: "Best for savings",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    href: "/tools/auto-loan-calculator",
    title: "Auto Loan Calculator",
    description: "See your exact monthly payment and total cost before you sign anything.",
    color: "bg-amber-50 text-amber-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h10l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <circle cx="7.5" cy="17" r="2.5" />
        <circle cx="16.5" cy="17" r="2.5" />
        <path d="M7.5 14.5v5M16.5 14.5v5" strokeWidth="0" />
      </svg>
    ),
  },
  {
    href: "/tools/emergency-fund-calculator",
    title: "Emergency Fund Calculator",
    description: "Figure out how long it'll take to build a safety net while paying off debt.",
    color: "bg-amber-50 text-amber-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    href: "/tools/compare",
    title: "Snowball vs. Avalanche",
    description: "Run your debts through both methods at once and see exactly what you'd save.",
    color: "bg-teal-50 text-teal-600",
    badge: "New",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" />
      </svg>
    ),
  },
];
