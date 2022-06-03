import { HStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ConnectWallet } from '@/components/ConnectWallet';

export const DesktopMenu: React.FC = () => {
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
        <NextLink href="/" passHref>
          <ChakraLink display="block" _hover={{}}>
            <Text>HOME</Text>
          </ChakraLink>
        </NextLink>
      </HStack>

      <ConnectWallet />
    </>
  );
};
