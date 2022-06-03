import { WhitelistDocument, WhitelistModel } from '@/models/whitelist';

export const createWhitelist = async (
  userAddress: string
): Promise<WhitelistDocument> => {
  const record = {
    confirmed: true,
    address: userAddress.toLowerCase()
  };
  const whitelist = await WhitelistModel.create(record);
  return whitelist;
};

export const getWhitelists = async (): Promise<WhitelistDocument[]> => {
  const whitelists = await WhitelistModel.find();
  return whitelists;
};
