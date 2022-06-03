import { providers } from 'ethers';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';
import Web3Modal from 'web3modal';

import { fetchMerkleProof } from '@/utils/requests';

import { isSupportedNetwork } from './helpers';
import { switchChainOnMetaMask } from './metamask';
import { CHAIN_ID, NETWORK_INFO } from './networks';
import { WEB3_MODAL_OPTIONS } from './options';

export type WalletContextType = {
  provider: providers.Web3Provider | null | undefined;
  chainId: string | null | undefined;
  address: string | null | undefined;
  signature: string | null | undefined;
  merkleProof: string[] | null | undefined;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  isMetaMask: boolean | undefined;
};

export const WalletContext = createContext<WalletContextType>({
  provider: null,
  chainId: null,
  address: null,
  signature: null,
  merkleProof: null,
  connectWallet: async () => undefined,
  disconnect: () => undefined,
  isConnecting: true,
  isConnected: false,
  isMetaMask: false,
});

type WalletStateType = {
  provider?: providers.Web3Provider | null;
  chainId?: string | null;
  address?: string | null;
  signature?: string | null;
  merkleProof?: string[] | null;
  isMetaMask?: boolean;
};

const web3Modal =
  typeof window !== 'undefined' ? new Web3Modal(WEB3_MODAL_OPTIONS) : null;

export const WalletProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [walletState, setWalletState] = useState<WalletStateType>({});

  const { provider, chainId, address, signature, isMetaMask, merkleProof } =
    walletState;

  const [isConnecting, setConnecting] = useState<boolean>(true);

  const isConnected: boolean = useMemo(
    () => !!provider && !!address && !!chainId && !isConnecting,
    [provider, address, chainId, isConnecting],
  );

  const disconnect = useCallback(async () => {
    web3Modal?.clearCachedProvider();
    setWalletState({});
  }, []);

  const setWalletProvider = useCallback(
    async (prov: providers.ExternalProvider) => {
      const ethersProvider = new providers.Web3Provider(prov);
      const signer = ethersProvider.getSigner();
      const [network, signerAddress, sign] = await Promise.all([
        ethersProvider.getNetwork(),
        signer.getAddress(),
        signer.signMessage('Welcome to Nomadz!'),
      ]);

      const { merkleProof: proof } = await fetchMerkleProof(sign);

      setWalletState({
        provider: ethersProvider,
        chainId: `0x${network.chainId.toString(16)}`,
        address: signerAddress.toLowerCase(),
        isMetaMask: prov.isMetaMask,
        signature: sign,
        merkleProof: proof,
      });
    },
    [],
  );

  const connectWallet = useCallback(async () => {
    if (!web3Modal) return;
    try {
      setConnecting(true);

      const modalProvider = await web3Modal.connect();
      let chainId = await modalProvider.request({
        method: 'eth_chainId',
      });
      const isMetaMask = modalProvider.isMetaMask;

      if (isMetaMask && !isSupportedNetwork(chainId)) {
        const success = await switchChainOnMetaMask(CHAIN_ID);
        if (success) {
          chainId = CHAIN_ID;
        }
      }

      if (isSupportedNetwork(chainId)) {
        await setWalletProvider(modalProvider);

        modalProvider.on('accountsChanged', () => {
          disconnect();
        });
        modalProvider.on('chainChanged', () => {
          disconnect();
        });
      } else {
        toast.error(
          `Network not supported, please switch to ${NETWORK_INFO[CHAIN_ID].name}`,
        );
        disconnect();
      }
    } catch (web3Error) {
      // eslint-disable-next-line no-console
      console.error(web3Error);
      disconnect();
    } finally {
      setConnecting(false);
    }
  }, [setWalletProvider, disconnect]);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connectWallet();
    } else {
      setConnecting(false);
    }
  }, [connectWallet]);

  return (
    <WalletContext.Provider
      value={{
        provider,
        address,
        chainId,
        signature,
        merkleProof,
        connectWallet,
        isConnected,
        isConnecting,
        disconnect,
        isMetaMask,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
