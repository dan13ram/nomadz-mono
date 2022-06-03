import { Button, ButtonProps } from '@chakra-ui/react';

export const PrimaryButton: React.FC<ButtonProps> = props => (
  <Button
    px={20}
    bg="blackAlpha.50"
    fontWeight="400"
    borderRadius="full"
    backdropFilter="blur(40px)"
    border="2px solid black"
    color="black"
    letterSpacing={4}
    fontSize={30}
    height={16}
    _hover={{
      bg: 'blackAlpha.200',
    }}
    {...props}
  />
);
