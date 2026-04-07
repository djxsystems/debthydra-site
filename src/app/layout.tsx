import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AdSenseScript from "@/components/ads/AdSenseScript";

export const metadata: Metadata = {
  title: "DebtHydra - Get Out of Debt Faster",
  description:
    "Free debt payoff calculators and plain-language guides to help you understand and eliminate debt. Snowball, avalanche, auto loan, and emergency fund tools.",
  metadataBase: new URL("https://debthydra.com"),
  openGraph: {
    siteName: "DebtHydra",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <AdSenseScript />
      </body>
    </html>
  );
}
