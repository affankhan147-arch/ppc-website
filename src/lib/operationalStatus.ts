type Environment = Record<string, string | undefined>;

type SurfaceStatus = "configured" | "owner-action-required" | "invalid";

function hasConfiguredValue(value: string | undefined) {
  return Boolean(value?.trim());
}

function isHttpsUrl(value: string | undefined) {
  if (!hasConfiguredValue(value)) return false;
  try {
    return new URL(value as string).protocol === "https:";
  } catch {
    return false;
  }
}

function deliveryStatus(value: string | undefined): SurfaceStatus {
  if (!hasConfiguredValue(value)) return "owner-action-required";
  return isHttpsUrl(value) ? "configured" : "invalid";
}

function phoneStatus(env: Environment) {
  const phone = env.NEXT_PUBLIC_TRACKED_PHONE_E164 || env.NEXT_PUBLIC_TRACKED_PHONE || "";
  return phone.trim() && !phone.includes("X") ? "tel" : "contact-form-placeholder";
}

function siteBase(env: Environment) {
  return (env.NEXT_PUBLIC_SITE_URL || "https://plumbinghands.com").replace(/\/+$/, "");
}

export function getOperationalStatus(env: Environment = process.env) {
  const site = siteBase(env);

  return {
    site,
    delivery: {
      customerLead: {
        status: deliveryStatus(env.LEAD_WEBHOOK_URL)
      },
      partnerApplication: {
        status: deliveryStatus(env.PARTNER_WEBHOOK_URL)
      }
    },
    phoneCta: {
      status: phoneStatus(env)
    },
    analytics: {
      eventCollection: "server-log-enabled",
      ga4Configured: hasConfiguredValue(env.NEXT_PUBLIC_GA4_ID),
      gtmConfigured: hasConfiguredValue(env.NEXT_PUBLIC_GTM_ID),
      clarityConfigured: hasConfiguredValue(env.NEXT_PUBLIC_CLARITY_ID)
    },
    indexing: {
      robotsPolicy: "allow",
      sitemapUrl: `${site}/sitemap.xml`,
      googleVerificationConfigured: hasConfiguredValue(env.NEXT_PUBLIC_SEARCH_CONSOLE_TOKEN || env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
      bingVerificationConfigured: hasConfiguredValue(env.NEXT_PUBLIC_BING_WEBMASTER_TOKEN || env.NEXT_PUBLIC_BING_VERIFICATION),
      indexNowKeyConfigured: hasConfiguredValue(env.INDEXNOW_KEY)
    },
    monitoring: {
      healthEndpoint: "/api/health",
      cacheMode: "no-store"
    }
  };
}
