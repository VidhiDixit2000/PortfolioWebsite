"use client";

import { motion, type Variants } from "framer-motion";

type TitlePosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type BentoCardProps = {
  area:
    | "card-experience"
    | "card-education"
    | "card-blogs"
    | "card-contacts"
    | "card-resume"
    | "card-projects"
    | "card-agent";
  title: string;
  fill: string;
  vertical?: boolean;
  /** Corner the heading sits in. Defaults to top-right for vertical
   * (sidebar-style) cards and bottom-left otherwise. Pick whichever
   * corner the illustration doesn't occupy. */
  titlePosition?: TitlePosition;
  illustration?: string;
  /** Sizing/position for the illustration <img>. Overrides the default
   * inset-0/h-full/w-full fit — use negative insets or oversized h-/w- to
   * let it bleed past the card edge like a sticker (pair with `bleed`). */
  illustrationClassName?: string;
  /** Lets the illustration overflow the card bounds instead of being
   * clipped to it. */
  bleed?: boolean;
  /** Stacking order for the illustration. Defaults to 10. */
  illustrationZIndex?: number;
  /** Overrides the shared fluid --text-card size for this heading. Cards
   * are allowed to have different heading sizes when one needs to be
   * smaller (tight card, illustration close by) or bigger. */
  titleSize?: string;
  /** Extra classes appended to the heading box — for fine nudges (e.g.
   * a margin) that don't warrant a whole new titlePosition value. */
  titleClassName?: string;
  /** Opens the card's detail view. Also enables the hover lift/highlight
   * and participates in the collapse-on-click animation via `variants`. */
  onClick?: () => void;
  /** hidden/visible variant definitions driving the shrink-together
   * sequence — paired with `animate` below rather than left to inherit
   * from an ancestor, since propagation through nested motion
   * components isn't something to rely on. */
  variants?: Variants;
  /** Which variant label ("hidden" | "visible") this card should
   * currently be animating toward. Explicit, not inherited. */
  animate?: "hidden" | "visible";
};

const DEFAULT_ILLUSTRATION_CLASS = "inset-0 h-full w-full object-contain p-6";
const DEFAULT_TITLE_SIZE = "text-card";

const TITLE_POSITION_CLASSES: Record<TitlePosition, string> = {
  "top-left": "items-start justify-start",
  "top-center": "items-start justify-center",
  "top-right": "items-start justify-end",
  "center-left": "items-center justify-start",
  center: "items-center justify-center",
  "bottom-left": "items-end justify-start",
  "bottom-center": "items-end justify-center",
  "bottom-right": "items-end justify-end",
};

export function BentoCard({
  area,
  title,
  fill,
  vertical,
  titlePosition = vertical ? "top-right" : "bottom-left",
  illustration,
  illustrationClassName = DEFAULT_ILLUSTRATION_CLASS,
  bleed = false,
  illustrationZIndex = 10,
  titleSize = DEFAULT_TITLE_SIZE,
  titleClassName = "",
  onClick,
  variants,
  animate = "visible",
}: BentoCardProps) {
  const isResume = area === "card-resume";

  const cardClassName = [
    area,
    fill,
    "relative flex min-w-0 min-h-0 [container-type:inline-size]",
    bleed ? "overflow-visible" : "overflow-hidden",
    "rounded-[20px] border-2 border-outline p-6",
    onClick ? "cursor-pointer" : "",
    TITLE_POSITION_CLASSES[titlePosition],
    // Resume's envelope bleeds past the card's own edge into the
    // Projects card next to it — without a higher stacking order here,
    // Projects (later in DOM, same z-index:auto) paints over that
    // overflow and hides it instead of the envelope sitting on top.
    isResume ? "z-20" : "",
  ].join(" ");

const titleClass = [
  // z-20 keeps the heading above the illustration img (z-index set via
  // illustrationZIndex, 10 by default) — without it, any illustration
  // whose bounds overlap the heading paints over the text. max-w-full
  // caps a horizontal title's width, but in vertical-rl writing mode
  // (below) physical width maps to the text's thickness, not its length —
  // length is capped by max-height instead. Without this, a vertical
  // label could render taller than the card and, combined with `bleed`'s
  // overflow-visible, spill out past the card's edge. whitespace-nowrap
  // forces a single unbroken line — plain text wrapping (even without
  // break-words) still treats "/" as a soft-wrap point, which split this
  // into two lines even when nothing forced a mid-word break.
  vertical
    ? "relative z-20 max-h-full whitespace-nowrap"
    : "relative z-20 max-w-full break-words",
  isResume
    ? "font-cursive text-[clamp(1.5rem,1rem_+_5cqw,2.25rem)] text-purple whitespace-pre-line"
    : "rounded-[12px] border-2 border-outline bg-olive-deep px-4 py-2 font-display text-cream",
  "font-normal leading-tight tracking-tight",
  // Resume sets its own font size above — text-card (a container-query
  // clamp) would otherwise compete for the same property and, depending
  // on Tailwind's utility ordering, silently win over it.
  isResume ? "" : titleSize,
  titleClassName,
  vertical ? "[writing-mode:vertical-rl] rotate-180" : "",
].join(" ");

  return (
    <motion.div
      variants={variants}
      initial="visible"
      animate={animate}
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 28px -8px rgba(42, 36, 64, 0.35)",
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={cardClassName}
    >
      {illustration && (
        // Local SVG illustration; next/image doesn't optimize SVGs, and its
        // `fill` mode would fight the custom absolute positioning here.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={illustration}
          alt=""
          aria-hidden="true"
          style={{ zIndex: illustrationZIndex }}
          className={`pointer-events-none absolute ${illustrationClassName}`}
        />
      )}
      {title && <h2 className={titleClass}>{title}</h2>}
    </motion.div>
  );
}
