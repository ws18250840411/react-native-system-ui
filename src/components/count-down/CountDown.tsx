import React from 'react'
import { Text, View, type TextStyle } from 'react-native'

import { useCountDown } from '../../hooks'
import type { CountDownInstance, CountDownProps } from './types'
import { parseFormat } from './utils'
import { useCountDownTokens } from './tokens'

const CountDown = React.forwardRef<CountDownInstance, CountDownProps>((props, ref) => {
  const tokens = useCountDownTokens(props.tokensOverride)
  const {
    tokensOverride: _tokensOverride,
    autoStart = true,
    millisecond = false,
    time = 0,
    format = 'HH:mm:ss',
    children,
    onChange,
    onFinish,
    style,
    ...rest
  } = props

  const normalizedTime = React.useMemo(() => {
    const parsed = typeof time === 'number' ? time : typeof time === 'string' ? Number(time) : 0
    return Math.max(0, Number.isFinite(parsed) ? parsed : 0)
  }, [time])

  const { start, pause, reset, current } = useCountDown({
    time: normalizedTime,
    millisecond,
    onChange,
    onFinish,
  })

  const resetTime = React.useCallback(() => {
    reset(normalizedTime)
    if (autoStart && normalizedTime > 0) {
      start()
    }
  }, [autoStart, normalizedTime, reset, start])

  React.useEffect(() => {
    resetTime()
    return () => {
      pause()
    }
  }, [pause, resetTime])

  React.useImperativeHandle(ref, () => ({
    start,
    pause,
    reset: resetTime,
  }), [pause, resetTime, start])

  const defaultTextStyle: TextStyle = {
    ...tokens.text,
    fontWeight: tokens.text.fontWeight as TextStyle['fontWeight'],
  }

  const content = React.useMemo(() => {
    if (typeof children === 'function') {
      const rendered = children(current)
      if (typeof rendered === 'string' || typeof rendered === 'number') {
        return <Text style={defaultTextStyle}>{rendered}</Text>
      }
      return rendered
    }
    return <Text style={defaultTextStyle}>{parseFormat(format, current)}</Text>
  }, [children, current, defaultTextStyle, format])

  return (
    <View style={style} {...rest}>
      {content}
    </View>
  )
})

CountDown.displayName = 'CountDown'

export default CountDown
