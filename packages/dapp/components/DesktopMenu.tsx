import { HStack } from '@chakra-ui/react';

import { ConnectWallet } from '@/components/ConnectWallet';
import { ROUTES } from '@/utils/constants';
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
        {ROUTES.map(r => (
          <ActiveLink href={r.path} passHref key={r.path}>
            {r.label}
          </ActiveLink>
        ))}
      </HStack>

      {isConnected && <ConnectWallet />}
    </>
  );
};
