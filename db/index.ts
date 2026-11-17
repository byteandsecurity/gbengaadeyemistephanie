import "server-only";
import { createDb, createPool, type Db } from "./client";

// Reuse one pool per server instance (and across hot reloads in development).
const globalForDb = globalThis as unknown as { __db?: Db };

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb(): Db {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
  }
  globalForDb.__db ??= createDb(createPool(url));
  return globalForDb.__db;
}
