import { useCallback, useEffect, useRef, useState } from 'react'

import { isNumber } from '../utils/validate'

export interface CountDownCurrentTime {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export interface UseCountDownOptions {
  time: number
  millisecond?: boolean
  onChange?: (current: CountDownCurrentTime) => void
  onFinish?: () => void
}

const parseTime = (time: number): CountDownCurrentTime => {
  const total = Math.max(time, 0)
  const days = Math.floor(total / (24 * 60 * 60 * 1000))
  const hours = Math.floor((total % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const minutes = Math.floor((total % (60 * 60 * 1000)) / (60 * 1000))
  const seconds = Math.floor((total % (60 * 1000)) / 1000)
  const milliseconds = total % 1000
  return { total, days, hours, minutes, seconds, milliseconds }
}

const useCountDown = (options: UseCountDownOptions) => {
  const { time, millisecond = false, onChange, onFinish } = options
  const timeRef = useRef(time)
  const millisecondRef = useRef(millisecond)
  const onChangeRef = useRef(onChange)
  const onFinishRef = useRef(onFinish)

  timeRef.current = time
  millisecondRef.current = millisecond
  onChangeRef.current = onChange
  onFinishRef.current = onFinish

  const remainRef = useRef(Math.max(0, time))
  const endTimeRef = useRef(Date.now() + remainRef.current)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countingRef = useRef(false)
  const [current, setCurrent] = useState(() => parseTime(remainRef.current))

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const update = useCallback((remain: number) => {
    remainRef.current = remain
    const next = parseTime(remain)
    setCurrent(next)
    onChangeRef.current?.(next)
    if (remain === 0) {
      countingRef.current = false
      clearTimer()
      onFinishRef.current?.()
    }
  }, [clearTimer])

  const tick = useCallback(() => {
    if (!countingRef.current) return
    clearTimer()
    const remain = Math.max(endTimeRef.current - Date.now(), 0)
    update(remain)
    if (remain <= 0) return

    const delay = millisecondRef.current
      ? Math.max(1, Math.min(30, remain))
      : Math.max(1, Math.min(remain, (remain % 1000) + 1))

    timerRef.current = setTimeout(() => {
      tick()
    }, delay)
  }, [clearTimer, update])

  const start = useCallback(() => {
    if (countingRef.current || remainRef.current <= 0) return
    countingRef.current = true
    endTimeRef.current = Date.now() + remainRef.current
    tick()
  }, [tick])

  const pause = useCallback(() => {
    if (!countingRef.current) return
    countingRef.current = false
    remainRef.current = Math.max(endTimeRef.current - Date.now(), 0)
    clearTimer()
  }, [clearTimer])

  const reset = useCallback((newTime?: number) => {
    pause()
    const next = Math.max(0, isNumber(newTime) ? newTime : timeRef.current)
    remainRef.current = next
    endTimeRef.current = Date.now() + next
    setCurrent(parseTime(next))
  }, [pause])

  useEffect(() => () => clearTimer(), [clearTimer])

  return { start, pause, reset, current }
}

export { parseTime }
export default useCountDown
