import createCache from '@emotion/cache'
import { Components, PaletteOptions, Shadows, ThemeOptions, createTheme } from '@mui/material'
import { overrideMuiTypography } from './typography'

declare module '@mui/material/styles' {
  interface Palette {
    badge: {
      lime: string
    }
    white: string
    black: string
    yellow: string
  }

  interface PaletteOptions {
    badge: {
      lime: string
    }
    white: string
    black: string
    yellow: string
  }
}

const palette: PaletteOptions = {
  primary: {
    main: '#79AF8D',
    light: '#B6CD92',
    dark: '#366A74',
    contrastText: '#2F4858',
  },
  secondary: {
    main: '#79AF8D',
    dark: '#B6CD92',
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
  white: '#FFFFFF',
  black: '#000000',
  yellow: '#FFD600',
}

const components: Components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
      },
    },
  },
}

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
