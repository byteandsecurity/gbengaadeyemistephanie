// Single place the public pages read content from.
//
// With DATABASE_URL set, content comes from Postgres and only items marked
// "published" are returned. Without it, the typed files in /content are used,
// so the site still runs before a database exists.

import "server-only";
import { and, asc, arrayContains, eq } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import * as t from "@/db/schema";
import { credentials as staticCredentials, profile as staticProfile, recognition as staticRecognition } from "@/content/profile";
import { experience as staticExperience, securityExperience as staticSecurityExperience } from "@/content/experience";
import { projects as staticProjects, research as staticResearch } from "@/content/projects";
import { labs as staticLabs, stages as staticStages } from "@/content/security";
import type {
  Credential,
  Experience,
  LabProject,
  Profile,
  Project,
  Recognition,
  Research,
  Stage,
  Status,
} from "@/content/types";

const orEmpty = <T,>(v: T | null): T | undefined => (v === null ? undefined : v);

export async function getProfile(): Promise<Profile> {
  if (!hasDatabase()) return staticProfile;
  const [row] = await getDb().select().from(t.profile).where(eq(t.profile.id, 1));
  if (!row) return staticProfile;
  return {
    name: row.name,
    shortName: row.shortName,
    headline: row.headline,
    intro: row.intro,
    about: row.about,
    email: row.email,
    linkedin: row.linkedin,
    github: row.github,
    brandGithub: row.brandGithub,
    focusAreas: row.focusAreas,
    panels: {
      software: { title: row.softwareTitle, lead: row.softwareLead, proof: row.softwareProof, cta: row.softwareCta },
      security: { title: row.securityTitle, lead: row.securityLead, proof: row.securityProof, cta: row.securityCta },
    },
  };
}

export async function getCredentials(page: "home" | "security"): Promise<Credential[]> {
  if (!hasDatabase()) return staticCredentials.filter((c) => c.pages.includes(page));
  const rows = await getDb()
    .select()
    .from(t.credentials)
    .where(and(eq(t.credentials.published, true), arrayContains(t.credentials.pages, [page])))
    .orderBy(asc(t.credentials.position), asc(t.credentials.createdAt));
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    issuer: r.issuer,
    detail: r.detail,
    pages: r.pages as Credential["pages"],
  }));
}

export async function getRecognition(): Promise<Recognition[]> {
  if (!hasDatabase()) return staticRecognition;
  const rows = await getDb()
    .select()
    .from(t.recognition)
    .where(eq(t.recognition.published, true))
    .orderBy(asc(t.recognition.position), asc(t.recognition.createdAt));
  return rows.map((r) => ({ id: r.id, title: r.title, detail: r.detail }));
}

export async function getExperience(page: "software" | "security"): Promise<Experience[]> {
  if (!hasDatabase()) return page === "software" ? staticExperience : staticSecurityExperience;
  const rows = await getDb()
    .select()
    .from(t.experience)
    .where(and(eq(t.experience.published, true), eq(t.experience.page, page)))
    .orderBy(asc(t.experience.position), asc(t.experience.createdAt));
  return rows.map((r) => ({
    id: r.id,
    role: r.role,
    org: r.org,
    place: orEmpty(r.place),
    period: r.period,
    status: orEmpty(r.status) as Status | undefined,
    summary: orEmpty(r.summary),
    bullets: r.bullets,
    page: r.page as Experience["page"],
  }));
}

export async function getProjects(): Promise<Project[]> {
  if (!hasDatabase()) return staticProjects;
  const rows = await getDb()
    .select()
    .from(t.projects)
    .where(eq(t.projects.published, true))
    .orderBy(asc(t.projects.position), asc(t.projects.createdAt));
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    status: r.status as Status,
    period: orEmpty(r.period),
    stack: r.stack,
    description: r.description,
    highlights: r.highlights,
  }));
}

export async function getResearch(page: "software" | "security"): Promise<Research[]> {
  if (!hasDatabase()) return staticResearch.filter((r) => r.pages.includes(page));
  const rows = await getDb()
    .select()
    .from(t.research)
    .where(and(eq(t.research.published, true), arrayContains(t.research.pages, [page])))
    .orderBy(asc(t.research.position), asc(t.research.createdAt));
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    context: r.context,
    summary: r.summary,
    pages: r.pages as Research["pages"],
  }));
}

export async function getStages(): Promise<Stage[]> {
  if (!hasDatabase()) return staticStages;
  const rows = await getDb()
    .select()
    .from(t.stages)
    .where(eq(t.stages.published, true))
    .orderBy(asc(t.stages.stage), asc(t.stages.position));
  return rows.map((r) => ({
    id: r.id,
    stage: r.stage,
    title: r.title,
    score: orEmpty(r.score),
    detail: r.detail,
  }));
}

export async function getLabs(): Promise<LabProject[]> {
  if (!hasDatabase()) return staticLabs;
  const rows = await getDb()
    .select()
    .from(t.labProjects)
    .where(eq(t.labProjects.published, true))
    .orderBy(asc(t.labProjects.position), asc(t.labProjects.number));
  return rows.map((r) => ({
    id: r.id,
    number: r.number,
    title: r.title,
    group: r.groupName as LabProject["group"],
    summary: r.summary,
    tags: r.tags,
  }));
}
