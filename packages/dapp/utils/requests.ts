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
  updatedAt: string;
};

export type MerkleRootResponse = {
  merkleRoot: string[];
  updatedAt: string;
};

const handleResponse = <T>({ response, error, status }: ResponseType): T => {
  if (error) throw new Error(error);
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

export const fetchMerkleRoot = async () => {
  const result = await axios.post('/api/merkleRoot', {});
  return handleResponse<MerkleRootResponse>(
    result.data as unknown as ResponseType,
  );
};

export const fetchWhitelists = async () => {
  const result = await axios.post('/api/whitelists', {});
  return handleResponse<Array<WhitelistResponse>>(
    result.data as unknown as ResponseType,
  );
};
