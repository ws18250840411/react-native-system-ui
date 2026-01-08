import React from 'react'
import { ActivityIndicator, Image as RNImage, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { SvgUri } from 'react-native-svg'

import { isNumber, isString, isText } from '../../utils/validate'
import { useImageTokens } from './tokens'
import type { ImageProps } from './types'

type FitMode = 'cover' | 'contain' | 'stretch' | 'center'
const resolveFitMode = (fit: string): FitMode => {
  if (fit === 'fill') return 'stretch'
  if (fit === 'scale-down') return 'contain'
  if (fit === 'none') return 'center'
  return (fit as FitMode) ?? 'cover'
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

const resolvePreserveAspectRatio = (fit: string): string => {
  if (fit === 'contain' || fit === 'scale-down') return 'xMidYMid meet'
  if (fit === 'stretch' || fit === 'fill') return 'none'
  if (fit === 'none' || fit === 'center') return 'xMidYMid meet'
  return 'xMidYMid slice'
}

const Image = React.forwardRef<React.ElementRef<typeof RNImage>, ImageProps>((props, ref) => {
  const {
    src,
    source,
    width,
    height,
    radius,
    round,
    fit = 'cover',
    showLoading = true,
    showError = true,
    loadingText = '加载中…',
    loadingIcon,
    errorIcon,
    iconSize,
    loadingSize,
    errorText = '加载失败',
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
  const { container: containerLayoutStyle, image: imageStyleWithoutLayout } = React.useMemo(
    () => splitImageStyle(style),
    [style]
  )

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
  const normalizedUri = isString(uri) ? uri.toLowerCase() : undefined
  const isSvg =
    isString(normalizedUri) &&
    (normalizedUri.endsWith('.svg') || normalizedUri.includes('.svg?') || normalizedUri.includes('/svg?'))

  const resolvedLoadingSize = isNumber(loadingSize) ? loadingSize : 20
  const resolvedErrorIconSize = iconSize ?? 20
  const Container = (onPress ? Pressable : View) as any

  const renderLabel = (node: React.ReactNode, color: string, marginTop?: number) => {
    if (node == null || node === false) return null
    if (isText(node)) {
      return (
        <Text style={[styles.text, { color }, marginTop ? { marginTop } : null]}>
          {node}
        </Text>
      )
    }
    return marginTop ? <View style={{ marginTop }}>{node}</View> : node
  }

  return (
    <Container
      onPress={onPress}
      style={[
        {
          width,
          height,
          backgroundColor: tokens.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        round ? { borderRadius: 9999 } : isNumber(radius) ? { borderRadius: radius } : undefined,
        containerStyle,
        containerLayoutStyle,
      ]}
    >
      {status === 'loading' && showLoading ? (
        <View style={styles.overlay} pointerEvents="none" testID="rv-image-loading">
          {loadingIcon || (
            <ActivityIndicator
              color={tokens.colors.text}
              size={isString(loadingSize) ? loadingSize : 'small'}
              style={{ transform: [{ scale: resolvedLoadingSize / 20 }] }}
            />
          )}
          {renderLabel(loadingText, tokens.colors.text, 4)}
        </View>
      ) : null}
      {actualSource ? (
        isSvg && Platform.OS !== 'web' ? (
          <SvgUri
            width="100%"
            height="100%"
            uri={(actualSource as any).uri}
            preserveAspectRatio={resolvePreserveAspectRatio(fit)}
            accessibilityLabel={alt}
            {...rest}
            style={[StyleSheet.absoluteFill, imageStyleWithoutLayout]}
            onLoad={handleSvgLoad}
            onError={handleSvgError}
          />
        ) : (
          <RNImage
            ref={ref}
            accessibilityLabel={alt}
            {...rest}
            source={actualSource}
            style={[StyleSheet.absoluteFill, imageStyleWithoutLayout]}
            resizeMode={resolveFitMode(fit)}
            onLoad={handleLoad}
            onError={handleError}
          />
        )
      ) : null}
      {status === 'error' && showError ? (
        <View style={styles.overlay} pointerEvents="none" testID="rv-image-error">
          {errorIcon ? (
            <View
              style={{
                width: resolvedErrorIconSize,
                height: resolvedErrorIconSize,
                alignItems: 'center',
                justifyContent: 'center',
              }}
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

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
  },
})

Image.displayName = 'Image'

export default Image
