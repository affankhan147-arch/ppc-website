export type UtmPayload = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
};

export function parseUtm(searchParams: URLSearchParams): UtmPayload {
  return {
    source: searchParams.get("utm_source") || undefined,
    medium: searchParams.get("utm_medium") || undefined,
    campaign: searchParams.get("utm_campaign") || undefined,
    term: searchParams.get("utm_term") || undefined,
    content: searchParams.get("utm_content") || undefined
  };
}
