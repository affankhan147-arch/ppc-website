"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import { CallButton } from "@/components/CallButton";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link className="flex min-w-0 items-center gap-2" href="/">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-950 text-white">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black uppercase tracking-normal text-slate-950">{siteConfig.brandName}</span>
            <span className="block truncate text-xs font-medium text-slate-600">Emergency plumbing request help</span>
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
        <button
          type="button"
          className="inline-grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-900 lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-cyan-400 hover:bg-cyan-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-3 max-w-7xl sm:hidden">
            <CallButton location="mobile-menu" className="w-full" />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
