import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: "#07050D", 900: "#0C0916", 800: "#141024", 700: "#1E1836" },
        fog: { DEFAULT: "#EEEAF7", dim: "#A7A1BC", faint: "#6E6887" },
        violet: { DEFAULT: "#7C5CFF", deep: "#3A1FB8", soft: "#C6B5FF" },
        orchid: "#FF6FD8",
        amber: "#FFD27A",
        mint: "#7CF2C8"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
