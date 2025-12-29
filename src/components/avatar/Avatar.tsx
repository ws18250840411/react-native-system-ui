import React from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { AvatarProps, AvatarShape, AvatarSize } from './types'

interface AvatarTokens {
  defaults: {
    size: AvatarSize
    shape: AvatarShape
  }
  sizing: {
    sizes: Record<AvatarSize, number>
    iconMaxSize: number
  }
  colors: {
    background: string
    text: string
  }
  typography: {
    fontWeight: TextStyle['fontWeight']
    fallbackTextScale: number
  }
  radii: {
    squareMin: number
    squareDivisor: number
  }
}

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

const useAvatarTokens = (overrides?: DeepPartial<AvatarTokens>): AvatarTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createAvatarTokens(foundations)
    const componentOverrides = components?.avatar as DeepPartial<AvatarTokens> | undefined
    const merged = componentOverrides
      ? overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

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

const getDimension = (size: AvatarSize | number | undefined, sizeMap: Record<AvatarSize, number>) => {
  if (typeof size === 'number') {
    return size
  }
  return sizeMap[size ?? 'medium']
}

const getRadius = (
  shape: AvatarShape,
  width: number,
  height: number,
  options: { squareMin: number; squareDivisor: number }
) =>
  shape === 'circle'
    ? Math.min(width, height) / 2
    : Math.max(options.squareMin, Math.min(width, height) / options.squareDivisor)

const useFallbackText = (text?: string) => {
  if (!text) return undefined
  return text.trim().slice(0, 2).toUpperCase()
}

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
      ...pressableProps
    },
    ref
  ) => {
    const tokens = useAvatarTokens()
    const resolvedSize = size ?? tokens.defaults.size
    const resolvedShape = shape ?? tokens.defaults.shape
    const baseSize = getDimension(resolvedSize, tokens.sizing.sizes)
    const avatarWidth = width ?? baseSize
    const avatarHeight = height ?? baseSize
    const borderRadius = getRadius(resolvedShape, avatarWidth, avatarHeight, tokens.radii)
    const fallbackText = useFallbackText(text)

    const containerStyle: StyleProp<ViewStyle> = [
      styles.container,
      {
        width: avatarWidth,
        height: avatarHeight,
        borderRadius,
        backgroundColor: backgroundColor ?? tokens.colors.background,
      },
      style,
    ]

    const renderContent = () => {
      if (src) {
        const source = typeof src === 'string' ? { uri: src } : src
        return (
          <Image
            source={source}
            style={[styles.image, { borderRadius }]}
            resizeMode="cover"
          />
        )
      }
      if (icon) {
        return (
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
      }
      if (fallbackText) {
        return (
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
      }
      return null
    }

    return (
      <Pressable ref={ref} style={containerStyle} {...pressableProps}>
        {renderContent()}
      </Pressable>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar
