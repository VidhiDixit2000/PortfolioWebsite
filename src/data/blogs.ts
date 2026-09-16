export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  publishedAt: string;
};

// Seeded manually from https://dev.to/vidhidixit2000 for now. CLAUDE.md
// specifies this section should eventually pull live from the dev.to
// API — when that's wired up, it replaces this array rather than the
// BlogPost shape changing.
export const blogs: BlogPost[] = [
  {
    id: "pgadmin-localhost-5432",
    title:
      'My app could read the database. pgAdmin couldn\'t. Both were pointing at "localhost:5432"',
    excerpt:
      "A FastAPI app and pgAdmin were both pointing at localhost:5432, yet reaching two different Postgres databases — one via Docker's internal network, the other a forgotten Windows Postgres install that had already claimed the host port at startup.",
    link: "https://dev.to/vidhidixit2000/my-app-could-read-the-database-pgadmin-couldnt-both-were-pointing-at-localhost5432-59bo",
    publishedAt: "2026-08-27",
  },
  {
    id: "import-broke-on-first-deploy",
    title: "The import that worked for months and broke on my first deploy",
    excerpt:
      "A mismatched-case filename import worked locally on Windows for months, then failed the moment it deployed to Linux-based Vercel — because Windows filesystems are case-insensitive and Linux isn't.",
    link: "https://dev.to/vidhidixit2000/the-import-that-worked-for-months-and-broke-on-my-first-deploy-5a3l",
    publishedAt: "2026-08-26",
  },
];
