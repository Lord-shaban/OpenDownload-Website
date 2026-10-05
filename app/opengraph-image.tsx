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
          background: "#f4f6f5",
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#17231e",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
          OpenDownload<span style={{ color: "#176749" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: "0px",
            lineHeight: 1.1,
          }}
        >
          <span>Good media.</span>
          <span style={{ color: "#176749" }}>Worth keeping.</span>
        </div>
        <div style={{ display: "flex", fontSize: 23, color: "#57625d" }}>
          Public video, audio & images. Free & open source.
        </div>
      </div>
    ),
    size
  );
}
