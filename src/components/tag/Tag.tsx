import React from 'react'
import type { PressableStateCallbackType } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import Icon from '../icon'
import type { TagProps, TagSize, TagType } from './types'

const isRenderable = (value: React.ReactNode) => value !== null && value !== undefined

interface TagTokens {
  defaults: {
    type: TagType
    size: TagSize
    plain: boolean
    round: boolean
    mark: boolean
  }
  toneMap: Record<TagType, { background: string; text: string }>
  sizes: Record<
    TagSize,
    { fontSize: number; paddingHorizontal: number; paddingVertical: number; borderRadius: number }
  >
  radius: {
    round: number
    markLeading: number
  }
  colors: {
    plainBackground: string
  }
  close: {
    size: number
    gap: number
  }
  typography: {
    fontFamily: string
    lineHeightMultiplier: number
    fontWeight: string
  }
}

const buildTone = (
  palette: Foundations['palette'],
  key: keyof Foundations['palette'],
  fallbackText?: string
) => ({
  background: palette[key][500],
  text: fallbackText ?? palette[key].foreground ?? '#ffffff',
})

const createTagTokens = (foundations: Foundations): TagTokens => {
  const { palette, spacing, fontSize, radii, typography } = foundations

  return {
    defaults: {
      type: 'default',
      size: 'small',
      plain: false,
      round: false,
      mark: false,
    },
    toneMap: {
      default: {
        background: palette.default[200],
        text: palette.default.foreground ?? '#1f2937',
      },
      primary: buildTone(palette, 'primary'),
      success: buildTone(palette, 'success'),
      warning: buildTone(palette, 'warning', palette.warning.foreground ?? palette.warning[900]),
      danger: buildTone(palette, 'danger'),
    },
    sizes: {
      mini: {
        fontSize: fontSize.xs,
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.none,
        borderRadius: radii.xs,
      },
      small: {
        fontSize: fontSize.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xxs,
        borderRadius: radii.xs,
      },
      medium: {
        fontSize: fontSize.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: radii.sm,
      },
      large: {
        fontSize: fontSize.md,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: radii.md,
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
      size: fontSize.sm,
      gap: spacing.xs,
    },
    typography: {
      fontFamily: typography.fontFamily,
      lineHeightMultiplier: typography.lineHeightMultiplier,
      fontWeight: typography.weight.medium,
    },
  }
}

const useTagTokens = (overrides?: DeepPartial<TagTokens>): TagTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTagTokens(foundations)
    const componentOverrides = components?.tag as DeepPartial<TagTokens> | undefined
    const merged = componentOverrides
      ? overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [foundations, components, overrides])
}

export const Tag: React.FC<TagProps> = props => {
  const tokens = useTagTokens()
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
    ...rest
  } = props

  if (!show) {
    return null
  }

  const tone = tokens.toneMap[type] ?? tokens.toneMap.default
  const sizeTokens = tokens.sizes[size]
  const backgroundColor = plain ? tokens.colors.plainBackground : color ?? tone.background
  const resolvedTextColor = textColor
    ? textColor
    : plain
      ? color ?? tone.background
      : tone.text

  const borderColor = plain ? color ?? tone.background : 'transparent'
  const borderWidth = plain ? StyleSheet.hairlineWidth : 0

  const resolvedRadius = round ? tokens.radius.round : sizeTokens.borderRadius

  const baseContainerStyle = [
    styles.container,
    {
      backgroundColor,
      paddingHorizontal: sizeTokens.paddingHorizontal,
      paddingVertical: sizeTokens.paddingVertical,
      borderRadius: resolvedRadius,
      borderWidth,
      borderColor,
    },
    mark && {
      borderTopLeftRadius: tokens.radius.markLeading,
      borderBottomLeftRadius: tokens.radius.markLeading,
      borderTopRightRadius: resolvedRadius,
      borderBottomRightRadius: resolvedRadius,
    },
    style,
  ]

  const labelStyle = [
    styles.text,
    {
      color: resolvedTextColor,
      fontSize: sizeTokens.fontSize,
      lineHeight: sizeTokens.fontSize * tokens.typography.lineHeightMultiplier,
      fontFamily: tokens.typography.fontFamily,
      fontWeight: tokens.typography.fontWeight,
    },
    textStyle,
  ]

  const renderLabel = () => {
    if (!isRenderable(children)) {
      return null
    }
    if (typeof children === 'string' || typeof children === 'number') {
      return <Text style={labelStyle}>{children}</Text>
    }
    return children
  }

  const renderClose = () => {
    if (!closeable) return null

    const iconNode = typeof closeIcon === 'function'
      ? closeIcon(resolvedTextColor, tokens.close.size)
      : closeIcon

    return (
      <Pressable
        accessibilityRole="button"
        hitSlop={8}
        style={[styles.close, { marginLeft: tokens.close.gap }]}
        onPress={event => {
          event.stopPropagation?.()
          onClose?.()
        }}
      >
        {iconNode ?? (
          <Icon name="close" size={tokens.close.size} color={resolvedTextColor} />
        )}
      </Pressable>
    )
  }

  if (onPress) {
    const pressableStyle = ({ pressed }: PressableStateCallbackType) => [
      ...baseContainerStyle,
      {
        opacity: pressed ? 0.85 : 1,
      },
    ]

    return (
      <Pressable style={pressableStyle} onPress={onPress} {...rest}>
        {renderLabel()}
        {renderClose()}
      </Pressable>
    )
  }

  return (
    <View style={baseContainerStyle} {...rest}>
      {renderLabel()}
      {renderClose()}
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
  text: {
    textAlign: 'center',
  },
  close: {
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
