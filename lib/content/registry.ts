// =============================================================================
// CONTENT REGISTRY
//
// Central registration point for all governed content records.
// The registry is populated by importing all content modules.
// Resolvers and the sitemap query this registry.
//
// Add new records in the appropriate content/ module, then ensure that
// module's records are imported here.
// =============================================================================

import { type ClaimRecord, type ControlledMessageRecord, type RouteRecord } from './types';

// ── Import all content modules ────────────────────────────────────────────────
import { companyClaims } from '@/content/company-profile';
import { ctaMessages } from '@/content/calls-to-action';
import { brandMessages } from '@/content/brand-messaging';
import { siteRoutes } from '@/content/sources';

// ── Claims Registry ───────────────────────────────────────────────────────────
/**
 * All ClaimRecord entries from all content modules.
 * Used by resolveControlledClaim().
 */
export const claimsRegistry: ClaimRecord[] = [...companyClaims];

// ── Messages Registry ─────────────────────────────────────────────────────────
/**
 * All ControlledMessageRecord entries from all content modules.
 * Used by resolveControlledMessage().
 */
export const messagesRegistry: ControlledMessageRecord[] = [...ctaMessages, ...brandMessages];

// ── Routes Registry ───────────────────────────────────────────────────────────
/**
 * All RouteRecord entries.
 * Used by app/sitemap.ts and navigation filtering.
 */
export const routesRegistry: RouteRecord[] = [...siteRoutes];
