import React from 'react'
import { ActivityIndicator, Image as RNImage, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { SvgUri } from 'react-native-svg'

import { isNumber, isString, isText } from '../../utils/validate'
import { useImageTokens } from './tokens'
import type { ImageFit, ImageProps } from './types'

type FitMode = 'cover' | 'contain' | 'stretch' | 'center'
const FIT_MODE_MAP: Record<string, FitMode> = {
  fill: 'stretch',
  'scale-down': 'contain',
  none: 'center',
}

const resolveFitMode = (fit: string): FitMode => FIT_MODE_MAP[fit] || ((fit as FitMode) ?? 'cover')

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

const splitImageStyle = (style: any) => {
  if (!style) return { container: undefined, image: undefined }

  const flattened = StyleSheet.flatten(style)
  const container: Record<string, any> = {}
  const image: Record<string, any> = {}

  Object.keys(flattened).forEach(key => {
    const value = (flattened as any)[key]
    if (value === undefined) return

    if (isLayoutStyleKey(key)) {
      container[key] = value
    } else {
      image[key] = value
    }
  })

  return {
    container: Object.keys(container).length ? container : undefined,
    image: Object.keys(image).length ? image : undefined,
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
const resolvePreserveAspectRatio = (fit: string): string =>
  PRESERVE_ASPECT_RATIO_MAP[fit] || 'xMidYMid slice'

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
  const { container: containerLayoutStyle, image: imageStyleWithoutLayout } = React.useMemo(
    () => splitImageStyle(style),
    [style]
  )

  const resolvedAccessibilityLabel =
    alt ?? (rest as any).accessibilityLabel ?? (rest as any)['aria-label']

  const actualSource = React.useMemo(() => {
    if (source) return source
    if (src) return { uri: src }
    return undefined
  }, [source, src])

  const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>(() =>
    actualSource ? 'loading' : 'idle'
  )

  React.useEffect(() => {
    setStatus(actualSource ? 'loading' : 'idle')
  }, [actualSource])

  const handleLoad = React.useCallback(
    (event: RNImageOnLoadEvent) => {
      setStatus('loaded')
      onLoad?.(event)
    },
    [onLoad]
  )

  const handleError = React.useCallback(
    (event: RNImageOnErrorEvent) => {
      setStatus('error')
      onError?.(event)
    },
    [onError]
  )

  const handleSvgLoad = React.useCallback(() => {
    handleLoad({ nativeEvent: {} } as any)
  }, [handleLoad])

  const handleSvgError = React.useCallback(
    (error: Error) => {
      handleError({ nativeEvent: { error } } as any)
    },
    [handleError]
  )

  const uri = (actualSource as any)?.uri
  const isSvg = React.useMemo(() => {
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
  const Container = (onPress ? Pressable : View) as any
  const containerRole = onPress ? 'button' : undefined

  const renderLabel = (node: React.ReactNode, color: string, marginTop?: number) => {
    if (node == null || node === false) return null
    if (isText(node)) {
      return (
        <Text style={[tokens.layout.label, { color }, marginTop ? { marginTop } : null]}>
          {node}
        </Text>
      )
    }
    return marginTop ? <View style={{ marginTop }}>{node}</View> : node
  }

  return (
    <Container
      onPress={onPress}
      accessibilityRole={containerRole}
      accessibilityLabel={alt}
      style={[
        tokens.layout.container,
        {
          width,
          height,
          backgroundColor: tokens.colors.background,
        },
        round ? { borderRadius: tokens.defaults.roundRadius } : isNumber(radius) ? { borderRadius: radius } : undefined,
        containerStyle,
        containerLayoutStyle,
      ]}
    >
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
      {actualSource ? (
        isSvg && Platform.OS !== 'web' ? (
          <SvgUri
            width="100%"
            height="100%"
            uri={(actualSource as any).uri}
            preserveAspectRatio={resolvePreserveAspectRatio(fit)}
            accessible={!onPress}
            accessibilityLabel={!onPress ? alt : undefined}
            {...rest}
            style={[tokens.layout.absoluteFill, imageStyleWithoutLayout]}
            onLoad={handleSvgLoad}
            onError={handleSvgError}
          />
        ) : (
          <RNImage
            ref={ref}
            accessible={!onPress}
            accessibilityLabel={!onPress ? alt : undefined}
            {...rest}
            source={actualSource}
            style={[tokens.layout.absoluteFill, imageStyleWithoutLayout]}
            resizeMode={resolveFitMode(fit)}
            onLoad={handleLoad}
            onError={handleError}
          />
        )
      ) : null}
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
    </Container>
  )
})

Image.displayName = 'Image'

export default Image
