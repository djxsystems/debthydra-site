import type { Metadata } from "next";
import SnowballCalculator from "@/components/calculators/SnowballCalculator";
import Card from "@/components/ui/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Debt Snowball Calculator — Free Payoff Planner | DebtHydra",
  description:
    "Use the debt snowball method to pay off your debts smallest-balance first. Enter your debts and see a month-by-month payoff schedule.",
};

export default function DebtSnowballPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <p className="text-sm text-teal-600 font-medium mb-1">
          <Link href="/tools" className="hover:underline">
            ← All Calculators
          </Link>
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Debt Snowball Calculator</h1>
        <p className="text-gray-500 max-w-xl">
          List your debts, add any extra monthly payment, and see exactly when you&apos;ll be
          debt-free — month by month.
        </p>
      </div>

      <SnowballCalculator />

      {/* How it works */}
      <div className="mt-10 space-y-5">
        <Card padding="lg">
          <h2 className="text-xl font-bold text-gray-900 mb-3">How the Snowball Method Works</h2>
          <div className="prose text-sm">
            <p>
              The debt snowball method is simple: you pay off your{" "}
              <strong>smallest balance first</strong>, regardless of interest rate. Once that debt
              is gone, you take everything you were paying on it and roll it into the next-smallest
              debt.
            </p>
            <p>
              Here&apos;s why it works for a lot of people: paying off a debt completely —
              no matter how small — gives you a real win. That feeling of progress makes it way
              easier to stay motivated. Dave Ramsey popularised this method for a reason.
            </p>
            <h3>The math behind it</h3>
            <p>
              Each month, we calculate interest on each debt&apos;s remaining balance (
              <em>balance × monthly rate</em>), apply your minimum payments, and then throw any
              extra cash at the target debt. When a debt hits zero, its minimum payment gets
              redirected — that&apos;s the snowball rolling downhill.
            </p>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What to Watch Out For</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <strong className="text-gray-800">Snowball vs. avalanche:</strong> Snowball won&apos;t
              always save you the most interest. If your biggest debt also has the highest rate,
              consider the{" "}
              <Link href="/tools/debt-avalanche-calculator" className="text-teal-600 underline">
                avalanche method
              </Link>
              .
            </li>
            <li>
              <strong className="text-gray-800">Minimum payments matter:</strong> Make sure you
              never miss a minimum — late fees and penalty rates can derail your plan fast.
            </li>
            <li>
              <strong className="text-gray-800">This is an estimate:</strong> Actual payoff
              timelines vary with fees, variable rates, and payment timing. Always verify with your
              lender.
            </li>
          </ul>
        </Card>

        <p className="text-xs text-gray-400">
          Want to compare methods?{" "}
          <Link href="/guides/debt-snowball-vs-avalanche" className="text-teal-600 hover:underline">
            Read: Snowball vs. Avalanche — which is right for you?
          </Link>
        </p>
      </div>
    </div>
  );
}
