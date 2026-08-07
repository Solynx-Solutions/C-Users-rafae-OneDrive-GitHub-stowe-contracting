// =============================================================================
// CONTENT SOURCES REGISTRY
//
// Defines the approved source authority chain and all site route records.
// Routes appear in the sitemap and navigation ONLY when
// verificationStatus === "confirmed" AND publicationStatus === "active".
// =============================================================================

import { type RouteRecord } from '@/lib/content/types';

// ── Site Route Records ────────────────────────────────────────────────────────
// Only confirmed + active routes enter the sitemap and navigation.

export const siteRoutes: RouteRecord[] = [
  {
    id: 'route-home',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    path: '/',
    label: 'Home',
    sitemapPriority: 1.0,
    changefreq: 'weekly',
  },
  {
    id: 'route-about',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'draft',
    // draft — page not yet built; excluded from sitemap and navigation
    path: '/about',
    label: 'About',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
  },
  {
    id: 'route-services',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'inactive',
    // pending — individual services not yet verified
    path: '/services',
    label: 'Services',
    sitemapPriority: 0.9,
    changefreq: 'monthly',
  },
  {
    id: 'route-projects',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'inactive',
    // pending — no project content verified
    path: '/projects',
    label: 'Projects',
    sitemapPriority: 0.8,
    changefreq: 'weekly',
  },
  {
    id: 'route-contact',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'draft',
    // draft — page not yet built
    path: '/contact',
    label: 'Contact',
    sitemapPriority: 0.7,
    changefreq: 'monthly',
  },
  {
    id: 'route-blog',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'inactive',
    // pending — no blog content verified
    path: '/blog',
    label: 'Blog',
    sitemapPriority: 0.6,
    changefreq: 'weekly',
  },
  {
    id: 'route-estimate-residential',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    // M3 — estimate experience foundation. Distinct from commercial per architecture spec.
    path: '/estimate/residential',
    label: 'Request a Residential Estimate',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    verificationNote: 'Activated in M3 — estimate experience foundation milestone.',
    lastReviewedAt: '2026-08-07',
  },
  {
    id: 'route-estimate-commercial',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    // M3 — estimate experience foundation. Distinct from residential per architecture spec.
    path: '/estimate/commercial',
    label: 'Request a Commercial Estimate',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    verificationNote: 'Activated in M3 — estimate experience foundation milestone.',
    lastReviewedAt: '2026-08-07',
  },
  {
    id: 'route-privacy-policy',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'draft',
    path: '/privacy-policy',
    label: 'Privacy Policy',
    sitemapPriority: 0.3,
    changefreq: 'yearly',
  },
  {
    id: 'route-terms-of-service',
    type: 'route',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'draft',
    path: '/terms-of-service',
    label: 'Terms of Service',
    sitemapPriority: 0.3,
    changefreq: 'yearly',
  },
];
