// pages/api/webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';

 HEAD
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN!;
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
<<<<<<< HEAD
  // Meta VERIFY step (GET)
=======
  // ✅ 1. Meta verification (GET)
>>>>>>> 7f2d0fd (Update webhook + hello API)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

<<<<<<< HEAD
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
=======
    // (temporary logs – harmless)
    console.log('WEBHOOK GET', { mode, token, VERIFY_TOKEN, challenge });

    // 🔐 token check
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    // For debugging, tell us what failed
    return res
      .status(403)
      .send(`Forbidden: mode=${mode} token=${token} expected=${VERIFY_TOKEN}`);
  }

  // ✅ 2. Incoming notifications (POST)
  if (req.method === 'POST') {
    console.log('WEBHOOK POST');
    return res.status(200).send('EVENT_RECEIVED');
  }

>>>>>>> 7f2d0fd (Update webhook + hello API)
  return res.status(405).send('Method Not Allowed');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
