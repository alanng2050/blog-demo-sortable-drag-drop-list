import '@/styles/globals.scss'
import '@/utils/interceptors'

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'

import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Head from 'next/head'
import { queryClient } from '@/api/query-client'
import { Layout } from '@/components/Layout'
import { store, useStoreDispatch } from '@/store'
import { theme } from '@/theme'

export const AppWithStores = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useStoreDispatch()
  useEffect(() => {
    dispatch.user.fetchUser()
  }, [dispatch.user])

  return <Layout>{children}</Layout>
}

function App({ Component, pageProps }: AppProps) {
  const content = 'Website content'
  const title = 'Website title'
  const domain = 'https://domain.com'
  const previewImg = `${domain}/preview.jpg`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <link rel="icon" type="image/x-icon" href="/logo.png" />

        <meta name="description" content={content} />

        <meta property="og:description" content={content} />
        <meta property="og:image" content={previewImg} />
        <meta property="og:url" content={domain} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={content} />
        <meta name="twitter:image" content={previewImg} />
      </Head>

      {process.env.NODE_ENV !== 'development' &&
        process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}

      <QueryClientProvider client={queryClient}>
        <ChakraProvider
          theme={theme}
          toastOptions={{
            defaultOptions: {
              position: 'bottom-left',
              status: 'success',
              variant: 'simpleAlert',
            },
          }}
        >
          <Provider store={store}>
            <AppWithStores>
              <Component {...pageProps} />
            </AppWithStores>
          </Provider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(App)
