import Head from 'next/head'
import { Global, css } from '@emotion/react'
import { AuthProvider } from '@/lib/auth'
import { ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react'
import customTheme from '@/styles/theme'
import '@/styles/globals.css'

const themeProvider = extendTheme({ customTheme })

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <title>Feed Me Fast</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};


function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={themeProvider}>
        <AuthProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </AuthProvider>
    </ChakraProvider>
  )}

export default App
