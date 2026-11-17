import "server-only";
import { inArray, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { authThrottle } from "@/db/schema";

const MAX_FAILURES = 5;
const WINDOW_MINUTES = 15;
const LOCK_MINUTES = 15;

/** Returns minutes left if any key is locked, otherwise null. */
export async function lockedForMinutes(keys: string[]): Promise<number | null> {
  const rows = await getDb().select().from(authThrottle).where(inArray(authThrottle.key, keys));
  const now = Date.now();
  let longest = 0;
  for (const r of rows) {
    if (r.lockedUntil && r.lockedUntil.getTime() > now) {
      longest = Math.max(longest, r.lockedUntil.getTime() - now);
    }
  }
  return longest > 0 ? Math.ceil(longest / 60_000) : null;
}

/** Counts one failure. After five failures inside 15 minutes the key is locked for 15 minutes. */
export async function recordFailure(key: string): Promise<void> {
  await getDb().execute(sql`
    insert into auth_throttle (key, failures, window_start, locked_until)
    values (${key}, 1, now(), null)
    on conflict (key) do update set
      failures = case when auth_throttle.window_start < now() - make_interval(mins => ${WINDOW_MINUTES})
                      then 1 else auth_throttle.failures + 1 end,
      window_start = case when auth_throttle.window_start < now() - make_interval(mins => ${WINDOW_MINUTES})
                          then now() else auth_throttle.window_start end,
      locked_until = case when (case when auth_throttle.window_start < now() - make_interval(mins => ${WINDOW_MINUTES})
                                     then 1 else auth_throttle.failures + 1 end) >= ${MAX_FAILURES}
                          then now() + make_interval(mins => ${LOCK_MINUTES}) else null end
  `);
}

export async function clearFailures(keys: string[]): Promise<void> {
  await getDb().delete(authThrottle).where(inArray(authThrottle.key, keys));
}
