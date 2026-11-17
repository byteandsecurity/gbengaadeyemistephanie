import type { Credential, Profile, Recognition } from "./types";

export const profile: Profile = {
  name: "Stephanie Temitayo Gbenga-Adeyemi",
  shortName: "Stephanie Gbenga-Adeyemi",
  headline: "Building secure platforms and seamless experiences.",
  intro:
    "First-class Computer Science graduate working across software engineering and cybersecurity governance, risk and compliance.",
  about: [
    "I'm a Computer Science graduate (B.Sc., Afe Babalola University, 2024, CGPA 4.83 out of 5.00). I've built front-end features for live products at Sidmach Technologies, made mobile apps with React Native, and completed hands-on governance, risk and incident-response work through the Ubuntu Bridge Initiative and the Google Cybersecurity Professional Certificate.",
    "The mix is deliberate. My final year project was a biometric mobile voting system, and my internship at ChamsMobile was biometric testing and research on Android and iOS. That work showed me how technical implementation, governance requirements and risk management have to work together for a system to be secure.",
    "I'm looking for entry-level roles in governance, risk and compliance, cyber governance, or secure digital product delivery.",
  ],
  email: "Stephanie.T.Gbenga-Adeyemi@outlook.com",
  linkedin: "https://www.linkedin.com/in/gbenga-adeyemistephanie/",
  github: "https://github.com/Stephani-e",
  focusAreas: [
    "Governance, risk and compliance foundations",
    "Secure digital systems and risk-aware design",
    "Biometric security and identity systems",
    "Technology policy and regulatory awareness",
    "UI systems and digital platform implementation",
    "Agile project delivery",
  ],
  panels: {
    software: {
      title: "Software engineering",
      lead: "Front-end and mobile products in React, Next.js and React Native.",
      proof: [
        "Front-End Developer at Sidmach Technologies (NYSC, 2025)",
        "Biometric mobile voting system, final year project",
        "Two mobile apps and a community platform in development",
      ],
      cta: "See the software work",
    },
    security: {
      title: "Cybersecurity and GRC",
      lead: "Risk, evidence and incident response, documented so others can act on it.",
      proof: [
        "ISC2 Certified in Cybersecurity",
        "Cyber Core Associate, Ubuntu Bridge Initiative: Stage 7, top 12 of Cohort 1",
        "22 hands-on projects from the Google Cybersecurity Professional Certificate",
      ],
      cta: "See the security work",
    },
  },
};

export const credentials: Credential[] = [
  {
    id: "isc2-cc",
    name: "Certified in Cybersecurity (CC)",
    issuer: "ISC2",
    detail: "Valid July 2025 to June 2028",
    pages: ["home", "security"],
  },
  {
    id: "google-cyber",
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Coursera",
    detail:
      "April 2026. Hands-on Python, SQL and Linux for threat detection and incident response.",
    pages: ["home", "security"],
  },
  {
    id: "agile",
    name: "Project Management Training (Agile and Scrum)",
    issuer: "Septa Academy",
    detail: "February 2026. Three months of structured training in Agile delivery and Scrum.",
    pages: ["home"],
  },
  {
    id: "isc2-member",
    name: "ISC2 Member",
    issuer: "ISC2",
    detail: "Professional membership",
    pages: ["security"],
  },
  {
    id: "cpn",
    name: "Graduate Member",
    issuer: "Computer Professionals of Nigeria",
    detail: "2024 to present",
    pages: ["home", "security"],
  },
];

export const recognition: Recognition[] = [
  {
    id: "first-class",
    title: "First-Class Honours, Computer Science",
    detail: "Afe Babalola University, 2024",
  },
  {
    id: "founders",
    title: "Founder's Award List",
    detail: "Afe Babalola University",
  },
  {
    id: "cossa",
    title: "COSSA Executive of the Year",
    detail: "2022 to 2023, as General Secretary",
  },
  {
    id: "best-student",
    title: "Best Graduating Student",
    detail: "Shiloh Hills International School, 2020",
  },
];
