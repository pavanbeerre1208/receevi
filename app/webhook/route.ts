// app/webhook/route.ts
import type { NextRequest } from 'next/server';

// Must match your Vercel env var WEBHOOK_VERIFY_TOKEN=vibecode
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN!;

// Meta verification (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN && challenge) {
    // ✅ Meta expects us to just echo back the challenge
    return new Response(challenge, { status: 200 });
  }

  return new Response('Forbidden', { status: 403 });
}

// Incoming notifications (POST)
export async function POST(req: NextRequest) {
  // You can parse JSON later; for now just acknowledge
  // const body = await req.json();
  // console.log('WEBHOOK POST BODY', body);

  return new Response('EVENT_RECEIVED', { status: 200 });
}

// Make sure this route is always dynamic (no static HTML)
export const dynamic = 'force-dynamic';
