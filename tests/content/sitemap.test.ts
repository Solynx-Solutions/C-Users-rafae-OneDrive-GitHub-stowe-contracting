// =============================================================================
// TESTS: Sitemap governance
//
// Covers:
//   Test 10: Pending routes do not enter the sitemap
//   Test 11: Residential and commercial estimate routes remain distinct
// =============================================================================

import { describe, it, expect } from 'vitest';
import { siteRoutes } from '../../content/sources';
import { isPublishable } from '../../lib/content/can-publish';
import { type RouteRecord } from '../../lib/content/types';

describe('Sitemap route governance', () => {
  const publishableRoutes = siteRoutes.filter(isPublishable);
  const allPaths = publishableRoutes.map((r) => r.path);

  // Test 10: Pending routes do not enter the sitemap
  it('Test 10 — pending routes do not enter the sitemap', () => {
    const pendingRoutes = siteRoutes.filter((r) => r.verificationStatus === 'pending');
    pendingRoutes.forEach((route) => {
      expect(allPaths).not.toContain(route.path);
    });
  });

  it('Test 10 — inactive routes do not enter the sitemap', () => {
    const inactiveRoutes = siteRoutes.filter((r) => r.publicationStatus === 'inactive');
    inactiveRoutes.forEach((route) => {
      expect(allPaths).not.toContain(route.path);
    });
  });

  it('Test 10 — draft routes do not enter the sitemap', () => {
    const draftRoutes = siteRoutes.filter((r) => r.publicationStatus === 'draft');
    draftRoutes.forEach((route) => {
      expect(allPaths).not.toContain(route.path);
    });
  });

  it('Test 10 — only confirmed + active routes are in the sitemap', () => {
    publishableRoutes.forEach((route) => {
      expect(route.verificationStatus).toBe('confirmed');
      expect(route.publicationStatus).toBe('active');
    });
  });

  it('Test 10 — /services is NOT in the sitemap (pending)', () => {
    expect(allPaths).not.toContain('/services');
  });

  it('Test 10 — /projects is NOT in the sitemap (pending/inactive)', () => {
    expect(allPaths).not.toContain('/projects');
  });

  it('Test 10 — /blog is NOT in the sitemap (pending/inactive)', () => {
    expect(allPaths).not.toContain('/blog');
  });

  // Test 11: Residential and commercial estimate routes remain distinct
  it('Test 11 — residential estimate route exists as a distinct record', () => {
    const residentialRoute = siteRoutes.find(
      (r): r is RouteRecord => r.type === 'route' && r.path === '/estimate/residential'
    );
    expect(residentialRoute).toBeDefined();
    expect(residentialRoute?.id).toBe('route-estimate-residential');
  });

  it('Test 11 — commercial estimate route exists as a distinct record', () => {
    const commercialRoute = siteRoutes.find(
      (r): r is RouteRecord => r.type === 'route' && r.path === '/estimate/commercial'
    );
    expect(commercialRoute).toBeDefined();
    expect(commercialRoute?.id).toBe('route-estimate-commercial');
  });

  it('Test 11 — residential and commercial estimate routes are not the same path', () => {
    const residentialRoute = siteRoutes.find((r) => r.path === '/estimate/residential');
    const commercialRoute = siteRoutes.find((r) => r.path === '/estimate/commercial');
    expect(residentialRoute?.path).not.toBe(commercialRoute?.path);
    expect(residentialRoute?.id).not.toBe(commercialRoute?.id);
  });

  it('Test 11 — no single generic /estimate route that serves both', () => {
    const genericEstimate = siteRoutes.find((r) => r.path === '/estimate');
    expect(genericEstimate).toBeUndefined();
  });
});
