"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { audit, clientIp } from "@/lib/audit";
import { verifyPassword } from "@/lib/auth/password";
import { endSession, startSession } from "@/lib/auth/session";
import { lockedForMinutes, recordFailure } from "@/lib/auth/throttle";

export interface AuthState {
  error?: string;
}

const credentials = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email().max(254)),
  password: z.string().min(1).max(200),
});

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credentials.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: "Enter your email and password." };
  const { email, password } = parsed.data;

  const keys = [`ip:${await clientIp()}`, `email:${email}`];
  const wait = await lockedForMinutes(keys);
  if (wait) return { error: `Too many attempts. Try again in about ${wait} minutes.` };

  const [user] = await getDb().select().from(adminUsers).where(eq(adminUsers.email, email));
  const ok = await verifyPassword(password, user?.passwordHash);

  if (!ok || !user) {
    await Promise.all(keys.map(recordFailure));
    await audit("anonymous", "login_failed", undefined, `email: ${email.slice(0, 100)}`);
    // Same message whether the email exists or not.
    return { error: "Email or password is incorrect." };
  }

  await startSession(user.id, false);
  await audit(user.email, "password_accepted");
  redirect(user.totpEnabled ? "/admin/verify" : "/admin/mfa-setup");
}

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}
