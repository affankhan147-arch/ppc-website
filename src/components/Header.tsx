"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle2, Menu, X } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import { CallButton } from "@/components/CallButton";

const mobileNavigation = [{ label: "Home", href: "/" }, ...navigation];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(8,27,44,.08)] backdrop-blur-xl">
      <div className="hidden bg-[#081b2c] text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs font-bold">
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" /> Safety-first guidance for urgent plumbing problems</span>
          <span className="text-slate-300">Dallas–Fort Worth provider connection</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5">
        <Link className="flex min-w-0 items-center gap-3" href="/" aria-label="PlumbingHands home">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-[#081b2c] shadow-md">
            <Image src="/images/brand/plumbing-hands-mark.svg" width={44} height={44} alt="" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-black tracking-tight text-[#081b2c]">{siteConfig.brandName}</span>
            <span className="block truncate text-xs font-semibold text-slate-500">DFW plumbing help</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-bold text-slate-700 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} className="relative py-2 transition hover:text-[#e84d0e]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:block">
          <CallButton location="header" />
        </div>
        <button
          type="button"
          className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900 shadow-sm lg:hidden"
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
          className="border-t border-slate-200 bg-white px-4 py-4 shadow-2xl lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3">
            {mobileNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-orange-300 hover:bg-orange-50"
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
