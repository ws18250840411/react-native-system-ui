import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { isFunction, isRenderable, isText, isUndefined } from '../../utils/validate'
import { useLocale } from '../config-provider/useLocale'
import Loading from '../loading'
import type { ListProps, ListRef } from './types'
import { useListTokens } from './tokens'

const List = React.forwardRef<ListRef, ListProps>((props, ref) => {
  const locale = useLocale()

  const {
    onLoad,
    loading,
    error,
    finished: finishedProp,
    offset: offsetProp,
    immediateCheck: immediateCheckProp,
    loadingText: loadingTextProp,
    finishedText,
    errorText,
    children,
    contentContainerStyle,
    tokensOverride,
    onScroll,
    onContentSizeChange,
    onLayout,
    scrollEventThrottle: scrollEventThrottleProp,
    ...scrollProps
  } = props

  const tokens = useListTokens(tokensOverride)
  const finished = finishedProp ?? tokens.defaults.finished
  const offset = offsetProp ?? tokens.defaults.offset
  const immediateCheck = immediateCheckProp ?? tokens.defaults.immediateCheck

  const loadingText = isUndefined(loadingTextProp) ? locale.loading : loadingTextProp

  const loadingControlled = !isUndefined(loading)
  const errorControlled = !isUndefined(error)
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
    if (!containerHeightRef.current) return
    if (contentHeightRef.current <= containerHeightRef.current && !finished) {
      triggerLoad(false)
    }
  }

  const checkRef = React.useRef(check)
  checkRef.current = check

  React.useImperativeHandle(ref, () => ({ check }), [check])

  const handleScroll = (event: any) => {
    onScroll?.(event)
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const distance = contentSize.height - (layoutMeasurement.height + contentOffset.y)
    if (distance <= offset) triggerLoad(false)
  }

  const handleContentSizeChange = (width: number, height: number) => {
    onContentSizeChange?.(width, height)
    contentHeightRef.current = height
    if (immediateCheck) check()
  }

  const handleLayout = (event: any) => {
    onLayout?.(event)
    containerHeightRef.current = event.nativeEvent.layout.height
    if (immediateCheck) check()
  }

  const retry = () => triggerLoad(true)

  React.useEffect(() => {
    if (!immediateCheck) return
    const timer = setTimeout(() => {
      checkRef.current()
    }, 0)
    return () => clearTimeout(timer)
  }, [immediateCheck])

  return (
    <ScrollView
      {...scrollProps}
      onScroll={handleScroll}
      scrollEventThrottle={scrollEventThrottleProp ?? tokens.defaults.scrollEventThrottle}
      contentContainerStyle={contentContainerStyle}
      onContentSizeChange={handleContentSizeChange}
      onLayout={handleLayout}
    >
      {children}
      <View
        style={[tokens.layout.footer, { paddingVertical: tokens.spacing.footerPaddingVertical }]}
        testID="rv-list-footer"
      >
        {mergedLoading ? (
          isText(loadingText)
            ? (
              <Loading size={tokens.sizing.loadingIndicator} testID="rv-list-loading">
                {loadingText}
              </Loading>
            )
            : (
              <View
                style={tokens.layout.loadingInline}
                testID="rv-list-loading"
              >
                <Loading size={tokens.sizing.loadingIndicator} />
                {loadingText ? <View style={{ marginLeft: tokens.spacing.inlineGap }}>{loadingText}</View> : null}
              </View>
            )
        ) : null}
        {mergedError ? (
          isFunction(errorText) ? (
            errorText(retry)
          ) : isRenderable(errorText) ? (
            isText(errorText) ? (
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
        {finished && !mergedLoading && !mergedError && isRenderable(finishedText) ? (
          isText(finishedText) ? (
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
