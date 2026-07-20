// =============================================================================
// lib/content — Public API
// =============================================================================

export type {
  VerificationStatus,
  PublicationStatus,
  SourcePriority,
  GovernedContent,
  ClaimRecord,
  ControlledMessageRecord,
  RouteRecord,
  ProhibitedExpression,
  CanPublishResult,
} from './types';

export { canPublish, isPublishable } from './can-publish';
export { checkChronologyPolicy, BLOCKED_CHRONOLOGY_EXPRESSIONS } from './chronology-policy';
export { checkProhibitedClaimPolicy, PROHIBITED_CLAIM_PATTERNS } from './prohibited-claim-policy';
export { validateContentContext } from './validate-content-context';
export { resolveControlledClaim } from './resolve-controlled-claim';
export { resolveControlledMessage } from './resolve-controlled-message';
export { claimsRegistry, messagesRegistry, routesRegistry } from './registry';
