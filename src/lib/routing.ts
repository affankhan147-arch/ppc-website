import { Buyer, buyers } from "@/data/buyers";
import { hasConfiguredPhone, siteConfig } from "@/data/site";

type MatchInput = {
  marketSlug: string;
  serviceSlug: string;
};

export function matchBuyer({ marketSlug, serviceSlug }: MatchInput): Buyer | null {
  const eligible = buyers
    .filter((buyer) => buyer.status !== "paused")
    .filter((buyer) => buyer.markets.includes(marketSlug))
    .filter((buyer) => buyer.services.includes(serviceSlug))
    .filter((buyer) => buyer.daily_cap > 0)
    .sort((a, b) => b.payout - a.payout);

  return eligible[0] || null;
}

export function getRoutingNumber(input: MatchInput) {
  const buyer = matchBuyer(input);
  if (buyer?.fallback_number && hasConfiguredPhone(buyer.fallback_number)) return buyer.fallback_number;
  return hasConfiguredPhone(siteConfig.fallbackPhoneE164) ? siteConfig.fallbackPhoneE164 : "";
}

export function normalizePhoneForTel(phone: string) {
  if (hasConfiguredPhone(phone)) return phone;
  return hasConfiguredPhone(siteConfig.phoneE164) ? siteConfig.phoneE164 : "";
}
