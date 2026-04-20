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
        noir: {
          980: "#050308",
          960: "#0a0610",
          940: "#120916",
          920: "#1a1020"
        },
        plum: {
          900: "#231126",
          800: "#341739",
          700: "#4b204d"
        },
        berry: {
          700: "#632649",
          600: "#7b3158"
        },
        rose: {
          400: "#d0a2b5",
          300: "#e0bfd0"
        },
        lilac: {
          300: "#d8cee7",
          200: "#ebe1f3"
        },
        champagne: {
          300: "#e8d3bd",
          200: "#f3e4d6"
        }
      },
      boxShadow: {
        luxe: "0 24px 80px rgba(9, 4, 12, 0.55)",
        halo: "0 0 60px rgba(224, 191, 208, 0.16)",
        veil: "inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 70px rgba(7, 3, 10, 0.45)"
      },
      backgroundImage: {
        "spotlight-plum":
          "radial-gradient(circle at center, rgba(208,162,181,0.24), transparent 62%)",
        "spotlight-lilac":
          "radial-gradient(circle at center, rgba(216,206,231,0.22), transparent 62%)",
        "sheen-soft":
          "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 48%, rgba(255,255,255,0.12))"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Aptos", "system-ui", "sans-serif"],
        serif: [
          "var(--font-serif)",
          "Iowan Old Style",
          "Palatino Linotype",
          "Book Antiqua",
          "Georgia",
          "serif"
        ],
        mono: ["var(--font-mono)", "JetBrains Mono", "Consolas", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
