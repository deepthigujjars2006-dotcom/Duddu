import { NextRequest, NextResponse } from "next/server";
import { updateModuleProgress, awardTriviaXp } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter." }, { status: 400 });
    }

    if (type === "module") {
      const { skillId, moduleId, completed } = body;
      if (!skillId || !moduleId) {
        return NextResponse.json({ error: "Missing skillId or moduleId." }, { status: 400 });
      }
      const result = updateModuleProgress(userId, skillId, moduleId, completed);
      return NextResponse.json(result, { status: 200 });
    } else if (type === "trivia") {
      const { xpReward } = body;
      const amount = typeof xpReward === "number" ? xpReward : 100;
      const stats = awardTriviaXp(userId, amount);
      return NextResponse.json({ stats }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid progress action type." }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update progress." },
      { status: 400 }
    );
  }
}
