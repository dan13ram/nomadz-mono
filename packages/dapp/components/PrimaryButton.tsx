import { Button, ButtonProps } from '@chakra-ui/react';

export const PrimaryButton: React.FC<ButtonProps> = props => (
  <Button
    bg="blackAlpha.50"
    borderRadius="full"
    border="2px solid black"
    color="black"
    _hover={{
      bg: 'blackAlpha.200',
    }}
    {...props}
  />
);
