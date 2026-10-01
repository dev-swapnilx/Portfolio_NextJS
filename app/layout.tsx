import "./globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Topbar from "../components/navbar";
import Providers from "./providers";
import Terminal from "../components/terminal";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
});

const description =
  "AI Engineer with 2.5+ years shipping LLM-powered products into production across fintech and media. RAG, multi-agent systems, and MLOps on AWS.";

export const metadata: Metadata = {
  title: "Swapnil — AI Engineer",
  description,
  openGraph: {
    title: "Swapnil — AI Engineer",
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Swapnil — AI Engineer",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto_mono.className}>
      <body className="antialiased min-h-screen">
        <Providers>
          <div className="flex flex-col container pt-8">
            <Topbar />
            <main className="mb-8">{children}</main>
            <Terminal />
            <Analytics />
          </div>
        </Providers>
      </body>
    </html>
  );
}
