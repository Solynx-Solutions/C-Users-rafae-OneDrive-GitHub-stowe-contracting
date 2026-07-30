// =============================================================================
// CONTROLLED MESSAGE TEXT
// Renders approved controlled message text from the content registry.
// Returns null (renders nothing) if the message is not confirmed+active.
// Server Component — safe for use in RSC tree.
// =============================================================================

import { resolveControlledMessage } from '@/lib/content';
import { cn } from '@/lib/utils';

interface ControlledMessageTextProps {
  /** The messageKey from the controlled message registry */
  messageKey: string;
  /** Optional variant (e.g. 'residential', 'commercial') */
  variant?: string;
  /** HTML element to render the text in */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'strong';
  className?: string;
}

/**
 * Renders approved controlled message text.
 * Returns nothing if the message is not confirmed+active.
 * Never renders placeholder, draft, or invented text.
 *
 * @example
 * <ControlledMessageText messageKey="tagline-primary" as="p" />
 */
export function ControlledMessageText({
  messageKey,
  variant,
  as: Tag = 'p',
  className,
}: ControlledMessageTextProps) {
  const text = resolveControlledMessage(messageKey, variant);

  if (!text) return null;

  return <Tag className={cn(className)}>{text}</Tag>;
}
