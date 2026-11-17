import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { collections } from "@/lib/admin/collections";
import { PageTitle } from "@/components/admin/ui";

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
      <div className="space-y-8">
        <PageTitle title="Admin Dashboard">
          <span className="text-sm text-muted">Secure Area</span>
        </PageTitle>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Profile Editor Card */}
          <Link
              href="/admin/profile"
              className="group block rounded-lg border border-line bg-white p-6 shadow-sm transition hover:border-cobalt hover:shadow-md"
          >
            <h2 className="font-display text-xl font-bold group-hover:text-cobalt">Profile & Panels</h2>
            <p className="mt-2 text-sm text-muted">
              Edit your bio, headline, contact links, and introduction panels for the landing page.
            </p>
          </Link>

          {/* Security / Audit Log Card */}
          <Link
              href="/admin/activity"
              className="group block rounded-lg border border-line bg-white p-6 shadow-sm transition hover:border-cobalt hover:shadow-md"
          >
            <h2 className="font-display text-xl font-bold group-hover:text-cobalt">Activity & Security</h2>
            <p className="mt-2 text-sm text-muted">
              Review recent administrative audit logs, IP access history, and security events.
            </p>
          </Link>

          {/* MFA Setup Card */}
          <Link
              href="/admin/mfa-setup"
              className="group block rounded-lg border border-line bg-white p-6 shadow-sm transition hover:border-cobalt hover:shadow-md"
          >
            <h2 className="font-display text-xl font-bold group-hover:text-cobalt">Authenticator (MFA)</h2>
            <p className="mt-2 text-sm text-muted">
              Manage your Time-based One-Time Password (TOTP) authenticator application settings.
            </p>
          </Link>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="font-display text-2xl font-bold">Content Collections</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((col) => (
                <Link
                    key={col.slug}
                    href={`/admin/c/${col.slug}`}
                    className="group block rounded-lg border border-line bg-white p-6 shadow-sm transition hover:border-cobalt hover:shadow-md"
                >
                  <h3 className="font-display text-lg font-bold group-hover:text-cobalt">{col.label}</h3>
                  <p className="mt-1 text-xs text-muted font-medium uppercase tracking-wider">{col.appearsOn}</p>
                  <p className="mt-3 text-sm text-muted">Manage, create, or reorder {col.singular} entries.</p>
                </Link>
            ))}
          </div>
        </div>
      </div>
  );
}