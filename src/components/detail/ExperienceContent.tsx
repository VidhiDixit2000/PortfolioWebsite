"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/components/DetailView";
import { experience } from "@/data/experience";

export function ExperienceContent() {
  return (
    <div className="flex flex-col gap-10">
      {experience.map((entry, i) => (
        <motion.div
          key={entry.id}
          {...blurIn(i)}
          className="relative border-l-2 border-outline pl-6"
        >
          <span className="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 border-outline bg-cream" />
          <p className="text-14 font-medium tracking-tight text-outline/70 uppercase">
            {entry.period}
          </p>
          <h2 className="font-display text-20 font-normal tracking-tight">
            {entry.role}
          </h2>
          <p className="text-16 font-medium">{entry.company}</p>
          <ul className="mt-3 flex flex-col gap-2 text-16">
            {entry.highlights.map((bullet, bi) => (
              <li key={bi} className="ml-5 list-disc list-outside">
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
