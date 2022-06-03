import {
  Image,
  ImageProps,
  Stack,
  StackProps,
  Tag,
  Text,
  TextProps,
} from '@chakra-ui/react';

import { AVAILABLE_NETWORK_INFO } from '@/web3';

export const NetworkDisplay: React.FC<
  {
    chainId: string;
    imageProps?: ImageProps;
    textProps?: TextProps;
  } & StackProps
> = ({ chainId, imageProps, textProps, ...props }) => {
  const networkInfo = AVAILABLE_NETWORK_INFO[chainId];
  if (!networkInfo) return null;
  const { image, label } = networkInfo;
  const inner = (
    <Stack direction="row-reverse" align="center" {...props}>
      <Image src={image} alt={label} boxSize="1.5rem" {...imageProps} />
      <Text as="span" fontWeight="bold" {...textProps}>
        {label}
      </Text>
    </Stack>
  );

  return (
    <Tag borderRadius="full" colorScheme="black" pl={2} pr={1} py={1}>
      {inner}
    </Tag>
  );
};
