import { ImageResponse } from "next/og";

export const alt = "DebtHydra";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "radial-gradient(circle at top left, #14b8a6 0%, #0f766e 40%, #0f172a 100%)",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "56px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: "18px",
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#ffffff",
              borderRadius: "24px",
              color: "#0f766e",
              display: "flex",
              fontSize: "34px",
              fontWeight: 800,
              height: "88px",
              justifyContent: "center",
              width: "88px",
            }}
          >
            DH
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ fontSize: "52px", fontWeight: 800, lineHeight: 1.05 }}>DebtHydra</div>
            <div style={{ color: "#ccfbf1", fontSize: "24px" }}>
              Free debt payoff calculators and plain-language guides
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "920px",
          }}
        >
          <div style={{ fontSize: "60px", fontWeight: 800, lineHeight: 1.08 }}>
            Clear math. Real payoff plans. No nonsense.
          </div>
          <div style={{ color: "#d1fae5", fontSize: "28px", lineHeight: 1.35 }}>
            Snowball, avalanche, auto loan, and emergency fund tools built for real people trying
            to get out of debt faster.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
