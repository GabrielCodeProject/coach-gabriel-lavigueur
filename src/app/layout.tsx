import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { StructuredData } from "@/components/shared/StructuredData";
import { buildRootMetadata } from "@/lib/seo/build-metadata";
import { buildLocalBusinessSchema } from "@/lib/schema/local-business";
import { buildWebsiteSchema } from "@/lib/schema/website";
import { env } from "@/lib/env";

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
    <html lang="fr-CA" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <StructuredData data={buildLocalBusinessSchema()} />
        <StructuredData data={buildWebsiteSchema()} />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={env.NEXT_PUBLIC_UMAMI_SITE_ID}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline focus:outline-2 focus:outline-primary"
          >
            Passer au contenu principal
          </a>
          <SiteHeader />
          <main id="main-content" className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
