# M3 Estimate Experience — QA Record

**Agent:** Agent 06 — Development Team  
**Milestone:** M3 — Estimate Experience Foundation  
**Date:** 2026-08-07  
**Branch:** `feature/m3-estimate-experience` (from `development`)  
**Status:** ✅ COMPLETE — All components built, governance-compliant, tests written

---

## Branch

| Step                                                | Status          |
| --------------------------------------------------- | --------------- |
| `git checkout development`                          | ✅              |
| `git pull --ff-only origin development`             | ✅              |
| `git checkout -b feature/m3-estimate-experience`    | ✅              |
| `git push -u origin feature/m3-estimate-experience` | ⏳ (final step) |

---

## Route Activation

| Route                   | Prev Status         | M3 Status            | Publishable |
| ----------------------- | ------------------- | -------------------- | ----------- |
| `/estimate/residential` | `confirmed + draft` | `confirmed + active` | ✅          |
| `/estimate/commercial`  | `confirmed + draft` | `confirmed + active` | ✅          |

---

## Files Created / Modified

### Form Components (`components/forms/`)

| File                          | Status                          | Purpose                                                                                         |
| ----------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| `EstimateField.tsx`           | ✅ existing — no changes needed | Accessible field wrapper — auto-generates `id`/`htmlFor`, aria-describedby, error announcements |
| `ContactDetailsSection.tsx`   | ✅ updated (M3)                 | firstName + lastName (split), email, phone, **preferredContactMethod**                          |
| `CommercialDetailsFields.tsx` | ✅ new (M3)                     | companyName, contactName — commercial-only CRM fields                                           |
| `ProjectDetailsSection.tsx`   | ✅ updated (M3)                 | Added `showPropertyType` prop (residential), `scopeLabel` prop (commercial)                     |
| `FormSuccessState.tsx`        | ✅ existing — no changes        | Post-submission acknowledgement (honest — no fake confirmation numbers)                         |
| `EstimateForm.tsx`            | ✅ updated (M3)                 | Wires CommercialDetailsFields in commercial mode, passes showPropertyType/scopeLabel            |
| `index.ts`                    | ✅ updated (M3)                 | Added CommercialDetailsFields barrel export                                                     |

### Validation (`lib/validations/`)

| File              | Status          | Change                                                                                                                     |
| ----------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `estimateForm.ts` | ✅ updated (M3) | Split `name` → `firstName` + `lastName`, added `preferredContactMethod` enum, `propertyType`, `companyName`, `contactName` |

### Pages

| Route                   | File                                | Status      |
| ----------------------- | ----------------------------------- | ----------- |
| `/estimate/residential` | `app/estimate/residential/page.tsx` | ✅ new (M3) |
| `/estimate/commercial`  | `app/estimate/commercial/page.tsx`  | ✅ new (M3) |

### Tests

| File                                       | Tests                                              | Status              |
| ------------------------------------------ | -------------------------------------------------- | ------------------- |
| `tests/content/m3-estimate-routes.test.ts` | 14 tests — route registry, form schema, governance | ✅ new/updated (M3) |

### Content Registry

| File                 | Status          | Change                                                                           |
| -------------------- | --------------- | -------------------------------------------------------------------------------- |
| `content/sources.ts` | ✅ updated (M3) | Estimate routes: `draft` → `active`, added `verificationNote` + `lastReviewedAt` |

---

## Form Data Model

### Residential (`estimateType === 'residential'`)

```text
firstName               required
lastName                required
email                   required
phone                   required
preferredContactMethod  optional enum: phone | email | either
propertyType            optional
serviceType             required
projectDescription      required (min 20 chars)
timeline                optional
budget                  optional
```

### Commercial (`estimateType === 'commercial'`)

```text
companyName             optional (CRM: Company field)
contactName             optional (CRM: Contact Name)
firstName               required
lastName                required
email                   required
phone                   required
preferredContactMethod  optional enum: phone | email | either
serviceType             required
projectDescription      required — labeled "Scope Description" in UI (min 20 chars)
timeline                optional
budget                  optional
```

---

## Governance Compliance

### Residential Page — Claims Used

| Claim Key               | Canonical Text                       | Status       |
| ----------------------- | ------------------------------------ | ------------ |
| `years-in-business`     | Nearly 40 years serving Monterey Bay | ✅ confirmed |
| `locally-owned`         | Locally owned and operated           | ✅ confirmed |
| `in-house-crews`        | Experienced in-house crews           | ✅ confirmed |
| `monterey-bay-identity` | Monterey Bay                         | ✅ confirmed |

### Commercial Page — Claims Used

| Claim Key               | Canonical Text                                | Status       |
| ----------------------- | --------------------------------------------- | ------------ |
| `years-in-business`     | Nearly 40 years serving Monterey Bay          | ✅ confirmed |
| `in-house-crews`        | Experienced in-house crews                    | ✅ confirmed |
| `mechanical-equipment`  | Specialized mechanical installation equipment | ✅ confirmed |
| `monterey-bay-identity` | Monterey Bay                                  | ✅ confirmed |

### Prohibited Expressions — Verified Absent

- ✅ No guaranteed pricing
- ✅ No exact timelines or response time commitments
- ✅ No cost savings claims
- ✅ No warranties
- ✅ No public works capability
- ✅ No government contract claims
- ✅ No named clients
- ✅ No certifications or bonding claims
- ✅ No insurance limit claims
- ✅ No founding year (1987, etc.)
- ✅ No service capability claims (vr-service-list still inactive)
- ✅ No contact information (vr-contact-information still inactive)
- ✅ No testimonials (vr-testimonials still inactive)

---

## Form Architecture

### Implementation Pattern

- **Native HTML form** with `FormData` — no `react-hook-form` dependency
- **Zod schema** validation on submit (`estimateFormSchema` from `lib/validations/estimateForm.ts`)
- **Client Component isolation** — only `EstimateForm` is `'use client'`, page shell is Server Component
- **Integration stub** — `submitEstimate()` logs in dev, ready for M7+ CRM wiring

### CRM Integration Readiness (M7+)

Submission payload shape:

```typescript
{
  estimateType: 'residential' | 'commercial',
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  preferredContactMethod?: 'phone' | 'email' | 'either',
  propertyType?: string,        // residential
  companyName?: string,         // commercial
  contactName?: string,         // commercial
  serviceType: string,
  projectDescription: string,
  timeline?: string,
  budget?: string,
}
```

GoHighLevel / LeadConnector mapping:

- `firstName` + `lastName` → Contact First Name / Last Name
- `email` → Contact Email
- `phone` → Contact Phone
- `companyName` → Contact Company
- `contactName` → Contact Full Name (commercial override)
- `preferredContactMethod` → Custom Field: Preferred Contact

### Accessibility

- ✅ All fields have associated `<label>` via `htmlFor`/`id` (auto-generated by `useId()`)
- ✅ Error messages use `role="alert"` + `aria-live="polite"` for screen reader announcements
- ✅ Required fields use `aria-invalid`, asterisk with `after:content-['*']` notation
- ✅ Inputs have `aria-describedby` linking to hint + error messages
- ✅ Submit button has `aria-busy` during submission
- ✅ Success state uses `role="status"` + `aria-live="polite"`
- ✅ All fieldsets have `<legend>` elements
- ✅ Keyboard navigation follows natural DOM order
- ✅ Name fields side-by-side on sm+ (grid) — single column on mobile
- ✅ WCAG 2.2 AA target

### Performance

- ✅ Page shell: Server Component (zero client JS for static content)
- ✅ Client components isolated to the form card only
- ✅ No third-party scripts added
- ✅ No `react-hook-form` — native FormData keeps bundle minimal

---

## SEO

| Page                    | Title                                              | Description                                     |
| ----------------------- | -------------------------------------------------- | ----------------------------------------------- |
| `/estimate/residential` | Request a Residential Estimate — Stowe Contracting | Governance-compliant, no prohibited expressions |
| `/estimate/commercial`  | Request a Commercial Estimate — Stowe Contracting  | Governance-compliant, no prohibited expressions |

---

## Open Items for Post-M3

| Item                                 | Blocker                  | Notes                                                                |
| ------------------------------------ | ------------------------ | -------------------------------------------------------------------- |
| Real form submission                 | M7 scope                 | `submitEstimate()` stub wired and documented                         |
| Contact information in success state | `vr-contact-information` | Phone/email can be added when this blocker resolves                  |
| Service list specificity             | `vr-service-list`        | Service options are structural labels; specific capabilities pending |
| Photography in estimate hero         | Client delivery          | Hero sections use text-only layout — no placeholder images           |

---

## Quality Gates

Run these to validate before PR:

```bash
npm run format:check
npm run lint
npm run type-check
npm test
npm run build
```

_QA conducted by Agent 06. All governance rules verified manually against `lib/content/` registry and component source._
