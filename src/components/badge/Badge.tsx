import React, { useCallback, useState } from 'react'
import { Pressable, View, type LayoutChangeEvent, type ViewStyle } from 'react-native'
import { isNumericLike } from '../../utils/number'
import { isRenderable } from '../../utils/base'
import { renderTextOrNode } from '../../utils/render'
import { useBadgeTokens } from './tokens'
import type { BadgeProps } from './types'

const BadgeImpl = (props: BadgeProps, ref: React.ForwardedRef<View>) => {
  const { children, content, color, textColor, dot: dotP, max, offset, showZero: showZeroP, badgeStyle, textStyle, onPress, style, tokensOverride, ...rest } = props; const tokens = useBadgeTokens(tokensOverride); const dot = dotP ?? tokens.defaults.dot; const showZero = showZeroP ?? tokens.defaults.showZero; const hasCh = React.Children.count(children) > 0
  const num = isNumericLike(content) ? Number(content) : null; const hide = num === 0 && !showZero; const visible = dot || (isRenderable(content) && !hide); const numMax = isNumericLike(max) ? Number(max) : null; const formattedContent = visible && !dot && num !== null && numMax !== null && num > numMax ? `${numMax}+` : content; const [sz, setSz] = useState({ width: 0, height: 0 }); const onLay = useCallback((e: LayoutChangeEvent) => { const { width, height } = e.nativeEvent.layout; setSz(prev => prev.width === width && prev.height === height ? prev : { width, height }) }, [])
  const transStyle = !hasCh ? undefined : dot ? { transform: [{ translateX: tokens.sizing.dotSize / 2 }, { translateY: -tokens.sizing.dotSize / 2 }] } : sz.width === 0 ? { opacity: 0 } : { transform: [{ translateX: sz.width / 2 }, { translateY: -sz.height / 2 }] }; const boxStyle = dot ? { width: tokens.sizing.dotSize, height: tokens.sizing.dotSize, borderRadius: tokens.radii.dot, backgroundColor: color ?? tokens.colors.dot } : { minWidth: tokens.sizing.minWidth, minHeight: tokens.sizing.height, paddingHorizontal: tokens.sizing.paddingHorizontal, paddingVertical: tokens.sizing.paddingVertical, borderRadius: tokens.radii.badge, borderWidth: tokens.borders.width, borderColor: tokens.colors.border, backgroundColor: color ?? tokens.colors.background }; const txtStyle = [tokens.layout.text, { color: textColor ?? tokens.colors.text, fontSize: tokens.typography.fontSize, lineHeight: tokens.typography.lineHeight, fontFamily: tokens.typography.fontFamily, fontWeight: tokens.typography.fontWeight }, textStyle]; const offStyle = !offset ? undefined : (hasCh ? { right: offset[0], top: offset[1] } : { marginLeft: offset[0], marginTop: offset[1] }) as ViewStyle
  const badgeEl = !visible ? null : <View pointerEvents={hasCh ? 'none' : 'auto'} onLayout={hasCh && !dot ? onLay : undefined} style={[hasCh ? tokens.layout.badgeAbsolute : tokens.layout.badgeStandalone, boxStyle, transStyle, offStyle, badgeStyle, !hasCh ? style : undefined]}>{!dot && renderTextOrNode(formattedContent, txtStyle)}</View>; const accLabel = visible ? (dot ? 'has new content' : `${formattedContent}`) : undefined
  if (hasCh) return onPress ? <Pressable ref={ref} onPress={onPress} accessibilityLabel={accLabel} style={({ pressed }) => [tokens.layout.wrapper, style, pressed && { opacity: tokens.defaults.pressedOpacity }]} {...rest}>{children}{badgeEl}</Pressable> : <View ref={ref} style={[tokens.layout.wrapper, style]} {...rest}>{children}{badgeEl}</View>
  if (!visible) return null; return onPress ? <Pressable ref={ref} onPress={onPress} style={({ pressed }) => [tokens.layout.pressableStandalone, pressed && { opacity: tokens.defaults.pressedOpacity }]} {...rest}>{badgeEl}</Pressable> : React.cloneElement(badgeEl as React.ReactElement<any>, { ref, ...rest })
}

const BadgeForwardRef = React.forwardRef<View, BadgeProps>(BadgeImpl)
BadgeForwardRef.displayName = 'Badge'
export const Badge = React.memo(BadgeForwardRef)
