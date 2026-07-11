export const siteConfig = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "Plumbing Hands",
  platformName: "PPC Lead Generation Platform",
  legalName: process.env.NEXT_PUBLIC_BRAND_NAME || "Plumbing Hands",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://plumbinghands.com",
  marketName: process.env.NEXT_PUBLIC_PRIMARY_MARKET || "Dallas-Fort Worth",
  state: "Texas",
  primaryVertical: "Emergency plumbing and drain cleaning",
  phoneDisplay: process.env.NEXT_PUBLIC_TRACKED_PHONE_DISPLAY || "(469) 555-0188",
  phoneE164: process.env.NEXT_PUBLIC_TRACKED_PHONE_E164 || process.env.NEXT_PUBLIC_TRACKED_PHONE || "+14695550188",
  fallbackPhoneDisplay: process.env.NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY || "(469) 555-0188",
  fallbackPhoneE164: process.env.NEXT_PUBLIC_FALLBACK_PHONE_E164 || process.env.NEXT_PUBLIC_TRACKED_PHONE || "+14695550188",
  email: "partners@example.com",
  disclosure:
    "This website connects users with local emergency plumbing providers. It is not a government agency, utility company, emergency service, or licensed plumbing company unless specifically stated with proof.",
  ownerSetupNote:
    "Replace sample tracking numbers with an owner-approved call tracking number before public launch."
};

export const navigation = [
  { label: "Services", href: "/services/24-hour-emergency-plumber" },
  { label: "Cities", href: "/cities/dallas" },
  { label: "Costs", href: "/cost-guides/emergency-plumbing-cost-dallas" },
  { label: "FAQ", href: "/faq" },
  { label: "Partners", href: "/partner-with-us" },
  { label: "Contact", href: "/contact" }
];
