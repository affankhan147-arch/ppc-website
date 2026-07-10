import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import { CallButton } from "@/components/CallButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link className="flex min-w-0 items-center gap-2" href="/">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-950 text-white">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black uppercase tracking-normal text-slate-950">{siteConfig.brandName}</span>
            <span className="block truncate text-xs font-medium text-slate-500">Pay-per-call provider connection platform</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-700 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} className="hover:text-slate-950" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:block">
          <CallButton location="header" />
        </div>
        <button className="inline-grid h-10 w-10 place-items-center rounded-md border border-slate-200 lg:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
