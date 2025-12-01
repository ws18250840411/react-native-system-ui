import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface UploaderTokens {
  size: number
  gap: number
  radius: number
  colors: {
    background: string
    border: string
    text: string
    icon: string
    deleteBackground: string
    deleteIcon: string
    maskBackground: string
    maskText: string
    failed: string
  }
}

const createTokens = (foundations: Foundations): UploaderTokens => {
  const { palette, spacing, radii } = foundations
  return {
    size: 80,
    gap: spacing.sm,
    radius: radii.md,
    colors: {
      background: palette.default[100],
      border: 'rgba(0,0,0,0.08)',
      text: palette.default[500],
      icon: palette.default[500],
      deleteBackground: 'rgba(0,0,0,0.65)',
      deleteIcon: '#fff',
      maskBackground: 'rgba(0,0,0,0.45)',
      maskText: '#fff',
      failed: palette.danger[500],
    },
  }
}

export const useUploaderTokens = (overrides?: DeepPartial<UploaderTokens>): UploaderTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.uploader as DeepPartial<UploaderTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
