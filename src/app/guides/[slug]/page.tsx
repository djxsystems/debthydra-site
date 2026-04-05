import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { metadata } = getGuideBySlug(slug);
    return {
      title: `${metadata.title} | DebtHydra`,
      description: metadata.description,
    };
  } catch {
    return {};
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  try {
    const { metadata, content } = getGuideBySlug(slug);

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-sm text-teal-600 font-medium mb-4">
          <Link href="/guides" className="hover:underline">
            ← All Guides
          </Link>
        </p>

        <header className="mb-8">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{metadata.title}</h1>
          <p className="text-gray-500 text-sm">
            {metadata.publishedAt} · {metadata.readingTime}
          </p>
        </header>

        <article className="prose max-w-none">
          <MDXRemote source={content} />
        </article>

        {metadata.relatedTools && metadata.relatedTools.length > 0 && (
          <div className="mt-10 p-5 bg-teal-50 rounded-xl border border-teal-100">
            <h3 className="font-semibold text-teal-800 mb-2 text-sm">Related Calculators</h3>
            <ul className="space-y-1">
              {metadata.relatedTools.map((href) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-teal-700 hover:text-teal-900 underline">
                    {href.replace("/tools/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}
