import { cityServiceHeroImages } from "./cityServiceImages";

export const serviceHeroImages: Record<string, string> = {
  "24-hour-emergency-plumber": "/images/services/service-24hr-emergency-plumber.jpg",
  "emergency-drain-cleaning": "/images/services/service-emergency-drain-cleaning.jpg",
  "main-sewer-line-clog": "/images/services/service-main-sewer-line-clog.jpg",
  "toilet-overflow-emergency": "/images/services/service-toilet-overflow-emergency.jpg",
  "burst-pipe-emergency": "/images/services/service-burst-pipe-emergency.jpg",
  "water-heater-emergency": "/images/services/service-water-heater-emergency.jpg",
  "sewer-backup-help": "/images/photography/sewer-inspection.webp",
  "commercial-emergency-plumbing": "/images/photography/provider-crew.webp",
  "same-day-plumber-connection": "/images/photography/service-van.webp",
  "sink-and-shower-drain-backup": "/images/photography/plumbing-diagnostic.jpg"
};

const fallbackPhotos = [
  "/images/photography/drain-cleaning.webp",
  "/images/photography/sewer-inspection.webp",
  "/images/photography/toilet-repair.webp",
  "/images/photography/water-heater-inspection.webp",
  "/images/photography/provider-crew.webp",
  "/images/photography/service-van.webp",
  "/images/photography/homeowner-consultation.jpg"
];

export function getArticleImage(serviceSlug: string | undefined, seedIndex: number) {
  if (serviceSlug && serviceHeroImages[serviceSlug]) {
    return serviceHeroImages[serviceSlug];
  }
  const safeIndex = ((seedIndex % fallbackPhotos.length) + fallbackPhotos.length) % fallbackPhotos.length;
  return fallbackPhotos[safeIndex];
}

export function getGridImage(index: number) {
  const safeIndex = ((index % fallbackPhotos.length) + fallbackPhotos.length) % fallbackPhotos.length;
  return fallbackPhotos[safeIndex];
}

// Returns a unique, real photograph for a specific city+service combination when one has been
// sourced (see src/lib/cityServiceImages.ts, generated from scripts/image-manifest.csv). Falls
// back to the service-level or rotation image for any combination not yet covered.
export function getCityServiceImage(citySlug: string | undefined, serviceSlug: string | undefined, seedIndex: number) {
  if (citySlug && serviceSlug && cityServiceHeroImages[serviceSlug]?.[citySlug]) {
    return cityServiceHeroImages[serviceSlug][citySlug];
  }
  return getArticleImage(serviceSlug, seedIndex);
}
