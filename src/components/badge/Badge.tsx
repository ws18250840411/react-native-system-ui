import React from 'react'
import { Pressable, StyleSheet, Text, View, type LayoutChangeEvent, type ViewStyle } from 'react-native'

import { isNumericLike } from '../../utils/number'
import { isRenderable } from '../../utils/validate'
import { useBadgeTokens } from './tokens'
import type { BadgeProps } from './types'

export const Badge = React.forwardRef<View, BadgeProps>((props, ref) => {
  const {
    children,
    content,
    color,
    textColor,
    dot = false,
    max,
    offset,
    showZero,
    badgeStyle,
    textStyle: userTextStyle,
    onPress,
    style,
    tokensOverride,
    ...rest
  } = props

  const tokens = useBadgeTokens(tokensOverride)
  const resolvedShowZero = showZero ?? tokens.defaults.showZero
  const hasChildren = React.Children.count(children) > 0

  const { visible, formattedContent } = React.useMemo(() => {
    const numericContent = isNumericLike(content) ? Number(content) : null
    const shouldHide = numericContent === 0 && !resolvedShowZero
    const isVisible = dot || (isRenderable(content) && !shouldHide)

    if (!isVisible || dot) return { visible: isVisible, formattedContent: null }

    const numericMax = isNumericLike(max) ? Number(max) : null
    const finalContent =
      numericContent !== null && numericMax !== null && numericContent > numericMax
        ? `${numericMax}+`
        : content

    return { visible: true, formattedContent: finalContent }
  }, [content, dot, max, resolvedShowZero])

  const [size, setSize] = React.useState({ width: 0, height: 0 })

  const handleLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout
      if (width !== size.width || height !== size.height) {
        setSize({ width, height })
      }
    },
    [size.width, size.height]
  )

  const transformStyle = React.useMemo(() => {
    if (!hasChildren) return undefined
    if (dot) {
      const half = tokens.sizes.dotSize / 2
      return { transform: [{ translateX: half }, { translateY: -half }] }
    }
    if (size.width === 0) return { opacity: 0 }
    return {
      transform: [
        { translateX: size.width / 2 },
        { translateY: -size.height / 2 },
      ],
    }
  }, [hasChildren, dot, tokens.sizes.dotSize, size.width, size.height])

  const baseBadgeStyle = React.useMemo(() => {
    if (dot) {
      return {
        width: tokens.sizes.dotSize,
        height: tokens.sizes.dotSize,
        borderRadius: tokens.sizes.dotSize / 2,
        backgroundColor: color ?? tokens.colors.dot,
      }
    }
    return {
      minWidth: tokens.sizes.minWidth,
      minHeight: tokens.sizes.height,
      paddingHorizontal: tokens.sizes.paddingHorizontal,
      paddingVertical: tokens.sizes.paddingVertical,
      borderRadius: tokens.sizes.borderRadius,
      borderWidth: tokens.sizes.borderWidth,
      borderColor: tokens.colors.border,
      backgroundColor: color ?? tokens.colors.background,
    }
  }, [dot, color, tokens])

  const mergedTextStyle = React.useMemo(
    () => [
      styles.text,
      {
        color: textColor ?? tokens.colors.text,
        fontSize: tokens.typography.fontSize,
        lineHeight: tokens.typography.lineHeight,
        fontFamily: tokens.typography.fontFamily,
        fontWeight: tokens.typography.fontWeight,
      },
      userTextStyle,
    ],
    [textColor, tokens, userTextStyle]
  )

  const offsetStyle = React.useMemo(() => {
    if (!offset) return undefined
    const [x, y] = offset
    return (hasChildren
      ? { right: x, top: y }
      : { marginLeft: x, marginTop: y }) as ViewStyle
  }, [offset, hasChildren])

  const badgeElement = React.useMemo(() => {
    if (!visible) return null

    return (
      <View
        pointerEvents={hasChildren ? 'none' : 'auto'}
        onLayout={hasChildren && !dot ? handleLayout : undefined}
        style={[
          hasChildren ? styles.badgeAbsolute : styles.badgeStandalone,
          baseBadgeStyle,
          transformStyle,
          offsetStyle,
          badgeStyle,
          !hasChildren ? style : undefined,
        ]}
      >
        {!dot &&
          (React.isValidElement(formattedContent) ? (
            formattedContent
          ) : (
            <Text style={mergedTextStyle}>{formattedContent}</Text>
          ))}
      </View>
    )
  }, [
    visible,
    hasChildren,
    dot,
    handleLayout,
    baseBadgeStyle,
    transformStyle,
    offsetStyle,
    badgeStyle,
    style,
    formattedContent,
    mergedTextStyle,
  ])

  if (hasChildren) {
    if (onPress) {
      return (
        <Pressable
          ref={ref}
          onPress={onPress}
          style={({ pressed }) => [
            styles.wrapper,
            style,
            pressed && { opacity: 0.9 },
          ]}
          {...rest}
        >
          {children}
          {badgeElement}
        </Pressable>
      )
    }

    return (
      <View ref={ref} style={[styles.wrapper, style]} {...rest}>
        {children}
        {badgeElement}
      </View>
    )
  }

  if (!visible) return null

  if (onPress) {
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressableStandalone,
          pressed && { opacity: 0.9 },
        ]}
        {...rest}
      >
        {badgeElement}
      </Pressable>
    )
  }

  return React.cloneElement(badgeElement as React.ReactElement<any>, { ref, ...rest })
})

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start', // Ensure wrapper shrinks to children
  },
  badgeAbsolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  badgeStandalone: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableStandalone: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
})

Badge.displayName = 'Badge'
