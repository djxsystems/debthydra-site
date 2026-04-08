import type { Metadata } from "next";
import EmergencyFundCalculator from "@/components/calculators/EmergencyFundCalculator";
import CalculatorIntro from "@/components/tools/CalculatorIntro";
import Card from "@/components/ui/Card";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { calculatorSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator - How Long to Save? | DebtHydra",
  description:
    "Find out how long it will take to build an emergency fund with your monthly contributions and a high-yield savings account.",
  alternates: { canonical: "/tools/emergency-fund-calculator" },
};

const FAQS = [
  {
    question: "How much should my emergency fund be?",
    answer:
      "Most financial experts recommend 3–6 months of living expenses. If you have a stable job and dual income, 3 months may be enough. If you're self-employed, have one income, or work in a volatile industry, aim for 6 months.",
  },
  {
    question: "Should I build an emergency fund or pay off debt first?",
    answer:
      "Both. The most common advice is to build a $1,000 starter emergency fund first, then attack debt aggressively. Once debt is paid off, build the full 3–6 month fund. A small emergency fund prevents you from going back into debt when something unexpected happens.",
  },
  {
    question: "Where should I keep my emergency fund?",
    answer:
      "A high-yield savings account (HYSA) at an online bank. These currently pay 4–5% APY — far more than traditional savings accounts — and your money is still accessible within 1–3 business days. Keep it separate from your checking account to avoid spending it.",
  },
  {
    question: "What counts as a 'monthly expense' for calculating my goal?",
    answer:
      "Include: rent/mortgage, utilities, groceries, transportation, insurance, and minimum debt payments. Don't include discretionary spending like dining out or entertainment — in a real emergency you'd cut those. Your goal is to cover true necessities.",
  },
  {
    question: "Does the interest rate matter much for savings?",
    answer:
      "It matters, but less than your monthly contribution. The difference between 1% and 5% APY on $5,000 is about $200/year. That said, there's no reason not to earn the higher rate — just open an HYSA and let it work for you.",
  },
];

export default function EmergencyFundPage() {
  return (
    <>
      <JsonLd
        data={calculatorSchema({
          name: "Emergency Fund Calculator",
          description:
            "Free emergency fund calculator. See how long it takes to reach your savings goal with monthly contributions and compound interest.",
          url: "/tools/emergency-fund-calculator",
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
            Stability-first planning
          </p>
        </div>

        <CalculatorIntro
          eyebrow="Emergency Fund Calculator"
          title="Build a cushion so one surprise expense doesn’t restart the debt cycle."
          description="A starter emergency fund can be the difference between steady debt progress and sliding backward the next time life gets expensive. This calculator shows how quickly that cushion can grow."
          bestFor="starter funds and HYSA planning"
          highlights={["Savings timeline", "Interest earned", "Goal-based planning"]}
          asideTitle="What you’ll get"
          asideBody={
            <>
              Model your target, monthly contribution, and savings rate to estimate how long it
              takes to hit your number and how much the account earns along the way.
            </>
          }
        />

        <EmergencyFundCalculator />

        <div className="mt-10 space-y-5">
          <Card padding="lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Why Build an Emergency Fund While in Debt?
            </h2>
            <div className="prose text-sm">
              <p>
                It sounds counterintuitive — shouldn&apos;t you throw every dollar at your debt?
                Here&apos;s the problem: without a cash cushion, the first unexpected expense (car
                repair, medical bill, job loss) goes straight onto a credit card and undoes months of
                progress.
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
                your contribution. The balance grows a little faster every month because each dollar
                earns interest for longer.
              </p>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What to Watch Out For</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <strong className="text-gray-800">High-yield savings accounts (HYSA):</strong>{" "}
                Regular savings accounts pay almost nothing. Online HYSAs currently offer 4–5% APY.
                Shop around.
              </li>
              <li>
                <strong className="text-gray-800">Rates change:</strong> Savings rates fluctuate
                with the Fed. The interest earned here is an estimate based on a fixed rate.
              </li>
              <li>
                <strong className="text-gray-800">Keep it liquid:</strong> An emergency fund should
                be in an accessible savings account, not invested in stocks or locked in a CD.
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
    </>
  );
}
