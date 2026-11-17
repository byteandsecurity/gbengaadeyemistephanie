// Content model for the portfolio.
// Every collection below maps one-to-one to a database collection, so the
// planned admin side can read and write the same shapes without changing pages.

export type Status = "Completed" | "In progress" | "Pre-launch";

export interface Profile {
  name: string;
  shortName: string;
  headline: string;
  intro: string;
  about: string[];
  email: string;
  linkedin: string;
  github: string;
  focusAreas: string[];
  panels: {
    software: Panel;
    security: Panel;
  };
}

export interface Panel {
  title: string;
  lead: string;
  proof: string[];
  cta: string;
}

export interface Credential {
  id: string;
  name: string;
  issuer: string;
  detail: string;
  /** Where the entry appears: the landing page and/or the security page */
  pages: Array<"home" | "security">;
}

export interface Recognition {
  id: string;
  title: string;
  detail: string;
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  place?: string;
  period: string;
  status?: Status;
  summary?: string;
  bullets: string[];
  page: "software" | "security";
}

export interface Project {
  id: string;
  title: string;
  status: Status;
  period?: string;
  stack: string[];
  description: string;
  highlights: string[];
}

export interface Research {
  id: string;
  title: string;
  context: string;
  summary: string;
  pages: Array<"software" | "security">;
}

export interface Stage {
  id: string;
  stage: number;
  title: string;
  score?: string;
  detail: string;
}

export interface LabProject {
  id: string;
  number: number;
  title: string;
  group: "Governance, risk and compliance" | "Network and incident analysis" | "Detection and response" | "Tooling and professional practice";
  summary: string;
  tags: string[];
}
