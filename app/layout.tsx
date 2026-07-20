import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { rootMetadata } from '@/lib/metadata';
import {
  localBusinessSchema,
  organizationSchema,
  webSiteSchema,
} from '@/lib/schema';

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
      <body className="flex min-h-full flex-col bg-white text-gray-900">
        {/* ── Skip to Content — Accessibility ────────────────────────────── */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>

        {/* ── Main Content ─────────────────────────────────────────────────── */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* ── JSON-LD Schema — Runs on every page ──────────────────────────── */}
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
