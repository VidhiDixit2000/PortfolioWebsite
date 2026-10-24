"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { blurIn } from "@/components/DetailView";
import { RepoCard } from "@/components/detail/RepoCard";
import { ProjectStory } from "@/components/detail/ProjectStory";
import { findProjectByRepo, projects } from "@/data/projects";
import type { Repo } from "@/data/repos";

/** Live repos from /api/repos. Any failure leaves this empty, so the card
 * grid simply doesn't render and the case studies below still do. */
function useRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/repos")
      .then((res) => (res.ok ? res.json() : { repos: [] }))
      .then((data: { repos?: Repo[] }) => {
        if (!cancelled && Array.isArray(data.repos)) setRepos(data.repos);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return repos;
}

export function ProjectsContent() {
  const repos = useRepos();
  const storyProjects = projects.filter((project) => project.story);

  // Strongest first: repos with a case study, in the data file's order,
  // then everything else in the route's most-recently-pushed order.
  const cards = repos
    .map((repo) => ({ repo, project: findProjectByRepo(repo.name) }))
    .sort((a, b) => {
      const rank = (project?: (typeof projects)[number]) =>
        project?.story ? projects.indexOf(project) : projects.length;
      return rank(a.project) - rank(b.project);
    });

  // A project that already has a repo card isn't repeated as a plain card.
  const simpleProjects = projects.filter(
    (project) =>
      !project.story &&
      !cards.some((card) => card.project?.id === project.id),
  );

  return (
    <div className="flex flex-col gap-6">
      {cards.length > 0 && (
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mb-20">
          {cards.map(({ repo, project }, i) => (
            <RepoCard
              key={repo.name}
              repo={repo}
              storyProject={project?.story ? project : undefined}
              index={i}
            />
          ))}
        </div>
      )}

      {storyProjects.map((project, i) => (
        <ProjectStory key={project.id} project={project} index={i} />
      ))}

      {simpleProjects.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {simpleProjects.map((project, i) => (
            <motion.div
              key={project.id}
              {...blurIn(i)}
              className="flex flex-col gap-2 rounded-[16px] border-2 border-outline p-5"
            >
              <h2 className="font-display text-20 font-normal tracking-tight">
                {project.title}
              </h2>
              <p className="text-14 font-medium tracking-tight text-outline/70 uppercase">
                {project.stack}
              </p>
              <ul className="mt-1 flex flex-col gap-1.5 text-16">
                {project.bullets.map((bullet, bi) => (
                  <li key={bi} className="ml-5 list-disc list-outside">
                    {bullet}
                  </li>
                ))}
              </ul>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-fit text-14 font-medium tracking-tight underline underline-offset-4 uppercase"
                >
                  View on GitHub →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
