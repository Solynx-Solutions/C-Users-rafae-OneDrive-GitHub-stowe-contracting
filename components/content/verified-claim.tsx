// =============================================================================
// VERIFIED CLAIM
// Renders a confirmed factual claim from the content registry.
// Returns null if claim is not confirmed+active.
// Server Component — safe for use in RSC tree.
// =============================================================================

import { resolveControlledClaim } from '@/lib/content';
import { cn } from '@/lib/utils';

interface VerifiedClaimProps {
  /** The claimKey from the claims registry */
  claimKey: string;
  /** HTML element to render the claim in */
  as?: 'p' | 'span' | 'div' | 'strong' | 'li';
  className?: string;
}

/**
 * Renders a verified claim by claimKey.
 * Returns nothing if the claim is not confirmed+active.
 *
 * @example
 * <VerifiedClaim claimKey="years-in-business" as="p" />
 * // Renders: "Nearly 40 years serving Monterey Bay"
 */
export function VerifiedClaim({ claimKey, as: Tag = 'span', className }: VerifiedClaimProps) {
  const text = resolveControlledClaim(claimKey);

  if (!text) return null;

  return <Tag className={cn(className)}>{text}</Tag>;
}
