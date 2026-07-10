import { CallButton } from "@/components/CallButton";

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-3 shadow-lg md:hidden">
      <CallButton location="mobile-sticky-call-bar" className="w-full" />
    </div>
  );
}
