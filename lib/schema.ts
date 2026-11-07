// =============================================================================
// JSON-LD SCHEMA GENERATORS — GOVERNANCE-SAFE VERSION
//
// Schema output must never include unverified claims.
// The following fields are BLOCKED until their corresponding content records
// are confirmed + active:
//
//   BLOCKED (pending verification):
//   - legalName — vr-legal-entity-name
//   - openingHoursSpecification — vr-business-hours
//   - foundingDate — vr-founding-year (CHRONOLOGY POLICY: no exact year)
//   - numberOfEmployees — exact total pending (use 30+ in copy; omit from schema)
//   - unverified social profiles — vr-social-profiles
//   - aggregateRating / review — vr-testimonials
//   - serviceType — vr-service-list
//
//   CONFIRMED (safe to include):
//   - name: 'Stowe Contracting'
//   - telephone and email — Adam Cox website notes, 2026-10-19
//   - public address, Monterey Bay service identity, and Google place ID — Agent 08 audit, 2026-11-07
//   - url: siteConfig.url
//   - @type: 'Organization' / 'LocalBusiness'
//   - @context: 'https://schema.org'
// =============================================================================

import { siteConfig } from '@/data/siteConfig';
import { resolveEmail, resolvePhone } from '@/content/contact';

/**
 * Safe LocalBusiness schema — confirmed public fields only.
 * Unverified hours and coordinates are omitted.
 */
export function localBusinessSchema() {
  const telephone = resolvePhone();
  const email = resolveEmail();

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://stowecontracting.com/#localbusiness',
    name: siteConfig.name,
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3338 Paul Davis Drive',
      addressLocality: 'Marina',
      addressRegion: 'CA',
      postalCode: '93933',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Monterey Bay',
    },
    hasMap: 'https://www.google.com/maps/place/?q=place_id:ChIJ2VOGkiT9jYARqrfsI5ATT-s',
    sameAs: [siteConfig.social.facebook],
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
    // openingHoursSpecification: OMITTED — pending vr-business-hours
    // geo: OMITTED — exact GBP coordinates were not supplied by the audit
    // foundingDate: OMITTED — CHRONOLOGY POLICY: no exact year
    // numberOfEmployees: OMITTED — exact total pending
  };
}

/**
 * Safe Organization schema — minimal confirmed fields only.
 */
export function organizationSchema() {
  const telephone = resolvePhone();
  const email = resolveEmail();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.social.facebook],
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
    // legalName: OMITTED — pending vr-legal-entity-name
    // address: OMITTED — pending vr-contact-information
  };
}

/**
 * Safe WebSite schema.
 * SearchAction omitted — no search page exists yet.
 */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

/**
 * BreadcrumbList schema — safe, uses only confirmed route path and label data.
 * Only call with route items from the confirmed + active route registry.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * WebPage schema for interior pages (service, capability, about pages).
 * Only confirmed text fields are included.
 * Do not add 'author', 'publisher' with unverified fields.
 */
export function webPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${siteConfig.url}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * Service schema — DISABLED.
 * Service names and areaServed are pending verification.
 * This function is a stub; call only after service verification is complete.
 */
export function serviceSchema(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _params: {
    name: string;
    description: string;
    url: string;
  }
): null {
  // BLOCKED: individual services and areaServed are pending verification
  // See content/verification-required.ts: vr-service-list, vr-service-areas
  return null;
}

/**
 * FAQPage schema — ready for use when confirmed FAQ content is available.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Article schema — for blog posts when content is active.
 */
export function articleSchema({
  title,
  description,
  url,
  publishedAt,
  modifiedAt,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  modifiedAt?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteConfig.url}${url}`,
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    author: {
      '@type': 'Person',
      name: authorName ?? siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

// =============================================================================
// CONTACT PAGE SCHEMA
// =============================================================================

/**
 * ContactPage schema for /contact.
 *
 * GOVERNANCE:
 *   - ContactPage type indicates this page's purpose to search engines.
 *   - Verified telephone and email are included from the governed contact registry.
 *   - Address remains omitted until vr-contact-information resolves.
 *   - LocalBusiness block reused from localBusinessSchema() for consistency.
 *
 * When contact fields are confirmed, update localBusinessSchema() —
 * this schema will inherit the values automatically via the shared block.
 */
export function contactPageSchema({ url }: { url: string }) {
  const telephone = resolvePhone();
  const email = resolveEmail();

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${siteConfig.name}`,
    url: `${siteConfig.url}${url}`,
    description: `Contact ${siteConfig.name} to discuss your residential or commercial project.`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      url: siteConfig.url,
      ...(telephone ? { telephone } : {}),
      ...(email ? { email } : {}),
      // openingHoursSpecification: omitted — pending vr-business-hours
      areaServed: {
        '@type': 'Place',
        name: 'Monterey Bay',
      },
    },
  };
}

// =============================================================================
// RESERVED — Review / AggregateRating schema
// Blocked until Review System integration (M13+) and vr-testimonials confirmed.
// =============================================================================
