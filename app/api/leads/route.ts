import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      console.error("Missing Supabase env vars");
      return NextResponse.json(
        { error: "Unable to save your details. Please try again." },
        { status: 500 }
      );
    }

    const supabase = createClient(url, key);
    const { error, data } = await supabase.from("leads").insert({
      full_name: name,
      email,
    }).select();

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Unable to save your details. Please try again.", detail: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Unable to save your details. Please try again." },
      { status: 500 }
    );
  }
}
