export const phoneConfig = {
  did: "+1 844-397-8298",
  display: "1 844-397-8298",
  e164: "+18443978298",
  href: "tel:+18443978298"
} as const;

export const siteConfig = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "Plumbing Hands",
  serviceName: "Emergency Plumbing Help",
  legalName: process.env.NEXT_PUBLIC_BRAND_NAME || "Plumbing Hands",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://plumbinghands.com",
  marketName: process.env.NEXT_PUBLIC_PRIMARY_MARKET || "Dallas-Fort Worth",
  state: "Texas",
  primaryVertical: "Emergency plumbing and drain cleaning",
  phoneDisplay: phoneConfig.display,
  phoneE164: phoneConfig.e164,
  phoneHref: phoneConfig.href,
  fallbackPhoneDisplay: phoneConfig.display,
  fallbackPhoneE164: phoneConfig.e164,
  email: "partners@example.com",
  serviceStatement:
    "Plumbing Hands helps you connect with available plumbing professionals serving your area.",
  disclosure:
    "Plumbing Hands helps you connect with available plumbing professionals serving your area.",
  legalDisclosure:
    "Plumbing Hands is a provider-connection website for service-area requests. A city, service, or city-service page should not be read as a claim that Plumbing Hands maintains a staffed office, address, local license, guaranteed availability, or arrival-time promise in that location.",
  ownerSetupNote:
    "Set an owner-approved call tracking number before enabling phone-call routing."
};

export function hasConfiguredPhone(value: string = siteConfig.phoneE164) {
  return /^\+[1-9]\d{6,14}$/.test(value);
}

export const navigation = [
  { label: "Services", href: "/services/24-hour-emergency-plumber" },
  { label: "Cities", href: "/cities" },
  { label: "Costs", href: "/cost-guides/emergency-plumbing-cost-dfw" },
  { label: "Guides", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Partners", href: "/partner-with-us" },
  { label: "Contact", href: "/contact" }
];
