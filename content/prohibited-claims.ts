// =============================================================================
// PROHIBITED CLAIMS — Complete catalogue of blocked claim categories
//
// This file serves as the authoritative record of everything that must NOT
// appear in public-facing output. Cross-referenced with lib/content/prohibited-claim-policy.ts.
//
// To activate any item below, it must be:
//   1. Verified against a Priority-1 or Priority-2 source
//   2. Promoted to a confirmed + active ClaimRecord in the appropriate content module
//   3. Removed from this list
// =============================================================================

export const PROHIBITED_CLAIM_CATEGORIES = {
  // ── Chronology ─────────────────────────────────────────────────────────────
  chronology: {
    blocked: ['40+ years', 'Over 40 years', 'More than 40 years', 'exact founding year'],
    approved: [
      'Since 1987',
      'Nearly 40 years',
      'Nearly four decades',
      'Serving Monterey Bay for nearly 40 years',
    ],
  },

  // ── Identity / Numbers ─────────────────────────────────────────────────────
  exactEmployeeTotal: {
    description: 'Exact employee total (e.g., "38 employees"). Use "30+" only.',
  },
  employeeTenureNumbers: {
    description: 'Specific tenure numbers (e.g., "avg 12 years"). Use "long-term continuity" only.',
  },

  // ── Equipment ─────────────────────────────────────────────────────────────
  equipmentNames: {
    description: 'Equipment brand names or model numbers (e.g., "Somero S-485").',
  },
  equipmentPerformance: {
    description:
      'Any numerical performance spec for equipment (production rates, tolerances, speed).',
  },

  // ── Services ──────────────────────────────────────────────────────────────
  individualServices: {
    description: 'Named individual services until service list is verified.',
  },
  serviceAreaBoundaries: {
    description: 'Specific city/county service-area lists until verified.',
  },

  // ── Projects / Clients ────────────────────────────────────────────────────
  specificProjectFacts: {
    description: 'Any specific project details (name, size, client, cost, timeline).',
  },
  namedClients: {
    description: 'Named client or company references.',
  },
  testimonials: {
    description: 'All testimonials — empty/inactive until verified and review system activated.',
  },

  // ── Credentials ───────────────────────────────────────────────────────────
  certifications: {
    description: 'Named certifications (e.g., "ASCC certified").',
  },
  awards: {
    description: 'Named awards or recognitions.',
  },
  warranties: {
    description: 'Warranty terms or guarantees (e.g., "10-year workmanship warranty").',
  },

  // ── Capability ────────────────────────────────────────────────────────────
  publicWorksCapability: {
    description: 'Public works or government contract capability — not confirmed.',
  },

  // ── Quantitative Performance ──────────────────────────────────────────────
  productionRates: { description: 'Sq ft per day or similar rate claims.' },
  installationSpeed: { description: 'Comparative speed claims ("X% faster").' },
  laborSavings: { description: 'Labor cost savings claims.' },
  costSavings: { description: 'Cost savings claims.' },
  precisionTolerances: { description: 'Precision tolerance specs (±X").' },
  safetyStatistics: { description: 'Safety record statistics (zero incidents, etc.).' },
  responseTimeGuarantees: { description: 'Response-time guarantees ("within 24 hours").' },
} as const;
