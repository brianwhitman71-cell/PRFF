import { NextResponse } from "next/server";
import { getSleeperStandings } from "@/lib/sleeper";

export async function GET() {
  const leagueId = process.env.SLEEPER_LEAGUE_ID;
  if (!leagueId) {
    return NextResponse.json({ error: "SLEEPER_LEAGUE_ID not set" }, { status: 503 });
  }
  try {
    const data = await getSleeperStandings(leagueId);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
