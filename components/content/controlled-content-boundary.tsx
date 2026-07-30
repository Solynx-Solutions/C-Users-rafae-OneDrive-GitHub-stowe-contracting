// =============================================================================
// CONTROLLED CONTENT BOUNDARY
// Wraps a region of controlled content. Only renders children if the
// required claim/message is confirmed+active.
// Server Component — safe for use in RSC tree.
// =============================================================================

import { type ReactNode } from 'react';
import { canPublish } from '@/lib/content';
import { claimsRegistry, messagesRegistry } from '@/lib/content';

interface ControlledContentBoundaryProps {
  /**
   * The claimKey to check before rendering.
   * Children render only if this claim is confirmed+active.
   */
  claimKey?: string;
  /**
   * The messageKey to check before rendering.
   * Children render only if this message is confirmed+active.
   */
  messageKey?: string;
  children: ReactNode;
  /**
   * Optional fallback rendered when the boundary blocks content.
   * Defaults to null (renders nothing).
   */
  fallback?: ReactNode;
}

/**
 * Guards a region of content behind a content governance check.
 * Children are only rendered if the specified claim or message is
 * confirmed+active in the registry.
 *
 * @example
 * <ControlledContentBoundary claimKey="years-in-business">
 *   <YearsSection />
 * </ControlledContentBoundary>
 */
export function ControlledContentBoundary({
  claimKey,
  messageKey,
  children,
  fallback = null,
}: ControlledContentBoundaryProps) {
  if (claimKey) {
    const record = claimsRegistry.find((r) => r.type === 'claim' && r.claimKey === claimKey);
    if (!record || !canPublish(record).allowed) return <>{fallback}</>;
  }

  if (messageKey) {
    const record = messagesRegistry.find(
      (r) => r.type === 'controlled-message' && r.messageKey === messageKey
    );
    if (!record || !canPublish(record).allowed) return <>{fallback}</>;
  }

  return <>{children}</>;
}
