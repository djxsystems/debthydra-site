import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { GuideMetadata } from "@/types";

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

function buildGuideMetadata(file: string, content: string, data: Record<string, unknown>): GuideMetadata {
  const slug = file.replace(/\.mdx$/, "");
  const rt = readingTime(content);
  const publishedAt = typeof data.publishedAt === "string" ? data.publishedAt : "";
  const updatedAt =
    typeof data.updatedAt === "string" && data.updatedAt.length > 0 ? data.updatedAt : publishedAt;

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : "",
    publishedAt,
    updatedAt,
    readingTime: rt.text,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    relatedTools: Array.isArray(data.relatedTools) ? data.relatedTools.map(String) : [],
  };
}

export function getAllGuides(): GuideMetadata[] {
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf-8");
      const { data, content } = matter(raw);

      return buildGuideMetadata(file, content, data);
    })
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getRelatedGuides(currentSlug: string, tags: string[], limit = 3): GuideMetadata[] {
  return getAllGuides()
    .filter((g) => g.slug !== currentSlug && g.tags.some((t) => tags.includes(t)))
    .slice(0, limit);
}

export function getGuideBySlug(slug: string): { metadata: GuideMetadata; content: string } {
  const file = `${slug}.mdx`;
  const filePath = path.join(GUIDES_DIR, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    metadata: buildGuideMetadata(file, content, data),
    content,
  };
}
