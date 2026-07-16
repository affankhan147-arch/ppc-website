# PlumbingHands Premium Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform PlumbingHands into a premium, engaging, mobile-first emergency plumbing website that earns trust without inventing business claims.

**Architecture:** Preserve the existing Next.js routes, content data, call tracking, disclosures, SEO, and lead-routing behavior. Build a reusable visual system in global CSS and shared components, then restructure the homepage around urgent needs, transparent process, service coverage, helpful guidance, and verified limitations.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Lucide icons, local optimized raster assets.

## Global Constraints

- Preserve every public URL, canonical, approved DID `+1 844-397-8298`, tracking behavior, and security control.
- Do not invent employees, testimonials, reviews, licenses, insurance, guarantees, response times, office locations, or business history.
- Generated people are illustrative and must not be described as PlumbingHands staff or customers.
- Keep phone actions prominent and accessible on mobile.
- Avoid new runtime dependencies and remote image hosts.

---

### Task 1: Asset and design contracts

**Files:**
- Create: `public/images/photography/home-emergency-plumber.png`
- Create: `public/images/photography/plumbing-diagnostic.png`
- Create: `public/images/photography/homeowner-consultation.png`
- Create: `tests/premium-redesign.test.mjs`

- [ ] Add the three approved generated images under stable project paths.
- [ ] Add a source-level contract test for the hero, image disclosure, premium navigation, trust/process section, and mobile CTA.
- [ ] Run `node --test tests/premium-redesign.test.mjs` and confirm it fails before implementation.

### Task 2: Shared visual system

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/CallButton.tsx`
- Modify: `src/components/LeadForm.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] Introduce premium typography, warmer neutrals, deeper navy, controlled orange, elevated surfaces, focus states, and subtle motion.
- [ ] Upgrade header branding, navigation affordances, CTA styling, call process, and footer hierarchy without changing behavior.
- [ ] Run the focused test, TypeScript, lint, and routing tests.

### Task 3: Homepage storytelling

**Files:**
- Modify: `src/app/page.tsx`

- [ ] Replace the abstract hero with the approved wide photograph and strong readable overlay.
- [ ] Reorder the homepage into urgent problem selection, process, service coverage, transparency, guidance, and closing CTA.
- [ ] Use the diagnostic and consultation images with explicit illustrative-image wording.
- [ ] Preserve honest provider-connection wording and every existing route target.

### Task 4: Verification and publication

**Files:**
- Test: `tests/premium-redesign.test.mjs`
- Test: existing project test suites

- [ ] Run focused tests, `npm run typecheck`, `npm run lint`, routing/status tests, production build, and production phone-render tests.
- [ ] Review the diff for unsupported trust claims, accessibility regressions, mobile overflow, route changes, and image misuse.
- [ ] Publish by pull request, merge only when checks pass, and verify the homepage plus representative internal pages on production.
