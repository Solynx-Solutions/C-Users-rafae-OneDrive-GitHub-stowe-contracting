// =============================================================================
// CALLS TO ACTION — Controlled CTA message records
//
// These are approved brand CTAs. Use resolveControlledMessage(messageKey)
// to retrieve text in components. Never hardcode CTA copy in JSX.
//
// Source: Priority-1 (Adam Cox discovery interview) /
//         Priority-2 (Approved Agent 03 Brand Messaging Guide)
// =============================================================================

import { type ControlledMessageRecord } from '@/lib/content/types';

export const ctaMessages: ControlledMessageRecord[] = [
  {
    id: 'cta-request-estimate',
    type: 'controlled-message',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    messageKey: 'request-estimate',
    text: 'Request an Estimate',
    verificationNote:
      'Approved generic CTA — use when context is not explicitly residential or commercial.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'cta-request-residential-estimate',
    type: 'controlled-message',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    messageKey: 'request-estimate',
    variant: 'residential',
    text: 'Request a Residential Estimate',
    verificationNote: 'Residential variant — links to /estimate/residential route.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'cta-request-commercial-estimate',
    type: 'controlled-message',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    messageKey: 'request-estimate',
    variant: 'commercial',
    text: 'Request a Commercial Estimate',
    verificationNote: 'Commercial variant — links to /estimate/commercial route.',
    lastReviewedAt: '2026-07-20',
  },
];
