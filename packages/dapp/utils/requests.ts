import axios from 'axios';

type ResponseType = {
  status: number;
  response: unknown;
  error: string;
};

export type WhitelistResponse = {
  address: string;
  createdAt: string;
  updatedAt: string;
  confirmed: boolean;
};

export type MerkleProofResponse = {
  merkleProof: string[];
  verified: boolean;
  updatedAt: string;
};

export type StatusResponse = {
  whitelists: WhitelistResponse[];
  merkleRoot: string;
  updatedAt: string;
};

const handleResponse = <T>({ response, error, status }: ResponseType): T => {
  if (error) throw new Error(`Error ${status}: error`);
  return response as T;
};

export const confirmWhitelist = async (
  signature: string,
): Promise<WhitelistResponse> => {
  const result = await axios.post('/api/whitelist', { signature });
  return handleResponse<WhitelistResponse>(
    result.data as unknown as ResponseType,
  );
};

export const fetchMerkleProof = async (signature: string) => {
  const result = await axios.post('/api/merkleProof', { signature });
  return handleResponse<MerkleProofResponse>(
    result.data as unknown as ResponseType,
  );
};

export const fetchStatus = async () => {
  const result = await axios.post('/api/status', {});
  return handleResponse<StatusResponse>(result.data as unknown as ResponseType);
};
