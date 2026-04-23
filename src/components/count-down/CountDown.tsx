import React, { useCallback, useEffect, useImperativeHandle } from 'react'
import { View } from 'react-native'
import useCountDown from '../../hooks/useCountDown'
import { formatDuration } from '../../utils/date'
import { renderTextOrNode } from '../../utils/render'
import { isText } from '../../utils/base'
import { useCountDownTokens } from './tokens'
import type { CountDownInstance, CountDownProps } from './types'

const CountDownImpl = (props: CountDownProps, ref: React.ForwardedRef<CountDownInstance>) => {
  const { tokensOverride, autoStart: autoStartP, millisecond: msP, time: timeP, format: fmtP, children, onChange, onFinish, style, ...rest } = props; const tokens = useCountDownTokens(tokensOverride); const autoStart = autoStartP ?? tokens.defaults.autoStart; const millisecond = msP ?? tokens.defaults.millisecond; const time = timeP ?? tokens.defaults.time; const format = fmtP ?? tokens.defaults.format; const normTime = Math.max(0, Number(time) || 0); const { start, pause, reset, current } = useCountDown({ time: normTime, millisecond, onChange, onFinish }); const resetTimer = useCallback(() => { reset(normTime); if (autoStart && normTime > 0) start() }, [autoStart, normTime, reset, start]); useEffect(() => { resetTimer(); return pause }, [pause, resetTimer]); useImperativeHandle(ref, () => ({ start, pause, reset: resetTimer })); const content = typeof children === 'function' ? children(current) : formatDuration(format, current); const contentNode = renderTextOrNode(content, tokens.layout.text); const accLabel = isText(content) ? String(content) : `${current.hours}h ${current.minutes}m ${current.seconds}s`; return <View accessibilityRole="timer" accessibilityLiveRegion="polite" accessibilityLabel={accLabel} accessibilityValue={{ text: accLabel }} style={style} {...rest}>{contentNode}</View>
}

const CountDownForwardRef = React.forwardRef<CountDownInstance, CountDownProps>(CountDownImpl)
CountDownForwardRef.displayName = 'CountDown'
const CountDown = React.memo(CountDownForwardRef)
export default CountDown
