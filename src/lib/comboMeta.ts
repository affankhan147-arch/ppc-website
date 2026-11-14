import { siteConfig } from "@/data/site";

// Search-result descriptions for city x service pages. The old text was "{City}, TX: {shortAnswer}",
// which truncated mid-sentence with "..." and never showed the number. Each hook names the problem the
// searcher has, gives the one step that matters now, and puts the call number inside the snippet.
// Keyword overhaul (2026-11-15): 5 hooks now open with the "<service> in <city>, TX" phrase people search
// (GSC: "burst pipe repair plano tx", "garland tx drain cleaning", "broken sewer line in garland", "24 hour plumber <city>").
const HOOKS: Record<string, (c: string, p: string) => string> = {
  "24-hour-emergency-plumber": (c, p) =>
    `24 hour plumber in ${c}, TX: call ${p} tonight for leaks, burst pipes and backed-up drains, nights, weekends and holidays.`,
  "emergency-drain-cleaning": (c, p) =>
    `Drain cleaning in ${c}, TX, day or night. Drain backed up? Stop running water into it and call ${p} for emergency drain cleaning.`,
  "main-sewer-line-clog": (c, p) =>
    `Broken or clogged sewer line in ${c}, TX? Several drains backing up at once usually means the main line. Call ${p} for sewer line help.`,
  "water-heater-emergency": (c, p) =>
    `Water heater repair in ${c}, TX: leaking tank or no hot water? Shut it off safely, then call ${p} for emergency water heater repair.`,
  "toilet-overflow-emergency": (c, p) =>
    `Toilet overflowing in ${c}? Turn the valve behind it clockwise to stop the water, then call ${p} for an emergency plumber.`,
  "burst-pipe-emergency": (c, p) =>
    `Burst pipe repair in ${c}, TX: shut off the main water valve now, then call ${p} for emergency pipe repair, day or night.`,
  "sewer-backup-help": (c, p) =>
    `Sewage backing up in ${c}, TX? Stop using water, keep away from the wet area, and call ${p} to reach an emergency plumber.`,
  "commercial-emergency-plumbing": (c, p) =>
    `Plumbing emergency at your ${c} business? Call ${p} for commercial emergency plumbing: kitchen drains, restroom backups, broken lines.`,
  "same-day-plumber-connection": (c, p) =>
    `Need a plumber today in ${c}, TX? Call ${p} to be connected with an available local plumber, and what to have ready when you call.`,
  "sink-and-shower-drain-backup": (c, p) =>
    `Sink or shower backing up in ${c}, TX? What it means when more than one drain is slow, and a local plumber at ${p}.`
};

export function comboDescription(serviceSlug: string, cityName: string, fallback: string): string {
  const hook = HOOKS[serviceSlug];
  return hook ? hook(cityName, siteConfig.phoneDisplay) : fallback;
}
