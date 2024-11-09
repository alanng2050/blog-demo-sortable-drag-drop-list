import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import { theme } from '@/theme'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </Head>
      <body>
        <ColorModeScript
          nonce=""
          initialColorMode={theme.config.initialColorMode}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
