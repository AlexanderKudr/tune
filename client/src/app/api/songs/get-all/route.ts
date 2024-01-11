import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/services";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      {
        songs: [],
        message: "Email is required",
      },
      { status: 400 }
    );
  }


  const userSongs = await db.user.findUnique({
    where: { email },
    select: {
      allSongs: true,
    },
  });

  return NextResponse.json(
    {
      songs: userSongs?.allSongs,
      message: "Songs fetched successfully",
    },
    { status: 200 }
  );
}
