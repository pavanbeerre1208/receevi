import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "vibecode";

// GET: Meta verification
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  console.log("WEBHOOK GET", { mode, token, challenge, VERIFY_TOKEN });

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    // Echo the challenge back (as plain text)
    return new NextResponse(challenge ?? "", { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// POST: incoming webhook events
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  console.log("WEBHOOK POST PAYLOAD:", JSON.stringify(body, null, 2));

  return NextResponse.json("EVENT_RECEIVED", { status: 200 });
}

// Ensure this is always dynamic (no static optimization)
export const dynamic = "force-dynamic";
