import type { Metadata } from "next";
import { Bullets, PageHero, Row, Section, StatusTag } from "@/components/layout";
import { getExperience, getProjects, getResearch } from "@/lib/content";

export const metadata: Metadata = {
  title: "Software engineering",
  description:
    "Front-end and mobile work in React, Next.js and React Native: Sidmach Technologies, a biometric voting system and mobile apps.",
};

const stack = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "Tailwind CSS",
  "NativeWind",
  "Appwrite",
  "Zustand",
  "Redux",
  "Sentry",
  "Python",
  "Figma",
  "Git",
  "Jira",
];

export default async function SoftwarePage() {
  const [experience, projects, research] = await Promise.all([
    getExperience("software"),
    getProjects(),
    getResearch("software"),
  ]);

  return (
    <>
      <PageHero
        tone="cobalt"
        title="Interfaces that hold up in real use."
        lead="Responsive web and cross-platform mobile work in React, Next.js and React Native, with security considered from the first screen."
        items={stack}
        itemsLabel="Tools I work with"
      />

      <Section title="Experience">
        {experience.map((job) => (
          <Row
            key={job.id}
            meta={
              <>
                <p>{job.period}</p>
                {job.place ? <p>{job.place}</p> : null}
                {job.status ? (
                  <p className="mt-2">
                    <StatusTag status={job.status} tone="cobalt" />
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

      <Section title="Projects">
        {projects.map((project) => (
          <Row
            key={project.id}
            meta={
              <>
                <p>
                  <StatusTag status={project.status} tone="cobalt" />
                </p>
                {project.period ? <p className="mt-2">{project.period}</p> : null}
                <p className="mt-2">{project.stack.join(", ")}</p>
              </>
            }
            title={project.title}
          >
            <p className="max-w-2xl">{project.description}</p>
            <div className="mt-4">
              <Bullets items={project.highlights} />
            </div>
          </Row>
        ))}
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
