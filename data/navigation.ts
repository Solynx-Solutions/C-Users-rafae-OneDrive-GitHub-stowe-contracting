// =============================================================================
// NAVIGATION DATA
//
// Navigation items are governed by the content route registry.
// Only routes with verificationStatus === "confirmed" AND
// publicationStatus === "active" may render in navigation.
//
// During M0 and M1, all routes except Home are in draft or inactive status.
// This file contains the full intended nav structure; filtering is applied
// at render time via isPublishable() from lib/content.
//
// Do NOT hardcode route items that bypass the governance system.
// =============================================================================

import { type NavItem } from '@/types';
import { isPublishable } from '@/lib/content';
import { siteRoutes } from '@/content/sources';

/**
 * Returns only the nav items whose corresponding route is confirmed + active.
 * All others are filtered out.
 */
export function getPublishableNavItems(): NavItem[] {
  return siteRoutes
    .filter(isPublishable)
    .map((route) => ({
      label: route.label,
      href: route.path,
    }));
}

/**
 * Full intended primary navigation — for documentation and future use.
 * At render time, use getPublishableNavItems() instead.
 */
export const primaryNavFull: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Full intended footer navigation — for documentation and future use.
 */
export const footerNavFull: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];
