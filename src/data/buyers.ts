export type Buyer = {
  buyer_id: string;
  buyer_name: string;
  status: "active" | "paused" | "test";
  markets: string[];
  services: string[];
  open_hours: string;
  daily_cap: number;
  payout: number;
  min_call_duration: number;
  fallback_number: string;
};

export const buyers: Buyer[] = [
  {
    buyer_id: "sample-dfw-emergency-plumbing",
    buyer_name: "Sample DFW Emergency Plumbing Buyer",
    status: "test",
    markets: ["dallas-fort-worth"],
    services: ["24-hour-emergency-plumber", "emergency-drain-cleaning", "main-sewer-line-clog", "sewer-backup-help"],
    open_hours: "24/7 sample availability pending owner buyer setup",
    daily_cap: 25,
    payout: 85,
    min_call_duration: 90,
    fallback_number: "+1XXXXXXXXXX"
  },
  {
    buyer_id: "sample-dfw-water-heater",
    buyer_name: "Sample DFW Water Heater Buyer",
    status: "test",
    markets: ["dallas-fort-worth"],
    services: ["water-heater-emergency", "same-day-plumber-connection"],
    open_hours: "6am-10pm sample availability pending owner buyer setup",
    daily_cap: 12,
    payout: 65,
    min_call_duration: 75,
    fallback_number: "+1XXXXXXXXXX"
  }
];
