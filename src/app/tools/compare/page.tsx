import type { Metadata } from "next";
import CompareCalculator from "@/components/calculators/CompareCalculator";
import CalculatorIntro from "@/components/tools/CalculatorIntro";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { calculatorSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Snowball vs Avalanche Calculator - Compare Both Methods | DebtHydra",
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
        <div className="mb-4">
          <p className="text-sm text-teal-600 font-medium mb-1">
            <Link href="/tools" className="hover:underline">
              ← All Calculators
            </Link>
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700 mb-3">
            Decision helper
          </p>
        </div>

        <CalculatorIntro
          eyebrow="Snowball vs. Avalanche"
          title="Compare momentum versus savings with your real debt numbers."
          description="If you’re torn between the emotional lift of the snowball and the interest savings of the avalanche, this side-by-side view makes the decision much easier."
          bestFor="choosing between the two main payoff methods"
          highlights={["Single input", "Two outcomes", "Clear dollar tradeoff"]}
          asideTitle="What you’ll get"
          asideBody={
            <>
              Enter your debts once and DebtHydra will calculate both methods so you can compare
              total interest, payoff timeline, and the exact cost of choosing one path over the
              other.
            </>
          }
        />

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
