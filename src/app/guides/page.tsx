import type { Metadata } from "next";
import { getAllGuides } from "@/lib/guides";
import GuideCard from "@/components/guides/GuideCard";

export const metadata: Metadata = {
  title: "Debt & Personal Finance Guides | DebtHydra",
  description:
    "Plain-language guides about debt payoff strategies, budgeting, interest rates, and building savings. No jargon, no upsells.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Guides</h1>
      <p className="text-gray-500 mb-10 max-w-xl">
        Practical reads to help you understand your debt, make a plan, and actually follow through.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </div>
  );
}
