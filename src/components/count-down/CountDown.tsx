import React from 'react'
import { Text, View } from 'react-native'

import { useCountDown } from '../../hooks'
import { formatDuration } from '../../utils/date'
import { isFunction, isText } from '../../utils/validate'
import { useCountDownTokens } from './tokens'
import type { CountDownInstance, CountDownProps } from './types'

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

  const normalizedTime = Math.max(0, Number(time) || 0)

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

  const defaultTextStyle = tokens.text
  const content = isFunction(children) ? children(current) : formatDuration(format, current)
  const contentNode = isText(content) ? (<Text style={defaultTextStyle}>{content}</Text>) : (content)

  return (
    <View style={style} {...rest}>
      {contentNode}
    </View>
  )
})

CountDown.displayName = 'CountDown'

export default CountDown
