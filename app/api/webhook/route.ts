import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "vibecode";

// GET = Meta webhook verification
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  console.log("WEBHOOK GET", { mode, token, challenge });

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    return new NextResponse(challenge ?? "", { status: 200 });
  }

  console.warn("WEBHOOK VERIFICATION FAILED", { mode, token });
  return new NextResponse("Forbidden", { status: 403 });
}

// POST = actual WhatsApp notifications
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  console.log("WEBHOOK POST PAYLOAD:", JSON.stringify(body, null, 2));

  // here you'll later handle messages

  return NextResponse.json("EVENT_RECEIVED", { status: 200 });
}

// ensure this route is always dynamic
export const dynamic = "force-dynamic";
