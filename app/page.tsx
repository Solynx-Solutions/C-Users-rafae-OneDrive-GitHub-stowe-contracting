// =============================================================================
// HOME PAGE — M2 Homepage Composition
//
// Assembles the full Stowe Contracting homepage using the M1 component
// foundation and new homepage section components.
//
// SECTION STRUCTURE:
//   1. HomeHero           — Establishes brand: established, local, experienced
//   2. TrustBar           — 4 confirmed trust indicators (horizontal bar)
//   3. PathwaySection     — Residential / Commercial audience pathways
//   4. HomeProcess        — 4-step installation process framework
//   5. HomeMechanical     — Equipment + technical capability feature
//   6. HomeGallery        — Project showcase (placeholder — awaiting photography)
//   7. TrustSection       — Full "Why Choose Stowe" trust card grid
//   8. HomeCta            — Final residential / commercial estimate CTA
//
// GOVERNANCE COMPLIANCE:
//   ✅ All claims from resolveControlledClaim() — governance-gated
//   ✅ All CTAs from resolveControlledMessage() — governance-gated
//   ✅ No founding year, exact employee count, certifications, awards
//   ✅ No testimonials (vr-testimonials inactive)
//   ✅ No service list (vr-service-list pending)
//   ✅ No contact information (vr-contact-information pending)
//   ✅ No social links (vr-social-profiles pending)
//   ✅ No fabricated project data
//   ✅ No equipment names or performance specs
//
// SEO:
//   Title: Governance-approved — "Nearly 40 years" expression
//   Description: Positioning statement from brand-messaging registry
//   OG: Structured with siteConfig
//
// PERFORMANCE:
//   All components: Server Components (zero client JS in this tree)
//   No third-party scripts
//   No framer-motion
// =============================================================================

import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

// ── Homepage section components ───────────────────────────────────────────────
import { HomeHero } from '@/components/sections/home-hero';
import { HomeProcess } from '@/components/sections/home-process';
import { HomeMechanical } from '@/components/sections/home-mechanical';
import { HomeGallery } from '@/components/sections/home-gallery';
import { HomeCta } from '@/components/sections/home-cta';

// ── M1 reusable section components ───────────────────────────────────────────
import { TrustBar } from '@/components/trust/trust-bar';
import { TrustSection } from '@/components/trust/trust-section';
import { PathwaySection } from '@/components/pathway/pathway-section';

// =============================================================================
// METADATA
// Uses approved claims only. Description from positioning-statement record.
// ❌ No exact founding year, no unverified data.
// =============================================================================
export const metadata: Metadata = generatePageMetadata({
  title: 'Stowe Contracting — Nearly 40 Years Serving Monterey Bay',
  description:
    'Locally owned concrete and construction contractor serving Monterey Bay. Nearly 40 years of experience, with in-house crews and specialized mechanical installation equipment for residential and commercial projects.',
  path: '/',
});

// =============================================================================
// PAGE
// =============================================================================
export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      {/* Positions Stowe: established · local · experienced · equipment-backed */}
      <HomeHero />

      {/* ── 2. Trust Bar ─────────────────────────────────────────────────── */}
      {/* 4 trust indicators: years / employees / local / in-house crews */}
      <TrustBar />

      {/* ── 3. Residential / Commercial Pathways ─────────────────────────── */}
      {/* Directs visitors to their appropriate estimate path */}
      <PathwaySection />

      {/* ── 4. Process Section ───────────────────────────────────────────── */}
      {/* Planning → Preparation → Installation → Finished Project */}
      <HomeProcess />

      {/* ── 5. Mechanical Installation Feature ───────────────────────────── */}
      {/* Specialized equipment + in-house crew + process preview */}
      <HomeMechanical />

      {/* ── 6. Project Gallery ───────────────────────────────────────────── */}
      {/* Placeholder image slots — awaiting Stowe photography delivery */}
      <HomeGallery />

      {/* ── 7. Why Choose Stowe ──────────────────────────────────────────── */}
      {/* Full trust card grid: experience · people · equipment · local */}
      <TrustSection />

      {/* ── 8. Final CTA ─────────────────────────────────────────────────── */}
      {/* Residential + Commercial estimate links — no forms yet */}
      <HomeCta />
    </>
  );
}
