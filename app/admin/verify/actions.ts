"use server";

import { redirect } from "next/navigation";
import { and, eq, isNull, lt, or } from "drizzle-orm";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { audit, clientIp } from "@/lib/audit";
import { decrypt } from "@/lib/crypto";
import { endSession, requirePending, startSession } from "@/lib/auth/session";
import { clearFailures, lockedForMinutes, recordFailure } from "@/lib/auth/throttle";
import { checkTotp } from "@/lib/auth/totp";
import type { AuthState } from "../login/actions";

/** Checks the code, marks its time step as used, and swaps the pending session for a full one. */
async function completeSignIn(code: string, enrolling: boolean): Promise<AuthState> {
  const session = await requirePending();
  const { user } = session;

  const keys = [`ip:${await clientIp()}`, `email:${user.email}`];
  const wait = await lockedForMinutes(keys);
  if (wait) {
    await endSession();
    return { error: `Too many attempts. Try again in about ${wait} minutes.` };
  }

  if (!user.totpSecretEnc) redirect("/admin/mfa-setup");
  const step = checkTotp(decrypt(user.totpSecretEnc), code, user.email);

  // Update succeeds only if this step is newer than the last one used, so a code works once.
  const accepted =
    step === null
      ? []
      : await getDb()
          .update(adminUsers)
          .set({ totpEnabled: true, totpLastStep: step, lastLoginAt: new Date() })
          .where(
            and(
              eq(adminUsers.id, user.id),
              or(isNull(adminUsers.totpLastStep), lt(adminUsers.totpLastStep, step)),
            ),
          )
          .returning({ id: adminUsers.id });

  if (accepted.length === 0) {
    await Promise.all(keys.map(recordFailure));
    await audit(user.email, "mfa_failed");
    return { error: "That code is not valid. Wait for the next code and try again." };
  }

  await endSession(); // new session id after privilege change
  await startSession(user.id, true);
  await clearFailures(keys);
  await audit(user.email, enrolling ? "mfa_enabled" : "login");
  redirect("/admin");
}

export async function verifyCode(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const session = await requirePending();
  if (!session.user.totpEnabled) redirect("/admin/mfa-setup");
  return completeSignIn(String(formData.get("code") ?? ""), false);
}

export async function confirmMfaSetup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const session = await requirePending();
  if (session.user.totpEnabled) redirect("/admin/verify");
  return completeSignIn(String(formData.get("code") ?? ""), true);
}
