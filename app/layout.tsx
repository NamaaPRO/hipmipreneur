import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hipmipreneur - Turn Your Idea Into a Business",
  description: "AI-powered platform to validate, plan, and launch your startup",
  keywords: ["startup", "business", "AI", "entrepreneur", "MVP", "pitch deck"],
  authors: [{ name: "Hipmipreneur" }],
  openGraph: {
    title: "Hipmipreneur - Turn Your Idea Into a Business",
    description: "AI-powered platform to validate, plan, and launch your startup",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-white`}>
        {children}
      </body>
    </html>
  );
}