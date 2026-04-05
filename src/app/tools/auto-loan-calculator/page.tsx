import type { Metadata } from "next";
import AutoLoanCalculator from "@/components/calculators/AutoLoanCalculator";
import Card from "@/components/ui/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auto Loan Calculator — Monthly Payment & Total Cost | DebtHydra",
  description:
    "Calculate your exact monthly car payment, total interest, and full amortisation schedule. Know the real cost before you sign.",
};

export default function AutoLoanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <p className="text-sm text-teal-600 font-medium mb-1">
          <Link href="/tools" className="hover:underline">
            ← All Calculators
          </Link>
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Auto Loan Calculator</h1>
        <p className="text-gray-500 max-w-xl">
          See your monthly payment, total interest, and the full breakdown before committing to a
          car loan.
        </p>
      </div>

      <AutoLoanCalculator />

      <div className="mt-10 space-y-5">
        <Card padding="lg">
          <h2 className="text-xl font-bold text-gray-900 mb-3">How Auto Loan Interest Works</h2>
          <div className="prose text-sm">
            <p>
              Auto loans use <strong>simple interest amortisation</strong>. That means every month,
              you pay interest on the remaining balance — so early payments are mostly interest, and
              later payments are mostly principal.
            </p>
            <p>
              The formula for your monthly payment is:{" "}
              <em>M = P × [r(1+r)^n] / [(1+r)^n - 1]</em>, where <em>P</em> is the loan amount,{" "}
              <em>r</em> is the monthly interest rate, and <em>n</em> is the number of payments.
            </p>
            <h3>Longer term = lower payment, more interest</h3>
            <p>
              A 72-month loan has a lower payment than a 48-month loan on the same amount, but
              you&apos;ll pay significantly more interest total. Run both scenarios to see the
              trade-off.
            </p>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What to Watch Out For</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <strong className="text-gray-800">Down payment matters:</strong> A bigger down
              payment reduces your principal, your payment, and the total interest you&apos;ll pay.
            </li>
            <li>
              <strong className="text-gray-800">Dealer rate vs. credit union rate:</strong>{" "}
              Dealership financing often adds a markup. Check your credit union or bank first.
            </li>
            <li>
              <strong className="text-gray-800">Gap insurance and add-ons:</strong> These get rolled
              into the loan amount by dealers. Make sure your loan amount reflects the actual
              purchase price.
            </li>
            <li>
              <strong className="text-gray-800">Estimates only:</strong> Actual lender terms,
              fees, and payoff amounts may differ.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
