import type { Project, Research } from "./types";

export const projects: Project[] = [
  {
    id: "voting",
    title: "Biometric-based mobile voting system",
    status: "Completed",
    period: "Final year project, Afe Babalola University, 2024",
    stack: ["Fingerprint biometrics", "Facial biometrics", "Minutiae extraction"],
    description:
      "A mobile voting application that combines fingerprint and facial biometric authentication with layered security protocols. It is designed for remote voters, to reduce dependence on physical polling units and external biometric hardware.",
    highlights: [
      "Fingerprint verification uses minutiae extraction.",
      "Usability was validated through simulated trials.",
      "Explores the governance and policy implications of biometric e-voting in the Nigerian context.",
    ],
  },
  {
    id: "movie",
    title: "Movie discovery app",
    status: "Completed",
    stack: ["Expo", "React Native", "Appwrite", "TypeScript", "NativeWind"],
    description:
      "A mobile app for finding and searching trending movies through REST APIs, with sign-in through Appwrite and a modular, NativeWind-styled component set.",
    highlights: [
      "Google OAuth2 sign-in, watchlists, favourites, search and live notifications.",
      "A custom popularity algorithm that recommends titles from engagement signals.",
    ],
  },
  {
    id: "food",
    title: "Food delivery app",
    status: "In progress",
    stack: ["Expo", "React Native", "Appwrite", "TypeScript", "Zustand", "Sentry", "NativeWind"],
    description:
      "A cross-platform ordering app with secure sign-in, category search, product detail pages, a cart and profile management.",
    highlights: [
      "Zustand keeps cart state light and global.",
      "Sentry tracks errors and performance in real time.",
    ],
  },
  {
    id: "community",
    title: "Community platform (church website)",
    status: "In progress",
    stack: ["React", "Next.js", "Tailwind CSS"],
    description:
      "A mobile-first site for a local community, designed to load quickly and stay accessible on low-bandwidth connections.",
    highlights: [
      "Led discovery sessions with stakeholders to define user personas and requirements.",
      "Building an event calendar and media bulletin with a content workflow that non-technical administrators can use.",
    ],
  },
];

export const research: Research[] = [
  {
    id: "android-biometrics",
    title: "How biometric authentication works on Android",
    context: "ChamsMobile Ltd. internship, 2023",
    summary:
      "Explains why Android keeps fingerprint and face data inside the Trusted Execution Environment, where the operating system can ask for a yes or no answer but never read the data. Covers the advantages, known weaknesses such as spoofing and partial-print matching, and practical ways to harden fingerprint authentication.",
    pages: ["software", "security"],
  },
  {
    id: "iphone-biometrics",
    title: "How biometric authentication works on iPhone",
    context: "ChamsMobile Ltd. internship, 2023",
    summary:
      "A walk through Face ID and Touch ID and the Secure Enclave behind them: isolated processor, encrypted memory, hardware-bound keys and anti-replay storage. Also covers the main attack routes (fake prints, phishing, malicious apps, Wi-Fi spoofing) and steps users can take to reduce them.",
    pages: ["software", "security"],
  },
  {
    id: "blockchain-fintech",
    title: "Blockchain technology in mobile financial applications",
    context: "ChamsMobile Ltd. internship, August 2023",
    summary:
      "A long-form study of how blockchain could affect security, scalability and user experience in mobile fintech. It looks at use cases, regulation, case studies and a comparison with traditional systems, and recommends hybrid models, scalable platforms and early compliance work.",
    pages: ["software"],
  },
  {
    id: "mobile-finance-security",
    title: "Securing user data in mobile financial applications",
    context: "ChamsMobile Ltd. internship, 2023",
    summary:
      "Reviews the main threats to mobile finance apps and the controls that answer them: authentication, encryption, secure coding, audits and incident response. Includes the Nigerian regulatory picture (CBN, NDPR, PCI DSS, NCC and AML/CFT) and lessons from real breaches.",
    pages: ["software", "security"],
  },
];
