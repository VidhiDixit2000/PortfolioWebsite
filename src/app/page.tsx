"use client";

import { useState, type ComponentType } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { BentoCard } from "@/components/BentoCard";
import { DetailView } from "@/components/DetailView";
import { ExperienceContent } from "@/components/detail/ExperienceContent";
import { EducationContent } from "@/components/detail/EducationContent";
import { ProjectsContent } from "@/components/detail/ProjectsContent";
import { BlogsContent } from "@/components/detail/BlogsContent";
import { ContactsContent } from "@/components/detail/ContactsContent";
import { ResumeContent } from "@/components/detail/ResumeContent";

const DETAIL_CONTENT: Record<string, ComponentType> = {
  "card-experience": ExperienceContent,
  "card-education": EducationContent,
  "card-blogs": BlogsContent,
  "card-contacts": ContactsContent,
  "card-resume": ResumeContent,
  "card-projects": ProjectsContent,
};

const cards = [
  {
    area: "card-experience",
    title: "Experience",
    fill: "bg-card-blue",
    titlePosition: "top-left",
    illustration: "/illustrations/experience.svg",
    // Nudged further down from the default centered fit.
    illustrationClassName:
      "inset-0 h-full w-full object-contain pt-20 pr-6 pb-2 pl-6",
    bleed: false,
    illustrationZIndex: 10,
  },
  {
    area: "card-education",
    title: "Education",
    fill: "bg-card-orange",
    titlePosition: "top-left",
    // Slightly smaller heading + illustration pushed to the right side of
    // the card so the cap's tassel doesn't sit under the heading box.
    titleSize: "text-[clamp(1.05rem,0.8rem+4.5cqw,1.9rem)]",
    illustration: "/illustrations/education.svg",
    illustrationClassName:
      "inset-0 h-full w-full object-contain object-right p-6",
    bleed: false,
    illustrationZIndex: 10,
  },
  {
    area: "card-blogs",
    title: "Blogs",
    fill: "bg-card-pink",
    titlePosition: "top-left",
    illustration: "/illustrations/blog.svg",
    illustrationClassName: "inset-0 h-full w-full object-contain p-6",
    bleed: false,
    illustrationZIndex: 10,
  },
  {
    area: "card-contacts",
    title: "Contacts/Socials",
    fill: "bg-card-olive",
    vertical: true,
    titlePosition: "top-right",
    illustration: "/illustrations/telephone.svg",
    illustrationClassName:
      "-inset-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)] object-contain",
    bleed: true,
    illustrationZIndex: 10,
  },
  {
    area: "card-resume",
    title: "Resume",
    fill: "bg-card-pink",
    // Heading moved to the bottom, out of the way of the sheet, which
    // now lives up top, tilted and bleeding past the corner like a
    // sticker on a diary.
    titlePosition: "bottom-left",
    illustration: "/illustrations/Resume.svg",
    illustrationClassName:
      "-top-4 -right-3 h-[92%] w-auto max-w-none object-contain rotate-6",
    bleed: true,
    illustrationZIndex: 10,
  },
  {
    area: "card-projects",
    title: "Projects",
    fill: "bg-card-orange",
    // Vertically centered, kept left of dead-center but nudged right a
    // bit via titleClassName so it isn't jammed against the edge and
    // sits closer to the robot; robot enlarged and given a bit more
    // right-side bleed to eat into the empty space to its left.
    titlePosition: "center-left",
    titleClassName: "ml-24",
    illustration: "/illustrations/robot_project.svg",
    illustrationClassName:
      "-bottom-6 right-6 h-[105%] w-auto max-w-none object-contain",
    bleed: true,
    illustrationZIndex: 10,
  },
  // No title yet — AI agent tile is still a placeholder (see CLAUDE.md),
  // so it isn't wired into the click/detail-view flow below.
  { area: "card-agent", title: "", fill: "bg-card-blue" },
] as const;

// Anticipation-style easing (overshoot before/after settling) — matches
// the reference site's react-spring easeInBack trail, just ported to
// Framer Motion cubic-beziers. EASE_IN has a little pull-back before
// shrinking away; EASE_OUT pops slightly past 1 before settling.
const EASE_IN: [number, number, number, number] = [0.36, 0, 0.66, -0.56];
const EASE_OUT: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

// Every card that ISN'T the one clicked — hero included, no special
// treatment for it anymore — gets pushed back together: it recedes,
// washes out to a bleached white, and fades, all on the same timing.
const PUSH_BACK_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "brightness(2.4)",
    transition: { duration: 0.8, ease: EASE_IN },
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "brightness(1)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

// The clicked card instead gets pulled toward the viewer — a quick pop
// up above the others (scale past 1, raised z-index) — before it too
// recedes into the detail view, on the same overall timing as the push.
const PULL_FORWARD_VARIANTS: Variants = {
  hidden: {
    opacity: [1, 1, 0],
    scale: [1, 1.15, 0.85],
    filter: "brightness(1)",
    zIndex: 20,
    transition: { duration: 0.8, times: [0, 0.4, 1], ease: EASE_IN },
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "brightness(1)",
    zIndex: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

// Matches PULL_FORWARD_VARIANTS/PUSH_BACK_VARIANTS's hidden duration
// (0.8s) plus a little slack, so the detail view only swaps in once the
// collapse has actually finished playing.
const COLLAPSE_MS = 950;

export default function Home() {
  // Which card was clicked (drives its pull-forward vs. push-back
  // variant) and which phase the page is in are tracked separately from
  // which card's detail is shown — that way the clicked card's identity
  // is already known at the start of the collapse animation, rather than
  // only becoming known after the grid has already unmounted.
  const [pendingArea, setPendingArea] = useState<string | null>(null);
  const [phase, setPhase] = useState<"grid" | "collapsing" | "detail">(
    "grid",
  );
  const activeCard = cards.find((card) => card.area === pendingArea) ?? null;

  function openCard(area: string) {
    setPendingArea(area);
    setPhase("collapsing");
    setTimeout(() => setPhase("detail"), COLLAPSE_MS);
  }

  function goBack() {
    setPhase("grid");
    setPendingArea(null);
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 py-6 md:h-dvh md:px-12 md:py-12">
      <AnimatePresence mode="popLayout">
        {phase === "detail" && activeCard ? (
          <DetailView
            key="detail"
            title={activeCard.title}
            accentColor={activeCard.fill}
            onBack={goBack}
          >
            {(() => {
              const Content = DETAIL_CONTENT[activeCard.area];
              return Content ? <Content /> : null;
            })()}
          </DetailView>
        ) : (
          <motion.div
            key="grid"
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className="bento-grid mx-auto max-w-[1440px] md:h-full"
          >
            <motion.div
              variants={PUSH_BACK_VARIANTS}
              initial="visible"
              animate={phase === "collapsing" ? "hidden" : "visible"}
              className="card-hero flex flex-col justify-end gap-1 rounded-[20px] border-2 border-outline bg-hero-maroon p-6 text-cream"
            >
              <h1 className="font-display text-[2rem] font-normal tracking-[-0.02em] md:text-[3rem]">
                Vidhi Dixit
              </h1>
              <p className="text-16 font-medium uppercase tracking-tight">
                Full Stack AI Engineer
              </p>
            </motion.div>
            {cards.map((card) => (
              <BentoCard
                key={card.area}
                {...card}
                variants={
                  card.area === pendingArea
                    ? PULL_FORWARD_VARIANTS
                    : PUSH_BACK_VARIANTS
                }
                animate={phase === "collapsing" ? "hidden" : "visible"}
                onClick={
                  card.title && phase === "grid"
                    ? () => openCard(card.area)
                    : undefined
                }
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
