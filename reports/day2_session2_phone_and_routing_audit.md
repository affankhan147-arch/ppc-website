# Day 2 Session 2 Phone and Routing Audit

## Phone Links

- Current public phone values remain +1XXXXXXXXXX in src/data/site.ts fallbacks and .env.example.
- CallButton still routes to /contact when the phone contains X.
- No fake tel link is emitted while the placeholder remains.
- Organization JSON-LD does not emit placeholder telephone.
- Owner must provide NEXT_PUBLIC_TRACKED_PHONE_DISPLAY and NEXT_PUBLIC_TRACKED_PHONE_E164 before live call routing can be verified.

## Call Events

- /api/call-event logs sanitized event context.
- requestDestination is contact-form-placeholder until a real phone is configured.
- Event endpoint does not collect name, full phone, address, or message text.

## Lead Routing

- /api/lead validates required fields and logs only safe context, phone last4, and message length.
- No approved CRM, webhook, or email destination is configured in repository.
- LEAD_NOTIFY_EMAIL and LEAD_WEBHOOK_URL remain blank placeholders in .env.example.

## Risk

No real leads are silently routed to an invalid phone number because CTAs route to /contact in placeholder mode. Form delivery remains a P1 owner-configuration risk because production storage/delivery is not approved yet.
