import React from 'react'
import { ActivityIndicator, Image as RNImage, StyleSheet, Text, View } from 'react-native'

import { useImageTokens } from './tokens'
import type { ImageProps } from './types'

type FitMode = 'cover' | 'contain' | 'stretch' | 'center'
const resolveFitMode = (fit: string): FitMode => {
  if (fit === 'fill') return 'stretch'
  if (fit === 'scale-down') return 'contain'
  if (fit === 'none') return 'center'
  return (fit as FitMode) ?? 'cover'
}

type RNImageOnLoadEvent = Parameters<
  NonNullable<React.ComponentProps<typeof RNImage>['onLoad']>
>[0]

type RNImageOnErrorEvent = Parameters<
  NonNullable<React.ComponentProps<typeof RNImage>['onError']>
>[0]

const isLayoutStyleKey = (key: string) =>
  key === 'width' ||
  key === 'height' ||
  key === 'minWidth' ||
  key === 'minHeight' ||
  key === 'maxWidth' ||
  key === 'maxHeight' ||
  key === 'flex' ||
  key === 'flexGrow' ||
  key === 'flexShrink' ||
  key === 'flexBasis' ||
  key === 'alignSelf' ||
  key === 'aspectRatio' ||
  key === 'position' ||
  key === 'top' ||
  key === 'right' ||
  key === 'bottom' ||
  key === 'left' ||
  key === 'start' ||
  key === 'end' ||
  key.startsWith('margin')

const splitImageStyle = (style: any) => {
  if (!style) return { container: undefined, image: undefined, borderRadius: undefined as number | undefined }
  const container: Record<string, any> = {}
  const image: Record<string, any> = {}
  let borderRadius: number | undefined

  Object.keys(style).forEach(key => {
    const value = style[key]
    if (value === undefined) return

    if (key === 'borderRadius' && typeof value === 'number') {
      borderRadius = value
      return
    }
    if (key.startsWith('border') && key.endsWith('Radius')) return

    if (isLayoutStyleKey(key)) {
      container[key] = value
    } else {
      image[key] = value
    }
  })

  return {
    container: Object.keys(container).length ? container : undefined,
    image: Object.keys(image).length ? image : undefined,
    borderRadius,
  }
}

const renderOverlayLabel = (node: React.ReactNode, color: string, marginTop?: number) => {
  if (node == null || node === false) return null
  if (typeof node === 'string' || typeof node === 'number') {
    return <Text style={[styles.text, { color }, marginTop ? { marginTop } : null]}>{node}</Text>
  }
  return marginTop ? <View style={{ marginTop }}>{node}</View> : node
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
    errorText = '加载失败',
    fallback,
    containerStyle,
    style,
    children,
    tokensOverride,
    onLoad,
    onError,
    ...rest
  } = props

  const tokens = useImageTokens(tokensOverride)
  const flattenedImageStyle = React.useMemo(() => StyleSheet.flatten(style) as any, [style])
  const flattenedContainerStyle = React.useMemo(() => StyleSheet.flatten(containerStyle) as any, [containerStyle])
  const { container: containerLayoutStyle, image: imageStyleWithoutLayout, borderRadius: styleBorderRadius } =
    React.useMemo(() => splitImageStyle(flattenedImageStyle), [flattenedImageStyle])

  const actualSource = React.useMemo(() => {
    if (source) return source
    if (src) return { uri: src }
    return undefined
  }, [source, src])

  const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>(() => (actualSource ? 'loading' : 'idle'))
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

  const containerBorderRadius =
    typeof flattenedContainerStyle?.borderRadius === 'number' ? flattenedContainerStyle.borderRadius : undefined

  const borderRadius = round ? 9999 : radius ?? containerBorderRadius ?? styleBorderRadius ?? undefined

  return (
    <View
      style={[
        {
          width,
          height,
          ...(borderRadius !== undefined ? { borderRadius, overflow: 'hidden' as const } : {}),
          backgroundColor: tokens.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        },
        containerLayoutStyle,
        containerStyle,
      ]}
    >
      {actualSource ? (
        <RNImage
          ref={ref}
          {...rest}
          source={actualSource}
          style={[
            StyleSheet.absoluteFill,
            ...(borderRadius !== undefined ? [{ borderRadius }] : []),
            imageStyleWithoutLayout,
          ]}
          resizeMode={resolveFitMode(fit)}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : null}
      {status === 'loading' && showLoading ? (
        <View style={styles.overlay} pointerEvents="none" testID="rv-image-loading">
          <ActivityIndicator color={tokens.colors.text} />
          {renderOverlayLabel(loadingText, tokens.colors.text, 4)}
        </View>
      ) : null}
      {status === 'error' && showError ? (
        <View style={styles.overlay} pointerEvents="none" testID="rv-image-error">
          {fallback !== undefined && fallback !== null && fallback !== false
            ? renderOverlayLabel(fallback, tokens.colors.error)
            : renderOverlayLabel(errorText, tokens.colors.error)}
        </View>
      ) : null}
      {children}
    </View>
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
