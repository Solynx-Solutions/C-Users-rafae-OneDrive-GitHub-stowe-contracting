import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { rootMetadata } from '@/lib/metadata';
import { localBusinessSchema, organizationSchema, webSiteSchema } from '@/lib/schema';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { SkipLink } from '@/components/layout/skip-link';

// =============================================================================
// FONT
// Inter is the SOLYNX standard — clean, professional, excellent legibility.
// Replace with client-specific font if branding requires it.
// =============================================================================
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// =============================================================================
// ROOT METADATA
// All pages inherit from this. Page-level metadata merges via generateMetadata().
// =============================================================================
export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-[var(--color-neutral-800)]">
        {/* ── Skip to Content — WCAG 2.2 AA 2.4.1 ──────────────────────── */}
        <SkipLink />

        {/* ── Global Header ─────────────────────────────────────────────── */}
        <SiteHeader />

        {/* ── Main Content ──────────────────────────────────────────────── */}
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>

        {/* ── Global Footer ─────────────────────────────────────────────── */}
        <SiteFooter />

        {/* ── JSON-LD Schema — Runs on every page ──────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
        />
      </body>
    </html>
  );
}
