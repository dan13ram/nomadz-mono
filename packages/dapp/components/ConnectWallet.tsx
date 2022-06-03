import { Flex, HStack, Text } from '@chakra-ui/react';
import Davatar from '@davatar/react';
import { utils } from 'ethers';

import { useENS } from '@/hooks/useENS';
import { ZERO_ADDRESS } from '@/utils/constants';
import { formatAddress, useWallet } from '@/web3';
import { getEthersProvider } from '@/web3/providers';

import { NetworkDisplay } from './NetworkDisplay';
import { PrimaryButton } from './PrimaryButton';

export const ConnectWallet: React.FC = () => {
  const {
    connectWallet,
    isConnecting,
    isConnected,
    disconnect,
    address,
    chainId,
  } = useWallet();
  const { ens } = useENS(address);
  return (
    <PrimaryButton
      pl={isConnected ? 2 : 3}
      pr={isConnected ? '0.125rem' : 3}
      role="group"
      isLoading={isConnecting}
      onClick={isConnected ? disconnect : connectWallet}
    >
      {!isConnected || !address ? (
        'Connect Wallet'
      ) : (
        <HStack spacing={2} position="relative">
          <Flex borderRadius="50%" border="1px solid black">
            <Davatar
              address={ZERO_ADDRESS}
              provider={getEthersProvider('0x1')}
              size={20}
              generatedAvatarType="jazzicon"
            />
          </Flex>
          <Text
            transition="opacity 0.25s"
            _groupHover={{ opacity: 0 }}
            minW="6rem"
            textAlign="left"
          >
            {formatAddress(utils.getAddress(address), ens)}
          </Text>
          <Text
            position="absolute"
            left={5}
            my="auto"
            opacity={0}
            transition="opacity 0.25s"
            _groupHover={{ opacity: 1 }}
            textAlign="left"
          >
            Disconnect?
          </Text>
          {chainId && <NetworkDisplay chainId={chainId} />}
        </HStack>
      )}
    </PrimaryButton>
  );
};
