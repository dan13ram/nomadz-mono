import { Modal, ModalBody, ModalContent, VStack } from '@chakra-ui/react';

import { ConnectWallet } from '@/components/ConnectWallet';
import { ROUTES } from '@/utils/constants';
import { useWallet } from '@/web3';

import { ActiveLink } from './Link';

export const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { isConnected } = useWallet();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        minW="100%"
        h="100%"
        minH="100%"
        m={0}
        p={0}
        borderRadius={0}
      >
        <ModalBody h="100%" borderRadius={0} bg="white" color="black">
          <VStack spacing={6} h="100%" w="100%" justify="center">
            {isConnected && <ConnectWallet />}
            {ROUTES.map(r => (
              <ActiveLink href={r.path} passHref onClick={onClose} key={r.path}>
                {r.label}
              </ActiveLink>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
