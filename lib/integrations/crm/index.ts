// =============================================================================
// CRM INTEGRATION — PUBLIC INDEX
//
// Single import point for all CRM integration utilities.
//
// Usage in server-side action files:
//   import { submitEstimateToCrm, mapEstimateLead, ... } from '@/lib/integrations/crm';
//
// Never import this from client components — the CRM client is server-only.
// =============================================================================

// Types (safe to import anywhere)
export type {
  EstimateType,
  CrmConfigState,
  CrmConfig,
  CrmLeadPayload,
  CrmSubmitResult,
  EstimateLead,
  ContactLead,
  LeadSource,
  LeadRouting,
} from './types';

// Configuration
export { resolveCrmConfig, isCrmConfigured, safeWebhookLabel } from './config';

// Lead mapping
export {
  mapEstimateLead,
  mapContactLead,
  resolveEstimateRouting,
  resolveContactRouting,
} from './lead-mapper';

// HTTP client (server-only)
export { submitEstimateToCrm, submitContactToCrm } from './client';

// Logger (server-only)
export { crmLogger } from './logger';
