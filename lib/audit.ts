import "server-only";
import { headers } from "next/headers";
import { getDb } from "@/db";
import { auditLog } from "@/db/schema";

export async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "unknown";
}

/** Appends one line to the audit log. Never throws, so a logging problem cannot block a save. */
export async function audit(actor: string, action: string, target?: string, detail?: string): Promise<void> {
  try {
    await getDb().insert(auditLog).values({
      actor,
      action,
      target: target ?? null,
      detail: detail ?? null,
      ip: await clientIp(),
    });
  } catch (err) {
    console.error("audit log write failed", err);
  }
}
