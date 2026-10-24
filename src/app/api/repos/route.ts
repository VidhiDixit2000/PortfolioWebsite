import { GITHUB_USER, PORTFOLIO_TOPIC, type Repo } from "@/data/repos";

export const revalidate = 300;

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

export async function GET() {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      { headers, next: { revalidate } },
    );
    if (!res.ok) return Response.json({ repos: [] });

    const data: GitHubRepo[] = await res.json();
    const repos: Repo[] = data
      .filter(
        (repo) =>
          !repo.fork &&
          !repo.archived &&
          (repo.topics ?? []).includes(PORTFOLIO_TOPIC),
      )
      .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics ?? [],
      }));

    return Response.json({ repos });
  } catch {
    // Degrade quietly: no card grid, case studies still render.
    return Response.json({ repos: [] });
  }
}
