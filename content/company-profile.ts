// =============================================================================
// COMPANY PROFILE — Confirmed factual claims
//
// Source priority: Priority-1 (Adam Cox discovery interview)
//
// Each record is a ClaimRecord. Use resolveControlledClaim(claimKey) to
// retrieve the canonical text in components.
//
// CHRONOLOGY POLICY REMINDER:
//   ✅ "Nearly 40 years" — approved
//   ✅ "Nearly four decades" — approved
//   ✅ "Since 1987" — authorized by governed onboarding
//   ❌ "40+ years" — BLOCKED
//   ❌ "Over 40 years" — BLOCKED
// =============================================================================

import { type ClaimRecord } from '@/lib/content/types';

export const companyClaims: ClaimRecord[] = [
  {
    id: 'claim-years-in-business',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'years-in-business',
    canonicalText: 'Since 1987 · Serving Monterey Bay',
    verificationNote: 'Exact founding year authorized by governed Agent 07 onboarding direction.',
    lastReviewedAt: '2026-08-13',
  },
  {
    id: 'claim-years-experience-short',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'years-experience-short',
    canonicalText: 'Nearly 40 years',
    verificationNote: 'Short form of the years-in-business claim.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-nearly-four-decades',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'nearly-four-decades',
    canonicalText: 'Nearly four decades',
    verificationNote: 'Approved variant of the years-in-business claim.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-locally-owned',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'locally-owned',
    canonicalText: 'Locally owned and operated',
    verificationNote: 'Confirmed via Adam Cox discovery interview.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-employee-count',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'employee-count',
    canonicalText: '30+ employees',
    verificationNote:
      'Confirmed as "30+" — exact total is pending. Must not be replaced with a specific number.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-in-house-crews',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'in-house-crews',
    canonicalText: 'Experienced in-house crews',
    verificationNote: 'Confirmed via Adam Cox discovery interview.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-long-term-employees',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'long-term-employees',
    canonicalText: 'Long-term employee continuity',
    verificationNote:
      'Confirmed as a general claim. Specific tenure numbers (e.g., "15 years") are pending verification.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-customers-know-crew',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'customers-know-crew',
    canonicalText: 'Customers know who performs their installation',
    verificationNote: 'Confirmed via Adam Cox discovery interview.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-mechanical-equipment',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'mechanical-equipment',
    canonicalText: 'Specialized mechanical installation equipment',
    verificationNote:
      'Confirmed as general claim. Equipment names, models, and performance specs are pending verification.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-residential-capability',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'residential-capability',
    canonicalText: 'Residential projects',
    verificationNote: 'Confirmed via Adam Cox discovery interview.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-commercial-capability',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'commercial-capability',
    canonicalText: 'Commercial projects',
    verificationNote: 'Confirmed via Adam Cox discovery interview.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-monterey-bay-identity',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'monterey-bay-identity',
    canonicalText: 'Monterey Bay',
    verificationNote: 'Confirmed as the primary local identity marker.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-local-workforce',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'local-workforce',
    canonicalText: 'Local workforce',
    verificationNote: 'Confirmed via Adam Cox discovery interview.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-local-accountability',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'local-accountability',
    canonicalText: 'Local accountability',
    verificationNote: 'Confirmed via Adam Cox discovery interview.',
    lastReviewedAt: '2026-07-20',
  },
  {
    id: 'claim-established-foundation',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'established-foundation',
    canonicalText: 'Established workforce and operational foundation',
    verificationNote: 'Confirmed via Adam Cox discovery interview.',
    lastReviewedAt: '2026-07-20',
  },

  // ── PENDING CLAIMS — do not render ────────────────────────────────────────
  {
    id: 'claim-founding-year',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    claimKey: 'founding-year',
    canonicalText: '1987',
    verificationNote: 'Authorized by governed Agent 07 onboarding direction.',
    lastReviewedAt: '2026-08-13',
  },
  {
    id: 'claim-exact-employee-total',
    type: 'claim',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'inactive',
    claimKey: 'exact-employee-total',
    canonicalText: '', // Use 'employee-count' (30+) instead
    verificationNote: 'Exact employee total pending. Use claim "employee-count" (30+) instead.',
    lastReviewedAt: '2026-07-20',
  },
];
