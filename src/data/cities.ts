export type City = {
  slug: string;
  name: string;
  marketSlug: string;
  countyHint: string;
  priority: number;
};

export const cities: City[] = [
  { slug: "dallas", name: "Dallas", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", priority: 1 },
  { slug: "fort-worth", name: "Fort Worth", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", priority: 1 },
  { slug: "arlington", name: "Arlington", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", priority: 1 },
  { slug: "plano", name: "Plano", marketSlug: "dallas-fort-worth", countyHint: "Collin County", priority: 1 },
  { slug: "irving", name: "Irving", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", priority: 1 },
  { slug: "garland", name: "Garland", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", priority: 1 },
  { slug: "frisco", name: "Frisco", marketSlug: "dallas-fort-worth", countyHint: "Collin and Denton counties", priority: 1 },
  { slug: "mckinney", name: "McKinney", marketSlug: "dallas-fort-worth", countyHint: "Collin County", priority: 1 },
  { slug: "carrollton", name: "Carrollton", marketSlug: "dallas-fort-worth", countyHint: "Dallas, Denton, and Collin counties", priority: 2 },
  { slug: "denton", name: "Denton", marketSlug: "dallas-fort-worth", countyHint: "Denton County", priority: 2 },
  { slug: "richardson", name: "Richardson", marketSlug: "dallas-fort-worth", countyHint: "Dallas and Collin counties", priority: 2 },
  { slug: "mesquite", name: "Mesquite", marketSlug: "dallas-fort-worth", countyHint: "Dallas County", priority: 2 },
  { slug: "grand-prairie", name: "Grand Prairie", marketSlug: "dallas-fort-worth", countyHint: "Dallas, Tarrant, and Ellis counties", priority: 2 },
  { slug: "lewisville", name: "Lewisville", marketSlug: "dallas-fort-worth", countyHint: "Denton County", priority: 2 },
  { slug: "allen", name: "Allen", marketSlug: "dallas-fort-worth", countyHint: "Collin County", priority: 2 },
  { slug: "grapevine", name: "Grapevine", marketSlug: "dallas-fort-worth", countyHint: "Tarrant County", priority: 2 }
];

export const futureCities: City[] = [
  { slug: "phoenix", name: "Phoenix", marketSlug: "phoenix-metro", countyHint: "Maricopa County", priority: 3 },
  { slug: "mesa", name: "Mesa", marketSlug: "phoenix-metro", countyHint: "Maricopa County", priority: 3 },
  { slug: "chandler", name: "Chandler", marketSlug: "phoenix-metro", countyHint: "Maricopa County", priority: 3 },
  { slug: "scottsdale", name: "Scottsdale", marketSlug: "phoenix-metro", countyHint: "Maricopa County", priority: 3 }
];
