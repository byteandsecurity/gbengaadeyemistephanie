// Creates the admin account, or resets its password if the email already exists.
// There is no sign-up page; this is the only way an account comes into being.
//   npm run admin:create
import "./env";
import { createInterface } from "node:readline";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { createDb, createPool } from "@/db/client";
import { adminUsers } from "@/db/schema";

/* ------------------------------------------------------------------ */
/* Prompts. In a normal terminal each key is read directly so the     */
/* password shows as * characters. When input is piped (scripts, CI)  */
/* it falls back to reading whole lines.                              */
/* ------------------------------------------------------------------ */

const interactive = Boolean(process.stdin.isTTY);

// Characters typed ahead (for example a paste that contains several lines).
let leftover = "";

function askInteractive(question: string, hidden: boolean): Promise<string> {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    process.stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    let value = "";
    const finish = () => {
      stdin.off("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      process.stdout.write("\n");
    };

    const onData = (chunk: string) => {
      if (chunk.startsWith("\u001b")) return; // arrow keys and other escape sequences
      for (let i = 0; i < chunk.length; i++) {
        const ch = chunk[i];
        if (ch === "\r" || ch === "\n") {
          let rest = chunk.slice(i + 1);
          if (ch === "\r" && rest.startsWith("\n")) rest = rest.slice(1);
          leftover = rest;
          finish();
          resolve(value);
          return;
        }
        if (ch === "\u0003") {
          // Ctrl+C
          finish();
          process.exit(130);
        }
        if (ch === "\u007f" || ch === "\b") {
          if (value.length > 0) {
            value = value.slice(0, -1);
            process.stdout.write("\b \b");
          }
          continue;
        }
        if (ch < " ") continue; // ignore other control keys
        value += ch;
        process.stdout.write(hidden ? "*" : ch);
      }
    };

    stdin.on("data", onData);
    if (leftover) {
      const early = leftover;
      leftover = "";
      onData(early);
    }
  });
}

const queued: string[] = [];
const waiting: Array<(line: string) => void> = [];
let rl: ReturnType<typeof createInterface> | undefined;

function askPiped(question: string): Promise<string> {
  if (!rl) {
    rl = createInterface({ input: process.stdin, terminal: false });
    rl.on("line", (line) => {
      const next = waiting.shift();
      if (next) next(line);
      else queued.push(line);
    });
    rl.on("close", () => {
      while (waiting.length) waiting.shift()!("");
    });
  }
  process.stdout.write(question);
  return new Promise((resolve) => {
    const early = queued.shift();
    if (early !== undefined) resolve(early);
    else waiting.push(resolve);
  });
}

function ask(question: string, hidden = false): Promise<string> {
  return interactive ? askInteractive(question, hidden) : askPiped(question + "\n");
}

/* ------------------------------------------------------------------ */

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (put it in .env.local).");

  const email = (process.env.ADMIN_EMAIL ?? (await ask("Admin email: "))).trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("That does not look like an email address.");

  if (!process.env.ADMIN_PASSWORD) {
    console.log("Type your password and press Enter. It shows as * while you type.");
  }
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
  rl?.close();
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});