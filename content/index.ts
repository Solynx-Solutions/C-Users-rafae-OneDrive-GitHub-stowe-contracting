// =============================================================================
// content/ — Public API barrel export
// =============================================================================

// Company identity claims
export { companyClaims } from './company-profile';

// Brand messaging controlled messages
export { brandMessages } from './brand-messaging';

// CTA controlled messages
export { ctaMessages } from './calls-to-action';

// Trust indicators
export { TRUST_INDICATOR_CLAIM_KEYS, TRUST_INDICATOR_PENDING_CLAIM_KEYS } from './trust-indicators';

// Value propositions
export { VALUE_PROP_CLAIM_KEYS, VALUE_PROP_PENDING } from './value-propositions';

// Team messaging
export { TEAM_MESSAGING_CLAIM_KEYS, TEAM_MESSAGING_PENDING } from './team-messaging';

// Company culture
export { COMPANY_CULTURE_CLAIM_KEYS } from './company-culture';

// Local ownership
export { LOCAL_OWNERSHIP_CLAIM_KEYS } from './local-ownership';

// Positioning
export { RESIDENTIAL_CLAIM_KEYS, RESIDENTIAL_PENDING } from './residential-positioning';
export { COMMERCIAL_CLAIM_KEYS, COMMERCIAL_PENDING } from './commercial-positioning';
export {
  MECHANICAL_INSTALLATION_CLAIM_KEYS,
  MECHANICAL_INSTALLATION_PENDING,
} from './mechanical-installation-messaging';

// Policy references
export { PROHIBITED_CLAIM_CATEGORIES } from './prohibited-claims';
export { VERIFICATION_REQUIRED_ITEMS } from './verification-required';

// Route records (consumed by lib/content/registry and app/sitemap.ts)
export { siteRoutes } from './sources';
