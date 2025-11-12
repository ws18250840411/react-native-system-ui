import React from 'react'
import type { PressableStateCallbackType, ViewStyle } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { BadgeProps } from './types'

interface BadgeTokens {
  defaults: {
    showZero: boolean
  }
  colors: {
    background: string
    dot: string
    text: string
  }
  sizes: {
    height: number
    paddingHorizontal: number
    dotSize: number
    borderRadius: number
  }
  typography: {
    fontSize: number
    fontWeight: string
    fontFamily: string
    lineHeight: number
  }
}

const createBadgeTokens = (foundations: Foundations): BadgeTokens => {
  const { palette, spacing, fontSize, radii, typography } = foundations

  return {
    defaults: {
      showZero: true,
    },
    colors: {
      background: palette.danger[500],
      dot: palette.danger[500],
      text: palette.danger.foreground ?? '#ffffff',
    },
    sizes: {
      height: 18,
      paddingHorizontal: spacing.xs,
      dotSize: 8,
      borderRadius: radii.pill,
    },
    typography: {
      fontSize: fontSize.xs,
      fontWeight: typography.weight.bold,
      fontFamily: typography.fontFamily,
      lineHeight: fontSize.xs * typography.lineHeightMultiplier,
    },
  }
}

const useBadgeTokens = (overrides?: DeepPartial<BadgeTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createBadgeTokens(foundations)
    const globalOverrides = components?.badge as DeepPartial<BadgeTokens> | undefined
    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}

const isRenderable = (value: React.ReactNode) => {
  if (value === null || value === undefined) return false
  if (typeof value === 'boolean') return false
  if (typeof value === 'string') return value.length > 0
  return true
}

const isNumericLike = (value: React.ReactNode): value is number | string => {
  if (typeof value === 'number') return true
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return false
    return !Number.isNaN(Number(trimmed))
  }
  return false
}

const toNumber = (value: number | string) => Number(value)

export const Badge: React.FC<BadgeProps> = props => {
  const tokens = useBadgeTokens()
  const {
    children,
    content,
    color,
    textColor,
    dot = false,
    max,
    offset,
    showZero = tokens.defaults.showZero,
    badgeStyle,
    textStyle,
    onPress,
    style,
    ...rest
  } = props

  const hasChildren = React.Children.count(children) > 0

  const numericContent = isNumericLike(content) ? toNumber(content) : null
  const numericMax = isNumericLike(max) ? toNumber(max) : null
  const shouldHideForZero =
    numericContent !== null && numericContent === 0 && !showZero

  const visible = dot || (isRenderable(content) && !shouldHideForZero)

  const formattedContent = React.useMemo<React.ReactNode>(() => {
    if (!visible || dot) return undefined
    if (
      numericContent !== null &&
      numericMax !== null &&
      numericContent > numericMax
    ) {
      return `${max}+`
    }
    return content
  }, [visible, dot, numericContent, numericMax, max, content])

  const buildOffsetStyle = (standalone: boolean): ViewStyle | undefined => {
    if (!offset) return undefined
    const [x, y] = offset
    if (standalone) {
      return {
        marginLeft: x as ViewStyle['marginLeft'],
        marginTop: y as ViewStyle['marginTop'],
      }
    }
    return {
      right: x as ViewStyle['right'],
      top: y as ViewStyle['top'],
    }
  }

  const renderContentNode = () => {
    if (!visible || dot) return null

    if (React.isValidElement(formattedContent)) {
      return formattedContent
    }

    return (
      <Text
        style={[
          styles.text,
          {
            color: textColor ?? tokens.colors.text,
            fontSize: tokens.typography.fontSize,
            lineHeight: tokens.typography.lineHeight,
            fontFamily: tokens.typography.fontFamily,
            fontWeight: tokens.typography.fontWeight,
          },
          textStyle,
        ]}
      >
        {formattedContent}
      </Text>
    )
  }

  const renderBadgeNode = (standalone: boolean) => {
    if (!visible && !dot) {
      return null
    }

    if (dot) {
      return (
        <View
          pointerEvents={standalone ? 'auto' : 'none'}
          style={[
            standalone ? styles.standalone : styles.badge,
            {
              width: tokens.sizes.dotSize,
              height: tokens.sizes.dotSize,
              borderRadius: tokens.sizes.dotSize / 2,
              backgroundColor: color ?? tokens.colors.dot,
            },
            buildOffsetStyle(standalone),
            badgeStyle,
            standalone ? style : null,
          ]}
        />
      )
    }

    const bubbleBackground = color ?? tokens.colors.background

    return (
      <View
        pointerEvents={standalone ? 'auto' : 'none'}
        style={[
          standalone ? styles.standalone : styles.badge,
          {
            minWidth: tokens.sizes.height,
            height: tokens.sizes.height,
            paddingHorizontal: tokens.sizes.paddingHorizontal,
            borderRadius: tokens.sizes.borderRadius,
            backgroundColor: bubbleBackground,
          },
          buildOffsetStyle(standalone),
          badgeStyle,
          standalone ? style : null,
        ]}
      >
        {renderContentNode()}
      </View>
    )
  }

  if (hasChildren) {
    const badgeNode = visible || dot ? renderBadgeNode(false) : null

    if (onPress) {
      const pressableStyle = ({ pressed }: PressableStateCallbackType) => [
        styles.wrapper,
        style,
        { opacity: pressed ? 0.9 : 1 },
      ]

      return (
        <Pressable style={pressableStyle} onPress={onPress} {...rest}>
          {children}
          {badgeNode}
        </Pressable>
      )
    }

    return (
      <View style={[styles.wrapper, style]} {...rest}>
        {children}
        {badgeNode}
      </View>
    )
  }

  if (!visible && !dot) {
    return null
  }

  const badgeNode = renderBadgeNode(true)

  if (onPress) {
    const standaloneStyle = ({ pressed }: PressableStateCallbackType) => [
      { alignSelf: 'flex-start', opacity: pressed ? 0.9 : 1 },
    ]
    return (
      <Pressable style={standaloneStyle} onPress={onPress} {...rest}>
        {badgeNode}
      </Pressable>
    )
  }

  return React.cloneElement(badgeNode as React.ReactElement, { ...rest })
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  standalone: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
})

Badge.displayName = 'Badge'
