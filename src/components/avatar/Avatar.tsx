import React from 'react'
import { Pressable, Text, View } from 'react-native'

import Image from '../image'
import { isNumber } from '../../utils/validate'
import { useAvatarTokens } from './tokens'
import type { AvatarProps } from './types'

const transparentContainerStyle = { backgroundColor: 'transparent' } as const

export const Avatar = React.forwardRef<React.ElementRef<typeof Pressable>, AvatarProps>(
  (props, ref) => {
    const {
      src,
      source,
      icon,
      text,
      size,
      width,
      height,
      shape,
      fit,
      color,
      backgroundColor,
      style,
      textStyle,
      contentStyle,
      tokensOverride,
      ...pressableProps
    } = props

    const tokens = useAvatarTokens(tokensOverride)
    const resolvedSize = size ?? tokens.defaults.size
    const resolvedShape = shape ?? tokens.defaults.shape
    const baseSize = isNumber(resolvedSize) ? resolvedSize : tokens.sizing.sizes[resolvedSize]
    const avatarWidth = width ?? baseSize
    const avatarHeight = height ?? baseSize
    const borderRadius = resolvedShape === 'circle'
      ? Math.min(avatarWidth, avatarHeight) / 2
      : Math.max(tokens.radii.squareMin, Math.min(avatarWidth, avatarHeight) / tokens.radii.squareDivisor)

    const fallbackText = text ? text.trim().slice(0, 2).toUpperCase() : undefined
    const fallbackContent = icon ? (
      <View
        style={[
          tokens.layout.iconWrapper,
          {
            width: Math.min(avatarWidth, tokens.sizing.iconMaxSize),
            height: Math.min(avatarHeight, tokens.sizing.iconMaxSize),
          },
          contentStyle,
        ]}
      >
        {icon}
      </View>
    ) : fallbackText ? (
      <Text
        style={[
          tokens.layout.text,
          {
            color: color ?? tokens.colors.text,
            fontSize: Math.min(avatarWidth, avatarHeight) * tokens.typography.fallbackTextScale,
            fontWeight: tokens.typography.fontWeight,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {fallbackText}
      </Text>
    ) : null

    const content = src || source ? (
      <Image
        src={src}
        source={source}
        containerStyle={transparentContainerStyle}
        style={tokens.layout.image}
        fit={fit ?? 'cover'}
        loadingText={null}
        loadingSize={tokens.sizing.loadingSize}
        showError
        fallback={fallbackContent}
      />
    ) : (
      fallbackContent
    )

    return (
      <Pressable
        ref={ref}
        style={[
          tokens.layout.container,
          {
            width: avatarWidth,
            height: avatarHeight,
            borderRadius,
            backgroundColor: backgroundColor ?? tokens.colors.background,
          },
          style,
        ]}
        {...pressableProps}
      >
        {content}
      </Pressable>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar
