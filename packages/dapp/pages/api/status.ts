import fetch from 'cross-fetch';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { API_ENDPOINT, JWT_SECRET } from '@/utils/constants';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      const token = jwt.sign(req.body.signature ?? '', JWT_SECRET);
      const response = await fetch(`${API_ENDPOINT}/api/status`, {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'GET',
      });
      const data = await response.json();
      res.status(200).json({ status: response.status, ...data });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`status API error`, err);
      res.status(500).json(err);
    }
  }
}

export default handler;
