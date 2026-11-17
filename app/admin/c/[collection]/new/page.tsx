import { notFound } from "next/navigation";
import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { requireAdmin } from "@/lib/auth/session";
import { findCollection } from "@/lib/admin/collections";
import type { FormValues } from "@/lib/admin/fields";
import { EntryForm } from "@/components/admin/EntryForm";
import { PageTitle } from "@/components/admin/ui";
import { saveEntry } from "../../../actions";

interface NewEntryPageProps {
    params: Promise<{ collection: string }>;
}

export default async function NewEntryPage({ params }: NewEntryPageProps) {
    await requireAdmin();
    const { collection: slug } = await params;
    const collection = findCollection(slug);
    if (!collection) notFound();

    const res = await getDb().execute<{ next: number }>(sql`select coalesce(max(position), -1)::int + 1 as next from ${collection.table}`);
    const initial: FormValues = {};
    for (const f of collection.fields) initial[f.name] = f.type === "checkboxes" ? [] : "";
    initial.position = String(res.rows[0]?.next ?? 0);

    return (
        <div className="max-w-3xl space-y-8">
            <PageTitle title={`Add ${collection.singular}`} />
            <EntryForm
                fields={collection.fields}
                initial={initial}
                initialPublished
                action={saveEntry.bind(null, slug, null)}
                cancelHref={`/admin/c/${slug}`}
                submitLabel="Add and update site"
            />
        </div>
    );
}