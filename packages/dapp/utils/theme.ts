import { extendTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';

// const Input = {
//   variants: {
//     outline: {
//       field: {
//         _focus: {
//           borderColor: 'transparent',
//           boxShadow: '0px 0px 0px 2px #AD90FF',
//         },
//       },
//     },
//   },
// };

export const theme = extendTheme({
  breakpoints: {
    '3xl': '108em',
    '2xl': '96em',
    base: '0em',
    lg: '62em',
    md: '48em',
    sm: '30em',
    xl: '80em',
  },
  sizes: {
    '9xl': '108rem',
    '10xl': '120em',
  },
  fonts: {
    // heading: `'Nineties Display', sans-serif`,
    // body: `'Baumans Regular', sans-serif`,
  },
  colors: {},
  shadows: {
    // outline: '0px 0px 0px 2px #AD90FF',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    // Input,
  },
});

export const globalStyles = css`
  body {
    background: #ffffff;
    overflow-x: hidden;
  }
`;
