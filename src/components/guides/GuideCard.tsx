import Link from "next/link";
import type { GuideMetadata } from "@/types";

export default function GuideCard({ guide }: { guide: GuideMetadata }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="block bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-teal-200 transition-all group"
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        {guide.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-2 leading-snug">
        {guide.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">{guide.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{guide.readingTime}</span>
        <span>{guide.publishedAt}</span>
      </div>
    </Link>
  );
}
