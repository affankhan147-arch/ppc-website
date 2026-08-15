import { getDfwFreezeForecast } from "@/lib/weather";
import { buildLabelValueBadgeSvg } from "@/lib/badge";

export async function GET() {
  const forecast = await getDfwFreezeForecast();
  const svg = buildLabelValueBadgeSvg(forecast.label, forecast.value, forecast.variant);

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      // Shorter cache than the static badges since this reflects a live
      // forecast - refreshes roughly hourly, never serves data older than 6h.
      "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=21600"
    }
  });
}
