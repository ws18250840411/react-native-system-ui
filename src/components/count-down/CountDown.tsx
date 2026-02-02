import React, { useCallback, useEffect, useImperativeHandle, useMemo } from 'react'
import { Text, View } from 'react-native'

import { useCountDown } from '../../hooks'
import { formatDuration, isFunction, isText } from '../../utils'
import { useCountDownTokens } from './tokens'
import type { CountDownInstance, CountDownProps } from './types'

const CountDown = React.forwardRef<CountDownInstance, CountDownProps>((props, ref) => {
  const {
    tokensOverride,
    autoStart: autoStartProp,
    millisecond: millisecondProp,
    time: timeProp,
    format: formatProp,
    children,
    onChange,
    onFinish,
    style,
    ...rest
  } = props

  const tokens = useCountDownTokens(tokensOverride)
  const autoStart = autoStartProp ?? tokens.defaults.autoStart
  const millisecond = millisecondProp ?? tokens.defaults.millisecond
  const time = timeProp ?? tokens.defaults.time
  const format = formatProp ?? tokens.defaults.format

  const normalizedTime = useMemo(() => Math.max(0, Number(time) || 0), [time])

  const { start, pause, reset, current } = useCountDown({
    time: normalizedTime,
    millisecond,
    onChange,
    onFinish,
  })

  const resetTime = useCallback(() => {
    reset(normalizedTime)
    if (autoStart && normalizedTime > 0) {
      start()
    }
  }, [autoStart, normalizedTime, reset, start])

  useEffect(() => {
    resetTime()
    return () => {
      pause()
    }
  }, [autoStart, normalizedTime, pause, reset, start])

  useImperativeHandle(ref, () => ({ start, pause, reset: resetTime }))

  const defaultTextStyle = tokens.layout.text
  const content = useMemo(
    () => (isFunction(children) ? children(current) : formatDuration(format, current)),
    [children, current, format]
  )
  const contentNode = useMemo(
    () => (isText(content) ? (<Text style={defaultTextStyle}>{content}</Text>) : (content)),
    [content, defaultTextStyle]
  )

  return (
    <View style={style} {...rest}>
      {contentNode}
    </View>
  )
})

CountDown.displayName = 'CountDown'

export default CountDown
