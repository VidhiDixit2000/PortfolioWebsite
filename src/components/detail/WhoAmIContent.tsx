"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { blurIn } from "@/components/DetailView";

/** These pastel tint panels keep their own dark ink text regardless of
 * whatever theme the surrounding page is on (DetailView's content wrapper
 * currently forces a light --color-outline/text-cream for its dark
 * "neon" background) — light-on-light was unreadable here otherwise.
 * Resetting --color-outline locally also fixes any text-outline/* utility
 * used by children (e.g. the trait pills), since that utility reads the
 * custom property live at its own position in the tree. */
const PANEL_TEXT: CSSProperties = {
  color: "#2a2440",
  ["--color-outline" as string]: "#2a2440",
};

/** Deeper tints than ProjectStory's original pale versions — needed to
 * read clearly against the page's dark "neon" background. blue/orange
 * match the confirmed card-blue/card-orange tokens; mint is a matching
 * depth for a hue that doesn't have its own card token. Deliberately no
 * pink tint here — this card's own heading swatch (accentColor) is
 * card-pink, so no container on this page should reuse that color. */
const TINT = {
  blue: "#A9D4E4",
  orange: "#F2A661",
  mint: "#BFE3DC",
};

// Placeholder copy — swap in the real bio.
const BIO_LINES = [
  "Full stack AI engineer who likes building things that actually ship, not just demo well.",
  "Spends most days somewhere between a model's prompt and a user's screen, making sure the two agree with each other.",
  "[Placeholder — swap in the real bio: background, what you're into, what you're looking for.]",
];

export function WhoAmIContent() {
  return (
    <motion.article {...blurIn(0)}>
      <header className="mb-10">
        <div
          className="max-w-[560px] rounded-[20px] px-7 py-7"
          style={{ background: TINT.blue, ...PANEL_TEXT }}
        >
          <h3 className="font-display text-[clamp(1.25rem,2.6vw,1.9rem)] leading-[1.15] font-medium tracking-tight">
            A little about me
          </h3>
        </div>
      </header>

      <section
        className="mb-8 rounded-[20px] px-7 pt-7 pb-7 md:max-w-[70%]"
        style={{ background: TINT.orange, ...PANEL_TEXT }}
      >
        <div className="flex flex-col gap-3">
          {BIO_LINES.map((line, i) => (
            <p key={i} className="max-w-[56ch] text-16 font-medium">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section
        className="rounded-[20px] p-7"
        style={{ background: TINT.mint, ...PANEL_TEXT }}
      >
        <div className="flex aspect-video items-center justify-center rounded-[14px] bg-paper p-4 text-center text-14 font-medium text-outline/50">
          Intro video coming soon
        </div>
      </section>
    </motion.article>
  );
}
