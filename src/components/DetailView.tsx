
"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/**
 * Lets content inside a DetailView (e.g. "→ See projects" in Experience)
 * jump straight to another card's detail view.
 */
const DetailNavigationContext = createContext<(area: string) => void>(
  () => {},
);

export const DetailNavigationProvider = DetailNavigationContext.Provider;

export function useDetailNavigation() {
  return useContext(DetailNavigationContext);
}

type DetailViewProps = {
  title: string;

  /**
   * The source card's fill class.
   * Rendered as a swatch behind the heading.
   */
  accentColor?: string;

  onBack: () => void;

  /**
   * Section-specific body content.
   */
  children: ReactNode;
};

const accentVariants: Variants = {
  hidden: {
    scale: 0.6,
    opacity: 0,
  },

  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

// Wipe-reveal + blur-to-sharp animation for detail headings.
const headingVariants: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    filter: "blur(22px)",
    opacity: 0.4,
  },

  visible: {
    clipPath: "inset(0 0% 0 0)",
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Explicit blur-in entrance for content at a given index.
 */
export function blurIn(index: number) {
  return {
    initial: {
      opacity: 0,
      filter: "blur(8px)",
      y: 8,
    },

    animate: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },

    transition: {
      duration: 0.4,
      delay: 0.35 + index * 0.05,
    },
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
      {/* Main detail page container — dark "neon blackish" panel, whole
          card (back button + title included). Every content component
          uses text-outline/border-outline utilities throughout, which
          Tailwind v4 compiles as var(--color-outline) — overriding that
          custom property here, rather than editing each component,
          re-points all of that dark-navy text/borders to a light color
          for free. text-cream on the wrapper itself covers the few places
          that rely on plain inheritance instead of an explicit color
          class. */}
      <div
        className="rounded-[20px] border-2 text-cream"
        style={
          {
            background: "#0d0c16",
            borderColor: "#e4574c",
            boxShadow:
              "0 0 22px 2px rgba(228, 87, 76, 0.4), 0 0 60px 12px rgba(228, 87, 76, 0.15)",
            "--color-outline": "#f3ead2",
          } as CSSProperties
        }
      >

        {/* Back section */}
        <div className="sticky top-0 z-20 mb-2 rounded-t-[18px] bg-transparent px-6 py-3 md:px-10 md:py-4">
          <motion.button
            type="button"
            onClick={onBack}
            whileHover={{ x: -2 }}
            className="w-fit text-14 font-medium uppercase tracking-tight underline underline-offset-4"
          >
            ← Back
          </motion.button>
        </div>

        {/* Title section */}
        <div className="px-6 pt-2 pb-10 md:px-10 md:pt-3 md:pb-14">
          {/* ml-5 matches the swatch's -inset-x-5 below — without it, the
              swatch's left edge bleeds 1.25rem past the wrapper's own
              padding (and past where the content below is aligned),
              instead of the padding just being extra breathing room
              between the text and the swatch's edge. */}
          <div className="relative ml-5 w-fit">
            {accentColor && (
              <motion.div
                aria-hidden="true"
                variants={accentVariants}
                initial="hidden"
                animate="visible"
                className={`absolute -inset-x-5 -inset-y-3 z-0 rounded-[12px] ${accentColor}`}
              />
            )}

            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              // Pinned dark when there's a pastel accentColor swatch
              // behind this heading (same reasoning as the pastel panels
              // below — light text on a light swatch washes out);
              // otherwise left to inherit the wrapper's light color.
              style={accentColor ? { color: "#2a2440" } : undefined}
              // Smaller than the design scale's full 56px at md — the full
              // size read oversized in practice at 100% browser zoom
              // (was sized/checked at 67%). leading-tight (not leading-none
              // — that clipped this display font's ascenders/caps) trims
              // most of the excess line-height space above the glyphs.
              className="relative z-10 font-display text-[1.75rem] leading-tight font-normal tracking-[-0.02em] md:text-[2.5rem]"
            >
              {title}
            </motion.h1>
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col gap-6 px-6 pb-6 md:px-10 md:pb-10">
          {children}
        </div>

      </div>
    </motion.div>
  );
}