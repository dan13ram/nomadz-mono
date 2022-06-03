/* eslint-disable no-underscore-dangle */

import { Whitelist as WhitelistType } from '@/graphql/types';
import { LeanWhitelistDocument, WhitelistModel } from '@/models/whitelist';

export const resolvers = {
  Query: {
    async whitelists(): Promise<WhitelistType[]> {
      const whitelists: LeanWhitelistDocument[] =
        await WhitelistModel.find().lean();
      const response: WhitelistType[] = whitelists.map(a => {
        const whitelist: WhitelistType = {
          ...a,
          _id: a._id.toString(),
          createdAt: a.createdAt.getTime().toString(),
          updatedAt: a.updatedAt.getTime().toString()
        };
        return whitelist;
      });

      return response;
    }
  }
};
