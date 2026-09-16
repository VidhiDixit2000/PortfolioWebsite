"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/components/DetailView";
import { education, certifications } from "@/data/education";

export function EducationContent() {
  return (
    <div className="flex flex-col gap-8">
      {education.map((entry, i) => (
        <motion.div key={entry.id} {...blurIn(i)}>
          <p className="text-14 font-medium tracking-tight text-outline/70 uppercase">
            {entry.period}
          </p>
          <h2 className="font-display text-20 font-normal tracking-tight">
            {entry.degree}
          </h2>
          <p className="text-16 font-medium">{entry.school}</p>
          <p className="mt-2 text-16">{entry.details}</p>
        </motion.div>
      ))}
      {certifications.length > 0 && (
        <motion.div {...blurIn(education.length)}>
          <h2 className="font-display text-20 font-normal tracking-tight">
            Certifications
          </h2>
          <ul className="mt-2 flex flex-col gap-1 text-16">
            {certifications.map((cert) => (
              <li key={cert} className="ml-5 list-disc list-outside">
                {cert}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
