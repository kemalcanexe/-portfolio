import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F6F3",
        ink: "#17161C",
        violet: { DEFAULT: "#3B1FA8", soft: "#8E7FD6", wash: "#ECE9F8" },
        muted: "#6B6A73",
        rule: "#DCDBE3",
        mark: "#F4E76E"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      maxWidth: { measure: "68ch" }
    }
  },
  plugins: []
};

export default config;
