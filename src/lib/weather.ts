// Live DFW freeze-risk forecast, sourced directly from the National Weather
// Service's free public API (api.weather.gov, no key required, public-domain
// US government data). Grid point resolved once for Dallas (32.7767, -96.7970)
// -> NWS office FWD, grid 89,104 - hardcoded here since grid coordinates for a
// fixed lat/lon do not change, avoiding an extra points-lookup call per request.

const FORECAST_URL = "https://api.weather.gov/gridpoints/FWD/89,104/forecast";
const USER_AGENT = "(plumbinghands.com, contact@plumbinghands.com)";
const FREEZE_THRESHOLD_F = 32;

export type FreezeForecast = {
  label: string;
  value: string;
  variant: "danger" | "safe";
  isFreezeRisk: boolean;
  lowTemp: number | null;
  periodName: string;
  ok: boolean;
};

export async function getDfwFreezeForecast(): Promise<FreezeForecast> {
  try {
    const res = await fetch(FORECAST_URL, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/geo+json" },
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error(`NWS API returned ${res.status}`);

    const data = await res.json();
    const periods: Array<{ name: string; isDaytime: boolean; temperature: number }> =
      data?.properties?.periods ?? [];
    const nextNight = periods.find((p) => p.isDaytime === false) ?? periods[0];

    if (!nextNight || typeof nextNight.temperature !== "number") {
      throw new Error("No usable forecast period returned");
    }

    const lowTemp = nextNight.temperature;
    const isFreezeRisk = lowTemp <= FREEZE_THRESHOLD_F;

    return {
      label: "DFW Freeze Watch",
      value: isFreezeRisk
        ? `${nextNight.name}: ${lowTemp}F - Protect Your Pipes`
        : `${nextNight.name}: ${lowTemp}F - No Freeze Risk`,
      variant: isFreezeRisk ? "danger" : "safe",
      isFreezeRisk,
      lowTemp,
      periodName: nextNight.name,
      ok: true
    };
  } catch {
    return {
      label: "DFW Freeze Watch",
      value: "Forecast unavailable - check weather.gov",
      variant: "safe",
      isFreezeRisk: false,
      lowTemp: null,
      periodName: "",
      ok: false
    };
  }
}
