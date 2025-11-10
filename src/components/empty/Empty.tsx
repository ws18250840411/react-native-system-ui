import React from 'react'
import { Text, View } from 'react-native'

import { useEmptyTokens } from './useEmptyTokens'
import type { EmptyImage, EmptyProps } from './types'

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
