# Day 2 Session 2 Tracking Implementation

## Starting State

- Phase B starting build: pass.
- Phase A commit confirmed: a36c7dc.
- Working tree was clean before Phase B edits.

## Implemented Events

- Call buttons now emit explicit event names and context through /api/call-event.
- Header CTA uses header_call_click.
- Sticky mobile CTA uses sticky_call_click.
- Service pages use service_page_call.
- Problem pages use emergency_page_call.
- Cost guides use cost_page_call.
- City and city-service pages use city_page_call.
- Lead forms emit contact_form_start on first focus and contact_form_submit on submit.
- Footer partner link emits partner_route_click through a tracked client link.

## Parameters

The event endpoint accepts eventName, location, ctaLocation, pagePath, pageType, service, city, problem, and deviceContext. Parameters are trimmed and stripped of control characters. Form events do not transmit name, phone, message text, or other sensitive submitted fields.

## Privacy Notes

- No paid advertising IDs were added.
- No analytics account IDs were invented.
- No sensitive personal data is transmitted to /api/call-event.
- /api/lead still logs only redacted phone last4, message length, and routing context until an owner-approved destination exists.

## Production Limitation

Real analytics destinations, call-tracking vendor IDs, and lead-routing destinations require owner-provided configuration.
