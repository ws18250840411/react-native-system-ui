import type { TextStyle } from 'react-native'
import type { DeepPartial } from '../types'
import { deepMerge } from '../utils/deepMerge'

export type FontWeight = Exclude<TextStyle['fontWeight'], undefined>

export type PaletteRamp = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  foreground?: string
}

export interface Foundations {
  palette: {
    default: PaletteRamp
    primary: PaletteRamp
    info: PaletteRamp
    success: PaletteRamp
    warning: PaletteRamp
    danger: PaletteRamp
  }
  spacing: {
    none: number
    xxs: number
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    xxl: number
  }
  radii: {
    none: number
    xs: number
    sm: number
    md: number
    lg: number
    pill: number
    full: number
  }
  fontSize: {
    xxs: number
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  typography: {
    fontFamily: string
    weight: {
      regular: FontWeight
      medium: FontWeight
      semiBold: FontWeight
      bold: FontWeight
    }
    lineHeightMultiplier: number
  }
  opacity: {
    disabled: number
    loading: number
    pressed: number
  }
}

export const defaultFoundations: Foundations = {
  palette: {
    default: {
      50: '#f7f8fa',
      100: '#f1f2f5',
      200: '#e3e5eb',
      300: '#c8ccd6',
      400: '#a8aebb',
      500: '#888f9f',
      600: '#6d7483',
      700: '#505560',
      800: '#353840',
      900: '#191a1f',
      foreground: '#222222',
    },
    primary: {
      50: '#f5f8ff',
      100: '#e1e9ff',
      200: '#c2d4ff',
      300: '#9bb8ff',
      400: '#6d94ff',
      500: '#4770ff',
      600: '#2f51e0',
      700: '#243eb1',
      800: '#1a2d82',
      900: '#111d55',
      foreground: '#ffffff',
    },
    info: {
      50: '#f0f8ff',
      100: '#d9ecff',
      200: '#b9dcff',
      300: '#8bc3ff',
      400: '#5aa7ff',
      500: '#328dff',
      600: '#1d6fde',
      700: '#1753a9',
      800: '#113a75',
      900: '#0a2143',
      foreground: '#ffffff',
    },
    success: {
      50: '#f2fbf6',
      100: '#dcf5e7',
      200: '#b8e9cf',
      300: '#8ddbb1',
      400: '#5fcf93',
      500: '#31c174',
      600: '#1da45e',
      700: '#128047',
      800: '#0a5c32',
      900: '#043719',
      foreground: '#ffffff',
    },
    warning: {
      50: '#fff8ec',
      100: '#ffecc7',
      200: '#ffd595',
      300: '#ffbc63',
      400: '#ffa035',
      500: '#ff8414',
      600: '#d9650b',
      700: '#ad4905',
      800: '#7f3101',
      900: '#4d1c00',
      foreground: '#261400',
    },
    danger: {
      50: '#fff1f2',
      100: '#ffd8dd',
      200: '#ffadb7',
      300: '#ff8090',
      400: '#ff556c',
      500: '#f2324c',
      600: '#ce1733',
      700: '#a30f27',
      800: '#770819',
      900: '#47040b',
      foreground: '#ffffff',
    },
  },
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
  },
  radii: {
    none: 0,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    pill: 999,
    full: 9999,
  },
  fontSize: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  typography: {
    fontFamily: 'System',
    weight: {
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
    lineHeightMultiplier: 1.2,
  },
  opacity: {
    disabled: 0.45,
    loading: 0.65,
    pressed: 0.85,
  },
}

export const buildFoundations = (overrides?: DeepPartial<Foundations>) => {
  if (!overrides) {
    return defaultFoundations
  }
  return deepMerge(defaultFoundations, overrides)
}

export type ThemeTokens = Foundations

export const createTokens = (overrides?: DeepPartial<Foundations>): ThemeTokens => {
  return buildFoundations(overrides)
}

export const defaultTokens = defaultFoundations
