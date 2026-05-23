import { saveLead } from "@/lib/leads/store";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!name) {
      return Response.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return Response.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const lead = await saveLead(name, email);
    return Response.json({ success: true, lead });
  } catch {
    return Response.json(
      { error: "Unable to save your details. Please try again." },
      { status: 500 }
    );
  }
}
