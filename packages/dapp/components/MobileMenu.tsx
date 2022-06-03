import {
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalContent,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { ConnectWallet } from '@/components/ConnectWallet';

export const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent minW="100%" h="100%" minH="100%" m={0} p={0}>
        <ModalBody h="100%">
          <VStack spacing={6} h="100%" w="100%" justify="center">
            <ConnectWallet />
            <NextLink href="/" passHref>
              <ChakraLink display="block" _hover={{}} onClick={onClose}>
                <Text>HOME</Text>
              </ChakraLink>
            </NextLink>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
