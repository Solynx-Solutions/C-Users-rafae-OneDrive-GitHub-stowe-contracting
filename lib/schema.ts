// =============================================================================
// JSON-LD SCHEMA GENERATORS — GOVERNANCE-SAFE VERSION
//
// Schema output must never include unverified claims.
// The following fields are BLOCKED until their corresponding content records
// are confirmed + active:
//
//   BLOCKED (pending verification):
//   - address (street, city, state, zip) — vr-contact-information
//   - telephone — vr-contact-information
//   - email — vr-contact-information
//   - legalName — vr-legal-entity-name
//   - openingHoursSpecification — vr-business-hours
//   - areaServed — vr-service-areas
//   - foundingDate — vr-founding-year (CHRONOLOGY POLICY: no exact year)
//   - numberOfEmployees — exact total pending (use 30+ in copy; omit from schema)
//   - sameAs (social) — vr-social-profiles
//   - aggregateRating / review — vr-testimonials
//   - serviceType — vr-service-list
//
//   CONFIRMED (safe to include):
//   - name: 'Stowe Contracting'
//   - url: siteConfig.url
//   - @type: 'Organization' / 'LocalBusiness'
//   - @context: 'https://schema.org'
// =============================================================================

import { siteConfig } from '@/data/siteConfig';

/**
 * Safe LocalBusiness schema — minimal confirmed fields only.
 * Unverified address, phone, email, hours, and social are omitted.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.url,
    // address: OMITTED — pending vr-contact-information
    // telephone: OMITTED — pending vr-contact-information
    // email: OMITTED — pending vr-contact-information
    // openingHoursSpecification: OMITTED — pending vr-business-hours
    // areaServed: OMITTED — pending vr-service-areas
    // foundingDate: OMITTED — CHRONOLOGY POLICY: no exact year
    // numberOfEmployees: OMITTED — exact total pending
    // sameAs: OMITTED — pending vr-social-profiles
  };
}

/**
 * Safe Organization schema — minimal confirmed fields only.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    // legalName: OMITTED — pending vr-legal-entity-name
    // address: OMITTED — pending vr-contact-information
    // telephone: OMITTED — pending vr-contact-information
    // email: OMITTED — pending vr-contact-information
    // sameAs: OMITTED — pending vr-social-profiles
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
 *   - telephone, email, and address are OMITTED until vr-contact-information resolves.
 *   - Do not add invented telephone/address/email here.
 *   - LocalBusiness block reused from localBusinessSchema() for consistency.
 *
 * When contact fields are confirmed, update localBusinessSchema() —
 * this schema will inherit the values automatically via the shared block.
 */
export function contactPageSchema({ url }: { url: string }) {
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
      // telephone: omitted — pending vr-contact-information
      // email: omitted — pending vr-contact-information
      // address: omitted — pending vr-contact-information
      // openingHoursSpecification: omitted — pending vr-business-hours
      areaServed: {
        '@type': 'GeoCircle',
        description: 'Monterey Bay area',
      },
    },
  };
}

// =============================================================================
// RESERVED — Review / AggregateRating schema
// Blocked until Review System integration (M13+) and vr-testimonials confirmed.
// =============================================================================
