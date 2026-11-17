// Applies the SQL files in db/migrations to the database in DATABASE_URL.
//   npm run db:migrate
import "./env";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { createDb, createPool } from "../db/client";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (put it in .env.local).");
  const pool = createPool(url);
  await migrate(createDb(pool), { migrationsFolder: "db/migrations" });
  console.log("Migrations applied.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
