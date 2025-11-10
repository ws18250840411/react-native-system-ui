import type { DeepPartial } from '../types'

export type ThemeTokens = {
  colors: {
    primary: string
    primaryHover: string
    primaryPlain: string
    onPrimary: string
    neutral: string
    neutralHover: string
    neutralPlain: string
    onNeutral: string
    neutralBorder: string
    surface: string
    surfaceSubtle: string
    surfaceRaised: string
    surfaceInverse: string
    border: string
    borderStrong: string
    text: string
    textMuted: string
    textOnDark: string
    success: string
    successHover: string
    successPlain: string
    onSuccess: string
    danger: string
    dangerHover: string
    dangerPlain: string
    onDanger: string
    warning: string
    warningHover: string
    warningPlain: string
    onWarning: string
    buttonDefaultBackground: string
    buttonDefaultBorder: string
    buttonDefaultText: string
    tagDefaultBackground: string
    tagDefaultText: string
    toastBackground: string
    toastText: string
    toastSuccess: string
    toastDanger: string
    toastWarning: string
  }
  spacing: {
    none: number
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    '2xl': number
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
  elevation: {
    level0: number
    level1: number
    level2: number
  }
  motion: {
    durationFast: number
    durationNormal: number
    durationSlow: number
  }
  opacity: {
    hover: number
    pressed: number
    disabled: number
  }
  typography: {
    fontFamily: string
    fontFamilyMono: string
    weightRegular: string | number
    weightMedium: string | number
    weightSemibold: string | number
    fontSizeXs: number
    fontSizeSm: number
    fontSizeMd: number
    fontSizeLg: number
    lineHeightTight: number
    lineHeightBase: number
    lineHeightRelaxed: number
  }
}

export type ThemeOverride = DeepPartial<ThemeTokens>

export const defaultThemeTokens: ThemeTokens = {
  colors: {
    primary: '#1989fa',
    primaryHover: '#1774d6',
    primaryPlain: '#ecf5ff',
    onPrimary: '#ffffff',
    neutral: '#f7f8fa',
    neutralHover: '#f2f3f5',
    neutralPlain: '#ffffff',
    onNeutral: '#323233',
    neutralBorder: '#c8c9cc',
    surface: '#ffffff',
    surfaceSubtle: '#f7f8fa',
    surfaceRaised: '#f1f2f5',
    surfaceInverse: '#111827',
    border: 'rgba(50, 50, 51, 0.08)',
    borderStrong: 'rgba(50, 50, 51, 0.16)',
    text: '#111827',
    textMuted: '#646566',
    textOnDark: '#f7f8fa',
    success: '#07c160',
    successHover: '#05a24f',
    successPlain: '#e8f9f1',
    onSuccess: '#ffffff',
    danger: '#ee0a24',
    dangerHover: '#d5001d',
    dangerPlain: '#fde3e5',
    onDanger: '#ffffff',
    warning: '#ff976a',
    warningHover: '#ff7a45',
    warningPlain: '#fff2e8',
    onWarning: '#ffffff',
    buttonDefaultBackground: '#ffffff',
    buttonDefaultBorder: '#c8c9cc',
    buttonDefaultText: '#323233',
    tagDefaultBackground: '#f4f5f7',
    tagDefaultText: '#323233',
    toastBackground: 'rgba(50, 50, 51, 0.92)',
    toastText: '#f7f8fa',
    toastSuccess: '#07c160',
    toastDanger: '#ee0a24',
    toastWarning: '#ff976a',
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
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
  elevation: {
    level0: 0,
    level1: 3,
    level2: 6,
  },
  motion: {
    durationFast: 150,
    durationNormal: 220,
    durationSlow: 320,
  },
  opacity: {
    hover: 0.85,
    pressed: 0.75,
    disabled: 0.45,
  },
  typography: {
    fontFamily: 'System',
    fontFamilyMono: 'Menlo',
    weightRegular: '400',
    weightMedium: '500',
    weightSemibold: '600',
    fontSizeXs: 12,
    fontSizeSm: 14,
    fontSizeMd: 16,
    fontSizeLg: 18,
    lineHeightTight: 16,
    lineHeightBase: 20,
    lineHeightRelaxed: 24,
  },
}

const isRecord = (value: unknown): value is Record<string, any> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const deepMerge = (source: any, override: Record<string, any>): any => {
  const next = { ...source }
  for (const key of Object.keys(override)) {
    const overrideValue = override[key]
    if (overrideValue === undefined) continue
    const baseValue = (source as any)[key]
    if (isRecord(baseValue) && isRecord(overrideValue)) {
      next[key] = deepMerge(baseValue, overrideValue)
    } else {
      next[key] = overrideValue
    }
  }
  return next
}

export const mergeTokens = (base: ThemeTokens, override?: ThemeOverride): ThemeTokens => {
  if (!override) return base
  return deepMerge(base, override)
}

export const darkThemeOverride: ThemeOverride = {
  colors: {
    surface: '#11151A',
    surfaceSubtle: '#0F172A',
    surfaceRaised: '#1E293B',
    surfaceInverse: '#F8FAFC',
    border: 'rgba(148, 163, 184, 0.25)',
    borderStrong: 'rgba(148, 163, 184, 0.4)',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    textOnDark: '#0F172A',
    primary: '#3B82F6',
    primaryHover: '#2563EB',
    primaryPlain: 'rgba(59, 130, 246, 0.12)',
    onPrimary: '#0F172A',
    neutral: '#1F2937',
    neutralHover: '#374151',
    neutralPlain: 'rgba(30, 41, 59, 0.6)',
    onNeutral: '#E2E8F0',
    neutralBorder: '#475569',
    success: '#22C55E',
    successHover: '#16A34A',
    successPlain: 'rgba(34, 197, 94, 0.18)',
    onSuccess: '#052E16',
    warning: '#F59E0B',
    warningHover: '#D97706',
    warningPlain: 'rgba(245, 158, 11, 0.18)',
    onWarning: '#0F172A',
    danger: '#F87171',
    dangerHover: '#EF4444',
    dangerPlain: 'rgba(248, 113, 113, 0.18)',
    onDanger: '#450A0A',
    tagDefaultBackground: '#1F2937',
    tagDefaultText: '#E2E8F0',
    buttonDefaultBackground: '#1F2937',
    buttonDefaultBorder: '#475569',
    buttonDefaultText: '#E2E8F0',
    toastBackground: 'rgba(2, 6, 23, 0.88)',
    toastText: '#F8FAFC',
    toastSuccess: '#4ADE80',
    toastDanger: '#F87171',
    toastWarning: '#FBBF24',
  },
}
