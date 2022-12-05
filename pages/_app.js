import Head from 'next/head'
import { Global, css } from '@emotion/react'
import { AuthProvider } from '@/lib/auth'
import { ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react'
import customTheme from '@/styles/theme'
import '@/styles/globals.css'
import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import ProtectedRoutes from '@/components/ProtectedRoutes'

const themeProvider = extendTheme({ customTheme })

const GlobalStyle = ({ children }) => {
  return (
    <>
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


function App({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={themeProvider}>
        <AuthProvider>
          <ProtectedRoutes router={router}>
            <GlobalStyle />
            <DefaultSeo {...SEO}/>
            <Component {...pageProps} />
          </ProtectedRoutes>
        </AuthProvider>
    </ChakraProvider>
  )}

export default App
