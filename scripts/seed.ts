// Copies the starting content from /content into the database.
// Safe to run again: rows that already exist are left alone, so your edits are never overwritten.
//   npm run db:seed

import "./env";
import { createDb, createPool } from "@/db/client";
import * as t from "../db/schema";
import { credentials, profile, recognition } from "@/content/profile";
import { experience, securityExperience } from "@/content/experience";
import { projects, research } from "@/content/projects";
import { labs, stages } from "@/content/security";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (put it in .env.local).");
  const pool = createPool(url);
  const db = createDb(pool);

  await db
    .insert(t.profile)
    .values({
      id: 1,
      name: profile.name,
      shortName: profile.shortName,
      headline: profile.headline,
      intro: profile.intro,
      about: profile.about,
      email: profile.email,
      linkedin: profile.linkedin,
      github: profile.github,
      focusAreas: profile.focusAreas,
      softwareTitle: profile.panels.software.title,
      softwareLead: profile.panels.software.lead,
      softwareProof: profile.panels.software.proof,
      softwareCta: profile.panels.software.cta,
      securityTitle: profile.panels.security.title,
      securityLead: profile.panels.security.lead,
      securityProof: profile.panels.security.proof,
      securityCta: profile.panels.security.cta,
    })
    .onConflictDoNothing();

  const counts: Record<string, number> = {};

  const credRows = credentials.map((c, i) => ({ id: c.id, name: c.name, issuer: c.issuer, detail: c.detail, pages: c.pages, position: i }));
  await db.insert(t.credentials).values(credRows).onConflictDoNothing();
  counts.credentials = credRows.length;

  const recRows = recognition.map((r, i) => ({ id: r.id, title: r.title, detail: r.detail, position: i }));
  await db.insert(t.recognition).values(recRows).onConflictDoNothing();
  counts.recognition = recRows.length;

  const expRows = [...experience, ...securityExperience].map((e, i) => ({
    id: e.id,
    page: e.page,
    role: e.role,
    org: e.org,
    place: e.place ?? null,
    period: e.period,
    status: e.status ?? null,
    summary: e.summary ?? null,
    bullets: e.bullets,
    position: i,
  }));
  await db.insert(t.experience).values(expRows).onConflictDoNothing();
  counts.experience = expRows.length;

  const projRows = projects.map((p, i) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    period: p.period ?? null,
    stack: p.stack,
    description: p.description,
    highlights: p.highlights,
    position: i,
  }));
  await db.insert(t.projects).values(projRows).onConflictDoNothing();
  counts.projects = projRows.length;

  const resRows = research.map((r, i) => ({ id: r.id, title: r.title, context: r.context, summary: r.summary, pages: r.pages, position: i }));
  await db.insert(t.research).values(resRows).onConflictDoNothing();
  counts.research = resRows.length;

  const stageRows = stages.map((s, i) => ({ id: s.id, stage: s.stage, title: s.title, score: s.score ?? null, detail: s.detail, position: i }));
  await db.insert(t.stages).values(stageRows).onConflictDoNothing();
  counts.stages = stageRows.length;

  const labRows = labs.map((l, i) => ({ id: l.id, number: l.number, title: l.title, groupName: l.group, summary: l.summary, tags: l.tags, position: i }));
  await db.insert(t.labProjects).values(labRows).onConflictDoNothing();
  counts.lab_projects = labRows.length;

  console.log("Seed complete (existing rows were left untouched):", counts);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
