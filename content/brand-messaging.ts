// =============================================================================
// BRAND MESSAGING — Approved taglines and positioning statements
//
// Source: Priority-2 (Approved Agent 03 Brand Messaging Guide)
// =============================================================================

import { type ControlledMessageRecord } from '@/lib/content/types';

export const brandMessages: ControlledMessageRecord[] = [
  {
    id: 'brand-tagline-primary',
    type: 'controlled-message',
    source: 'priority-2-brand-messaging-guide',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    messageKey: 'tagline-primary',
    text: 'Local people. Experienced crews. Accountable work.',
    verificationNote: 'Approved primary brand tagline from Agent 03 Brand Messaging Guide.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'brand-positioning-statement',
    type: 'controlled-message',
    source: 'priority-2-brand-messaging-guide',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    messageKey: 'positioning-statement',
    text: 'Nearly 40 years of local experience, backed by the people and equipment to do the work right.',
    verificationNote: 'Approved positioning statement from Agent 03 Brand Messaging Guide.',
    lastReviewedAt: '2026-07-20',
  },
];
