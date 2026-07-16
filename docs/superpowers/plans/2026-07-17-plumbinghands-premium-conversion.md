# Plumbing Hands Premium Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, phone-first homepage and shared conversion shell while preserving Plumbing Hands SEO, routing, truthfulness, URLs, and the approved DID.

**Architecture:** Keep the existing Next.js App Router and data-driven service/city models. Redesign the homepage composition in `src/app/page.tsx`, then improve shared conversion components and global CSS without adding dependencies or changing backend routing.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide React, existing local SVG assets.

## Global Constraints

- Preserve `+1 844-397-8298` and `tel:+18443978298`.
- Preserve `data-cta-location` and call-event tracking behavior.
- Preserve the homepage H1 `Emergency Plumbing Help Across Dallas-Fort Worth`.
- Preserve provider-connection truthfulness and avoid unsupported licenses, ratings, reviews, guarantees, offices, response times, prices, or screening claims.
- Preserve existing URLs, schema, metadata helpers, routing, security controls, and unrelated branch changes.
- Do not add dependencies, merge to `master`, create a pull request, or deploy.

---

### Task 1: Extend rendered homepage contract

**Files:**
- Modify: `tests/production-rendered-phone.test.mjs`

**Interfaces:**
- Consumes: production HTML emitted by `next build`.
- Produces: assertions for the premium homepage markers and the existing DID contract.

- [ ] Add assertions that home HTML includes `Speak With a Plumbing Coordinator Now`, `What Happens After You Call`, and `Why Homeowners Use Plumbing Hands`.
- [ ] Retain existing checks for header, mobile sticky bar, footer, visible DID, and telephone URI.
- [ ] Run `npm run build && npm run test:production-pages`; before implementation the new marker assertions must fail or the red-gate exception must be documented if the execution environment cannot run Node.

### Task 2: Rebuild the homepage journey

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `featuredServices`, `cities`, `costGuides`, `problems`, `siteConfig`, `CallButton`, `LeadForm`, `FAQBlock`, and schema helpers.
- Produces: the premium homepage HTML and internal-link journey.

- [ ] Replace the long directory-style sequence with a focused hero, urgent issue selector, factual trust section, featured services, call process, selected city routes, selected cost guides, FAQs, and final CTA.
- [ ] Point urgent issue cards to real service URLs: `/services/burst-pipe-emergency`, `/services/emergency-drain-cleaning`, `/services/main-sewer-line-clog`, and `/services/water-heater-emergency`.
- [ ] Keep the exact homepage H1 and existing metadata/schema.
- [ ] Show the DID in visible hero and final conversion copy through `CallButton` and `siteConfig.phoneDisplay`.

### Task 3: Upgrade shared conversion components

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/CallButton.tsx`
- Modify: `src/components/LeadForm.tsx`
- Modify: `src/components/StickyCallBar.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- `CallButton` retains its existing props and analytics attributes.
- `LeadForm` retains `pageUrl`, `service`, and `city` props so existing pages remain compatible.

- [ ] Make header branding and emergency phone action visually dominant while keeping navigation concise.
- [ ] Restyle `CallButton` without changing href selection, analytics URL construction, or event attributes.
- [ ] Convert `LeadForm` into a premium call-intake panel with three concise steps and a prominent DID.
- [ ] Make the mobile sticky action display an urgency cue and full-width call control.
- [ ] Simplify the footer disclosure and reinforce the call path without adding unsupported claims.

### Task 4: Introduce the premium visual system

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces reusable CSS classes used by the homepage and shared shell.

- [ ] Add premium navy/cyan/orange variables, layered hero backgrounds, glass panels, trust strips, rounded card surfaces, stronger shadows, and motion-safe hover states.
- [ ] Improve font stack, spacing, focus-visible treatment, and mobile bottom padding.
- [ ] Preserve existing utility classes used by other pages and do not remove form-focus styles.

### Task 5: Verify and report

**Files:**
- Create: `reports/premium_conversion_homepage_20260717.md`

**Interfaces:**
- Consumes: final diff, verification output, and branch state.
- Produces: exact evidence for the project owner and future workers.

- [ ] Run `npm run test:routing`.
- [ ] Run `npm run test:status`.
- [ ] Run `npm run build`.
- [ ] Run `npm run test:production-pages`.
- [ ] Run `npm test`.
- [ ] Record exact results, files changed, DID checks, truthfulness checks, unresolved risks, and ending commit.
- [ ] Confirm only scoped website files, the premium test, design/plan docs, and report changed; preserve the unrelated Antigravity continuity modification.
