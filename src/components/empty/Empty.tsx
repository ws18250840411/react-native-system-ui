import React from 'react'
import { Text, View } from 'react-native'
import { Description, Fail, Search } from 'react-native-system-icon'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { isRenderable, isString, isText } from '../../utils/validate'
import Image from '../image'
import type { EmptyProps, EmptyTokens } from './types'

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
      icon: foundations.palette.default[300],
    },
    sizes: {
      image: 160,
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

const PRESET_ICONS = {
  default: Description,
  error: Fail,
  network: Fail,
  search: Search,
}

export const Empty: React.FC<EmptyProps> = props => {
  const tokens = useEmptyTokens(props.tokensOverride)
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

    if (isString(image)) {
      if (/^https?:/.test(image)) {
        return (
          <Image
            src={image}
            width={resolvedImageSize}
            height={resolvedImageSize}
            fit="contain"
            showLoading={false}
            showError={false}
            containerStyle={[{ backgroundColor: 'transparent' }, imageStyle]}
          />
        )
      }

      const IconComponent = PRESET_ICONS[image as keyof typeof PRESET_ICONS] || PRESET_ICONS.default
      const iconSize = resolvedImageSize * 0.6 // Scale icon to 60% of container

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
          <IconComponent size={iconSize} color={tokens.colors.icon} />
        </View>
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
      {isRenderable(children) ? (
        <View style={{ marginTop: tokens.spacing.footerMargin }}>
          {isText(children) ? <Text>{children}</Text> : children}
        </View>
      ) : null}
    </View>
  )
}

Empty.displayName = 'Empty'
