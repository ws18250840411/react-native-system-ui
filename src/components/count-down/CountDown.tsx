import React, { useCallback, useEffect, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { useCountDown } from '../../hooks'
import { formatDuration, isFunction, renderTextOrNode } from '../../utils'
import { isText } from '../../utils/validate'
import { useCountDownTokens } from './tokens'
import type { CountDownInstance, CountDownProps } from './types'

const CountDownImpl = (props: CountDownProps, ref: React.ForwardedRef<CountDownInstance>) => {
  const { tokensOverride, autoStart: autoStartProp, millisecond: millisecondProp, time: timeProp, format: formatProp, children, onChange, onFinish, style, ...rest } = props
  const tokens = useCountDownTokens(tokensOverride)
  const autoStart = autoStartProp ?? tokens.defaults.autoStart
  const millisecond = millisecondProp ?? tokens.defaults.millisecond
  const time = timeProp ?? tokens.defaults.time
  const format = formatProp ?? tokens.defaults.format
  const normalizedTime = Math.max(0, Number(time) || 0)
  const { start, pause, reset, current } = useCountDown({ time: normalizedTime, millisecond, onChange, onFinish })
  const resetTimer = useCallback(() => { reset(normalizedTime); if (autoStart && normalizedTime > 0) start() }, [autoStart, normalizedTime, reset, start])
  useEffect(() => { resetTimer(); return () => { pause() } }, [autoStart, normalizedTime, pause, reset, start])
  useImperativeHandle(ref, () => ({ start, pause, reset: resetTimer }))
  const content = isFunction(children) ? children(current) : formatDuration(format, current)
  const contentNode = renderTextOrNode(content, tokens.layout.text)
  const accessibilityLabel = isText(content) ? String(content) : `${current.hours}h ${current.minutes}m ${current.seconds}s`
  return <View accessibilityRole="timer" accessibilityLiveRegion="polite" accessibilityLabel={accessibilityLabel} accessibilityValue={{ text: accessibilityLabel }} style={style} {...rest}>{contentNode}</View>
}

const CountDownForwardRef = React.forwardRef<CountDownInstance, CountDownProps>(CountDownImpl)
CountDownForwardRef.displayName = 'CountDown'
const CountDown = React.memo(CountDownForwardRef)
export default CountDown
