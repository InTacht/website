import { NextResponse } from "next/server";
import { getLabsNotebook } from "@/lib/notion";

export const revalidate = 3600;

export async function GET() {
  const recordMap = await getLabsNotebook();
  return NextResponse.json(recordMap, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
