import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    const user = authenticateUser(username, password);
    return NextResponse.json(
      {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        stats: user.stats,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Invalid credentials." },
      { status: 401 }
    );
  }
}
