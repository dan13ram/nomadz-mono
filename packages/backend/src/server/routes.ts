import express, { Request, Response } from 'express';

import { createWhitelist, getWhitelists } from '@/controllers/whitelist';
import { AuthRequest } from '@/middlewares/auth';
import { CONFIG } from '@/utils/config';
import { handleMongoError } from '@/utils/helpers';
import { getSnapshot } from '@/utils/snapshot';

const ROUTES = express.Router();

ROUTES.post('/whitelist', async (req: Request, res: Response) => {
  if (new Date().getTime() > CONFIG.CLOSE_WHITELIST_TIMESTAMP.getTime()) {
    res.status(400).json({ error: 'Whitelists are closed' });
  }
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

ROUTES.get('/whitelists', async (_req: Request, res: Response) => {
  try {
    const response = await getWhitelists();
    res.status(200).json({ response });
  } catch (err) {
    console.error('Error fetching whitelists:', (err as Error)?.message ?? err);
    handleMongoError(res, err);
  }
});

ROUTES.get('/merkleProof', async (req: Request, res: Response) => {
  try {
    const snapshot = await getSnapshot();
    const address = (req as AuthRequest).signer;
    res.status(200).json({
      response: {
        merkleProof: snapshot.getMerkleProof(address),
        updatedAt: snapshot.getUpdatedAt()
      }
    });
  } catch (err) {
    console.error(
      'Error fetching merkle proof:',
      (err as Error)?.message ?? err
    );
    handleMongoError(res, err);
  }
});

ROUTES.get('/merkleRoot', async (_req: Request, res: Response) => {
  try {
    const snapshot = await getSnapshot();
    res.status(200).json({
      response: {
        merkleRoot: snapshot.getMerkleRoot(),
        updatedAt: snapshot.getUpdatedAt()
      }
    });
  } catch (err) {
    console.error(
      'Error fetching merkle root:',
      (err as Error)?.message ?? err
    );
    handleMongoError(res, err);
  }
});

export { ROUTES };
