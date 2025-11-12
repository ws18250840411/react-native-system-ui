import React from 'react'
import { Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { EmptyImage, EmptyProps } from './types'

interface EmptyTokens {
  spacing: {
    paddingVertical: number
    paddingHorizontal: number
    descriptionMargin: number
    footerMargin: number
  }
  colors: {
    description: string
    iconBackground: string
    iconColor: string
  }
  sizes: {
    image: number
    fontSize: number
  }
}

const createEmptyTokens = (foundations: Foundations): EmptyTokens => {
  return {
    spacing: {
      paddingVertical: foundations.spacing.xl,
      paddingHorizontal: foundations.spacing.xl,
      descriptionMargin: foundations.spacing.md,
      footerMargin: foundations.spacing.lg,
    },
    colors: {
      description: foundations.palette.default[500],
      iconBackground: foundations.palette.default[50],
      iconColor: foundations.palette.default[400],
    },
    sizes: {
      image: 120,
      fontSize: foundations.fontSize.lg,
    },
  }
}

const useEmptyTokens = (overrides?: DeepPartial<EmptyTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createEmptyTokens(foundations)
    const globalOverrides = components?.empty as DeepPartial<EmptyTokens> | undefined
    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}

const IMAGE_SYMBOLS: Record<EmptyImage, string> = {
  default: '☁',
  error: '⚠',
  network: '📡',
  search: '🔍',
}

export const Empty: React.FC<EmptyProps> = props => {
  const tokens = useEmptyTokens()
  const {
    image = 'default',
    imageSize,
    imageStyle,
    description,
    descriptionStyle,
    children,
    style,
    gap = tokens.spacing.descriptionMargin,
    ...rest
  } = props

  const renderImage = () => {
    if (React.isValidElement(image)) {
      return image
    }

    if (typeof image === 'string') {
      if (/^https?:/.test(image)) {
        return (
          <View
            style={{
              width: imageSize ?? tokens.sizes.image,
              height: imageSize ?? tokens.sizes.image,
              backgroundColor: tokens.colors.iconBackground,
              borderRadius: tokens.sizes.image / 8,
            }}
          />
        )
      }

      const symbol = IMAGE_SYMBOLS[image as EmptyImage] ?? IMAGE_SYMBOLS.default
      return (
        <View
          style={[
            {
              width: imageSize ?? tokens.sizes.image,
              height: imageSize ?? tokens.sizes.image,
              borderRadius: (imageSize ?? tokens.sizes.image) / 2,
              backgroundColor: tokens.colors.iconBackground,
              alignItems: 'center',
              justifyContent: 'center',
            },
            imageStyle,
          ]}
        >
          <Text style={{ fontSize: tokens.sizes.fontSize, color: tokens.colors.iconColor }}>
            {symbol}
          </Text>
        </View>
      )
    }

    return null
  }

  return (
    <View
      style={[
        {
          width: '100%',
          paddingVertical: tokens.spacing.paddingVertical,
          paddingHorizontal: tokens.spacing.paddingHorizontal,
          alignItems: 'center',
        },
        style,
      ]}
      {...rest}
    >
      {renderImage()}
      {description ? (
        <Text
          style={[
            {
              marginTop: gap,
              textAlign: 'center',
              color: tokens.colors.description,
            },
            descriptionStyle,
          ]}
        >
          {description}
        </Text>
      ) : null}
      {children ? (
        <View style={{ marginTop: tokens.spacing.footerMargin }}>{children}</View>
      ) : null}
    </View>
  )
}

Empty.displayName = 'Empty'
