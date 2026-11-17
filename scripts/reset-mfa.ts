// Use this if you lose your phone: clears the authenticator and signs out every session.
// The next sign-in goes through authenticator setup again.
//   npm run admin:reset-mfa
import "./env";
import { createDb, createPool } from "../db/client";
import { adminSessions, adminUsers } from "../db/schema";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (put it in .env.local).");
  const pool = createPool(url);
  const db = createDb(pool);
  await db.update(adminUsers).set({ totpEnabled: false, totpSecretEnc: null, totpLastStep: null });
  await db.delete(adminSessions);
  console.log("Authenticator cleared and all sessions ended. Sign in and set up a new authenticator.");
  await pool.end();
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
