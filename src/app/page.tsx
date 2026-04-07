import Link from "next/link";
import type { Metadata } from "next";
import { getAllGuides } from "@/lib/guides";
import GuideCard from "@/components/guides/GuideCard";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "DebtHydra - Free Debt Payoff Calculators & Guides",
  description:
    "Practical, free tools to help you pay off credit cards, auto loans, and other debt faster. No fluff, no sales pitches - just clear math and honest advice.",
  alternates: { canonical: "/" },
};

const TOOLS = [
  {
    href: "/tools/debt-snowball-calculator",
    title: "Debt Snowball Calculator",
    description: "Pay off smallest balances first. Build momentum and stay motivated.",
    emoji: "❄️",
  },
  {
    href: "/tools/debt-avalanche-calculator",
    title: "Debt Avalanche Calculator",
    description: "Attack highest interest rates first. Save the most money overall.",
    emoji: "🏔️",
  },
  {
    href: "/tools/auto-loan-calculator",
    title: "Auto Loan Calculator",
    description: "See your exact monthly payment and total cost before you sign anything.",
    emoji: "🚗",
  },
  {
    href: "/tools/emergency-fund-calculator",
    title: "Emergency Fund Calculator",
    description: "Figure out how long it'll take to build a safety net while paying off debt.",
    emoji: "🛡️",
  },
  {
    href: "/tools/compare",
    title: "Snowball vs. Avalanche",
    description: "Run your debts through both methods at once and see exactly what you'd save.",
    emoji: "⚖️",
  },
];

export default function HomePage() {
  const guides = getAllGuides().slice(0, 3);

  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <section className="bg-gradient-to-br from-teal-700 to-teal-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Stop letting debt run your life.
          </h1>
          <p className="text-teal-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            DebtHydra gives you free, no-nonsense calculators and guides to understand your debt,
            make a real plan, and actually stick to it. No sign-up. No credit card. Just tools that
            work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors shadow"
            >
              Try a Calculator
            </Link>
            <Link
              href="/guides"
              className="border border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Read the Guides
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Calculators</h2>
          <p className="text-gray-500 mb-8">
            Pick your strategy and see exactly what it takes to get debt-free.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-teal-200 transition-all group"
              >
                <div className="text-3xl mb-3">{tool.emoji}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-1.5 leading-snug">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Trust DebtHydra</h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              DebtHydra is an independent educational site built to make debt math easier to
              understand. We aim to explain payoff tradeoffs clearly, disclose limitations plainly,
              and keep the tools usable without forcing people into a signup flow.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Transparent methodology</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The calculators use standard amortization and payoff formulas. They are educational
                estimates, not lender-issued payoff quotes.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Human-run and reachable</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                DebtHydra is actively maintained, and readers can send questions or corrections to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-700 underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Reviewed and updated</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Guides show published or updated dates so readers can judge freshness, especially on
                topics like rates, payoff timelines, and budgeting assumptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Featured Guides</h2>
                <p className="text-gray-500 text-sm">
                  Practical reads to help you make sense of your debt situation.
                </p>
              </div>
              <Link
                href="/guides"
                className="text-teal-600 font-semibold text-sm hover:text-teal-700"
              >
                All guides →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-amber-50 border-t border-amber-100 py-6 px-4">
        <div className="max-w-3xl mx-auto text-center text-sm text-amber-800">
          <strong>Heads up:</strong> DebtHydra provides estimates for educational purposes only -
          not financial, legal, or tax advice. Numbers may differ from your lender&apos;s actual
          terms.{" "}
          <Link href="/disclaimer" className="underline hover:text-amber-900">
            Full disclaimer
          </Link>
          .
        </div>
      </section>
    </>
  );
}
