import type { FlexStyle } from 'react-native'

type Dir = 'ltr' | 'rtl'

/** Flip horizontal style values for RTL layouts */
export const flipStyle = <T extends FlexStyle>(style: T, dir: Dir): T => {
  if (dir !== 'rtl') return style
  const out = { ...style } as Record<string, unknown>
  const swaps: [string, string][] = [
    ['paddingLeft', 'paddingRight'],
    ['marginLeft', 'marginRight'],
    ['borderLeftWidth', 'borderRightWidth'],
    ['borderTopLeftRadius', 'borderTopRightRadius'],
    ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    ['left', 'right'],
  ]
  for (const [a, b] of swaps) {
    if (a in out || b in out) { const t = out[a]; out[a] = out[b]; out[b] = t }
  }
  if (out.flexDirection === 'row') out.flexDirection = 'row-reverse'
  else if (out.flexDirection === 'row-reverse') out.flexDirection = 'row'
  return out as T
}

/** Get `flexDirection` respecting RTL */
export const rtlRow = (dir: Dir): FlexStyle['flexDirection'] =>
  dir === 'rtl' ? 'row-reverse' : 'row'
