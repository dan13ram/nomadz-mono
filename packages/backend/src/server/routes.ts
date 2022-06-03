import express, { Request, Response } from 'express';

import { createWhitelist } from '@/controllers/whitelist';
import { AuthRequest } from '@/middlewares/auth';
import { handleMongoError } from '@/utils/helpers';

const ROUTES = express.Router();

ROUTES.post('/whitelist', async (req: Request, res: Response) => {
  try {
    const address = (req as AuthRequest).signer;
    const response = await createWhitelist(address);
    res.status(201).json({ response });
  } catch (err) {
    console.error(
      'Error whitelisting address:',
      (err as Error)?.message ?? err
    );
    handleMongoError(res, err);
  }
});

export { ROUTES };
