import React from 'react'

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
  const remainRef = React.useRef(Math.max(0, time))
  const endTimeRef = React.useRef(Date.now() + remainRef.current)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const countingRef = React.useRef(false)
  const [current, setCurrent] = React.useState(() => parseTime(remainRef.current))

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const update = React.useCallback((remain: number) => {
    remainRef.current = remain
    const next = parseTime(remain)
    setCurrent(next)
    onChange?.(next)
    if (remain === 0) {
      countingRef.current = false
      clearTimer()
      onFinish?.()
    }
  }, [clearTimer, onChange, onFinish])

  const tick = React.useCallback(() => {
    if (!countingRef.current) return
    clearTimer()
    const interval = millisecond ? 30 : 1000
    timerRef.current = setTimeout(() => {
      const remain = Math.max(endTimeRef.current - Date.now(), 0)
      update(remain)
      if (remain > 0) {
        tick()
      }
    }, interval)
  }, [clearTimer, millisecond, update])

  const start = React.useCallback(() => {
    if (countingRef.current || remainRef.current <= 0) {
      if (remainRef.current <= 0) {
        update(0)
      }
      return
    }
    countingRef.current = true
    endTimeRef.current = Date.now() + remainRef.current
    tick()
  }, [tick, update])

  const pause = React.useCallback(() => {
    if (!countingRef.current) return
    countingRef.current = false
    remainRef.current = Math.max(endTimeRef.current - Date.now(), 0)
    clearTimer()
  }, [clearTimer])

  const reset = React.useCallback((newTime?: number) => {
    pause()
    const next = Math.max(0, typeof newTime === 'number' ? newTime : time)
    remainRef.current = next
    endTimeRef.current = Date.now() + next
    update(next)
  }, [pause, time, update])

  React.useEffect(() => () => clearTimer(), [clearTimer])

  return { start, pause, reset, current }
}

export { parseTime }
export type { CountDownCurrentTime }
export default useCountDown
