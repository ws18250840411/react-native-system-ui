import React, { useCallback, useEffect, useImperativeHandle } from 'react'
import { Text, View } from 'react-native'

import { useCountDown } from '../../hooks'
import { formatDuration, isFunction, isText } from '../../utils'
import { useCountDownTokens } from './tokens'
import type { CountDownInstance, CountDownProps } from './types'

const CountDownImpl = (props: CountDownProps, ref: React.ForwardedRef<CountDownInstance>) => {
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

  const normalizedTime = Math.max(0, Number(time) || 0)

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
  const content = isFunction(children) ? children(current) : formatDuration(format, current)
  const contentNode = isText(content) ? <Text style={defaultTextStyle}>{content}</Text> : content

  return (
    <View style={style} {...rest}>
      {contentNode}
    </View>
  )
}

const CountDownForwardRef = React.forwardRef<CountDownInstance, CountDownProps>(CountDownImpl)
CountDownForwardRef.displayName = 'CountDown'
const CountDown = React.memo(CountDownForwardRef)

export default CountDown
