// =============================================================================
// SERVICE REGISTRY — Content Model
//
// Defines the governance-controlled service catalog for Stowe Contracting.
//
// ARCHITECTURE:
//   Each ServiceRecord carries its own verification + publication status,
//   following the same two-axis governance model as ClaimRecord and RouteRecord.
//
// PUBLIC RENDER RULE:
//   A service appears in the UI ONLY when:
//     verificationStatus === 'confirmed' AND publicationStatus === 'active'
//
// INTEGRATION NOTE (M7+):
//   When the service list is verified (vr-service-list resolves), flip
//   the target records to confirmed + active. No component changes needed.
//
// Source: Priority-1 (Adam Cox discovery interview)
// Blocker: vr-service-list — individual service capabilities require
//          client verification before activation.
// =============================================================================

import { type GovernedContent } from '@/lib/content/types';

// ── Service Audience ──────────────────────────────────────────────────────────

export type ServiceAudience = 'residential' | 'commercial' | 'both';

// ── Service CTA ───────────────────────────────────────────────────────────────

export interface ServiceCta {
  label: string;
  href: '/estimate/residential' | '/estimate/commercial' | '/estimate' | string;
}

// ── Service Record ────────────────────────────────────────────────────────────

export interface ServiceRecord extends GovernedContent {
  type: 'service';
  /** Short machine-readable key. Used for URL slugs when the route is activated. */
  serviceKey: string;
  /** Display name of the service. */
  name: string;
  /**
   * One-sentence description of what the service covers.
   * Must not contain prohibited claims (performance, cost, speed, certifications).
   */
  description: string;
  /** Who this service is primarily for. */
  audience: ServiceAudience;
  /**
   * Primary CTA for this service card.
   * Always links to an estimate route — never to an unbuilt service detail page.
   */
  cta: ServiceCta;
  /**
   * SEO metadata for the future service detail page.
   * Only used when publicationStatus === 'active'.
   */
  seo?: {
    title: string;
    description: string;
    /** URL path for the future service detail page. */
    path: string;
  };
  /**
   * Internal note describing what must be verified before this service
   * can be activated.
   */
  verificationNote?: string;
  /** ISO date of last review. */
  lastReviewedAt?: string;
}

// ── Service Registry ──────────────────────────────────────────────────────────

/**
 * Stowe Contracting service registry.
 *
 * All records are currently in draft/pending state pending vr-service-list
 * verification. To activate a service, update:
 *   verificationStatus: 'confirmed'
 *   publicationStatus: 'active'
 *
 * and add a verificationNote with the source.
 */
export const serviceRegistry: ServiceRecord[] = [
  // ── Mechanical Installation ─────────────────────────────────────────────────
  // CONFIRMED at the general capability level (mechanical-equipment claim).
  // Individual service listing pending vr-service-list verification.
  {
    id: 'service-mechanical-installation',
    type: 'service',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'draft',
    // NOTE: General capability confirmed. Individual service listing (vr-service-list)
    // required before publicationStatus can be set to 'active'.
    serviceKey: 'mechanical-installation',
    name: 'Mechanical Installation',
    description:
      'Concrete installation using specialized mechanical equipment, operated by experienced in-house crews. Suitable for residential and commercial applications.',
    audience: 'both',
    cta: { label: 'Request an Estimate', href: '/estimate/residential' },
    seo: {
      title: 'Mechanical Installation — Stowe Contracting',
      description:
        'Stowe Contracting offers specialized mechanical concrete installation for residential and commercial projects in the Monterey Bay area.',
      path: '/services/mechanical-installation',
    },
    verificationNote:
      'General capability confirmed via Adam Cox interview. Activate after vr-service-list resolves.',
    lastReviewedAt: '2026-08-07',
  },

  // ── Concrete Flatwork ────────────────────────────────────────────────────────
  {
    id: 'service-concrete-flatwork',
    type: 'service',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'draft',
    serviceKey: 'concrete-flatwork',
    name: 'Concrete Flatwork',
    description:
      'Driveways, walkways, patios, and site flatwork for residential and commercial properties.',
    audience: 'both',
    cta: { label: 'Request an Estimate', href: '/estimate/residential' },
    seo: {
      title: 'Concrete Flatwork — Stowe Contracting',
      description:
        'Driveways, walkways, and concrete flatwork for residential and commercial properties in the Monterey Bay area.',
      path: '/services/concrete-flatwork',
    },
    verificationNote: 'Pending vr-service-list verification.',
    lastReviewedAt: '2026-08-07',
  },

  // ── Foundations ─────────────────────────────────────────────────────────────
  {
    id: 'service-foundations',
    type: 'service',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'draft',
    serviceKey: 'foundations',
    name: 'Foundations',
    description:
      'Residential and commercial foundation construction, including slab and perimeter foundations.',
    audience: 'both',
    cta: { label: 'Request an Estimate', href: '/estimate/residential' },
    seo: {
      title: 'Foundation Construction — Stowe Contracting',
      description: 'Residential and commercial foundation construction in the Monterey Bay area.',
      path: '/services/foundations',
    },
    verificationNote: 'Pending vr-service-list verification.',
    lastReviewedAt: '2026-08-07',
  },

  // ── Site Work ───────────────────────────────────────────────────────────────
  {
    id: 'service-site-work',
    type: 'service',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'draft',
    serviceKey: 'site-work',
    name: 'Site Work',
    description:
      'Excavation, grading, and site preparation for construction projects of varying scale.',
    audience: 'both',
    cta: { label: 'Request an Estimate', href: '/estimate/commercial' },
    seo: {
      title: 'Site Work — Stowe Contracting',
      description: 'Excavation, grading, and site preparation services in the Monterey Bay area.',
      path: '/services/site-work',
    },
    verificationNote: 'Pending vr-service-list verification.',
    lastReviewedAt: '2026-08-07',
  },
];

// ── Registry Helpers ──────────────────────────────────────────────────────────

/**
 * Returns only services that are confirmed + active.
 * Use this in all public-facing components.
 */
export function getPublishableServices(): ServiceRecord[] {
  return serviceRegistry.filter(
    (s) => s.verificationStatus === 'confirmed' && s.publicationStatus === 'active'
  );
}

/**
 * Returns a single service record by serviceKey, or null if not found.
 */
export function getServiceByKey(key: string): ServiceRecord | null {
  return serviceRegistry.find((s) => s.serviceKey === key) ?? null;
}

/**
 * Returns all services matching the given audience (or 'both').
 * Only confirmed + active records.
 */
export function getPublishableServicesByAudience(audience: ServiceAudience): ServiceRecord[] {
  return getPublishableServices().filter((s) => s.audience === audience || s.audience === 'both');
}
