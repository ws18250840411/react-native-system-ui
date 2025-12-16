import React from 'react'
import { Text, View } from 'react-native'

import { useCountDown } from '../../hooks'
import type { CountDownInstance, CountDownProps } from './types'
import { parseFormat } from './utils'
import { useCountDownTokens } from './tokens'

const getTimeValue = (time?: number | string) => {
  if (typeof time === 'number') return time
  if (typeof time === 'string') {
    const parsed = Number(time)
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

const CountDown = React.forwardRef<CountDownInstance, CountDownProps>((props, ref) => {
  const {
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

  const tokens = useCountDownTokens()

  const normalizedTime = React.useMemo(() => Math.max(0, getTimeValue(time)), [time])

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
  }, [normalizedTime])

  React.useImperativeHandle(ref, () => ({
    start,
    pause,
    reset: resetTime,
  }), [pause, resetTime, start])

  const defaultTextStyle = React.useMemo(() => ({
    color: tokens.text.color,
    fontSize: tokens.text.fontSize,
    lineHeight: tokens.text.lineHeight,
    fontFamily: tokens.text.fontFamily,
    fontWeight: tokens.text.fontWeight,
  }), [tokens.text.color, tokens.text.fontFamily, tokens.text.fontSize, tokens.text.fontWeight, tokens.text.lineHeight])

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
