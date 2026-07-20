# Content Claims QA Checklist

> Use this checklist before merging any PR that touches content-facing files.
> Required by CODEOWNERS for `/content/` and `/lib/content/` paths.

---

## Chronology Policy

- [ ] No occurrence of `Since 1987` in any file (visible or hidden)
- [ ] No occurrence of `40+ years` in any file
- [ ] No occurrence of `Over 40 years` in any file
- [ ] No occurrence of `More than 40 years` in any file
- [ ] No exact founding year in any file
- [ ] Approved expressions used: `Nearly 40 years`, `Nearly four decades`

**Verify with:**
```bash
grep -ri "since 1987" . --include="*.ts" --include="*.tsx" --include="*.md" --exclude-dir=node_modules
grep -ri "40+ years" . --include="*.ts" --include="*.tsx" --exclude-dir=node_modules
grep -ri "over 40 years" . --include="*.ts" --include="*.tsx" --exclude-dir=node_modules
```

---

## Prohibited Claims

- [ ] No production rate claims (`sq ft per day`, `production rate`)
- [ ] No installation speed comparisons (`% faster`)
- [ ] No labor or cost savings claims
- [ ] No precision tolerance specs (`±`)
- [ ] No equipment names or model numbers
- [ ] No specific certifications
- [ ] No award or recognition claims
- [ ] No warranty terms (`year warranty`, `year guarantee`)
- [ ] No public works capability claims
- [ ] No response-time guarantees (`within 24 hours`)
- [ ] No safety statistics (`zero incidents`, `safety record`)

---

## Contact / Identity Safety

- [ ] No invented phone numbers
- [ ] No invented email addresses
- [ ] No invented physical address
- [ ] No invented business hours
- [ ] `legalName` field in schema/config is empty until verified
- [ ] No fictional client names (e.g., "Acme Corp")
- [ ] No fictional project locations (e.g., "Denver, CO")

---

## Schema Safety

- [ ] `telephone` omitted from LocalBusiness and Organization schema
- [ ] `email` omitted from schema
- [ ] `address` omitted from schema
- [ ] `openingHoursSpecification` omitted from schema
- [ ] `areaServed` omitted from schema (service areas unverified)
- [ ] `foundingDate` omitted from schema
- [ ] `numberOfEmployees` omitted from schema (exact total unverified)
- [ ] `sameAs` omitted from schema (social links unverified)
- [ ] No `aggregateRating` or `review` in schema (testimonials inactive)

---

## Sitemap Safety

- [ ] Sitemap only includes `confirmed + active` routes
- [ ] No pending or inactive routes appear in sitemap output
- [ ] Residential `/estimate/residential` and commercial `/estimate/commercial` are distinct routes
- [ ] No service-specific URLs in sitemap (services pending)

---

## Navigation Safety

- [ ] All rendered nav items sourced from `getPublishableNavItems()` or `isPublishable()` filter
- [ ] No hardcoded nav links that bypass the governance registry

---

## Testimonials

- [ ] `data/testimonials.ts` array is empty
- [ ] No testimonial content rendered anywhere on the site
- [ ] Review system not activated

---

## Content Governance Tests

Run `npm test` and confirm all 12 governance tests pass:

- [ ] Confirmed + active content renders
- [ ] Confirmed + inactive content does not render
- [ ] Pending content does not render
- [ ] Rejected content never renders
- [ ] "Nearly 40 years" accepted by chronology policy
- [ ] "Since 1987" rejected by chronology policy
- [ ] "40+ years" rejected by chronology policy
- [ ] Exact employee count cannot replace "30+"
- [ ] Unsupported mechanical-performance language rejected
- [ ] Pending routes do not enter sitemap
- [ ] Residential and commercial estimate routes are distinct
- [ ] Metadata and schema reject disallowed claims
