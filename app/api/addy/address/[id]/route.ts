import { addyGetAddress } from "@/lib/addy/client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const addressId = Number(id);

  if (!Number.isFinite(addressId) || addressId <= 0) {
    return Response.json({ error: "Invalid address id." }, { status: 400 });
  }

  return addyGetAddress(addressId);
}
