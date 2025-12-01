import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface ImageTokens {
  colors: {
    background: string
    text: string
    error: string
  }
  radius: {
    default: number
  }
}

const createTokens = (foundations: Foundations): ImageTokens => {
  const { palette, radii } = foundations
  return {
    colors: {
      background: palette.background?.muted ?? '#f7f8fa',
      text: palette.default[500],
      error: palette.danger?.[500] ?? '#fa5151',
    },
    radius: {
      default: radii.md,
    },
  }
}

export const useImageTokens = (
  overrides?: DeepPartial<ImageTokens>,
): ImageTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.image as DeepPartial<ImageTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
