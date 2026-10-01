import { ImageResponse } from "next/og";
export const alt = "OpenDownload. Download public video, audio and images.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f1eff9",
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#292833",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
          OpenDownload<span style={{ color: "#655acd" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: "-4px",
            lineHeight: 1.1,
          }}
        >
          <span>From a public link.</span>
          <span style={{ color: "#6c62ca" }}>To your device.</span>
        </div>
        <div style={{ display: "flex", fontSize: 23, color: "#625d76" }}>
          Free & open source. No account. No ads. · v0.1
        </div>
      </div>
    ),
    size
  );
}
