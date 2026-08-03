// =============================================================================
// TESTS: M1 — Trust indicators governance
//
// Covers:
//   Test 1: Confirmed trust indicator claims resolve correctly
//   Test 2: Pending trust indicators do not resolve
//   Test 3: TRUST_INDICATOR_CLAIM_KEYS are all confirmed+active
//   Test 4: No testimonials in data
// =============================================================================

import { describe, it, expect } from 'vitest';
import { resolveControlledClaim, claimsRegistry } from '../../lib/content';
import {
  TRUST_INDICATOR_CLAIM_KEYS,
  TRUST_INDICATOR_PENDING_CLAIM_KEYS,
} from '../../content/trust-indicators';
import { testimonials } from '../../data/testimonials';

describe('M1 — Trust indicators governance', () => {
  it('Test 1 — confirmed trust indicator claims resolve to non-null text', () => {
    const confirmedKeys = [
      'years-in-business',
      'employee-count',
      'in-house-crews',
      'locally-owned',
    ];

    for (const key of confirmedKeys) {
      const result = resolveControlledClaim(key);
      expect(result, `Claim "${key}" must resolve to non-null text`).not.toBeNull();
      expect(result, `Claim "${key}" must be a non-empty string`).toBeTruthy();
    }
  });

  it('Test 2 — pending trust indicators return null', () => {
    // certifications, awards, safety-statistics are pending
    for (const key of TRUST_INDICATOR_PENDING_CLAIM_KEYS) {
      const result = resolveControlledClaim(key);
      expect(result, `Pending indicator "${key}" must return null`).toBeNull();
    }
  });

  it('Test 3 — all TRUST_INDICATOR_CLAIM_KEYS are confirmed+active in registry', () => {
    for (const key of TRUST_INDICATOR_CLAIM_KEYS) {
      const record = claimsRegistry.find((r) => r.type === 'claim' && r.claimKey === key);
      expect(record, `Claim "${key}" must exist in registry`).toBeDefined();
      expect(record?.verificationStatus, `Claim "${key}" must be confirmed`).toBe('confirmed');
      expect(record?.publicationStatus, `Claim "${key}" must be active`).toBe('active');
    }
  });

  it('Test 4 — testimonials array is empty (vr-testimonials blocker)', () => {
    expect(testimonials).toHaveLength(0);
  });
});
