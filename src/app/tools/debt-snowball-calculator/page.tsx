import type { Metadata } from "next";
import SnowballCalculator from "@/components/calculators/SnowballCalculator";
import Card from "@/components/ui/Card";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { calculatorSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Debt Snowball Calculator — Free Payoff Planner | DebtHydra",
  description:
    "Use the debt snowball method to pay off your debts smallest-balance first. Enter your debts and see a month-by-month payoff schedule.",
};

const FAQS = [
  {
    question: "What is the debt snowball method?",
    answer:
      "The debt snowball method is a debt payoff strategy where you pay off your smallest balance first, regardless of interest rate. Once that debt is paid off, you roll its payment into the next-smallest debt. This creates a 'snowball' effect of growing payments.",
  },
  {
    question: "Is the debt snowball or debt avalanche better?",
    answer:
      "The avalanche method saves more money in interest. The snowball method provides quicker psychological wins that help many people stay motivated. The best method is the one you'll actually stick with.",
  },
  {
    question: "How much extra should I pay each month?",
    answer:
      "Even $50–$100 extra per month can cut years off your payoff timeline. Try different amounts in the calculator to see the impact. Any amount above your minimums helps.",
  },
  {
    question: "What if I can only afford minimum payments?",
    answer:
      "You'll still pay off all your debts eventually — it'll just take longer and cost more in interest. Focus on finding even a small extra amount to apply. Cutting one subscription or eating out one less time per week can free up $20–$50/month.",
  },
  {
    question: "How accurate is this calculator?",
    answer:
      "It uses the same standard amortisation math banks use. Results are estimates — your actual payoff may vary based on your lender's exact terms, payment timing, fees, and any rate changes.",
  },
];

export default function DebtSnowballPage() {
  return (
    <>
      <JsonLd
        data={calculatorSchema({
          name: "Debt Snowball Calculator",
          description:
            "Free debt snowball payoff calculator. Enter your debts and see a month-by-month payoff schedule using the smallest-balance-first method.",
          url: "/tools/debt-snowball-calculator",
          faqs: FAQS,
        })}
      />

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
                Here&apos;s why it works for a lot of people: paying off a debt completely — no
                matter how small — gives you a real win. That feeling of progress makes it way easier
                to stay motivated. Dave Ramsey popularised this method for a reason.
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
                <strong className="text-gray-800">Snowball vs. avalanche:</strong> Snowball
                won&apos;t always save you the most interest. If your biggest debt also has the
                highest rate, consider the{" "}
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

          {/* FAQ */}
          <Card padding="lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.question} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>

          <p className="text-xs text-gray-400">
            Want to compare methods?{" "}
            <Link href="/guides/debt-snowball-vs-avalanche" className="text-teal-600 hover:underline">
              Read: Snowball vs. Avalanche — which is right for you?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
