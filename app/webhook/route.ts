// app/webhook/route.ts
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const challenge = searchParams.get('hub.challenge') ?? 'no-challenge';

  // ✅ Always echo back the challenge, ignore token for now
  return new Response(challenge, { status: 200 });
}

export async function POST(req: NextRequest) {
  // Later you can parse and handle events here
  return new Response('EVENT_RECEIVED', { status: 200 });
}

// Ensure this route is always handled dynamically
export const dynamic = 'force-dynamic';
