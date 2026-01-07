import React from 'react'
import { Linking, Platform, Text, View } from 'react-native'
import type { NativeSyntheticEvent, StyleProp, TextLayoutEventData, TextProps, TextStyle, ViewStyle } from 'react-native'

import type {
  EllipsisConfig,
  TypographyLinkProps,
  TypographyTextProps,
  TypographyTitleProps,
  TypographyType,
} from './types'
import { useTypographyTokens } from './tokens'

const resolveEllipsisRows = (ellipsis?: TypographyTextProps['ellipsis']) => {
  if (!ellipsis) return undefined
  if (typeof ellipsis === 'boolean') return ellipsis ? 1 : undefined
  if (typeof ellipsis === 'number') return ellipsis
  return ellipsis.rows ?? 1
}

const isEllipsisObject = (
  ellipsis?: TypographyTextProps['ellipsis'],
): ellipsis is EllipsisConfig => typeof ellipsis === 'object' && !!ellipsis

const TypographyTextBase = React.forwardRef<Text, TypographyTextProps>((props, ref) => {
  const {
    tokensOverride,
    children,
    type = 'default',
    color: colorProp,
    size = 'md',
    level,
    disabled = false,
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

  const ellipsisRows = resolveEllipsisRows(ellipsis)
  const ellipsisConfig = isEllipsisObject(ellipsis) ? ellipsis : undefined

  const [isTruncated, setIsTruncated] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)

  const handleTextLayout = React.useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (!ellipsisRows || expanded) return
      const exceeded = event.nativeEvent.lines.length > ellipsisRows
      setIsTruncated(prev => (prev === exceeded ? prev : exceeded))
    },
    [ellipsisRows, expanded],
  )

  let resolvedColor = tokens.colors[type] ?? tokens.colors.default
  if (colorProp !== undefined && colorProp !== null) {
    if (Object.keys(tokens.colors).includes(colorProp as string)) {
      resolvedColor = tokens.colors[colorProp as TypographyType]
    } else {
      resolvedColor = String(colorProp)
    }
  }
  const fontSize = level ? tokens.titles[level].fontSize : tokens.sizes[size]
  const lineHeight = level ? tokens.titles[level].lineHeight : fontSize * 1.3

  const baseStyle = React.useMemo<StyleProp<TextStyle>>(() => {
    const decorationLine = [
      underline ? 'underline' : undefined,
      deleted ? 'line-through' : undefined,
    ]
      .filter(Boolean)
      .join(' ')

    const textDecoration: TextStyle = decorationLine ? {
      textDecorationLine: decorationLine as TextStyle['textDecorationLine']
    } : {}

    const computedStyle: TextStyle = {
      color: resolvedColor,
      fontSize,
      lineHeight,
      fontFamily: tokens.typography.fontFamily,
      fontWeight: (strong ? tokens.typography.weight.strong : tokens.typography.weight.regular) as TextStyle['fontWeight'],
      textAlign: center ? 'center' : undefined,
      opacity: disabled ? tokens.opacity.disabled : 1,
    }

    return [
      computedStyle,
      textDecoration,
      style,
    ]
  }, [
    resolvedColor,
    fontSize,
    lineHeight,
    tokens.typography.fontFamily,
    tokens.typography.weight,
    tokens.opacity.disabled,
    strong,
    center,
    disabled,
    underline,
    deleted,
    style,
  ])

  const hasActionText = !!ellipsisConfig && (ellipsisConfig.expandText || ellipsisConfig.collapseText)
  const shouldShowAction = hasActionText && (isTruncated || expanded || Platform.OS === 'web')

  const handleToggleEllipsis = () => {
    if (!ellipsisConfig) return
    const next = !expanded
    setExpanded(next)
    ellipsisConfig.onExpand?.(next)
  }

  const actionLabel = expanded
    ? ellipsisConfig?.collapseText ?? ellipsisConfig?.expandText
    : ellipsisConfig?.expandText ?? ellipsisConfig?.collapseText

  const textStyle = shouldShowAction ? [baseStyle, { flexShrink: 1 }] : baseStyle

  const textNode = (
    <Text
      ref={ref}
      style={textStyle}
      onPress={onPress}
      numberOfLines={!expanded ? ellipsisRows : undefined}
      ellipsizeMode="tail"
      onTextLayout={ellipsisRows && !expanded ? handleTextLayout : undefined}
      {...textProps}
    >
      {children}
    </Text>
  )

  if (!shouldShowAction) {
    return center ? <View style={{ alignItems: 'center' }}>{textNode}</View> : textNode
  }

  const actionNode = (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline' }}>
      {textNode}
      <Text
        onPress={handleToggleEllipsis}
        suppressHighlighting
        style={{
          color: tokens.colors.primary,
          fontSize: tokens.sizes.sm,
          fontWeight: tokens.typography.weight.medium as TextStyle['fontWeight'],
          marginLeft: 4,
        }}
      >
        {actionLabel}
      </Text>
    </View>
  )

  return center ? <View style={{ alignItems: 'center' }}>{actionNode}</View> : actionNode
})

TypographyTextBase.displayName = 'TypographyText'

const TypographyTitle = React.forwardRef<Text, TypographyTitleProps>((props, ref) => {
  const { level = 5, ...rest } = props
  return <TypographyTextBase ref={ref} level={level} {...rest} />
})

TypographyTitle.displayName = 'TypographyTitle'

const TypographyLink = React.forwardRef<Text, TypographyLinkProps>((props, ref) => {
  const { href, onPress, underline = true, type = 'primary', ...rest } = props

  const handlePress: TextProps['onPress'] = React.useCallback(async (event: NativeSyntheticEvent<any>) => {
    if (onPress) {
      onPress(event)
      return
    }
    if (href) {
      try {
        await Linking.openURL(href)
      } catch (error) {
        console.warn('Failed to open url', error)
      }
    }
  }, [onPress, href])

  return (
    <TypographyTextBase
      ref={ref}
      underline={underline}
      type={type}
      onPress={handlePress}
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
