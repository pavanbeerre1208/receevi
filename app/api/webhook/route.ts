// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "vibecode"; // keep "vibecode" as fallback for now

// ✅ Meta verification (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  console.log("WEBHOOK GET", { mode, token, VERIFY_TOKEN, challenge });

  // Meta expects 200 + raw challenge when the token matches
  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200 });
  }

  // Wrong token or mode
  return new Response("Forbidden", { status: 403 });
}

// ✅ Incoming notifications (POST)
export async function POST(req: NextRequest) {
  // For now we just acknowledge the event so Meta is happy
  console.log("WEBHOOK POST");

  return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
}
