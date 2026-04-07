import Link from "next/link";
import type { GuideMetadata } from "@/types";

export default function GuideCard({ guide }: { guide: GuideMetadata }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="block bg-white rounded-xl border border-gray-100 shadow-sm p-6 border-l-4 border-l-teal-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group"
    >
      <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-2 leading-snug">
        {guide.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{guide.description}</p>
      <span className="text-xs text-teal-600 font-medium">{guide.readingTime} →</span>
    </Link>
  );
}
