"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type DetailViewProps = {
  title: string;
  /** The source card's fill class (e.g. "bg-card-blue"). Rendered as a
   * swatch behind the heading — a carried-over trace of the card that
   * was clicked — while the rest of the page stays monochrome. */
  accentColor?: string;
  onBack: () => void;
  /** Section-specific body content. Each child element gets the shared
   * blur-in stagger automatically. */
  children: ReactNode;
};

const accentVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// Wipe-reveal + blur-to-sharp settle, standing in for the ink-poured-on
// -paper effect described for detail headings (CLAUDE.md) — a spreading
// blot is hard to fake convincingly with CSS, so this leans on a clip-path
// wipe combined with a heavy blur that resolves, reading as ink bleeding
// in rather than a typewriter reveal. Slowed down and given a much
// heavier starting blur than a first pass had, since a sub-second, subtle
// version was easy to miss entirely rather than read as intentional.
const headingVariants: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", filter: "blur(22px)", opacity: 0.4 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Explicit (not-propagated) blur-in entrance for the item at `index` in
 * a body's reveal order — spread onto a motion element, e.g.
 * `<motion.div {...blurIn(0)}>`. Variant propagation from a parent's
 * staggerChildren isn't reliable in this project (it's what caused the
 * grid-collapse color bug), so every section's content animates itself
 * explicitly instead of inheriting from a shared container. */
export function blurIn(index: number) {
  return {
    initial: { opacity: 0, filter: "blur(8px)", y: 8 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    transition: { duration: 0.4, delay: 0.35 + index * 0.05 },
  };
}

export function DetailView({
  title,
  accentColor,
  onBack,
  children,
}: DetailViewProps) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col gap-8 overflow-y-auto overflow-x-visible px-6 py-16 text-outline md:h-dvh md:px-10"
    >
      <div className="rounded-[20px] border-2 border-outline bg-paper">
        <div className="sticky top-0 z-20 flex flex-col gap-4 rounded-t-[18px] bg-paper px-6 pt-6 pb-4 md:px-10 md:pt-10">
          <motion.button
            type="button"
            onClick={onBack}
            whileHover={{ x: -2 }}
            className="w-fit text-14 font-medium uppercase tracking-tight underline underline-offset-4"
          >
            ← Back
          </motion.button>

          <div className="relative w-fit">
            {accentColor && (
              <motion.div
                aria-hidden="true"
                variants={accentVariants}
                initial="hidden"
                animate="visible"
                className={`absolute -inset-x-3 -inset-y-1.5 z-0 rounded-[16px] ${accentColor}`}
              />
            )}
            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 font-display text-32 font-normal tracking-[-0.02em] md:text-56"
            >
              {title}
            </motion.h1>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-6 pb-6 md:px-10 md:pb-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
