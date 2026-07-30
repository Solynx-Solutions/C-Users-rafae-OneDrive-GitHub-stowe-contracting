// =============================================================================
// COMPONENTS — Root Public API Barrel
// Import from @/components/[subdirectory] for specific component groups,
// or from @/components for common layout/UI components.
// =============================================================================

// Re-export layout components for convenience
export {
  SiteHeader,
  SiteFooter,
  SkipLink,
  PageContainer,
  ContentSection,
  SectionHeading,
  MainContent,
  Breadcrumbs,
} from './layout';
export type { BreadcrumbItem } from './layout';

// Re-export brand components for convenience
export { HeaderBrand, FooterBrand, StoweWordmark, BrandMark } from './brand';

// Re-export content governance components for convenience
export { ControlledMessageText, VerifiedClaim, ControlledContentBoundary } from './content';

// Re-export trust components for convenience
export { TrustBar, TrustSection, TrustSignalCard, TrustIndicatorItem } from './trust';

// Re-export pathway components for convenience
export { PathwayCard, PathwaySection } from './pathway';

// Re-export mechanical components for convenience
export { MechanicalInstallationSection } from './mechanical';
