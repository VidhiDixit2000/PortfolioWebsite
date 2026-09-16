"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/components/DetailView";
import { profile, skills } from "@/data/profile";

const RESUME_PDF_URL = "/resume/Vidhi-Dixit-Resume.pdf";

export function ResumeContent() {
  const skillEntries = Object.entries(skills);
  return (
    <div className="flex flex-col gap-8">
      <motion.p {...blurIn(0)} className="text-20">
        {profile.summary}
      </motion.p>
      {skillEntries.map(([category, items], i) => (
        <motion.div key={category} {...blurIn(i + 1)}>
          <h2 className="font-display text-20 font-normal tracking-tight">
            {category}
          </h2>
          <p className="mt-1 text-16">{items.join(", ")}</p>
        </motion.div>
      ))}
      <motion.a
        {...blurIn(skillEntries.length + 1)}
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
