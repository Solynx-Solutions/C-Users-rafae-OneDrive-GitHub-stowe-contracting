// =============================================================================
// TESTS: M3 — Estimate routes and form governance
//
// Covers:
//   Test 1: Residential estimate route is confirmed + active (publishable)
//   Test 2: Commercial estimate route is confirmed + active (publishable)
//   Test 3: Estimate routes appear in routesRegistry
//   Test 4: EstimateForm schema requires firstName
//   Test 5: EstimateForm schema requires lastName
//   Test 6: EstimateForm schema requires valid email
//   Test 7: EstimateForm schema requires valid phone
//   Test 8: EstimateForm schema requires serviceType
//   Test 9: EstimateForm schema requires projectDescription (min 20 chars)
//  Test 10: Valid residential submission passes schema
//  Test 11: Valid commercial submission passes schema (with companyName, contactName)
//  Test 12: preferredContactMethod enum rejects invalid values
//  Test 13: Prohibited expressions absent from page copy
//  Test 14: Existing M2 governance tests still pass (years-in-business claim)
// =============================================================================

import { describe, it, expect } from 'vitest';
import {
  resolveControlledClaim,
  isPublishable,
  PROHIBITED_CLAIM_PATTERNS,
} from '../../lib/content';
import { routesRegistry } from '../../lib/content';
import { estimateFormSchema } from '../../lib/validations/estimateForm';

// ─── Route activation tests ───────────────────────────────────────────────────

describe('M3 — Estimate route registry', () => {
  it('Test 1 — residential estimate route is confirmed + active', () => {
    const route = routesRegistry.find((r) => r.path === '/estimate/residential');
    expect(route, 'route-estimate-residential must be in routesRegistry').toBeDefined();
    expect(route?.verificationStatus).toBe('confirmed');
    expect(route?.publicationStatus).toBe('active');
    expect(isPublishable(route!)).toBe(true);
  });

  it('Test 2 — commercial estimate route is confirmed + active', () => {
    const route = routesRegistry.find((r) => r.path === '/estimate/commercial');
    expect(route, 'route-estimate-commercial must be in routesRegistry').toBeDefined();
    expect(route?.verificationStatus).toBe('confirmed');
    expect(route?.publicationStatus).toBe('active');
    expect(isPublishable(route!)).toBe(true);
  });

  it('Test 3 — both estimate routes present in routesRegistry', () => {
    const paths = routesRegistry.map((r) => r.path);
    expect(paths).toContain('/estimate/residential');
    expect(paths).toContain('/estimate/commercial');
  });
});

// ─── Zod schema validation tests ─────────────────────────────────────────────

describe('M3 — EstimateForm schema validation', () => {
  // Valid base fixture — residential shape
  const VALID_BASE = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '8315550000',
    serviceType: 'concrete-flatwork',
    projectDescription: 'We need a new concrete driveway installed at our property.',
    timeline: '',
    budget: '',
  };

  it('Test 4 — firstName is required', () => {
    const result = estimateFormSchema.safeParse({ ...VALID_BASE, firstName: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === 'firstName');
      expect(issue, 'firstName field should have a validation error').toBeDefined();
    }
  });

  it('Test 5 — lastName is required', () => {
    const result = estimateFormSchema.safeParse({ ...VALID_BASE, lastName: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === 'lastName');
      expect(issue, 'lastName field should have a validation error').toBeDefined();
    }
  });

  it('Test 6 — email must be valid', () => {
    const result = estimateFormSchema.safeParse({ ...VALID_BASE, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailIssue = result.error.issues.find((i) => i.path[0] === 'email');
      expect(emailIssue, 'email field should have a validation error').toBeDefined();
    }
  });

  it('Test 7 — phone must be valid', () => {
    const result = estimateFormSchema.safeParse({ ...VALID_BASE, phone: '12' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const phoneIssue = result.error.issues.find((i) => i.path[0] === 'phone');
      expect(phoneIssue, 'phone field should have a validation error').toBeDefined();
    }
  });

  it('Test 8 — serviceType is required', () => {
    const result = estimateFormSchema.safeParse({ ...VALID_BASE, serviceType: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const stIssue = result.error.issues.find((i) => i.path[0] === 'serviceType');
      expect(stIssue, 'serviceType field should have a validation error').toBeDefined();
    }
  });

  it('Test 9 — projectDescription requires at least 20 characters', () => {
    const result = estimateFormSchema.safeParse({
      ...VALID_BASE,
      projectDescription: 'Too short.',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const descIssue = result.error.issues.find((i) => i.path[0] === 'projectDescription');
      expect(descIssue, 'projectDescription field should have a validation error').toBeDefined();
    }
  });

  it('Test 10 — valid residential submission passes schema', () => {
    const result = estimateFormSchema.safeParse({
      ...VALID_BASE,
      propertyType: 'single-family',
      preferredContactMethod: 'phone',
    });
    expect(result.success).toBe(true);
  });

  it('Test 11 — valid commercial submission passes schema (with companyName + contactName)', () => {
    const result = estimateFormSchema.safeParse({
      ...VALID_BASE,
      companyName: 'Acme Construction LLC',
      contactName: 'Bob Jones',
      serviceType: 'foundation',
      projectDescription: 'We need a commercial slab poured for a new warehouse facility.',
      preferredContactMethod: 'email',
    });
    expect(result.success).toBe(true);
  });

  it('Test 12 — preferredContactMethod rejects values outside the enum', () => {
    const result = estimateFormSchema.safeParse({
      ...VALID_BASE,
      preferredContactMethod: 'text-message', // invalid
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === 'preferredContactMethod');
      expect(issue, 'preferredContactMethod should reject invalid enum value').toBeDefined();
    }
  });
});

// ─── Content governance tests ─────────────────────────────────────────────────

describe('M3 — Content governance', () => {
  it('Test 13 — prohibited expressions absent from estimate page copy strings', () => {
    // All static copy strings used in the estimate pages
    const staticCopy = [
      'Request a Residential Estimate',
      'Request a Commercial Estimate',
      'Tell us about your project.',
      'An established workforce and specialized equipment.',
      'Built for Commercial Work',
      'Experienced In-House Crews',
      'Specialized Equipment',
      'Straightforward Process',
    ]
      .join(' ')
      .toLowerCase();

    for (const entry of PROHIBITED_CLAIM_PATTERNS) {
      const pattern = entry.pattern.toLowerCase();
      expect(
        staticCopy,
        `Estimate page copy must not contain prohibited: "${pattern}"`
      ).not.toContain(pattern);
    }
  });

  it('Test 14 — years-in-business claim still resolves (M2 regression)', () => {
    const claim = resolveControlledClaim('years-in-business');
    expect(claim).not.toBeNull();
    expect(claim?.toLowerCase()).toContain('nearly 40 years');
  });
});
