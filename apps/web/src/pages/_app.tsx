import { createEmotionCache, theme } from '@/theme'
import type { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import DesktopLayout from '@/Layout/DesktopLayout'
import { SessionProvider } from '@/contexts/sessionContext'
import { SocketProvider } from '@/contexts/socketContext'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <SocketProvider>
            <CssBaseline />
            <DesktopLayout>
              <Component {...pageProps} />
            </DesktopLayout>
          </SocketProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
