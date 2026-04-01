import React from 'react'
import { Pressable, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'
import { Close } from '../../internal/icons'
import { createHairlineView, isFunction, renderTextOrNode } from '../../utils'
import { isRenderable } from '../../utils/validate'
import { useDirection } from '../config-provider/useDirection'
import { useTagTokens } from './tokens'
import type { TagProps } from './types'

const TagImpl: React.FC<TagProps> = props => {
  const { tokensOverride, children, type: typeP, size: sizeP, plain: plainP, round: roundP, mark: markP, color, textColor, show: showP, closeable, closeIcon, onClose, onPress, textStyle, style, ...rest } = props; const tokens = useTagTokens(tokensOverride); const dir = useDirection(); const type = typeP ?? tokens.defaults.type; const size = sizeP ?? tokens.defaults.size; const plain = plainP ?? tokens.defaults.plain; const round = roundP ?? tokens.defaults.round; const mark = markP ?? tokens.defaults.mark; const show = showP ?? tokens.defaults.show; if (!show) return null
  const tone = tokens.colors.toneMap[type] ?? tokens.colors.toneMap.default; const szTok = tokens.sizing.sizes[size]; const bgClr = plain ? tokens.colors.plainBackground : color ?? tone.background; const txtClr = textColor ?? (plain ? color ?? tone.background : tone.text); const borderClr = plain ? color ?? tone.background : 'transparent'; const radius = round ? tokens.radii.round : szTok.borderRadius; const markR = mark ? (dir === 'rtl' ? { borderTopRightRadius: tokens.radii.markLeading, borderBottomRightRadius: tokens.radii.markLeading, borderTopLeftRadius: tokens.radii.round, borderBottomLeftRadius: tokens.radii.round } : { borderTopLeftRadius: tokens.radii.markLeading, borderBottomLeftRadius: tokens.radii.markLeading, borderTopRightRadius: tokens.radii.round, borderBottomRightRadius: tokens.radii.round }) : null; const resRadius = mark ? tokens.radii.round : radius
  const ctrStyle: StyleProp<ViewStyle> = [tokens.layout.container, { backgroundColor: bgClr, paddingHorizontal: szTok.paddingHorizontal, paddingVertical: szTok.paddingVertical, borderRadius: radius }, markR, style]; const label = !isRenderable(children) ? null : renderTextOrNode(children, [{ color: txtClr, fontSize: szTok.fontSize, lineHeight: szTok.lineHeight, fontFamily: tokens.typography.fontFamily, fontWeight: tokens.typography.fontWeight }, textStyle].filter(Boolean) as StyleProp<TextStyle>); const close = closeable && <Pressable accessibilityRole="button" hitSlop={tokens.spacing.closeHitSlop} style={[tokens.layout.close, { marginLeft: tokens.spacing.closeGap }]} onPress={e => { e.stopPropagation?.(); onClose?.() }}>{isFunction(closeIcon) ? closeIcon(txtClr, tokens.sizing.closeIconSize) : closeIcon ?? <Close color={txtClr} size={tokens.sizing.closeIconSize} />}</Pressable>; const hlOverlay = plain ? <View style={createHairlineView({ position: 'all', color: borderClr, borderRadius: resRadius })} /> : null; const content = <>{label}{close}{hlOverlay}</>; if (onPress) return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [ctrStyle, pressed && { opacity: tokens.defaults.pressedOpacity }]} {...rest}>{content}</Pressable>; return <View style={ctrStyle} {...rest}>{content}</View>
}

export const Tag = React.memo(TagImpl)
Tag.displayName = 'Tag'
