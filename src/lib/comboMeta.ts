import { siteConfig } from "@/data/site";

// Search-result descriptions for city x service pages. The old text was "{City}, TX: {shortAnswer}",
// which truncated mid-sentence with "..." and never showed the number. Each hook names the problem the
// searcher has, gives the one step that matters now, and puts the call number inside the snippet.
const HOOKS: Record<string, (c: string, p: string) => string> = {
  "24-hour-emergency-plumber": (c, p) =>
    `Plumbing emergency in ${c} tonight? Call ${p} for a 24-hour plumber: leaks, burst pipes and backed-up drains, nights and weekends.`,
  "emergency-drain-cleaning": (c, p) =>
    `Drain backed up in ${c}, TX? Stop running water into it and call ${p} for emergency drain cleaning. What to ask before work starts.`,
  "main-sewer-line-clog": (c, p) =>
    `Several drains backing up at once in ${c}? That usually means the main sewer line. Call ${p} for a plumber, and what not to do meanwhile.`,
  "water-heater-emergency": (c, p) =>
    `Water heater leaking or no hot water in ${c}, TX? How to shut it off safely and what to tell the plumber. Call ${p}.`,
  "toilet-overflow-emergency": (c, p) =>
    `Toilet overflowing in ${c}? Turn the valve behind it clockwise to stop the water, then call ${p} for an emergency plumber.`,
  "burst-pipe-emergency": (c, p) =>
    `Burst pipe in ${c}, TX? Shut off the main water valve now, then call ${p} for emergency pipe repair. Steps to limit the water damage.`,
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
