import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { GuideMetadata } from "@/types";

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

export function getAllGuides(): GuideMetadata[] {
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        publishedAt: data.publishedAt ?? "",
        readingTime: rt.text,
        tags: data.tags ?? [],
        relatedTools: data.relatedTools ?? [],
      } satisfies GuideMetadata;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getGuideBySlug(slug: string): { metadata: GuideMetadata; content: string } {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    metadata: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      publishedAt: data.publishedAt ?? "",
      readingTime: rt.text,
      tags: data.tags ?? [],
      relatedTools: data.relatedTools ?? [],
    },
    content,
  };
}
