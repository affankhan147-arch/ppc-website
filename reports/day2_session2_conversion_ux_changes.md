# Day 2 Session 2 Conversion UX Changes

- LeadForm now submits with client-side fetch instead of sending the visitor to a raw JSON response.
- LeadForm shows success or error state inline with aria-live.
- Submit button is disabled during submission and labels the active state.
- contact_form_start is emitted on first form focus.
- contact_form_submit is emitted on submit attempt.
- CallButton now exposes data-call-event-name, data-cta-location, and data-phone-mode attributes.
- Placeholder phone mode remains explicit: CTA destination is /contact until an owner-approved phone exists.
- Header, sticky mobile, service, city, problem, and cost CTAs now get distinct event names.
- Footer partner link now tracks partner_route_click.

No pressure tactics, false scarcity, guaranteed availability, fake employment, or fake credential claims were added.
