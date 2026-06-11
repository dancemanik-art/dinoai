import { ImageResponse } from "next/og";
import { defaultDescription, SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME} — Váš osobní průvodce světem financí, investic a majetku`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(160deg, #0a0b0d 0%, #101216 45%, #0a0b0d 100%)",
          color: "#f4efe5",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              border: "2px solid rgba(201,162,75,0.45)",
              background: "rgba(201,162,75,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: 800,
              color: "#c9a24b",
            }}
          >
            D
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#f4efe5" }}>DINO </span>
            <span style={{ color: "#e7c87e" }}>AI</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "34px",
            lineHeight: 1.35,
            color: "#9c958a",
            maxWidth: "920px",
          }}
        >
          {defaultDescription}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "40px",
            fontSize: "22px",
            color: "#c9a24b",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          dinoai.cz
        </div>
      </div>
    ),
    { ...size },
  );
}
