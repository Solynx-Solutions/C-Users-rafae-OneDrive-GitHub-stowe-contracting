# Technical Architecture Decisions

> Document technical decisions made during this project. Follow the ADR (Architecture Decision Record) format.

---

## ADR-001: Next.js App Router (vs Pages Router)

**Date:** 2026-07-20
**Status:** Accepted

**Context:** Choosing between Next.js App Router and Pages Router.

**Decision:** App Router with React Server Components as the default.

**Rationale:**

- Server Components minimize client-side JavaScript — critical for Lighthouse scores
- Route groups (`(marketing)`, `(legal)`) allow clean URL structure without affecting paths
- `generateMetadata()` provides per-page SEO control without prop drilling
- Vercel is optimized for App Router deployments

**Consequences:**

- All components are Server Components by default; `'use client'` added only when necessary
- Data fetching happens in Server Components or server actions

---

## ADR-002: Tailwind CSS v4 (vs v3)

**Date:** 2026-07-20
**Status:** Accepted

**Context:** Tailwind CSS v4 introduces a new CSS-first configuration system.

**Decision:** Use Tailwind CSS v4 with `@theme` design tokens in `app/globals.css`.

**Rationale:**

- CSS-first configuration is more portable and maintainable
- `@theme` tokens integrate natively with CSS variables — no JavaScript config required for colors
- Design tokens can be consumed by non-Tailwind CSS as needed

**Consequences:**

- Design tokens defined in `globals.css` using `@theme` block
- Old `tailwind.config.js` patterns (colors in JS object) are deprecated
- Team must learn the new `@theme` syntax

---

## ADR-003: Zod for Form Validation

**Date:** 2026-07-20
**Status:** Accepted

**Context:** Need type-safe form validation for contact and estimate forms.

**Decision:** Use Zod with React Hook Form via `@hookform/resolvers`.

**Rationale:**

- Single schema definition shared by frontend validation and API route validation
- TypeScript types auto-derived from schema — no duplication
- Excellent DX — readable validation errors

**Consequences:**

- All form schemas live in `lib/validations/`
- API routes validate incoming data with the same schema as the form

---

## ADR-004: MDX for Content Pages

**Date:** 2026-07-20
**Status:** Accepted

**Context:** Blog posts and service page content may need to be updated by non-developers.

**Decision:** Use `next-mdx-remote` for MDX content rendering from `content/` directory.

**Rationale:**

- Content editors can write Markdown without touching JSX
- MDX supports embedding React components in content
- Files live in the repository — no external CMS required at this stage
- Can migrate to a headless CMS (Contentful, Sanity) later without changing frontend components

**Consequences:**

- Content files live in `content/blog/`, `content/services/`, `content/projects/`
- Dynamic routes use `generateStaticParams()` to pre-render all content pages

---

## ADR-005: JSON-LD Schema via lib/schema.ts

**Date:** 2026-07-20
**Status:** Accepted

**Context:** Structured data needed for Google rich results.

**Decision:** Centralized schema generators in `lib/schema.ts`, injected via `<script>` tags.

**Rationale:**

- Type-safe schema generation — no raw JSON strings in components
- Single place to update schema when business info changes
- `siteConfig.ts` is the single source of truth, consumed by schema generators

**Consequences:**

- Root layout injects LocalBusiness, Organization, WebSite schemas on every page
- Service pages inject Service + BreadcrumbList schemas
- Blog posts inject Article schema

---

## ADR-006: SOLYNX Integration Isolation Pattern

**Date:** 2026-07-20
**Status:** Accepted

**Context:** 10 SOLYNX platform integrations need to be reserved without implementing them.

**Decision:** Create placeholder files in `components/integrations/` and `lib/` with `// RESERVED` comments. No logic implemented until each milestone is formally scoped.

**Rationale:**

- Prevents scope creep
- Makes the integration points explicit in the codebase
- Enables future agents to quickly locate where to implement each feature

**Consequences:**

- `components/integrations/` contains placeholder files that return `null`
- Environment variables for all integrations exist in `.env.example` with empty values
