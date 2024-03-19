import { Session } from "next-auth";
import useSWR from "swr";

import { SongsResponse } from "@/music/_/types";

function useSongs(session: Session | null) {
  const fetchAllMusic = async () => {
    const response = await fetch(`http://localhost:3000/api/songs/get-all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session }),
    });

    return response.json();
  };

  const { data, error, isLoading, mutate } = useSWR<SongsResponse>(
    `http://localhost:3000/api/songs/get-all`,
    fetchAllMusic,
    { revalidateOnFocus: false },
  );

  const songs = data?.songs;

  return {
    error,
    isLoading,
    songs,
    mutate,
    data,
  };
}

export { useSongs };
