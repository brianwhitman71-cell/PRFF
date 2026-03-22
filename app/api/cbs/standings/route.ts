import { NextResponse } from "next/server";
import { cbsFetch } from "@/lib/cbs";

export async function GET() {
  try {
    const data = await cbsFetch("standings?");
    const raw = data?.body?.standings ?? [];
    const year: number = data?.body?.season ?? new Date().getFullYear();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const standings = raw.map((entry: any, i: number) => ({
      rank: i + 1,
      team: entry.team?.alias ?? entry.team?.name ?? "—",
      owner: entry.team?.owners?.[0]?.name ?? "—",
      wins: String(entry.wins ?? "—"),
      losses: String(entry.losses ?? "—"),
      pointsFor: String(entry.points_for ?? "—"),
      pointsAgainst: String(entry.points_against ?? "—"),
    }));

    return NextResponse.json({ standings, year });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
