import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

const TOOL_LINKS = [
  { href: "/tools/debt-snowball-calculator", label: "Debt Snowball Calculator" },
  { href: "/tools/debt-avalanche-calculator", label: "Debt Avalanche Calculator" },
  { href: "/tools/auto-loan-calculator", label: "Auto Loan Calculator" },
  { href: "/tools/emergency-fund-calculator", label: "Emergency Fund Calculator" },
];

const GUIDE_LINKS = [
  { href: "/guides/debt-snowball-vs-avalanche", label: "Snowball vs Avalanche" },
  { href: "/guides/how-to-budget-for-debt-repayment", label: "Budget for Debt Repayment" },
  { href: "/guides/getting-out-of-credit-card-debt", label: "Get Out of Credit Card Debt" },
];

const SITE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-teal-600 flex items-center justify-center text-white font-bold text-xs">
                DH
              </div>
              <span className="font-bold text-white text-lg">
                Debt<span className="text-teal-400">Hydra</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-3">
              Free tools and plain-language guides to help you understand and pay off debt faster.
            </p>
            <p className="text-sm">
              Questions or corrections?{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-300 hover:text-teal-200 underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">
              Calculators
            </h3>
            <ul className="space-y-2">
              {TOOL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-teal-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">
              Guides
            </h3>
            <ul className="space-y-2">
              {GUIDE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-teal-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Site</h3>
            <ul className="space-y-2">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-teal-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} DebtHydra. Educational purposes only.</p>
          <p className="text-center sm:text-right max-w-md">
            DebtHydra provides estimates for educational purposes and is{" "}
            <strong className="text-gray-400">not financial advice</strong>. Always consult a
            qualified professional for personalized guidance.{" "}
            <Link href="/disclaimer" className="underline hover:text-teal-400">
              Full disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
