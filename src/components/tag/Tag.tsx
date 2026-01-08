import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Close } from 'react-native-system-icon'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { getHairlineWidth } from '../../utils/hairline'
import { isText } from '../../utils/validate'
import type { TagProps, TagTokens } from './types'

const buildTone = (
  palette: Foundations['palette'],
  key: keyof Foundations['palette'],
  fallbackText?: string
) => ({
  background: palette[key][500],
  text: fallbackText ?? palette[key].foreground ?? '#ffffff',
})

const createTagTokens = (foundations: Foundations): TagTokens => {
  const { palette, radii, typography } = foundations

  return {
    defaults: {
      type: 'default',
      size: 'small',
      plain: false,
      round: false,
      mark: false,
    },
    toneMap: {
      default: buildTone(palette, 'default', '#ffffff'),
      primary: buildTone(palette, 'primary'),
      success: buildTone(palette, 'success'),
      warning: buildTone(palette, 'warning', palette.warning.foreground ?? palette.warning[900]),
      danger: buildTone(palette, 'danger'),
    },
    sizes: {
      mini: {
        fontSize: 10,
        paddingHorizontal: 4,
        paddingVertical: 0,
        borderRadius: 2,
        lineHeight: 16,
      },
      small: {
        fontSize: 12,
        paddingHorizontal: 4,
        paddingVertical: 0,
        borderRadius: 2,
        lineHeight: 16,
      },
      medium: {
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        lineHeight: 16,
      },
      large: {
        fontSize: 14,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        lineHeight: 16,
      },
    },
    radius: {
      round: radii.pill,
      markLeading: radii.none,
    },
    colors: {
      plainBackground: '#ffffff',
    },
    close: {
      size: 12,
      gap: 2,
    },
    typography: {
      fontFamily: typography.fontFamily,
      lineHeightMultiplier: typography.lineHeightMultiplier,
      fontWeight: typography.weight.medium,
    },
  }
}

const useTagTokens = createComponentTokensHook('tag', createTagTokens)

export const Tag: React.FC<TagProps> = props => {
  const tokens = useTagTokens(props.tokensOverride)
  const {
    children,
    type = tokens.defaults.type,
    size = tokens.defaults.size,
    plain = tokens.defaults.plain,
    round = tokens.defaults.round,
    mark = tokens.defaults.mark,
    color,
    textColor,
    show = true,
    closeable,
    closeIcon,
    onClose,
    onPress,
    textStyle,
    style,
    tokensOverride: _tokensOverride,
    ...rest
  } = props

  if (!show) {
    return null
  }

  const tone = tokens.toneMap[type] ?? tokens.toneMap.default
  const sizeTokens = tokens.sizes[size]
  const backgroundColor = plain ? tokens.colors.plainBackground : color ?? tone.background
  const resolvedTextColor = textColor ?? (plain ? color ?? tone.background : tone.text)

  const borderColor = plain ? color ?? tone.background : 'transparent'
  const borderWidth = plain ? getHairlineWidth() : 0

  const borderRadius = round ? tokens.radius.round : sizeTokens.borderRadius
  const baseContainerStyle: any[] = [
    styles.container,
    {
      backgroundColor,
      paddingHorizontal: sizeTokens.paddingHorizontal,
      paddingVertical: sizeTokens.paddingVertical,
      borderRadius,
      borderWidth,
      borderColor,
    },
    mark && {
      borderTopLeftRadius: tokens.radius.markLeading,
      borderBottomLeftRadius: tokens.radius.markLeading,
      borderTopRightRadius: tokens.radius.round,
      borderBottomRightRadius: tokens.radius.round,
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
        hitSlop={8}
        style={[styles.close, { marginLeft: tokens.close.gap }]}
        onPress={event => {
          event.stopPropagation?.()
          onClose?.()
        }}
      >
        {typeof closeIcon === 'function'
          ? closeIcon(resolvedTextColor, tokens.close.size)
          : closeIcon ?? <Close size={tokens.close.size} fill={resolvedTextColor} color={resolvedTextColor} />}
      </Pressable>
    )

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [...baseContainerStyle, { opacity: pressed ? 0.85 : 1 }]}
        onPress={onPress}
        {...rest}
      >
        {label}
        {close}
      </Pressable>
    )
  }

  return (
    <View style={baseContainerStyle} {...rest}>
      {label}
      {close}
    </View>
  )
}

Tag.displayName = 'Tag'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  close: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
