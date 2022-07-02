import { ChakraProvider, Container } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import theme from '../theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Container maxW="container.xl" mt={6}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
