import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import Image from '../image'
import { isNumber } from '../../utils'
import { useAvatarTokens } from './tokens'
import type { AvatarFallbackTextProps, AvatarImageProps, AvatarProps } from './types'

export const AvatarFallbackText = React.forwardRef<Text, AvatarFallbackTextProps>(({ children, color, style }, ref) => {
  const tokens = useAvatarTokens()
  return <Text ref={ref} style={StyleSheet.flatten([tokens.layout.text, { color: color ?? tokens.colors.text, fontWeight: tokens.typography.fontWeight }, style])} numberOfLines={1}>{children}</Text>
})

AvatarFallbackText.displayName = 'Avatar.FallbackText'

export const AvatarImage = React.forwardRef<React.ElementRef<typeof Image>, AvatarImageProps>((props, ref) => {
  const tokens = useAvatarTokens()
  return <Image ref={ref} {...props} containerStyle={[{ backgroundColor: tokens.colors.transparent }, props.containerStyle]} style={[tokens.layout.image, props.style]} fit={props.fit ?? 'cover'} loadingText={props.loadingText ?? null} loadingSize={props.loadingSize ?? tokens.sizing.loadingSize} showError={props.showError ?? true} />
})

AvatarImage.displayName = 'Avatar.Image'

const AvatarImpl = (
  props: AvatarProps,
  ref: React.ForwardedRef<React.ElementRef<typeof Pressable>>,
) => {
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
      children,
      tokensOverride,
      ...pressableProps
    } = props

    const tokens = useAvatarTokens(tokensOverride)
    const resolvedSize = size ?? tokens.defaults.size
    const resolvedShape = shape ?? tokens.defaults.shape
    const baseSize = isNumber(resolvedSize) ? resolvedSize : tokens.sizing.sizes[resolvedSize]
    const avatarWidth = width ?? baseSize
    const avatarHeight = height ?? baseSize
    const borderRadius = resolvedShape === 'circle' ? Math.min(avatarWidth, avatarHeight) / 2 : Math.max(tokens.radii.squareMin, Math.min(avatarWidth, avatarHeight) / tokens.radii.squareDivisor)

    const transparentContainerStyle = { backgroundColor: tokens.colors.transparent } as const
    const fallbackContent = icon ? (
      <View style={[tokens.layout.iconWrapper, { width: Math.min(avatarWidth, tokens.sizing.iconMaxSize), height: Math.min(avatarHeight, tokens.sizing.iconMaxSize) }, contentStyle]}>{icon}</View>
    ) : text && (
      <AvatarFallbackText color={color} style={[{ fontSize: Math.min(avatarWidth, avatarHeight) * tokens.typography.fallbackTextScale }, textStyle]}>{text.trim().slice(0, 2).toUpperCase()}</AvatarFallbackText>
    )

    const content = children ?? (src || source ? <AvatarImage src={src} source={source} containerStyle={transparentContainerStyle} style={tokens.layout.image} fit={fit ?? 'cover'} loadingText={null} loadingSize={tokens.sizing.loadingSize} showError fallback={fallbackContent} /> : fallbackContent)

    return <Pressable ref={ref} accessibilityRole="image" accessibilityLabel={text ?? (src ? 'avatar' : undefined)} style={[tokens.layout.container, { width: avatarWidth, height: avatarHeight, borderRadius, backgroundColor: backgroundColor ?? tokens.colors.background }, style]} {...pressableProps}>{content}</Pressable>
}

const AvatarForwardRef = React.forwardRef<React.ElementRef<typeof Pressable>, AvatarProps>(AvatarImpl)
AvatarForwardRef.displayName = 'Avatar'

export const Avatar = React.memo(AvatarForwardRef)

export default Avatar
