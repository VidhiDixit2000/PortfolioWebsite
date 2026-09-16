export type Project = {
  id: string;
  title: string;
  stack: string;
  bullets: string[];
  /** Repo URL — not supplied yet, left blank until provided. */
  githubUrl: string;
};

export const projects: Project[] = [
  {
    id: "supra-hospital-ai-assistant",
    title: "Supra Hospital AI Assistant",
    stack: "FastAPI, Python 3.13, Supabase PostgreSQL, Google Gemini",
    bullets: [
      "Built a hospital knowledge assistant for Supra Multi-Specialty Hospital, Hyderabad, that answers clinical and operational questions using the institution's own protocols and standing orders.",
      "Designed a safety-first architecture that treats the language model as the least trustworthy component — authorization, relevance checks, and drug-safety validations run in Python before the model is ever invoked, so it can't override a safety decision.",
      "Implemented a multi-gate request pipeline covering user authorization, lexical retrieval of knowledge records, permission validation, ambiguity detection, coverage assessment, pre/post-generation safety interlocks, and audit logging, with role-based, department-partitioned access.",
      "Built the backend with FastAPI on Supabase PostgreSQL, served a static HTML/JS frontend, and integrated Google Gemini server-side only.",
      "Scoped explicitly as an assessment prototype, not a medical device — the assistant advises only, and no medication changes occur without a prescriber's written authorization.",
    ],
    githubUrl: "https://github.com/VidhiDixit2000/Supra_engine_AIassistant",
  },
  {
    id: "supra-engine-analytics",
    title: "Supra Engine Analytics",
    stack:
      "FastAPI, React, Vite, PostgreSQL (Supabase), SQLAlchemy, React Flow, Recharts",
    bullets: [
      "Built a full-stack analytics platform that computes a user's accessible clinical knowledge set by traversing a healthcare knowledge graph and applying a sequential permission-filtering pipeline.",
      "Implemented breadth-first search (BFS) traversal from a user-specific entry point, Zone 2 node injection, and five sequential permission checks to produce the final candidate set.",
      "Designed a permission compiler providing O(1) permission lookups, removing repeated evaluation cost from the filtering stage.",
      "Developed the backend in FastAPI with SQLAlchemy over PostgreSQL hosted on Supabase, exposing the pipeline through documented REST endpoints with Swagger/OpenAPI.",
      "Built an interactive React dashboard with hierarchy (DAG) visualization, a filter funnel showing attrition at each permission stage, per-stage pipeline timing metrics, and a multi-user comparison view.",
      "Structured the repository as separate backend and frontend applications with environment-based configuration and versioned database schema and seed data.",
    ],
    githubUrl: "https://github.com/VidhiDixit2000/Supra_engine",
  },
  {
    id: "keploy-go-tutorial",
    title: "Keploy + Go API Testing Guide",
    stack: "Next.js, MDX, Tailwind CSS, Keploy",
    bullets: [
      "Built a Next.js 16 (App Router) documentation site walking through the Keploy Echo + Postgres quickstart for Go applications on Windows via WSL.",
      "Documented Keploy's core workflow — recording HTTP traffic and database interactions, then replaying them as automated tests — along with the practical friction points hit during setup.",
      "Captured version mismatches between Keploy's docs and its binaries, WSL PATH configuration issues, and CLI changes across versions, verified against Keploy 3.8.2 on Ubuntu 22.04 under WSL2.",
      "Built with MDX content, Tailwind CSS 4, rehype-pretty-code/Shiki for code highlighting, and custom components (Callout, Details, Terminal, ThemeToggle); deployed on Vercel.",
    ],
    githubUrl: "https://github.com/VidhiDixit2000/keploy-go-tutorial",
  },
  {
    id: "fast-api-project",
    title: "React + FastAPI + PostgreSQL CRUD Application",
    stack: "React, FastAPI, PostgreSQL, SQLAlchemy, Docker, AWS EC2, Netlify",
    bullets: [
      "Built a full-stack CRUD application (React frontend, FastAPI + SQLAlchemy backend, PostgreSQL database) to learn Docker, container networking, cloud deployment, and environment-based configuration end to end.",
      "Containerized the backend and database with Docker Compose, using Docker's internal DNS (the postgres-db service name) for container-to-container communication instead of localhost.",
      "Deployed the FastAPI backend to an AWS EC2 instance running Docker Compose, and the React frontend to Netlify, with environment variables switching the API URL between development and production builds.",
      "Configured CORS between the separately-hosted frontend and backend, and documented the API with FastAPI's interactive Swagger UI at /docs.",
    ],
    githubUrl: "https://github.com/VidhiDixit2000/fast-api-project",
  },
];
