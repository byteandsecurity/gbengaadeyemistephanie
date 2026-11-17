import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, gt, lt } from "drizzle-orm";
import { getDb } from "@/db";
import { adminSessions, adminUsers } from "@/db/schema";
import { clientIp } from "@/lib/audit";
import { randomToken, sha256 } from "@/lib/crypto";

const PROD = process.env.NODE_ENV === "production";
// The __Host- prefix makes browsers accept the cookie only over HTTPS, for this exact host, with Path=/.
const COOKIE = PROD ? "__Host-admin_session" : "admin_session";

const FULL_SESSION_MS = 8 * 60 * 60 * 1000; // signed-in session: 8 hours
const PENDING_SESSION_MS = 10 * 60 * 1000; // between password and authenticator code: 10 minutes

export interface AdminSession {
  sessionId: string;
  mfaVerified: boolean;
  user: { id: string; email: string; totpEnabled: boolean; totpSecretEnc: string | null; totpLastStep: number | null };
}

/** Creates a session row, and sets the cookie. `mfaVerified` is false right after the password step. */
export async function startSession(userId: string, mfaVerified: boolean): Promise<void> {
  const db = getDb();
  await db.delete(adminSessions).where(lt(adminSessions.expiresAt, new Date()));

  const token = randomToken();
  const ttl = mfaVerified ? FULL_SESSION_MS : PENDING_SESSION_MS;
  const h = await headers();
  await db.insert(adminSessions).values({
    userId,
    tokenHash: sha256(token),
    mfaVerified,
    expiresAt: new Date(Date.now() + ttl),
    ip: await clientIp(),
    userAgent: h.get("user-agent")?.slice(0, 300) ?? null,
  });

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: PROD,
    sameSite: "strict",
    path: "/",
    maxAge: Math.floor(ttl / 1000),
  });
}

/** Deletes the current session row and cookie. */
export async function endSession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await getDb().delete(adminSessions).where(eq(adminSessions.tokenHash, sha256(token)));
  jar.delete(COOKIE);
}

/** The current session (pending or full), or null. Cached for the length of one request. */
export const getSession = cache(async (): Promise<AdminSession | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [row] = await getDb()
    .select({
      sessionId: adminSessions.id,
      mfaVerified: adminSessions.mfaVerified,
      id: adminUsers.id,
      email: adminUsers.email,
      totpEnabled: adminUsers.totpEnabled,
      totpSecretEnc: adminUsers.totpSecretEnc,
      totpLastStep: adminUsers.totpLastStep,
    })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminUsers.id, adminSessions.userId))
    .where(and(eq(adminSessions.tokenHash, sha256(token)), gt(adminSessions.expiresAt, new Date())));
  if (!row) return null;
  return {
    sessionId: row.sessionId,
    mfaVerified: row.mfaVerified,
    user: {
      id: row.id,
      email: row.email,
      totpEnabled: row.totpEnabled,
      totpSecretEnc: row.totpSecretEnc,
      totpLastStep: row.totpLastStep,
    },
  };
});

/**
 * Gate for every admin page and every server action: a session that has passed
 * both the password and the authenticator code. Anything else goes to the login page.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getSession();
  if (!session || !session.mfaVerified) redirect("/admin/login");
  return session;
}

/** Gate for the two steps between password and full sign-in. */
export async function requirePending(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (session.mfaVerified) redirect("/admin");
  return session;
}
