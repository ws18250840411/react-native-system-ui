import React from 'react'
import { Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import Image from '../image'
import type { EmptyImage, EmptyProps } from './types'

interface EmptyTokens {
  spacing: {
    paddingVertical: number
    paddingHorizontal: number
    descriptionMargin: number
    descriptionPaddingHorizontal: number
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
  typography: {
    descriptionSize: number
    descriptionLineHeight: number
    descriptionFontFamily: string
    descriptionFontWeight: string
  }
}

const createEmptyTokens = (foundations: Foundations): EmptyTokens => {
  return {
    spacing: {
      paddingVertical: foundations.spacing.xl,
      paddingHorizontal: 0,
      descriptionMargin: foundations.spacing.lg,
      descriptionPaddingHorizontal: 60,
      footerMargin: 24,
    },
    colors: {
      description: foundations.palette.default[500],
      iconBackground: foundations.palette.default[50],
      iconColor: foundations.palette.default[400],
    },
    sizes: {
      image: 160,
      fontSize: foundations.fontSize.lg,
    },
    typography: {
      descriptionSize: foundations.fontSize.sm,
      descriptionLineHeight: 20,
      descriptionFontFamily: foundations.typography.fontFamily,
      descriptionFontWeight: foundations.typography.weight.regular,
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

const PRESET_IMAGES: EmptyImage[] = ['default', 'error', 'network', 'search']
const resolvePresetImage = (value: EmptyImage) => `https://img.yzcdn.cn/vant/empty-image-${value}.png`

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

  const resolvedImageSize = imageSize ?? tokens.sizes.image

  const renderImage = () => {
    if (React.isValidElement(image)) {
      return (
        <View
          style={[
            {
              width: resolvedImageSize,
              height: resolvedImageSize,
              alignItems: 'center',
              justifyContent: 'center',
            },
            imageStyle,
          ]}
        >
          {image}
        </View>
      )
    }

    if (typeof image === 'string') {
      const resolvedSrc = /^https?:/.test(image)
        ? image
        : PRESET_IMAGES.includes(image as EmptyImage)
          ? resolvePresetImage(image as EmptyImage)
          : resolvePresetImage('default')

      return (
        <Image
          src={resolvedSrc}
          width={resolvedImageSize}
          height={resolvedImageSize}
          fit="contain"
          radius={0}
          showLoading={false}
          showError={false}
          containerStyle={[{ backgroundColor: 'transparent' }, imageStyle]}
        />
      )
    }

    return null
  }

  const renderDescription = () => {
    if (description === null || description === undefined || description === false) return null

    if (typeof description === 'string' || typeof description === 'number') {
      return (
        <Text
          style={[
            {
              marginTop: gap,
              paddingHorizontal: tokens.spacing.descriptionPaddingHorizontal,
              textAlign: 'center',
              color: tokens.colors.description,
              fontSize: tokens.typography.descriptionSize,
              lineHeight: tokens.typography.descriptionLineHeight,
              fontFamily: tokens.typography.descriptionFontFamily,
              fontWeight: tokens.typography.descriptionFontWeight,
            },
            descriptionStyle,
          ]}
        >
          {description}
        </Text>
      )
    }

    return (
      <View style={{ marginTop: gap, paddingHorizontal: tokens.spacing.descriptionPaddingHorizontal }}>
        {description}
      </View>
    )
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
      {renderDescription()}
      {children ? (
        <View style={{ marginTop: tokens.spacing.footerMargin }}>{children}</View>
      ) : null}
    </View>
  )
}

Empty.displayName = 'Empty'
