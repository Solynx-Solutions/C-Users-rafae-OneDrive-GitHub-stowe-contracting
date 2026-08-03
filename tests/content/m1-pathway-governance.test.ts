// =============================================================================
// TESTS: M1 — Pathway component claim governance
//
// Covers:
//   Test 1: ResidentialPathwayCard required claims are confirmed+active
//   Test 2: CommercialPathwayCard required claims are confirmed+active
//   Test 3: Residential estimate CTA resolves correctly
//   Test 4: Commercial estimate CTA resolves correctly
//   Test 5: Public works claim is NOT in commercial claim keys
//   Test 6: Service list is not in residential claim keys
// =============================================================================

import { describe, it, expect } from 'vitest';
import { resolveControlledClaim, resolveControlledMessage } from '../../lib/content';
import { RESIDENTIAL_CLAIM_KEYS, RESIDENTIAL_PENDING } from '../../content/residential-positioning';
import { COMMERCIAL_CLAIM_KEYS, COMMERCIAL_PENDING } from '../../content/commercial-positioning';

describe('M1 — Pathway component claim governance', () => {
  it('Test 1 — Residential claim keys are all confirmed+active', () => {
    for (const key of RESIDENTIAL_CLAIM_KEYS) {
      const result = resolveControlledClaim(key);
      expect(result, `Residential claim "${key}" must resolve to non-null`).not.toBeNull();
    }
  });

  it('Test 2 — Commercial claim keys are all confirmed+active', () => {
    for (const key of COMMERCIAL_CLAIM_KEYS) {
      const result = resolveControlledClaim(key);
      expect(result, `Commercial claim "${key}" must resolve to non-null`).not.toBeNull();
    }
  });

  it('Test 3 — Residential estimate CTA resolves correctly', () => {
    const cta = resolveControlledMessage('request-estimate', 'residential');
    expect(cta).not.toBeNull();
    expect(cta).toBeTruthy();
    expect(cta?.toLowerCase()).toContain('residential');
  });

  it('Test 4 — Commercial estimate CTA resolves correctly', () => {
    const cta = resolveControlledMessage('request-estimate', 'commercial');
    expect(cta).not.toBeNull();
    expect(cta).toBeTruthy();
    expect(cta?.toLowerCase()).toContain('commercial');
  });

  it('Test 5 — Public works capability is in COMMERCIAL_PENDING (not active)', () => {
    // vr-commercial-pending blocker: public-works-capability must not be active
    expect(COMMERCIAL_PENDING).toContain('public-works-capability');
    // Verify it does not appear in confirmed claim keys
    expect(COMMERCIAL_CLAIM_KEYS).not.toContain('public-works-capability');
  });

  it('Test 6 — Specific residential service names are in RESIDENTIAL_PENDING (not active)', () => {
    // vr-service-list blocker: specific-residential-services must not be active
    expect(RESIDENTIAL_PENDING).toContain('specific-residential-services');
    expect(RESIDENTIAL_CLAIM_KEYS).not.toContain('specific-residential-services');
  });
});
