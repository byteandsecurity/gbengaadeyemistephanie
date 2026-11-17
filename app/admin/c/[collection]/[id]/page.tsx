import { notFound } from "next/navigation";
import { eq, getTableColumns } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";
import { getDb } from "@/db";
import { requireAdmin } from "@/lib/auth/session";
import { findCollection } from "@/lib/admin/collections";
import { toFormValue, type FormValues } from "@/lib/admin/fields";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { EntryForm } from "@/components/admin/EntryForm";
import { PageTitle } from "@/components/admin/ui";
import { deleteEntry, saveEntry } from "../../../actions";

export default async function EditEntryPage({ params }: PageProps<"/admin/c/[collection]/[id]">) {
  await requireAdmin();
  const { collection: slug, id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  const collection = findCollection(slug);
  if (!collection) notFound();

  const idCol = getTableColumns(collection.table).id as PgColumn;
  const [row] = (await getDb().select().from(collection.table).where(eq(idCol, id))) as Record<string, unknown>[];
  if (!row) notFound();

  const initial: FormValues = {};
  for (const f of collection.fields) initial[f.name] = toFormValue(f, row[f.name]);

  return (
    <div className="max-w-3xl space-y-8">
      <PageTitle title={`Edit ${collection.singular}`} />
      <EntryForm
        fields={collection.fields}
        initial={initial}
        initialPublished={Boolean(row.published)}
        action={saveEntry.bind(null, slug, id)}
        cancelHref={`/admin/c/${slug}`}
        submitLabel="Save and update site"
      />
      <section aria-labelledby="danger-title" className="border-t border-line pt-8">
        <h2 id="danger-title" className="text-lg font-bold">
          Delete
        </h2>
        <p className="mb-4 mt-1 text-[0.95rem] text-muted">
          This removes it for good. To hide it without deleting, untick Published above instead.
        </p>
        <form action={deleteEntry.bind(null, slug, id)}>
          <ConfirmButton message={`Delete this ${collection.singular}? This cannot be undone.`}>Delete {collection.singular}</ConfirmButton>
        </form>
      </section>
    </div>
  );
}
