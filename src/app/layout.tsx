import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VirtualPersonal.ai",
  "url": "https://virtualpersonal.ai",
  "logo": "https://virtualpersonal.ai/logo.svg",
  "description":
    "VirtualPersonal.ai is an elite virtual assistant recruiting agency connecting businesses with the top 1% of vetted remote professionals through AI-powered matching and white-glove onboarding.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "English",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "VirtualPersonal.ai",
  "url": "https://virtualpersonal.ai",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://virtualpersonal.ai/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: "Hire Elite Virtual Assistants — VirtualPersonal.ai",
  description:
    "Connect with the top 1% of vetted virtual assistants and remote professionals. AI-powered matching, 12-step vetting, and white-glove onboarding. Smarter than Upwork.",
  keywords: [
    "hire virtual assistant",
    "virtual assistant agency",
    "remote professionals",
    "elite VA recruiting",
    "AI-powered matching",
    "top 1% virtual assistants",
    "dedicated remote team",
  ],
  metadataBase: new URL("https://virtualpersonal.ai"),
  alternates: { canonical: "https://virtualpersonal.ai" },
  openGraph: {
    title: "Hire Elite Virtual Assistants — VirtualPersonal.ai",
    description:
      "Top 1% vetted virtual assistants matched by AI. White-glove onboarding, cultural fit guarantee, and long-term dedicated partners.",
    url: "https://virtualpersonal.ai",
    siteName: "VirtualPersonal.ai",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VirtualPersonal.ai — Elite Virtual Assistant Recruiting Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Elite Virtual Assistants — VirtualPersonal.ai",
    description:
      "Top 1% vetted VAs matched by AI. Smarter than Upwork, more curated than OnlineJobs.ph.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
