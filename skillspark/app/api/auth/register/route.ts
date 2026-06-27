import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { username, password, avatar } = await request.json();

    if (!username || !password || !avatar) {
      return NextResponse.json(
        { error: "Username, password, and avatar are required." },
        { status: 400 }
      );
    }

    const newUser = createUser(username, password, avatar);
    return NextResponse.json(
      {
        id: newUser.id,
        username: newUser.username,
        avatar: newUser.avatar,
        stats: newUser.stats,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Registration failed." },
      { status: 400 }
    );
  }
}
