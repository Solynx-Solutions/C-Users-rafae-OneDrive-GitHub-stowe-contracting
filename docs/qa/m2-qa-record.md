# M2 QA Record — Homepage Composition

**Milestone:** M2 — Homepage Composition  
**Branch:** `feature/m2-homepage-composition`  
**Date:** 2026-08-04  
**Agent:** 06 — Development Team  
**Status:** ✅ PASS — Ready for PR to `development`

---

## Build Verification

| Check              | Result  | Details                                  |
| ------------------ | ------- | ---------------------------------------- |
| TypeScript compile | ✅ PASS | `0 errors`                               |
| Next.js build      | ✅ PASS | `Compiled in 4.0s`                       |
| Static generation  | ✅ PASS | `/` renders as `○ (Static)`              |
| Route table        | ✅ PASS | `/ /_not-found /robots.txt /sitemap.xml` |

---

## Test Suite

**Runner:** Vitest v4.1.10  
**Result:** ✅ 113 tests, 11 files, 0 failures

| Test File                          | Tests | Result |
| ---------------------------------- | ----- | ------ |
| `can-publish.test.ts`              | 9     | ✅     |
| `chronology-policy.test.ts`        | 11    | ✅     |
| `sitemap.test.ts`                  | 11    | ✅     |
| `prohibited-claim.test.ts`         | 16    | ✅     |
| `m1-navigation.test.ts`            | 5     | ✅     |
| `m1-brand-messaging.test.ts`       | 7     | ✅     |
| `m1-mechanical-governance.test.ts` | 4     | ✅     |
| `schema.test.ts`                   | 28    | ✅     |
| `m2-homepage.test.ts`              | 12    | ✅     |
| `m1-trust-indicators.test.ts`      | 4     | ✅     |
| `m1-pathway-governance.test.ts`    | 6     | ✅     |

**Test 1:** Confirmed + active content renders ✅  
**Test 2:** Pending content resolves to null ✅  
**Test 3:** Generic CTA resolves ✅  
**Test 4:** Residential CTA resolves and is distinct ✅  
**Test 5:** Commercial CTA resolves and is distinct ✅  
**Test 6:** `years-in-business` claim resolves for hero heading ✅  
**Test 7:** Hero eyebrow claims resolve (locally-owned, monterey-bay-identity) ✅  
**Test 8:** No prohibited language in hero content ✅  
**Test 9:** Testimonials array is empty (gallery has no testimonials) ✅  
**Test 10:** Pending routes blocked from sitemap ✅  
**Test 11:** Residential and commercial estimate routes are distinct ✅  
**Test 12:** Schema omits all unverified fields (telephone, email, address, etc.) ✅

> **Note on stderr output:** `resolveControlledClaim()` and `resolveControlledMessage()` emit `console.warn` in non-production environments when a record is blocked or not found. This is expected behavior — it's the governance system confirming the blocks work. Not an error.

---

## Content Claims Checklist

### Chronology Policy

- [x] No `since 1987` in any file
- [x] No `40+ years` in any file
- [x] No `over 40 years` in any file
- [x] No `more than 40 years` in any file
- [x] No exact founding year in any file
- [x] Approved expression used: `Nearly 40 years` / `Nearly four decades`

### Prohibited Claims

- [x] No production rate claims
- [x] No installation speed comparisons
- [x] No labor or cost savings claims
- [x] No precision tolerance specs
- [x] No equipment names or model numbers
- [x] No certifications
- [x] No award claims
- [x] No warranty terms
- [x] No response-time guarantees
- [x] No safety statistics
- [x] No public works capability claims

### Contact / Identity Safety

- [x] No invented phone numbers
- [x] No invented email addresses
- [x] No invented physical address
- [x] No fictional client or project names

### Schema Safety

- [x] `telephone` omitted
- [x] `email` omitted
- [x] `address` omitted
- [x] `openingHoursSpecification` omitted
- [x] `areaServed` omitted
- [x] `foundingDate` omitted
- [x] `numberOfEmployees` omitted
- [x] `sameAs` omitted
- [x] `aggregateRating` omitted
- [x] `review` omitted

### Sitemap Safety

- [x] Only confirmed + active routes in sitemap (home only)
- [x] `/services`, `/projects`, `/blog` excluded (pending/inactive)
- [x] `/estimate/residential` and `/estimate/commercial` are distinct route records

### Navigation Safety

- [x] All rendered nav items from `getPublishableNavItems()`
- [x] No hardcoded nav links bypassing governance

### Testimonials

- [x] `data/testimonials.ts` array is empty
- [x] No testimonial content rendered anywhere

---

## Visual QA

**Environment:** Next.js dev server (`localhost:3000`)  
**Breakpoints tested:** Desktop (maximized), Mobile (~759px — browser environment minimum)

| Section           | Desktop                                        | Mobile Notes                |
| ----------------- | ---------------------------------------------- | --------------------------- |
| Header            | ✅ Sticky, correct brand, CTA button           | ✅ Hamburger menu renders   |
| 1. HomeHero       | ✅ Heading, tagline, 3 trust signals, 2 CTAs   | ✅ Stacks cleanly           |
| 2. TrustBar       | ✅ 4 indicators in 4-column grid, white bg     | ✅ 2-column grid on mobile  |
| 3. PathwaySection | ✅ Side-by-side cards                          | ✅ Stacks vertically        |
| 4. HomeProcess    | ✅ 4-column card grid, connector lines visible | ✅ 1-column stack           |
| 5. HomeMechanical | ✅ 2-column layout, technical callout visible  | ✅ Stacks cleanly           |
| 6. HomeGallery    | ✅ 6 placeholder slots, "Pending" badges       | ✅ 1-column stack           |
| 7. TrustSection   | ✅ "Built on Local Trust" 4-card grid          | ✅ Stacks cleanly           |
| 8. HomeCta        | ✅ Orange bg, two CTA buttons visible          | ✅ Buttons stack vertically |
| Footer            | ✅ Dark navy, brand, SOLYNX attribution        | ✅ Stacks correctly         |

**Mobile nav drawer:** ✅ Opens and closes correctly, contains nav items + CTA  
**Console errors:** None (hydration mismatch is a test environment artifact — class injected by agent tooling, not application code)

---

## Homepage Section Inventory

| #   | Component        | File                                      | Governance              |
| --- | ---------------- | ----------------------------------------- | ----------------------- |
| 1   | `HomeHero`       | `components/sections/home-hero.tsx`       | ✅ All claims gated     |
| 2   | `TrustBar`       | `components/trust/trust-bar.tsx`          | ✅ All claims gated     |
| 3   | `PathwaySection` | `components/pathway/pathway-section.tsx`  | ✅ All claims gated     |
| 4   | `HomeProcess`    | `components/sections/home-process.tsx`    | ✅ No prohibited claims |
| 5   | `HomeMechanical` | `components/sections/home-mechanical.tsx` | ✅ All claims gated     |
| 6   | `HomeGallery`    | `components/sections/home-gallery.tsx`    | ✅ No fabricated data   |
| 7   | `TrustSection`   | `components/trust/trust-section.tsx`      | ✅ All claims gated     |
| 8   | `HomeCta`        | `components/sections/home-cta.tsx`        | ✅ All claims gated     |

**Page assembly:** `app/page.tsx` — Server Component, zero client JS in this tree

---

## Performance Notes

- All 8 homepage sections are Server Components
- No `framer-motion` or third-party scripts in this render tree
- Homepage pre-renders as fully static at build time
- No blocking client-side data fetching

---

## Known Deferred Items (Not M2 blockers)

| Item                   | Blocker                             | Target Milestone            |
| ---------------------- | ----------------------------------- | --------------------------- |
| Hero photography       | Client photography delivery pending | Post-photography            |
| Contact info in footer | `vr-contact-information`            | After contact verification  |
| Social links           | `vr-social-profiles`                | After social verification   |
| Service nav items      | `vr-service-list`                   | M3+ (service pages)         |
| Testimonials           | `vr-testimonials`                   | Post-testimonial collection |

---

## Sign-off

- [x] Build clean (TypeScript + Next.js)
- [x] 113 tests passing, 0 failures
- [x] Content claims checklist complete
- [x] Visual QA complete (desktop + mobile)
- [x] All governance constraints respected
- [x] Ready for PR: `feature/m2-homepage-composition` → `development`
