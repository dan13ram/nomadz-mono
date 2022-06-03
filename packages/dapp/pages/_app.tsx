import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import { AppLayout } from '@/components/AppLayout';
import { Head } from '@/components/Head';
import { globalStyles, theme } from '@/utils/theme';
import { WalletProvider } from '@/web3';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head />
      <Global styles={globalStyles} />
      <WalletProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </WalletProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: '1rem',
            maxWidth: '40rem',
            marginBottom: '2rem',
          },
        }}
      />
    </ChakraProvider>
  );
};

export default App;
