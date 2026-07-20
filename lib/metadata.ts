import { type Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent page-level metadata for Next.js App Router.
 * Merges page-specific values with siteConfig defaults.
 *
 * @example
 * // In a page.tsx:
 * export const metadata = generateMetadata({
 *   title: 'Concrete Flatwork Services',
 *   description: 'Expert concrete flatwork, driveways, and patios.',
 *   path: '/services/concrete-flatwork',
 * });
 */
export function generateMetadata({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: GenerateMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  // description falls back to empty string — site description is a pending content record
  // Use resolveControlledMessage('positioning-statement') once brand-messaging module is active
  const pageDescription = description ?? '';
  const pageUrl = `${siteConfig.url}${path}`;
  const pageOgImage = ogImage ?? siteConfig.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: pageOgImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageOgImage],
      ...(siteConfig.twitterHandle ? { creator: siteConfig.twitterHandle } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/**
 * Root metadata applied to app/layout.tsx.
 * All pages inherit and merge from this baseline.
 */
export const rootMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  // description: site-level description is a pending content record
  // Will be populated via resolveControlledMessage('positioning-statement') when confirmed
  description: '',
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  keywords: [], // Populate with client-approved keyword list
  authors: [{ name: 'SOLYNX', url: 'https://solynx.solutions' }],
  creator: 'SOLYNX',
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};
