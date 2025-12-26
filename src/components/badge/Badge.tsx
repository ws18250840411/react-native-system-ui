import React from 'react'
import type {
  LayoutChangeEvent,
  PressableStateCallbackType,
  TextStyle,
  ViewStyle,
} from 'react-native'
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
    border: string
  }
  sizes: {
    minWidth: number
    height: number
    paddingHorizontal: number
    paddingVertical: number
    dotSize: number
    borderRadius: number
    borderWidth: number
  }
  typography: {
    fontSize: number
    fontWeight: TextStyle['fontWeight']
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
      border: '#ffffff',
    },
    sizes: {
      minWidth: 18,
      height: 18,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs,
      dotSize: 8,
      borderRadius: radii.pill,
      borderWidth: 1,
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
  const [badgeSize, setBadgeSize] = React.useState({ width: 0, height: 0 })

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
      return `${numericMax}+`
    }
    return content
  }, [visible, dot, numericContent, numericMax, max, content])

  const handleBadgeLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      if (!hasChildren) return
      const { width, height } = event.nativeEvent.layout
      setBadgeSize(prev => {
        if (prev.width === width && prev.height === height) {
          return prev
        }
        return { width, height }
      })
    },
    [hasChildren]
  )

  const fixedTransformStyle = React.useMemo<ViewStyle | undefined>(() => {
    if (!hasChildren) return undefined
    if (badgeSize.width === 0 && badgeSize.height === 0) return undefined
    return {
      transform: [
        { translateX: badgeSize.width / 2 },
        { translateY: -badgeSize.height / 2 },
      ],
    }
  }, [badgeSize.height, badgeSize.width, hasChildren])

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

    const sharedStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
    }
    const pointerEvents = standalone ? 'auto' : 'none'
    const onLayout = !standalone && hasChildren ? handleBadgeLayout : undefined

    if (dot) {
      const dotShape: ViewStyle = {
        width: tokens.sizes.dotSize,
        height: tokens.sizes.dotSize,
        borderRadius: tokens.sizes.dotSize / 2,
        backgroundColor: color ?? tokens.colors.dot,
      }

      return (
        <View
          pointerEvents={pointerEvents}
          onLayout={onLayout}
          style={[
            standalone ? styles.standalone : styles.badge,
            sharedStyle,
            dotShape,
            !standalone ? fixedTransformStyle : null,
            buildOffsetStyle(standalone),
            badgeStyle,
            standalone ? style : null,
          ]}
        />
      )
    }

    const bubbleBackground = color ?? tokens.colors.background

    const bubbleShape: ViewStyle = {
      minWidth: tokens.sizes.minWidth,
      minHeight: tokens.sizes.height,
      paddingHorizontal: tokens.sizes.paddingHorizontal,
      paddingVertical: tokens.sizes.paddingVertical,
      borderRadius: tokens.sizes.borderRadius,
      borderWidth: tokens.sizes.borderWidth,
      borderColor: tokens.colors.border,
      backgroundColor: bubbleBackground,
    }

    return (
      <View
        pointerEvents={pointerEvents}
        onLayout={onLayout}
        style={[
          standalone ? styles.standalone : styles.badge,
          sharedStyle,
          bubbleShape,
          !standalone ? fixedTransformStyle : null,
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
      { alignSelf: 'flex-start' as const, opacity: pressed ? 0.9 : 1 },
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
