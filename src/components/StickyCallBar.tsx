import { ShieldCheck } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { siteConfig } from "@/data/site";

export function StickyCallBar() {
  return (
    <div className="mobile-call-dock fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 px-3 py-2.5 shadow-2xl backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.1em] text-cyan-200">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Emergency line
          </p>
          <p className="truncate text-xs font-bold text-slate-300">Call about active leaks, backups, or fixture loss</p>
        </div>
        <CallButton
          location="mobile-sticky-call-bar"
          label={`Call ${siteConfig.phoneDisplay}`}
          className="w-full flex-none sm:w-auto"
        />
      </div>
    </div>
  );
}
