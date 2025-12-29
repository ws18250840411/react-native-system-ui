import React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { ToastType } from './Toast'

export interface ToastTokens {
  colors: {
    text: string
    backdrop: string
    variants: Record<ToastType, string>
  }
  fontSize: number
  lineHeight: number
  radius: number
  gap: number
  iconSize: number
  maxWidth: number | string
  textMinWidth: number
  textPaddingVertical: number
  textPaddingHorizontal: number
  defaultPadding: number
  defaultWidth: number
  defaultMinHeight: number
  // Animation duration
  animationDuration: number
}

export const createToastTokens = (foundations: Foundations): ToastTokens => ({
  colors: {
    text: '#ffffff',
    backdrop: 'rgba(0,0,0,0.7)',
    variants: {
      info: 'rgba(0,0,0,0.7)',
      success: 'rgba(0,0,0,0.7)',
      fail: 'rgba(0,0,0,0.7)',
      loading: 'rgba(0,0,0,0.7)',
    },
  },
  fontSize: foundations.fontSize.sm,
  lineHeight: Math.round(foundations.fontSize.sm * foundations.typography.lineHeightMultiplier),
  radius: foundations.radii.md,
  gap: foundations.spacing.sm,
  iconSize: 36,
  maxWidth: '70%',
  textMinWidth: 96,
  textPaddingVertical: foundations.spacing.sm,
  textPaddingHorizontal: foundations.spacing.md,
  defaultPadding: foundations.spacing.lg,
  defaultWidth: 88,
  defaultMinHeight: 88,
  animationDuration: 160,
})

export const useToastTokens = (overrides?: DeepPartial<ToastTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createToastTokens(foundations)
    const globalOverrides = components?.toast as DeepPartial<ToastTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [foundations, components, overrides])
}
