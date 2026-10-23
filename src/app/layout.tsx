import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chaowalit Greepoke (Book) Tech Blog | Modern Web Development & Programming Insights",
    template: "%s | Chaowalit Greepoke (Book) Tech Blog"
  },
  description: "Expert insights on modern web development, React, Next.js, TypeScript, and programming best practices by Chaowalit Greepoke (Book). Stay updated with the latest tech trends and tutorials from a Bangkok-based full-stack developer.",
  keywords: ["Chaowalit Greepoke", "Book Chaowalit", "web development", "programming", "React", "Next.js", "TypeScript", "JavaScript", "frontend", "backend", "tech tutorials", "best practices", "Bangkok developer", "Thai developer"],
  authors: [{ name: "Chaowalit Greepoke (Book)", url: "https://techblog.bookchaowalit.com" }],
  creator: "Chaowalit Greepoke (Book)",
  publisher: "Chaowalit Greepoke (Book)",
  metadataBase: new URL("https://techblog.bookchaowalit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techblog.bookchaowalit.com",
    siteName: "Chaowalit Greepoke (Book) Tech Blog",
    title: "Chaowalit Greepoke (Book) Tech Blog | Modern Web Development & Programming Insights",
    description: "Expert insights on modern web development, React, Next.js, TypeScript, and programming best practices by Chaowalit Greepoke (Book).",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chaowalit Greepoke (Book) Tech Blog - Modern Web Development Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaowalit Greepoke (Book) Tech Blog | Modern Web Development & Programming Insights",
    description: "Expert insights on modern web development, React, Next.js, TypeScript, and programming best practices by Chaowalit Greepoke (Book).",
    images: ["/og-image.jpg"],
    creator: "@bookchaowalit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Chaowalit Greepoke (Book) Tech Blog",
    "description": "Modern web development, programming tips, and tech insights by Chaowalit Greepoke (Book)",
    "url": "https://techblog.bookchaowalit.com",
    "author": {
      "@type": "Person",
      "name": "Chaowalit Greepoke",
      "alternateName": "Book Chaowalit",
      "url": "https://techblog.bookchaowalit.com"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://techblog.bookchaowalit.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* THESIS: Tech Blog is a technical notebook. OWN-WORLD: PC98 text window and phosphor accents. STORY: boot, inspect, open one note. FIRST VIEWPORT: show the machine frame and latest document. FORM: seed 1df06217 assigned PC98 window direction. FINISH: dithered texture, mono metadata, no fabricated volume. */}
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}

// SEO TODO: Add Open Graph tags for social sharing
