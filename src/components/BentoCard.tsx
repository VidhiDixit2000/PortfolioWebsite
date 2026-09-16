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
  const cardClassName = [
    area,
    fill,
    "relative flex min-w-0 min-h-0 [container-type:inline-size]",
    bleed ? "overflow-visible" : "overflow-hidden",
    "rounded-[20px] border-2 border-outline p-6",
    onClick ? "cursor-pointer" : "",
    TITLE_POSITION_CLASSES[titlePosition],
  ].join(" ");

  const titleClass = [
    "relative max-w-full break-words rounded-[12px] border-2 border-outline",
    "bg-olive-deep px-4 py-2 font-display font-normal leading-tight tracking-tight text-cream",
    titleSize,
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
