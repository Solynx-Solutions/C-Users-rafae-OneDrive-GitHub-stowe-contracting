// =============================================================================
// TESTS: M1 — Mechanical installation claim governance
//
// Covers:
//   Test 1: mechanical-equipment claim resolves correctly
//   Test 2: MECHANICAL_INSTALLATION_PENDING contains prohibited item types
//   Test 3: Prohibited mechanical language patterns are in prohibited-claim policy
//   Test 4: Confirmed equipment claim uses approved language only
// =============================================================================

import { describe, it, expect } from 'vitest';
import { resolveControlledClaim, PROHIBITED_CLAIM_PATTERNS } from '../../lib/content';
import {
  MECHANICAL_INSTALLATION_CLAIM_KEYS,
  MECHANICAL_INSTALLATION_PENDING,
} from '../../content/mechanical-installation-messaging';

describe('M1 — Mechanical installation claim governance', () => {
  it('Test 1 — mechanical-equipment claim resolves to non-null text', () => {
    const result = resolveControlledClaim('mechanical-equipment');
    expect(result).not.toBeNull();
    expect(result).toBeTruthy();
    expect(result).toBe('Specialized mechanical installation equipment');
  });

  it('Test 2 — MECHANICAL_INSTALLATION_PENDING contains performance spec types', () => {
    const expected = [
      'equipment-names',
      'equipment-models',
      'production-rates',
      'installation-speed',
      'precision-tolerances',
      'labor-savings',
    ];
    for (const item of expected) {
      expect(MECHANICAL_INSTALLATION_PENDING).toContain(item);
    }
  });

  it('Test 3 — MECHANICAL_INSTALLATION_CLAIM_KEYS only contains confirmed claim keys', () => {
    for (const key of MECHANICAL_INSTALLATION_CLAIM_KEYS) {
      const result = resolveControlledClaim(key);
      expect(result, `Mechanical claim "${key}" must resolve to non-null`).not.toBeNull();
    }
  });

  it('Test 4 — Prohibited mechanical language appears in prohibited claim policy', () => {
    const prohibitedPatterns = PROHIBITED_CLAIM_PATTERNS.map((p) => p.pattern.toLowerCase());

    // production rate claims must be in the prohibited list
    const hasProductionRate = prohibitedPatterns.some(
      (p) => p.includes('production rate') || p.includes('sq ft per day')
    );
    expect(hasProductionRate).toBe(true);
  });
});
