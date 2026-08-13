// =============================================================================
// TESTS: Prohibited Claim Policy
//
// Covers:
//   Test 9: Unsupported mechanical-performance language is rejected
//   Test 12 (partial): Metadata and schema reject disallowed claims
// =============================================================================

import { describe, it, expect } from 'vitest';
import { checkProhibitedClaimPolicy } from '../../lib/content/prohibited-claim-policy';
import { validateContentContext } from '../../lib/content/validate-content-context';

describe('checkProhibitedClaimPolicy()', () => {
  // Test 9: Mechanical performance language is rejected
  it('Test 9 — rejects production rate claims', () => {
    expect(checkProhibitedClaimPolicy('Our production rate is 3,000 sq ft per day.').passed).toBe(
      false
    );
    expect(checkProhibitedClaimPolicy('sq ft per day').passed).toBe(false);
    expect(checkProhibitedClaimPolicy('square feet per day').passed).toBe(false);
  });

  it('Test 9 — rejects precision tolerance language', () => {
    expect(checkProhibitedClaimPolicy('Finished to ± 3/16" tolerance.').passed).toBe(false);
    expect(checkProhibitedClaimPolicy('precision tolerance of 1/8"').passed).toBe(false);
  });

  it('Test 9 — rejects labor savings claims', () => {
    expect(
      checkProhibitedClaimPolicy('Save on labor saving costs with our equipment.').passed
    ).toBe(false);
    expect(checkProhibitedClaimPolicy('significant labor savings').passed).toBe(false);
  });

  it('Test 9 — rejects cost savings claims', () => {
    expect(checkProhibitedClaimPolicy('cost saving solution').passed).toBe(false);
    expect(checkProhibitedClaimPolicy('saves money vs traditional methods').passed).toBe(false);
  });

  it('Test 9 — rejects laser-guided / gps-guided equipment descriptions', () => {
    expect(
      checkProhibitedClaimPolicy('Our laser-guided screed delivers precision results.').passed
    ).toBe(false);
    expect(checkProhibitedClaimPolicy('GPS-guided equipment').passed).toBe(false);
  });

  it('Test 9 — rejects speed comparison claims', () => {
    expect(checkProhibitedClaimPolicy('50% faster than hand finishing.').passed).toBe(false);
  });

  it('rejects certification claims', () => {
    expect(checkProhibitedClaimPolicy('ASCC certified contractor.').passed).toBe(false);
  });

  it('rejects warranty language', () => {
    expect(checkProhibitedClaimPolicy('10-year warranty on all work.').passed).toBe(false);
    expect(checkProhibitedClaimPolicy('5-year guarantee').passed).toBe(false);
  });

  it('rejects public works claims', () => {
    expect(checkProhibitedClaimPolicy('Public works projects accepted.').passed).toBe(false);
    expect(checkProhibitedClaimPolicy('government contracts').passed).toBe(false);
  });

  it('rejects response-time guarantees', () => {
    expect(checkProhibitedClaimPolicy('We respond within 24 hours.').passed).toBe(false);
  });

  it('rejects safety statistics', () => {
    expect(checkProhibitedClaimPolicy('Our safety record speaks for itself.').passed).toBe(false);
    expect(checkProhibitedClaimPolicy('zero incidents on our job sites.').passed).toBe(false);
  });

  it('accepts confirmed claim language', () => {
    expect(checkProhibitedClaimPolicy('Nearly 40 years serving Monterey Bay.').passed).toBe(true);
    expect(checkProhibitedClaimPolicy('Locally owned and operated.').passed).toBe(true);
    expect(checkProhibitedClaimPolicy('Experienced in-house crews.').passed).toBe(true);
    expect(checkProhibitedClaimPolicy('30+ employees.').passed).toBe(true);
    expect(
      checkProhibitedClaimPolicy('Specialized mechanical installation equipment.').passed
    ).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(checkProhibitedClaimPolicy('PRODUCTION RATE').passed).toBe(false);
    expect(checkProhibitedClaimPolicy('LASER-GUIDED').passed).toBe(false);
    expect(checkProhibitedClaimPolicy('CERTIFIED').passed).toBe(false);
  });
});

// Test 12 (partial): validateContentContext catches both policy violations
describe('validateContentContext() — combined policy check', () => {
  it('Test 12 — accepts the authorized founding-year expression', () => {
    const result = validateContentContext(
      'Stowe Contracting has served Monterey Bay since 1987 with expert concrete work.'
    );
    expect(result.valid).toBe(true);
    expect(result.violations).toHaveLength(0);
  });

  it('Test 12 — catches prohibited claim in schema-style text', () => {
    const result = validateContentContext(
      'We deliver 3,000 sq ft per day with laser-guided equipment.'
    );
    expect(result.valid).toBe(false);
    expect(result.violations.some((v) => v.policy === 'prohibited-claim')).toBe(true);
  });

  it('passes for approved confirmed claim language', () => {
    const result = validateContentContext(
      'Stowe Contracting — nearly 40 years serving Monterey Bay. Locally owned and operated, 30+ employees.'
    );
    expect(result.valid).toBe(true);
    expect(result.violations).toHaveLength(0);
  });
});
