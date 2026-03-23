const SLEEPER_API = "https://api.sleeper.app/v1";

export interface SleeperLeague {
  league_id: string;
  name: string;
  season: string;
  status: string; // "in_season" | "complete" | "pre_draft" | etc.
  total_rosters: number;
  settings: {
    playoff_week_start: number;
    leg: number; // current week
  };
}

export interface SleeperUser {
  user_id: string;
  display_name: string;
  metadata?: { team_name?: string };
}

export interface SleeperRoster {
  roster_id: number;
  owner_id: string;
  settings: {
    wins: number;
    losses: number;
    ties: number;
    fpts: number;
    fpts_decimal: number;
    fpts_against?: number;
    fpts_against_decimal?: number;
  };
}

export interface NormalizedStanding {
  rank: number;
  team: string;
  owner: string;
  wins: string;
  losses: string;
  pointsFor: string;
  pointsAgainst: string;
}

export interface StandingsResult {
  standings: NormalizedStanding[];
  year: number;
  week?: number;
}

async function sleeperFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${SLEEPER_API}${path}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Sleeper API error: ${res.status} ${path}`);
  return res.json();
}

export async function getLeague(leagueId: string): Promise<SleeperLeague> {
  return sleeperFetch<SleeperLeague>(`/league/${leagueId}`);
}

export async function getSleeperStandings(leagueId: string): Promise<StandingsResult> {
  const [league, rosters, users] = await Promise.all([
    sleeperFetch<SleeperLeague>(`/league/${leagueId}`),
    sleeperFetch<SleeperRoster[]>(`/league/${leagueId}/rosters`),
    sleeperFetch<SleeperUser[]>(`/league/${leagueId}/users`),
  ]);

  const userMap = new Map(users.map((u) => [u.user_id, u]));

  const sorted = [...rosters].sort((a, b) => {
    const wDiff = b.settings.wins - a.settings.wins;
    if (wDiff !== 0) return wDiff;
    const aFor = a.settings.fpts + a.settings.fpts_decimal / 100;
    const bFor = b.settings.fpts + b.settings.fpts_decimal / 100;
    return bFor - aFor;
  });

  const standings: NormalizedStanding[] = sorted.map((roster, i) => {
    const user = userMap.get(roster.owner_id);
    const teamName = user?.metadata?.team_name ?? user?.display_name ?? `Team ${roster.roster_id}`;
    const ownerName = user?.display_name ?? "—";
    const fpts = (roster.settings.fpts + roster.settings.fpts_decimal / 100).toFixed(2);
    const fagainst = roster.settings.fpts_against !== undefined
      ? (roster.settings.fpts_against + (roster.settings.fpts_against_decimal ?? 0) / 100).toFixed(2)
      : "—";

    return {
      rank: i + 1,
      team: teamName,
      owner: ownerName,
      wins: String(roster.settings.wins),
      losses: String(roster.settings.losses),
      pointsFor: fpts,
      pointsAgainst: fagainst,
    };
  });

  return {
    standings,
    year: parseInt(league.season),
    week: league.settings?.leg,
  };
}
