import type { NextApiRequest, NextApiResponse } from 'next';

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'vibecode';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ 1. Meta verification (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('WEBHOOK GET', { mode, token, challenge });

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK VERIFIED');
      return res.status(200).send(challenge);
    } else {
      console.warn('WEBHOOK VERIFICATION FAILED', { mode, token, VERIFY_TOKEN });
      return res.status(403).send('Verification failed');
    }
  }

  // ✅ 2. Incoming notifications (POST)
  if (req.method === 'POST') {
    console.log('WEBHOOK POST PAYLOAD:', JSON.stringify(req.body, null, 2));
    // TODO: handle WhatsApp events here
    return res.status(200).send('EVENT_RECEIVED');
  }

  // Any other method
  return res.status(405).send('Method Not Allowed');
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
