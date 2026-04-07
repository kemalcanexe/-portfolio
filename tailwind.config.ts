import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#03070d",
          900: "#07111d",
          850: "#0b1624",
          800: "#101d2c"
        },
        cyan: {
          signal: "#4de7ff"
        },
        magenta: {
          pulse: "#e55cff"
        }
      },
      boxShadow: {
        "signal-sm": "0 0 24px rgba(77, 231, 255, 0.16)",
        signal: "0 24px 80px rgba(77, 231, 255, 0.15)",
        "panel-glow": "inset 0 1px 0 rgba(255,255,255,0.08), 0 22px 70px rgba(0,0,0,0.34)"
      },
      backgroundImage: {
        "radial-cyan": "radial-gradient(circle at center, rgba(77,231,255,0.22), transparent 62%)",
        "radial-magenta": "radial-gradient(circle at center, rgba(229,92,255,0.16), transparent 64%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
