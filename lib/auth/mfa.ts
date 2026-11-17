import "server-only";
import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { decrypt, encrypt } from "@/lib/crypto";
import { newTotpSecret } from "@/lib/auth/totp";

/** Creates the authenticator secret the first time the setup page is opened, and reuses it after that. */
export async function ensureSecret(userId: string): Promise<string> {
  const db = getDb();
  const [row] = await db.select({ enc: adminUsers.totpSecretEnc }).from(adminUsers).where(eq(adminUsers.id, userId));
  if (row?.enc) return decrypt(row.enc);
  const secret = newTotpSecret();
  const updated = await db
    .update(adminUsers)
    .set({ totpSecretEnc: encrypt(secret) })
    .where(and(eq(adminUsers.id, userId), isNull(adminUsers.totpSecretEnc)))
    .returning({ id: adminUsers.id });
  if (updated.length) return secret;
  // Another request created it first: read that one.
  const [again] = await db.select({ enc: adminUsers.totpSecretEnc }).from(adminUsers).where(eq(adminUsers.id, userId));
  return decrypt(again!.enc!);
}
