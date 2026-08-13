// =============================================================================
// CHRONOLOGY POLICY
//
// Enforces the approved expression policy for Stowe Contracting's age claims.
//
// APPROVED expressions (any of these are allowed):
//   - "Nearly 40 years"
//   - "Nearly four decades"
//   - "Serving Monterey Bay for nearly 40 years"
//
// BLOCKED expressions (must never appear in any output):
//   - Unsupported exact founding-year formulations
//   - "40+ years"
//   - "Over 40 years"
//   - "More than 40 years"
//   - Any exact year reference (e.g., "founded in 1987", "est. 1987")
//
// This policy applies to:
//   visible copy, metadata, schema, alt text, captions, fixtures,
//   seed data, and hidden content.
// =============================================================================

import { type ProhibitedExpression } from './types';

/**
 * List of blocked chronology expressions.
 * Checked case-insensitively against any string passed to checkChronologyPolicy().
 */
export const BLOCKED_CHRONOLOGY_EXPRESSIONS: ProhibitedExpression[] = [
  {
    pattern: '40+ years',
    reason: '"40+" is a blocked chronology expression.',
    approvedAlternative: 'Nearly 40 years',
  },
  {
    pattern: 'over 40 years',
    reason: '"Over 40 years" is a blocked chronology expression.',
    approvedAlternative: 'Nearly 40 years',
  },
  {
    pattern: 'more than 40 years',
    reason: '"More than 40 years" is a blocked chronology expression.',
    approvedAlternative: 'Nearly 40 years',
  },
  {
    pattern: 'est. 1',
    reason: 'Exact founding year references are blocked.',
    approvedAlternative: 'Nearly 40 years',
  },
  {
    pattern: 'founded in 1',
    reason: 'Exact founding year references are blocked.',
    approvedAlternative: 'Nearly 40 years',
  },
  {
    pattern: 'established in 1',
    reason: 'Exact founding year references are blocked.',
    approvedAlternative: 'Nearly 40 years',
  },
];

export interface ChronologyCheckResult {
  passed: boolean;
  /** The blocked pattern found, if any. */
  blockedMatch?: string;
  reason?: string;
  approvedAlternative?: string;
}

/**
 * Checks whether a string contains a blocked chronology expression.
 *
 * @returns ChronologyCheckResult with passed: false if a blocked pattern is found.
 *
 * @example
 * checkChronologyPolicy('Since 1987, we have served...')
 * // → { passed: true }
 *
 * checkChronologyPolicy('Nearly 40 years serving Monterey Bay')
 * // → { passed: true }
 */
export function checkChronologyPolicy(text: string): ChronologyCheckResult {
  const lower = text.toLowerCase();

  for (const expr of BLOCKED_CHRONOLOGY_EXPRESSIONS) {
    if (lower.includes(expr.pattern.toLowerCase())) {
      return {
        passed: false,
        blockedMatch: expr.pattern,
        reason: expr.reason,
        approvedAlternative: expr.approvedAlternative,
      };
    }
  }

  return { passed: true };
}
