import type { Metadata } from "next";

const SITE_NAME = "DebtHydra";
const SITE_URL = "https://debthydra.com";
const DEFAULT_DESCRIPTION =
  "Free debt payoff calculators and plain-language guides to help you get out of debt faster. Snowball, avalanche, auto loan, and more.";

export function buildMetadata({
  title,
  description,
  path: pagePath = "/",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Get Out of Debt Faster`;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${pagePath}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
