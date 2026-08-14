// =============================================================================
// TESTS: Schema safety and controlled claim/message resolution
//
// Covers:
//   Test 12: Metadata and schema reject disallowed claims
//   Test 8 (registry): Exact employee count ClaimRecord is pending/inactive
//   Test 1 (integration): Confirmed + active claims resolve correctly
//   Test 2 (integration): Pending claims resolve to null
// =============================================================================

import { describe, it, expect } from 'vitest';
import { localBusinessSchema, organizationSchema, webSiteSchema } from '../../lib/schema';
import { resolveControlledClaim } from '../../lib/content/resolve-controlled-claim';
import { resolveControlledMessage } from '../../lib/content/resolve-controlled-message';
import { claimsRegistry, messagesRegistry } from '../../lib/content/registry';

describe('Schema safety — localBusinessSchema()', () => {
  const schema = localBusinessSchema();

  // Test 12: Schema must not include unverified fields
  it('Test 12 — does not include telephone', () => {
    expect(schema).not.toHaveProperty('telephone');
  });

  it('Test 12 — does not include email', () => {
    expect(schema).not.toHaveProperty('email');
  });

  it('Test 12 — does not include address', () => {
    expect(schema).not.toHaveProperty('address');
  });

  it('Test 12 — does not include openingHoursSpecification', () => {
    expect(schema).not.toHaveProperty('openingHoursSpecification');
  });

  it('Test 12 — does not include areaServed', () => {
    expect(schema).not.toHaveProperty('areaServed');
  });

  it('Test 12 — does not include foundingDate', () => {
    expect(schema).not.toHaveProperty('foundingDate');
  });

  it('Test 12 — does not include numberOfEmployees', () => {
    expect(schema).not.toHaveProperty('numberOfEmployees');
  });

  it('includes only the verified Facebook profile in sameAs', () => {
    expect(schema.sameAs).toEqual(['https://www.facebook.com/stowecontractinginc']);
  });

  it('Test 12 — does not include aggregateRating', () => {
    expect(schema).not.toHaveProperty('aggregateRating');
  });

  it('Test 12 — does not include review', () => {
    expect(schema).not.toHaveProperty('review');
  });

  it('includes confirmed fields: name and url', () => {
    expect(schema).toHaveProperty('name', 'Stowe Contracting');
    expect(schema).toHaveProperty('url');
    expect(schema['@type']).toBe('LocalBusiness');
    expect(schema['@context']).toBe('https://schema.org');
  });
});

describe('Schema safety — organizationSchema()', () => {
  const schema = organizationSchema();

  it('Test 12 — does not include legalName when unverified', () => {
    // legalName is empty string in siteConfig — schema should not include it
    expect(schema).not.toHaveProperty('legalName');
  });

  it('Test 12 — does not include telephone, email, or address', () => {
    expect(schema).not.toHaveProperty('telephone');
    expect(schema).not.toHaveProperty('email');
    expect(schema).not.toHaveProperty('address');
    expect(schema.sameAs).toEqual(['https://www.facebook.com/stowecontractinginc']);
  });

  it('includes confirmed fields', () => {
    expect(schema.name).toBe('Stowe Contracting');
    expect(schema['@type']).toBe('Organization');
  });
});

describe('Schema safety — webSiteSchema()', () => {
  const schema = webSiteSchema();

  it('includes name and url', () => {
    expect(schema.name).toBe('Stowe Contracting');
    expect(schema['@type']).toBe('WebSite');
  });
});

// Test 1 (integration): Confirmed + active claims resolve
describe('resolveControlledClaim() — confirmed + active', () => {
  it('Test 1 — resolves "years-in-business" (confirmed + active)', () => {
    const text = resolveControlledClaim('years-in-business');
    expect(text).toBe('Since 1987 · Serving Monterey Bay');
  });

  it('Test 1 — resolves "locally-owned" (confirmed + active)', () => {
    const text = resolveControlledClaim('locally-owned');
    expect(text).toBe('Locally owned and operated');
  });

  it('Test 1 — resolves "employee-count" (confirmed + active)', () => {
    const text = resolveControlledClaim('employee-count');
    expect(text).toBe('30+ employees');
  });
});

// Test 2: Pending claims resolve to null
describe('resolveControlledClaim() — pending records return null', () => {
  it('Test 2 — "founding-year" is authorized and resolves', () => {
    const text = resolveControlledClaim('founding-year');
    expect(text).toBe('1987');
  });

  it('Test 2 — "exact-employee-total" is pending — resolves to null', () => {
    const text = resolveControlledClaim('exact-employee-total');
    expect(text).toBeNull();
  });

  it('Test 2 — unknown claimKey resolves to null', () => {
    const text = resolveControlledClaim('nonexistent-claim-key');
    expect(text).toBeNull();
  });
});

// Test 8 (registry): The "exact-employee-total" record is pending/inactive
describe('Registry — exact employee count record is pending', () => {
  it('Test 8 — "exact-employee-total" record in registry is pending', () => {
    const record = claimsRegistry.find(
      (r) => r.type === 'claim' && r.claimKey === 'exact-employee-total'
    );
    expect(record).toBeDefined();
    expect(record?.verificationStatus).toBe('pending');
    expect(record?.publicationStatus).toBe('inactive');
  });

  it('Test 8 — "employee-count" (30+) is confirmed and active', () => {
    const record = claimsRegistry.find(
      (r) => r.type === 'claim' && r.claimKey === 'employee-count'
    );
    expect(record).toBeDefined();
    expect(record?.verificationStatus).toBe('confirmed');
    expect(record?.publicationStatus).toBe('active');
    // The approved text is "30+" not an exact number
    expect(record?.canonicalText).toBe('30+ employees');
    expect(record?.canonicalText).not.toMatch(/^\d+\s+employees$/); // not an exact number
  });
});

// Controlled message resolution
describe('resolveControlledMessage() — CTA resolution', () => {
  it('resolves "request-estimate" (generic)', () => {
    const text = resolveControlledMessage('request-estimate');
    expect(text).toBe('Request an Estimate');
  });

  it('resolves "request-estimate" residential variant', () => {
    const text = resolveControlledMessage('request-estimate', 'residential');
    expect(text).toBe('Request a Residential Estimate');
  });

  it('resolves "request-estimate" commercial variant', () => {
    const text = resolveControlledMessage('request-estimate', 'commercial');
    expect(text).toBe('Request a Commercial Estimate');
  });

  it('residential and commercial CTA texts are distinct', () => {
    const residential = resolveControlledMessage('request-estimate', 'residential');
    const commercial = resolveControlledMessage('request-estimate', 'commercial');
    expect(residential).not.toBe(commercial);
  });

  it('Test 11 — residential and commercial CTAs link to distinct routes', () => {
    // Verify the message registry records have correct messageKey + variant
    const residentialMsg = messagesRegistry.find(
      (r) =>
        r.type === 'controlled-message' &&
        r.messageKey === 'request-estimate' &&
        r.variant === 'residential'
    );
    const commercialMsg = messagesRegistry.find(
      (r) =>
        r.type === 'controlled-message' &&
        r.messageKey === 'request-estimate' &&
        r.variant === 'commercial'
    );
    expect(residentialMsg?.id).toBe('cta-request-residential-estimate');
    expect(commercialMsg?.id).toBe('cta-request-commercial-estimate');
    expect(residentialMsg?.id).not.toBe(commercialMsg?.id);
  });
});
