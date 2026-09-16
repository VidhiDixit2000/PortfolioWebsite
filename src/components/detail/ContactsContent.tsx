"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/components/DetailView";
import { profile, socials } from "@/data/profile";

const socialLinks = [
  {
    label: "LinkedIn",
    href: socials.linkedin,
    icon: "/illustrations/social-linkedin.svg",
  },
  {
    label: "GitHub",
    href: socials.github,
    icon: "/illustrations/social-github.svg",
  },
  {
    label: "dev.to",
    href: socials.devto,
    icon: "/illustrations/social-devto.svg",
  },
  { label: "X", href: socials.x, icon: "/illustrations/social-x.svg" },
];

export function ContactsContent() {
  return (
    <div className="flex flex-col gap-6">
      <motion.div {...blurIn(0)} className="flex flex-col gap-1">
        <p className="text-14 font-medium tracking-tight text-outline/70 uppercase">
          Email
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="w-fit text-16 underline underline-offset-4"
        >
          {profile.email}
        </a>
      </motion.div>
      <motion.div {...blurIn(1)} className="flex flex-col gap-1">
        <p className="text-14 font-medium tracking-tight text-outline/70 uppercase">
          Phone
        </p>
        <a
          href={`tel:${profile.phone}`}
          className="w-fit text-16 underline underline-offset-4"
        >
          {profile.phone}
        </a>
      </motion.div>
      <motion.div {...blurIn(2)} className="flex flex-wrap gap-4">
        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="block h-16 w-16"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local
                SVG icon; next/image gives SVGs no optimization benefit. */}
            <img
              src={link.icon}
              alt=""
              aria-hidden="true"
              className="h-full w-full"
            />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
