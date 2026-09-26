import { describe, expect, it } from 'vitest';
import { contactFormSchema } from '../../lib/validations/contactForm';
import { estimateFormSchema } from '../../lib/validations/estimateForm';
import { mapContactLead, mapEstimateLead } from '../../lib/integrations/crm/lead-mapper';

const base = { firstName: 'Test', lastName: 'Person', email: 'test@example.test', phone: '209-470-1307', message: 'A fictional project inquiry.', serviceType: 'pavers', projectDescription: 'A fictional paving project inquiry.' };
describe('transactional SMS opt-in', () => {
  it('binds consent to a fresh server ID and submitted phone, rejecting client identity overrides', () => {
    const data = contactFormSchema.parse({ ...base, smsConsent: true, submissionId: 'forged', submittedPhone: '+19166024354' });
    const lead = mapContactLead(data);
    expect(lead.submissionId).not.toBe('forged');
    expect(lead.submissionId).not.toBe(mapContactLead(data).submissionId);
    expect(lead.submittedPhone).toBe('+12094701307');
    expect(lead.smsConsentBinding).toEqual({ submissionId: lead.submissionId, phone: '+12094701307', granted: true });
    const declined = mapEstimateLead(estimateFormSchema.parse({ ...base, smsConsent: false }), 'commercial');
    expect(declined.smsConsentBinding).toEqual({ submissionId: declined.submissionId, phone: null, granted: false });
  });
  for (const schema of [contactFormSchema, estimateFormSchema]) {
    it('accepts checked native input and boolean server validation', () => {
      expect(schema.parse({ ...base, smsConsent: 'on' }).smsConsent).toBe(true);
      expect(schema.parse(schema.parse({ ...base, smsConsent: 'on' })).smsConsent).toBe(true);
    });
    it('does not coerce arbitrary truthy strings', () => {
      for (const value of ['false', 'true', 'yes', 1]) expect(schema.safeParse({ ...base, smsConsent: value }).success).toBe(false);
    });
    it('rejects opt-in with missing or malformed phone', () => {
      for (const phone of ['', '5551234', '+120947013207']) expect(schema.safeParse({ ...base, phone, smsConsent: true }).success).toBe(false);
    });
  }
  it('preserves explicit false and supplies version/source/time in both payloads', () => {
    for (const smsConsent of [true, false]) {
      for (const lead of [mapContactLead(contactFormSchema.parse({ ...base, smsConsent })), mapEstimateLead(estimateFormSchema.parse({ ...base, smsConsent }), 'residential')]) {
        expect(lead.smsConsent).toBe(smsConsent);
        expect(lead.smsConsentVersion).toBe('stowe-inquiry-sms-v1-2026-09-25');
        expect(lead.source).toBeTruthy();
        expect(Number.isNaN(Date.parse(lead.submittedAt))).toBe(false);
      }
    }
  });
});
