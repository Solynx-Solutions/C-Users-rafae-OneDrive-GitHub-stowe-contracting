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
  DesktopNavigation,
} from './layout';
export type { BreadcrumbItem } from './layout';

// Re-export brand components for convenience
export { HeaderBrand, FooterBrand, StoweWordmark, BrandMark } from './brand';

// Re-export content governance components for convenience
export { ControlledMessageText, VerifiedClaim, ControlledContentBoundary } from './content';

// Re-export UI components for convenience
export { Button, TextLink, Card, Badge, Divider, VisuallyHidden, IconButton } from './ui';

// Re-export trust components for convenience
export {
  TrustBar,
  TrustSection,
  TrustSignalCard,
  TrustIndicatorItem,
  LocalOwnershipCallout,
  CrewAccountabilityPanel,
  EmployeeContinuityPanel,
  WhyChooseStowe,
} from './trust';

// Re-export pathway components for convenience
export {
  PathwayCard,
  PathwaySection,
  ResidentialPathwayCard,
  CommercialPathwayCard,
  AudiencePathwaySection,
} from './pathway';

// Re-export mechanical components for convenience
export {
  MechanicalInstallationSection,
  MechanicalInstallationIntro,
  EquipmentProcessPreview,
  TechnicalCapabilityCallout,
} from './mechanical';
