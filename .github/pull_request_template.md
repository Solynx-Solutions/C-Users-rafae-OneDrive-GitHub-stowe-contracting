## Summary

<!-- Briefly describe what this PR does and why -->

## Type

- [ ] Feature
- [ ] Fix
- [ ] Chore / refactor
- [ ] Docs
- [ ] Content update

## Content Governance Checklist

> Required for any PR that adds, modifies, or removes content-facing code.

- [ ] No hardcoded claim text — all claims use `resolveControlledClaim(claimKey)`
- [ ] No hardcoded CTA text — all CTAs use `resolveControlledMessage(messageKey)`
- [ ] No blocked chronology expressions (`Since 1987`, `40+ years`, `Over 40 years`, exact founding year)
- [ ] No prohibited claims (production rates, tolerances, warranties, certifications, named clients, testimonials)
- [ ] No invented contact details (phone, email, address, hours)
- [ ] All new routes registered in `content/sources.ts` with correct verificationStatus and publicationStatus
- [ ] Schema output contains no unverified fields
- [ ] `npm test` passes — all 12 governance tests green

## Technical Checklist

- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes — zero errors, zero warnings
- [ ] `npm run format:check` passes
- [ ] `npm run build` passes
- [ ] No `console.log` statements in new code (use `console.warn` / `console.error` only)
- [ ] New UI components use `cn()` from `@/lib/utils` for classNames
- [ ] No `any` TypeScript types introduced

## Screenshots

<!-- Required for UI changes. Attach before/after screenshots or a Loom recording. -->

## Related Issues / Milestones

<!-- Link to the relevant milestone or issue -->
