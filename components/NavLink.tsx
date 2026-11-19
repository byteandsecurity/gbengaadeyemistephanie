"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function NavLink({
                            href,
                            children,
                            isScrolled = true,
                        }: {
    href: string;
    children: React.ReactNode;
    isScrolled?: boolean;
}) {
    const pathname = usePathname();
    const active = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`group relative py-1 font-display text-sm font-medium transition-colors sm:text-[0.95rem] ${
                active
                    ? "font-semibold text-ink"
                    : isScrolled
                        ? "text-muted hover:text-ink"
                        : "text-ink/75 hover:text-ink"
            }`}
        >
            <span>{children}</span>
            <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    active
                        ? "w-full bg-gradient-to-r from-emerald to-violet"
                        : "w-0 bg-ink/60 group-hover:w-full"
                }`}
            />
        </Link>
    );
}