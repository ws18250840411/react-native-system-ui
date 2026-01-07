import React from 'react'
import type {
  LayoutChangeEvent,
  PressableStateCallbackType,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import type { BadgeProps } from './types'
import { useBadgeTokens } from './tokens'

const isRenderable = (value: React.ReactNode) =>
  value != null &&
  typeof value !== 'boolean' &&
  (typeof value !== 'string' || value.length > 0)

const isNumericLike = (value: React.ReactNode): value is number | string =>
  typeof value === 'number' ||
  (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value)))

export const Badge: React.FC<BadgeProps> = props => {
  const { tokensOverride } = props
  const tokens = useBadgeTokens(tokensOverride)
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
    tokensOverride: _tokensOverride,
    ...rest
  } = props

  const hasChildren = React.Children.count(children) > 0
  const [badgeSize, setBadgeSize] = React.useState({ width: 0, height: 0 })

  const numericContent = isNumericLike(content) ? Number(content) : null
  const numericMax = isNumericLike(max) ? Number(max) : null
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
  }, [content, dot, numericContent, numericMax, visible])

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
    if (!visible) return null
    const pointerEvents = standalone ? 'auto' : 'none'
    const onLayout = !standalone && hasChildren ? handleBadgeLayout : undefined

    const offsetStyle: ViewStyle | undefined = offset
      ? standalone
        ? { marginLeft: offset[0] as any, marginTop: offset[1] as any }
        : { right: offset[0] as any, top: offset[1] as any }
      : undefined

    const shape: ViewStyle = dot
      ? {
          width: tokens.sizes.dotSize,
          height: tokens.sizes.dotSize,
          borderRadius: tokens.sizes.dotSize / 2,
          backgroundColor: color ?? tokens.colors.dot,
        }
      : {
          minWidth: tokens.sizes.minWidth,
          minHeight: tokens.sizes.height,
          paddingHorizontal: tokens.sizes.paddingHorizontal,
          paddingVertical: tokens.sizes.paddingVertical,
          borderRadius: tokens.sizes.borderRadius,
          borderWidth: tokens.sizes.borderWidth,
          borderColor: tokens.colors.border,
          backgroundColor: color ?? tokens.colors.background,
        }

    return (
      <View
        pointerEvents={pointerEvents}
        onLayout={onLayout}
        style={[
          standalone ? styles.standalone : styles.badge,
          shape,
          !standalone ? fixedTransformStyle : null,
          offsetStyle,
          badgeStyle,
          standalone ? style : null,
        ]}
      >
        {dot ? null : renderContentNode()}
      </View>
    )
  }

  if (hasChildren) {
    const badgeNode = visible ? renderBadgeNode(false) : null

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

  if (!visible) return null

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
