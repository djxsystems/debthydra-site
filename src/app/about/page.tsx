import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About DebtHydra",
  description:
    "DebtHydra is a free, no-account-required set of debt management tools and guides. Built to help real people understand and pay off debt.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About DebtHydra</h1>

      <div className="prose text-sm space-y-4">
        <p>
          DebtHydra started with a simple frustration: most personal finance websites are trying to
          sell you something. Credit card offers, loan referrals, paid apps. The free tools are
          buried under upsells, and the advice is often designed to benefit the advertiser more than
          you.
        </p>
        <p>
          This site does one thing: gives you honest, accurate financial calculators and plain-language
          guides to help you understand your debt and make a real plan to eliminate it. No sign-up.
          No ads. No products to buy.
        </p>
        <p>
          The calculators use standard financial math — the same formulas banks use. The guides are
          written in plain English, not finance-speak. Everything is free to use, always.
        </p>
        <p>
          If you have debt, you deserve tools that work for you — not tools that make money off your
          situation. That&apos;s what DebtHydra is here to be.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">A note on accuracy</h2>
        <p>
          The numbers these tools produce are estimates. Real loan balances, interest calculations,
          and payoff amounts can differ based on your lender&apos;s specific terms, fees, and
          payment timing. Always verify important financial decisions with your actual lender or a
          qualified financial professional. See our{" "}
          <Link href="/disclaimer" className="text-teal-600 underline">
            full disclaimer
          </Link>
          .
        </p>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/tools"
          className="bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-teal-700 text-sm transition-colors"
        >
          Try a Calculator
        </Link>
        <Link
          href="/guides"
          className="border border-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50 text-sm transition-colors"
        >
          Read the Guides
        </Link>
      </div>
    </div>
  );
}
