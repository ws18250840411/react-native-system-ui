import React from 'react'
import { Linking, Platform, Text, View } from 'react-native'
import type { NativeSyntheticEvent, TextLayoutEventData, TextProps } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type {
  EllipsisConfig,
  TypographyLinkProps,
  TypographyTextProps,
  TypographyTitleProps,
} from './types'

interface TypographyTokens {
  colors: Record<TypographyType, string>
  sizes: Record<TypographySize, number>
  titles: Record<TypographyTitleLevel, { fontSize: number; lineHeight: number }>
  typography: {
    fontFamily: string
    weight: {
      regular: string
      medium: string
      strong: string
    }
  }
  opacity: {
    disabled: number
  }
}

const createTypographyTokens = (foundations: Foundations): TypographyTokens => {
  const { palette, fontSize, typography, opacity } = foundations

  return {
    colors: {
      default: palette.default[700],
      primary: palette.primary[500],
      success: palette.success[500],
      warning: palette.warning[500],
      danger: palette.danger[500],
      secondary: palette.default[500],
      light: palette.default[300],
    },
    sizes: {
      xs: fontSize.xs,
      sm: fontSize.sm,
      md: fontSize.md,
      lg: fontSize.lg,
      xl: fontSize.xl,
      xxl: fontSize.xl * 1.2,
    },
    titles: {
      1: { fontSize: 30, lineHeight: 34 },
      2: { fontSize: 26, lineHeight: 30 },
      3: { fontSize: 22, lineHeight: 26 },
      4: { fontSize: 20, lineHeight: 24 },
      5: { fontSize: 16, lineHeight: 20 },
      6: { fontSize: 14, lineHeight: 18 },
    },
    typography: {
      fontFamily: typography.fontFamily,
      weight: {
        regular: typography.weight.regular,
        medium: typography.weight.medium,
        strong: typography.weight.semiBold,
      },
    },
    opacity: {
      disabled: opacity.disabled,
    },
  }
}

const useTypographyTokens = (overrides?: DeepPartial<TypographyTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createTypographyTokens(foundations)
    const globalOverrides = components?.typography as DeepPartial<TypographyTokens> | undefined
    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
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
    resolvedColor = tokens.colors[colorProp as any] ?? String(colorProp)
  }
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
          fontWeight: tokens.typography.weight.medium,
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
