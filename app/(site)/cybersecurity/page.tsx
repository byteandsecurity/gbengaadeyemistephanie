import type { Metadata } from "next";
import { Bullets, PageHero, Row, Section, StatusTag } from "@/components/layout";
import { getCredentials, getExperience, getLabs, getResearch, getStages } from "@/lib/content";
import type { LabProject } from "@/content/types";

export const metadata: Metadata = {
  title: "Cybersecurity and GRC",
  description:
    "ISC2 Certified in Cybersecurity, Cyber Core Associate with the Ubuntu Bridge Initiative, and 22 hands-on projects from the Google Cybersecurity Professional Certificate.",
};

const groupOrder: LabProject["group"][] = [
  "Governance, risk and compliance",
  "Network and incident analysis",
  "Detection and response",
  "Tooling and professional practice",
];

export default async function CybersecurityPage() {
  const [credentials, experience, stages, labs, research] = await Promise.all([
    getCredentials("security"),
    getExperience("security"),
    getStages(),
    getLabs(),
    getResearch("security"),
  ]);

  const ubi = experience.find((e) => e.id === "ubi");
  const others = experience.filter((e) => e.id !== "ubi");

  return (
    <>
      <PageHero
        tone="amber"
        title="Risk, evidence and response, written so others can act on it."
        lead="Certified in Cybersecurity by ISC2, a Cyber Core Associate with the Ubuntu Bridge Initiative, and finished 22 hands-on projects on the Google Cybersecurity Professional Certificate."
        items={credentials.filter((c) => c.id === "isc2-cc" || c.id === "google-cyber").map((c) => c.name)}
        itemsLabel="Certifications"
      />

      <Section
        id="ubi"
        title="Ubuntu Bridge Initiative"
        intro={
          ubi ? (
            <>
              <p className="font-display text-lg font-semibold text-ink">
                {ubi.role}, {ubi.period}
              </p>
              <p className="mt-2">{ubi.summary}</p>
            </>
          ) : undefined
        }
      >
        <ol className="divide-y divide-line border-y border-line">
          {stages.map((s) => (
            <li key={s.id} className="grid gap-x-10 gap-y-1 py-6 md:grid-cols-[14rem_1fr]">
              <div className="flex items-baseline gap-4 md:block">
                <p className="font-display text-4xl font-bold text-amber-deep">Stage {s.stage}</p>
                {s.score ? <p className="text-[0.95rem] text-muted">Score {s.score}</p> : null}
              </div>
              <div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 max-w-2xl">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {others.length > 0 ? (
        <Section title="Experience">
          {others.map((job) => (
            <Row
              key={job.id}
              meta={
                <>
                  <p>{job.period}</p>
                  {job.status ? (
                    <p className="mt-2">
                      <StatusTag status={job.status} tone="amber" />
                    </p>
                  ) : null}
                </>
              }
              title={job.role}
              subtitle={job.org}
            >
              {job.summary ? <p className="mb-4 max-w-2xl text-muted">{job.summary}</p> : null}
              <Bullets items={job.bullets} />
            </Row>
          ))}
        </Section>
      ) : null}

      <Section
        id="labs"
        title="Lab projects"
        intro="Twenty-two simulated scenarios from the Google Cybersecurity Professional Certificate. Each one produced a written assessment, report or script."
      >
        <div className="space-y-14">
          {groupOrder.map((group) => {
            const items = labs.filter((l) => l.group === group);
            return (
              <div key={group}>
                <h3 className="text-2xl font-bold">{group}</h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {items.map((lab) => (
                    <li key={lab.id} className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[6.5rem_1fr_16rem]">
                      <p className="font-display text-[0.95rem] font-semibold text-amber-deep">
                        Project {lab.number}
                      </p>
                      <div>
                        <h4 className="font-display text-lg font-semibold leading-snug">{lab.title}</h4>
                        <p className="mt-1 max-w-2xl text-[0.98rem] text-muted">{lab.summary}</p>
                      </div>
                      <ul className="flex flex-wrap content-start gap-x-3 gap-y-1 text-[0.9rem] text-muted md:justify-end">
                        {lab.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        id="research"
        title="Research"
        intro="Written during my internship at ChamsMobile. These are summaries only."
      >
        {research.map((paper) => (
          <Row key={paper.id} meta={<p>{paper.context}</p>} title={paper.title}>
            <p className="max-w-2xl">{paper.summary}</p>
          </Row>
        ))}
      </Section>
    </>
  );
}
