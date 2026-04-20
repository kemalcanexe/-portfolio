import type { Metadata, Viewport } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neşenaz Yalçın | AI, Data Science, Systems & Software",
  description:
    "A signature portfolio for Neşenaz Yalçın: AI, data science, software engineering, research, and intelligent systems shaped with elegance, rigor, and real-world intent.",
  keywords: [
    "Neşenaz Yalçın",
    "AI",
    "Data Science",
    "Software Engineering",
    "Industrial AI",
    "Research",
    "Portfolio"
  ],
  authors: [{ name: "Neşenaz Yalçın" }],
  openGraph: {
    title: "Neşenaz Yalçın | AI, Data Science, Systems & Software",
    description:
      "AI, data science, software engineering, research, and intelligent systems for real-world impact.",
    type: "website",
    locale: "en_US",
    siteName: "Neşenaz Yalçın Portfolio"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#050308",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-noir-980 text-white antialiased">{children}</body>
    </html>
  );
}
