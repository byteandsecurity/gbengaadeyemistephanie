import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { collections } from "@/lib/admin/collections";
import { signOut } from "./login/actions";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Only used to decide what to show. Each page and action checks access itself.
  const session = await getSession();
  const signedIn = Boolean(session?.mfaVerified);

  return (
      <div className="min-h-screen bg-paper">
        <header className="border-b border-line bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
            <p className="font-display text-lg font-bold">Portfolio admin</p>
            <div className="flex items-center gap-5 font-display text-[0.95rem]">
              <Link href="/" className="underline underline-offset-4">
                View site
              </Link>
              {signedIn ? (
                  <form action={signOut}>
                    <button type="submit" className="underline underline-offset-4">
                      Sign out
                    </button>
                  </form>
              ) : null}
            </div>
          </div>
          {signedIn ? (
              <nav aria-label="Admin" className="mx-auto max-w-6xl px-5 pb-3 sm:px-8">
                <ul className="flex flex-wrap gap-x-5 gap-y-1 font-display text-[0.95rem]">
                  <li>
                    <Link href="/admin" className="underline-offset-4 hover:underline">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/profile" className="underline-offset-4 hover:underline">
                      Profile
                    </Link>
                  </li>
                  {collections.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/admin/c/${c.slug}`} className="underline-offset-4 hover:underline">
                          {c.label}
                        </Link>
                      </li>
                  ))}
                  <li>
                    <Link href="/admin/activity" className="underline-offset-4 hover:underline">
                      Activity
                    </Link>
                  </li>
                </ul>
              </nav>
          ) : null}
        </header>
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</div>
      </div>
  );
}