import React from 'react'
import { Text, View } from 'react-native'

import { useCountDown } from '../../hooks'
import type { CountDownInstance, CountDownProps } from './types'
import { parseFormat } from './utils'

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

  const normalizedTime = React.useMemo(() => Math.max(0, getTimeValue(time)), [time])

  const { start, pause, reset, current } = useCountDown({
    time: normalizedTime,
    millisecond,
    onChange,
    onFinish,
  })

  const resetAndMaybeStart = React.useCallback(() => {
    reset(normalizedTime)
    if (autoStart && normalizedTime > 0) {
      start()
    }
  }, [autoStart, normalizedTime, reset, start])

  React.useEffect(() => {
    resetAndMaybeStart()
    return () => {
      pause()
    }
  }, [pause, resetAndMaybeStart])

  React.useImperativeHandle(ref, () => ({
    start,
    pause,
    reset: resetAndMaybeStart,
  }), [pause, resetAndMaybeStart, start])

  const content = React.useMemo(() => {
    if (typeof children === 'function') {
      return children(current)
    }
    return <Text>{parseFormat(format, current)}</Text>
  }, [children, current, format])

  return (
    <View style={style} {...rest}>
      {content}
    </View>
  )
})

CountDown.displayName = 'CountDown'

export default CountDown
