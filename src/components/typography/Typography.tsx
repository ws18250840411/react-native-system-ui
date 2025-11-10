import React from 'react'
import { Linking, Pressable, Text, View } from 'react-native'
import type { NativeSyntheticEvent, TextLayoutEventData, TextProps } from 'react-native'

import { useTypographyTokens } from './useTypographyTokens'
import type {
  EllipsisConfig,
  TypographyLinkProps,
  TypographyTextProps,
  TypographyTitleProps,
} from './types'

const isStringOrNumber = (value: React.ReactNode): value is string | number => {
  return typeof value === 'string' || typeof value === 'number'
}

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
  const tokens = useTypographyTokens()
  const {
    children,
    type = 'default',
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

  const ellipsisRows = resolveEllipsisRows(ellipsis)
  const ellipsisConfig = isEllipsisObject(ellipsis) ? ellipsis : undefined

  const [isTruncated, setIsTruncated] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)

  const handleTextLayout = React.useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (!ellipsisRows || expanded) return
      const exceeded = event.nativeEvent.lines.length > ellipsisRows
      if (exceeded !== isTruncated) {
        setIsTruncated(exceeded)
      }
    },
    [ellipsisRows, expanded, isTruncated],
  )

  const resolvedColor = tokens.colors[type] ?? tokens.colors.default
  const fontSize = level ? tokens.titles[level].fontSize : tokens.sizes[size]
  const lineHeight = level ? tokens.titles[level].lineHeight : fontSize * 1.3

  const textDecoration: TextProps['style'] = {
    textDecorationLine: [
      underline ? 'underline' : null,
      deleted ? 'line-through' : null,
    ]
      .filter(Boolean)
      .join(' '),
  }

  const baseStyle = [
    {
      color: resolvedColor,
      fontSize,
      lineHeight,
      fontFamily: tokens.typography.fontFamily,
      fontWeight: strong ? tokens.typography.weight.strong : tokens.typography.weight.regular,
      textAlign: center ? 'center' : undefined,
      opacity: disabled ? tokens.opacity.disabled : 1,
    },
    textDecoration.textDecorationLine ? textDecoration : null,
    style,
  ]

  const renderContent = () => {
    if (ellipsisConfig?.suffixText) {
      return (
        <>
          {children}
          <Text>{ellipsisConfig.suffixText}</Text>
        </>
      )
    }
    if (ellipsisConfig?.suffixCount && isStringOrNumber(children)) {
      const raw = String(children)
      const count = Math.min(ellipsisConfig.suffixCount, raw.length)
      const prefix = raw.slice(0, raw.length - count)
      const suffix = raw.slice(-count)
      return (
        <>
          {prefix}
          <Text>{suffix}</Text>
        </>
      )
    }
    return children
  }

  const shouldShowAction = isTruncated && ellipsisConfig && (ellipsisConfig.expandText || ellipsisConfig.collapseText)

  const handleToggleEllipsis = () => {
    if (!ellipsisConfig) return
    const next = !expanded
    setExpanded(next)
    ellipsisConfig.onExpand?.(next)
  }

  return (
    <View style={center ? { alignItems: 'center' } : undefined}>
      <Text
        ref={ref}
        style={baseStyle}
        onPress={onPress}
        numberOfLines={!expanded ? ellipsisRows : undefined}
        ellipsizeMode="tail"
        onTextLayout={ellipsisRows && !expanded ? handleTextLayout : undefined}
        {...textProps}
      >
        {renderContent()}
      </Text>
      {shouldShowAction ? (
        <Pressable
          onPress={handleToggleEllipsis}
          style={{ marginTop: 4 }}
          hitSlop={8}
        >
          <Text
            style={{
              color: tokens.colors.primary,
              fontSize: tokens.sizes.sm,
            }}
          >
            {expanded
              ? ellipsisConfig?.collapseText ?? ellipsisConfig?.expandText
              : ellipsisConfig.expandText ?? ellipsisConfig.collapseText}
          </Text>
        </Pressable>
      ) : null}
    </View>
  )
})

TypographyTextBase.displayName = 'TypographyText'

const TypographyTitle = React.forwardRef<Text, TypographyTitleProps>((props, ref) => {
  const { level = 5, ...rest } = props
  return <TypographyTextBase ref={ref} level={level} {...rest} />
})

TypographyTitle.displayName = 'TypographyTitle'

const TypographyLink = React.forwardRef<Text, TypographyLinkProps>((props, ref) => {
  const { href, onPress, underline = true, type = 'primary', ...rest } = props

  const handlePress: TextProps['onPress'] = async event => {
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
  }

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
