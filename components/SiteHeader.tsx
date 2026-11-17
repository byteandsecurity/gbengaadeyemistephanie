import Link from "next/link";
import { NavLink } from "./NavLink";

export function SiteHeader({ name }: { name: string }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          {name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6">
          <NavLink href="/software">Software</NavLink>
          <NavLink href="/cybersecurity">Cybersecurity</NavLink>
          <a
            href="#contact"
            className="font-display text-[0.95rem] font-medium text-muted py-1 border-b-2 border-transparent hover:text-ink"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
