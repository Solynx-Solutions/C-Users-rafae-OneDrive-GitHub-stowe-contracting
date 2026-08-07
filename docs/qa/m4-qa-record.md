# M4 QA Record — Mechanical Installation Foundation

**Milestone:** M4 — Mechanical Installation Authority Page + Services Foundation  
**Branch:** `feature/m4-mechanical-installation`  
**Feature commit:** `71730d1`  
**Merge commit:** `55380b1`  
**Development HEAD:** `55380b1`  
**Merged into:** `development`  
**Merge strategy:** `--no-ff`  
**Review date:** 2026-08-07

---

## Pre-Merge Gates

| Gate | Result |
|------|--------|
| `npm run format:check` | ✅ All matched files use Prettier code style |
| `npm run lint` | ✅ No errors, no warnings |
| `npm run type-check` | ✅ TypeScript 0 errors |
| `npm test` | ✅ 141/141 tests, 13 test files |
| `npm run build` | ✅ 9 static routes, 0 errors |

---

## Route Status Review

| Route | Verification | Publication | Active in Nav | Active in Sitemap | Assessment |
|-------|-------------|-------------|---------------|-------------------|-----------|
| `/mechanical-installation` | confirmed | active | No (pending nav audit) | Yes | ✅ Correct — confirmed capability content |
| `/services` | confirmed | draft | No | No | ✅ Correct — page available, no unverified services exposed |

**Assessment:** Content publication controls enforced correctly.

- `/mechanical-installation` is active because the general mechanical equipment capability claim is confirmed via Priority-1 source (Adam Cox discovery interview). No equipment names, model numbers, or performance claims appear on the page.
- `/services` is confirmed + draft. The `ServiceGrid` renders an empty state — no service names or capabilities appear. The page will not enter the sitemap or navigation until `publicationStatus` is set to `active` and `vr-service-list` resolves.

---

## Governance Compliance — M4

### Confirmed Claims Used

| Claim Key | Canonical Text | Used In |
|-----------|---------------|---------|
| `mechanical-equipment` | Specialized mechanical installation equipment | Hero, Explainer, Showcase, Services page |
| `years-in-business` | Nearly 40 years serving Monterey Bay | Hero, CTA |
| `in-house-crews` | Experienced in-house crews | Hero, Showcase, Capability Split |
| `locally-owned` | Locally owned and operated | Hero, Services hero |
| `long-term-employees` | Long-term employee continuity | Showcase |
| `residential-capability` | Residential projects | Capability Split |
| `commercial-capability` | Commercial projects | Capability Split |
| `request-estimate` (residential) | Request a Residential Estimate | Multiple CTAs |
| `request-estimate` (commercial) | Request a Commercial Estimate | Multiple CTAs |

### Claims Blocked

| Claim | Status | Reason |
|-------|--------|--------|
| Equipment names / model numbers | Blocked | Pending vr-equipment-specifics |
| Production rates / sq ft per day | Prohibited | Never approved |
| Installation speed comparisons | Prohibited | Never approved |
| Precision tolerances | Prohibited | Never approved |
| Cost savings | Prohibited | Never approved |
| Labor savings | Prohibited | Never approved |
| Certifications / awards | Blocked | Not verified |
| Public works / government contracts | Blocked | Not verified |
| Client names / project totals | Blocked | Not verified |

---

## Content Created

### Pages

| File | Route | Status |
|------|-------|--------|
| `app/mechanical-installation/page.tsx` | `/mechanical-installation` | ✅ Active |
| `app/services/page.tsx` | `/services` | ✅ Draft (awaiting vr-service-list) |

### Section Components

| Component | Description |
|-----------|-------------|
| `components/sections/mechanical-hero.tsx` | Industrial cinematic hero — dark, dual CTAs |
| `components/sections/mechanical-explainer.tsx` | 4-point educational explainer — no performance claims |
| `components/sections/equipment-showcase.tsx` | 4-slot photography grid — intentional pending placeholders |
| `components/sections/capability-split.tsx` | Residential / Commercial two-panel section |
| `components/sections/cta-section.tsx` | Reusable interior page CTA section |

### Service Components

| Component | Description |
|-----------|-------------|
| `components/services/service-card.tsx` | Governance-gated service card — returns null when not active |
| `components/services/service-grid.tsx` | Grid of publishable services — empty state when none active |

### UI Components

| Component | Description |
|-----------|-------------|
| `components/ui/verification-badge.tsx` | Internal governance status badge |

### Content Models

| File | Description |
|------|-------------|
| `content/serviceRegistry.ts` | Service content model — 4 entries, all draft/pending |

---

## Service Registry State at M4

| Service Key | Verification | Publication | Audience | Notes |
|-------------|-------------|-------------|----------|-------|
| `mechanical-installation` | confirmed | draft | both | General capability confirmed; listing pending vr-service-list |
| `concrete-flatwork` | pending | draft | both | Pending vr-service-list |
| `foundations` | pending | draft | both | Pending vr-service-list |
| `site-work` | pending | draft | both | Pending vr-service-list |

**Zero services publicly visible.** ServiceGrid renders empty state.

---

## Tests

| File | Tests | Description |
|------|-------|-------------|
| `tests/content/m4-mechanical-services.test.ts` | 14 | M4 route, claim, and service registry governance |
| `tests/content/m1-navigation.test.ts` | Updated | Baseline extended to include `/mechanical-installation` |

**Total test suite: 141 tests, 13 files, all passing.**

---

## Build

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /estimate/commercial
├ ○ /estimate/residential
├ ○ /mechanical-installation   ← M4
├ ○ /robots.txt
├ ○ /services                  ← M4
└ ○ /sitemap.xml
```

All 9 static routes prerendering correctly. 0 errors. 0 warnings.

---

## Remaining Blockers

| Blocker | Blocks | Resolution |
|---------|--------|-----------|
| Client photography delivery | `EquipmentShowcase` (4 slots), About page crew photos | Client delivery |
| `vr-service-list` | `/services` activation, `ServiceGrid` population | Verify service capabilities with Adam Cox |
| `vr-contact-information` | `/contact` page, footer phone/address | Verify phone, email, address |
| `vr-equipment-specifics` | Equipment names on mechanical page | Verify specific equipment with Adam Cox |
| `vr-testimonials` | Social proof, review schema | Client review collection |
| `vr-social-profiles` | Footer links | Verify social handles |
| `vr-founding-year` | Schema `foundingDate`, "Since XXXX" copy | Document-level verification |

---

## Recommended Next Milestone

**M5 — About Page**

- No external blockers — all required claims are confirmed
- High trust conversion value for visitors evaluating contractors
- Company story (within chronology policy — no exact year)
- Crew and culture section using confirmed claims
- Local ownership narrative
- Employee continuity section
- Leadership/contact placeholder (pending photography)
- Reuses `CtaSection`, `CapabilitySplit` pattern
- Activates `route-about` to `confirmed + active`
