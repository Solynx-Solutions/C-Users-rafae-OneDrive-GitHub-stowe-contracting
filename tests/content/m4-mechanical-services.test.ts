// =============================================================================
// TESTS: M4 — Mechanical Installation Page + Services Foundation
//
// Covers:
//   Routes:
//     Test 1: /mechanical-installation route is confirmed + active
//     Test 2: /services route exists in registry
//
//   Mechanical installation governance:
//     Test 3: mechanical-equipment claim resolves
//     Test 4: Hero claims resolve (in-house-crews, years-in-business, locally-owned)
//     Test 5: Process step claims contain no prohibited language
//     Test 6: Residential + commercial capability claims resolve
//     Test 7: CTA messages resolve for mechanical page
//
//   Service registry governance:
//     Test 8: No services are currently publishable (all draft/pending)
//     Test 9: getPublishableServices() returns empty array
//     Test 10: serviceRegistry entries are non-empty
//     Test 11: Each service record has required fields
//     Test 12: No service description contains prohibited claims
//     Test 13: mechanical-installation service record exists in registry
//     Test 14: Service CTAs link to valid estimate routes
// =============================================================================

import { describe, it, expect } from 'vitest';
import { resolveControlledClaim, resolveControlledMessage } from '../../lib/content';
import { PROHIBITED_CLAIM_PATTERNS } from '../../lib/content';
import { serviceRegistry, getPublishableServices } from '../../content/serviceRegistry';
import { siteRoutes } from '../../content/sources';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRoute(path: string) {
  return siteRoutes.find((r) => r.path === path);
}

const VALID_ESTIMATE_ROUTES = ['/estimate/residential', '/estimate/commercial', '/estimate'];

// =============================================================================
// ROUTE TESTS
// =============================================================================

describe('M4 — Routes governance', () => {
  it('Test 1 — /mechanical-installation route is confirmed + active', () => {
    const route = getRoute('/mechanical-installation');
    expect(route, 'Route /mechanical-installation must exist').toBeDefined();
    expect(route?.verificationStatus).toBe('confirmed');
    expect(route?.publicationStatus).toBe('active');
  });

  it('Test 2 — /services route exists in registry', () => {
    const route = getRoute('/services');
    expect(route, 'Route /services must exist').toBeDefined();
    expect(route?.verificationStatus).toBe('confirmed');
    // Services page is in draft until vr-service-list resolves
    expect(['draft', 'active']).toContain(route?.publicationStatus);
  });
});

// =============================================================================
// MECHANICAL INSTALLATION GOVERNANCE
// =============================================================================

describe('M4 — Mechanical installation governance', () => {
  it('Test 3 — mechanical-equipment claim resolves', () => {
    const claim = resolveControlledClaim('mechanical-equipment');
    expect(claim).not.toBeNull();
    expect(claim).toBe('Specialized mechanical installation equipment');
  });

  it('Test 4 — hero claims resolve (in-house-crews, years-in-business, locally-owned)', () => {
    const inHouseCrews = resolveControlledClaim('in-house-crews');
    const yearsInBusiness = resolveControlledClaim('years-in-business');
    const locallyOwned = resolveControlledClaim('locally-owned');

    expect(inHouseCrews).not.toBeNull();
    expect(yearsInBusiness).not.toBeNull();
    expect(locallyOwned).not.toBeNull();
  });

  it('Test 5 — claim content contains no prohibited language', () => {
    const claims = [
      resolveControlledClaim('mechanical-equipment') ?? '',
      resolveControlledClaim('in-house-crews') ?? '',
      resolveControlledClaim('years-in-business') ?? '',
      resolveControlledClaim('locally-owned') ?? '',
      resolveControlledClaim('long-term-employees') ?? '',
    ];

    const combined = claims.join(' ').toLowerCase();

    for (const entry of PROHIBITED_CLAIM_PATTERNS) {
      const pattern = entry.pattern.toLowerCase();
      expect(combined, `Claim content must not contain prohibited: "${pattern}"`).not.toContain(
        pattern
      );
    }
  });

  it('Test 6 — residential and commercial capability claims resolve', () => {
    const residential = resolveControlledClaim('residential-capability');
    const commercial = resolveControlledClaim('commercial-capability');
    expect(residential).not.toBeNull();
    expect(commercial).not.toBeNull();
  });

  it('Test 7 — CTA messages resolve for mechanical page (dual variant)', () => {
    const generic = resolveControlledMessage('request-estimate');
    const residential = resolveControlledMessage('request-estimate', 'residential');
    const commercial = resolveControlledMessage('request-estimate', 'commercial');

    expect(generic).not.toBeNull();
    expect(residential).not.toBeNull();
    expect(commercial).not.toBeNull();

    expect(residential?.toLowerCase()).toContain('residential');
    expect(commercial?.toLowerCase()).toContain('commercial');
  });
});

// =============================================================================
// SERVICE REGISTRY GOVERNANCE
// =============================================================================

describe('M4 — Service registry governance', () => {
  it('Test 8 — no services are currently publishable (vr-service-list pending)', () => {
    // All services are in draft/pending until vr-service-list resolves
    const publishable = getPublishableServices();
    expect(publishable).toHaveLength(0);
  });

  it('Test 9 — getPublishableServices() returns empty array', () => {
    const result = getPublishableServices();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  it('Test 10 — serviceRegistry is non-empty and contains entries', () => {
    expect(serviceRegistry.length).toBeGreaterThan(0);
  });

  it('Test 11 — each service record has required fields', () => {
    for (const service of serviceRegistry) {
      expect(service, 'Service must have id').toHaveProperty('id');
      expect(service, 'Service must have type').toHaveProperty('type');
      expect(service.type).toBe('service');
      expect(service, 'Service must have serviceKey').toHaveProperty('serviceKey');
      expect(service.serviceKey.length).toBeGreaterThan(0);
      expect(service, 'Service must have name').toHaveProperty('name');
      expect(service.name.length).toBeGreaterThan(0);
      expect(service, 'Service must have description').toHaveProperty('description');
      expect(service.description.length).toBeGreaterThan(0);
      expect(service, 'Service must have audience').toHaveProperty('audience');
      expect(['residential', 'commercial', 'both']).toContain(service.audience);
      expect(service, 'Service must have cta').toHaveProperty('cta');
      expect(service.cta.href.length).toBeGreaterThan(0);
    }
  });

  it('Test 12 — no service description contains prohibited claims', () => {
    for (const service of serviceRegistry) {
      const text = [service.name, service.description].join(' ').toLowerCase();
      for (const entry of PROHIBITED_CLAIM_PATTERNS) {
        const pattern = entry.pattern.toLowerCase();
        expect(
          text,
          `Service "${service.serviceKey}" must not contain prohibited: "${pattern}"`
        ).not.toContain(pattern);
      }
    }
  });

  it('Test 13 — mechanical-installation service record exists in registry', () => {
    const mechService = serviceRegistry.find((s) => s.serviceKey === 'mechanical-installation');
    expect(mechService, 'mechanical-installation service must be in registry').toBeDefined();
    expect(mechService?.source).toBe('priority-1-discovery-interview');
  });

  it('Test 14 — all service CTAs link to valid estimate routes', () => {
    for (const service of serviceRegistry) {
      expect(
        VALID_ESTIMATE_ROUTES,
        `Service "${service.serviceKey}" CTA href must be a valid estimate route`
      ).toContain(service.cta.href);
    }
  });
});
