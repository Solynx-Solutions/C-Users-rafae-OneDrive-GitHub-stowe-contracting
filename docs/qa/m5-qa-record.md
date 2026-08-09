# M5 QA Record — Contact + Conversion Trust Layer

**Milestone:** M5 — Contact + Conversion Trust Layer  
**Branch:** `feature/m5-contact-trust-layer`  
**Feature commit:** `4d1ca72`  
**Merge commit:** `d852c37`  
**Post-merge format fix:** `89b9343`  
**Development HEAD:** `89b9343`  
**Merged into:** `development`  
**Merge strategy:** `--no-ff`  
**Review date:** 2026-08-08

---

## Pre-Merge Gates (on feature branch)

| Gate                   | Result                                       |
| ---------------------- | -------------------------------------------- |
| `npm run format:check` | ✅ All matched files use Prettier code style |
| `npm run lint`         | ✅ 0 errors, 0 warnings                      |
| `npm run type-check`   | ✅ TypeScript 0 errors                       |
| `npm test`             | ✅ 166/166 tests, 14 test files              |
| `npm run build`        | ✅ 10 static routes, 0 errors                |

## Post-Merge Gates (on development)

| Gate                   | Result                                       |
| ---------------------- | -------------------------------------------- |
| `npm run format:check` | ✅ All matched files use Prettier code style |
| `npm run lint`         | ✅ 0 errors, 0 warnings                      |
| `npm run type-check`   | ✅ TypeScript 0 errors                       |
| `npm test`             | ✅ 166/166 tests, 14 test files              |
| `npm run build`        | ✅ 10 static routes, 0 errors                |

**Post-merge note:** `contact-form.tsx` required one Prettier pass after the `fieldErrors → errors` type fix edits. No logic changes — whitespace only. Absorbed into `89b9343`.

---

## Route Inventory — development @ `89b9343`

| Route                      | Verification | Publication | In Sitemap | In Nav | Milestone |
| -------------------------- | ------------ | ----------- | ---------- | ------ | --------- |
| `/`                        | confirmed    | active      | ✅         | ✅     | M0        |
| `/estimate/residential`    | confirmed    | active      | ✅         | No     | M3        |
| `/estimate/commercial`     | confirmed    | active      | ✅         | No     | M3        |
| `/mechanical-installation` | confirmed    | active      | ✅         | No     | M4        |
| `/contact`                 | confirmed    | active      | ✅         | No     | M5        |
| `/about`                   | confirmed    | draft       | ❌         | ❌     | Pending   |
| `/services`                | confirmed    | draft       | ❌         | ❌     | M4        |
| `/projects`                | pending      | inactive    | ❌         | ❌     | Blocked   |
| `/blog`                    | pending      | inactive    | ❌         | ❌     | Blocked   |

---

## M5 Content Delivered

### Pages

| File                   | Route      | Status    |
| ---------------------- | ---------- | --------- |
| `app/contact/page.tsx` | `/contact` | ✅ Active |

### Components (new directory: `components/contact/`)

| Component                   | Description                                                           |
| --------------------------- | --------------------------------------------------------------------- |
| `contact-hero.tsx`          | Dark hero — locally owned, years-in-business, Monterey Bay            |
| `contact-information.tsx`   | Governance-gated contact cards — renders only confirmed+active fields |
| `contact-routing.tsx`       | Residential / Commercial project pathway split with CTAs              |
| `contact-trust-section.tsx` | 4-point trust grid — local ownership, crew accountability, continuity |
| `contact-form.tsx`          | General inquiry form — mirrors M3 EstimateForm architecture           |

### Content Models

| File                             | Description                                                                 |
| -------------------------------- | --------------------------------------------------------------------------- |
| `content/contact.ts`             | Governance-controlled contact registry (phone, email, address, hours, area) |
| `lib/validations/contactForm.ts` | Upgraded Zod schema — split name, optional phone, inquiryType routing       |
| `lib/actions/submitContact.ts`   | CRM-ready stub — mirrors M3 submitEstimate pattern                          |

### Schema

| Addition                             | Schema Type | Notes                                                       |
| ------------------------------------ | ----------- | ----------------------------------------------------------- |
| `lib/schema.ts: contactPageSchema()` | ContactPage | No telephone/email/address — pending vr-contact-information |

---

## Contact Information State at M5

| Field        | Verification  | Publication | Resolves             |
| ------------ | ------------- | ----------- | -------------------- |
| Phone        | pending       | inactive    | null — not displayed |
| Email        | pending       | inactive    | null — not displayed |
| Address      | pending       | inactive    | null — not displayed |
| Hours        | pending       | inactive    | null — not displayed |
| Service Area | **confirmed** | **active**  | "Monterey Bay" ✅    |

**Holding state:** `ContactInformation` renders a "use the contact form" message when no confirmed contact fields are available. Activates automatically field-by-field as each is verified.

---

## CRM Integration Readiness

| Element                  | State      | Notes                                                                           |
| ------------------------ | ---------- | ------------------------------------------------------------------------------- |
| `submitContact()` stub   | Ready      | M7+: replace body with CRM webhook/Server Action                                |
| `inquiryType` field      | Wired      | Routes to residential/commercial/general pipeline at M7+                        |
| GHL field mapping        | Documented | firstName, lastName, email, phone, preferredContactMethod, inquiryType, message |
| Form signature stability | Confirmed  | Will not change — components depend on it                                       |

---

## Tests

| File                                     | Tests   | Description                                                  |
| ---------------------------------------- | ------- | ------------------------------------------------------------ |
| `tests/content/m5-contact-trust.test.ts` | 25      | Route, contact resolver, data model, form validation, schema |
| `tests/content/m1-navigation.test.ts`    | Updated | Baseline extended to include `/contact`                      |

**Cumulative total: 166 tests — 14 test files — all passing.**

---

## Milestone Integrity Check (M0–M5)

| Milestone | Description                        | Status    |
| --------- | ---------------------------------- | --------- |
| M0        | Foundation, governance, CI         | ✅ Intact |
| M1        | Core layout, navigation            | ✅ Intact |
| M2        | Homepage composition               | ✅ Intact |
| M3        | Estimate experience                | ✅ Intact |
| M4        | Mechanical installation + services | ✅ Intact |
| M5        | Contact + conversion trust layer   | ✅ Merged |

---

## Remaining Blockers

| Blocker ID               | Blocks                                   | Resolution Path             |
| ------------------------ | ---------------------------------------- | --------------------------- |
| `vr-contact-information` | Phone, email, address fields on /contact | Client verification         |
| `vr-business-hours`      | Hours field on /contact                  | Client verification         |
| `vr-service-areas`       | Specific cities in service area card     | Client verification         |
| `vr-service-list`        | /services activation, ServiceGrid        | Client verification         |
| Photography              | EquipmentShowcase, About crew photos     | Client delivery             |
| `vr-testimonials`        | Social proof across site                 | Client review collection    |
| `vr-social-profiles`     | Footer social links                      | Client verification         |
| `vr-founding-year`       | Schema foundingDate, exact year copy     | Document-level verification |

---

## Recommended Next Milestone

**M6 — About Page**

- No external blockers — all required claims are already confirmed
- High trust conversion value for residential visitors evaluating contractors
- Activates `route-about` to `confirmed + active`
- Scope: company story (chronology-policy compliant), crew/culture section, local ownership narrative, employee continuity, leadership placeholder (photography pending)
- Reuses `CtaSection`, `ContactRouting`, `ContentSection` patterns established in M4–M5
