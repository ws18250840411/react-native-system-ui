import React from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'

import { usePullRefreshTokens } from './tokens'
import type { PullRefreshProps } from './types'

const SUCCESS_DURATION = 800

const PullRefresh = React.forwardRef<ScrollView, PullRefreshProps>((props, ref) => {
  const {
    children,
    onRefresh,
    refreshing,
    defaultRefreshing,
    pullingText = '下拉即可刷新…',
    loosingText = '释放立即刷新…',
    loadingText = '刷新中…',
    successText = '刷新成功',
    headHeight,
    disabled = false,
    style,
    ...scrollProps
  } = props

  const tokens = usePullRefreshTokens()
  const isControlled = refreshing !== undefined
  const [innerRefreshing, setInnerRefreshing] = React.useState(!!defaultRefreshing)
  const mergedRefreshing = isControlled ? !!refreshing : innerRefreshing
  const [pulling, setPulling] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const setRefreshing = React.useCallback((value: boolean) => {
    if (!isControlled) {
      setInnerRefreshing(value)
    }
  }, [isControlled])

  const triggerSuccess = React.useCallback(() => {
    if (!successText) return
    setShowSuccess(true)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setShowSuccess(false)
    }, SUCCESS_DURATION)
  }, [successText])

  const handleRefresh = React.useCallback(async () => {
    if (disabled || mergedRefreshing) return
    setShowSuccess(false)
    setRefreshing(true)
    try {
      await onRefresh?.()
      triggerSuccess()
    } finally {
      setRefreshing(false)
    }
  }, [disabled, mergedRefreshing, onRefresh, setRefreshing, triggerSuccess])

  const renderStatus = () => {
    if (mergedRefreshing) {
      return loadingText
    }
    if (showSuccess && successText) {
      return successText
    }
    if (pulling) {
      return loosingText
    }
    return pullingText
  }

  return (
    <ScrollView
      {...scrollProps}
      ref={ref}
      style={style}
      refreshControl={
        <RefreshControl
          refreshing={!!mergedRefreshing}
          onRefresh={handleRefresh}
          enabled={!disabled}
        />
      }
      onScroll={event => {
        scrollProps.onScroll?.(event)
        const offset = event.nativeEvent.contentOffset.y
        setPulling(offset < -((headHeight ?? tokens.sizing.headHeight) / 2))
      }}
      scrollEventThrottle={16}
    >
      <View
        style={{
          height: headHeight ?? tokens.sizing.headHeight,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 8,
        }}
      >
        <Text style={{ color: tokens.colors.text }}>{renderStatus()}</Text>
      </View>
      {children}
    </ScrollView>
  )
})

PullRefresh.displayName = 'PullRefresh'

export default PullRefresh
