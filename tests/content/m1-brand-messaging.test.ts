// =============================================================================
// TESTS: M1 — Registry completeness and brand messaging
//
// Covers:
//   Test 1: Brand messages are registered in messagesRegistry
//   Test 2: Approved tagline resolves from registry
//   Test 3: Positioning statement resolves from registry
//   Test 4: Estimate CTAs resolve from registry
//   Test 5: Brand messages are confirmed + active
// =============================================================================

import { describe, it, expect } from 'vitest';
import { resolveControlledMessage, messagesRegistry } from '../../lib/content';

describe('M1 — Brand message registry', () => {
  it('Test 1 — messagesRegistry contains brand tagline and positioning statement', () => {
    const tagline = messagesRegistry.find(
      (r) => r.type === 'controlled-message' && r.messageKey === 'tagline-primary'
    );
    const positioning = messagesRegistry.find(
      (r) => r.type === 'controlled-message' && r.messageKey === 'positioning-statement'
    );

    expect(tagline).toBeDefined();
    expect(positioning).toBeDefined();
  });

  it('Test 2 — tagline-primary resolves to approved text', () => {
    const result = resolveControlledMessage('tagline-primary');
    expect(result).toBe('Local people. Experienced crews. Accountable work.');
  });

  it('Test 3 — positioning-statement resolves to approved text', () => {
    const result = resolveControlledMessage('positioning-statement');
    expect(result).toBe(
      'Nearly 40 years of local experience, backed by the people and equipment to do the work right.'
    );
  });

  it('Test 4 — generic estimate CTA resolves', () => {
    const result = resolveControlledMessage('request-estimate');
    expect(result).toBe('Request an Estimate');
  });

  it('Test 4b — residential estimate CTA resolves', () => {
    const result = resolveControlledMessage('request-estimate', 'residential');
    expect(result).toBe('Request a Residential Estimate');
  });

  it('Test 4c — commercial estimate CTA resolves', () => {
    const result = resolveControlledMessage('request-estimate', 'commercial');
    expect(result).toBe('Request a Commercial Estimate');
  });

  it('Test 5 — all brand messages are confirmed + active', () => {
    const brandKeys = ['tagline-primary', 'positioning-statement'];
    for (const key of brandKeys) {
      const record = messagesRegistry.find(
        (r) => r.type === 'controlled-message' && r.messageKey === key
      );
      expect(record?.verificationStatus, `${key} must be confirmed`).toBe('confirmed');
      expect(record?.publicationStatus, `${key} must be active`).toBe('active');
    }
  });
});
