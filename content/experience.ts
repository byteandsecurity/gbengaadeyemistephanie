import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "sidmach",
    role: "Front-End Developer and Software Intern (NYSC)",
    org: "Sidmach Technologies Nigeria Limited",
    place: "Ikeja, Lagos",
    period: "March to December 2025",
    summary: "Data Fusion Business Unit, working in an Agile team with designers, API and back-end developers.",
    bullets: [
      "Corper Wallet: built responsive interfaces and email templates that give NYSC members mobile-first access to funding services.",
      "YouthPlus Jobs module and admin pages: helped set up the first user flows, then independently shipped new features, fixes and maintenance.",
      "Built a shared set of React and Tailwind CSS components (forms, lists, modals, validation, controls) used across the YouthPlus admin pages and Approval Flow.",
      "Approval Flow revamp: built multi-step approval interfaces, admin dashboards and role-based views for users with different permissions.",
      "Connected the front end to payment, profile, job listing and approval workflow endpoints, handling loading states, errors and validation.",
      "Owned YouthPlus Weekly Email Campaigns, from the Figma designs to the responsive templates.",
    ],
    page: "software",
  },
  {
    id: "byte-security",
    role: "Lead Technical Officer",
    org: "Byte & Security",
    period: "Current",
    status: "Pre-launch",
    summary: "A digital brand that has not launched yet.",
    bullets: [
      "Building the core front end with Next.js and Sanity CMS for headless content management.",
      "Setting the access-control approach for collaborators: mandatory multi-factor authentication and secure credential workflows, following zero-trust principles.",
    ],
    page: "software",
  },
  {
    id: "chams",
    role: "Software Intern",
    org: "ChamsMobile Ltd.",
    place: "Lagos",
    period: "June to September 2023",
    bullets: [
      "Tested biometric authentication on Android and iOS apps, checking how fingerprint and facial recognition behave across devices.",
      "Researched blockchain use cases in mobile finance and digital identity, and wrote up the findings (summaries below).",
    ],
    page: "software",
  },
  {
    id: "mrsoft",
    role: "Software Intern",
    org: "MrSoft",
    place: "Rivers State",
    period: "June to September 2022",
    bullets: ["Developed full-stack web applications with JavaScript during an academic internship."],
    page: "software",
  },
];

export const securityExperience: Experience[] = [
  {
    id: "ubi",
    role: "Cyber Core Associate (Governance, Risk and Compliance)",
    org: "Ubuntu Bridge Initiative (UBI)",
    period: "June to August 2026",
    summary:
      "Advanced to Stage 7 (Architecture) among the top 12 candidates in Cohort 1. Finished in good standing because of the cohort's capacity limits at the advance boundary, and received an automatic Returning-Candidate exemption for future cohorts.",
    bullets: [],
    page: "security",
  },
  {
    id: "byte-security-sec",
    role: "Lead Technical Officer",
    org: "Byte & Security",
    period: "Current",
    status: "Pre-launch",
    summary: "A digital brand that has not launched yet.",
    bullets: [
      "Setting the access-control approach for collaborators: mandatory multi-factor authentication and secure credential workflows, following zero-trust principles.",
    ],
    page: "security",
  },
];
