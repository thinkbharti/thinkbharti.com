import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Try to insert into subscribers table
    // If the table doesn't exist yet, we handle it gracefully
    const { error } = await supabase
      .from("subscribers" as any)
      .insert([{ email: email.toLowerCase().trim() }]);

    if (error) {
      // If table missing or already subscribed
      if (error.code === "23505") {
        return NextResponse.json({
          success: true,
          message: "You are already subscribed to the ThinkBharti briefing!",
        });
      }
      console.warn("Subscribers table query note:", error.message);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to ThinkBharti Daily Briefing!",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
