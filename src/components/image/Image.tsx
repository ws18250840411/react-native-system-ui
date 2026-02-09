import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Image as RNImage, Platform, Pressable, StyleSheet, View } from 'react-native'
import type { ImageSourcePropType, ImageStyle, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { isNumber, isString, renderTextOrNode } from '../../utils'
import { isRenderable, isText } from '../../utils/validate'
import { useLocale } from '../config-provider/useLocale'
import { useImageTokens } from './tokens'
import type { ImageFit, ImageProps } from './types'

type FitMode = 'cover' | 'contain' | 'stretch' | 'center'
const resolveFitMode = (fit: ImageFit): FitMode => {
  switch (fit) {
    case 'fill': return 'stretch'
    case 'scale-down': return 'contain'
    case 'none': return 'center'
    default: return fit
  }
}
type RNImageOnLoadEvent = Parameters<NonNullable<React.ComponentProps<typeof RNImage>['onLoad']>>[0]
type RNImageOnErrorEvent = Parameters<NonNullable<React.ComponentProps<typeof RNImage>['onError']>>[0]
const LAYOUT_STYLE_KEYS = new Set(['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'alignSelf', 'aspectRatio', 'position', 'top', 'right', 'bottom', 'left', 'start', 'end', 'opacity', 'borderRadius'])
const isLayoutStyleKey = (key: string) => LAYOUT_STYLE_KEYS.has(key) || key === 'backgroundColor' || key.startsWith('margin') || key.startsWith('padding') || key.startsWith('border') || key.endsWith('Radius')
const splitImageStyle = (style?: StyleProp<ImageStyle>) => {
  if (!style) return { container: undefined, image: undefined }
  const flattened = StyleSheet.flatten(style) ?? {}
  const flattenedRecord = flattened as Record<string, unknown>
  const container: Record<string, unknown> = {}
  const image: Record<string, unknown> = {}
  for (const key of Object.keys(flattenedRecord)) {
    const value = flattenedRecord[key]
    if (value === undefined) continue
    if (isLayoutStyleKey(key)) container[key] = value
    else image[key] = value
  }
  return {
    container: Object.keys(container).length ? (container as unknown as ViewStyle) : undefined,
    image: Object.keys(image).length ? (image as unknown as ImageStyle) : undefined,
  }
}
const PRESERVE_ASPECT_RATIO_MAP: Record<string, string> = { contain: 'xMidYMid meet', 'scale-down': 'xMidYMid meet', stretch: 'none', fill: 'none', none: 'xMidYMid meet', center: 'xMidYMid meet' }
const resolvePreserveAspectRatio = (fit: ImageFit): string => PRESERVE_ASPECT_RATIO_MAP[fit] || 'xMidYMid slice'
const WEB_IMAGE_STYLE = Platform.OS === 'web' ? ({ height: 'revert-layer', width: 'revert-layer' } as unknown as ImageStyle) : undefined
const resolveSourceUri = (source?: ImageSourcePropType): string | undefined => {
  if (!source) return undefined
  if (typeof source === 'number') return undefined
  if (Array.isArray(source)) {
    for (const item of source) {
      if (item && typeof item === 'object' && 'uri' in item && typeof item.uri === 'string') return item.uri
    }
    return undefined
  }
  if (typeof source === 'object' && 'uri' in source && typeof source.uri === 'string') return source.uri
  return undefined
}
const ImageImpl = (props: ImageProps, ref: React.ForwardedRef<React.ElementRef<typeof RNImage>>) => {
  const { src, source, width, height, radius, round, fit: fitProp, showLoading: showLoadingProp, showError: showErrorProp, loadingText: loadingTextProp, loadingIcon, errorIcon, iconSize: iconSizeProp, loadingSize, errorText: errorTextProp, fallback, onPress, alt, accessibilityLabel, ['aria-label']: ariaLabel, containerStyle, style, children, tokensOverride, onLoad, onError, ...rest } = props
  const locale = useLocale()
  const tokens = useImageTokens(tokensOverride)
  const fit = fitProp ?? tokens.defaults.fit
  const showLoading = showLoadingProp ?? tokens.defaults.showLoading
  const showError = showErrorProp ?? tokens.defaults.showError
  const loadingText = loadingTextProp !== undefined ? loadingTextProp : (locale?.vanImage?.loading ?? tokens.defaults.loadingText)
  const errorText = errorTextProp !== undefined ? errorTextProp : (locale?.vanImage?.error ?? tokens.defaults.errorText)
  const { container: containerLayoutStyle, image: imageStyleWithLayout } = useMemo(() => splitImageStyle(style), [style])
  const actualSource = useMemo(() => (source ? source : src ? { uri: src } : undefined), [source, src])
  const sourceKey = useMemo(() => {
    if (source) {
      if (typeof source === 'number') return `res:${source}`
      const uri = resolveSourceUri(source)
      if (uri) return `uri:${uri}`
      return 'source:unknown'
    }
    if (src) return `src:${src}`
    return 'none'
  }, [source, src])
  const resolvedAccessibilityLabel = alt ?? accessibilityLabel ?? ariaLabel
  const [state, setState] = useState<'idle' | 'loading' | 'loaded' | 'error'>(() => actualSource ? 'loading' : 'idle')
  useEffect(() => { setState(actualSource ? 'loading' : 'idle') }, [sourceKey])
  const onLoadRef = useRef(onLoad)
  onLoadRef.current = onLoad
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError
  const handleLoad = useCallback((event: RNImageOnLoadEvent) => { setState('loaded'); onLoadRef.current?.(event) }, [])
  const handleError = useCallback((event: RNImageOnErrorEvent) => { setState('error'); onErrorRef.current?.(event) }, [])
  const handleSvgLoad = useCallback(() => { handleLoad({ nativeEvent: {} } as unknown as RNImageOnLoadEvent) }, [handleLoad])
  const handleSvgError = useCallback((err: Error) => { handleError({ nativeEvent: { error: err } } as unknown as RNImageOnErrorEvent) }, [handleError])
  const uri = useMemo(() => resolveSourceUri(actualSource), [actualSource])
  const normalizedUri = isString(uri) ? uri.toLowerCase() : undefined
  const isSvg = !!normalizedUri && (normalizedUri.endsWith('.svg') || normalizedUri.includes('.svg?') || normalizedUri.includes('/svg?'))
  const resolvedLoadingSize = isNumber(loadingSize) ? loadingSize : tokens.defaults.loadingIndicatorBaseSize
  const resolvedErrorIconSize = iconSizeProp ?? tokens.defaults.iconSize
  const clickableRole = onPress ? 'button' : undefined
  const pressableProps: Pick<PressableProps, 'onPress'> | null = onPress ? { onPress } : null
  const renderLabel = (node: React.ReactNode, color: string, marginTop?: number) => {
    if (!isRenderable(node)) return null
    const textNode = renderTextOrNode(node, [tokens.layout.label, { color: color }, marginTop ? { marginTop: marginTop } : undefined].filter(Boolean) as StyleProp<TextStyle>)
    return marginTop && !isText(node) ? <View style={{ marginTop: marginTop }}>{textNode}</View> : textNode
  }
  const computedContainerStyle = useMemo<StyleProp<ViewStyle>>(() => [
    tokens.layout.container,
    { width: width as ViewStyle['width'], height: height as ViewStyle['height'], backgroundColor: tokens.colors.background },
    round ? { borderRadius: tokens.defaults.roundRadius } : isNumber(radius) ? { borderRadius: radius } : undefined,
    containerStyle,
    containerLayoutStyle,
  ], [containerLayoutStyle, containerStyle, height, radius, round, tokens.colors.background, tokens.defaults.roundRadius, tokens.layout.container, width])
  const imageAccessibilityLabel = !onPress ? resolvedAccessibilityLabel : undefined
  const imageNode = actualSource ? (
    isSvg && Platform.OS !== 'web' && uri ? (
      <SvgUri width="100%" height="100%" uri={uri} preserveAspectRatio={resolvePreserveAspectRatio(fit)} accessible={!onPress} accessibilityLabel={imageAccessibilityLabel} {...rest} style={[tokens.layout.absoluteFill, imageStyleWithLayout]} onLoad={handleSvgLoad} onError={handleSvgError} />
    ) : (
      <RNImage ref={ref} accessible={!onPress} accessibilityLabel={imageAccessibilityLabel} {...rest} source={actualSource} style={[tokens.layout.absoluteFill, imageStyleWithLayout, WEB_IMAGE_STYLE]} resizeMode={resolveFitMode(fit)} onLoad={handleLoad} onError={handleError} />
    )
  ) : null
  const content = (
    <>
      {state === 'loading' && showLoading && (
        <View style={tokens.layout.overlay} pointerEvents="none" testID="rv-image-loading">
          {loadingIcon || <ActivityIndicator color={tokens.colors.text} size={isString(loadingSize) ? loadingSize : 'small'} style={{ transform: [{ scale: resolvedLoadingSize / tokens.defaults.loadingIndicatorBaseSize }] }} />}
          {renderLabel(loadingText, tokens.colors.text, tokens.defaults.loadingLabelMarginTop)}
        </View>
      )}
      {imageNode}
      {state === 'error' && showError && (
        <View style={tokens.layout.overlay} pointerEvents="none" testID="rv-image-error">
          {errorIcon && <View style={[tokens.layout.iconContainer, { width: resolvedErrorIconSize, height: resolvedErrorIconSize }]}>{errorIcon}</View>}
          {isRenderable(fallback) ? renderLabel(fallback, tokens.colors.error) : renderLabel(errorText, tokens.colors.error)}
        </View>
      )}
      {children}
    </>
  )
  return pressableProps ? (
    <Pressable {...pressableProps} accessibilityRole={clickableRole} accessibilityLabel={resolvedAccessibilityLabel} style={computedContainerStyle}>
      {content}
    </Pressable>
  ) : (
    <View accessibilityLabel={resolvedAccessibilityLabel} style={computedContainerStyle}>
      {content}
    </View>
  )
}
const ImageForwardRef = React.forwardRef<React.ElementRef<typeof RNImage>, ImageProps>(ImageImpl)
const Image = React.memo(ImageForwardRef)
export default Image
