"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/components/DetailView";
import { blogs } from "@/data/blogs";

export function BlogsContent() {
  if (blogs.length === 0) {
    return (
      <motion.p {...blurIn(0)} className="text-16">
        No posts yet — check back soon.
      </motion.p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {blogs.map((post, i) => (
        <motion.a
          key={post.id}
          href={post.link}
          target="_blank"
          rel="noreferrer"
          {...blurIn(i)}
          className="flex flex-col gap-1 border-b-2 border-outline pb-6 last:border-b-0"
        >
          <p className="text-14 font-medium tracking-tight text-outline/70 uppercase">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h2 className="font-display text-20 font-normal tracking-tight underline underline-offset-4">
            {post.title}
          </h2>
          <p className="text-16">{post.excerpt}</p>
        </motion.a>
      ))}
    </div>
  );
}
