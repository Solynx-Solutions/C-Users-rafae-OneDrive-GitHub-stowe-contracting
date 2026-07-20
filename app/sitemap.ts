// =============================================================================
// SITEMAP — Governed route-based sitemap
//
// Only routes that are BOTH confirmed AND active enter the sitemap.
// This enforces the content governance render rule at the sitemap level.
//
// Routes are sourced exclusively from the content route registry.
// Do not add hardcoded URLs here.
// =============================================================================

import { type MetadataRoute } from 'next';
import { siteRoutes } from '@/content/sources';
import { isPublishable } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stowecontracting.com';

  return siteRoutes.filter(isPublishable).map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq ?? 'monthly',
    priority: route.sitemapPriority ?? 0.5,
  }));
}
