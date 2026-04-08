import type { Metadata } from "next";
import AutoLoanCalculator from "@/components/calculators/AutoLoanCalculator";
import CalculatorIntro from "@/components/tools/CalculatorIntro";
import Card from "@/components/ui/Card";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { calculatorSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Auto Loan Calculator - Monthly Payment & Total Cost | DebtHydra",
  description:
    "Calculate your exact monthly car payment, total interest, and full amortisation schedule. Know the real cost before you sign.",
  alternates: { canonical: "/tools/auto-loan-calculator" },
};

const FAQS = [
  {
    question: "How is my monthly car payment calculated?",
    answer:
      "Your monthly payment uses the standard loan amortisation formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is your loan amount, r is your monthly interest rate (APR ÷ 12), and n is the number of months. This is the same formula all lenders use.",
  },
  {
    question: "What is a good interest rate for a car loan?",
    answer:
      "As of 2024–2025, good credit borrowers (700+ score) typically see rates of 5–7% for new cars and 7–10% for used cars. Rates below 4% are excellent. Above 15% usually means higher-risk credit — consider improving your score or saving a larger down payment first.",
  },
  {
    question: "Is a longer loan term better?",
    answer:
      "A longer term (e.g., 72 or 84 months) gives you a lower monthly payment, but you pay significantly more interest total and risk going 'underwater' — owing more than the car is worth. A 48–60 month term is generally the sweet spot.",
  },
  {
    question: "Should I put a down payment on a car?",
    answer:
      "Yes, if you can. A larger down payment means a smaller loan, lower monthly payment, and less total interest. It also reduces the risk of being upside-down on the loan. Aim for at least 10–20% down.",
  },
  {
    question: "Can I pay off a car loan early?",
    answer:
      "Most auto loans have no prepayment penalty, so you can pay extra or pay it off entirely whenever you want. Every extra dollar of principal you pay reduces future interest charges. Check your loan agreement to confirm there's no prepayment fee.",
  },
  {
    question: "What's the difference between APR and interest rate on a car loan?",
    answer:
      "The interest rate is the base cost of borrowing. APR (Annual Percentage Rate) includes the interest rate plus any fees, making it a more complete picture of the loan's true cost. For auto loans, these are often the same or very close — but always compare APR when shopping rates.",
  },
];

export default function AutoLoanPage() {
  return (
    <>
      <JsonLd
        data={calculatorSchema({
          name: "Auto Loan Calculator",
          description:
            "Free auto loan calculator. Calculate your monthly car payment, total interest, and full amortisation schedule before you sign.",
          url: "/tools/auto-loan-calculator",
          faqs: FAQS,
        })}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-4">
          <p className="text-sm text-teal-600 font-medium mb-1">
            <Link href="/tools" className="hover:underline">
              ← All Calculators
            </Link>
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700 mb-3">
            Before-you-sign calculator
          </p>
        </div>

        <CalculatorIntro
          eyebrow="Auto Loan Calculator"
          title="See the true cost of the loan, not just the monthly payment."
          description="Dealer financing can make a long loan term feel affordable while quietly adding thousands in interest. This calculator helps you compare the tradeoff before you agree to the note."
          bestFor="shopping car loans and term comparisons"
          highlights={["Monthly payment", "Total interest", "Full amortization schedule"]}
          asideTitle="What you’ll get"
          asideBody={
            <>
              Test different rates and term lengths instantly. You’ll see how a lower payment can
              still mean a much more expensive loan over time.
            </>
          }
        />

        <AutoLoanCalculator />

        <div className="mt-10 space-y-5">
          <Card padding="lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How Auto Loan Interest Works</h2>
            <div className="prose text-sm">
              <p>
                Auto loans use <strong>simple interest amortisation</strong>. That means every
                month, you pay interest on the remaining balance — so early payments are mostly
                interest, and later payments are mostly principal.
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
                payment reduces your principal, your monthly payment, and total interest.
              </li>
              <li>
                <strong className="text-gray-800">Compare financing sources:</strong> Dealer rates
                are not always the cheapest option. Check a credit union or bank too.
              </li>
              <li>
                <strong className="text-gray-800">Gap insurance and add-ons:</strong> These get
                rolled into the loan amount by dealers. Make sure your loan amount reflects the
                actual purchase price.
              </li>
              <li>
                <strong className="text-gray-800">Estimates only:</strong> Actual lender terms,
                fees, and payoff amounts may differ.
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
