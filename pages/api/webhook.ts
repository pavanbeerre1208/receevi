// pages/api/webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Meta VERIFY step (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // ✅ Echo the challenge back – this is what Meta needs
      return res.status(200).send(challenge);
    }

    // ❌ Wrong token or mode
    return res.status(403).send('Forbidden');
  }

  // Incoming webhook events (POST) – simple OK for now
  if (req.method === 'POST') {
    // Later you can parse the body here
    return res.status(200).send('EVENT_RECEIVED');
  }

  // Any other method
  return res.status(405).send('Method Not Allowed');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
