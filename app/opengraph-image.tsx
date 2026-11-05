import { ImageResponse } from "next/og";
import { loadRobotoMono } from "@/utils/loadGoogleFont";

export const alt = "Swapnil — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  let fonts: { name: string; data: ArrayBuffer; weight: 400 | 700 }[] = [];
  try {
    const [regular, bold] = await Promise.all([
      loadRobotoMono(400),
      loadRobotoMono(700),
    ]);
    fonts = [
      { name: "Roboto Mono", data: regular, weight: 400 },
      { name: "Roboto Mono", data: bold, weight: 700 },
    ];
  } catch {
    // ponytail: default font fallback beats a failed build
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
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1000,
            borderRadius: 16,
            border: "1px solid #333333",
            backgroundColor: "#171717",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 52,
              backgroundColor: "#323232",
              paddingLeft: 24,
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#ef4444" }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#eab308" }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#16a34a" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "48px 64px 56px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 14,
                fontSize: 30,
                color: "#9ca3af",
              }}
            >
              <span style={{ color: "#f9a8d4" }}>~</span>
              <span style={{ color: "#fde047" }}>$</span>
              <span>whoami</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontWeight: 700,
                color: "#ffffff",
                marginTop: 20,
              }}
            >
              Swapnil
            </div>
            <div style={{ display: "flex", fontSize: 36, color: "#a3a3a3", marginTop: 8 }}>
              AI Engineer · Gurugram, India
            </div>
            <div style={{ display: "flex", fontSize: 27, color: "#4ade80", marginTop: 36 }}>
              LLMs · RAG · Multi-agent systems · MLOps on AWS
            </div>
            <div style={{ display: "flex", fontSize: 27, color: "#22d3ee", marginTop: 20 }}>
              devxswapnil.in
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) }
  );
}
