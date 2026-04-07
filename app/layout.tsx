import type { Metadata, Viewport } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neşenaz Yalçın | AI, Data Science & Software Engineering",
  description:
    "Personal portfolio of Neşenaz Yalçın, a Computer Science and Industrial Engineering student working across AI, data science, software engineering, industrial AI, research, and real-world systems.",
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
    title: "Neşenaz Yalçın | AI, Data Science & Software Engineering",
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
  themeColor: "#03070d",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
