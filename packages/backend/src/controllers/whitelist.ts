import { WhitelistDocument, WhitelistModel } from '@/models/whitelist';

export const createWhitelist = async (
  userAddress: string
): Promise<WhitelistDocument> => {
  const record = {
    confirmed: true,
    address: userAddress.toLowerCase() ?? ''
  };
  const artist = await WhitelistModel.create(record);
  return artist;
};
