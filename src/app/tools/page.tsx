import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Debt Calculators | DebtHydra",
  description:
    "Free debt payoff calculators — snowball, avalanche, auto loan, and emergency fund. Enter your numbers and get a real payoff plan in seconds.",
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  {
    href: "/tools/debt-snowball-calculator",
    title: "Debt Snowball Calculator",
    description:
      "List your debts, set an extra payment, and see exactly when each one gets paid off using the snowball method — smallest balance first.",
    emoji: "❄️",
    tag: "Popular",
  },
  {
    href: "/tools/debt-avalanche-calculator",
    title: "Debt Avalanche Calculator",
    description:
      "The mathematically optimal method: attack highest-interest debt first and pay the least amount of interest overall.",
    emoji: "🏔️",
    tag: "Best for savings",
  },
  {
    href: "/tools/auto-loan-calculator",
    title: "Auto Loan Calculator",
    description:
      "Calculate your exact monthly payment, total interest, and full amortisation schedule for any car loan.",
    emoji: "🚗",
    tag: null,
  },
  {
    href: "/tools/emergency-fund-calculator",
    title: "Emergency Fund Calculator",
    description:
      "See how long it'll take to hit your savings target with monthly contributions and compound interest from a HYSA.",
    emoji: "🛡️",
    tag: null,
  },
  {
    href: "/tools/compare",
    title: "Snowball vs. Avalanche Comparison",
    description:
      "Can't decide? Enter your debts once and see both methods side by side — payoff time, total interest, and the exact dollar difference.",
    emoji: "⚖️",
    tag: "New",
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Free Debt Calculators</h1>
      <p className="text-gray-500 mb-10 max-w-xl">
        Enter your real numbers and get a clear, month-by-month plan. No sign-up needed.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-7 hover:shadow-md hover:border-teal-200 transition-all group relative"
          >
            {tool.tag && (
              <span className="absolute top-4 right-4 text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                {tool.tag}
              </span>
            )}
            <div className="text-4xl mb-3">{tool.emoji}</div>
            <h2 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors text-lg mb-2 leading-snug">
              {tool.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
