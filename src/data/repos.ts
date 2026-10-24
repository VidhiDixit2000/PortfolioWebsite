/** A public GitHub repo as returned by /api/repos — already filtered to
 * non-fork, non-archived repos tagged with the "portfolio" topic, newest
 * push first. */
export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
};

export const GITHUB_USER = "VidhiDixit2000";

/** Topic a repo must carry to show up in the Projects card grid. */
export const PORTFOLIO_TOPIC = "portfolio";

/** "keploy-go-tutorial" → "keploy go tutorial". */
export function repoDisplayName(name: string): string {
  return name.replace(/[-_]+/g, " ").trim();
}

/** Up to four stack chips: the primary language, then the repo's topics
 * (minus the "portfolio" marker topic itself). */
export function repoStackChips(repo: Repo): string[] {
  const chips = [
    ...(repo.language ? [repo.language] : []),
    ...repo.topics.filter((topic) => topic !== PORTFOLIO_TOPIC),
  ];
  return [...new Set(chips)].slice(0, 4);
}
