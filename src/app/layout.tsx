import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StructuredData } from "@/components/shared/StructuredData";
import { buildRootMetadata } from "@/lib/seo/build-metadata";
import { buildLocalBusinessSchema } from "@/lib/schema/local-business";
import { buildWebsiteSchema } from "@/lib/schema/website";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA" className={`${inter.variable} h-full`}>
      <head>
        <StructuredData data={buildLocalBusinessSchema()} />
        <StructuredData data={buildWebsiteSchema()} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
        {/* Umami Analytics — TODO: remplacer PLACEHOLDER_UMAMI_ID par l'ID réel après création du compte umami.is */}
        <Script
          src="https://analytics.umami.is/script.js"
          data-website-id="PLACEHOLDER_UMAMI_ID"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
