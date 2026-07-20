// =============================================================================
// RESOLVE CONTROLLED CLAIM
//
// Retrieves a ClaimRecord from the registry and returns its canonical text
// only if the record passes the canPublish() gate.
//
// Usage:
//   const text = resolveControlledClaim('years-in-business');
//   // Returns canonical text string, or null if not publishable.
// =============================================================================

import { type ClaimRecord } from './types';
import { canPublish } from './can-publish';
import { claimsRegistry } from './registry';

/**
 * Resolves a claim by its claimKey.
 * Returns the canonical text ONLY if verified === "confirmed" AND status === "active".
 * Returns null otherwise.
 *
 * Components must handle the null case — rendering nothing or a safe fallback.
 */
export function resolveControlledClaim(claimKey: string): string | null {
  const record = claimsRegistry.find(
    (r): r is ClaimRecord => r.type === 'claim' && r.claimKey === claimKey
  );

  if (!record) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[content] resolveControlledClaim: no record found for claimKey "${claimKey}"`);
    }
    return null;
  }

  const result = canPublish(record);
  if (!result.allowed) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[content] resolveControlledClaim blocked "${claimKey}": ${result.reason}`);
    }
    return null;
  }

  return record.canonicalText;
}
