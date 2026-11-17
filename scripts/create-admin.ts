// Creates the admin account, or resets its password if the email already exists.
// There is no sign-up page; this is the only way an account comes into being.
//   npm run admin:create
import "./env";
import { createInterface } from "node:readline";
import { Writable } from "node:stream";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { createDb, createPool } from "@/db/client";
import { adminUsers } from "@/db/schema";

// One readline interface for the whole script, with a small queue so lines that
// arrive early (a paste, or piped input) are not lost between questions.
let muted = false;
const out = new Writable({
  write(chunk, _enc, cb) {
    if (!muted) process.stdout.write(chunk);
    cb();
  },
});
const rl = createInterface({ input: process.stdin, output: out, terminal: Boolean(process.stdin.isTTY) });
const queued: string[] = [];
const waiting: Array<(line: string) => void> = [];
rl.on("line", (line) => {
  const next = waiting.shift();
  if (next) next(line);
  else queued.push(line);
});
rl.on("close", () => {
  while (waiting.length) waiting.shift()!("");
});

function ask(question: string, hidden = false): Promise<string> {
  rl.setPrompt(question);
  rl.prompt();
  muted = hidden;
  return new Promise((resolve) => {
    const finish = (line: string) => {
      muted = false;
      if (hidden) process.stdout.write("\n");
      resolve(line);
    };
    const early = queued.shift();
    if (early !== undefined) finish(early);
    else waiting.push(finish);
  });
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (put it in .env.local).");

  const email = (process.env.ADMIN_EMAIL ?? (await ask("Admin email: "))).trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("That does not look like an email address.");

  const password = process.env.ADMIN_PASSWORD ?? (await ask("Password (at least 14 characters): ", true));
  if (password.length < 14) throw new Error("Use at least 14 characters. A passphrase of several words works well.");
  if (!process.env.ADMIN_PASSWORD) {
    const again = await ask("Repeat password: ", true);
    if (again !== password) throw new Error("The two passwords did not match.");
  }

  const pool = createPool(url);
  const db = createDb(pool);
  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, email));
  if (existing.length) {
    await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.email, email));
    console.log("Password updated. Your authenticator setup is unchanged.");
  } else {
    const [{ n }] = await pool.query<{ n: number }>("select count(*)::int as n from admin_users").then((r) => r.rows);
    if (n > 0) throw new Error("An admin account already exists. This site is built for a single admin.");
    await db.insert(adminUsers).values({ email, passwordHash });
    console.log("Admin created. Sign in at /admin; you will be asked to set up your authenticator app.");
  }
  await pool.end();
  rl.close();
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
