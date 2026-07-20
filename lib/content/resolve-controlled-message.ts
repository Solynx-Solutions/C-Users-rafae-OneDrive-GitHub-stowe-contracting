// =============================================================================
// RESOLVE CONTROLLED MESSAGE
//
// Retrieves a ControlledMessageRecord from the registry and returns its
// approved text only if the record passes the canPublish() gate.
//
// Usage:
//   const cta = resolveControlledMessage('request-estimate');
//   // Returns approved text string, or null if not publishable.
// =============================================================================

import { type ControlledMessageRecord } from './types';
import { canPublish } from './can-publish';
import { messagesRegistry } from './registry';

/**
 * Resolves a controlled message by its messageKey (and optional variant).
 * Returns the approved text ONLY if verified === "confirmed" AND status === "active".
 * Returns null otherwise.
 *
 * Never paraphrase or rewrite controlled messages — use the returned text verbatim.
 */
export function resolveControlledMessage(messageKey: string, variant?: string): string | null {
  const record = messagesRegistry.find(
    (r): r is ControlledMessageRecord =>
      r.type === 'controlled-message' &&
      r.messageKey === messageKey &&
      (variant === undefined || r.variant === variant)
  );

  if (!record) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[content] resolveControlledMessage: no record found for messageKey "${messageKey}"${variant ? ` variant "${variant}"` : ''}`
      );
    }
    return null;
  }

  const result = canPublish(record);
  if (!result.allowed) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[content] resolveControlledMessage blocked "${messageKey}": ${result.reason}`);
    }
    return null;
  }

  return record.text;
}
