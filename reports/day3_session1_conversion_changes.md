# Day 3 Session 1 Conversion Changes

## Changes

- Added stronger event context to call clicks and form events already present in CallButton and LeadForm.
- Strengthened lead qualification wording around city, service, urgency, active water/wastewater, and provider-confirmed pricing.
- Preserved fallback to /contact while the phone number remains a placeholder.

## Conversion Hypotheses

- Visitors with urgent symptoms will submit more complete requests when the page asks for practical details instead of broad marketing language.
- Price-focused users will be better qualified when cost pages explain dispatch, diagnostic, access, and scope questions before the CTA.
- Failed shutoff and sewer pages should route higher-intent calls because they describe urgency boundaries directly.

## 2026-07-16 PowerShell Revalidation

This section supersedes the earlier placeholder-phone and customer-form statements.

- Production DID +1 844-397-8298 is active.
- tel:+18443978298 is active on customer-facing routes.
- Customer request forms and customer form events were removed.
- The approved How your call works section is the customer conversion path.
- CallButton retains call-event tracking through /api/call-event.
- Homepage, contact, service, cost, and problem routes retain call CTAs.
- Production call counts and qualified-call outcomes remain NOT AVAILABLE.
