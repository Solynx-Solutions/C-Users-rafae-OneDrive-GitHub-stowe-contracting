// =============================================================================
// TESTS: M5 — Contact + Conversion Trust Layer
//
// Covers:
//   Route governance:
//     Test 1: /contact route is confirmed + active
//     Test 2: /contact route is included in M5 active route baseline
//
//   Contact information governance:
//     Test 3: phone is pending — resolvePhone() returns null
//     Test 4: email is pending — resolveEmail() returns null
//     Test 5: address is pending — resolveAddress() returns null
//     Test 6: hours is pending — resolveHours() returns null
//     Test 7: service area identity is confirmed — resolveServiceAreaIdentity() returns value
//     Test 8: resolved service area identity contains "Monterey Bay"
//
//   Contact data model structure:
//     Test 9: contactInformation has all required keys
//     Test 10: all pending contact fields have empty values
//     Test 11: no pending field has a placeholder or invented value
//     Test 12: service area has empty specificAreas (pending vr-service-areas)
//
//   Contact form validation:
//     Test 13: valid minimal contact form data passes Zod schema
//     Test 14: missing firstName fails validation
//     Test 15: missing email fails validation
//     Test 16: invalid email format fails validation
//     Test 17: message too short fails validation
//     Test 18: invalid phone format fails when phone is provided
//     Test 19: phone is optional — omitting it does not fail
//     Test 20: invalid inquiryType fails validation
//     Test 21: valid inquiryType passes — estimate-residential
//     Test 22: valid inquiryType passes — estimate-commercial
//     Test 23: valid inquiryType passes — general
//
//   Schema:
//     Test 24: contactPageSchema returns ContactPage type
//     Test 25: contactPageSchema does not contain telephone, email, or address
// =============================================================================

import { describe, it, expect } from 'vitest';
import {
  contactInformation,
  resolvePhone,
  resolveEmail,
  resolveAddress,
  resolveHours,
  resolveServiceAreaIdentity,
} from '../../content/contact';
import { contactFormSchema } from '../../lib/validations/contactForm';
import { contactPageSchema } from '../../lib/schema';
import { siteRoutes } from '../../content/sources';
import { isPublishable } from '../../lib/content';

// =============================================================================
// ROUTE GOVERNANCE
// =============================================================================

describe('M5 — Route governance', () => {
  it('Test 1 — /contact route is confirmed + active', () => {
    const route = siteRoutes.find((r) => r.path === '/contact');
    expect(route, 'Route /contact must exist').toBeDefined();
    expect(route?.verificationStatus).toBe('confirmed');
    expect(route?.publicationStatus).toBe('active');
  });

  it('Test 2 — /contact route appears in M5 active baseline', () => {
    const EXPECTED_ACTIVE_PATHS = [
      '/',
      '/estimate/residential',
      '/estimate/commercial',
      '/mechanical-installation',
      '/contact',
    ];
    const publishableRoutes = siteRoutes.filter(isPublishable);
    const activePaths = publishableRoutes.map((r) => r.path);
    for (const expectedPath of EXPECTED_ACTIVE_PATHS) {
      expect(activePaths, `Expected "${expectedPath}" to be confirmed+active`).toContain(
        expectedPath
      );
    }
  });
});

// =============================================================================
// CONTACT INFORMATION GOVERNANCE
// =============================================================================

describe('M5 — Contact information governance', () => {
  it('Test 3 — phone is pending — resolvePhone() returns null', () => {
    const result = resolvePhone();
    expect(result).toBeNull();
  });

  it('Test 4 — email is pending — resolveEmail() returns null', () => {
    const result = resolveEmail();
    expect(result).toBeNull();
  });

  it('Test 5 — address is pending — resolveAddress() returns null', () => {
    const result = resolveAddress();
    expect(result).toBeNull();
  });

  it('Test 6 — hours is pending — resolveHours() returns null', () => {
    const result = resolveHours();
    expect(result).toBeNull();
  });

  it('Test 7 — service area identity is confirmed — resolveServiceAreaIdentity() returns a value', () => {
    const result = resolveServiceAreaIdentity();
    expect(result).not.toBeNull();
    expect(result).toBeTruthy();
  });

  it('Test 8 — resolved service area identity contains "Monterey Bay"', () => {
    const result = resolveServiceAreaIdentity();
    expect(result).toContain('Monterey Bay');
  });
});

// =============================================================================
// CONTACT DATA MODEL STRUCTURE
// =============================================================================

describe('M5 — Contact data model structure', () => {
  it('Test 9 — contactInformation has all required keys', () => {
    expect(contactInformation).toHaveProperty('phone');
    expect(contactInformation).toHaveProperty('email');
    expect(contactInformation).toHaveProperty('address');
    expect(contactInformation).toHaveProperty('hours');
    expect(contactInformation).toHaveProperty('serviceArea');
  });

  it('Test 10 — all pending contact fields have empty values', () => {
    // Pending fields must not have real values
    expect(contactInformation.phone.value).toBe('');
    expect(contactInformation.email.value).toBe('');
    expect(contactInformation.address.street).toBe('');
    expect(contactInformation.address.city).toBe('');
    expect(contactInformation.address.state).toBe('');
    expect(contactInformation.address.zip).toBe('');
    expect(contactInformation.hours.display).toBe('');
  });

  it('Test 11 — no pending field contains a placeholder or invented value', () => {
    const PLACEHOLDER_PATTERNS = [
      '555',
      'placeholder',
      'example.com',
      'test@',
      '123 main',
      '1234 ',
      'todo',
    ];

    const pendingValues = [
      contactInformation.phone.value,
      contactInformation.email.value,
      contactInformation.address.street,
      contactInformation.address.city,
      contactInformation.hours.display,
    ]
      .join(' ')
      .toLowerCase();

    for (const pattern of PLACEHOLDER_PATTERNS) {
      expect(
        pendingValues,
        `Pending contact field must not contain placeholder pattern: "${pattern}"`
      ).not.toContain(pattern.toLowerCase());
    }
  });

  it('Test 12 — service area has empty specificAreas (pending vr-service-areas)', () => {
    expect(Array.isArray(contactInformation.serviceArea.specificAreas)).toBe(true);
    expect(contactInformation.serviceArea.specificAreas).toHaveLength(0);
  });
});

// =============================================================================
// CONTACT FORM VALIDATION
// =============================================================================

describe('M5 — Contact form validation', () => {
  const validBase = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    message: 'I have a question about a residential project on my property.',
  };

  it('Test 13 — valid minimal contact form data passes Zod schema', () => {
    const result = contactFormSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it('Test 14 — missing firstName fails validation', () => {
    const result = contactFormSchema.safeParse({ ...validBase, firstName: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const keys = result.error.issues.map((i) => i.path[0]);
      expect(keys).toContain('firstName');
    }
  });

  it('Test 15 — missing email fails validation', () => {
    const result = contactFormSchema.safeParse({ ...validBase, email: '' });
    expect(result.success).toBe(false);
  });

  it('Test 16 — invalid email format fails validation', () => {
    const result = contactFormSchema.safeParse({ ...validBase, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const keys = result.error.issues.map((i) => i.path[0]);
      expect(keys).toContain('email');
    }
  });

  it('Test 17 — message too short fails validation', () => {
    const result = contactFormSchema.safeParse({ ...validBase, message: 'Too short' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const keys = result.error.issues.map((i) => i.path[0]);
      expect(keys).toContain('message');
    }
  });

  it('Test 18 — invalid phone format fails when phone is provided', () => {
    const result = contactFormSchema.safeParse({ ...validBase, phone: 'not-a-phone' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const keys = result.error.issues.map((i) => i.path[0]);
      expect(keys).toContain('phone');
    }
  });

  it('Test 19 — phone is optional — omitting it does not fail', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { phone: _omit, ...withoutPhone } = { ...validBase, phone: undefined };
    const result = contactFormSchema.safeParse(withoutPhone);
    expect(result.success).toBe(true);
  });

  it('Test 20 — invalid inquiryType fails validation', () => {
    const result = contactFormSchema.safeParse({ ...validBase, inquiryType: 'invalid-type' });
    expect(result.success).toBe(false);
  });

  it('Test 21 — valid inquiryType: estimate-residential passes', () => {
    const result = contactFormSchema.safeParse({
      ...validBase,
      inquiryType: 'estimate-residential',
    });
    expect(result.success).toBe(true);
  });

  it('Test 22 — valid inquiryType: estimate-commercial passes', () => {
    const result = contactFormSchema.safeParse({
      ...validBase,
      inquiryType: 'estimate-commercial',
    });
    expect(result.success).toBe(true);
  });

  it('Test 23 — valid inquiryType: general passes', () => {
    const result = contactFormSchema.safeParse({ ...validBase, inquiryType: 'general' });
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// SCHEMA
// =============================================================================

describe('M5 — Contact page schema governance', () => {
  it('Test 24 — contactPageSchema returns ContactPage @type', () => {
    const schema = contactPageSchema({ url: '/contact' });
    expect(schema['@type']).toBe('ContactPage');
  });

  it('Test 25 — contactPageSchema does not contain telephone, email, or street address', () => {
    const schemaStr = JSON.stringify(contactPageSchema({ url: '/contact' })).toLowerCase();
    expect(schemaStr).not.toContain('"telephone"');
    expect(schemaStr).not.toContain('"email"');
    expect(schemaStr).not.toContain('"streetaddress"');
  });
});
