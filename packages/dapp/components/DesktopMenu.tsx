import { HStack } from '@chakra-ui/react';

import { ConnectWallet } from '@/components/ConnectWallet';
import { useWallet } from '@/web3';

import { ActiveLink } from './Link';

export const DesktopMenu: React.FC = () => {
  const { isConnected } = useWallet();
  return (
    <>
      <HStack
        spacing={{ base: 2, lg: 6 }}
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={2}
      >
        <ActiveLink href="/" passHref>
          Home
        </ActiveLink>
      </HStack>

      {isConnected && <ConnectWallet />}
    </>
  );
};
