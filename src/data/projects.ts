/** Rich narrative treatment for a project's detail entry (Problem →
 * Approach → Result), rendered by ProjectStory instead of the default
 * bullet card. Optional — a project only gets this when it has a real
 * story written for it; everything else keeps the plain summary card. */
export type ProjectStory = {
  /** Heading shown inside the story, in place of `project.title` — lets
   * the narrative use a more evocative name without renaming the
   * project everywhere else it's referenced. */
  displayTitle?: string;
  chip: string;
  summary: string;
  tags: string[];
  problem: string[];
  /** Paragraph(s) introducing the approach, shown before the pipeline. */
  approachIntro: string[];
  /** One or more pipeline/flow rows, each a sequence of stage labels
   * rendered as chips joined by arrows. Most projects need only one row. */
  pipeline: string[][];
  /** Small caption under the pipeline row(s), e.g. a count or scope note. */
  pipelineNote?: string;
  /** Paragraph(s) after the pipeline, before fixesIntro/fixes. */
  approachDetails?: string[];
  fixesIntro?: string;
  fixes: string[];
  result: string[];
  /** Shown inside the GIF placeholder until a real one is supplied. */
  gifCaption?: string;
  gifSrc?: string;
  /** Shown inside the media placeholder until a real demo video/GIF is
   * supplied. */
  mediaCaption?: string;
  mediaSrc?: string;
  /** Extra links beyond the GitHub repo (which comes from project.githubUrl)
   * — a live site, a demo video, a reference to the original source, etc. */
  links?: { label: string; url: string }[];
};

export type Project = {
  id: string;
  title: string;
  stack: string;
  bullets: string[];
  /** Repo URL — not supplied yet, left blank until provided. */
  githubUrl: string;
  story?: ProjectStory;
};

export const projects: Project[] = [
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
    story: {
      displayTitle: "Clinical Rules Engine",
      chip: "Project",
      summary:
        "A rules engine that decides what a hospital AI assistant is allowed to retrieve for each user — with no language model anywhere in the decision.",
      tags: ["FastAPI", "React", "PostgreSQL", "Supabase", "BFS / DAG", "React Flow", "Recharts"],
      problem: [
        "A hospital AI assistant sits on hundreds of internal records: drug safety rules, ward protocols, department decisions. A night-shift nurse needs her unit's protocols and every hospital-wide safety alert — but not another department's trial data, not admin-level decisions, and not a protocol that expired last month.",
        "Letting the model decide that is a security failure, so the filtering has to be deterministic. And the access rules, built exactly as written and tested on real data, broke their own expected results: safety alerts were filtered out, and different roles got identical access.",
      ],
      approachIntro: [
        "I built it as a pipeline with zero LLM involvement, so every access decision happens at a stage you can see and test. The hospital hierarchy is a directed acyclic graph, not a tree — a unit can sit under two parents at once — so the traversal has to reach each node exactly once however many paths lead to it.",
      ],
      pipeline: [
        [
          "User",
          "Rules compiled",
          "Entry point",
          "BFS over the DAG",
          "Safety alerts added",
          "5-stage filter",
          "Candidate set",
        ],
      ],
      fixesIntro: "Every time a rule failed a real test, I changed the design and wrote down why:",
      fixes: [
        "Traversal only walked upward, so it missed the user's own units. I added department-scoped expansion that stops at department boundaries.",
        "A level rule removed hospital-wide safety alerts. I exempted content already scoped by traversal or compliance tags.",
        "Department heads had the same clearance as staff. I gave them access to restricted content in their own department only.",
      ],
      result: [
        "The same code produces a different, correct set for every role, and hospital-wide safety alerts reach all of them.",
        "Traversal time dropped from about 3.5s to 0.8s by removing per-node database queries.",
        "A dashboard makes the filtering visible: the DAG, how many records each check removes, and the time per stage.",
      ],
      mediaCaption: "Demo: switching the user updates the DAG and funnel counts",
      gifSrc: "/illustrations/projects/hard-work.gif",
    },
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
    story: {
      displayTitle: "Keploy Onboarding",
      chip: "Case Study · Developer Advocacy",
      summary:
        "I saw Keploy advertised on LinkedIn, tried its Go quickstart on Windows like any curious developer would, and noted every point where I got stuck or confused.",
      tags: ["Go", "Keploy", "WSL2", "Next.js", "MDX", "Tailwind", "Vercel", "Technical writing"],
      problem: [
        "Good onboarding is important for developer tools. The product promises that users can record real API traffic, replay it as tests, and avoid writing test code.",
        "But when I tried the quickstart on Windows with WSL2, I ran into gaps between that promise and the actual setup experience. Instead of simply giving up like many users might, I documented those problems and turned them into clear feedback the team could use to improve the onboarding experience.",
      ],
      approachIntro: [
        "I worked in two directions at once: writing for the next developer, and recording findings for the product team.",
      ],
      pipeline: [["Install", "Record traffic", "Replay as tests", "Read the report"]],
      pipelineNote: "(eleven friction points mapped across these four steps)",
      approachDetails: [
        "For the developer: a single-page Next.js and MDX guide that places each warning at the exact step where a reader would hit it, with custom callout, terminal and detail components showing the output you should expect.",
        "For the product team: each blocker written up as expected behaviour, actual behaviour and the fix, so it can be triaged rather than treated as one person's bad day.",
      ],
      fixesIntro: "The clearest ones:",
      fixes: [
        "The docs described a different version than the binary being installed, and the README pointed at the wrong line to edit.",
        "The record command failed because of a path-quoting trap specific to WSL.",
        "The CLI timed out with a 401 and never prompted the user to log in, so a missing login looked like a bug.",
        "The bundled test set shipped mocks in an older format the current version couldn't read, so the first run failed out of the box.",
        "The flag that selects which test set to run filters execution but not discovery or reporting, so a fully passing run still ended in an error about a test set that never ran. That one is a product defect, not a docs gap.",
      ],
      result: [
        "A working end-to-end run with 2 of 2 tests passing, and every workaround documented.",
        "Eleven friction points turned into a written, reproducible list the team can prioritise.",
        "A published guide that gets the next Windows developer to a passing test without the dead ends.",
      ],
      links: [
        { label: "Live guide", url: "https://keploy-go-tutorial.vercel.app" },
        { label: "Original quickstart", url: "https://keploy.io/docs/quickstart/samples-echo/" },
      ],
      gifSrc: "/illustrations/projects/hard-work.gif",
      mediaCaption: "No recorded demo for this one",
      mediaSrc: "/illustrations/projects/keploy-no-demo.gif",
    },
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
    story: {
      displayTitle: "KeepUp Inventory",
      chip: "Project",
      summary:
        "An inventory app that anyone can run with one command, built to learn Docker and AWS EC2 by actually using them.",
      tags: [
        "Docker",
        "Docker Compose",
        "AWS EC2",
        "Linux",
        "FastAPI",
        "PostgreSQL",
        "React",
        "GitHub Actions",
        "Netlify",
      ],
      problem: [
        "The inventory app itself wasn't the hard part. Getting it running was.",
        "Every time someone new wanted to use it, they had to repeat the whole setup: install the right Python version, create a virtual environment, install dependencies, install and configure PostgreSQL, create the database, set the connection string, then do it all again on the next machine. Any step done slightly differently produced a different result, and the usual outcome was that it worked on one machine and not the next.",
      ],
      approachIntro: [
        "I moved the setup into the project itself, then put the backend somewhere everyone could reach.",
      ],
      pipeline: [
        ["Dockerfile", "Docker Compose", "docker compose up"],
        [
          "GitHub",
          "AWS EC2",
          "FastAPI + PostgreSQL containers",
          "GitHub Actions redeploys on push",
        ],
      ],
      fixes: [
        "Containerised the environment. FastAPI and PostgreSQL run as services under Compose, so the whole stack starts with one command and behaves the same on every machine. The backend reaches the database through Docker's internal DNS by service name rather than localhost, and the connection string comes from an environment variable instead of being hardcoded.",
        "Hosted it on AWS EC2. Instead of everyone running their own copy, the backend runs on one instance I set up myself: Docker and Compose installed, only the required ports open, and debugging done on the server with docker ps and docker compose logs. The React frontend sits on Netlify and points at it through a per-build environment variable.",
        "Removed the manual deploy. A GitHub Actions workflow redeploys the backend on every push to main, so updating the running app isn't an SSH session and a list of commands.",
      ],
      result: [
        'Setup went from a page of instructions to a single command, with no "works on my machine" gap between environments.',
        "One shared backend instead of separate local copies drifting apart, and deployment is a push rather than a checklist.",
        "What I was really after: Docker and EC2 stopped being things I'd read about. I've now written Dockerfiles, debugged container-to-container networking, administered a Linux server, controlled its inbound access, and fixed CORS between two separately hosted origins — the problems that only show up once something actually has to run somewhere.",
      ],
      links: [{ label: "Live site", url: "https://keepupinventory.netlify.app/" }],
      gifSrc: "/illustrations/projects/hard-work.gif",
      mediaCaption: "The live app: add a product, see it in the table",
      mediaSrc: "/illustrations/projects/KeepupInventory_fullpage_ss.png",
    },
  },
];
