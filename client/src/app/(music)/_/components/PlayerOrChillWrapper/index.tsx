"use client";

import { usePathname } from "next/navigation";

import { ChillStreamer } from "@/app/(music)/chill/_/layouts";

import { Player } from "../../layouts";

export function PlayerOrChillWrapper() {
  const pathname = usePathname();
  return pathname === "/chill" ? <ChillStreamer /> : <Player />;
}
