import { NextRequest, NextResponse } from "next/server";
import { getUserSkills } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter." }, { status: 400 });
    }

    const skills = getUserSkills(userId);
    return NextResponse.json(skills, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch skills." },
      { status: 400 }
    );
  }
}
