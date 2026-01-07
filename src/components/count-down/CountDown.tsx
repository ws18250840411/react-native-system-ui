import React from 'react'
import { Text, View } from 'react-native'

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

  const parsed = typeof time === 'number' ? time : typeof time === 'string' ? Number(time) : 0
  const normalizedTime = Math.max(0, Number.isFinite(parsed) ? parsed : 0)

  const { start, pause, reset, current } = useCountDown({
    time: normalizedTime,
    millisecond,
    onChange,
    onFinish,
  })

  const resetTime = () => {
    reset(normalizedTime)
    if (autoStart && normalizedTime > 0) {
      start()
    }
  }

  React.useEffect(() => {
    resetTime()
    return () => {
      pause()
    }
  }, [autoStart, normalizedTime, pause, reset, start])

  React.useImperativeHandle(ref, () => ({ start, pause, reset: resetTime }))

  const defaultTextStyle: any = tokens.text
  const content =
    typeof children === 'function'
      ? (() => {
        const rendered = children(current)
        return typeof rendered === 'string' || typeof rendered === 'number' ? (
          <Text style={defaultTextStyle}>{rendered}</Text>
        ) : (
          rendered
        )
      })()
      : <Text style={defaultTextStyle}>{parseFormat(format, current)}</Text>

  return (
    <View style={style} {...rest}>
      {content}
    </View>
  )
})

CountDown.displayName = 'CountDown'

export default CountDown
