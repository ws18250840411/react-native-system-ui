import React from 'react'
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'

import { useLocale } from '../config-provider/useLocale'
import Loading from '../loading'
import type { ListProps, ListRef } from './types'

const List = React.forwardRef<ListRef, ListProps>((props, ref) => {
  const locale = useLocale()

  const {
    onLoad,
    finished = false,
    offset = 300,
    loadingText: loadingTextProp,
    finishedText,
    errorText,
    children,
    contentContainerStyle,
    ...scrollProps
  } = props

  const loadingText = typeof loadingTextProp === 'undefined' ? locale.loading : loadingTextProp

  const [status, setStatus] = React.useState<'idle' | 'loading' | 'error'>('idle')
  const loadingRef = React.useRef(false)
  const containerHeightRef = React.useRef(0)
  const contentHeightRef = React.useRef(0)

  const triggerLoad = React.useCallback(
    async (isRetry: boolean) => {
      if (!onLoad || finished) return
      if (loadingRef.current) return
      if (status === 'error' && !isRetry) return

      loadingRef.current = true
      setStatus('loading')
      try {
        await Promise.resolve(onLoad(isRetry))
        setStatus('idle')
      } catch (error) {
        setStatus('error')
      } finally {
        loadingRef.current = false
      }
    },
    [finished, onLoad, status]
  )

  const check = React.useCallback(() => {
    if (status !== 'idle') return
    if (contentHeightRef.current <= containerHeightRef.current && !finished) {
      triggerLoad(false)
    }
  }, [finished, status, triggerLoad])

  React.useImperativeHandle(ref, () => ({ check }), [check])

  const handleScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      props.onScroll?.(event)
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
      const distance = contentSize.height - (layoutMeasurement.height + contentOffset.y)
      if (distance <= offset) {
        triggerLoad(false)
      }
    },
    [offset, props, triggerLoad]
  )

  const handleContentSizeChange = React.useCallback(
    (width: number, height: number) => {
      props.onContentSizeChange?.(width, height)
      contentHeightRef.current = height
      check()
    },
    [check, props]
  )

  const handleLayout = React.useCallback(
    (event: any) => {
      props.onLayout?.(event)
      containerHeightRef.current = event.nativeEvent.layout.height
      check()
    },
    [check, props]
  )

  const retry = React.useCallback(() => {
    triggerLoad(true)
  }, [triggerLoad])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      check()
    }, 0)
    return () => clearTimeout(timer)
  }, [check])

  return (
    <ScrollView
      {...scrollProps}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={contentContainerStyle}
      onContentSizeChange={handleContentSizeChange}
      onLayout={handleLayout}
    >
      {children}
      <View style={{ paddingVertical: 16, alignItems: 'center' }} testID="rv-list-footer">
        {status === 'loading' ? (
          typeof loadingText === 'string' || typeof loadingText === 'number'
            ? (
              <Loading size={16} testID="rv-list-loading">
                {loadingText}
              </Loading>
            )
            : (
              <View
                style={{ flexDirection: 'row', alignItems: 'center' }}
                testID="rv-list-loading"
              >
                <Loading size={16} />
                {loadingText ? <View style={{ marginLeft: 8 }}>{loadingText}</View> : null}
              </View>
            )
        ) : null}
        {status === 'error'
          ? typeof errorText === 'function'
            ? errorText(retry)
            : errorText
              ? typeof errorText === 'string' || typeof errorText === 'number'
                ? (
                  <Text testID="rv-list-error" onPress={retry} style={{ color: '#ff5b05' }}>
                    {errorText}
                  </Text>
                )
                : (
                  <Pressable testID="rv-list-error" onPress={retry}>
                    {errorText}
                  </Pressable>
                )
              : null
          : null}
        {finished && status === 'idle' && finishedText
          ? typeof finishedText === 'string' || typeof finishedText === 'number'
            ? (
              <Text testID="rv-list-finished" style={{ color: '#999999' }}>
                {finishedText}
              </Text>
            )
            : (
              <View testID="rv-list-finished">
                {finishedText}
              </View>
            )
          : null}
      </View>
    </ScrollView>
  )
})

List.displayName = 'List'

export default List
