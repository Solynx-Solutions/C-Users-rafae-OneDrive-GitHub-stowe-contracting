# Brand Messaging Integration — Architecture Update

**Date:** 2026-07-20
**Milestone:** M0.1 — Content-Safety Remediation
**Author:** Agent 06 — Development Team

---

## Summary

This document records the architectural changes introduced in M0.1 to enforce the Stowe Contracting content-governance architecture across the entire codebase.

---

## Two-Axis Status System

All content records now carry two independent status fields:

| Field | Values |
|---|---|
| `verificationStatus` | `confirmed` \| `pending` \| `rejected` \| `deprecated` |
| `publicationStatus` | `active` \| `draft` \| `inactive` \| `internal-only` |

**Public render rule:** Content may only appear in public output when **both** conditions are met:
```
verificationStatus === "confirmed" AND publicationStatus === "active"
```

This rule is enforced by `lib/content/can-publish.ts` → `canPublish()`.

---

## Architecture Components

### `lib/content/` — Enforcement Layer

| File | Responsibility |
|---|---|
| `types.ts` | All governance types and interfaces |
| `can-publish.ts` | `canPublish()` — the single render gate |
| `chronology-policy.ts` | Blocks founding year expressions |
| `prohibited-claim-policy.ts` | Blocks all categorically prohibited claims |
| `validate-content-context.ts` | Runs all policy checks on a text string |
| `resolve-controlled-claim.ts` | Returns claim text only if publishable |
| `resolve-controlled-message.ts` | Returns CTA text only if publishable |
| `registry.ts` | Central store of all records |
| `index.ts` | Public API barrel |

### `content/` — Record Layer

| File | Contents |
|---|---|
| `sources.ts` | All route records (sitemap + navigation source) |
| `company-profile.ts` | Confirmed claims from Adam Cox discovery interview |
| `brand-messaging.ts` | Approved tagline and positioning statement |
| `calls-to-action.ts` | Three approved estimate CTAs |
| `trust-indicators.ts` | Confirmed trust-signal claim keys |
| `value-propositions.ts` | Confirmed value-prop claim keys |
| `team-messaging.ts` | Confirmed crew/workforce claim keys |
| `company-culture.ts` | Confirmed culture claim keys |
| `local-ownership.ts` | Confirmed local identity claim keys |
| `residential-positioning.ts` | Residential market claim keys + pending |
| `commercial-positioning.ts` | Commercial market claim keys + pending |
| `mechanical-installation-messaging.ts` | Equipment messaging — general only |
| `prohibited-claims.ts` | Complete prohibited claim catalogue |
| `verification-required.ts` | All information blockers with required actions |
| `index.ts` | Public API barrel |

---

## Chronology Policy

| Expression | Status |
|---|---|
| `Nearly 40 years` | ✅ Approved |
| `Nearly four decades` | ✅ Approved |
| `Serving Monterey Bay for nearly 40 years` | ✅ Approved |
| `Since 1987` | ❌ Blocked |
| `40+ years` | ❌ Blocked |
| `Over 40 years` | ❌ Blocked |
| `More than 40 years` | ❌ Blocked |
| Any exact founding year | ❌ Blocked |

---

## Confirmed Claims (from Adam Cox Discovery Interview)

- Nearly 40 years serving Monterey Bay
- Locally owned and operated
- 30+ employees (exact total pending)
- Experienced in-house crews
- Long-term employee continuity
- Customers know who performs their installation
- Specialized mechanical installation equipment
- Residential capability
- Commercial capability
- Monterey Bay local identity
- Local workforce
- Local accountability
- Established workforce and operational foundation

---

## Source Priority

| Priority | Source |
|---|---|
| 1 (highest) | Adam Cox discovery interview |
| 2 | Approved Agent 03 Brand Messaging Guide |
| 3 | Approved Agent 07 Visual Design System |
| 4 | Existing Stowe website content (verified only) |

A lower-priority source may never override a higher-priority source.

---

## Schema Safety Changes

All unverified fields removed from `lib/schema.ts` output:

| Field | Status |
|---|---|
| `telephone` | Omitted — pending `vr-contact-information` |
| `email` | Omitted — pending `vr-contact-information` |
| `address` | Omitted — pending `vr-contact-information` |
| `legalName` | Omitted — pending `vr-legal-entity-name` |
| `openingHoursSpecification` | Omitted — pending `vr-business-hours` |
| `areaServed` | Omitted — pending `vr-service-areas` |
| `foundingDate` | Omitted — CHRONOLOGY POLICY blocks exact year |
| `numberOfEmployees` | Omitted — exact total pending |
| `sameAs` | Omitted — pending `vr-social-profiles` |

---

## Sitemap Changes

- Removed: `next-sitemap` package and `next-sitemap.config.js`
- Removed: `next build && next-sitemap` postbuild script
- Added: `app/sitemap.ts` — Next.js App Router native, queries route registry
- Added: `app/robots.ts` — Next.js App Router native
- Sitemap now only emits URLs for `confirmed + active` routes
- Currently emits: `/` (home only — only confirmed+active route at M0.1)

---

## Dependency Changes

### Removed (no current approved use)
- `framer-motion`
- `next-mdx-remote`
- `@next/third-parties`
- `react-hook-form`
- `@hookform/resolvers`
- `next-sitemap`

### Retained
- `zod` — form validation (future use)
- `clsx` + `tailwind-merge` — className utilities
- `lucide-react` — icon system

### Added (dev)
- `vitest` — test runner
- `@vitejs/plugin-react` — React support for vitest
- `vite` — vitest peer dependency

---

## Information Blockers (Current)

See `content/verification-required.ts` for the full list. Critical items:

| Blocker | Impact |
|---|---|
| `vr-contact-information` | No phone/email/address in schema, footer, or 404 |
| `vr-founding-year` | No exact year — "Nearly 40 years" expression only |
| `vr-service-list` | No service pages, no service nav items |
| `vr-legal-entity-name` | No legalName in schema |
| `vr-business-hours` | No hours in schema |
| `vr-social-profiles` | No social links |
| `vr-testimonials` | No testimonials |
