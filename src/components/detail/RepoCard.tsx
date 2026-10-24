"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/components/DetailView";
import { PANEL_TEXT, TINT, storyAnchorId } from "@/components/detail/ProjectStory";
import type { Project } from "@/data/projects";
import { repoDisplayName, repoStackChips, type Repo } from "@/data/repos";

const CARD_TINTS = [TINT.blue, TINT.pink, TINT.mint];

type RepoCardProps = {
  repo: Repo;
  /** The case study for this repo, when there is one — adds "Read the
   * story →", which scrolls to it further down this same detail view. */
  storyProject?: Project;
  index: number;
};

/** Compact, secondary version of the case-study panels (same tints,
 * radius, shadow and type), with the bento cards' hover lift. */
export function RepoCard({ repo, storyProject, index }: RepoCardProps) {
  const chips = repoStackChips(repo);

  function openStory() {
    if (!storyProject) return;
    document
      .getElementById(storyAnchorId(storyProject))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.article
      {...blurIn(index)}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 28px -8px rgba(42, 36, 64, 0.35)",
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      className="flex flex-col gap-2 rounded-[20px] p-5 shadow-[0_14px_34px_-8px_rgba(42,36,64,0.18)]"
      style={{ background: CARD_TINTS[index % CARD_TINTS.length], ...PANEL_TEXT }}
    >
      <h3 className="font-display text-20 leading-tight font-medium tracking-tight capitalize">
        {repoDisplayName(repo.name)}
      </h3>
      {repo.description && (
        <p className="text-14 font-medium">{repo.description}</p>
      )}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-paper px-2.5 py-0.5 text-14 font-medium text-outline/70"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-14 font-medium">
        {storyProject && (
          <button
            type="button"
            onClick={openStory}
            className="rounded-xl bg-coral px-3 py-1.5 text-cream hover:opacity-90"
          >
            Read the story →
          </button>
        )}
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border-2 border-outline px-3 py-1 hover:bg-paper"
          >
            Live site
          </a>
        )}
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border-2 border-outline px-3 py-1 hover:bg-paper"
        >
          GitHub
        </a>
      </div>
    </motion.article>
  );
}
