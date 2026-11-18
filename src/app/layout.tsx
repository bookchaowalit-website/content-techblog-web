import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  },
  twitter: {
    card: "summary",
    title: "Chaowalit Greepoke (Book) Tech Blog | Modern Web Development & Programming Insights",
    description: "Expert insights on modern web development, React, Next.js, TypeScript, and programming best practices by Chaowalit Greepoke (Book).",
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
      "target": "https://techblog.bookchaowalit.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      {/* The font variables sit on <html>: the Reader shell tokens live on :root and read them from there. */}
      <body>{children}</body>
    </html>
  );
}

