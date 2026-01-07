import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { useLocale } from '../config-provider/useLocale'
import Loading from '../loading'
import type { ListProps, ListRef, ListTokens } from './types'

const isRenderableNode = (node: React.ReactNode) => node != null && node !== false

const createListTokens = (foundations: Foundations): ListTokens => {
  return {
    colors: {
      errorText: '#ff5b05',
      finishedText: '#999999',
    },
    spacing: {
      footerPaddingVertical: foundations.spacing.lg,
      inlineGap: foundations.spacing.sm,
    },
  }
}

const useListTokens = createComponentTokensHook('list', createListTokens)

const List = React.forwardRef<ListRef, ListProps>((props, ref) => {
  const locale = useLocale()
  const tokens = useListTokens(props.tokensOverride)

  const {
    onLoad,
    loading,
    error,
    finished = false,
    offset = 300,
    immediateCheck = true,
    loadingText: loadingTextProp,
    finishedText,
    errorText,
    children,
    contentContainerStyle,
    ...scrollProps
  } = props

  const loadingText = loadingTextProp === undefined ? locale.loading : loadingTextProp

  const loadingControlled = typeof loading !== 'undefined'
  const errorControlled = typeof error !== 'undefined'
  const [innerLoading, setInnerLoading] = React.useState(false)
  const [innerError, setInnerError] = React.useState(false)
  const mergedLoading = loadingControlled ? !!loading : innerLoading
  const mergedError = errorControlled ? !!error : innerError

  const loadingRef = React.useRef(false)
  const containerHeightRef = React.useRef(0)
  const contentHeightRef = React.useRef(0)

  const triggerLoad = async (isRetry: boolean) => {
    if (!onLoad || finished) return
    if (loadingRef.current || mergedLoading) return
    if (mergedError && !isRetry) return

    loadingRef.current = true
    if (!loadingControlled) setInnerLoading(true)
    if (!errorControlled) setInnerError(false)
    try {
      await Promise.resolve(onLoad(isRetry))
    } catch {
      if (!errorControlled) setInnerError(true)
    } finally {
      loadingRef.current = false
      if (!loadingControlled) setInnerLoading(false)
    }
  }

  const check = () => {
    if (mergedLoading || mergedError) return
    if (contentHeightRef.current <= containerHeightRef.current && !finished) {
      triggerLoad(false)
    }
  }

  React.useImperativeHandle(ref, () => ({ check }))

  const handleScroll = (event: any) => {
    props.onScroll?.(event)
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const distance = contentSize.height - (layoutMeasurement.height + contentOffset.y)
    if (distance <= offset) triggerLoad(false)
  }

  const handleContentSizeChange = (width: number, height: number) => {
    props.onContentSizeChange?.(width, height)
    contentHeightRef.current = height
    if (immediateCheck) check()
  }

  const handleLayout = (event: any) => {
    props.onLayout?.(event)
    containerHeightRef.current = event.nativeEvent.layout.height
    if (immediateCheck) check()
  }

  const retry = () => triggerLoad(true)

  React.useEffect(() => {
    if (!immediateCheck) return
    const timer = setTimeout(() => {
      check()
    }, 0)
    return () => clearTimeout(timer)
  }, [check, immediateCheck])

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
      <View
        style={{ paddingVertical: tokens.spacing.footerPaddingVertical, alignItems: 'center' }}
        testID="rv-list-footer"
      >
        {mergedLoading ? (
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
                {loadingText ? <View style={{ marginLeft: tokens.spacing.inlineGap }}>{loadingText}</View> : null}
              </View>
            )
        ) : null}
        {mergedError ? (
          typeof errorText === 'function' ? (
            errorText(retry)
          ) : isRenderableNode(errorText) ? (
            typeof errorText === 'string' || typeof errorText === 'number' ? (
              <Text
                testID="rv-list-error"
                onPress={retry}
                style={{ color: tokens.colors.errorText }}
              >
                {errorText}
              </Text>
            ) : (
              <Pressable testID="rv-list-error" onPress={retry}>
                {errorText}
              </Pressable>
            )
          ) : null
        ) : null}
        {finished && !mergedLoading && !mergedError && isRenderableNode(finishedText) ? (
          typeof finishedText === 'string' || typeof finishedText === 'number' ? (
            <Text testID="rv-list-finished" style={{ color: tokens.colors.finishedText }}>
              {finishedText}
            </Text>
          ) : (
            <View testID="rv-list-finished">
              {finishedText}
            </View>
          )
        ) : null}
      </View>
    </ScrollView>
  )
})

List.displayName = 'List'

export default List
