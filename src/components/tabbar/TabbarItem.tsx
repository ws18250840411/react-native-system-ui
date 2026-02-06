import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useAriaPress } from '../../hooks'
import { isFunction, isPlainObject, isRenderable, isText } from '../../utils/validate'
import Badge from '../badge'
import { useTabbarContext } from './TabbarContext'
import { useTabbarTokens } from './tokens'
import type { TabbarItemProps, TabbarValue } from './types'
import type { BadgeProps } from '../badge/types'

const TabbarItemImpl: React.FC<TabbarItemProps> = p => {
  const { name, icon, badge, dot = false, onClick, textStyle, iconStyle, children, disabled = false, style, index, testID, iconSize, tokensOverride, ...rest } = p
  const t = useTabbarTokens(tokensOverride)
  const ctx = useTabbarContext()
  if (!ctx) return null
  const in_ = (name ?? index ?? 0) as TabbarValue
  const ia = ctx.activeValue === in_
  const c = ia ? ctx.activeColor : ctx.inactiveColor
  const ris = iconSize ?? t.icon.size
  const ait = useCallback((n: React.ReactNode) => { if (!React.isValidElement(n)) return n; const e = n as React.ReactElement<Record<string, unknown>>; const np: Record<string, unknown> = {}; const pr = e.props ?? {}; if (pr['size'] == null) np['size'] = ris; if (pr['fill'] == null) np['fill'] = c; if (pr['color'] == null) np['color'] = c; if (pr['style'] != null) np['style'] = [pr['style'], { color: c }]; return React.cloneElement(e, np) }, [c, ris])
  const ri = useCallback(() => { if (!icon) return null; const r = isFunction(icon) ? icon(ia) : icon; return ait(r) }, [ait, icon, ia])
  const rl = useCallback(() => (isFunction(children) ? children(ia) : children), [children, ia])
  const ap = useAriaPress({ disabled, onPress: () => { if (!disabled) { onClick?.(); ctx.onSelect(in_, index ?? 0) } }, extraProps: { accessibilityRole: 'tab', accessibilityState: { selected: ia, disabled }, testID: testID ?? `rv-tabbar-item-${in_}` } })
  const srb = dot || isRenderable(badge)
  const rb = useCallback(() => { if (isRenderable(badge)) { if (isText(badge)) return <Badge content={badge} />; if (isPlainObject(badge)) { const bp = badge as BadgeProps; return <Badge {...bp} dot={dot || bp.dot} /> }; return badge as React.ReactNode }; return <Badge dot /> }, [badge, dot])
  const is_ = [S.i, { height: t.layout.height, paddingVertical: t.layout.paddingVertical, opacity: disabled ? 0.5 : 1 }, style]
  const ls = [S.l, { color: c, fontSize: ctx.fontSize, fontWeight: ctx.fontWeight, lineHeight: ctx.fontSize }, textStyle]
  return <Pressable {...rest} {...ap.interactionProps} style={is_}><View style={[S.iw, iconStyle]}>{ri()}{srb && <View style={S.b}>{rb()}</View>}</View>{isRenderable(children) ? <Text style={ls}>{rl()}</Text> : null}</Pressable>
}

const S = StyleSheet.create({
  i: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  iw: { alignItems: 'center', justifyContent: 'center' },
  b: { position: 'absolute', top: -4, right: -12 },
  l: { includeFontPadding: false },
})

const TabbarItem = React.memo(TabbarItemImpl)
TabbarItem.displayName = 'Tabbar.Item'

export default TabbarItem
