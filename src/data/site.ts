export const siteConfig = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "Plumbing Hands",
  serviceName: "Emergency Plumbing Help",
  legalName: process.env.NEXT_PUBLIC_BRAND_NAME || "Plumbing Hands",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://plumbinghands.com",
  marketName: process.env.NEXT_PUBLIC_PRIMARY_MARKET || "Dallas-Fort Worth",
  state: "Texas",
  primaryVertical: "Emergency plumbing and drain cleaning",
  phoneDisplay: process.env.NEXT_PUBLIC_TRACKED_PHONE_DISPLAY || "+1XXXXXXXXXX",
  phoneE164: process.env.NEXT_PUBLIC_TRACKED_PHONE_E164 || process.env.NEXT_PUBLIC_TRACKED_PHONE || "+1XXXXXXXXXX",
  fallbackPhoneDisplay: process.env.NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY || "+1XXXXXXXXXX",
  fallbackPhoneE164: process.env.NEXT_PUBLIC_FALLBACK_PHONE_E164 || process.env.NEXT_PUBLIC_TRACKED_PHONE || "+1XXXXXXXXXX",
  email: "partners@example.com",
  disclosure:
    "Plumbing Hands helps connect visitors with available plumbing service providers or partners where coverage is available. We do not claim a physical office in every city listed.",
  ownerSetupNote:
    "Replace sample tracking numbers with an owner-approved call tracking number before public launch."
};

export const navigation = [
  { label: "Services", href: "/services/24-hour-emergency-plumber" },
  { label: "Cities", href: "/cities/dallas" },
  { label: "Costs", href: "/cost-guides/emergency-plumbing-cost-dfw" },
  { label: "FAQ", href: "/faq" },
  { label: "Partners", href: "/partner-with-us" },
  { label: "Contact", href: "/contact" }
];
