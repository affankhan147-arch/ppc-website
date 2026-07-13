# Owner Configuration Required

## Phone Values

- Current placeholder: +1XXXXXXXXXX
- File or environment location: src/data/site.ts fallbacks; .env.example NEXT_PUBLIC_TRACKED_PHONE, NEXT_PUBLIC_TRACKED_PHONE_DISPLAY, NEXT_PUBLIC_TRACKED_PHONE_E164, NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY, NEXT_PUBLIC_FALLBACK_PHONE_E164
- Publicly visible: No live tel link while placeholder remains; visible CTA falls back to /contact.
- Approved replacement required: Owner-approved tracked display number and E.164 tel value.
- Expected format: Display value such as +1 214 555 0100 or owner-preferred formatting; E.164 value such as +12145550100.
- Safe fallback: /contact CTA path while phone contains X.
- Risk if unresolved: Phone-call conversion cannot be verified; real calls cannot be attributed.

## Lead Routing

- Current placeholder: /api/lead validates and logs redacted placeholder service_request events only.
- File or environment location: src/app/api/lead/route.ts; .env.example LEAD_NOTIFY_EMAIL and LEAD_WEBHOOK_URL.
- Required production value: Owner-approved CRM, webhook, secure email workflow, or lead storage destination.
- Expected format: HTTPS webhook URL or approved destination configured in hosting environment, not committed to Git.
- Risk if unresolved: Form submissions are not delivered to a production buyer or CRM.

## Analytics and Call Events

- Current event configuration: /api/call-event logs call_click_event with location and optional page/city/service parameters; CallButton currently sends location only.
- Required owner account or ID: NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_CLARITY_ID, Google Search Console token, Bing token, and any call tracking vendor IDs.
- Manual verification required: Verify event receipt, call attribution, lead delivery, privacy behavior, and no PII leakage before launch traffic.

## Exact Owner Actions

1. Provide the approved call tracking display number and E.164 number.
2. Add the phone values to hosting environment variables.
3. Provide the approved lead destination: CRM, webhook, or email workflow.
4. Add lead destination secrets only to hosting environment variables.
5. Provide GA4, GTM, Clarity, Google Search Console, and Bing verification values if those tools are approved.
6. Verify the hosted CTA, form, call-event, and lead-delivery paths end to end.
7. Provide documentary proof before any license, insurance, review, local-office, exact-price, response-time, or guarantee claim is added.

Do not expose secrets.
