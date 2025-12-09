import type { NextApiRequest, NextApiResponse } from 'next';

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN ?? 'vibecode';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Meta expects the challenge echoed back
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
    return;
  }

  if (req.method === 'POST') {
    // For now just acknowledge the webhook so Meta is happy
    console.log('Incoming webhook', JSON.stringify(req.body, null, 2));
    res.status(200).json({ received: true });
    return;
  }

  res.setHeader('Allow', 'GET,POST');
  res.status(405).end('Method Not Allowed');
}
