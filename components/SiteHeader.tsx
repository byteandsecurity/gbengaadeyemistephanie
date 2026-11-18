"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NavLink } from "./NavLink";
import { BrandIcon } from "./BrandIcon";
import { useTheme } from "./ThemeProvider";

export function SiteHeader({ name }: { name: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <header
          className={`sticky top-0 z-40 transition-all duration-300 border-b ${
              isScrolled
                  ? "border-line bg-paper/90 backdrop-blur-md shadow-lg shadow-black/10 text-slate-100"
                  : "border-slate-200 bg-white text-slate-900 shadow-sm"
          }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-8 sm:py-4">
          <Link
              href="/"
              className="group inline-flex min-w-0 items-center gap-2 font-display text-sm font-bold tracking-tight transition-colors sm:gap-2.5 sm:text-base md:text-lg"
          >
            <BrandIcon className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-8 sm:w-8" />
            <span className="truncate">{name}</span>
          </Link>

          <nav aria-label="Main" className="flex shrink-0 items-center gap-2.5 sm:gap-5">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-4 md:flex">
              <NavLink href="/software" isScrolled={isScrolled}>Software</NavLink>
              <NavLink href="/cybersecurity" isScrolled={isScrolled}>Cybersecurity</NavLink>
              <NavLink href="/works" isScrolled={isScrolled}>Works</NavLink>
              <NavLink href="/about" isScrolled={isScrolled}>About</NavLink>
            </div>

            {/* Mobile / Tablet Short Nav */}
            <div className="flex items-center gap-1 md:hidden">
              <Link
                  href="/works"
                  className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                      isScrolled ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-950"
                  }`}
              >
                Works
              </Link>
              <Link
                  href="/about"
                  className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                      isScrolled ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-950"
                  }`}
              >
                About
              </Link>
            </div>

            {/* Theme Toggle Button */}
            <button
                aria-label="Toggle light/dark theme"
                onClick={toggleTheme}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all hover:scale-105 ${
                    isScrolled
                        ? "border-line bg-surface text-slate-300 hover:border-violet-light hover:text-white"
                        : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950"
                }`}
            >
              {theme === "dark" ? (
                  <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.02-12.02l-1.41 1.41" />
                  </svg>
              ) : (
                  <svg className="h-4 w-4 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
              )}
            </button>

            {/* Contact Button */}
            <a
                href="#contact"
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-display text-xs font-semibold transition-all sm:text-sm ${
                    isScrolled
                        ? "border-line bg-surface text-slate-300 hover:border-violet-light/50 hover:bg-surface/80 hover:text-white"
                        : "border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-950"
                }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
              <span>Contact</span>
            </a>
          </nav>
        </div>
      </header>
  );
}