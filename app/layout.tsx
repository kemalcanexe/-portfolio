import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";
import type React from "react";
import { profile } from "@/content/cv";
import "./globals.css";

const sans = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const serif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nesenaz.com"),
  title: profile.name,
  description: profile.summary,
  authors: [{ name: profile.name }],
  openGraph: { title: profile.name, description: profile.summary, type: "website", url: "https://nesenaz.com" },
  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = { themeColor: "#F6F6F3" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
