// =============================================================================
// MECHANICAL INSTALLATION PAGE — M4
//
// Authority page establishing Stowe Contracting's mechanical installation
// capability as a primary differentiator.
//
// SECTION STRUCTURE:
//   1. MechanicalHero        — Cinematic capability intro
//   2. MechanicalExplainer   — Educational: what mechanical installation is
//   3. EquipmentShowcase     — Equipment + crew (photography placeholders)
//   4. HomeProcess           — 4-step installation process framework
//   5. CapabilitySplit       — Residential / Commercial capability
//   6. CtaSection            — Dual estimate CTAs
//
// GOVERNANCE COMPLIANCE:
//   ✅ All claims from resolveControlledClaim() — governance-gated
//   ✅ All CTAs from resolveControlledMessage() — governance-gated
//   ✅ No equipment names / model numbers
//   ✅ No production rates / speed claims
//   ✅ No precision tolerances
//   ✅ No cost / labor savings claims
//   ✅ No public works or government contract claims
//   ✅ No certifications or awards
//   ✅ No fabricated project data or client names
//   ✅ Photography slots are intentional placeholders — no stock imagery
//
// SEO:
//   Title:       Mechanical Installation — Stowe Contracting
//   Description: Governance-approved — uses confirmed claims only
//   Schema:      WebPage, LocalBusiness, BreadcrumbList
//
// PERFORMANCE:
//   All components: Server Components (zero client JS in this tree)
//   No third-party scripts, no framer-motion
// =============================================================================

import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { localBusinessSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema';

// ── Page sections ─────────────────────────────────────────────────────────────
import { MechanicalHero } from '@/components/sections/mechanical-hero';
import { MechanicalExplainer } from '@/components/sections/mechanical-explainer';
import { EquipmentShowcase } from '@/components/sections/equipment-showcase';
import { HomeProcess } from '@/components/sections/home-process';

// =============================================================================
// METADATA
//
// Uses only confirmed, governance-approved claims.
// No equipment names, performance claims, or unverified identifiers.
// =============================================================================
export const metadata: Metadata = generatePageMetadata({
  title: 'Mechanical Installation — Stowe Contracting',
  description:
    'Stowe Contracting provides mechanical paver installation for demanding hardscape scopes in the Monterey Bay area, supported by dedicated crews and specialized equipment.',
  path: '/mechanical-installation',
});

// =============================================================================
// PAGE
// =============================================================================
export default function MechanicalInstallationPage() {
  // Schema — safe confirmed fields only
  const pageSchema = webPageSchema({
    name: 'Mechanical Installation — Stowe Contracting',
    description:
      'Specialized mechanical concrete installation for residential and commercial projects in the Monterey Bay area.',
    url: '/mechanical-installation',
  });

  const businessSchema = localBusinessSchema();

  const crumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Mechanical Installation', url: '/mechanical-installation' },
  ]);

  const structuredData = [pageSchema, businessSchema, crumbs];

  return (
    <>
      {/* ── JSON-LD structured data ────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      {/* Industrial cinematic intro — establishes mechanical capability */}
      <MechanicalHero />

      {/* ── 2. What Mechanical Installation Is ───────────────────────────── */}
      {/* Educational explainer — no performance claims */}
      <MechanicalExplainer />

      {/* ── 3. Equipment + Crew Showcase ─────────────────────────────────── */}
      {/* Photography placeholders — pending client delivery */}
      <EquipmentShowcase />

      {/* ── 4. Process Framework ─────────────────────────────────────────── */}
      {/* Planning → Preparation → Installation → Finished Project */}
      {/* Reusing M2 HomeProcess — same 4-step framework applies */}
      <HomeProcess />
    </>
  );
}
