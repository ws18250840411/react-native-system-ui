import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { AvatarProps, AvatarShape, AvatarSize } from './types'

const sizeMap: Record<AvatarSize, number> = {
  small: 24,
  medium: 32,
  large: 40,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontWeight: '600',
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

const getDimension = (size?: AvatarSize | number) => {
  if (typeof size === 'number') {
    return size
  }
  return sizeMap[size ?? 'medium']
}

const getRadius = (shape: AvatarShape, width: number, height: number) =>
  shape === 'circle' ? Math.min(width, height) / 2 : Math.max(6, Math.min(width, height) / 6)

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
      size = 'medium',
      width,
      height,
      shape = 'circle',
      color,
      backgroundColor,
      style,
      textStyle,
      contentStyle,
      ...pressableProps
    },
    ref
  ) => {
    const { foundations } = useTheme()
    const baseSize = getDimension(size)
    const avatarWidth = width ?? baseSize
    const avatarHeight = height ?? baseSize
    const borderRadius = getRadius(shape, avatarWidth, avatarHeight)
    const fallbackText = useFallbackText(text)

    const containerStyle: StyleProp<ViewStyle> = [
      styles.container,
      {
        width: avatarWidth,
        height: avatarHeight,
        borderRadius,
        backgroundColor: backgroundColor ?? foundations.palette.default[100],
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
                width: Math.min(avatarWidth, sizeMap.medium),
                height: Math.min(avatarHeight, sizeMap.medium),
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
                color: color ?? foundations.palette.default[800],
                fontSize: Math.min(avatarWidth, avatarHeight) / 2,
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
