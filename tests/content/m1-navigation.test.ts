// =============================================================================
// TESTS: M1 — Navigation governance
//
// Covers:
//   Test 1: getPublishableNavItems() returns only confirmed+active routes
//   Test 2: Only home route is active at M0/M1 baseline
//   Test 3: Draft and inactive routes do not appear in nav
//   Test 4: getPublishableNavItems() items have label and href
// =============================================================================

import { describe, it, expect } from 'vitest';
import { getPublishableNavItems } from '../../data/navigation';
import { siteRoutes } from '../../content/sources';
import { isPublishable } from '../../lib/content';

describe('M1 — Navigation governance', () => {
  it('Test 1 — getPublishableNavItems() returns only confirmed+active routes', () => {
    const items = getPublishableNavItems();
    // Verify each returned item has a corresponding confirmed+active route
    for (const item of items) {
      const route = siteRoutes.find((r) => r.path === item.href);
      expect(route, `Route for "${item.href}" must exist`).toBeDefined();
      expect(route && isPublishable(route), `Route "${item.href}" must be confirmed+active`).toBe(
        true
      );
    }
  });

  it('Test 2 — Home is the only confirmed+active route at M0/M1 baseline', () => {
    const publishableRoutes = siteRoutes.filter(isPublishable);
    expect(publishableRoutes).toHaveLength(1);
    expect(publishableRoutes[0].path).toBe('/');
  });

  it('Test 3 — Draft routes are not in publishable nav', () => {
    const items = getPublishableNavItems();
    const draftRoutes = siteRoutes.filter((r) => r.publicationStatus === 'draft');

    for (const draftRoute of draftRoutes) {
      const found = items.find((item) => item.href === draftRoute.path);
      expect(found, `Draft route "${draftRoute.path}" must not appear in nav`).toBeUndefined();
    }
  });

  it('Test 3b — Inactive routes are not in publishable nav', () => {
    const items = getPublishableNavItems();
    const inactiveRoutes = siteRoutes.filter((r) => r.publicationStatus === 'inactive');

    for (const inactiveRoute of inactiveRoutes) {
      const found = items.find((item) => item.href === inactiveRoute.path);
      expect(
        found,
        `Inactive route "${inactiveRoute.path}" must not appear in nav`
      ).toBeUndefined();
    }
  });

  it('Test 4 — Each nav item has both label and href', () => {
    const items = getPublishableNavItems();
    for (const item of items) {
      expect(item.label, 'Nav item must have label').toBeTruthy();
      expect(item.href, 'Nav item must have href').toBeTruthy();
    }
  });
});
