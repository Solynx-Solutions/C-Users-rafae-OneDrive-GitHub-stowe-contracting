// =============================================================================
// SITE CONFIGURATION
//
// Technical site-wide metadata. Contact details, hours, social links, and
// service areas must only be populated when verified as confirmed + active
// content records in content/verification-required.ts.
//
// Do NOT invent or estimate values. Leave fields empty until verified.
// =============================================================================

export const siteConfig = {
  // ── Identity ────────────────────────────────────────────────────────────────
  // "Stowe Contracting" is confirmed. Legal entity name pending verification.
  name: 'Stowe Contracting',
  legalName: '', // PENDING — see verification-required.ts: vr-legal-entity-name

  // ── URL ──────────────────────────────────────────────────────────────────────
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stowecontracting.com',

  // ── SEO ──────────────────────────────────────────────────────────────────────
  ogImage: '/images/og-default.jpg',

  // ── Contact — PENDING VERIFICATION ──────────────────────────────────────────
  // Do not populate with invented or placeholder values.
  // See verification-required.ts: vr-contact-information
  phone: process.env.NEXT_PUBLIC_PHONE ?? '',
  email: process.env.NEXT_PUBLIC_EMAIL ?? '',

  // ── Address — PENDING VERIFICATION ───────────────────────────────────────────
  // See verification-required.ts: vr-contact-information
  address: {
    street: process.env.NEXT_PUBLIC_ADDRESS ?? '',
    city: process.env.NEXT_PUBLIC_CITY ?? '',
    state: process.env.NEXT_PUBLIC_STATE ?? '',
    zip: process.env.NEXT_PUBLIC_ZIP ?? '',
    country: 'US',
  },

  // ── Hours — PENDING VERIFICATION ─────────────────────────────────────────────
  // See verification-required.ts: vr-business-hours
  // No invented hours — all empty until official hours are confirmed.
  hours: {
    weekdays: '',
    saturday: '',
    sunday: '',
  },

  // ── Social Links — INDIVIDUAL VERIFICATION REQUIRED ──────────────────────────
  // Facebook is verified. See verification-required.ts for remaining profiles.
  social: {
    facebook: 'https://www.facebook.com/stowecontractinginc',
    instagram: '',
    linkedin: '',
    youtube: '',
    houzz: '',
  },

  // ── Service Areas — PENDING VERIFICATION ──────────────────────────────────────
  // "Monterey Bay" is the confirmed identity marker but specific city/county
  // boundaries are pending. See verification-required.ts: vr-service-areas
  serviceAreas: [] as string[],

  // ── Twitter / X ───────────────────────────────────────────────────────────────
  twitterHandle: '',
} as const;

export type SiteConfig = typeof siteConfig;
