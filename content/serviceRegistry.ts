// =============================================================================
// SERVICE REGISTRY — Expanded Content Model (M6)
//
// Extends the M4 service registry with richer content fields for service
// detail pages, SEO, process descriptions, and lead generation.
//
// ARCHITECTURE DECISIONS (M6):
//   - Extended ServiceRecord is backward-compatible — all new fields optional
//   - Existing helper functions (getPublishableServices, etc.) unchanged
//   - New slug field added for URL routing (defaults to serviceKey)
//   - canonical field supports redirecting service slugs to authority pages
//   - mediaStatus gates photography sections independently of copy status
//
// PUBLIC RENDER RULE (unchanged):
//   A service appears in the UI ONLY when:
//     verificationStatus === 'confirmed' AND publicationStatus === 'active'
//
// MECHANICAL INSTALLATION CANONICAL DECISION:
//   /mechanical-installation remains the canonical authority page.
//   The service registry record for 'mechanical-installation' carries:
//     canonicalPath: '/mechanical-installation'
//   When the service slug route is requested, it redirects to the canonical.
//   No duplicate SEO content is created.
//
// Source: Priority-1 (Adam Cox discovery interview)
// Blocker: vr-service-list — individual services require client verification.
// =============================================================================

import { type GovernedContent } from '@/lib/content/types';

// ── Service Audience ──────────────────────────────────────────────────────────

export type ServiceAudience = 'residential' | 'commercial' | 'both';

// ── Service Category ──────────────────────────────────────────────────────────

export type ServiceCategory =
  'concrete' | 'mechanical' | 'foundations' | 'site-preparation' | 'general';

// ── Service Media Status ──────────────────────────────────────────────────────

/**
 * Tracks the availability of media assets for this service.
 * A service's media section only renders when status === 'ready'.
 */
export type ServiceMediaStatus = 'ready' | 'pending' | 'not-applicable';

// ── Service CTA ───────────────────────────────────────────────────────────────

export interface ServiceCta {
  label: string;
  href: '/estimate/residential' | '/estimate/commercial' | '/estimate' | string;
}

// ── Process Step ─────────────────────────────────────────────────────────────

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

// ── Service Record ────────────────────────────────────────────────────────────

export interface ServiceRecord extends GovernedContent {
  type: 'service';

  // ── Identity ──────────────────────────────────────────────────────────────
  /** Short machine-readable key. Primary lookup identifier. */
  serviceKey: string;
  /**
   * URL slug for /services/[slug] route.
   * Defaults to serviceKey if not specified.
   * If canonicalPath is set, the slug route redirects there.
   */
  slug?: string;
  /** Display name of the service. */
  name: string;
  /** Service category for grouping and filtering. */
  category?: ServiceCategory;
  /** Who this service is primarily for. */
  audience: ServiceAudience;

  // ── Content ───────────────────────────────────────────────────────────────
  /**
   * One-sentence description of what the service covers.
   * Must not contain prohibited claims (performance, cost, speed, certifications).
   */
  description: string;
  /**
   * 2–3 sentence expanded summary for service detail pages.
   * Only rendered on confirmed + active services.
   */
  summary?: string;
  /**
   * Short bullet-form capability highlights (3–5 items).
   * Each item must be a confirmed, verifiable statement.
   * Must not contain prohibited claims.
   */
  capabilityHighlights?: string[];
  /**
   * Customer-facing benefits of this service (3–5 items).
   * Must be confirmed, not aspirational or invented.
   */
  benefits?: string[];
  /**
   * Step-by-step process description.
   * Only render when all steps are verified against a Priority-1 source.
   */
  process?: ServiceProcessStep[];
  /**
   * Related service keys (from serviceKey).
   * Used to render a related services section on detail pages.
   */
  relatedServices?: string[];

  // ── Routing ───────────────────────────────────────────────────────────────
  /**
   * Primary CTA for this service card.
   * Always links to an estimate route — never to an unbuilt service detail page.
   */
  cta: ServiceCta;
  /**
   * If set, /services/[slug] redirects here instead of rendering a detail page.
   * Use for services that have a dedicated authority page (e.g., /mechanical-installation).
   */
  canonicalPath?: string;

  // ── Media ─────────────────────────────────────────────────────────────────
  /**
   * Current status of media assets (photography, imagery) for this service.
   * Set to 'ready' only when real, Stowe-owned imagery is available.
   * Media sections are hidden when status !== 'ready'.
   */
  mediaStatus?: ServiceMediaStatus;

  // ── SEO ───────────────────────────────────────────────────────────────────
  /**
   * SEO metadata for the service detail page.
   * Only used when publicationStatus === 'active'.
   */
  seo?: {
    title: string;
    description: string;
    /** URL path for the service detail page. */
    path: string;
  };

  // ── Governance ────────────────────────────────────────────────────────────
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
 * All service records except mechanical-installation are pending
 * vr-service-list verification. To activate a service:
 *   1. verificationStatus: 'confirmed'
 *   2. publicationStatus: 'active'
 *   3. Add verificationNote with source and date
 *   4. Update lastReviewedAt
 *   5. If service needs a detail page, remove canonicalPath
 *      and add summary, capabilityHighlights, benefits, process
 *
 * The registry is the single source of truth for service content.
 * Components read from this registry — no hardcoded service content anywhere.
 */
export const serviceRegistry: ServiceRecord[] = [
  // ── Mechanical Installation ─────────────────────────────────────────────────
  // Confirmed at the general capability level (mechanical-equipment claim).
  // Canonical authority page: /mechanical-installation
  // The slug route /services/mechanical-installation redirects to canonical.
  {
    id: 'service-mechanical-installation',
    type: 'service',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'draft',
    // CANONICAL DECISION (M6):
    //   /mechanical-installation is the authority page for this capability.
    //   Set publicationStatus to 'active' only after vr-service-list resolves.
    //   When activated, the slug route will redirect to canonicalPath.
    serviceKey: 'mechanical-installation',
    slug: 'mechanical-installation',
    name: 'Mechanical Installation',
    category: 'mechanical',
    audience: 'both',
    description:
      'Concrete installation using specialized mechanical equipment, operated by experienced in-house crews. Suitable for residential and commercial applications.',
    summary:
      'Stowe Contracting operates specialized mechanical equipment for concrete installation. Our in-house crews are trained on this equipment and have applied it across residential and commercial projects in the Monterey Bay area.',
    capabilityHighlights: [
      'Specialized mechanical equipment operated by in-house crews',
      'Applicable to residential and commercial concrete work',
      'Equipment capability available across the Monterey Bay area',
    ],
    cta: { label: 'Learn More', href: '/mechanical-installation' },
    canonicalPath: '/mechanical-installation',
    mediaStatus: 'pending',
    relatedServices: ['concrete-flatwork', 'foundations'],
    seo: {
      title: 'Mechanical Installation — Stowe Contracting',
      description:
        'Stowe Contracting offers specialized mechanical concrete installation for residential and commercial projects in the Monterey Bay area.',
      path: '/services/mechanical-installation',
    },
    verificationNote:
      'General capability confirmed via Adam Cox interview. canonicalPath set to /mechanical-installation. Activate after vr-service-list resolves.',
    lastReviewedAt: '2026-08-09',
  },

  // ── Concrete Flatwork ────────────────────────────────────────────────────────
  // PENDING vr-service-list. Do not activate without client verification.
  {
    id: 'service-concrete-flatwork',
    type: 'service',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'draft',
    serviceKey: 'concrete-flatwork',
    slug: 'concrete-flatwork',
    name: 'Concrete Flatwork',
    category: 'concrete',
    audience: 'both',
    description:
      'Driveways, walkways, patios, and site flatwork for residential and commercial properties.',
    summary:
      'Concrete flatwork services for residential and commercial properties across the Monterey Bay area. Our in-house crews handle driveways, walkways, patios, and commercial flatwork.',
    capabilityHighlights: [
      'Driveways and approach aprons',
      'Walkways, patios, and outdoor slabs',
      'Commercial flatwork and parking areas',
    ],
    cta: { label: 'Request an Estimate', href: '/estimate/residential' },
    mediaStatus: 'pending',
    relatedServices: ['foundations', 'site-work'],
    seo: {
      title: 'Concrete Flatwork — Stowe Contracting',
      description:
        'Driveways, walkways, and concrete flatwork for residential and commercial properties in the Monterey Bay area.',
      path: '/services/concrete-flatwork',
    },
    verificationNote: 'Pending vr-service-list verification.',
    lastReviewedAt: '2026-08-09',
  },

  // ── Foundations ─────────────────────────────────────────────────────────────
  // PENDING vr-service-list. Do not activate without client verification.
  {
    id: 'service-foundations',
    type: 'service',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'draft',
    serviceKey: 'foundations',
    slug: 'foundations',
    name: 'Foundations',
    category: 'foundations',
    audience: 'both',
    description:
      'Residential and commercial foundation construction, including slab and perimeter foundations.',
    summary:
      'Foundation construction for residential and commercial buildings in the Monterey Bay area. Our crews have experience with slab and perimeter foundation types across a range of project scales.',
    capabilityHighlights: [
      'Slab foundations for residential and commercial structures',
      'Perimeter foundation systems',
      'Foundation work coordinated with site preparation',
    ],
    cta: { label: 'Request an Estimate', href: '/estimate/residential' },
    mediaStatus: 'pending',
    relatedServices: ['concrete-flatwork', 'site-work'],
    seo: {
      title: 'Foundation Construction — Stowe Contracting',
      description: 'Residential and commercial foundation construction in the Monterey Bay area.',
      path: '/services/foundations',
    },
    verificationNote: 'Pending vr-service-list verification.',
    lastReviewedAt: '2026-08-09',
  },

  // ── Site Work ───────────────────────────────────────────────────────────────
  // PENDING vr-service-list. Do not activate without client verification.
  {
    id: 'service-site-work',
    type: 'service',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'draft',
    serviceKey: 'site-work',
    slug: 'site-work',
    name: 'Site Work',
    category: 'site-preparation',
    audience: 'commercial',
    description:
      'Excavation, grading, and site preparation for construction projects of varying scale.',
    summary:
      'Site preparation services for commercial construction projects. Our crews handle excavation, grading, and site readiness work in coordination with foundation and flatwork scopes.',
    capabilityHighlights: [
      'Excavation and grading',
      'Site preparation for foundation work',
      'Commercial construction site readiness',
    ],
    cta: { label: 'Request an Estimate', href: '/estimate/commercial' },
    mediaStatus: 'pending',
    relatedServices: ['foundations', 'concrete-flatwork'],
    seo: {
      title: 'Site Work — Stowe Contracting',
      description: 'Excavation, grading, and site preparation services in the Monterey Bay area.',
      path: '/services/site-work',
    },
    verificationNote: 'Pending vr-service-list verification.',
    lastReviewedAt: '2026-08-09',
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
 * Returns a single service record by slug, or null if not found.
 * Slug defaults to serviceKey when not explicitly set.
 */
export function getServiceBySlug(slug: string): ServiceRecord | null {
  return serviceRegistry.find((s) => (s.slug ?? s.serviceKey) === slug) ?? null;
}

/**
 * Returns all services matching the given audience (or 'both').
 * Only confirmed + active records.
 */
export function getPublishableServicesByAudience(audience: ServiceAudience): ServiceRecord[] {
  return getPublishableServices().filter((s) => s.audience === audience || s.audience === 'both');
}

/**
 * Returns all publishable services for a given category.
 */
export function getPublishableServicesByCategory(category: ServiceCategory): ServiceRecord[] {
  return getPublishableServices().filter((s) => s.category === category);
}

/**
 * Returns related service records for a given service.
 * Only returns records that are confirmed + active.
 * Related services that are pending/draft are silently excluded.
 */
export function getPublishableRelatedServices(serviceKey: string): ServiceRecord[] {
  const record = getServiceByKey(serviceKey);
  if (!record?.relatedServices) return [];
  const publishable = getPublishableServices();
  return publishable.filter((s) => record.relatedServices!.includes(s.serviceKey));
}
