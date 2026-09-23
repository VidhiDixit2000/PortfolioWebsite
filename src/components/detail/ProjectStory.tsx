"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { blurIn } from "@/components/DetailView";
import type { Project } from "@/data/projects";

/** Deeper tints than the original pale versions — needed to read clearly
 * against the page's dark "neon" background. blue/pink match the
 * confirmed card-blue/card-pink tokens; mint is a matching depth for a
 * hue that doesn't have its own card token. Deliberately no orange/peach
 * tint here — the Projects card's own heading swatch (accentColor) is
 * card-orange, so no container on this page should reuse that color. */
const TINT = {
  blue: "#A9D4E4",
  pink: "#F6B0DF",
  mint: "#BFE3DC",
};

/** These panels keep their own dark ink text regardless of the
 * surrounding page's theme — DetailView's content wrapper now forces a
 * light --color-outline/text-cream for its dark "neon" background, which
 * would otherwise wash out these light pastel panels' text to
 * light-on-light. Resetting --color-outline locally also fixes any
 * text-outline/* utility used by descendants (tags, GIF caption, pipeline
 * chips), since that utility reads the custom property live at its own
 * position in the tree. */
const PANEL_TEXT: CSSProperties = {
  color: "#2a2440",
  ["--color-outline" as string]: "#2a2440",
};

type ProjectStoryProps = {
  project: Project;
  index: number;
};

export function ProjectStory({ project, index }: ProjectStoryProps) {
  const story = project.story;
  if (!story) return null;

  return (
    <motion.article {...blurIn(index)} className="mb-20 last:mb-0 md:mb-28">
      {/* Title + one-line summary */}
      <header className="mb-14 md:mb-20">
        <div className="max-w-[560px]" style={PANEL_TEXT}>
          <div className="rounded-[20px] bg-card-blue px-7 pt-3 pb-6">
            <span className="mb-2 inline-block rounded-[10px] bg-olive-deep px-3 pt-1 pb-1 font-display text-14 text-cream">
              {story.chip}
            </span>
            <h3 className="font-display text-[clamp(1.25rem,2.6vw,1.9rem)] leading-[1.15] font-medium tracking-tight">
              {story.displayTitle ?? project.title}
            </h3>
          </div>
          <div
            className="-mt-4 ml-10 rounded-[14px] px-6 pt-7 pb-5"
            style={{ background: TINT.blue, ...PANEL_TEXT }}
          >
            <p className="max-w-[44ch] text-16 font-medium">{story.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-paper px-3 py-0.5 text-14 font-medium text-outline/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Problem + Approach, overlapping — the overlap only ever eats into
          Problem's own bottom padding (never its text), since Approach's
          negative margin is smaller than that padding regardless of how
          long Problem's copy runs. */}
      <section className="mb-16 md:mb-24">
        <div
          className="rounded-[20px] px-7 pt-7 pb-16 md:max-w-[62%] md:pb-20"
          style={{ background: TINT.pink, ...PANEL_TEXT }}
        >
          <h4 className="mb-3 flex items-center gap-3 font-display text-20 font-medium">
            <span
              className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#D671B3] text-xl"
              aria-hidden="true"
            >
              🧩
            </span>
            Problem
          </h4>
          <div className="flex flex-col gap-3">
            {story.problem.map((paragraph, i) => (
              <p key={i} className="max-w-[52ch] text-16 font-medium">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Wraps just the Approach card, so the GIF (positioned relative
            to this wrapper) centers on Approach's own height instead of
            the whole Problem+Approach section. */}
        <div
          className="relative mt-6 md:mt-[-2.75rem] md:ml-[38%]"
          style={PANEL_TEXT}
        >
          <div
            className="relative z-10 rounded-[20px] p-7 shadow-[0_14px_34px_-8px_rgba(42,36,64,0.18)]"
            style={{ background: TINT.blue }}
          >
            <h4 className="mb-3 flex items-center gap-3 font-display text-20 font-medium">
              <span
                className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#5B9DBE] text-xl"
                aria-hidden="true"
              >
                🛠️
              </span>
              Approach
            </h4>
            <div className="flex flex-col gap-3">
              {story.approachIntro.map((paragraph, i) => (
                <p key={i} className="max-w-[52ch] text-16 font-medium">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="my-4 flex flex-col gap-2">
              {story.pipeline.map((row, ri) => (
                <div
                  key={ri}
                  className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-14 font-medium"
                  aria-label="Pipeline stages"
                >
                  {row.map((step, i) => (
                    <span key={step} className="flex items-center gap-1.5">
                      <span className="rounded-lg bg-paper px-2.5 py-1">{step}</span>
                      {i < row.length - 1 && (
                        <span className="text-outline/50" aria-hidden="true">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              ))}
              {story.pipelineNote && (
                <p className="text-13 font-medium text-outline/60">{story.pipelineNote}</p>
              )}
            </div>
            {story.approachDetails && (
              <div className="mb-4 flex flex-col gap-3">
                {story.approachDetails.map((paragraph, i) => (
                  <p key={i} className="max-w-[52ch] text-16 font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {story.fixesIntro && (
              <p className="max-w-[52ch] text-16 font-medium">{story.fixesIntro}</p>
            )}
            <ul className="mt-2 flex flex-col gap-1.5">
              {story.fixes.map((fix, i) => (
                <li
                  key={i}
                  className="ml-5 max-w-[52ch] list-disc list-outside text-16 font-medium"
                >
                  {fix}
                </li>
              ))}
            </ul>
          </div>

          {/* Left of Approach, vertically centered on it. */}
          <figure className="relative z-20 mx-auto mt-6 w-[170px] rotate-[-3deg] md:absolute md:top-1/2 md:left-[-190px] md:mx-0 md:mt-0 md:-translate-y-1/2">
            <div
              className="flex aspect-square items-center justify-center overflow-hidden rounded-[20px] bg-paper p-3 text-center text-13 font-medium text-outline/50 shadow-[0_14px_34px_-8px_rgba(42,36,64,0.18)]"
              aria-hidden={!story.gifSrc}
            >
              {story.gifSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={story.gifSrc}
                  alt=""
                  className="h-full w-full rounded-[14px] object-contain"
                />
              ) : (
                "GIF\n(coming soon)"
              )}
            </div>
            {story.gifCaption && (
              <figcaption className="mt-2 text-center text-13 font-medium text-outline/60">
                {story.gifCaption}
              </figcaption>
            )}
          </figure>
        </div>
      </section>

      {/* Result + media */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center">
        <div
          className="relative z-10 rounded-[20px] p-7 shadow-[0_14px_34px_-8px_rgba(42,36,64,0.18)]"
          style={{ background: TINT.blue, ...PANEL_TEXT }}
        >
          <h4 className="mb-3 flex items-center gap-3 font-display text-20 font-medium">
            <span
              className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#D9832E] text-xl"
              aria-hidden="true"
            >
              🚀
            </span>
            Result
          </h4>
          <ul className="flex flex-col gap-2">
            {story.result.map((point, i) => (
              <li key={i} className="ml-5 list-disc list-outside text-16 font-medium">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-[20px] p-7 md:-ml-10"
          style={{ background: TINT.mint, ...PANEL_TEXT }}
        >
          <div className="flex aspect-video items-center justify-center rounded-[14px] bg-paper p-4 text-center text-14 font-medium text-outline/50">
            {story.mediaSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={story.mediaSrc}
                alt=""
                className="h-full w-full rounded-[10px] object-contain"
              />
            ) : (
              story.mediaCaption ?? "Demo video / GIF"
            )}
          </div>
        </div>
      </section>

      {((story.links && story.links.length > 0) || project.githubUrl) && (
        <nav className="mt-8 flex flex-wrap gap-3">
          {story.links?.map((link, i) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={
                i === 0
                  ? "inline-block rounded-xl bg-coral px-5 py-2.5 font-medium text-cream hover:opacity-90"
                  : "inline-block rounded-xl border-2 border-outline px-5 py-2.5 font-medium text-outline hover:bg-paper hover:text-[#2a2440]"
              }
            >
              {i === 0 ? `▶ ${link.label}` : link.label}
            </a>
          ))}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-xl border-2 border-outline px-5 py-2.5 font-medium text-outline hover:bg-paper hover:text-[#2a2440]"
            >
              View on GitHub →
            </a>
          )}
        </nav>
      )}
    </motion.article>
  );
}
