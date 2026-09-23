"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/components/DetailView";
import { ProjectStory } from "@/components/detail/ProjectStory";
import { projects } from "@/data/projects";

export function ProjectsContent() {
  const storyProjects = projects.filter((project) => project.story);
  const simpleProjects = projects.filter((project) => !project.story);

  return (
    <div className="flex flex-col gap-6">
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
