import {
  Flex,
  Heading,
  HStack,
  Link as ChakraLink,
  Stack,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';

import { useWallet } from '@/web3';

import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { NavToggle } from './NavToggle';

export const AppLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { isConnected } = useWallet();
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(o => !o);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Stack align="center" p="0" m="0" spacing="0" color="black" minH="100vh">
      <VStack
        p={{ base: 6, lg: 8 }}
        alignItems="center"
        borderBottomRadius="md"
        w="100%"
        mx="auto"
        maxW="9xl"
      >
        <HStack w="100%" justify="space-between" pos="relative">
          <NextLink href="/" passHref>
            <ChakraLink display="block" _hover={{}} zIndex={1500}>
              <Heading color="black" fontSize="3xl" lineHeight="1rem">
                {'Nomadz'}
              </Heading>
            </ChakraLink>
          </NextLink>
          {isSmallScreen ? (
            <>
              <NavToggle isOpen={isOpen} onClick={toggleOpen} zIndex={1500} />
              <MobileMenu isOpen={isOpen} onClose={toggleOpen} />
            </>
          ) : (
            <DesktopMenu />
          )}
        </HStack>
      </VStack>
      <Flex
        direction="column"
        w="100%"
        p={8}
        maxW="8xl"
        mx="auto"
        flex={1}
        overflowX="hidden"
        visibility={
          isOpen && isSmallScreen && isConnected ? 'hidden' : 'visible'
        }
        opacity={isOpen && isSmallScreen && isConnected ? 0 : 1}
        transition="opacity 0.25s"
      >
        {children}
      </Flex>
    </Stack>
  );
};
