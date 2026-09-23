"use client";

import { motion } from "framer-motion";
import { blurIn, useDetailNavigation } from "@/components/DetailView";
import { experience } from "@/data/experience";
import { profile, skills } from "@/data/profile";

const RESUME_PDF_URL = "/resume/Vidhi-Dixit-Resume.pdf";

export function ExperienceContent() {
  const goToCard = useDetailNavigation();
  const skillEntries = Object.entries(skills);
  const timelineOffset = 1;
  const skillsOffset = timelineOffset + experience.length;

  return (
    <div className="flex flex-col gap-10">
      <motion.p {...blurIn(0)} className="text-20">
        {profile.summary}
      </motion.p>

      {experience.map((entry, i) => (
        <motion.div
          key={entry.id}
          {...blurIn(timelineOffset + i)}
          className="relative border-l-2 border-outline pl-6"
        >
          <span className="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 border-outline bg-cream" />
          <p className="text-14 font-medium tracking-tight text-outline/70 uppercase">
            {entry.period}
          </p>
          <h2 className="font-display text-20 font-normal tracking-tight">
            {entry.role}
          </h2>
          {entry.company && <p className="text-16 font-medium">{entry.company}</p>}
          {entry.description && (
            <p className="mt-2 max-w-[65ch] text-16 text-outline/80">
              {entry.description}
            </p>
          )}
          <ul className="mt-3 flex flex-col gap-2 text-16">
            {entry.highlights.map((bullet, bi) => (
              <li key={bi} className="ml-5 list-disc list-outside">
                {bullet}
              </li>
            ))}
          </ul>

          {entry.projectsLink && (
            <button
              type="button"
              onClick={() => goToCard("card-projects")}
              className="mt-3 w-fit text-14 font-medium tracking-tight underline underline-offset-4 uppercase"
            >
              → See projects
            </button>
          )}

          {entry.videoSrc && (
            <div className="mt-4 max-w-[420px]">
              <video
                src={entry.videoSrc}
                controls
                className="aspect-video w-full rounded-[16px] object-contain"
              />
            </div>
          )}
        </motion.div>
      ))}

      {skillEntries.map(([category, items], i) => (
        <motion.div key={category} {...blurIn(skillsOffset + i)}>
          <h2 className="font-display text-20 font-normal tracking-tight">
            {category}
          </h2>
          <p className="mt-1 text-16">{items.join(", ")}</p>
        </motion.div>
      ))}

      <motion.a
        {...blurIn(skillsOffset + skillEntries.length)}
        href={RESUME_PDF_URL}
        download="Vidhi-Dixit-Resume.pdf"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-fit rounded-[12px] border-2 border-outline bg-olive-deep px-5 py-3 text-16 font-medium text-cream"
      >
        Download Resume (PDF) ↓
      </motion.a>
    </div>
  );
}
