import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'vibecode';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (!mode || !token) {
    return new NextResponse('Missing mode or token', { status: 400 });
  }

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    // ✅ Echo the challenge back to Meta
    return new NextResponse(challenge ?? '', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  // This will be called by WhatsApp when messages/events arrive
  const body = await req.json().catch(() => null);

  console.log('WEBHOOK POST BODY:', body);

  // TODO: handle the events as you like here

  return new NextResponse('EVENT_RECEIVED', { status: 200 });
}
