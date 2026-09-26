import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import type React from "react";
import { profile } from "@/content/cv";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  axes: ["wdth", "opsz"]
});
const sans = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nesenaz.com"),
  title: profile.name,
  description: profile.summary,
  authors: [{ name: profile.name }],
  openGraph: { title: profile.name, description: profile.summary, type: "website", url: "https://nesenaz.com" },
  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = { themeColor: "#07050D", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-night font-sans text-fog antialiased">{children}</body>
    </html>
  );
}
