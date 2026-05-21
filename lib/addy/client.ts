const ADDY_API_BASE = "https://api-nz.addysolutions.com";

function getAddyCredentials(): { key: string; secret: string } | null {
  const key = process.env.NEXT_PUBLIC_ADDY_API_KEY;
  const secret = process.env.ADDY_API_SECRET;
  if (!key || !secret) return null;
  return { key, secret };
}

export async function addySearch(
  query: string,
  max = 8
): Promise<Response> {
  const creds = getAddyCredentials();
  if (!creds) {
    return Response.json(
      { error: "Addy API is not configured." },
      { status: 503 }
    );
  }

  const params = new URLSearchParams({
    key: creds.key,
    secret: creds.secret,
    s: query,
    max: String(max),
  });

  const res = await fetch(`${ADDY_API_BASE}/search?${params}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return Response.json(
      { error: "Address search failed." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return Response.json(data);
}

export async function addyGetAddress(id: number): Promise<Response> {
  const creds = getAddyCredentials();
  if (!creds) {
    return Response.json(
      { error: "Addy API is not configured." },
      { status: 503 }
    );
  }

  const params = new URLSearchParams({
    key: creds.key,
    secret: creds.secret,
  });

  const res = await fetch(`${ADDY_API_BASE}/address/${id}?${params}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return Response.json(
      { error: "Address lookup failed." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return Response.json(data);
}
