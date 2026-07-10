export type Market = {
  slug: string;
  name: string;
  state: string;
  status: "active" | "future";
  primaryCitySlug: string;
};

export const markets: Market[] = [
  {
    slug: "dallas-fort-worth",
    name: "Dallas-Fort Worth",
    state: "TX",
    status: "active",
    primaryCitySlug: "dallas"
  },
  {
    slug: "phoenix-metro",
    name: "Phoenix Metro",
    state: "AZ",
    status: "future",
    primaryCitySlug: "phoenix"
  }
];
