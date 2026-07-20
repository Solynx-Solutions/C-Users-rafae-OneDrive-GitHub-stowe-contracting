// =============================================================================
// PROJECTS DATA
//
// All project records are INACTIVE until:
//   1. Real project details and photography are provided by the client
//   2. Each project is verified against a Priority-1 source
//   3. Client name, location, and project description are confirmed
//   4. Each is registered as a confirmed + active GovernedContent record
//
// Do NOT add fictional, invented, or sample projects (e.g., "Acme Corp",
// "Denver, CO" — these are prohibited as invented realistic examples).
// See content/verification-required.ts
// See content/prohibited-claims.ts: specificProjectFacts, namedClients
// =============================================================================

import { type ProjectItem } from '@/types';

/**
 * All project records.
 * Currently empty — no project data has been verified.
 */
export const projects: ProjectItem[] = [];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(count = 6): ProjectItem[] {
  return projects.filter((p) => p.featured).slice(0, count);
}
