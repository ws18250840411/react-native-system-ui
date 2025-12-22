import React from 'react'
import { ActivityIndicator, Image as RNImage, StyleSheet, Text, View } from 'react-native'

import { useImageTokens } from './tokens'
import type { ImageProps } from './types'

const fitMap: Record<string, 'cover' | 'contain' | 'stretch' | 'center'> = {
  cover: 'cover',
  contain: 'contain',
  fill: 'stretch',
  'scale-down': 'contain',
  none: 'center',
}

const layoutStyleKeys = [
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
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'marginStart',
  'marginEnd',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'start',
  'end',
] as const

type RNImageOnLoadEvent = Parameters<
  NonNullable<React.ComponentProps<typeof RNImage>['onLoad']>
>[0]

type RNImageOnErrorEvent = Parameters<
  NonNullable<React.ComponentProps<typeof RNImage>['onError']>
>[0]

const renderOverlayLabel = (
  node: React.ReactNode,
  options: { color: string; marginTop?: number }
) => {
  if (node === undefined || node === null || node === false) return null
  if (typeof node === 'string' || typeof node === 'number') {
    return (
      <Text
        style={[
          styles.text,
          { color: options.color },
          options.marginTop ? { marginTop: options.marginTop } : null,
        ]}
      >
        {node}
      </Text>
    )
  }
  return options.marginTop ? (
    <View style={{ marginTop: options.marginTop }}>{node}</View>
  ) : (
    node
  )
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
    onLoad,
    onError,
    ...rest
  } = props

  const tokens = useImageTokens()
  const flattenedImageStyle = React.useMemo(() => StyleSheet.flatten(style) as any, [style])
  const flattenedContainerStyle = React.useMemo(
    () => StyleSheet.flatten(containerStyle) as any,
    [containerStyle],
  )
  const containerLayoutStyle = React.useMemo(() => {
    if (!flattenedImageStyle) return undefined
    const picked: Record<string, any> = {}
    for (const key of layoutStyleKeys) {
      if (flattenedImageStyle[key] !== undefined) {
        picked[key] = flattenedImageStyle[key]
      }
    }
    return Object.keys(picked).length ? picked : undefined
  }, [flattenedImageStyle])
  const imageStyleWithoutLayout = React.useMemo(() => {
    if (!flattenedImageStyle) return undefined
    const cleaned: Record<string, any> = { ...flattenedImageStyle }
    for (const key of layoutStyleKeys) {
      delete cleaned[key]
    }
    delete cleaned.borderRadius
    delete cleaned.borderTopLeftRadius
    delete cleaned.borderTopRightRadius
    delete cleaned.borderBottomLeftRadius
    delete cleaned.borderBottomRightRadius
    return Object.keys(cleaned).length ? cleaned : undefined
  }, [flattenedImageStyle])

  const actualSource = React.useMemo(() => {
    if (source) return source
    if (src) return { uri: src }
    return undefined
  }, [source, src])

  const MAX_CACHE_SIZE = 100
  const loadedSourcesRef = React.useRef<Set<string>>(new Set())
  const actualSourceRef = React.useRef(actualSource)
  React.useEffect(() => {
    actualSourceRef.current = actualSource
  }, [actualSource])

  const getSourceKey = React.useCallback((source: typeof actualSource): string | null => {
    if (!source) return null
    if (typeof source === 'object' && 'uri' in source && source.uri) {
      return source.uri
    }
    return null
  }, [])

  const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')

  React.useEffect(() => {
    if (!actualSource) {
      setStatus('idle')
      return
    }

    const key = getSourceKey(actualSource)
    if (key && loadedSourcesRef.current.has(key)) {
      setStatus('loaded')
    } else {
      setStatus('loading')
    }
  }, [actualSource, getSourceKey])

  const handleLoad = React.useCallback(
    (event: RNImageOnLoadEvent) => {
      const key = getSourceKey(actualSourceRef.current)
      if (key) {
        if (loadedSourcesRef.current.size >= MAX_CACHE_SIZE) {
          const firstKey = loadedSourcesRef.current.values().next().value
          if (firstKey) {
            loadedSourcesRef.current.delete(firstKey)
          }
        }
        loadedSourcesRef.current.add(key)
      }
      setStatus('loaded')
      onLoad?.(event)
    },
    [getSourceKey, onLoad]
  )

  const handleError = React.useCallback(
    (event: RNImageOnErrorEvent) => {
      setStatus('error')
      onError?.(event)
    },
    [onError]
  )

  const styleBorderRadius =
    typeof flattenedImageStyle?.borderRadius === 'number' ? flattenedImageStyle.borderRadius : undefined
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
          resizeMode={fitMap[fit] ?? fit}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : null}
      {status === 'loading' && showLoading ? (
        <View style={styles.overlay} pointerEvents="none" testID="rv-image-loading">
          <ActivityIndicator color={tokens.colors.text} />
          {renderOverlayLabel(loadingText, { color: tokens.colors.text, marginTop: 4 })}
        </View>
      ) : null}
      {status === 'error' && showError ? (
        <View style={styles.overlay} pointerEvents="none" testID="rv-image-error">
          {fallback !== undefined && fallback !== null && fallback !== false
            ? renderOverlayLabel(fallback, { color: tokens.colors.error })
            : renderOverlayLabel(errorText, { color: tokens.colors.error })}
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
