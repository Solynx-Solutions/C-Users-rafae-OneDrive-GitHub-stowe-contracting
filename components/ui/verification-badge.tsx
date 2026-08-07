// =============================================================================
// VERIFICATION BADGE
//
// Small visual indicator showing the verification / publication status
// of a content record. Used in service cards and admin-style previews.
//
// IMPORTANT: This component is for internal/development use and QA previews.
// It should NOT render in production customer-facing output.
// In production, pending content should simply be hidden (not labeled).
//
// Server Component.
// =============================================================================

import { type VerificationStatus, type PublicationStatus } from '@/lib/content/types';

interface VerificationBadgeProps {
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  /** If true, renders a compact single-line version. */
  compact?: boolean;
}

const STATUS_CONFIG = {
  verification: {
    confirmed: {
      label: 'Confirmed',
      className: 'bg-emerald-100 text-emerald-800',
    },
    pending: {
      label: 'Pending',
      className: 'bg-amber-100 text-amber-800',
    },
    rejected: {
      label: 'Rejected',
      className: 'bg-red-100 text-red-800',
    },
    deprecated: {
      label: 'Deprecated',
      className: 'bg-neutral-100 text-neutral-500',
    },
  },
  publication: {
    active: {
      label: 'Active',
      className: 'bg-blue-100 text-blue-800',
    },
    draft: {
      label: 'Draft',
      className: 'bg-violet-100 text-violet-800',
    },
    inactive: {
      label: 'Inactive',
      className: 'bg-neutral-100 text-neutral-500',
    },
    'internal-only': {
      label: 'Internal',
      className: 'bg-neutral-100 text-neutral-500',
    },
  },
} as const;

/**
 * Visual badge showing content record governance status.
 * For internal QA use — not intended for customer-facing output.
 */
export function VerificationBadge({
  verificationStatus,
  publicationStatus,
  compact = false,
}: VerificationBadgeProps) {
  const verification = STATUS_CONFIG.verification[verificationStatus];
  const publication = STATUS_CONFIG.publication[publicationStatus];

  if (compact) {
    return (
      <div
        className="flex items-center gap-1.5"
        aria-label={`Status: ${verification.label} / ${publication.label}`}
      >
        <span
          className={[
            'inline-flex items-center rounded-full px-2 py-0.5',
            'text-[10px] font-bold tracking-wide uppercase',
            verification.className,
          ].join(' ')}
        >
          {verification.label}
        </span>
        <span
          className={[
            'inline-flex items-center rounded-full px-2 py-0.5',
            'text-[10px] font-bold tracking-wide uppercase',
            publication.className,
          ].join(' ')}
        >
          {publication.label}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Verification: ${verification.label}. Publication: ${publication.label}`}
    >
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-medium tracking-wide text-neutral-500 uppercase">
          Verification:
        </span>
        <span
          className={[
            'inline-flex items-center rounded-full px-2 py-0.5',
            'text-[10px] font-bold tracking-wide uppercase',
            verification.className,
          ].join(' ')}
        >
          {verification.label}
        </span>
      </div>
      <span className="text-neutral-300" aria-hidden="true">
        /
      </span>
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-medium tracking-wide text-neutral-500 uppercase">
          Publication:
        </span>
        <span
          className={[
            'inline-flex items-center rounded-full px-2 py-0.5',
            'text-[10px] font-bold tracking-wide uppercase',
            publication.className,
          ].join(' ')}
        >
          {publication.label}
        </span>
      </div>
    </div>
  );
}
