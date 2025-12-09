import type { NextApiRequest, NextApiResponse } from "next";

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "vibecode";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ 1. Meta verification (GET)
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log("WEBHOOK GET", { mode, token, challenge, VERIFY_TOKEN });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Echo challenge back
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Forbidden");
  }

  // ✅ 2. Incoming notifications (POST)
  if (req.method === "POST") {
    console.log("WEBHOOK POST PAYLOAD:", JSON.stringify(req.body, null, 2));
    return res.status(200).send("EVENT_RECEIVED");
  }

  // Any other method
  return res.status(405).send("Method Not Allowed");
}
