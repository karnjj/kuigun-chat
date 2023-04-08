import createCache from '@emotion/cache'
import { Components, PaletteOptions, Shadows, ThemeOptions, createTheme } from '@mui/material'
import { overrideMuiTypography } from './typography'

const palette: PaletteOptions = {}

const components: Components = {}

const shadows: Shadows = Array(25).fill('none') as Shadows

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: ['Comfortaa', 'Noto Sans Thai', 'sans-serif'].join(','),
  },
  palette: palette,
  components: components,
  shadows: shadows,
}

const buildTheme = (themeOptions: ThemeOptions) => {
  let theme = createTheme(themeOptions)
  theme = overrideMuiTypography(theme)
  return theme
}

export const theme = buildTheme(themeOptions)

export function createEmotionCache() {
  let insertionPoint

  if (typeof document !== 'undefined') {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>('meta[name="emotion-insertion-point"]')
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({ key: 'mui-style', insertionPoint })
}
