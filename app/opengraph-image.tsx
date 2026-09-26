import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Link preview for LinkedIn, WhatsApp, Slack and the like. Rendered once at build.
export const alt = "Neşenaz Yalçın, Computer Science & Industrial Engineering, Sabancı University";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

export default async function Image() {
  const [displayLatin, displayExt, bodyLatin, bodyExt] = await Promise.all([
    font("bricolage-grotesque", "bricolage-grotesque-latin-800-normal.woff"),
    font("bricolage-grotesque", "bricolage-grotesque-latin-ext-800-normal.woff"),
    font("manrope", "manrope-latin-500-normal.woff"),
    font("manrope", "manrope-latin-ext-500-normal.woff")
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "#07050D",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(255,111,216,0.55) 0%, rgba(255,111,216,0) 32%), radial-gradient(circle at 62% 58%, rgba(124,92,255,0.6) 0%, rgba(124,92,255,0) 42%), radial-gradient(circle at 92% 88%, rgba(42,15,138,0.9) 0%, rgba(42,15,138,0) 45%)",
          color: "#EEEAF7",
          fontFamily: "Manrope"
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.05)",
              fontSize: 22
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#7CF2C8" }} />
            Fulbright Principal Candidate, 2026–2027
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Bricolage", fontSize: 150, lineHeight: 0.9, letterSpacing: "-0.04em" }}>Neşenaz</div>
          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: 150,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              backgroundImage: "linear-gradient(90deg, #C6B5FF, #FF6FD8)",
              backgroundClip: "text",
              color: "transparent"
            }}
          >
            Yalçın
          </div>
          <div style={{ marginTop: 26, fontSize: 30, color: "#A7A1BC" }}>
            Computer Science &amp; Industrial Engineering, Sabancı University
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 24 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {["Information retrieval", "Edge AI", "Humanitarian logistics"].map((f) => (
              <div
                key={f}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: "rgba(124,92,255,0.22)",
                  color: "#C6B5FF"
                }}
              >
                {f}
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "Bricolage", fontSize: 30 }}>nesenaz.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: displayLatin, weight: 800, style: "normal" },
        { name: "Bricolage", data: displayExt, weight: 800, style: "normal" },
        { name: "Manrope", data: bodyLatin, weight: 500, style: "normal" },
        { name: "Manrope", data: bodyExt, weight: 500, style: "normal" }
      ]
    }
  );
}
