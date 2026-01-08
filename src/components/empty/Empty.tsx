import React from 'react'
import { Text, View } from 'react-native'
import { isRenderable, isString, isText } from '../../utils/validate'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import Image from '../image'
import type { EmptyImage, EmptyProps, EmptyTokens } from './types'

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

const useEmptyTokens = createComponentTokensHook('empty', createEmptyTokens)

const PRESET_IMAGES: EmptyImage[] = ['default', 'error', 'network', 'search']
const resolvePresetImage = (value: EmptyImage) => `https://img.yzcdn.cn/vant/empty-image-${value}.png`

export const Empty: React.FC<EmptyProps> = props => {
  const tokens = useEmptyTokens(props.tokensOverride)
  const {
    tokensOverride: _tokensOverride,
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
  const hasChildren = isRenderable(children)

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

    if (isString(image)) {
      const preset = PRESET_IMAGES.includes(image as EmptyImage) ? (image as EmptyImage) : 'default'
      const resolvedSrc = /^https?:/.test(image) ? image : resolvePresetImage(preset)

      return (
        <Image
          src={resolvedSrc}
          width={resolvedImageSize}
          height={resolvedImageSize}
          fit="contain"
          showLoading={false}
          showError={false}
          containerStyle={[{ backgroundColor: 'transparent' }, imageStyle]}
        />
      )
    }

    return null
  }

  const renderDescription = () => {
    if (!isRenderable(description)) return null

    if (isText(description)) {
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
      {hasChildren ? (
        <View style={{ marginTop: tokens.spacing.footerMargin }}>
          {isText(children) ? <Text>{children}</Text> : children}
        </View>
      ) : null}
    </View>
  )
}

Empty.displayName = 'Empty'
