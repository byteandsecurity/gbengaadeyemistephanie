"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        "font-display text-[0.95rem] font-medium py-1 border-b-2 transition-colors " +
        (active ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink")
      }
    >
      {children}
    </Link>
  );
}
