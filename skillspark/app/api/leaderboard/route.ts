import { NextRequest, NextResponse } from "next/server";
import { getGlobalLeaderboard } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || undefined;

    const leaderboard = getGlobalLeaderboard(userId);
    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch leaderboard." },
      { status: 400 }
    );
  }
}
