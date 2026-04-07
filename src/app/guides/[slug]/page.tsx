import Script from "next/script";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllGuides, getGuideBySlug, getRelatedGuides } from "@/lib/guides";
import { articleSchema } from "@/lib/jsonld";

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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
      alternates: { canonical: `/guides/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  try {
    const { metadata, content } = getGuideBySlug(slug);
    const relatedGuides = getRelatedGuides(slug, metadata.tags);

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Script
          id={`article-schema-${metadata.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              articleSchema({
                title: metadata.title,
                description: metadata.description,
                url: `/guides/${metadata.slug}`,
                publishedAt: metadata.publishedAt,
                updatedAt: metadata.updatedAt,
              })
            ),
          }}
        />

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
          {metadata.readingTime && (
            <p className="text-sm text-gray-500 mb-4">{metadata.readingTime}</p>
          )}
          <p className="text-sm text-gray-600 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            DebtHydra guides are independently written for educational purposes and reviewed when
            explanations, assumptions, or related tools materially change.
          </p>
        </header>

        <article className="prose max-w-none">
          <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>

        {metadata.relatedTools && metadata.relatedTools.length > 0 && (
          <div className="mt-10 p-5 bg-teal-50 rounded-xl border border-teal-100">
            <h3 className="font-semibold text-teal-800 mb-2 text-sm">Related Calculators</h3>
            <ul className="space-y-1">
              {metadata.relatedTools.map((href) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-teal-700 hover:text-teal-900 underline">
                    {href
                      .replace("/tools/", "")
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedGuides.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">More guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="block p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-teal-200 hover:shadow-md transition-all group"
                >
                  <p className="text-sm font-medium text-gray-800 group-hover:text-teal-700 leading-snug">
                    {g.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {g.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}
