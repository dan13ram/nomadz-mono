import { Document, LeanDocument, model, Schema } from 'mongoose';

import { WhitelistInterface } from '@/utils/types';

export interface WhitelistDocument extends WhitelistInterface, Document {}

export type LeanWhitelistDocument = LeanDocument<WhitelistDocument>;

const WhitelistSchema = new Schema<WhitelistDocument>(
  {
    confirmed: {
      type: Boolean,
      required: true
    },
    address: {
      type: String,
      required: true,
      unique: true,
      match: /^0x[a-f0-9]{40}$/
    }
  },
  { timestamps: true }
);

export const WhitelistModel = model<WhitelistDocument>(
  'Whitelist',
  WhitelistSchema
);
