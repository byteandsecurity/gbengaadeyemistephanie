import type { LabProject, Stage } from "./types";

// Ubuntu Bridge Initiative stages are a real sequence, so they keep their numbers.
export const stages: Stage[] = [
  {
    id: "ubi-0",
    stage: 0,
    title: "Cybersecurity foundations",
    score: "87/100",
    detail:
      "Showed proficiency across core cybersecurity concepts, threat models and security principles to qualify for the advanced track.",
  },
  {
    id: "ubi-1",
    stage: 1,
    title: "Applied cryptography",
    score: "96/100",
    detail:
      "Analysed cryptographic implementations, token verification and secure configuration, scoring 96% on live enterprise brief evaluations.",
  },
  {
    id: "ubi-2",
    stage: 2,
    title: "Web application security",
    score: "87/100",
    detail:
      "Ran full enterprise web application assessments: filtered out decoys to find the core vulnerabilities, reconstructed exploit chains from initial access to data exfiltration, scored severity and wrote remediation plans developers could act on.",
  },
  {
    id: "ubi-3",
    stage: 3,
    title: "Incident response and DFIR",
    score: "82/100",
    detail:
      "Wrote analyst playbooks, rebuilt attack timelines from raw system logs, planned containment without business downtime and authored incident post-mortem.",
  },
  {
    id: "ubi-4",
    stage: 4,
    title: "Governance and risk",
    score: "90/100",
    detail:
      "Wrote practical organisational security policies, delivered board-level risk briefings in business language, mapped controls to ISO 27001 and measured security improvement after remediation.",
  },
  {
    id: "ubi-5",
    stage: 5,
    title: "Signal Practitioner: policy as code",
    detail:
      "Wrote Open Policy Agent (Rego) policy bundles that turn compliance rules into machine-readable checks. Expired or incomplete exceptions fail closed.",
  },
  {
    id: "ubi-6",
    stage: 6,
    title: "Exposure Operator: vendor risk verification",
    detail:
      "Audited third-party vendor exports and found stale data, duplicate audit events, broken cryptographic hash chains and premature deletion reporting, then issued objective compliance verdicts.",
  },
  {
    id: "ubi-7",
    stage: 7,
    title: "Architecture: automated evidence auditing",
    detail:
      "Built an evidence collector that verifies file hashes, timestamps, ownership and ticket histories. Audit sampling is deterministic, and missing evidence fails closed so it cannot produce a conforming verdict.",
  },
];

// Google Cybersecurity Professional Certificate projects (numbers follow the lab portfolio).
export const labs: LabProject[] = [
  {
    id: "lab-2",
    number: 2,
    title: "Internal security audit: Botium Toys",
    group: "Governance, risk and compliance",
    summary:
      "Audited a fictional retailer against the NIST Cybersecurity Framework. Found no encryption of card data, no intrusion detection, no backups and no least privilege, rated the risk 8 out of 10 and set out the fixes.",
    tags: ["NIST CSF", "PCI DSS", "GDPR", "SOC"],
  },
  {
    id: "lab-10",
    number: 10,
    title: "Home office asset inventory",
    group: "Governance, risk and compliance",
    summary:
      "Catalogued six networked devices, recorded owner, location and how each connects, and classified each by sensitivity.",
    tags: ["Asset management", "CIA triad"],
  },
  {
    id: "lab-11",
    number: 11,
    title: "Risk register: commercial bank",
    group: "Governance, risk and compliance",
    summary:
      "Scored five risks by likelihood times severity. A publicly accessible database of backups ranked highest.",
    tags: ["Risk register", "Prioritisation"],
  },
  {
    id: "lab-12",
    number: 12,
    title: "Data leak and least privilege: EdTech company",
    group: "Governance, risk and compliance",
    summary:
      "Traced a leaked internal folder to access that was never revoked. Applied NIST SP 800-53 AC-6 and recommended expiring shares, role-based access and regular privilege reviews.",
    tags: ["NIST SP 800-53", "Least privilege"],
  },
  {
    id: "lab-13",
    number: 13,
    title: "Access control review: payroll incident",
    group: "Governance, risk and compliance",
    summary:
      "Matched an event log to an employee directory and traced a suspicious payroll transfer to a contractor account that had admin rights and had been past its end date since 2019.",
    tags: ["Access control", "Account lifecycle"],
  },
  {
    id: "lab-14",
    number: 14,
    title: "Vulnerability assessment: public database server",
    group: "Governance, risk and compliance",
    summary:
      "Rated threats to an internet-exposed database for an e-commerce company and proposed taking it off the public internet, with MFA, least privilege, logging and TLS.",
    tags: ["Risk assessment", "Defence in depth"],
  },
  {
    id: "lab-15",
    number: 15,
    title: "USB baiting risk assessment: hospital",
    group: "Governance, risk and compliance",
    summary:
      "Assessed what a found USB drive reveals to an attacker and how it could be used for phishing, with endpoint controls and training as mitigations.",
    tags: ["Social engineering", "Endpoint controls"],
  },
  {
    id: "lab-16",
    number: 16,
    title: "PASTA threat model: sneaker marketplace app",
    group: "Governance, risk and compliance",
    summary:
      "Applied the seven-stage PASTA framework to a payments app, identifying SQL injection and weak API authorisation, and set out controls for each.",
    tags: ["PASTA", "Threat modelling", "PCI DSS"],
  },
  {
    id: "lab-3",
    number: 3,
    title: "DNS and ICMP traffic analysis: website outage",
    group: "Network and incident analysis",
    summary:
      "Read tcpdump output showing ICMP errors for UDP port 53 and concluded the DNS service on the server was down, misconfigured or blocked.",
    tags: ["tcpdump", "DNS", "ICMP"],
  },
  {
    id: "lab-4",
    number: 4,
    title: "SYN flood denial of service: travel agency web server",
    group: "Network and incident analysis",
    summary:
      "Identified a SYN flood from packet captures, explained how half-open connections exhausted the server, and documented the short-term response and longer-term prevention.",
    tags: ["Wireshark", "TCP handshake", "DoS"],
  },
  {
    id: "lab-5",
    number: 5,
    title: "Web compromise by brute force",
    group: "Network and incident analysis",
    summary:
      "Followed DNS and HTTP traffic through a compromise caused by a default admin password, wrote the incident report and recommended login-attempt limits and lockout.",
    tags: ["tcpdump", "Incident report", "Brute force"],
  },
  {
    id: "lab-6",
    number: 6,
    title: "Network hardening: social media organisation",
    group: "Network and incident analysis",
    summary:
      "Turned four weaknesses (shared passwords, default admin password, open firewall rules, no MFA) into hardening steps and explained why each works.",
    tags: ["MFA", "Firewall rules", "Password policy"],
  },
  {
    id: "lab-7",
    number: 7,
    title: "NIST CSF incident report: ICMP DDoS attack",
    group: "Network and incident analysis",
    summary:
      "Wrote an Identify, Protect, Detect, Respond and Recover plan for a two-hour outage caused by an unconfigured firewall.",
    tags: ["NIST CSF", "DDoS", "IDS/IPS"],
  },
  {
    id: "lab-18",
    number: 18,
    title: "Wireshark and tcpdump compared",
    group: "Network and incident analysis",
    summary:
      "Compared the two analysers by interface, resource use and typical scenario, including capturing with tcpdump on a server and reviewing in Wireshark.",
    tags: ["Wireshark", "tcpdump"],
  },
  {
    id: "lab-17",
    number: 17,
    title: "Incident handler's journal",
    group: "Detection and response",
    summary:
      "Eight dated entries from 26 March to 9 April 2026, each using the 5 W's: a ransomware attack on a clinic, then Wireshark, tcpdump, VirusTotal, a phishing playbook, a breach report review, Suricata and Python.",
    tags: ["Ransomware", "Suricata", "5 W's"],
  },
  {
    id: "lab-19",
    number: 19,
    title: "Malware analysis with VirusTotal",
    group: "Detection and response",
    summary:
      "Confirmed a phishing attachment as Flagpro malware linked to the BlackTech group, and mapped hashes, host artefacts and techniques on the Pyramid of Pain.",
    tags: ["VirusTotal", "IoCs", "MITRE ATT&CK"],
  },
  {
    id: "lab-20",
    number: 20,
    title: "Phishing alert triage and escalation",
    group: "Detection and response",
    summary:
      "Worked ticket A-2703 through a phishing playbook, spotted the sender and content red flags, and escalated to a level-two analyst with the reasoning recorded.",
    tags: ["Playbook", "SOC", "Ticketing"],
  },
  {
    id: "lab-22",
    number: 22,
    title: "Log triage with NotebookLM",
    group: "Detection and response",
    summary:
      "Used AI-assisted questions to find the riskiest events in a log: a finance file copied to a public share and repeated guest login failures from one IP.",
    tags: ["Log analysis", "Insider risk"],
  },
  {
    id: "lab-8",
    number: 8,
    title: "File permissions in Linux",
    group: "Tooling and professional practice",
    summary:
      "Audited permissions with ls and used chmod to remove write access for others, lock an archived file and restrict a drafts directory to one user.",
    tags: ["Linux", "chmod", "Least privilege"],
  },
  {
    id: "lab-9",
    number: 9,
    title: "SQL filters on login activity",
    group: "Tooling and professional practice",
    summary:
      "Queried login attempts and employee records with AND, OR, NOT and LIKE to scope an after-hours incident and target security updates.",
    tags: ["SQL", "MariaDB"],
  },
  {
    id: "lab-21",
    number: 21,
    title: "Python algorithm to update an access allow list",
    group: "Tooling and professional practice",
    summary:
      "Wrote a reusable function that reads an IP allow list, removes revoked addresses and rewrites the file.",
    tags: ["Python", "Automation", "Access control"],
  },
  {
    id: "lab-1",
    number: 1,
    title: "Professional statement",
    group: "Tooling and professional practice",
    summary:
      "Wrote the short statement that positions my background around risk-aware thinking and security by design.",
    tags: ["Communication"],
  },
];
