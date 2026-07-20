// =============================================================================
// PROHIBITED CLAIM POLICY
//
// Maintains the list of claim categories that are currently blocked from
// any public output. These claims require verification before they can be
// activated, even if they seem factually reasonable.
//
// "Pending and inactive" items per governance specification:
//   exact founding year, exact employee total, employee tenure numbers,
//   equipment names and models, individual services, service-area boundaries,
//   specific project facts, testimonials, certifications, awards, warranties,
//   named clients, public works capability, production rates, installation speed,
//   labor savings, cost savings, precision tolerances, safety statistics,
//   response-time guarantees.
// =============================================================================

import { type ProhibitedExpression } from './types';

/**
 * Patterns that are categorically prohibited in public output.
 * Checked case-insensitively.
 */
export const PROHIBITED_CLAIM_PATTERNS: ProhibitedExpression[] = [
  // ── Performance / Quantitative claims ─────────────────────────────────────
  {
    pattern: 'production rate',
    reason: 'Production rates are pending verification.',
  },
  {
    pattern: 'sq ft per day',
    reason: 'Installation speed claims are pending verification.',
  },
  {
    pattern: 'square feet per day',
    reason: 'Installation speed claims are pending verification.',
  },
  {
    pattern: '% faster',
    reason: 'Comparative speed claims are pending verification.',
  },
  {
    pattern: 'labor saving',
    reason: 'Labor savings claims are pending verification.',
  },
  {
    pattern: 'cost saving',
    reason: 'Cost savings claims are pending verification.',
  },
  {
    pattern: 'saves money',
    reason: 'Cost savings claims are pending verification.',
  },
  {
    pattern: 'precision tolerance',
    reason: 'Precision tolerance claims are pending verification.',
  },
  {
    pattern: '±',
    reason: 'Precision tolerance notation is pending verification.',
  },
  // ── Safety ────────────────────────────────────────────────────────────────
  {
    pattern: 'zero incidents',
    reason: 'Safety statistics are pending verification.',
  },
  {
    pattern: 'safety record',
    reason: 'Safety statistics are pending verification.',
  },
  {
    pattern: 'respond within',
    reason: 'Response-time guarantees are pending verification.',
  },
  {
    pattern: 'within 24 hours',
    reason: 'Response-time guarantees are pending verification.',
  },
  // ── Credentials ───────────────────────────────────────────────────────────
  {
    pattern: 'certified',
    reason: 'Certifications are pending verification.',
  },
  {
    pattern: 'award-winning',
    reason: 'Awards are pending verification.',
  },
  {
    pattern: 'award winning',
    reason: 'Awards are pending verification.',
  },
  // ── Public Works ──────────────────────────────────────────────────────────
  {
    pattern: 'public works',
    reason: 'Public works capability is pending verification.',
  },
  {
    pattern: 'government contract',
    reason: 'Public works capability is pending verification.',
  },
  // ── Equipment specifics ───────────────────────────────────────────────────
  {
    pattern: 'laser-guided',
    reason: 'Specific equipment capability language is pending verification.',
  },
  {
    pattern: 'gps-guided',
    reason: 'Specific equipment capability language is pending verification.',
  },
  // ── Warranty ──────────────────────────────────────────────────────────────
  {
    pattern: 'year warranty',
    reason: 'Warranty terms are pending verification.',
  },
  {
    pattern: 'year guarantee',
    reason: 'Warranty terms are pending verification.',
  },
];

export interface ProhibitedClaimCheckResult {
  passed: boolean;
  blockedMatch?: string;
  reason?: string;
}

/**
 * Checks whether a string contains a categorically prohibited claim.
 *
 * @returns ProhibitedClaimCheckResult with passed: false if a blocked pattern is found.
 */
export function checkProhibitedClaimPolicy(text: string): ProhibitedClaimCheckResult {
  const lower = text.toLowerCase();

  for (const expr of PROHIBITED_CLAIM_PATTERNS) {
    if (lower.includes(expr.pattern.toLowerCase())) {
      return {
        passed: false,
        blockedMatch: expr.pattern,
        reason: expr.reason,
      };
    }
  }

  return { passed: true };
}
