import { sendMagicLinkEmail } from "@/lib/auth/magic-link";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email : "";
    const fullName =
      typeof body.fullName === "string" ? body.fullName : undefined;
    const redirectTo =
      typeof body.redirectTo === "string" ? body.redirectTo : undefined;

    const result = await sendMagicLinkEmail(email, { fullName, redirectTo });

    if (!result.ok) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json({
      success: true,
      message:
        "If an account exists for this email, a sign-in link has been sent.",
    });
  } catch {
    return Response.json(
      { error: "Unable to send sign-in link. Please try again." },
      { status: 500 }
    );
  }
}
