import Link from "next/link";
import { notFound } from "next/navigation";
import { asc } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";
import { getDb } from "@/db";
import { requireAdmin } from "@/lib/auth/session";
import { findCollection } from "@/lib/admin/collections";
import { buttonClass, Notice, PageTitle } from "@/components/admin/ui";

const NOTICES: Record<string, string> = {
  saved: "Saved. The site has been updated.",
  created: "Added. The site has been updated.",
  deleted: "Deleted. The site has been updated.",
};

export default async function CollectionPage({ params, searchParams }: PageProps<"/admin/c/[collection]">) {
  await requireAdmin();
  const { collection: slug } = await params;
  const collection = findCollection(slug);
  if (!collection) notFound();
  const { notice } = await searchParams;

  const cols = getTableColumns(collection.table);
  const rows = (await getDb()
    .select()
    .from(collection.table)
    .orderBy(asc(cols.position as PgColumn), asc(cols.createdAt as PgColumn))) as Record<string, unknown>[];

  return (
    <div className="space-y-6">
      <PageTitle title={collection.label}>
        <Link href={`/admin/c/${slug}/new`} className={buttonClass}>
          Add {collection.singular}
        </Link>
      </PageTitle>
      <p className="text-muted">Shown on: {collection.appearsOn}. Lowest order number shows first.</p>
      {typeof notice === "string" && NOTICES[notice] ? <Notice tone="ok">{NOTICES[notice]}</Notice> : null}

      {rows.length === 0 ? (
        <p className="rounded-md border border-line bg-white px-4 py-6 text-muted">Nothing here yet.</p>
      ) : (
        <ul className="divide-y divide-line border-y border-line bg-white">
          {rows.map((r) => (
            <li key={String(r.id)}>
              <Link
                href={`/admin/c/${slug}/${encodeURIComponent(String(r.id))}`}
                className="grid items-center gap-x-4 gap-y-1 px-4 py-3 hover:bg-cobalt-soft sm:grid-cols-[3rem_1fr_6rem]"
              >
                <span className="font-display text-[0.95rem] text-muted">#{String(r.position)}</span>
                <span>
                  <span className="block font-display text-lg font-semibold">{String(r[collection.titleField])}</span>
                  {collection.subtitleField && r[collection.subtitleField] ? (
                    <span className="block text-[0.92rem] text-muted">{String(r[collection.subtitleField])}</span>
                  ) : null}
                </span>
                <span
                  className={`justify-self-start rounded-full px-2.5 py-0.5 font-display text-sm font-medium sm:justify-self-end ${
                    r.published ? "bg-ok-soft text-ok" : "bg-amber-soft text-amber-deep"
                  }`}
                >
                  {r.published ? "Published" : "Draft"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
