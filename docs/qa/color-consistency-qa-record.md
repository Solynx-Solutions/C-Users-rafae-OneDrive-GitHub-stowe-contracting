# Monterey Built Color Consistency QA

## Correlation

- Task: `tsk-44a7ef2d7384cc4d1726`
- Dispatch: `dsp-49620ed203817cd82a935af1`
- Attempt: `1`
- Base HEAD: `02dd03dbfc42f781c8e142f14bebdff5b3c1fed7`
- Branch: `development`

## Root cause and correction

- The estimate-page mobile eyebrow lettering and trust icons inherited the global burgundy `--color-brand-accent` token.
- The homepage `Signature capability` label hardcoded the same burgundy value.
- Active accent typography now uses Stowe blue. Light blue is used for legible accent lettering/icons on graphite backgrounds.
- Burgundy is isolated in `--color-brand-punctuation` and limited to a hero media edge, small division sequence numbers, and a very faint mechanical motif.
- The mobile navigation audit exposed a collapsed fixed drawer: the menu content existed but the drawer computed to the header height. Explicit viewport height and top/bottom positioning restore the full-height, scrollable drawer at narrow widths.

## Rendered audit

Audited `/`, `/services`, `/mechanical-installation`, `/about`, `/contact`, `/estimate/residential`, and `/estimate/commercial` at:

- Desktop: 1440 × 900
- Mobile: 390 × 844
- Narrow mobile: 320 × 700

All 21 route/viewport combinations returned 200, had no horizontal overflow, runtime errors, or error overlays. No prominent burgundy/red/copper text remains outside the approved small sequence-number punctuation.

## Automated validation

- Prettier: passed
- ESLint: passed
- TypeScript: passed
- Vitest: 245/245 passed
- Next.js production build: passed

## Screenshots

- `outputs/color-fix-home-desktop.png`
- `outputs/color-fix-home-mobile390.png`
- `outputs/color-fix-contact-mobile390.png`
- `outputs/color-fix-estimate-residential-mobile320.png`
- `outputs/color-fix-mobile-nav-390.png`
- `outputs/color-fix-mobile-nav-320.png`

## Jira

Atlassian search returned HTTP 403: `The app is not installed on this instance`. No Jira issue was fabricated.

## Production

No production deployment or production configuration action was performed.
