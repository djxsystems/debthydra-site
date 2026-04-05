import type { Metadata } from "next";
import EmergencyFundCalculator from "@/components/calculators/EmergencyFundCalculator";
import Card from "@/components/ui/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator — How Long to Save? | DebtHydra",
  description:
    "Find out how long it will take to build an emergency fund with your monthly contributions and a high-yield savings account.",
};

export default function EmergencyFundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <p className="text-sm text-teal-600 font-medium mb-1">
          <Link href="/tools" className="hover:underline">
            ← All Calculators
          </Link>
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Fund Calculator</h1>
        <p className="text-gray-500 max-w-xl">
          Building a safety net while you pay down debt is one of the smartest moves you can make.
          See how long it takes to hit your goal.
        </p>
      </div>

      <EmergencyFundCalculator />

      <div className="mt-10 space-y-5">
        <Card padding="lg">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Why Build an Emergency Fund While in Debt?
          </h2>
          <div className="prose text-sm">
            <p>
              It sounds counterintuitive — shouldn&apos;t you throw every dollar at your debt? Here&apos;s
              the problem: without a cash cushion, the first unexpected expense (car repair, medical
              bill, job loss) goes straight onto a credit card and undoes months of progress.
            </p>
            <p>
              Most financial coaches recommend a <strong>$1,000 starter emergency fund</strong>{" "}
              before aggressively paying down debt. Once you&apos;re debt-free (except maybe
              mortgage), build it up to 3–6 months of expenses.
            </p>
            <h3>How the math works</h3>
            <p>
              This calculator models monthly compounding — the same way most high-yield savings
              accounts work. Interest is calculated on the running balance each month, and you add
              your contribution. The balance grows a little faster every month because each
              dollar earns interest for longer.
            </p>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What to Watch Out For</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <strong className="text-gray-800">High-yield savings accounts (HYSA):</strong> Regular
              savings accounts pay almost nothing. Online HYSAs currently offer 4–5% APY. Shop
              around.
            </li>
            <li>
              <strong className="text-gray-800">Rates change:</strong> Savings rates fluctuate with
              the Fed. The interest earned here is an estimate based on a fixed rate.
            </li>
            <li>
              <strong className="text-gray-800">Keep it liquid:</strong> An emergency fund should be
              in an accessible savings account, not invested in stocks or locked in a CD.
            </li>
          </ul>
        </Card>

        <p className="text-xs text-gray-400">
          Also see:{" "}
          <Link
            href="/guides/building-emergency-fund-while-in-debt"
            className="text-teal-600 hover:underline"
          >
            Building an emergency fund while paying off debt
          </Link>
        </p>
      </div>
    </div>
  );
}
