import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono  = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "PromptCraft 2026 — HyperText Certificate Registry",
  description:
    "Official certificate hypertext registry for PromptCraft 2026 students. Access each student's certificate via structured hypertext identifiers.",
  keywords: ["PromptCraft", "certificates", "hypertext", "HyperText Competition", "2026"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="gradient-bg min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
