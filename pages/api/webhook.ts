import type { NextApiRequest, NextApiResponse } from 'next';

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1) Meta GET verification
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Token matches → echo the challenge back
      return res.status(200).send(challenge);
    }

    // Wrong token or mode
    return res.status(403).send('Forbidden');
  }

  // 2) Webhook events (POST from WhatsApp)
  if (req.method === 'POST') {
    // For now we just acknowledge the event; Receevi logic can be added later.
    // WhatsApp only cares that we return 200 within 10s.
    // You can log the body during testing if you want:
    // console.log(JSON.stringify(req.body, null, 2));

    return res.status(200).send('EVENT_RECEIVED');
  }

  // Anything else not allowed
  return res.status(405).send('Method Not Allowed');
}

export const config = {
  api: {
    bodyParser: false, // keep this if Receevi expects raw body
  },
};
