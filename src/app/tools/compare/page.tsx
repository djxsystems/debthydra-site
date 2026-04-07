import type { Metadata } from "next";
import CompareCalculator from "@/components/calculators/CompareCalculator";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { calculatorSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Snowball vs Avalanche Calculator — Compare Both Methods | DebtHydra",
  description:
    "Run your debts through both the snowball and avalanche methods at once. See the difference in payoff time and total interest side by side.",
  alternates: { canonical: "/tools/compare" },
};

const SCHEMA = calculatorSchema({
  name: "Debt Payoff Method Comparison Calculator",
  description:
    "Compare the debt snowball and debt avalanche methods side by side using your real balances, rates, and minimum payments.",
  url: "/tools/compare",
});

export default function ComparePage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          <p className="text-sm text-teal-600 font-medium mb-1">
            <Link href="/tools" className="hover:underline">
              ← All Calculators
            </Link>
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Snowball vs. Avalanche — Compare Both
          </h1>
          <p className="text-gray-500 max-w-xl">
            Enter your debts once and see both strategies side by side — which pays off faster,
            which saves more interest, and exactly what the tradeoff is.
          </p>
        </div>

        <CompareCalculator />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-gray-800 mb-1">Snowball method</p>
            <p>
              Pays off the <strong>smallest balance first</strong>. Gives you the fastest early
              wins. Good if motivation is your challenge.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-gray-800 mb-1">Avalanche method</p>
            <p>
              Pays off the <strong>highest interest rate first</strong>. Saves the most money
              overall. Good if you can stay disciplined without quick wins.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Want a deeper breakdown?{" "}
          <Link
            href="/guides/debt-snowball-vs-avalanche"
            className="text-teal-600 hover:underline"
          >
            Read: Snowball vs. Avalanche — which is right for you?
          </Link>
        </p>
      </div>
    </>
  );
}
