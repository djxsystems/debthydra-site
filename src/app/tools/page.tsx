import Link from "next/link";
import type { Metadata } from "next";
import { TOOL_CATALOG } from "@/lib/toolCatalog";

export const metadata: Metadata = {
  title: "Free Debt Calculators | DebtHydra",
  description:
    "Free debt payoff calculators - snowball, avalanche, auto loan, and emergency fund. Enter your numbers and get a real payoff plan in seconds.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 px-4 py-18 text-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-300 text-sm font-medium tracking-widest uppercase mb-5">
            Interactive payoff planning
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5 max-w-3xl">
            Free debt calculators that feel less like homework.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-teal-100">
            Enter your real numbers and get a clear, month-by-month plan. No sign-up needed, no
            locked results, and no vague “you should budget better” advice.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {TOOL_CATALOG.map((tool) => (
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
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${tool.color}`}
                >
                  {tool.icon}
                </div>
                <h2 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-1.5 leading-snug text-sm">
                  {tool.title}
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
