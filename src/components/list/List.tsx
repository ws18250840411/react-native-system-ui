import React from 'react'
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { useLocale } from '../config-provider/useLocale'
import Loading from '../loading'
import type { ListProps, ListRef } from './types'

const isRenderableNode = (node: React.ReactNode) => node !== null && node !== undefined && node !== false

interface ListTokens {
  colors: {
    errorText: string
    finishedText: string
  }
  spacing: {
    footerPaddingVertical: number
    inlineGap: number
  }
}

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

const useListTokens = (overrides?: DeepPartial<ListTokens>): ListTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createListTokens(foundations)
    const componentOverrides = components?.list as DeepPartial<ListTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

const List = React.forwardRef<ListRef, ListProps>((props, ref) => {
  const locale = useLocale()
  const tokens = useListTokens()

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

  const loadingText = typeof loadingTextProp === 'undefined' ? locale.loading : loadingTextProp

  const loadingControlled = typeof loading !== 'undefined'
  const errorControlled = typeof error !== 'undefined'
  const [innerLoading, setInnerLoading] = React.useState(false)
  const [innerError, setInnerError] = React.useState(false)
  const mergedLoading = loadingControlled ? !!loading : innerLoading
  const mergedError = errorControlled ? !!error : innerError

  const loadingRef = React.useRef(false)
  const containerHeightRef = React.useRef(0)
  const contentHeightRef = React.useRef(0)

  const triggerLoad = React.useCallback(
    async (isRetry: boolean) => {
      if (!onLoad || finished) return
      if (loadingRef.current) return
      if (mergedLoading) return
      if (mergedError && !isRetry) return

      loadingRef.current = true
      if (!loadingControlled) setInnerLoading(true)
      if (!errorControlled) setInnerError(false)
      try {
        await Promise.resolve(onLoad(isRetry))
      } catch (error) {
        if (!errorControlled) setInnerError(true)
      } finally {
        loadingRef.current = false
        if (!loadingControlled) setInnerLoading(false)
      }
    },
    [errorControlled, finished, loadingControlled, mergedError, mergedLoading, onLoad]
  )

  const check = React.useCallback(() => {
    if (mergedLoading || mergedError) return
    if (contentHeightRef.current <= containerHeightRef.current && !finished) {
      triggerLoad(false)
    }
  }, [finished, mergedError, mergedLoading, triggerLoad])

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
      if (immediateCheck) {
        check()
      }
    },
    [check, immediateCheck, props]
  )

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      props.onLayout?.(event)
      containerHeightRef.current = event.nativeEvent.layout.height
      if (immediateCheck) {
        check()
      }
    },
    [check, immediateCheck, props]
  )

  const retry = React.useCallback(() => {
    triggerLoad(true)
  }, [triggerLoad])

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
