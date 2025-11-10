import React from 'react'
import type { PressableStateCallbackType, ViewStyle } from 'react-native'
import { Pressable, Text, View } from 'react-native'

import { badgeStyles } from './styles'
import type { BadgeProps } from './types'
import { useBadgeTokens } from './useBadgeTokens'

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
          badgeStyles.text,
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
            standalone ? badgeStyles.standalone : badgeStyles.badge,
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
          standalone ? badgeStyles.standalone : badgeStyles.badge,
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
        badgeStyles.wrapper,
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
      <View style={[badgeStyles.wrapper, style]} {...rest}>
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

Badge.displayName = 'Badge'
