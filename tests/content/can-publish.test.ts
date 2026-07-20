// =============================================================================
// TESTS: canPublish() — content render gate
//
// Covers:
//   Test 1: Confirmed and active content renders
//   Test 2: Confirmed and inactive content does not render
//   Test 3: Pending content does not render
//   Test 4: Rejected content never renders
// =============================================================================

import { describe, it, expect } from 'vitest';
import { canPublish, isPublishable } from '../../lib/content/can-publish';
import { type GovernedContent } from '../../lib/content/types';

function makeRecord(
  verificationStatus: GovernedContent['verificationStatus'],
  publicationStatus: GovernedContent['publicationStatus']
): GovernedContent {
  return {
    id: `test-${verificationStatus}-${publicationStatus}`,
    source: 'priority-1-discovery-interview',
    verificationStatus,
    publicationStatus,
  };
}

describe('canPublish()', () => {
  // Test 1: Confirmed + active → allowed
  it('Test 1 — allows confirmed + active records', () => {
    const record = makeRecord('confirmed', 'active');
    const result = canPublish(record);
    expect(result.allowed).toBe(true);
  });

  // Test 2: Confirmed + inactive → blocked
  it('Test 2 — blocks confirmed + inactive records', () => {
    const record = makeRecord('confirmed', 'inactive');
    const result = canPublish(record);
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/inactive/);
  });

  // Test 2b: Confirmed + draft → blocked
  it('blocks confirmed + draft records', () => {
    const record = makeRecord('confirmed', 'draft');
    const result = canPublish(record);
    expect(result.allowed).toBe(false);
  });

  // Test 2c: Confirmed + internal-only → blocked
  it('blocks confirmed + internal-only records', () => {
    const record = makeRecord('confirmed', 'internal-only');
    const result = canPublish(record);
    expect(result.allowed).toBe(false);
  });

  // Test 3: Pending → blocked
  it('Test 3 — blocks pending records regardless of publicationStatus', () => {
    expect(canPublish(makeRecord('pending', 'active')).allowed).toBe(false);
    expect(canPublish(makeRecord('pending', 'inactive')).allowed).toBe(false);
    expect(canPublish(makeRecord('pending', 'draft')).allowed).toBe(false);
  });

  // Test 4: Rejected → blocked
  it('Test 4 — blocks rejected records — never renders', () => {
    const record = makeRecord('rejected', 'active');
    const result = canPublish(record);
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/rejected/i);
  });

  it('blocks deprecated records', () => {
    const record = makeRecord('deprecated', 'active');
    const result = canPublish(record);
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/deprecated/i);
  });
});

describe('isPublishable()', () => {
  it('returns true only for confirmed + active', () => {
    expect(isPublishable(makeRecord('confirmed', 'active'))).toBe(true);
    expect(isPublishable(makeRecord('confirmed', 'inactive'))).toBe(false);
    expect(isPublishable(makeRecord('pending', 'active'))).toBe(false);
    expect(isPublishable(makeRecord('rejected', 'active'))).toBe(false);
  });

  it('correctly filters an array — returns only publishable records', () => {
    const records: GovernedContent[] = [
      makeRecord('confirmed', 'active'),
      makeRecord('confirmed', 'inactive'),
      makeRecord('pending', 'active'),
      makeRecord('rejected', 'active'),
    ];
    const publishable = records.filter(isPublishable);
    expect(publishable).toHaveLength(1);
    expect(publishable[0].publicationStatus).toBe('active');
    expect(publishable[0].verificationStatus).toBe('confirmed');
  });
});
