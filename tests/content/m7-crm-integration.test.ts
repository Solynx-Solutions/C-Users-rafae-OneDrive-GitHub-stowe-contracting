// =============================================================================
// TESTS: M7 — CRM Integration Foundation
//
// Covers (all external requests mocked — no GHL production hits):
//
//   CRM Configuration:
//     Test 1:  Disabled state when no env vars set
//     Test 2:  Configured state when both webhook URLs present
//     Test 3:  Misconfigured state when only one webhook URL present
//     Test 4:  Misconfigured state when only provider is set
//     Test 5:  safeWebhookLabel redacts path from a full URL
//     Test 6:  safeWebhookLabel returns '[not set]' for undefined
//     Test 7:  safeWebhookLabel returns '[invalid url]' for garbage input
//
//   Lead Mapper — Estimate:
//     Test 8:  Residential estimate lead maps required fields correctly
//     Test 9:  Commercial estimate lead maps company/contact fields
//     Test 10: Optional empty fields are stripped from payload
//     Test 11: Source defaults to 'residential-estimate' for residential
//     Test 12: Source defaults to 'commercial-estimate' for commercial
//     Test 13: estimateType is set correctly in payload
//     Test 14: submittedAt is a valid ISO 8601 string
//
//   Lead Mapper — Contact:
//     Test 15: Contact lead maps required fields correctly
//     Test 16: Optional phone is stripped when not provided
//     Test 17: inquiryType is included when provided
//     Test 18: Source defaults to 'contact'
//
//   Routing:
//     Test 19: Residential estimate resolves 'residential-estimate' routing
//     Test 20: Commercial estimate resolves 'commercial-estimate' routing
//     Test 21: 'estimate-residential' contact inquiry routes to residential
//     Test 22: 'estimate-commercial' contact inquiry routes to commercial
//     Test 23: 'general' contact inquiry routes to 'general-contact'
//     Test 24: undefined contact inquiry routes to 'general-contact'
//
//   submitEstimate — integration:
//     Test 25: Disabled config returns configuration_unavailable, no fetch
//     Test 26: Configured + CRM success returns 'success'
//     Test 27: Configured + CRM failure returns 'submission_error'
//     Test 28: Network error returns 'submission_error'
//     Test 29: Success outcome is only returned after confirmed CRM response
//
//   submitContact — integration:
//     Test 30: Disabled config returns configuration_unavailable, no fetch
//     Test 31: Configured + CRM success returns 'success'
//     Test 32: CRM failure returns 'submission_error'
//
//   Honeypot:
//     Test 33: Honeypot with value returns spam_rejected (estimate)
//     Test 34: Honeypot with value returns spam_rejected (contact)
//     Test 35: Empty honeypot does not reject (estimate)
//     Test 36: Empty honeypot does not reject (contact)
//     Test 37: isHoneypotTriggered returns true for non-empty string
//     Test 38: isHoneypotTriggered returns false for empty string
//     Test 39: isHoneypotTriggered returns false for undefined
//
//   No secrets exposed:
//     Test 40: submitEstimate result never contains webhook URL
//     Test 41: submitContact result never contains webhook URL
//
//   No SMS consent:
//     Test 42: submitEstimate payload has no SMS consent field
//     Test 43: submitContact payload has no SMS consent field
// =============================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  resolveCrmConfig,
  isCrmConfigured,
  safeWebhookLabel,
  mapEstimateLead,
  mapContactLead,
  resolveEstimateRouting,
  resolveContactRouting,
} from '../../lib/integrations/crm';
import { isHoneypotTriggered, submitEstimate } from '../../lib/actions/submitEstimate';
import { submitContact } from '../../lib/actions/submitContact';
import { type EstimateFormValues } from '../../lib/validations/estimateForm';
import { type ContactFormValues } from '../../lib/validations/contactForm';

// ─── Test fixtures ─────────────────────────────────────────────────────────────

const VALID_ESTIMATE_RESIDENTIAL: EstimateFormValues = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
  phone: '8315550001',
  serviceType: 'concrete-flatwork',
  projectDescription: 'We need a new concrete driveway installed at our property.',
  propertyType: 'single-family',
  preferredContactMethod: 'phone',
  timeline: 'within-3-months',
};

const VALID_ESTIMATE_COMMERCIAL: EstimateFormValues = {
  firstName: 'Bob',
  lastName: 'Jones',
  email: 'bob@acme.com',
  phone: '8315550002',
  serviceType: 'foundation',
  projectDescription: 'We need a commercial slab poured for a new warehouse facility.',
  companyName: 'Acme Construction LLC',
  contactName: 'Bob Jones',
  preferredContactMethod: 'email',
};

const VALID_CONTACT: ContactFormValues = {
  firstName: 'Alice',
  lastName: 'Brown',
  email: 'alice@example.com',
  message: 'I have a question about a residential project on my property.',
  inquiryType: 'general',
  preferredContactMethod: 'either',
};

// ─── Env variable helpers ─────────────────────────────────────────────────────

function setEnv(vars: Record<string, string | undefined>) {
  for (const [key, val] of Object.entries(vars)) {
    if (val === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = val;
    }
  }
}

function clearCrmEnv() {
  setEnv({
    CRM_SUBMISSION_ENABLED: undefined,
    CRM_PROVIDER: undefined,
    GHL_WEBHOOK_URL: undefined,
    GHL_ESTIMATE_WEBHOOK_URL: undefined,
    GHL_CONTACT_WEBHOOK_URL: undefined,
  });
}

function enableCrm() {
  setEnv({
    CRM_SUBMISSION_ENABLED: 'true',
    GHL_ESTIMATE_WEBHOOK_URL: 'https://hooks.example.com/estimate',
    GHL_CONTACT_WEBHOOK_URL: 'https://hooks.example.com/contact',
  });
}

// =============================================================================
// CRM CONFIGURATION TESTS
// =============================================================================

describe('M7 — CRM configuration', () => {
  beforeEach(clearCrmEnv);
  afterEach(clearCrmEnv);

  it('Test 1 — disabled state when no env vars set', () => {
    const config = resolveCrmConfig();
    expect(config.state).toBe('disabled');
  });

  it('Test 2 — configured state when both webhook URLs present', () => {
    enableCrm();
    const config = resolveCrmConfig();
    expect(config.state).toBe('configured');
    expect(isCrmConfigured(config, 'estimate')).toBe(true);
    expect(isCrmConfigured(config, 'contact')).toBe(true);
  });

  it('Test 3 — misconfigured when only estimate webhook present', () => {
    setEnv({
      CRM_SUBMISSION_ENABLED: 'true',
      GHL_ESTIMATE_WEBHOOK_URL: 'https://hooks.example.com/estimate',
    });
    const config = resolveCrmConfig();
    expect(config.state).toBe('misconfigured');
  });

  it('Test 4 — misconfigured when only provider set without URLs', () => {
    setEnv({ CRM_SUBMISSION_ENABLED: 'true', CRM_PROVIDER: 'ghl' });
    const config = resolveCrmConfig();
    expect(config.state).toBe('misconfigured');
  });

  it('Test 5 — safeWebhookLabel redacts path from full URL', () => {
    const label = safeWebhookLabel(
      'https://services.leadconnectorhq.com/hooks/secret-path/webhook'
    );
    expect(label).toContain('services.leadconnectorhq.com');
    expect(label).not.toContain('secret-path');
    expect(label).toContain('[path redacted]');
  });

  it('Test 6 — safeWebhookLabel returns [not set] for undefined', () => {
    expect(safeWebhookLabel(undefined)).toBe('[not set]');
  });

  it('Test 7 — safeWebhookLabel returns [invalid url] for garbage input', () => {
    expect(safeWebhookLabel('not-a-url')).toBe('[invalid url]');
  });

  it('keeps complete webhook configuration disabled until explicitly enabled', () => {
    setEnv({
      GHL_ESTIMATE_WEBHOOK_URL: 'https://hooks.example.com/estimate',
      GHL_CONTACT_WEBHOOK_URL: 'https://hooks.example.com/contact',
    });
    expect(resolveCrmConfig().state).toBe('disabled');
  });

  it('treats enabled invalid webhook URLs as misconfigured', () => {
    setEnv({
      CRM_SUBMISSION_ENABLED: 'true',
      GHL_ESTIMATE_WEBHOOK_URL: 'not-a-url',
      GHL_CONTACT_WEBHOOK_URL: 'http://insecure.example.com/contact',
    });
    expect(resolveCrmConfig().state).toBe('misconfigured');
  });
});

// =============================================================================
// LEAD MAPPER — ESTIMATE
// =============================================================================

describe('M7 — Lead mapper (estimate)', () => {
  it('Test 8 — residential estimate lead maps required fields correctly', () => {
    const lead = mapEstimateLead(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    expect(lead.firstName).toBe('Jane');
    expect(lead.lastName).toBe('Smith');
    expect(lead.email).toBe('jane@example.com');
    expect(lead.phone).toBe('8315550001');
    expect(lead.estimateType).toBe('residential');
    expect(lead.serviceType).toBe('concrete-flatwork');
    expect(lead.projectDescription).toBe(VALID_ESTIMATE_RESIDENTIAL.projectDescription);
  });

  it('Test 9 — commercial estimate lead includes company and contact fields', () => {
    const lead = mapEstimateLead(VALID_ESTIMATE_COMMERCIAL, 'commercial');
    expect(lead.companyName).toBe('Acme Construction LLC');
    expect(lead.contactName).toBe('Bob Jones');
    expect(lead.estimateType).toBe('commercial');
  });

  it('Test 10 — optional empty fields are stripped from payload', () => {
    const data: EstimateFormValues = {
      ...VALID_ESTIMATE_RESIDENTIAL,
      timeline: '',
      budget: '',
      propertyType: '',
      companyName: undefined,
      contactName: undefined,
    };
    const lead = mapEstimateLead(data, 'residential');
    expect(lead).not.toHaveProperty('timeline');
    expect(lead).not.toHaveProperty('budget');
    expect(lead).not.toHaveProperty('propertyType');
    expect(lead).not.toHaveProperty('companyName');
    expect(lead).not.toHaveProperty('contactName');
  });

  it('Test 11 — source defaults to residential-estimate for residential', () => {
    const lead = mapEstimateLead(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    expect(lead.source).toBe('residential-estimate');
  });

  it('Test 12 — source defaults to commercial-estimate for commercial', () => {
    const lead = mapEstimateLead(VALID_ESTIMATE_COMMERCIAL, 'commercial');
    expect(lead.source).toBe('commercial-estimate');
  });

  it('Test 13 — estimateType is set correctly in payload', () => {
    const res = mapEstimateLead(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    const com = mapEstimateLead(VALID_ESTIMATE_COMMERCIAL, 'commercial');
    expect(res.estimateType).toBe('residential');
    expect(com.estimateType).toBe('commercial');
  });

  it('Test 14 — submittedAt is a valid ISO 8601 string', () => {
    const lead = mapEstimateLead(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    expect(lead.submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
});

// =============================================================================
// LEAD MAPPER — CONTACT
// =============================================================================

describe('M7 — Lead mapper (contact)', () => {
  it('Test 15 — contact lead maps required fields correctly', () => {
    const lead = mapContactLead(VALID_CONTACT);
    expect(lead.firstName).toBe('Alice');
    expect(lead.lastName).toBe('Brown');
    expect(lead.email).toBe('alice@example.com');
    expect(lead.message).toBe(VALID_CONTACT.message);
  });

  it('Test 16 — optional phone is stripped when not provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { phone: _omit, ...withoutPhone } = { ...VALID_CONTACT, phone: undefined };
    const lead = mapContactLead(withoutPhone as ContactFormValues);
    expect(lead).not.toHaveProperty('phone');
  });

  it('Test 17 — inquiryType is included when provided', () => {
    const lead = mapContactLead({ ...VALID_CONTACT, inquiryType: 'estimate-residential' });
    expect(lead.inquiryType).toBe('estimate-residential');
  });

  it('Test 18 — source defaults to contact', () => {
    const lead = mapContactLead(VALID_CONTACT);
    expect(lead.source).toBe('contact');
  });
});

// =============================================================================
// ROUTING
// =============================================================================

describe('M7 — CRM routing', () => {
  it('Test 19 — residential estimate resolves residential-estimate routing', () => {
    expect(resolveEstimateRouting('residential')).toBe('residential-estimate');
  });

  it('Test 20 — commercial estimate resolves commercial-estimate routing', () => {
    expect(resolveEstimateRouting('commercial')).toBe('commercial-estimate');
  });

  it('Test 21 — estimate-residential inquiry routes to residential-estimate', () => {
    expect(resolveContactRouting('estimate-residential')).toBe('residential-estimate');
  });

  it('Test 22 — estimate-commercial inquiry routes to commercial-estimate', () => {
    expect(resolveContactRouting('estimate-commercial')).toBe('commercial-estimate');
  });

  it('Test 23 — general inquiry routes to general-contact', () => {
    expect(resolveContactRouting('general')).toBe('general-contact');
  });

  it('Test 24 — undefined inquiry routes to general-contact', () => {
    expect(resolveContactRouting(undefined)).toBe('general-contact');
  });
});

// =============================================================================
// submitEstimate — INTEGRATION (mocked fetch)
// =============================================================================

describe('M7 — submitEstimate integration', () => {
  beforeEach(() => {
    clearCrmEnv();
    vi.clearAllMocks();
  });
  afterEach(() => {
    clearCrmEnv();
    vi.restoreAllMocks();
  });

  it('Test 25 — disabled config returns configuration_unavailable without calling fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const result = await submitEstimate(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    expect(result.outcome).toBe('configuration_unavailable');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('misconfigured estimate state makes no external request', async () => {
    setEnv({
      CRM_SUBMISSION_ENABLED: 'true',
      GHL_ESTIMATE_WEBHOOK_URL: 'https://hooks.example.com/estimate',
    });
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const result = await submitEstimate(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    expect(result.outcome).toBe('configuration_unavailable');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('invalid estimate data is rejected before any external request', async () => {
    enableCrm();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const result = await submitEstimate(
      { ...VALID_ESTIMATE_RESIDENTIAL, email: 'invalid' },
      'residential'
    );
    expect(result.outcome).toBe('validation_error');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('Test 26 — configured + CRM 200 returns success', async () => {
    enableCrm();
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('ok', { status: 200 }));
    const result = await submitEstimate(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    expect(result.outcome).toBe('success');
  });

  it('Test 27 — configured + CRM 500 returns submission_error', async () => {
    enableCrm();
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('error', { status: 500 }));
    const result = await submitEstimate(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    expect(result.outcome).toBe('submission_error');
  });

  it('Test 28 — network error returns submission_error', async () => {
    enableCrm();
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));
    const result = await submitEstimate(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    expect(result.outcome).toBe('submission_error');
  });

  it('Test 29 — success outcome is only returned after confirmed CRM 2xx response', async () => {
    enableCrm();
    // Simulate 422 Unprocessable Entity — not a success
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('invalid', { status: 422 }));
    const result = await submitEstimate(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    expect(result.outcome).not.toBe('success');
  });
});

// =============================================================================
// submitContact — INTEGRATION (mocked fetch)
// =============================================================================

describe('M7 — submitContact integration', () => {
  beforeEach(() => {
    clearCrmEnv();
    vi.clearAllMocks();
  });
  afterEach(() => {
    clearCrmEnv();
    vi.restoreAllMocks();
  });

  it('Test 30 — disabled config returns configuration_unavailable without calling fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const result = await submitContact(VALID_CONTACT);
    expect(result.outcome).toBe('configuration_unavailable');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('misconfigured contact state makes no external request', async () => {
    setEnv({
      CRM_SUBMISSION_ENABLED: 'true',
      GHL_CONTACT_WEBHOOK_URL: 'https://hooks.example.com/contact',
    });
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const result = await submitContact(VALID_CONTACT);
    expect(result.outcome).toBe('configuration_unavailable');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('invalid contact data is rejected before any external request', async () => {
    enableCrm();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const result = await submitContact({ ...VALID_CONTACT, message: 'short' });
    expect(result.outcome).toBe('validation_error');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('Test 31 — configured + CRM 200 returns success', async () => {
    enableCrm();
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('ok', { status: 200 }));
    const result = await submitContact(VALID_CONTACT);
    expect(result.outcome).toBe('success');
  });

  it('Test 32 — CRM failure returns submission_error', async () => {
    enableCrm();
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('error', { status: 503 }));
    const result = await submitContact(VALID_CONTACT);
    expect(result.outcome).toBe('submission_error');
  });
});

// =============================================================================
// HONEYPOT
// =============================================================================

describe('M7 — Honeypot spam protection', () => {
  beforeEach(clearCrmEnv);
  afterEach(clearCrmEnv);

  it('Test 33 — honeypot with value returns spam_rejected (estimate)', async () => {
    const result = await submitEstimate(VALID_ESTIMATE_RESIDENTIAL, 'residential', 'bot-filled');
    expect(result.outcome).toBe('spam_rejected');
  });

  it('Test 34 — honeypot with value returns spam_rejected (contact)', async () => {
    const result = await submitContact(VALID_CONTACT, 'bot-filled');
    expect(result.outcome).toBe('spam_rejected');
  });

  it('Test 35 — empty honeypot does not reject estimate', async () => {
    // CRM is disabled, so we expect configuration_unavailable — not spam_rejected
    const result = await submitEstimate(VALID_ESTIMATE_RESIDENTIAL, 'residential', '');
    expect(result.outcome).not.toBe('spam_rejected');
  });

  it('Test 36 — empty honeypot does not reject contact', async () => {
    const result = await submitContact(VALID_CONTACT, '');
    expect(result.outcome).not.toBe('spam_rejected');
  });

  it('Test 37 — isHoneypotTriggered returns true for non-empty string', () => {
    expect(isHoneypotTriggered('bot-value')).toBe(true);
    expect(isHoneypotTriggered('   ')).toBe(false); // whitespace only trims to empty
  });

  it('Test 38 — isHoneypotTriggered returns false for empty string', () => {
    expect(isHoneypotTriggered('')).toBe(false);
  });

  it('Test 39 — isHoneypotTriggered returns false for undefined', () => {
    expect(isHoneypotTriggered(undefined)).toBe(false);
  });
});

// =============================================================================
// NO SECRETS EXPOSED
// =============================================================================

describe('M7 — No secrets exposed in submission results', () => {
  beforeEach(() => {
    clearCrmEnv();
    vi.clearAllMocks();
  });
  afterEach(() => {
    clearCrmEnv();
    vi.restoreAllMocks();
  });

  it('Test 40 — submitEstimate result never contains webhook URL', async () => {
    const SECRET_URL = 'https://hooks.example.com/secret-estimate-path';
    setEnv({
      CRM_SUBMISSION_ENABLED: 'true',
      GHL_ESTIMATE_WEBHOOK_URL: SECRET_URL,
      GHL_CONTACT_WEBHOOK_URL: 'https://hooks.example.com/secret-contact-path',
    });
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('error', { status: 500 }));
    const result = await submitEstimate(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    const serialized = JSON.stringify(result);
    expect(serialized).not.toContain('secret-estimate-path');
    expect(serialized).not.toContain(SECRET_URL);
  });

  it('Test 41 — submitContact result never contains webhook URL', async () => {
    const SECRET_URL = 'https://hooks.example.com/secret-contact-path';
    setEnv({
      CRM_SUBMISSION_ENABLED: 'true',
      GHL_ESTIMATE_WEBHOOK_URL: 'https://hooks.example.com/secret-estimate-path',
      GHL_CONTACT_WEBHOOK_URL: SECRET_URL,
    });
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('error', { status: 500 }));
    const result = await submitContact(VALID_CONTACT);
    const serialized = JSON.stringify(result);
    expect(serialized).not.toContain('secret-contact-path');
    expect(serialized).not.toContain(SECRET_URL);
  });
});

// =============================================================================
// NO SMS CONSENT
// =============================================================================

describe('M7 — No SMS consent added', () => {
  it('Test 42 — estimate lead payload has no SMS consent field', () => {
    const lead = mapEstimateLead(VALID_ESTIMATE_RESIDENTIAL, 'residential');
    const serialized = JSON.stringify(lead).toLowerCase();
    expect(serialized).not.toContain('sms');
    expect(serialized).not.toContain('consent');
    expect(serialized).not.toContain('marketing');
    expect(serialized).not.toContain('text_message');
    expect(serialized).not.toContain('opt_in');
  });

  it('Test 43 — contact lead payload has no SMS consent field', () => {
    const lead = mapContactLead(VALID_CONTACT);
    const serialized = JSON.stringify(lead).toLowerCase();
    expect(serialized).not.toContain('sms');
    expect(serialized).not.toContain('consent');
    expect(serialized).not.toContain('marketing');
    expect(serialized).not.toContain('opt_in');
  });
});
