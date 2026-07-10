export type Vertical = {
  slug: string;
  name: string;
  status: "active" | "future";
  description: string;
};

export const verticals: Vertical[] = [
  {
    slug: "plumbing",
    name: "Emergency plumbing and drain cleaning",
    status: "active",
    description: "Urgent plumbing, drain, sewer, water heater, overflow, and pipe problems."
  },
  { slug: "hvac", name: "HVAC", status: "future", description: "AC repair, furnace repair, and emergency HVAC." },
  { slug: "roofing", name: "Roofing", status: "future", description: "Storm damage, roof leak, and replacement leads." },
  { slug: "water-damage", name: "Water damage", status: "future", description: "Mitigation and restoration leads." },
  { slug: "electrical", name: "Electrical", status: "future", description: "Emergency electrical service leads." },
  { slug: "pest-control", name: "Pest control", status: "future", description: "Residential and commercial pest calls." },
  { slug: "garage-door", name: "Garage door", status: "future", description: "Repair and replacement calls." },
  { slug: "locksmith", name: "Locksmith", status: "future", description: "Lockout and lock repair calls." }
];
