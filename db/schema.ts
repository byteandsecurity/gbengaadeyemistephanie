// Database structure for the portfolio.
//
// Content tables (what visitors see) all share the same bookkeeping columns:
//   position   - sort order on the public page (lowest first)
//   published  - false keeps an item as a draft, hidden from the public site
//   created_at / updated_at
//
// Admin tables (who can edit) are never read by the public pages.

import { sql } from "drizzle-orm";
import {
  bigint,
  bigserial,
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const textArray = (name: string) =>
  text(name)
    .array()
    .notNull()
    .default(sql`'{}'::text[]`);

const bookkeeping = {
  position: integer("position").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

/* ----------------------------- Public content ---------------------------- */

/** One row only (id = 1): name, headline, about text, links and the two landing panels. */
export const profile = pgTable("profile", {
  id: integer("id").primaryKey().default(1),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  headline: text("headline").notNull(),
  intro: text("intro").notNull(),
  about: textArray("about"),
  email: text("email").notNull(),
  linkedin: text("linkedin").notNull(),
  github: text("github").notNull(),
  focusAreas: textArray("focus_areas"),
  softwareTitle: text("software_title").notNull(),
  softwareLead: text("software_lead").notNull(),
  softwareProof: textArray("software_proof"),
  softwareCta: text("software_cta").notNull(),
  securityTitle: text("security_title").notNull(),
  securityLead: text("security_lead").notNull(),
  securityProof: textArray("security_proof"),
  securityCta: text("security_cta").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Certifications and memberships. `pages` says where each one appears: home and/or security. */
export const credentials = pgTable("credentials", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  detail: text("detail").notNull(),
  pages: textArray("pages"),
  ...bookkeeping,
});

/** Honours and awards on the landing page. */
export const recognition = pgTable("recognition", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  detail: text("detail").notNull(),
  ...bookkeeping,
});

/** Work experience. `page` is "software" or "security" and decides which page shows it. */
export const experience = pgTable(
  "experience",
  {
    id: text("id").primaryKey(),
    page: text("page").notNull(),
    role: text("role").notNull(),
    org: text("org").notNull(),
    place: text("place"),
    period: text("period").notNull(),
    status: text("status"),
    summary: text("summary"),
    bullets: textArray("bullets"),
    ...bookkeeping,
  },
  (t) => [index("experience_page_idx").on(t.page)],
);

/** Software projects. */
export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull(),
  period: text("period"),
  stack: textArray("stack"),
  description: text("description").notNull(),
  highlights: textArray("highlights"),
  ...bookkeeping,
});

/** Research summaries. `pages` is software and/or security. */
export const research = pgTable("research", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  context: text("context").notNull(),
  summary: text("summary").notNull(),
  pages: textArray("pages"),
  ...bookkeeping,
});

/** Ubuntu Bridge Initiative stages. */
export const stages = pgTable("stages", {
  id: text("id").primaryKey(),
  stage: integer("stage").notNull(),
  title: text("title").notNull(),
  score: text("score"),
  detail: text("detail").notNull(),
  ...bookkeeping,
});

/** Google Cybersecurity Certificate lab projects, grouped on the security page. */
export const labProjects = pgTable("lab_projects", {
  id: text("id").primaryKey(),
  number: integer("number").notNull(),
  title: text("title").notNull(),
  groupName: text("group_name").notNull(),
  summary: text("summary").notNull(),
  tags: textArray("tags"),
  ...bookkeeping,
});

/* ------------------------------ Admin and audit --------------------------- */

/** The admin account. There is no sign-up page; the row is created by `npm run admin:create`. */
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  /** AES-256-GCM encrypted TOTP secret (base32), see lib/crypto.ts */
  totpSecretEnc: text("totp_secret_enc"),
  totpEnabled: boolean("totp_enabled").notNull().default(false),
  /** Time step of the last accepted code, so one code cannot be used twice */
  totpLastStep: bigint("totp_last_step", { mode: "number" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

/** Server-side sessions. The cookie holds a random token; only its SHA-256 hash is stored here. */
export const adminSessions = pgTable(
  "admin_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    /** false after the password step, true once the authenticator code is accepted */
    mfaVerified: boolean("mfa_verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ip: text("ip"),
    userAgent: text("user_agent"),
  },
  (t) => [index("admin_sessions_user_idx").on(t.userId)],
);

/** Failed sign-in counters, keyed by IP and by email, used to slow down guessing. */
export const authThrottle = pgTable("auth_throttle", {
  key: text("key").primaryKey(),
  failures: integer("failures").notNull().default(0),
  windowStart: timestamp("window_start", { withTimezone: true }).notNull().defaultNow(),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
});

/** Append-only record of sign-ins and content changes. */
export const auditLog = pgTable(
  "audit_log",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
    actor: text("actor").notNull(),
    action: text("action").notNull(),
    target: text("target"),
    detail: text("detail"),
    ip: text("ip"),
  },
  (t) => [index("audit_log_at_idx").on(t.at)],
);
