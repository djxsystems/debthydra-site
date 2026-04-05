import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | DebtHydra",
  description: "Important disclaimer about DebtHydra's financial calculators and educational content.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
      <div className="prose text-sm space-y-4 text-gray-700">
        <p>
          <strong>Educational purposes only.</strong> The calculators, tools, and guides on
          DebtHydra are provided for educational and informational purposes only. They are not
          intended to constitute financial, legal, tax, or investment advice.
        </p>
        <p>
          <strong>Estimates, not guarantees.</strong> All calculations are estimates based on the
          inputs you provide and standard financial formulas. Actual loan balances, interest charges,
          payoff amounts, and timelines will vary based on your specific loan terms, lender policies,
          payment timing, fees, and other factors. Always verify important figures directly with your
          lender.
        </p>
        <p>
          <strong>Not a substitute for professional advice.</strong> No content on this site should
          be construed as a substitute for personalised advice from a qualified financial advisor,
          attorney, or accountant. Consult a licensed professional before making significant
          financial decisions.
        </p>
        <p>
          <strong>No warranty.</strong> DebtHydra makes no representations or warranties of any
          kind — express or implied — about the accuracy, completeness, or fitness for a particular
          purpose of any content on this site. We are not responsible for any losses, damages, or
          adverse outcomes that may result from reliance on the information provided.
        </p>
        <p>
          <strong>Rates and market conditions.</strong> Interest rates, savings yields, and other
          financial benchmarks change frequently. Information on this site may not reflect current
          market conditions.
        </p>
        <p>
          By using DebtHydra, you acknowledge that you have read, understood, and agree to this
          disclaimer.
        </p>
        <p className="text-xs text-gray-400 mt-6">Last updated: December 2024</p>
      </div>
    </div>
  );
}
