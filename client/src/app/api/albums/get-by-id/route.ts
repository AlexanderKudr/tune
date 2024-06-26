import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";

import { db } from "@/api/_/services";

export async function POST(req: NextRequest) {
  const { session, id }: { session: Session; id: string } = await req.json();

  if (!session) {
    return NextResponse.json({ user: null, message: "Session is required" }, { status: 404 });
  }

  const userEmail = session?.user?.email || "";

  if (!userEmail) {
    return NextResponse.json({ songs: [], message: "Email is required" }, { status: 400 });
  }

  const userAlbum = await db.album.findUnique({
    where: { id: id },
    include: {
      albumSongs: true,
    },
  });

  await db.$disconnect();

  const payload = {
    type: "albumId",
    id,
  };

  return NextResponse.json(
    { album: userAlbum, message: "Albums fetched successfully", payload },
    { status: 200 },
  );
}
