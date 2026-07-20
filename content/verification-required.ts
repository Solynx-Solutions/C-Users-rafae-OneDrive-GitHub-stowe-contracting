// =============================================================================
// VERIFICATION REQUIRED — Items awaiting confirmation
//
// This file tracks all information blockers that must be resolved before
// the corresponding content can be activated.
//
// Each item must reference:
//   - What information is needed
//   - Which content module will be updated upon verification
//   - Which source tier is required for verification
// =============================================================================

export const VERIFICATION_REQUIRED_ITEMS = [
  {
    id: 'vr-founding-year',
    description: 'Exact founding year of Stowe Contracting.',
    requiredFor: 'Activating claim "founding-year" in content/company-profile.ts',
    requiredSourceTier: 'priority-1-discovery-interview',
    blockerNote: 'Do not use "Since 1987" or any exact year. Use "Nearly 40 years" until confirmed.',
  },
  {
    id: 'vr-exact-employee-count',
    description: 'Current total employee count (exact number).',
    requiredFor: 'Activating claim "exact-employee-total". Current approved claim is "30+".',
    requiredSourceTier: 'priority-1-discovery-interview',
  },
  {
    id: 'vr-employee-tenure',
    description: 'Average or representative employee tenure (years).',
    requiredFor: 'Enabling specific tenure messaging in content/team-messaging.ts',
    requiredSourceTier: 'priority-1-discovery-interview',
  },
  {
    id: 'vr-equipment-names',
    description: 'Names and model numbers of mechanical installation equipment.',
    requiredFor: 'Enabling equipment-specific messaging in content/mechanical-installation-messaging.ts',
    requiredSourceTier: 'priority-1-discovery-interview',
    blockerNote: 'No equipment names, models, or performance specs may appear until verified.',
  },
  {
    id: 'vr-service-list',
    description: 'Complete, verified list of services offered.',
    requiredFor: 'Activating service records in data/services.ts and navigation/services subnav.',
    requiredSourceTier: 'priority-1-discovery-interview',
  },
  {
    id: 'vr-service-areas',
    description: 'Specific cities and counties served.',
    requiredFor: 'Activating service-area claims and schema areaServed.',
    requiredSourceTier: 'priority-1-discovery-interview',
  },
  {
    id: 'vr-contact-information',
    description: 'Phone number, email address, physical address.',
    requiredFor: 'Activating schema telephone/email/address and siteConfig contact fields.',
    requiredSourceTier: 'priority-1-discovery-interview',
    blockerNote: 'Do not insert invented or placeholder contact details.',
  },
  {
    id: 'vr-business-hours',
    description: 'Official hours of operation.',
    requiredFor: 'Activating schema openingHoursSpecification.',
    requiredSourceTier: 'priority-1-discovery-interview',
    blockerNote: 'The "Mon–Fri: 7:00 AM – 5:00 PM" in siteConfig is unverified and has been cleared.',
  },
  {
    id: 'vr-legal-entity-name',
    description: 'Legal entity name (LLC, Inc., etc.)',
    requiredFor: 'Activating legalName in schema Organization.',
    requiredSourceTier: 'priority-1-discovery-interview',
  },
  {
    id: 'vr-social-profiles',
    description: 'Social media profile URLs.',
    requiredFor: 'Activating sameAs in schema and social links in footer.',
    requiredSourceTier: 'priority-1-discovery-interview',
  },
  {
    id: 'vr-testimonials',
    description: 'Real, attributed customer testimonials.',
    requiredFor: 'Activating testimonial records in data/testimonials.ts',
    requiredSourceTier: 'priority-1-discovery-interview',
    blockerNote: 'All testimonials must be empty/inactive until verified.',
  },
  {
    id: 'vr-certifications',
    description: 'Named professional certifications.',
    requiredFor: 'Enabling certification claims.',
    requiredSourceTier: 'priority-1-discovery-interview',
  },
  {
    id: 'vr-public-works',
    description: 'Confirmation of public works / government contract capability.',
    requiredFor: 'Enabling public-works-capability claim in content/commercial-positioning.ts',
    requiredSourceTier: 'priority-1-discovery-interview',
    blockerNote: 'Public works capability must not be implied until confirmed.',
  },
] as const;
