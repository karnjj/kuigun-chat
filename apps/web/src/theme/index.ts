import createCache from '@emotion/cache'
import { Components, PaletteOptions, Shadows, ThemeOptions, createTheme } from '@mui/material'
import { overrideMuiTypography } from './typography'

declare module '@mui/material/styles' {
  interface Palette {
    badge: {
      lime: string
    }
  }

  interface PaletteOptions {
    badge: {
      lime: string
    }
  }
}

const palette: PaletteOptions = {
  primary: {
    main: '#79AF8D',
    light: '#B6DA7E',
    dark: '#366A74',
    contrastText: '#2F4858',
  },
  secondary: {
    main: '#B2AB99',
    dark: '#4C4637',
    contrastText: '#FFF0CA',
  },
  background: {
    default: '#FFE7A1',
    paper: '#B6CD92',
  },
  text: {
    primary: '#2F4858',
    secondary: '#FFF0CA',
  },
  badge: {
    lime: '#C2FF9D',
  },
}

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
