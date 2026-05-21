import { addySearch } from "@/lib/addy/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("s")?.trim() ?? "";

  if (query.length < 2) {
    return Response.json({ matched: 0, addresses: [] });
  }

  return addySearch(query);
}
