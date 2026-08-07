// =============================================================================
// CONTACT INFORMATION — Governance-Controlled Contact Data Model
//
// All contact fields carry individual verification + publication status.
// A field is only safe to display when:
//   verificationStatus === 'confirmed' AND publicationStatus === 'active'
//
// BLOCKER: vr-contact-information
//   Phone, email, and address are pending Priority-1 verification.
//   Do not populate with invented or placeholder values.
//   All fields are empty until Adam Cox confirms them.
//
// WHEN VERIFIED:
//   1. Populate the field value
//   2. Set verificationStatus: 'confirmed', publicationStatus: 'active'
//   3. Add a verificationNote with the confirmation date and source
//   4. Update lastReviewedAt
//   5. Update vr-contact-information in content/verification-required.ts
//
// Source: Priority-1 (Adam Cox discovery interview) — PENDING
// =============================================================================

import {
  type VerificationStatus,
  type PublicationStatus,
  type SourcePriority,
} from '@/lib/content/types';

// ── Contact Field Record ──────────────────────────────────────────────────────

export interface ContactFieldRecord {
  id: string;
  source: SourcePriority;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  /** The actual contact value. Empty string if pending. */
  value: string;
  /** Human-readable reason for current status. */
  verificationNote?: string;
  /** ISO date string of last review. */
  lastReviewedAt?: string;
}

// ── Hours Record ──────────────────────────────────────────────────────────────

export interface BusinessHoursRecord {
  id: string;
  source: SourcePriority;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  /** Display string for business hours, e.g. "Mon–Fri: 7:00 AM – 5:00 PM" */
  display: string;
  /** Machine-readable days for schema — only populate when confirmed. */
  days?: string[];
  opens?: string;
  closes?: string;
  verificationNote?: string;
  lastReviewedAt?: string;
}

// ── Address Record ────────────────────────────────────────────────────────────

export interface ContactAddressRecord {
  id: string;
  source: SourcePriority;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  verificationNote?: string;
  lastReviewedAt?: string;
}

// ── Service Area Record ───────────────────────────────────────────────────────

export interface ServiceAreaRecord {
  id: string;
  source: SourcePriority;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  /** "Monterey Bay" is confirmed as the primary identity marker. */
  primaryIdentity: string;
  /**
   * Specific cities/counties pending verification.
   * Empty until vr-service-areas resolves.
   */
  specificAreas: string[];
  verificationNote?: string;
  lastReviewedAt?: string;
}

// ── Contact Information Registry ──────────────────────────────────────────────

export interface ContactInformationRegistry {
  phone: ContactFieldRecord;
  email: ContactFieldRecord;
  address: ContactAddressRecord;
  hours: BusinessHoursRecord;
  serviceArea: ServiceAreaRecord;
}

/**
 * Stowe Contracting contact information registry.
 *
 * All fields are pending vr-contact-information / vr-business-hours /
 * vr-service-areas. Do not set any field to active until verified.
 *
 * The only confirmed identity marker is "Monterey Bay" — used in the
 * service area record's primaryIdentity.
 */
export const contactInformation: ContactInformationRegistry = {
  // ── Phone ─────────────────────────────────────────────────────────────────
  phone: {
    id: 'contact-phone',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'inactive',
    value: '',
    verificationNote: 'Pending vr-contact-information. Do not display until confirmed.',
    lastReviewedAt: '2026-08-07',
  },

  // ── Email ─────────────────────────────────────────────────────────────────
  email: {
    id: 'contact-email',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'inactive',
    value: '',
    verificationNote: 'Pending vr-contact-information. Do not display until confirmed.',
    lastReviewedAt: '2026-08-07',
  },

  // ── Address ───────────────────────────────────────────────────────────────
  address: {
    id: 'contact-address',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'inactive',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    verificationNote: 'Pending vr-contact-information. Do not display until confirmed.',
    lastReviewedAt: '2026-08-07',
  },

  // ── Business Hours ────────────────────────────────────────────────────────
  hours: {
    id: 'contact-hours',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'pending',
    publicationStatus: 'inactive',
    display: '',
    verificationNote:
      'Pending vr-business-hours. Previously entered hours were unverified and cleared.',
    lastReviewedAt: '2026-08-07',
  },

  // ── Service Area ──────────────────────────────────────────────────────────
  // "Monterey Bay" is confirmed as the primary regional identity marker.
  // Specific cities, counties, and boundaries pending vr-service-areas.
  serviceArea: {
    id: 'contact-service-area',
    source: 'priority-1-discovery-interview',
    verificationStatus: 'confirmed',
    publicationStatus: 'active',
    primaryIdentity: 'Monterey Bay',
    specificAreas: [],
    verificationNote:
      '"Monterey Bay" confirmed as primary identity. Specific city/county list pending vr-service-areas.',
    lastReviewedAt: '2026-08-07',
  },
};

// ── Field Resolution Helpers ──────────────────────────────────────────────────

/**
 * Returns the phone value if confirmed + active, else null.
 * Never returns a placeholder or invented value.
 */
export function resolvePhone(): string | null {
  const f = contactInformation.phone;
  return f.verificationStatus === 'confirmed' && f.publicationStatus === 'active' && f.value
    ? f.value
    : null;
}

/**
 * Returns the email value if confirmed + active, else null.
 */
export function resolveEmail(): string | null {
  const f = contactInformation.email;
  return f.verificationStatus === 'confirmed' && f.publicationStatus === 'active' && f.value
    ? f.value
    : null;
}

/**
 * Returns the address record if confirmed + active and all required fields
 * are non-empty. Else null.
 */
export function resolveAddress(): ContactAddressRecord | null {
  const a = contactInformation.address;
  if (a.verificationStatus !== 'confirmed' || a.publicationStatus !== 'active') return null;
  if (!a.street || !a.city || !a.state || !a.zip) return null;
  return a;
}

/**
 * Returns the hours display string if confirmed + active, else null.
 */
export function resolveHours(): string | null {
  const h = contactInformation.hours;
  return h.verificationStatus === 'confirmed' && h.publicationStatus === 'active' && h.display
    ? h.display
    : null;
}

/**
 * Returns the primary service area identity if confirmed + active.
 * "Monterey Bay" is confirmed. Specific areas are empty until vr-service-areas resolves.
 */
export function resolveServiceAreaIdentity(): string | null {
  const s = contactInformation.serviceArea;
  return s.verificationStatus === 'confirmed' && s.publicationStatus === 'active'
    ? s.primaryIdentity
    : null;
}
