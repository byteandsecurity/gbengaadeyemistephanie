import "server-only";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import * as t from "@/db/schema";
import { profileFields } from "./collections";
import { toFormValue, type FormValues } from "./fields";

/** Values to show in the profile form, read from the database (falls back to the starter content). */
export async function loadProfileValues(): Promise<FormValues> {
  const [row] = await getDb().select().from(t.profile).where(eq(t.profile.id, 1));
  const out: FormValues = {};
  for (const f of profileFields) out[f.name] = toFormValue(f, row ? (row as Record<string, unknown>)[f.name] : null);
  return out;
}
