import { ImageResponse } from "next/og";
import { loadRobotoMono } from "@/utils/loadGoogleFont";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  let fonts: { name: string; data: ArrayBuffer; weight: 700 }[] = [];
  try {
    fonts = [{ name: "Roboto Mono", data: await loadRobotoMono(700), weight: 700 }];
  } catch {
    // default font fallback beats a failed build
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111111",
          fontFamily: "Roboto Mono, monospace",
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        <span style={{ color: "#ffffff" }}>S</span>
        <span style={{ color: "#4ade80" }}>_</span>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) }
  );
}
