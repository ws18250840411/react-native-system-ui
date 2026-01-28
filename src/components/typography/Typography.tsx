import React, { useCallback, useMemo, useState } from 'react'
import { Linking, Text, View } from 'react-native'
import type { GestureResponderEvent, NativeSyntheticEvent, StyleProp, TextLayoutEventData, TextProps, TextStyle } from 'react-native'
import { isBoolean, isNumber, isPlainObject } from '../../utils'
import { isWeb as isWebPlatform } from '../../platform'

import type {
  EllipsisConfig,
  TypographyLinkProps,
  TypographyTextProps,
  TypographyTitleProps,
  TypographyType,
} from './types'
import { useTypographyTokens } from './tokens'

const FLEX_SHRINK_STYLE: TextStyle = { flexShrink: 1 }

const resolveEllipsisRows = (ellipsis?: TypographyTextProps['ellipsis']) => {
  if (!ellipsis) return undefined
  if (isBoolean(ellipsis)) return ellipsis ? 1 : undefined
  if (isNumber(ellipsis)) return ellipsis
  return ellipsis.rows ?? 1
}

const hasTypographyColorKey = (
  colors: Record<TypographyType, string>,
  key: string,
): key is TypographyType => Object.prototype.hasOwnProperty.call(colors, key)

const isEllipsisObject = (
  ellipsis?: TypographyTextProps['ellipsis'],
): ellipsis is EllipsisConfig => isPlainObject(ellipsis)

const TypographyTextBaseInner = React.forwardRef<Text, TypographyTextProps>((props, ref) => {
  const {
    tokensOverride,
    children,
    type: typeProp,
    color: colorProp,
    size: sizeProp,
    level,
    disabled: disabledProp,
    delete: deleted,
    underline,
    center,
    strong,
    ellipsis,
    style,
    onPress,
    ...textProps
  } = props
  const tokens = useTypographyTokens(tokensOverride)

  const type = typeProp ?? tokens.defaults.type
  const size = sizeProp ?? tokens.defaults.size
  const disabled = disabledProp ?? tokens.defaults.disabled

  const ellipsisRows = resolveEllipsisRows(ellipsis)
  const ellipsisConfig = isEllipsisObject(ellipsis) ? ellipsis : undefined

  const [isTruncated, setIsTruncated] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const isWeb = isWebPlatform()

  const handleTextLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (!ellipsisRows || expanded) return
      const exceeded = event.nativeEvent.lines.length > ellipsisRows
      setIsTruncated(prev => (prev === exceeded ? prev : exceeded))
    },
    [ellipsisRows, expanded],
  )

  let resolvedColor = tokens.colors[type] ?? tokens.colors.default
  if (colorProp !== undefined && colorProp !== null) {
    const colorKey = String(colorProp)
    resolvedColor = hasTypographyColorKey(tokens.colors, colorKey) ? tokens.colors[colorKey] : colorKey
  }
  const fontSize = level
    ? tokens.sizing.titles[level].fontSize
    : tokens.sizing.sizes[size]
  const lineHeight = level
    ? tokens.sizing.titles[level].lineHeight
    : fontSize * tokens.sizing.lineHeightMultiplier

  const baseStyle = useMemo<StyleProp<TextStyle>>(() => {
    const textDecorationLine =
      underline && deleted
        ? 'underline line-through'
        : underline
          ? 'underline'
          : deleted
            ? 'line-through'
            : undefined

    const computedStyle: TextStyle = {
      color: resolvedColor,
      fontSize,
      lineHeight,
      fontFamily: tokens.typography.fontFamily,
      fontWeight: strong ? tokens.typography.weight.strong : tokens.typography.weight.regular,
      includeFontPadding: false,
      textDecorationLine,
      textAlign: center ? 'center' : undefined,
      opacity: disabled ? tokens.opacity.disabled : 1,
    }

    return [
      computedStyle,
      style,
    ]
  }, [
    resolvedColor,
    fontSize,
    lineHeight,
    tokens.typography.fontFamily,
    tokens.opacity.disabled,
    tokens.typography.weight.regular,
    tokens.typography.weight.strong,
    strong,
    center,
    disabled,
    underline,
    deleted,
    style,
  ])

  const hasActionText = !!ellipsisConfig && (ellipsisConfig.expandText || ellipsisConfig.collapseText)
  const shouldShowAction = hasActionText && (isTruncated || expanded || isWeb)

  const handleToggleEllipsis = useCallback(() => {
    if (!ellipsisConfig) return
    setExpanded(prev => {
      const next = !prev
      ellipsisConfig.onExpand?.(next)
      return next
    })
  }, [ellipsisConfig])

  const actionLabel = useMemo(() => {
    if (!ellipsisConfig) return undefined
    return expanded
      ? ellipsisConfig.collapseText ?? ellipsisConfig.expandText
      : ellipsisConfig.expandText ?? ellipsisConfig.collapseText
  }, [ellipsisConfig, expanded])

  const actionTextStyle = useMemo<TextStyle>(() => ({
    color: tokens.colors.primary,
    fontSize: tokens.sizing.sizes.sm,
    fontWeight: tokens.typography.weight.medium,
    marginLeft: tokens.sizing.actionMarginLeft,
    includeFontPadding: false,
  }), [
    tokens.colors.primary,
    tokens.sizing.sizes.sm,
    tokens.typography.weight.medium,
    tokens.sizing.actionMarginLeft,
  ])

  const textStyle = useMemo<StyleProp<TextStyle>>(() => {
    if (!shouldShowAction) return baseStyle
    return [baseStyle, FLEX_SHRINK_STYLE]
  }, [shouldShowAction, baseStyle])

  const textNode = (
    <Text
      ref={ref}
      style={textStyle}
      onPress={onPress}
      numberOfLines={!expanded ? ellipsisRows : undefined}
      ellipsizeMode="tail"
      onTextLayout={hasActionText && ellipsisRows && !expanded && !isWeb ? handleTextLayout : undefined}
      {...textProps}
    >
      {children}
    </Text>
  )

  if (!shouldShowAction) {
    return center ? <View style={tokens.layout.centerWrapper}>{textNode}</View> : textNode
  }

  const actionNode = (
    <View style={tokens.layout.actionRow}>
      {textNode}
      <Text
        onPress={handleToggleEllipsis}
        suppressHighlighting
        style={actionTextStyle}
      >
        {actionLabel}
      </Text>
    </View>
  )

  return center ? <View style={tokens.layout.centerWrapper}>{actionNode}</View> : actionNode
})

TypographyTextBaseInner.displayName = 'TypographyText'

const TypographyTextBase = React.memo(TypographyTextBaseInner)

TypographyTextBase.displayName = 'TypographyText'

const TypographyTitle = React.forwardRef<Text, TypographyTitleProps>((props, ref) => {
  const { level = 5, accessibilityRole, ...rest } = props
  return (
    <TypographyTextBase
      ref={ref}
      level={level}
      accessibilityRole={accessibilityRole ?? 'header'}
      {...rest}
    />
  )
})

TypographyTitle.displayName = 'TypographyTitle'

const TypographyLink = React.forwardRef<Text, TypographyLinkProps>((props, ref) => {
  const { href, onPress, underline = true, type = 'primary', accessibilityRole, ...rest } = props

  const handlePress: TextProps['onPress'] = useCallback(async (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event)
      return
    }
    if (href) {
      try {
        await Linking.openURL(href)
      } catch (error) {
        if (typeof __DEV__ !== 'undefined' && __DEV__) {
          console.warn('[Typography.Link] Failed to open url', error)
        }
      }
    }
  }, [onPress, href])

  return (
    <TypographyTextBase
      ref={ref}
      underline={underline}
      type={type}
      onPress={handlePress}
      accessibilityRole={accessibilityRole ?? 'link'}
      {...rest}
    />
  )
})

TypographyLink.displayName = 'TypographyLink'

export const Typography = Object.assign(TypographyTextBase, {
  Text: TypographyTextBase,
  Title: TypographyTitle,
  Link: TypographyLink,
})

export default Typography
