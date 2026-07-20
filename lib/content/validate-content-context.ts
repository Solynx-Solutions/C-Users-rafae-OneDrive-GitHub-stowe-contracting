// =============================================================================
// VALIDATE CONTENT CONTEXT
//
// Runs all applicable policy checks against a given text string.
// Use this in tests, CI, and any pre-render validation step.
// =============================================================================

import { checkChronologyPolicy } from './chronology-policy';
import { checkProhibitedClaimPolicy } from './prohibited-claim-policy';

export interface ContentValidationResult {
  valid: boolean;
  violations: ContentViolation[];
}

export interface ContentViolation {
  policy: 'chronology' | 'prohibited-claim';
  blockedMatch: string;
  reason: string;
  approvedAlternative?: string;
}

/**
 * Validates a text string against all active content policies.
 * Returns a result object listing all violations found.
 *
 * @example
 * const result = validateContentContext('We have been serving since 1987.');
 * // result.valid === false
 * // result.violations[0].policy === 'chronology'
 *
 * @example
 * const result = validateContentContext('Nearly 40 years serving Monterey Bay.');
 * // result.valid === true
 */
export function validateContentContext(text: string): ContentValidationResult {
  const violations: ContentViolation[] = [];

  // Run chronology policy check
  const chronologyResult = checkChronologyPolicy(text);
  if (!chronologyResult.passed) {
    violations.push({
      policy: 'chronology',
      blockedMatch: chronologyResult.blockedMatch ?? '',
      reason: chronologyResult.reason ?? 'Blocked chronology expression.',
      approvedAlternative: chronologyResult.approvedAlternative,
    });
  }

  // Run prohibited claim policy check
  const prohibitedResult = checkProhibitedClaimPolicy(text);
  if (!prohibitedResult.passed) {
    violations.push({
      policy: 'prohibited-claim',
      blockedMatch: prohibitedResult.blockedMatch ?? '',
      reason: prohibitedResult.reason ?? 'Prohibited claim.',
    });
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}
