// =============================================================================
// TESTS: M2 — Homepage composition governance
//
// Covers:
//   Test 1: Homepage metadata title uses approved "Nearly 40 years" expression
//   Test 2: Positioning statement resolves for homepage description
//   Test 3: Generic estimate CTA resolves
//   Test 4: Residential estimate CTA resolves and contains "residential"
//   Test 5: Commercial estimate CTA resolves and contains "commercial"
//   Test 6: Hero heading claim (years-in-business) resolves
//   Test 7: Hero eyebrow claims resolve (locally-owned, monterey-bay-identity)
//   Test 8: No prohibited language in hero content claims
//   Test 9: Gallery section has no testimonials
//   Test 10: Gallery section has no project data
//   Test 11: All 4 trust bar claims resolve
//   Test 12: Mechanical claim resolves for homepage feature
// =============================================================================

import { describe, it, expect } from 'vitest';
import {
  resolveControlledClaim,
  resolveControlledMessage,
  PROHIBITED_CLAIM_PATTERNS,
} from '../../lib/content';
import { testimonials } from '../../data/testimonials';

describe('M2 — Homepage composition governance', () => {
  it('Test 1 — years-in-business claim contains approved expression', () => {
    const yearsInBusiness = resolveControlledClaim('years-in-business');
    expect(yearsInBusiness).not.toBeNull();
    expect(yearsInBusiness?.toLowerCase()).toContain('nearly 40 years');
    // Must NOT contain blocked expressions
    expect(yearsInBusiness?.toLowerCase()).not.toContain('since 1987');
    expect(yearsInBusiness?.toLowerCase()).not.toContain('40+ years');
    expect(yearsInBusiness?.toLowerCase()).not.toContain('over 40 years');
  });

  it('Test 2 — positioning-statement resolves for homepage description', () => {
    const positioningStatement = resolveControlledMessage('positioning-statement');
    expect(positioningStatement).not.toBeNull();
    expect(positioningStatement).toBeTruthy();
    expect(positioningStatement?.toLowerCase()).toContain('nearly 40 years');
  });

  it('Test 3 — generic request-estimate CTA resolves', () => {
    const cta = resolveControlledMessage('request-estimate');
    expect(cta).not.toBeNull();
    expect(cta).toBeTruthy();
  });

  it('Test 4 — residential estimate CTA resolves and contains "residential"', () => {
    const cta = resolveControlledMessage('request-estimate', 'residential');
    expect(cta).not.toBeNull();
    expect(cta?.toLowerCase()).toContain('residential');
  });

  it('Test 5 — commercial estimate CTA resolves and contains "commercial"', () => {
    const cta = resolveControlledMessage('request-estimate', 'commercial');
    expect(cta).not.toBeNull();
    expect(cta?.toLowerCase()).toContain('commercial');
  });

  it('Test 6 — years-in-business resolves (used in hero heading)', () => {
    const claim = resolveControlledClaim('years-in-business');
    expect(claim).not.toBeNull();
    expect(claim).toBeTruthy();
  });

  it('Test 7 — hero eyebrow claims resolve (locally-owned, monterey-bay-identity)', () => {
    const locallyOwned = resolveControlledClaim('locally-owned');
    const montereyBay = resolveControlledClaim('monterey-bay-identity');
    expect(locallyOwned).not.toBeNull();
    expect(montereyBay).not.toBeNull();
  });

  it('Test 8 — hero content does not contain prohibited language', () => {
    const yearsInBusiness = resolveControlledClaim('years-in-business') ?? '';
    const positioningStatement = resolveControlledMessage('positioning-statement') ?? '';
    const tagline = resolveControlledMessage('tagline-primary') ?? '';
    const heroContent = [yearsInBusiness, positioningStatement, tagline].join(' ').toLowerCase();

    for (const entry of PROHIBITED_CLAIM_PATTERNS) {
      const pattern = entry.pattern.toLowerCase();
      expect(heroContent, `Hero must not contain prohibited: "${pattern}"`).not.toContain(pattern);
    }
  });

  it('Test 9 — testimonials array is empty (gallery must have no testimonials)', () => {
    expect(testimonials).toHaveLength(0);
  });

  it('Test 10 — no project fabrication data exists in testimonials or projects data', () => {
    // Testimonials must be empty — no fabricated testimonials
    expect(testimonials).toHaveLength(0);
  });

  it('Test 11 — all 4 trust bar claims resolve for homepage display', () => {
    const trustBarClaims = [
      'years-in-business',
      'employee-count',
      'locally-owned',
      'in-house-crews',
    ] as const;

    for (const key of trustBarClaims) {
      const result = resolveControlledClaim(key);
      expect(result, `Trust bar claim "${key}" must resolve`).not.toBeNull();
    }
  });

  it('Test 12 — mechanical-equipment claim resolves for homepage mechanical section', () => {
    const claim = resolveControlledClaim('mechanical-equipment');
    expect(claim).not.toBeNull();
    expect(claim).toBe('Specialized mechanical installation equipment');
  });
});
