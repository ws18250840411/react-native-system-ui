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

const AvatarImpl = (props: AvatarProps, ref: React.ForwardedRef<React.ElementRef<typeof Pressable>>) => {
  const { src, source, icon, text, size: szP, width: wP, height: hP, shape: shapeP, fit: fitP, color, backgroundColor, style, textStyle, contentStyle, children, tokensOverride, ...rest } = props; const tokens = useAvatarTokens(tokensOverride); const rSz = szP ?? tokens.defaults.size; const rShape = shapeP ?? tokens.defaults.shape; const base = isNumber(rSz) ? rSz : tokens.sizing.sizes[rSz]; const w = wP ?? base; const h = hP ?? base; const radius = rShape === 'circle' ? Math.min(w, h) / 2 : Math.max(tokens.radii.squareMin, Math.min(w, h) / tokens.radii.squareDivisor); const transStyle = { backgroundColor: tokens.colors.transparent } as const; const fallback = icon ? <View style={[tokens.layout.iconWrapper, { width: Math.min(w, tokens.sizing.iconMaxSize), height: Math.min(h, tokens.sizing.iconMaxSize) }, contentStyle]}>{icon}</View> : text && <AvatarFallbackText color={color} style={[{ fontSize: Math.min(w, h) * tokens.typography.fallbackTextScale }, textStyle]}>{text.trim().slice(0, 2).toUpperCase()}</AvatarFallbackText>; const content = children ?? (src || source ? <AvatarImage src={src} source={source} containerStyle={transStyle} style={tokens.layout.image} fit={fitP ?? 'cover'} loadingText={null} loadingSize={tokens.sizing.loadingSize} showError fallback={fallback} /> : fallback); return <Pressable ref={ref} accessibilityRole="image" accessibilityLabel={text ?? (src ? 'avatar' : undefined)} style={[tokens.layout.container, { width: w, height: h, borderRadius: radius, backgroundColor: backgroundColor ?? tokens.colors.background }, style]} {...rest}>{content}</Pressable>
}

const AvatarForwardRef = React.forwardRef<React.ElementRef<typeof Pressable>, AvatarProps>(AvatarImpl)
AvatarForwardRef.displayName = 'Avatar'
export const Avatar = React.memo(AvatarForwardRef)
export default Avatar
