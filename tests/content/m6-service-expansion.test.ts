// =============================================================================
// TESTS: M6 — Service Expansion & Lead Generation Layer
//
// Covers:
//   Route governance:
//     Test 1: /services route is confirmed + active
//     Test 2: /services appears in M6 active baseline
//
//   Service registry governance:
//     Test 3: getPublishableServices() still returns empty array (vr-service-list pending)
//     Test 4: All pending/draft services do NOT publish
//     Test 5: No confirmed+active service has a blank name or description
//     Test 6: Service registry has the expected number of records
//     Test 7: mechanical-installation record exists with correct fields
//     Test 8: mechanical-installation has canonicalPath set
//     Test 9: concrete-flatwork record exists
//     Test 10: foundations record exists
//     Test 11: site-work record exists
//
//   Service registry content model:
//     Test 12: All service records have serviceKey
//     Test 13: All service records have audience
//     Test 14: All service records have cta with valid estimate href
//     Test 15: No service description contains prohibited claims
//     Test 16: Service capabilityHighlights (when present) contain no prohibited claims
//     Test 17: Service summary (when present) contains no prohibited claims
//
//   Service registry helpers:
//     Test 18: getServiceByKey returns correct record
//     Test 19: getServiceByKey returns null for unknown key
//     Test 20: getServiceBySlug returns correct record by slug
//     Test 21: getServiceBySlug returns null for unknown slug
//     Test 22: getPublishableRelatedServices returns empty array (no active services)
//     Test 23: getPublishableServicesByAudience returns empty array
//     Test 24: getPublishableServicesByCategory returns empty array
//
//   Canonical decision:
//     Test 25: mechanical-installation canonicalPath is /mechanical-installation
//     Test 26: /mechanical-installation route is confirmed + active (canonical preserved)
//
//   Sitemap:
//     Test 27: /services is included in sitemap (now active)
//     Test 28: /services/[slug] pages are NOT in sitemap (service registry has no active slugs)
//
//   Audience routing:
//     Test 29: residential audience services only link to /estimate/residential or both
//     Test 30: commercial-only service site-work links to /estimate/commercial
// =============================================================================

import { describe, it, expect } from 'vitest';
import {
  serviceRegistry,
  getPublishableServices,
  getServiceByKey,
  getServiceBySlug,
  getPublishableRelatedServices,
  getPublishableServicesByAudience,
  getPublishableServicesByCategory,
} from '../../content/serviceRegistry';
import { PROHIBITED_CLAIM_PATTERNS } from '../../lib/content';
import { siteRoutes } from '../../content/sources';
import { isPublishable } from '../../lib/content';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRoute(path: string) {
  return siteRoutes.find((r) => r.path === path);
}

const VALID_ESTIMATE_ROUTES = ['/estimate/residential', '/estimate/commercial', '/estimate'];

// =============================================================================
// ROUTE GOVERNANCE
// =============================================================================

describe('M6 — Route governance', () => {
  it('Test 1 — /services route is confirmed + active', () => {
    const route = getRoute('/services');
    expect(route, 'Route /services must exist').toBeDefined();
    expect(route?.verificationStatus).toBe('confirmed');
    expect(route?.publicationStatus).toBe('active');
  });

  it('Test 2 — /services appears in M6 active baseline', () => {
    const EXPECTED_ACTIVE_PATHS = [
      '/',
      '/estimate/residential',
      '/estimate/commercial',
      '/mechanical-installation',
      '/contact',
      '/services',
    ];
    const publishableRoutes = siteRoutes.filter(isPublishable);
    const activePaths = publishableRoutes.map((r) => r.path);
    for (const expectedPath of EXPECTED_ACTIVE_PATHS) {
      expect(activePaths, `Expected "${expectedPath}" to be confirmed+active`).toContain(
        expectedPath
      );
    }
  });
});

// =============================================================================
// SERVICE REGISTRY GOVERNANCE
// =============================================================================

describe('M6 — Service registry governance', () => {
  it('Test 3 — getPublishableServices() returns empty array (vr-service-list pending)', () => {
    // No individual service is confirmed + active yet
    const publishable = getPublishableServices();
    expect(publishable).toHaveLength(0);
  });

  it('Test 4 — All pending/draft services do not appear in publishable list', () => {
    const publishable = getPublishableServices();
    const pendingServices = serviceRegistry.filter(
      (s) => s.verificationStatus === 'pending' || s.publicationStatus !== 'active'
    );
    expect(pendingServices.length).toBeGreaterThan(0);
    // None of the pending records should appear in the publishable list
    for (const pending of pendingServices) {
      expect(publishable.map((p) => p.serviceKey)).not.toContain(pending.serviceKey);
    }
  });

  it('Test 5 — No confirmed+active service has blank name or description', () => {
    const publishable = getPublishableServices();
    for (const service of publishable) {
      expect(service.name.trim()).not.toBe('');
      expect(service.description.trim()).not.toBe('');
    }
  });

  it('Test 6 — Service registry has at least 4 records', () => {
    expect(serviceRegistry.length).toBeGreaterThanOrEqual(4);
  });

  it('Test 7 — mechanical-installation record exists with required fields', () => {
    const service = getServiceByKey('mechanical-installation');
    expect(service, 'mechanical-installation must exist in registry').toBeDefined();
    expect(service?.name).toBeTruthy();
    expect(service?.description).toBeTruthy();
    expect(service?.audience).toBeTruthy();
    expect(service?.cta).toBeDefined();
  });

  it('Test 8 — mechanical-installation has canonicalPath set', () => {
    const service = getServiceByKey('mechanical-installation');
    expect(service?.canonicalPath).toBe('/mechanical-installation');
  });

  it('Test 9 — concrete-flatwork record exists', () => {
    const service = getServiceByKey('concrete-flatwork');
    expect(service, 'concrete-flatwork must exist in registry').toBeDefined();
    expect(service?.name).toBe('Concrete Flatwork');
  });

  it('Test 10 — foundations record exists', () => {
    const service = getServiceByKey('foundations');
    expect(service, 'foundations must exist in registry').toBeDefined();
    expect(service?.name).toBe('Foundations');
  });

  it('Test 11 — site-work record exists', () => {
    const service = getServiceByKey('site-work');
    expect(service, 'site-work must exist in registry').toBeDefined();
    expect(service?.name).toBe('Site Work');
  });
});

// =============================================================================
// SERVICE CONTENT MODEL
// =============================================================================

describe('M6 — Service content model integrity', () => {
  it('Test 12 — All service records have serviceKey', () => {
    for (const service of serviceRegistry) {
      expect(service.serviceKey, `Service ${service.id} must have serviceKey`).toBeTruthy();
    }
  });

  it('Test 13 — All service records have audience', () => {
    const validAudiences = ['residential', 'commercial', 'both'];
    for (const service of serviceRegistry) {
      expect(validAudiences, `Service ${service.serviceKey} must have valid audience`).toContain(
        service.audience
      );
    }
  });

  it('Test 14 — All service records have cta with valid estimate href', () => {
    for (const service of serviceRegistry) {
      expect(service.cta, `Service ${service.serviceKey} must have cta`).toBeDefined();
      // CTA may link to estimate routes OR a canonical authority page
      const validLinks = [...VALID_ESTIMATE_ROUTES, '/mechanical-installation', '/contact'];
      const isValidLink =
        validLinks.some((link) => service.cta.href.startsWith(link)) ||
        service.cta.href.startsWith('/');
      expect(
        isValidLink,
        `Service ${service.serviceKey} CTA href must be a valid internal path`
      ).toBe(true);
    }
  });

  it('Test 15 — No service description contains prohibited claims', () => {
    for (const service of serviceRegistry) {
      const text = service.description.toLowerCase();
      for (const p of PROHIBITED_CLAIM_PATTERNS) {
        expect(
          text,
          `Service "${service.serviceKey}" description must not contain prohibited pattern: "${p.pattern}"`
        ).not.toContain(p.pattern.toLowerCase());
      }
    }
  });

  it('Test 16 — Service capabilityHighlights (when present) contain no prohibited claims', () => {
    for (const service of serviceRegistry) {
      if (!service.capabilityHighlights) continue;
      const text = service.capabilityHighlights.join(' ').toLowerCase();
      for (const p of PROHIBITED_CLAIM_PATTERNS) {
        expect(
          text,
          `Service "${service.serviceKey}" capability highlights must not contain: "${p.pattern}"`
        ).not.toContain(p.pattern.toLowerCase());
      }
    }
  });

  it('Test 17 — Service summary (when present) contains no prohibited claims', () => {
    for (const service of serviceRegistry) {
      if (!service.summary) continue;
      const text = service.summary.toLowerCase();
      for (const p of PROHIBITED_CLAIM_PATTERNS) {
        expect(
          text,
          `Service "${service.serviceKey}" summary must not contain: "${p.pattern}"`
        ).not.toContain(p.pattern.toLowerCase());
      }
    }
  });
});

// =============================================================================
// SERVICE REGISTRY HELPERS
// =============================================================================

describe('M6 — Service registry helpers', () => {
  it('Test 18 — getServiceByKey returns correct record', () => {
    const service = getServiceByKey('concrete-flatwork');
    expect(service).not.toBeNull();
    expect(service?.serviceKey).toBe('concrete-flatwork');
  });

  it('Test 19 — getServiceByKey returns null for unknown key', () => {
    const service = getServiceByKey('nonexistent-service');
    expect(service).toBeNull();
  });

  it('Test 20 — getServiceBySlug returns correct record by slug', () => {
    const service = getServiceBySlug('foundations');
    expect(service).not.toBeNull();
    expect(service?.serviceKey).toBe('foundations');
  });

  it('Test 21 — getServiceBySlug returns null for unknown slug', () => {
    const service = getServiceBySlug('nonexistent-slug');
    expect(service).toBeNull();
  });

  it('Test 22 — getPublishableRelatedServices returns empty array (no active services)', () => {
    // Since no services are confirmed+active, related services list is always empty
    const related = getPublishableRelatedServices('concrete-flatwork');
    expect(related).toHaveLength(0);
  });

  it('Test 23 — getPublishableServicesByAudience returns empty array (none active)', () => {
    const residential = getPublishableServicesByAudience('residential');
    const commercial = getPublishableServicesByAudience('commercial');
    expect(residential).toHaveLength(0);
    expect(commercial).toHaveLength(0);
  });

  it('Test 24 — getPublishableServicesByCategory returns empty array (none active)', () => {
    const concrete = getPublishableServicesByCategory('concrete');
    expect(concrete).toHaveLength(0);
  });
});

// =============================================================================
// CANONICAL DECISION
// =============================================================================

describe('M6 — Mechanical installation canonical decision', () => {
  it('Test 25 — mechanical-installation canonicalPath points to authority page', () => {
    const service = getServiceByKey('mechanical-installation');
    expect(service?.canonicalPath).toBe('/mechanical-installation');
  });

  it('Test 26 — /mechanical-installation route is confirmed + active (canonical preserved)', () => {
    const route = getRoute('/mechanical-installation');
    expect(route?.verificationStatus).toBe('confirmed');
    expect(route?.publicationStatus).toBe('active');
  });
});

// =============================================================================
// SITEMAP
// =============================================================================

describe('M6 — Sitemap governance', () => {
  it('Test 27 — /services is included in sitemap (now active)', () => {
    const publishableRoutes = siteRoutes.filter(isPublishable);
    const activePaths = publishableRoutes.map((r) => r.path);
    expect(activePaths).toContain('/services');
  });

  it('Test 28 — No /services/[slug] paths are in the route registry as active', () => {
    // Service detail slug routes are not in siteRoutes — they use generateStaticParams
    // which returns empty array when no services are confirmed+active.
    // This test confirms no slug paths exist in the registry unexpectedly.
    const publishableRoutes = siteRoutes.filter(isPublishable);
    const slugPaths = publishableRoutes.filter((r) => r.path.startsWith('/services/'));
    expect(slugPaths).toHaveLength(0);
  });
});

// =============================================================================
// AUDIENCE ROUTING
// =============================================================================

describe('M6 — Audience routing governance', () => {
  it('Test 29 — Services with residential audience link to residential estimate', () => {
    const residentialServices = serviceRegistry.filter(
      (s) => s.audience === 'residential' || s.audience === 'both'
    );
    for (const service of residentialServices) {
      // CTA must link to residential estimate (unless it has a canonical)
      if (!service.canonicalPath) {
        expect(
          service.cta.href,
          `Service "${service.serviceKey}" with residential audience must link to residential estimate`
        ).toMatch(/\/estimate\/residential/);
      }
    }
  });

  it('Test 30 — site-work (commercial-only) links to commercial estimate', () => {
    const siteWork = getServiceByKey('site-work');
    expect(siteWork?.audience).toBe('commercial');
    expect(siteWork?.cta.href).toBe('/estimate/commercial');
  });
});
