import "server-only";
import type { PgTable } from "drizzle-orm/pg-core";
import * as t from "@/db/schema";
import { bookkeepingFields, type Field } from "./fields";

export interface Collection {
  slug: string;
  label: string;
  singular: string;
  /** Where visitors see these items */
  appearsOn: string;
  table: PgTable;
  titleField: string;
  subtitleField?: string;
  fields: Field[];
}

const STATUSES = ["Completed", "In progress", "Pre-launch"];

export const profileFields: Field[] = [
  { name: "name", label: "Full name", type: "text", required: true },
  { name: "shortName", label: "Short name", type: "text", required: true, help: "Shown in the header and browser tab." },
  { name: "headline", label: "Headline", type: "text", required: true, max: 160 },
  { name: "intro", label: "Intro sentence", type: "textarea", required: true, rows: 3 },
  { name: "about", label: "About paragraphs", type: "paragraphs", required: true, rows: 12, help: "Separate paragraphs with a blank line." },
  { name: "focusAreas", label: "Where I work", type: "lines", required: true, rows: 6, help: "One per line." },
  { name: "email", label: "Contact email", type: "text", required: true },
  { name: "linkedin", label: "LinkedIn link", type: "url", required: true },
  { name: "github", label: "GitHub link", type: "url", required: true },
  { name: "softwareTitle", label: "Software panel: title", type: "text", required: true },
  { name: "softwareLead", label: "Software panel: lead", type: "textarea", required: true, rows: 3 },
  { name: "softwareProof", label: "Software panel: proof points", type: "lines", required: true, rows: 4, help: "One per line." },
  { name: "softwareCta", label: "Software panel: button text", type: "text", required: true },
  { name: "securityTitle", label: "Security panel: title", type: "text", required: true },
  { name: "securityLead", label: "Security panel: lead", type: "textarea", required: true, rows: 3 },
  { name: "securityProof", label: "Security panel: proof points", type: "lines", required: true, rows: 4, help: "One per line." },
  { name: "securityCta", label: "Security panel: button text", type: "text", required: true },
];

export const collections: Collection[] = [
  {
    slug: "experience",
    label: "Experience",
    singular: "role",
    appearsOn: "Software page or Cybersecurity page",
    table: t.experience,
    titleField: "role",
    subtitleField: "org",
    fields: [
      { name: "page", label: "Shows on", type: "select", options: ["software", "security"], required: true, help: "software = Software page, security = Cybersecurity page." },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "org", label: "Organisation", type: "text", required: true },
      { name: "place", label: "Place", type: "text" },
      { name: "period", label: "Period", type: "text", required: true, help: "For example: Mar 2025 to Dec 2025" },
      { name: "status", label: "Status", type: "select", options: STATUSES },
      { name: "summary", label: "Summary", type: "textarea", rows: 3 },
      { name: "bullets", label: "Bullet points", type: "lines", rows: 8, help: "One per line." },
      ...bookkeepingFields,
    ],
  },
  {
    slug: "projects",
    label: "Software projects",
    singular: "project",
    appearsOn: "Software page",
    table: t.projects,
    titleField: "title",
    subtitleField: "status",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: STATUSES, required: true },
      { name: "period", label: "Period or context", type: "text" },
      { name: "stack", label: "Stack", type: "commas", help: "Separate with commas." },
      { name: "description", label: "Description", type: "textarea", required: true, rows: 5 },
      { name: "highlights", label: "Highlights", type: "lines", rows: 6, help: "One per line." },
      ...bookkeepingFields,
    ],
  },
  {
    slug: "research",
    label: "Research summaries",
    singular: "summary",
    appearsOn: "Software and/or Cybersecurity page",
    table: t.research,
    titleField: "title",
    subtitleField: "context",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "context", label: "Context", type: "text", required: true, help: "For example: ChamsMobile, 2023" },
      { name: "summary", label: "Summary", type: "textarea", required: true, rows: 6 },
      { name: "pages", label: "Shows on", type: "checkboxes", options: ["software", "security"], required: true },
      ...bookkeepingFields,
    ],
  },
  {
    slug: "stages",
    label: "Ubuntu Bridge stages",
    singular: "stage",
    appearsOn: "Cybersecurity page",
    table: t.stages,
    titleField: "title",
    subtitleField: "score",
    fields: [
      { name: "stage", label: "Stage number", type: "number", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "score", label: "Score", type: "text", help: "For example: 90/100. Leave empty if there is none." },
      { name: "detail", label: "What you did", type: "textarea", required: true, rows: 5 },
      ...bookkeepingFields,
    ],
  },
  {
    slug: "labs",
    label: "Lab projects",
    singular: "lab project",
    appearsOn: "Cybersecurity page",
    table: t.labProjects,
    titleField: "title",
    subtitleField: "groupName",
    fields: [
      { name: "number", label: "Project number", type: "number", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "groupName",
        label: "Group",
        type: "select",
        required: true,
        options: [
          "Governance, risk and compliance",
          "Network and incident analysis",
          "Detection and response",
          "Tooling and professional practice",
        ],
      },
      { name: "summary", label: "Summary", type: "textarea", required: true, rows: 4 },
      { name: "tags", label: "Tags", type: "commas", help: "Separate with commas." },
      ...bookkeepingFields,
    ],
  },
  {
    slug: "credentials",
    label: "Certifications and memberships",
    singular: "credential",
    appearsOn: "Landing page and/or Cybersecurity page",
    table: t.credentials,
    titleField: "name",
    subtitleField: "issuer",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "issuer", label: "Issuer", type: "text", required: true },
      { name: "detail", label: "Detail", type: "text", required: true, help: "For example: Valid Jul 2025 to Jun 2028" },
      { name: "pages", label: "Shows on", type: "checkboxes", options: ["home", "security"], required: true, help: "home = Landing page, security = Cybersecurity page." },
      ...bookkeepingFields,
    ],
  },
  {
    slug: "recognition",
    label: "Honours",
    singular: "honour",
    appearsOn: "Landing page",
    table: t.recognition,
    titleField: "title",
    subtitleField: "detail",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "detail", label: "Detail", type: "text", required: true },
      ...bookkeepingFields,
    ],
  },
];

export function findCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
