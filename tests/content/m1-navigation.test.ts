// =============================================================================
// TESTS: M1 — Navigation governance
//
// Covers:
// Tests:
//   Test 1: getPublishableNavItems() returns only confirmed+active routes
//   Test 2: Active routes at current milestone (updated at M3)
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

  it('Test 2 — core navigation is Home, Services, Projects, About, and Contact', () => {
    // Updated at M6: /services was activated.
    // Add new active routes here as milestones activate them.
    expect(getPublishableNavItems()).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ]);
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
