import { StyleSheet } from 'react-native'
import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { WaterMarkTokens } from './types'
const createTokens = (foundations: Foundations): WaterMarkTokens => {
  const { palette } = foundations
  return {
    defaults: { content: 'WaterMark', width: 120, height: 64, gapX: 24, gapY: 48, rotate: -22, fontSize: 14, opacity: 0.15, zIndex: 2000, fullPage: true, },
    layout: {
      absoluteFill: StyleSheet.absoluteFillObject,
      wrapper: { flex: 1, },
      row: { flexDirection: 'row', },
      cell: { alignItems: 'center', justifyContent: 'center', },
      mark: { alignItems: 'center', justifyContent: 'center', },
    },
    colors: { mark: palette.default[500], },
  }
}
export const useWaterMarkTokens = createComponentTokensHook('waterMark', createTokens)
