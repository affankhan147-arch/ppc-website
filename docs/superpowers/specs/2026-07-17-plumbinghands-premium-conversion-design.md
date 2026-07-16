# Plumbing Hands Premium Conversion Design

## Goal

Turn the existing truthful SEO foundation into a premium, phone-first emergency plumbing experience that earns trust quickly and moves urgent visitors toward the approved DID without weakening existing SEO coverage.

## Approved direction

The project owner has asked for the current 60–65% foundation to be made into a finished premium website. Earlier project approval permits visual and conversion improvements without repeated design approval, provided completed work, truthful claims, routing, the approved DID, URLs, security controls, and provider-connection disclosures are preserved.

## Experience architecture

The homepage will use a focused emergency journey:

1. Identify the problem and see the phone number immediately.
2. Receive concise safety-first guidance.
3. Understand what happens during the call.
4. Choose the relevant service or city path.
5. Review factual trust signals, pricing guidance, and FAQs.
6. Call from a persistent mobile action or the final conversion panel.

Detailed city, problem, service, and cost content remains on dedicated pages so the homepage supports SEO without behaving like an oversized directory.

## Visual system

- Deep navy foundation with cyan highlights and restrained orange conversion accents.
- Larger type hierarchy, generous spacing, softer rounded corners, layered shadows, subtle grid texture, and premium glass panels.
- Existing abstract plumbing artwork remains decorative; no fake staff, truck, office, testimonial, rating, or licensed-provider imagery is introduced.
- Cards use consistent icon, headline, explanation, and action patterns.
- Mobile layouts prioritize the call action and avoid dense multi-column content.

## Conversion components

### Header

- Persistent premium header with a compact emergency-status line.
- Approved DID visible in the primary desktop call action.
- Clear navigation without competing partner-oriented emphasis.

### Hero

- Keep the indexable H1: `Emergency Plumbing Help Across Dallas-Fort Worth`.
- Add a stronger urgent value proposition and visible DID.
- Present factual assurance chips: safety-first guidance, DFW request routing, and direct provider confirmation.
- Use a premium call panel that explains the three-step phone process.

### Urgent issue routing

- Four issue cards link to the closest relevant service pages rather than sending every visitor to the FAQ.
- Each card includes one immediate safe action and one clear next step.

### Trust and process

- Explain the provider-connection model positively and once, rather than repeating defensive disclaimers.
- Show only verifiable platform facts: DFW coverage structure, service paths, safety guidance, cost-factor education, and provider details confirmed before work.
- Do not claim screening, guaranteed arrival, fixed price, license, insurance, ratings, reviews, or office locations without evidence.

### Homepage content hierarchy

The homepage will contain:

- premium hero and call panel;
- urgent issue selector;
- factual trust/proof strip;
- featured emergency services;
- three-step call process;
- selected DFW locations;
- selected cost guidance;
- concise FAQ;
- final call panel.

Long lists remain discoverable through hub links instead of being fully expanded on the homepage.

## Shared surfaces

- `CallButton` keeps analytics and telephone routing while receiving premium styling.
- `StickyCallBar` shows the DID and a short urgency cue on mobile.
- `Footer` becomes a stronger brand and trust close with concise disclosure and phone CTA.
- Global CSS gains reusable premium surfaces, gradients, motion-safe hover states, and improved typography.

## Accessibility and performance

- Preserve semantic headings and keyboard-visible focus states.
- Decorative images use empty alt text; informative copy remains HTML.
- Avoid animation that blocks interaction or requires JavaScript.
- Use existing Next.js, Tailwind, Lucide, and local SVG assets only; add no dependency.

## SEO and compliance invariants

- Preserve all existing public URLs, canonical behavior, metadata helpers, schema, and internal data sources.
- Preserve `+1 844-397-8298`, `tel:+18443978298`, call-event tracking attributes, and mobile call routing.
- Keep the exact homepage H1 needed by existing rendered-phone verification.
- Preserve provider-connection truthfulness and avoid unsupported local-business claims.
- Do not merge to `master` or deploy without explicit owner approval.

## Verification

Required checks:

- `npm run test:routing`
- `npm run test:status`
- `npm run build`
- `npm run test:production-pages`
- `npm test`

Rendered homepage verification must confirm the approved DID in header, hero, mobile sticky action, final CTA, and footer, plus the new premium process and trust sections.
