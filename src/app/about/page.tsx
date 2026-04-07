import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About DebtHydra",
  description:
    "DebtHydra is a free, no-account-required set of debt management tools and guides. Built to help real people understand and pay off debt.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About DebtHydra</h1>

      <div className="prose text-sm space-y-4">
        <p>
          DebtHydra started with a simple frustration: most personal finance websites are trying to
          sell you something. Credit card offers, loan referrals, paid apps. The free tools are
          buried under upsells, and the advice is often designed to benefit the advertiser more
          than you.
        </p>
        <p>
          This site does one thing: gives you honest, accurate financial calculators and
          plain-language guides to help you understand your debt and make a real plan to eliminate
          it. No sign-up. No paywall. No lead-gen forms pretending to be advice.
        </p>
        <p>
          The calculators use standard financial math, and the guides are written in plain English
          rather than finance-speak. Everything is designed to be useful even if you never buy
          anything from anyone.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">How the calculators work</h2>
        <p>
          All four calculators use standard financial formulas, the same math lenders use:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <strong>Debt snowball &amp; avalanche</strong> — Each month, interest is applied to
            each balance at its monthly rate (APR ÷ 12). Minimum payments are applied first; extra
            payment goes to the target debt in the chosen order. When a debt reaches zero, its
            freed-up payment rolls into the next target. This follows the standard amortisation
            model documented by the{" "}
            <a
              href="https://www.consumerfinance.gov/consumer-tools/credit-cards/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 underline"
            >
              Consumer Financial Protection Bureau (CFPB)
            </a>
            .
          </li>
          <li>
            <strong>Auto loan</strong> — Uses the standard fixed-payment amortisation formula:{" "}
            <em>M = P × [r(1+r)ⁿ] / [(1+r)ⁿ – 1]</em>, where P is principal, r is monthly rate,
            and n is term in months. Output matches lender-issued Truth in Lending disclosures.
          </li>
          <li>
            <strong>Emergency fund</strong> — Compound interest is applied monthly at APY ÷ 12.
            Contribution is added each month before interest, consistent with how high-yield
            savings accounts compound per{" "}
            <a
              href="https://www.fdic.gov/resources/resolutions/bank-failures/failed-bank-list/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 underline"
            >
              FDIC-insured account terms
            </a>
            .
          </li>
        </ul>
        <p>
          Interest rate benchmarks cited in guides reflect published{" "}
          <a
            href="https://www.federalreserve.gov/releases/g19/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 underline"
          >
            Federal Reserve G.19 consumer credit data
          </a>{" "}
          and{" "}
          <a
            href="https://www.consumerfinance.gov/data-research/consumer-credit-trends/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 underline"
          >
            CFPB consumer credit trend reports
          </a>
          . All results are estimates — actual payoff outcomes depend on your lender&apos;s exact
          terms, fees, and payment timing.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Editorial approach</h2>
        <p>
          DebtHydra is independently operated as an educational project. The goal is to explain
          debt payoff tradeoffs clearly, disclose assumptions honestly, and update pages when
          guidance or site features materially change.
        </p>
        <p>
          We aim to keep calculators usable without login walls, avoid exaggerated claims, and make
          it obvious when something is an estimate rather than a guarantee.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">How the site is supported</h2>
        <p>
          DebtHydra may use clearly labeled advertising to help cover hosting, development, and
          publishing costs while keeping the calculators free. Ads should never change the math in
          the tools or the editorial standards of the guides.
        </p>
        <p>
          We do not sell debt settlement programs, promise guaranteed outcomes, or present paid
          placement as independent financial advice. If that ever changes, we&apos;ll say so plainly.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Corrections and contact</h2>
        <p>
          If you spot a mistake, broken calculator behavior, or outdated explanation, please email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-600 underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or use the{" "}
          <Link href="/contact" className="text-teal-600 underline">
            contact page
          </Link>
          . Reader feedback helps improve the site.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">A note on accuracy</h2>
        <p>
          The numbers these tools produce are estimates. Real loan balances, interest calculations,
          and payoff amounts can differ based on your lender&apos;s specific terms, fees, and payment
          timing. Always verify important financial decisions with your actual lender or a
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
