import React from 'react'
import type { ViewStyle, TextStyle } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface PopupTokens {
  colors: {
    overlay: string
    background: string
    title: string
    description: string
    closeIcon: string
  }
  radius: {
    round: number
    shadow: number
  }
  spacing: {
    padding: number
    titleTop: number
    titleBottom: number
    descriptionHorizontal: number
    descriptionBottom: number
    closeIconTop: number
    closeIconRight: number
    closeIconSize: number
  }
  typography: {
    titleSize: number
    titleWeight: TextStyle['fontWeight']
    descriptionSize: number
    descriptionLineHeight: number
  }
  shadow: {
    color: string
    opacity: number
    radius: number
    offsetY: number
    elevation: number
  }
  layout: {
    maxWidth: number
    minWidth: number
    centerMaxWidth: number
    sideWidth: ViewStyle['width']
  }
}

export const createPopupTokens = (foundations: Foundations): PopupTokens => ({
  colors: {
    overlay: 'rgba(0,0,0,0.5)',
    background: '#ffffff',
    title: '#323233',
    description: '#969799',
    closeIcon: '#c8c9cc',
  },
  radius: {
    round: foundations.radii.lg,
    shadow: 18,
  },
  spacing: {
    padding: 16,
    titleTop: 20,
    titleBottom: 12,
    descriptionHorizontal: 20,
    descriptionBottom: 12,
    closeIconTop: 12,
    closeIconRight: 12,
    closeIconSize: 36,
  },
  typography: {
    titleSize: 16,
    titleWeight: '500',
    descriptionSize: 14,
    descriptionLineHeight: 20,
  },
  shadow: {
    color: 'rgba(0,0,0,0.25)',
    opacity: 0.35,
    radius: 18,
    offsetY: 8,
    elevation: 24,
  },
  layout: {
    maxWidth: 420,
    minWidth: 260,
    centerMaxWidth: 360,
    sideWidth: '80%',
  },
})

export const usePopupTokens = (overrides?: DeepPartial<PopupTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createPopupTokens(foundations)
    const globalOverrides = components?.popup as DeepPartial<PopupTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [foundations, components, overrides])
}
