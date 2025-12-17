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
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>(actualSource ? 'loading' : 'idle')

  React.useEffect(() => {
    setStatus(actualSource ? 'loading' : 'idle')
  }, [actualSource])

  const handleLoad = (event: any) => {
    setStatus('loaded')
    onLoad?.(event)
  }

  const handleError = (event: any) => {
    setStatus('error')
    onError?.(event)
  }

  const styleBorderRadius =
    typeof flattenedImageStyle?.borderRadius === 'number' ? flattenedImageStyle.borderRadius : undefined
  const containerBorderRadius =
    typeof flattenedContainerStyle?.borderRadius === 'number' ? flattenedContainerStyle.borderRadius : undefined

  const borderRadius = round ? 9999 : radius ?? containerBorderRadius ?? styleBorderRadius ?? tokens.radius.default

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          overflow: 'hidden',
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
          style={[StyleSheet.absoluteFill, { borderRadius }, imageStyleWithoutLayout]}
          resizeMode={fitMap[fit] ?? 'cover'}
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
