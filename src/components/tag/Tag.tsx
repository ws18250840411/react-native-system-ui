import React from 'react'
import { Pressable, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'
import { Close } from 'react-native-system-icon'
import { createHairlineView, isFunction, renderTextOrNode } from '../../utils'
import { isRenderable } from '../../utils/validate'
import { useDirection } from '../config-provider/useDirection'
import { useTagTokens } from './tokens'
import type { TagProps } from './types'

const TagImpl: React.FC<TagProps> = props => {
  const { tokensOverride, children, type: typeProp, size: sizeProp, plain: plainProp, round: roundProp, mark: markProp, color, textColor, show: showProp, closeable, closeIcon, onClose, onPress, textStyle, style, ...rest } = props
  const tokens = useTagTokens(tokensOverride)
  const dir = useDirection()
  const type = typeProp ?? tokens.defaults.type
  const size = sizeProp ?? tokens.defaults.size
  const plain = plainProp ?? tokens.defaults.plain
  const round = roundProp ?? tokens.defaults.round
  const mark = markProp ?? tokens.defaults.mark
  const show = showProp ?? tokens.defaults.show
  if (!show) return null
  const tone = tokens.colors.toneMap[type] ?? tokens.colors.toneMap.default
  const sizeTokens = tokens.sizing.sizes[size]
  const backgroundColor = plain ? tokens.colors.plainBackground : color ?? tone.background
  const resolvedTextColor = textColor ?? (plain ? color ?? tone.background : tone.text)
  const borderColor = plain ? color ?? tone.background : 'transparent'
  const borderRadius = round ? tokens.radii.round : sizeTokens.borderRadius
  const markRadii = mark
    ? dir === 'rtl'
      ? { borderTopRightRadius: tokens.radii.markLeading, borderBottomRightRadius: tokens.radii.markLeading, borderTopLeftRadius: tokens.radii.round, borderBottomLeftRadius: tokens.radii.round }
      : { borderTopLeftRadius: tokens.radii.markLeading, borderBottomLeftRadius: tokens.radii.markLeading, borderTopRightRadius: tokens.radii.round, borderBottomRightRadius: tokens.radii.round }
    : null
  const resolvedRadius = mark ? tokens.radii.round : borderRadius
  const containerStyle: StyleProp<ViewStyle> = [tokens.layout.container, { backgroundColor, paddingHorizontal: sizeTokens.paddingHorizontal, paddingVertical: sizeTokens.paddingVertical, borderRadius }, markRadii, style]
  const label = !isRenderable(children) ? null : renderTextOrNode(children, [{ color: resolvedTextColor, fontSize: sizeTokens.fontSize, lineHeight: sizeTokens.lineHeight, fontFamily: tokens.typography.fontFamily, fontWeight: tokens.typography.fontWeight }, textStyle].filter(Boolean) as StyleProp<TextStyle>)
  const close = closeable && <Pressable accessibilityRole="button" hitSlop={tokens.spacing.closeHitSlop} style={[tokens.layout.close, { marginLeft: tokens.spacing.closeGap }]} onPress={event => { event.stopPropagation?.(); onClose?.() }}>{isFunction(closeIcon) ? closeIcon(resolvedTextColor, tokens.sizing.closeIconSize) : closeIcon ?? <Close color={resolvedTextColor} size={tokens.sizing.closeIconSize} />}</Pressable>
  const hairlineOverlay = plain ? <View style={createHairlineView({ position: 'all', color: borderColor, borderRadius: resolvedRadius })} /> : null
  const content = <>{label}{close}{hairlineOverlay}</>
  if (onPress) return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [containerStyle, pressed && { opacity: tokens.defaults.pressedOpacity }]} {...rest}>{content}</Pressable>
  return <View style={containerStyle} {...rest}>{content}</View>
}

export const Tag = React.memo(TagImpl)
Tag.displayName = 'Tag'
