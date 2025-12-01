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

const Image = React.forwardRef<RNImage, ImageProps>((props, ref) => {
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

  const borderRadius = round
    ? (width ?? height ?? tokens.radius.default) / 2
    : radius ?? tokens.radius.default

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
        containerStyle,
      ]}
    >
      {actualSource ? (
        <RNImage
          ref={ref}
          {...rest}
          source={actualSource}
          style={[StyleSheet.absoluteFill, style]}
          resizeMode={fitMap[fit] ?? 'cover'}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : null}
      {children}
      {status === 'loading' && showLoading ? (
        <View style={styles.overlay} pointerEvents="none" testID="rv-image-loading">
          <ActivityIndicator />
          {loadingText ? <Text style={[styles.text, { color: tokens.colors.text }]}>{loadingText}</Text> : null}
        </View>
      ) : null}
      {status === 'error' && showError ? (
        <View style={styles.overlay} pointerEvents="none" testID="rv-image-error">
          {fallback ?? <Text style={[styles.text, { color: tokens.colors.error }]}>{errorText}</Text>}
        </View>
      ) : null}
    </View>
  )
})

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  text: {
    fontSize: 12,
  },
})

Image.displayName = 'Image'

export default Image
