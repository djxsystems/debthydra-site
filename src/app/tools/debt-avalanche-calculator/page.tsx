import type { Metadata } from "next";
import AvalancheCalculator from "@/components/calculators/AvalancheCalculator";
import Card from "@/components/ui/Card";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { calculatorSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Debt Avalanche Calculator — Pay Less Interest | DebtHydra",
  description:
    "The avalanche method attacks your highest-interest debt first, saving the most money overall. Calculate your debt-free date and total interest.",
};

const FAQS = [
  {
    question: "What is the debt avalanche method?",
    answer:
      "The debt avalanche method pays off debts in order of highest interest rate first, while making minimum payments on all others. Once the highest-rate debt is paid off, you roll that payment into the next highest-rate debt.",
  },
  {
    question: "Does the avalanche method always save the most money?",
    answer:
      "Yes — mathematically, paying off your highest-interest debt first minimises the total interest you pay. The savings compared to the snowball method can range from a few hundred to several thousand dollars depending on your debt amounts and rates.",
  },
  {
    question: "Why does the avalanche feel slow at first?",
    answer:
      "If your highest-rate debt is also a large balance, it can take months before you see a debt fully paid off. This is normal. The progress is happening — you're just seeing it in lower interest charges rather than a closed account.",
  },
  {
    question: "Can I switch from snowball to avalanche mid-plan?",
    answer:
      "Yes. Many people start with snowball to build momentum, then switch to avalanche once they've paid off a debt or two. Just rerun the calculator with your remaining balances to get an updated plan.",
  },
  {
    question: "What counts as my 'minimum payment'?",
    answer:
      "Your minimum payment is the smallest amount your lender requires each month to keep the account current. You can find it on your statement. For this calculator, enter that exact amount — the tool handles the math of rolling extra payments to your target debt.",
  },
];

export default function DebtAvalanchePage() {
  return (
    <>
      <JsonLd
        data={calculatorSchema({
          name: "Debt Avalanche Calculator",
          description:
            "Free debt avalanche calculator. Pay off highest-interest debts first to minimise total interest paid. See your exact payoff schedule.",
          url: "/tools/debt-avalanche-calculator",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Debt Avalanche Calculator</h1>
          <p className="text-gray-500 max-w-xl">
            Attack the highest-interest debt first and save the maximum amount of money on your way
            to debt freedom.
          </p>
        </div>

        <AvalancheCalculator />

        <div className="mt-10 space-y-5">
          <Card padding="lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How the Avalanche Method Works</h2>
            <div className="prose text-sm">
              <p>
                The avalanche method sorts your debts by{" "}
                <strong>interest rate — highest first</strong>. You pay minimums on everything and
                pour any extra money at the highest-rate debt until it&apos;s gone, then move on to
                the next.
              </p>
              <p>
                Mathematically, this is the most efficient strategy. You&apos;re eliminating the
                source of the most expensive interest as quickly as possible. Over time, this
                typically means paying less total interest and getting debt-free faster than with the
                snowball.
              </p>
              <h3>Is it better than snowball?</h3>
              <p>
                On paper, almost always. In practice, it depends on your personality. If you need
                quick wins to stay motivated, the{" "}
                <Link href="/tools/debt-snowball-calculator" className="text-teal-600 underline">
                  snowball
                </Link>{" "}
                may serve you better. Finishing more slowly with the right method beats giving up
                partway through the optimal one.
              </p>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What to Watch Out For</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <strong className="text-gray-800">Patience required:</strong> If your highest-rate
                debt is also a large balance, it can feel like nothing&apos;s happening for months.
                That&apos;s normal — stay the course.
              </li>
              <li>
                <strong className="text-gray-800">Variable rates:</strong> If any of your debts have
                variable rates (common on credit cards), rerun the calculator periodically.
              </li>
              <li>
                <strong className="text-gray-800">Estimates only:</strong> This tool doesn&apos;t
                account for fees, missed payments, or balance transfers. Your actual payoff will
                vary.
              </li>
            </ul>
          </Card>

          <Card padding="lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.question} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
