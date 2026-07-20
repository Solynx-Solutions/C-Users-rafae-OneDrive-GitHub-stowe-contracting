# Stowe Contracting Website

> Production website for Stowe Contracting — built by [SOLYNX](https://solynx.solutions).

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/[org]/stowe-contracting.git
cd stowe-contracting

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in .env.local values (never commit this file)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Tech Stack

| Layer      | Technology                            |
| ---------- | ------------------------------------- |
| Framework  | Next.js 16 (App Router)               |
| Language   | TypeScript 5 (strict mode)            |
| Styling    | Tailwind CSS 4                        |
| Animations | Framer Motion                         |
| Forms      | React Hook Form + Zod                 |
| Icons      | Lucide React                          |
| Content    | Next MDX Remote                       |
| Sitemap    | next-sitemap                          |
| Hosting    | Vercel                                |
| Analytics  | Google Analytics 4 (configured at M8) |

---

## Folder Structure

```
stowe-contracting/
├── app/               # Next.js App Router pages and layouts
│   ├── (marketing)/   # Public-facing pages (no URL impact)
│   ├── (legal)/       # Legal pages
│   └── api/           # API routes (forms, webhooks)
├── components/
│   ├── ui/            # Atomic base components
│   ├── layout/        # Header, Footer, Navigation
│   ├── sections/      # Page-section components
│   └── integrations/  # SOLYNX integration placeholders
├── content/           # MDX content (blog, services, projects)
├── data/              # Static data and siteConfig
├── docs/              # Project documentation
├── hooks/             # Custom React hooks
├── lib/               # Utilities, schema generators, validators
├── public/            # Static assets
├── scripts/           # Build and utility scripts
├── styles/            # Design tokens
└── types/             # Global TypeScript types
```

---

## Environment Setup

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

**Required at launch:**

- `NEXT_PUBLIC_SITE_URL` — Production URL
- `NEXT_PUBLIC_PHONE` — Client phone number
- `NEXT_PUBLIC_EMAIL` — Client email

See `.env.example` for the full list of current and reserved variables.

---

## Development Workflow

### Scripts

```bash
npm run dev          # Start local dev server (http://localhost:3000)
npm run build        # Production build + sitemap generation
npm run start        # Serve production build locally
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format all files with Prettier
npm run format:check # Check formatting without writing
npm run type-check   # TypeScript type check (no emit)
npm run analyze      # Bundle size analysis
```

### Branch Strategy

```
main                  ← Production (Vercel production deployment)
  └── development     ← Staging (Vercel preview deployment)
        └── feature/* ← Feature branches (Vercel preview per PR)
```

**Workflow:**

1. Branch from `development`: `git checkout -b feature/[description]`
2. Develop and commit with conventional commits
3. Open PR to `development` — CI must pass
4. Merge to `development` after review
5. Open Release PR from `development` → `main` for milestones
6. Tag release after merge: `git tag v[version]`

---

## Deployment

Deployed automatically on Vercel:

| Branch        | Environment       | URL                          |
| ------------- | ----------------- | ---------------------------- |
| `main`        | Production        | https://stowecontracting.com |
| `development` | Preview (staging) | Auto-generated               |
| `feature/*`   | Preview (per-PR)  | Auto-generated               |

### Manual deployment

```bash
# Deploy to production (via Vercel CLI)
vercel --prod
```

---

## Performance Targets

| Metric                   | Target  |
| ------------------------ | ------- |
| Lighthouse Performance   | ≥ 95    |
| Lighthouse Accessibility | ≥ 95    |
| Lighthouse SEO           | 100     |
| LCP                      | < 2.5s  |
| INP                      | < 200ms |
| CLS                      | < 0.1   |

---

## Integration Roadmap

The following SOLYNX integrations are reserved in the codebase and will be activated at future milestones:

| Integration            | Status   | Milestone |
| ---------------------- | -------- | --------- |
| Contact Form + Email   | Planned  | M7        |
| Google Analytics 4     | Planned  | M8        |
| AI Chat Widget         | Reserved | M11+      |
| Estimate Form          | Reserved | M11+      |
| Appointment Scheduling | Reserved | M11+      |
| AI Phone               | Reserved | M12+      |
| Missed Call Text Back  | Reserved | M12+      |
| Review System          | Reserved | M13+      |
| Knowledge Base         | Reserved | M14+      |
| Marketing Automation   | Reserved | M15+      |

---

## Contributing

This project is built and maintained by SOLYNX. For questions or issues, contact the development team.

---

## License

Proprietary — All rights reserved. © Stowe Contracting / SOLYNX.
