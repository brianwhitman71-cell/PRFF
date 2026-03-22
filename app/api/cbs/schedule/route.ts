import { NextResponse } from "next/server";
import { cbsFetch } from "@/lib/cbs";

export async function GET() {
  try {
    const data = await cbsFetch("schedule?");
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
