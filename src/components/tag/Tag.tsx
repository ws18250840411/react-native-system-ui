import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Close } from 'react-native-system-icon'

import { getHairlineWidth } from '../../utils/hairline'
import { isFunction, isText } from '../../utils/validate'
import { useTagTokens } from './tokens'
import type { TagProps } from './types'

export const Tag: React.FC<TagProps> = props => {
  const {
    tokensOverride,
    children,
    type: typeProp,
    size: sizeProp,
    plain: plainProp,
    round: roundProp,
    mark: markProp,
    color,
    textColor,
    show: showProp,
    closeable,
    closeIcon,
    onClose,
    onPress,
    textStyle,
    style,
    ...rest
  } = props
  const tokens = useTagTokens(tokensOverride)

  const type = typeProp ?? tokens.defaults.type
  const size = sizeProp ?? tokens.defaults.size
  const plain = plainProp ?? tokens.defaults.plain
  const round = roundProp ?? tokens.defaults.round
  const mark = markProp ?? tokens.defaults.mark
  const show = showProp ?? tokens.defaults.show

  if (!show) {
    return null
  }

  const tone = tokens.colors.toneMap[type] ?? tokens.colors.toneMap.default
  const sizeTokens = tokens.sizing.sizes[size]
  const backgroundColor = plain ? tokens.colors.plainBackground : color ?? tone.background
  const resolvedTextColor = textColor ?? (plain ? color ?? tone.background : tone.text)

  const borderColor = plain ? color ?? tone.background : 'transparent'
  const borderWidth = plain ? getHairlineWidth() : 0

  const borderRadius = round ? tokens.radii.round : sizeTokens.borderRadius
  const baseContainerStyle: any[] = [
    tokens.layout.container,
    {
      backgroundColor,
      paddingHorizontal: sizeTokens.paddingHorizontal,
      paddingVertical: sizeTokens.paddingVertical,
      borderRadius,
      borderWidth,
      borderColor,
    },
    mark && {
      borderTopLeftRadius: tokens.radii.markLeading,
      borderBottomLeftRadius: tokens.radii.markLeading,
      borderTopRightRadius: tokens.radii.round,
      borderBottomRightRadius: tokens.radii.round,
    },
    style,
  ]

  const label =
    children == null || children === false ? null : isText(children) ? (
      <Text
        style={[
          {
            color: resolvedTextColor,
            fontSize: sizeTokens.fontSize,
            lineHeight: sizeTokens.lineHeight,
            fontFamily: tokens.typography.fontFamily,
            fontWeight: tokens.typography.fontWeight,
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    ) : (
      children
    )

  const close =
    !closeable ? null : (
      <Pressable
        accessibilityRole="button"
        hitSlop={tokens.spacing.closeHitSlop}
        style={[tokens.layout.close, { marginLeft: tokens.spacing.closeGap }]}
        onPress={event => {
          event.stopPropagation?.()
          onClose?.()
        }}
      >
        {isFunction(closeIcon)
          ? closeIcon(resolvedTextColor, tokens.sizing.closeIconSize)
          : closeIcon ?? (
            <Close
              color={resolvedTextColor}
              size={tokens.sizing.closeIconSize}
            />
          )}
      </Pressable>
    )

  return (
    <View style={baseContainerStyle} {...rest}>
      {label}
      {close}
    </View>
  )
}
