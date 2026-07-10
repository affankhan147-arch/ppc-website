import { PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/site";

type CallButtonProps = {
  label?: string;
  location: string;
  className?: string;
};

export function CallButton({ label = `Call ${siteConfig.phoneDisplay}`, location, className = "" }: CallButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${className}`}
      href={`tel:${siteConfig.phoneE164}`}
      data-call-event-url={`/api/call-event?location=${encodeURIComponent(location)}`}
      aria-label={`${label} from ${location}`}
    >
      <PhoneCall className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
