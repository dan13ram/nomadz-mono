import { getAddress, solidityKeccak256 } from 'ethers/lib/utils';
import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';

import { WhitelistModel } from '@/models/whitelist';

const unique = (a: Array<string>): Array<string> => {
  const seen: Record<string, boolean> = {};
  // eslint-disable-next-line no-return-assign
  return a.filter((item: string) =>
    // eslint-disable-next-line no-prototype-builtins
    seen.hasOwnProperty(item) ? false : (seen[item] = true)
  );
};

const generateLeaf = (address: string): Buffer =>
  Buffer.from(
    // Hash in appropriate Merkle format
    solidityKeccak256(['address'], [address]).slice(2),
    'hex'
  );

class Snapshot {
  private merkleTree: MerkleTree;

  private snapshot: string[];

  private updatedAt: Date;

  constructor(snapshot: Array<string>, updatedAt: Date) {
    this.snapshot = snapshot.map(address => getAddress(address));
    this.snapshot = unique(this.snapshot);

    this.merkleTree = new MerkleTree(
      // Generate leafs
      this.snapshot.map(address => generateLeaf(address)),
      // Hashing function
      keccak256,
      { sortPairs: true }
    );
    this.updatedAt = updatedAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getMerkleRoot(): string {
    return this.merkleTree.getHexRoot();
  }

  public getMerkleProof(address: string): string[] {
    const leaf = generateLeaf(address);
    return this.merkleTree.getHexProof(leaf);
  }

  public verifyAddress(address: string) {
    const leaf = generateLeaf(address);
    const proof = this.merkleTree.getHexProof(leaf);
    const root = this.getMerkleRoot();
    return this.merkleTree.verify(proof, leaf, root);
  }
}

export const getSnapshot = async (): Promise<Snapshot> => {
  const whitelists = await WhitelistModel.find();

  const addresses = whitelists.map(w => w.address).filter(a => !!a);
  const updatedAt = whitelists.reduce(
    (d, w) => (w.updatedAt.getTime() > d.getTime() ? w.updatedAt : d),
    new Date(0)
  );

  const snapshot = new Snapshot(addresses, updatedAt);

  return snapshot;
};
