"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { eq, getTableColumns } from "drizzle-orm";
import type { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { getDb } from "@/db";
import * as t from "@/db/schema";
import { audit } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth/session";
import { findCollection, profileFields } from "@/lib/admin/collections";
import { readForm, validate, type Field, type FormValues } from "@/lib/admin/fields";

export interface FormState {
  errors?: Record<string, string>;
  values?: FormValues;
  published?: boolean;
  message?: string;
  /** Changes on every submit so the form re-fills with what was typed */
  nonce?: number;
}

function idColumn(table: PgTable): PgColumn {
  return getTableColumns(table).id as PgColumn;
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "item"
  );
}

async function uniqueId(table: PgTable, base: string): Promise<string> {
  const db = getDb();
  const col = idColumn(table);
  for (let n = 1; n < 50; n++) {
    const candidate = n === 1 ? base : `${base}-${n}`;
    const rows = await db.select({ id: col }).from(table).where(eq(col, candidate)).limit(1);
    if (rows.length === 0) return candidate;
  }
  return `${base}-${Date.now().toString(36)}`;
}

function changedFields(fields: Field[], existing: Record<string, unknown>, next: Record<string, unknown>): string[] {
  return fields
    .filter((f) => JSON.stringify(existing[f.name] ?? null) !== JSON.stringify(next[f.name] ?? null))
    .map((f) => f.name);
}

/** Make the public pages pick up the change straight away. */
function refreshSite() {
  revalidatePath("/", "layout");
}

export async function saveEntry(
  slug: string,
  id: string | null,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await requireAdmin();
  const collection = findCollection(slug);
  if (!collection) notFound();

  const raw = readForm(formData, collection.fields);
  const published = formData.get("published") === "on";
  const result = validate(collection.fields, raw);
  if (!result.ok) {
    return { errors: result.errors, values: raw, published, nonce: Date.now(), message: "Some fields need attention." };
  }

  const db = getDb();
  const table = collection.table;
  const idCol = idColumn(table);
  let targetId = id;

  if (id) {
    const [existing] = await db.select().from(table).where(eq(idCol, id));
    if (!existing) notFound();
    const changed = changedFields(collection.fields, existing as Record<string, unknown>, result.values);
    if ((existing as { published: boolean }).published !== published) changed.push("published");
    await db
      .update(table)
      .set({ ...result.values, published, updatedAt: new Date() } as never)
      .where(eq(idCol, id));
    await audit(session.user.email, "update", `${slug}/${id}`, changed.length ? `changed: ${changed.join(", ")}` : "no changes");
  } else {
    targetId = await uniqueId(table, slugify(String(result.values[collection.titleField] ?? "item")));
    await db.insert(table).values({ id: targetId, ...result.values, published } as never);
    await audit(session.user.email, "create", `${slug}/${targetId}`);
  }

  refreshSite();
  redirect(`/admin/c/${slug}?notice=${id ? "saved" : "created"}`);
}

export async function deleteEntry(slug: string, id: string): Promise<void> {
  const session = await requireAdmin();
  const collection = findCollection(slug);
  if (!collection) notFound();
  await getDb().delete(collection.table).where(eq(idColumn(collection.table), id));
  await audit(session.user.email, "delete", `${slug}/${id}`);
  refreshSite();
  redirect(`/admin/c/${slug}?notice=deleted`);
}

export async function saveProfile(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await requireAdmin();
  const raw = readForm(formData, profileFields);
  const result = validate(profileFields, raw);
  if (!result.ok) {
    return { errors: result.errors, values: raw, nonce: Date.now(), message: "Some fields need attention." };
  }

  const db = getDb();
  const [existing] = await db.select().from(t.profile).where(eq(t.profile.id, 1));
  const changed = existing ? changedFields(profileFields, existing as Record<string, unknown>, result.values) : ["created"];
  const values = { ...result.values, updatedAt: new Date() } as never;
  await db
    .insert(t.profile)
    .values({ id: 1, ...(values as object) } as never)
    .onConflictDoUpdate({ target: t.profile.id, set: values });
  await audit(session.user.email, "update", "profile", changed.length ? `changed: ${changed.join(", ")}` : "no changes");

  refreshSite();
  return { message: "Saved. The site has been updated.", values: raw, nonce: Date.now() };
}
