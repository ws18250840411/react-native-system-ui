import React from 'react'
import { ActivityIndicator, ScrollView, Text, View, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native'

import type { ListProps, ListRef } from './types'

const List = React.forwardRef<ListRef, ListProps>((props, ref) => {
  const {
    onLoad,
    finished = false,
    offset = 120,
    loadingText = '加载中…',
    finishedText,
    errorText = '加载失败，点击重试',
    children,
    contentContainerStyle,
    ...scrollProps
  } = props

  const [status, setStatus] = React.useState<'idle' | 'loading' | 'error'>('idle')
  const containerHeightRef = React.useRef(0)
  const contentHeightRef = React.useRef(0)

  const triggerLoad = React.useCallback(
    async (isRetry: boolean) => {
      if (!onLoad || finished || status === 'loading') return
      setStatus('loading')
      try {
        await onLoad(isRetry)
        setStatus('idle')
      } catch (error) {
        setStatus('error')
      }
    },
    [finished, onLoad, status]
  )

  const check = React.useCallback(() => {
    if (contentHeightRef.current <= containerHeightRef.current && !finished) {
      triggerLoad(false)
    }
  }, [finished, triggerLoad])

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
      <View style={{ paddingVertical: 16, alignItems: 'center' }}>
        {status === 'loading' ? (
          <>
            <ActivityIndicator />
            {loadingText ? <Text style={{ marginTop: 4 }}>{loadingText}</Text> : null}
          </>
        ) : null}
        {status === 'error'
          ? typeof errorText === 'function'
            ? errorText(retry)
            : (
              <Text onPress={retry} style={{ color: '#ff5b05' }}>
                {errorText}
              </Text>
            )
          : null}
        {finished && status === 'idle' && finishedText ? (
          <Text style={{ color: '#999999' }}>{finishedText}</Text>
        ) : null}
      </View>
    </ScrollView>
  )
})

List.displayName = 'List'

export default List
