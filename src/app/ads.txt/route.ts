import { NextResponse } from "next/server";

const GOOGLE_SELLER_ID = "f08c47fec0942fa0";

export function GET() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() ?? "";

  if (!publisherId.startsWith("ca-pub-")) {
    return new NextResponse("AdSense publisher ID is not configured.\n", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  const normalizedPublisherId = publisherId.replace("ca-", "");
  const body = `google.com, ${normalizedPublisherId}, DIRECT, ${GOOGLE_SELLER_ID}\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
