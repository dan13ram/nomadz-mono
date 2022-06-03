import { Box, BoxProps } from '@chakra-ui/react';

const HEIGHT = '0.4rem';

const lineProps = {
  backgroundColor: 'black',
  borderRadius: 'full',
  content: '""',
  display: 'block',
  height: HEIGHT,
  minH: HEIGHT,
  maxH: HEIGHT,
  mx: 0,
  my: '0.3rem',
  width: '100%',
  transition: 'all 0.25s ease-in-out',
};

export const NavToggle: React.FC<BoxProps & { isOpen: boolean }> = ({
  isOpen,
  ...props
}) => {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        padding: 0,
        margin: 0,
        width: '2.5rem',
      }}
      {...props}
    >
      <Box
        sx={{
          ...lineProps,
          transform: isOpen ? 'translateY(0.7rem) rotate(45deg)' : 'unset',
        }}
      />
      <Box sx={{ ...lineProps, transform: isOpen ? 'scale(0)' : 'unset' }} />
      <Box
        sx={{
          ...lineProps,
          transform: isOpen ? 'translateY(-0.7rem) rotate(-45deg)' : 'unset',
        }}
      />
    </Box>
  );
};
