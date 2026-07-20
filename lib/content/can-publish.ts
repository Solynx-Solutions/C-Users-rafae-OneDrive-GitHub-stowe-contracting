// =============================================================================
// CAN-PUBLISH — Public render gate
//
// This is the single enforcement point for the public render rule:
//   verificationStatus === "confirmed" AND publicationStatus === "active"
//
// All rendering code must call canPublish() before outputting any content
// derived from a GovernedContent record.
// =============================================================================

import { type GovernedContent, type CanPublishResult } from './types';

/**
 * Determines whether a governed content record is permitted to render publicly.
 *
 * Public content may render ONLY when:
 *   verificationStatus === "confirmed"
 *   AND
 *   publicationStatus === "active"
 *
 * @returns CanPublishResult with allowed: true/false and a reason string.
 */
export function canPublish(record: GovernedContent): CanPublishResult {
  if (record.verificationStatus === 'rejected') {
    return {
      allowed: false,
      reason: `Record "${record.id}" is rejected and must never render.`,
    };
  }

  if (record.verificationStatus === 'deprecated') {
    return {
      allowed: false,
      reason: `Record "${record.id}" is deprecated. Use its replacement record.`,
    };
  }

  if (record.verificationStatus !== 'confirmed') {
    return {
      allowed: false,
      reason: `Record "${record.id}" is ${record.verificationStatus}. Must be confirmed before publishing.`,
    };
  }

  if (record.publicationStatus !== 'active') {
    return {
      allowed: false,
      reason: `Record "${record.id}" has publicationStatus "${record.publicationStatus}". Must be active to publish.`,
    };
  }

  return {
    allowed: true,
    reason: `Record "${record.id}" is confirmed and active.`,
  };
}

/**
 * Type guard: returns true only for confirmed + active records.
 * Use for filtering arrays of governed content.
 *
 * @example
 * const publishableRoutes = allRoutes.filter(isPublishable);
 */
export function isPublishable(record: GovernedContent): boolean {
  return canPublish(record).allowed;
}
