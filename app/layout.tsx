import "./globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Topbar from "../components/navbar";
import Providers from "./providers";
import Terminal from "../components/terminal";
import { siteConfig } from "../config/site";
import info from "../data/about/info.json";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
});

const description =
  "AI Engineer with 2.5+ years shipping LLM-powered products into production across fintech and media. RAG, multi-agent systems, and MLOps on AWS.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Swapnil — AI Engineer",
    template: "%s — Swapnil",
  },
  description,
  keywords: [
    "Swapnil",
    "AI Engineer",
    "LLM",
    "RAG",
    "multi-agent systems",
    "LangGraph",
    "LangChain",
    "MLOps",
    "Gurugram",
    "portfolio",
  ],
  authors: [{ name: info.name, url: siteConfig.url }],
  creator: info.name,
  openGraph: {
    title: "Swapnil — AI Engineer",
    description,
    url: siteConfig.url,
    siteName: "Swapnil — AI Engineer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swapnil — AI Engineer",
    description,
  },
  robots: { index: true, follow: true },
};

// JSON-LD entity graph — parsed by Google rich results and AI search engines
const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: `${siteConfig.url}/`,
      name: "Swapnil — AI Engineer",
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: info.name,
      alternateName: ["dev-swapnilx", "devxswapnil"],
      jobTitle: ["Senior Data Scientist", "AI Engineer"],
      description: info.summary,
      url: `${siteConfig.url}/`,
      email: `mailto:${info.email}`,
      worksFor: {
        "@type": "Organization",
        name: "Kissht",
        legalName: "Si Creva Capital Services Pvt. Ltd.",
        url: "https://www.kissht.com",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Thapar Institute of Engineering and Technology",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/dev-swapnilx",
        "https://www.linkedin.com/in/swapnil-2069961ba/",
        "https://leetcode.com/sswapnil_be20/",
        "https://www.npmjs.com/package/dev-swapnilx",
      ],
      knowsAbout: [
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "Multi-agent systems",
        "LangGraph",
        "LangChain",
        "MLOps",
        "AWS",
        "Python",
        "Vector search",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto_mono.className}>
      <body className="antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
