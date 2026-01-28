import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Image as RNImage, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import type { ImageSourcePropType, ImageStyle, PressableProps, StyleProp, ViewStyle } from 'react-native'
import { SvgUri } from 'react-native-svg'

import { isNumber, isString, isText } from '../../utils'
import { useImageTokens } from './tokens'
import type { ImageFit, ImageProps } from './types'

type FitMode = 'cover' | 'contain' | 'stretch' | 'center'
const resolveFitMode = (fit: ImageFit): FitMode => {
  switch (fit) {
    case 'fill':
      return 'stretch'
    case 'scale-down':
      return 'contain'
    case 'none':
      return 'center'
    default:
      return fit
  }
}

type RNImageOnLoadEvent = Parameters<NonNullable<React.ComponentProps<typeof RNImage>['onLoad']>>[0]
type RNImageOnErrorEvent = Parameters<NonNullable<React.ComponentProps<typeof RNImage>['onError']>>[0]

const LAYOUT_STYLE_KEYS = new Set([
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'alignSelf',
  'aspectRatio',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'start',
  'end',
  'opacity',
  'borderRadius',
])

const isLayoutStyleKey = (key: string) =>
  LAYOUT_STYLE_KEYS.has(key) ||
  key === 'backgroundColor' ||
  key.startsWith('margin') ||
  key.startsWith('padding') ||
  key.startsWith('border') ||
  key.endsWith('Radius')

const splitImageStyle = (style?: StyleProp<ImageStyle>) => {
  if (!style) return { container: undefined, image: undefined }

  const flattened = StyleSheet.flatten(style) ?? {}
  const flattenedRecord = flattened as Record<string, unknown>
  const container: Record<string, unknown> = {}
  const image: Record<string, unknown> = {}

  for (const key of Object.keys(flattenedRecord)) {
    const value = flattenedRecord[key]
    if (value === undefined) continue

    if (isLayoutStyleKey(key)) {
      container[key] = value
    } else {
      image[key] = value
    }
  }

  return {
    container: Object.keys(container).length ? (container as unknown as ViewStyle) : undefined,
    image: Object.keys(image).length ? (image as unknown as ImageStyle) : undefined,
  }
}

const PRESERVE_ASPECT_RATIO_MAP: Record<string, string> = {
  contain: 'xMidYMid meet',
  'scale-down': 'xMidYMid meet',
  stretch: 'none',
  fill: 'none',
  none: 'xMidYMid meet',
  center: 'xMidYMid meet',
}
const resolvePreserveAspectRatio = (fit: ImageFit): string =>
  PRESERVE_ASPECT_RATIO_MAP[fit] || 'xMidYMid slice'

const resolveSourceUri = (source?: ImageSourcePropType): string | undefined => {
  if (!source) return undefined
  if (typeof source === 'number') return undefined

  if (Array.isArray(source)) {
    for (const item of source) {
      if (item && typeof item === 'object' && 'uri' in item && typeof item.uri === 'string') {
        return item.uri
      }
    }
    return undefined
  }

  if (typeof source === 'object' && 'uri' in source && typeof source.uri === 'string') {
    return source.uri
  }

  return undefined
}

const Image = React.forwardRef<React.ElementRef<typeof RNImage>, ImageProps>((props, ref) => {
  const {
    src,
    source,
    width,
    height,
    radius,
    round,
    fit: fitProp,
    showLoading: showLoadingProp,
    showError: showErrorProp,
    loadingText: loadingTextProp,
    loadingIcon,
    errorIcon,
    iconSize: iconSizeProp,
    loadingSize,
    errorText: errorTextProp,
    fallback,
    onPress,
    alt,
    accessibilityLabel,
    ['aria-label']: ariaLabel,
    containerStyle,
    style,
    children,
    tokensOverride,
    onLoad,
    onError,
    ...rest
  } = props

  const tokens = useImageTokens(tokensOverride)
  const fit = fitProp ?? tokens.defaults.fit
  const showLoading = showLoadingProp ?? tokens.defaults.showLoading
  const showError = showErrorProp ?? tokens.defaults.showError
  const loadingText = loadingTextProp ?? tokens.defaults.loadingText
  const errorText = errorTextProp ?? tokens.defaults.errorText
  const { container: containerLayoutStyle, image: imageStyleWithoutLayout } = useMemo(
    () => splitImageStyle(style),
    [style]
  )

  const actualSource = useMemo(() => {
    if (source) return source
    if (src) return { uri: src }
    return undefined
  }, [source, src])

  const resolvedAccessibilityLabel = alt ?? accessibilityLabel ?? ariaLabel

  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>(() =>
    actualSource ? 'loading' : 'idle'
  )

  useEffect(() => {
    setStatus(actualSource ? 'loading' : 'idle')
  }, [actualSource])

  const handleLoad = useCallback(
    (event: RNImageOnLoadEvent) => {
      setStatus('loaded')
      onLoad?.(event)
    },
    [onLoad]
  )

  const handleError = useCallback(
    (event: RNImageOnErrorEvent) => {
      setStatus('error')
      onError?.(event)
    },
    [onError]
  )

  const handleSvgLoad = useCallback(() => {
    handleLoad({ nativeEvent: {} } as unknown as RNImageOnLoadEvent)
  }, [handleLoad])

  const handleSvgError = useCallback(
    (error: Error) => {
      handleError({ nativeEvent: { error } } as unknown as RNImageOnErrorEvent)
    },
    [handleError]
  )

  const uri = resolveSourceUri(actualSource)
  const isSvg = useMemo(() => {
    const normalizedUri = isString(uri) ? uri.toLowerCase() : undefined
    return (
      isString(normalizedUri) &&
      (normalizedUri.endsWith('.svg') ||
        normalizedUri.includes('.svg?') ||
        normalizedUri.includes('/svg?'))
    )
  }, [uri])

  const resolvedLoadingSize = isNumber(loadingSize) ? loadingSize : tokens.defaults.loadingIndicatorBaseSize
  const resolvedErrorIconSize = iconSizeProp ?? tokens.defaults.iconSize
  const containerRole = onPress ? 'button' : undefined
  const pressableProps: Pick<PressableProps, 'onPress'> | null = onPress ? { onPress } : null

  const renderLabel = (node: React.ReactNode, color: string, marginTop?: number) => {
    if (node == null || node === false) return null
    if (isText(node)) {
      return (
        <Text style={[tokens.layout.label, { color }, marginTop ? { marginTop } : undefined]}>
          {node}
        </Text>
      )
    }
    return marginTop ? <View style={{ marginTop }}>{node}</View> : node
  }

  const containerStyles: StyleProp<ViewStyle> = [
    tokens.layout.container,
    {
      width: width as ViewStyle['width'],
      height: height as ViewStyle['height'],
      backgroundColor: tokens.colors.background,
    },
    round ? { borderRadius: tokens.defaults.roundRadius } : isNumber(radius) ? { borderRadius: radius } : undefined,
    containerStyle,
    containerLayoutStyle,
  ]

  const imageAccessibilityLabel = !onPress ? resolvedAccessibilityLabel : undefined

  const imageNode = actualSource ? (
    isSvg && Platform.OS !== 'web' && uri ? (
      <SvgUri
        width="100%"
        height="100%"
        uri={uri}
        preserveAspectRatio={resolvePreserveAspectRatio(fit)}
        accessible={!onPress}
        accessibilityLabel={imageAccessibilityLabel}
        {...rest}
        style={[tokens.layout.absoluteFill, imageStyleWithoutLayout]}
        onLoad={handleSvgLoad}
        onError={handleSvgError}
      />
    ) : (
      <RNImage
        ref={ref}
        accessible={!onPress}
        accessibilityLabel={imageAccessibilityLabel}
        {...rest}
        source={actualSource}
        style={[tokens.layout.absoluteFill, imageStyleWithoutLayout]}
        resizeMode={resolveFitMode(fit)}
        onLoad={handleLoad}
        onError={handleError}
      />
    )
  ) : null

  const content = (
    <>
      {status === 'loading' && showLoading ? (
        <View style={tokens.layout.overlay} pointerEvents="none" testID="rv-image-loading">
          {loadingIcon || (
            <ActivityIndicator
              color={tokens.colors.text}
              size={isString(loadingSize) ? loadingSize : 'small'}
              style={{ transform: [{ scale: resolvedLoadingSize / tokens.defaults.loadingIndicatorBaseSize }] }}
            />
          )}
          {renderLabel(loadingText, tokens.colors.text, tokens.defaults.loadingLabelMarginTop)}
        </View>
      ) : null}
      {imageNode}
      {status === 'error' && showError ? (
        <View style={tokens.layout.overlay} pointerEvents="none" testID="rv-image-error">
          {errorIcon ? (
            <View
              style={[
                tokens.layout.iconContainer,
                { width: resolvedErrorIconSize, height: resolvedErrorIconSize },
              ]}
            >
              {errorIcon}
            </View>
          ) : null}
          {fallback !== undefined && fallback !== null && fallback !== false
            ? renderLabel(fallback, tokens.colors.error)
            : renderLabel(errorText, tokens.colors.error)}
        </View>
      ) : null}
      {children}
    </>
  )

  return (
    pressableProps ? (
      <Pressable
        {...pressableProps}
        accessibilityRole={containerRole}
        accessibilityLabel={resolvedAccessibilityLabel}
        style={containerStyles}
      >
        {content}
      </Pressable>
    ) : (
      <View
        accessibilityLabel={resolvedAccessibilityLabel}
        style={containerStyles}
      >
        {content}
      </View>
    )
  )
})

Image.displayName = 'Image'

export default Image
