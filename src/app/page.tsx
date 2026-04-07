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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    color: "bg-teal-50 text-teal-600",
  },
  {
    href: "/tools/debt-avalanche-calculator",
    title: "Debt Avalanche Calculator",
    description: "Attack highest interest rates first. Save the most money overall.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    color: "bg-teal-50 text-teal-600",
  },
  {
    href: "/tools/auto-loan-calculator",
    title: "Auto Loan Calculator",
    description: "See your exact monthly payment and total cost before you sign anything.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h10l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <circle cx="7.5" cy="17" r="2.5" />
        <circle cx="16.5" cy="17" r="2.5" />
        <path d="M7.5 14.5v5M16.5 14.5v5" strokeWidth="0" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600",
  },
  {
    href: "/tools/emergency-fund-calculator",
    title: "Emergency Fund Calculator",
    description: "Figure out how long it'll take to build a safety net while paying off debt.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600",
  },
  {
    href: "/tools/compare",
    title: "Snowball vs. Avalanche",
    description: "Run your debts through both methods at once and see exactly what you'd save.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" />
      </svg>
    ),
    color: "bg-teal-50 text-teal-600",
    badge: "New",
  },
];

const TRUST_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Transparent methodology",
    body: "Standard amortization and payoff formulas. Educational estimates — not lender-issued payoff quotes.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Human-run and reachable",
    body: (
      <>
        Actively maintained. Questions or corrections go directly to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-700 underline">
          {CONTACT_EMAIL}
        </a>
        .
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Reviewed and updated",
    body: "Guides carry published dates so you can judge freshness on rate-sensitive topics like APRs and payoff timelines.",
  },
];

export default function HomePage() {
  const guides = getAllGuides().slice(0, 3);

  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 text-white py-20 px-4"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom right, #0f766e, #134e4a)",
          backgroundSize: "28px 28px, 100% 100%",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-300 text-sm font-medium tracking-widest uppercase mb-5">
            Free · No sign-up · No credit card
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight mb-6 max-w-3xl">
            Stop letting debt run your life.
          </h1>
          <p className="text-teal-100 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            Clear calculators and plain-language guides to help you make a real payoff plan — and
            actually stick to it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/tools"
              className="bg-amber-400 text-gray-900 font-semibold px-7 py-3.5 rounded-lg hover:bg-amber-300 transition-colors shadow-lg text-center"
            >
              Try a Calculator
            </Link>
            <Link
              href="/guides"
              className="border border-white/30 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              Read the Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl text-gray-900 mb-2">Free Calculators</h2>
          <p className="text-gray-500 mb-8">
            Pick your strategy and see exactly what it takes to get debt-free.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="relative bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg hover:border-teal-200 transition-all duration-200 group"
              >
                {tool.badge && (
                  <span className="absolute top-3 right-3 text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    {tool.badge}
                  </span>
                )}
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${tool.color}`}>
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-1.5 leading-snug text-sm">
                  {tool.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-white py-16 px-4 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl text-gray-900 mb-2">Why Trust DebtHydra</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            An independent educational site with no sales pitches, no sign-up walls, and no
            affiliation with any lender.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured guides */}
      {guides.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl text-gray-900 mb-1">Featured Guides</h2>
                <p className="text-gray-500 text-sm">
                  Practical reads to help you make sense of your debt situation.
                </p>
              </div>
              <Link
                href="/guides"
                className="text-teal-600 font-semibold text-sm hover:text-teal-700 whitespace-nowrap"
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

      {/* Disclaimer banner */}
      <section className="bg-amber-50 border-t border-amber-100 py-6 px-4">
        <div className="max-w-3xl mx-auto text-center text-sm text-amber-800">
          <strong>Heads up:</strong> DebtHydra provides estimates for educational purposes only —
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
