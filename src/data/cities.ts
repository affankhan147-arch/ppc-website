export type City = {
  slug: string;
  name: string;
  marketSlug: string;
  countyHint: string;
  areaHint: string;
  priority: number;
};

export const cities: City[] = [
  { slug: "dallas", name: "Dallas", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", areaHint: "central Dallas, Oak Cliff, Lake Highlands, and nearby Dallas neighborhoods", priority: 1 },
  { slug: "fort-worth", name: "Fort Worth", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", areaHint: "central Fort Worth, west Fort Worth, and nearby Tarrant County communities", priority: 1 },
  { slug: "arlington", name: "Arlington", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", areaHint: "Arlington neighborhoods between Dallas and Fort Worth", priority: 1 },
  { slug: "plano", name: "Plano", marketSlug: "dallas-fort-worth", countyHint: "Collin County", areaHint: "Plano homes, apartments, and commercial areas", priority: 1 },
  { slug: "irving", name: "Irving", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", areaHint: "Irving, Las Colinas, and nearby Dallas County areas", priority: 1 },
  { slug: "garland", name: "Garland", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", areaHint: "Garland neighborhoods and nearby northeast Dallas areas", priority: 1 },
  { slug: "frisco", name: "Frisco", marketSlug: "dallas-fort-worth", countyHint: "Collin and Denton counties", areaHint: "Frisco subdivisions, apartments, and commercial corridors", priority: 1 },
  { slug: "mckinney", name: "McKinney", marketSlug: "dallas-fort-worth", countyHint: "Collin County", areaHint: "McKinney neighborhoods and nearby Collin County communities", priority: 1 },
  { slug: "denton", name: "Denton", marketSlug: "dallas-fort-worth", countyHint: "Denton County", areaHint: "Denton homes, student housing, and surrounding Denton County areas", priority: 2 },
  { slug: "lewisville", name: "Lewisville", marketSlug: "dallas-fort-worth", countyHint: "Denton County", areaHint: "Lewisville, lake-area neighborhoods, and nearby Denton County communities", priority: 2 },
  { slug: "carrollton", name: "Carrollton", marketSlug: "dallas-fort-worth", countyHint: "Dallas, Denton, and Collin counties", areaHint: "Carrollton neighborhoods near Dallas, Denton, and Collin county lines", priority: 2 },
  { slug: "richardson", name: "Richardson", marketSlug: "dallas-fort-worth", countyHint: "Dallas and Collin counties", areaHint: "Richardson homes and business corridors north of Dallas", priority: 2 },
  { slug: "grand-prairie", name: "Grand Prairie", marketSlug: "dallas-fort-worth", countyHint: "Dallas, Tarrant, and Ellis counties", areaHint: "Grand Prairie neighborhoods between Dallas and Arlington", priority: 2 },
  { slug: "mesquite", name: "Mesquite", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", areaHint: "Mesquite and nearby east Dallas County communities", priority: 2 },
  { slug: "grapevine", name: "Grapevine", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", areaHint: "Grapevine homes, lake-area properties, and business areas", priority: 2 },
  { slug: "euless", name: "Euless", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", areaHint: "Euless and mid-cities neighborhoods", priority: 2 },
  { slug: "bedford", name: "Bedford", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", areaHint: "Bedford and nearby HEB mid-cities areas", priority: 2 },
  { slug: "hurst", name: "Hurst", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", areaHint: "Hurst and surrounding mid-cities neighborhoods", priority: 2 },
  { slug: "keller", name: "Keller", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", areaHint: "Keller neighborhoods and north Tarrant County homes", priority: 2 },
  { slug: "southlake", name: "Southlake", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", areaHint: "Southlake homes and nearby northeast Tarrant County areas", priority: 2 },
  { slug: "flower-mound", name: "Flower Mound", marketSlug: "dallas-fort-worth", countyHint: "Denton and Tarrant counties", areaHint: "Flower Mound neighborhoods and lake-area properties", priority: 2 },
  { slug: "the-colony", name: "The Colony", marketSlug: "dallas-fort-worth", countyHint: "Denton County", areaHint: "The Colony, lake-area neighborhoods, and nearby Denton County communities", priority: 2 },
  { slug: "allen", name: "Allen", marketSlug: "dallas-fort-worth", countyHint: "Collin County", areaHint: "Allen neighborhoods and nearby Collin County areas", priority: 2 },
  { slug: "rockwall", name: "Rockwall", marketSlug: "dallas-fort-worth", countyHint: "Rockwall County", areaHint: "Rockwall and Lake Ray Hubbard area homes", priority: 2 },
  { slug: "rowlett", name: "Rowlett", marketSlug: "dallas-fort-worth", countyHint: "Dallas and Rockwall counties", areaHint: "Rowlett neighborhoods near Lake Ray Hubbard", priority: 2 },
  { slug: "mansfield", name: "Mansfield", marketSlug: "dallas-fort-worth", countyHint: "Tarrant, Johnson, and Ellis counties", areaHint: "Mansfield homes and south Tarrant County communities", priority: 2 },
  { slug: "cedar-hill", name: "Cedar Hill", marketSlug: "dallas-fort-worth", countyHint: "Dallas and Ellis counties", areaHint: "Cedar Hill and southwest Dallas County neighborhoods", priority: 2 },
  { slug: "desoto", name: "DeSoto", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", areaHint: "DeSoto and nearby Best Southwest communities", priority: 2 },
  { slug: "duncanville", name: "Duncanville", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", areaHint: "Duncanville and southwest Dallas County areas", priority: 2 },
  { slug: "wylie", name: "Wylie", marketSlug: "dallas-fort-worth", countyHint: "Collin, Dallas, and Rockwall counties", areaHint: "Wylie and nearby northeast DFW communities", priority: 2 }
];

export const futureCities: City[] = [
];

export const priorityCityServiceCombos = [
  { citySlug: "dallas", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "dallas", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "fort-worth", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "fort-worth", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "arlington", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "arlington", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "plano", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "plano", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "irving", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "irving", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "garland", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "garland", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "frisco", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "frisco", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "mckinney", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "mckinney", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "denton", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "denton", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "lewisville", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "lewisville", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "carrollton", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "carrollton", serviceSlug: "emergency-drain-cleaning" },
  { citySlug: "richardson", serviceSlug: "24-hour-emergency-plumber" },
  { citySlug: "richardson", serviceSlug: "emergency-drain-cleaning" }
];

export function isPriorityCityService(citySlug: string, serviceSlug: string) {
  return priorityCityServiceCombos.some((combo) => combo.citySlug === citySlug && combo.serviceSlug === serviceSlug);
}

export function getPriorityServiceSlugsForCity(citySlug: string) {
  return priorityCityServiceCombos.filter((combo) => combo.citySlug === citySlug).map((combo) => combo.serviceSlug);
}

export function getNearbyCities(citySlug: string, limit = 4) {
  const currentIndex = cities.findIndex((city) => city.slug === citySlug);
  if (currentIndex < 0) return cities.slice(0, limit);

  return cities
    .filter((city) => city.slug !== citySlug)
    .map((city, index) => ({ city, distance: Math.abs(index - currentIndex) }))
    .sort((a, b) => a.distance - b.distance || a.city.priority - b.city.priority || a.city.name.localeCompare(b.city.name))
    .slice(0, limit)
    .map(({ city }) => city);
}
