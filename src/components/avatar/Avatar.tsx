import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { AvatarProps, AvatarTokens } from './types'

const createAvatarTokens = (foundations: Foundations): AvatarTokens => ({
  defaults: {
    size: 'medium',
    shape: 'circle',
  },
  sizing: {
    sizes: {
      small: 24,
      medium: 32,
      large: 40,
    },
    iconMaxSize: 32,
  },
  colors: {
    background: foundations.palette.default[100],
    text: foundations.palette.default[800],
  },
  typography: {
    fontWeight: '600',
    fallbackTextScale: 0.5,
  },
  radii: {
    squareMin: 6,
    squareDivisor: 6,
  },
})

const useAvatarTokens = createComponentTokensHook('avatar', createAvatarTokens)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const Avatar = React.forwardRef<React.ElementRef<typeof Pressable>, AvatarProps>(
  (
    {
      src,
      icon,
      text,
      size,
      width,
      height,
      shape,
      color,
      backgroundColor,
      style,
      textStyle,
      contentStyle,
      tokensOverride,
      ...pressableProps
    },
    ref
  ) => {
    const tokens = useAvatarTokens(tokensOverride)
    const resolvedSize = size ?? tokens.defaults.size
    const resolvedShape = shape ?? tokens.defaults.shape
    const baseSize = typeof resolvedSize === 'number' ? resolvedSize : tokens.sizing.sizes[resolvedSize]
    const avatarWidth = width ?? baseSize
    const avatarHeight = height ?? baseSize
    const borderRadius = resolvedShape === 'circle'
      ? Math.min(avatarWidth, avatarHeight) / 2
      : Math.max(tokens.radii.squareMin, Math.min(avatarWidth, avatarHeight) / tokens.radii.squareDivisor)

    const fallbackText = text ? text.trim().slice(0, 2).toUpperCase() : undefined

    const content = src
      ? (
        <Image
          source={typeof src === 'string' ? { uri: src } : src}
          style={[styles.image, { borderRadius }]}
          resizeMode="cover"
        />
      )
      : icon
        ? (
          <View
            style={[
              styles.iconWrapper,
              {
                width: Math.min(avatarWidth, tokens.sizing.iconMaxSize),
                height: Math.min(avatarHeight, tokens.sizing.iconMaxSize),
              },
              contentStyle,
            ]}
          >
            {icon}
          </View>
        )
        : fallbackText
          ? (
            <Text
              style={[
                styles.text,
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
          )
          : null

    return (
      <Pressable
        ref={ref}
        style={[
          styles.container,
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
