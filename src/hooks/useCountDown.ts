import { useCallback, useEffect, useRef, useState } from 'react'
import { isNumber } from '../utils/validate'

export interface CountDownCurrentTime { total: number; days: number; hours: number; minutes: number; seconds: number; milliseconds: number }
export interface UseCountDownOptions { time: number; millisecond?: boolean; onChange?: (current: CountDownCurrentTime) => void; onFinish?: () => void }

const parseTime = (time: number): CountDownCurrentTime => {
  const t = Math.max(time, 0)
  return { total: t, days: Math.floor(t / 86400000), hours: Math.floor((t % 86400000) / 3600000), minutes: Math.floor((t % 3600000) / 60000), seconds: Math.floor((t % 60000) / 1000), milliseconds: t % 1000 }
}

const useCountDown = (options: UseCountDownOptions) => {
  const { time, millisecond = false, onChange, onFinish } = options
  const timeRef = useRef(time); const msRef = useRef(millisecond); const onChangeRef = useRef(onChange); const onFinishRef = useRef(onFinish)
  timeRef.current = time; msRef.current = millisecond; onChangeRef.current = onChange; onFinishRef.current = onFinish
  const remainRef = useRef(Math.max(0, time))
  const endTimeRef = useRef(Date.now() + remainRef.current)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countingRef = useRef(false)
  const [current, setCurrent] = useState(() => parseTime(remainRef.current))
  const clearTimer = useCallback(() => { if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null } }, [])
  const update = useCallback((remain: number) => {
    remainRef.current = remain; const next = parseTime(remain); setCurrent(next); onChangeRef.current?.(next)
    if (remain === 0) { countingRef.current = false; clearTimer(); onFinishRef.current?.() }
  }, [clearTimer])
  const tick = useCallback(() => {
    if (!countingRef.current) return; clearTimer()
    const remain = Math.max(endTimeRef.current - Date.now(), 0); update(remain)
    if (remain <= 0) return
    timerRef.current = setTimeout(tick, msRef.current ? Math.max(1, Math.min(30, remain)) : Math.max(1, Math.min(remain, (remain % 1000) + 1)))
  }, [clearTimer, update])
  const start = useCallback(() => { if (countingRef.current || remainRef.current <= 0) return; countingRef.current = true; endTimeRef.current = Date.now() + remainRef.current; tick() }, [tick])
  const pause = useCallback(() => { if (!countingRef.current) return; countingRef.current = false; remainRef.current = Math.max(endTimeRef.current - Date.now(), 0); clearTimer() }, [clearTimer])
  const reset = useCallback((newTime?: number) => { pause(); const n = Math.max(0, isNumber(newTime) ? newTime : timeRef.current); remainRef.current = n; endTimeRef.current = Date.now() + n; setCurrent(parseTime(n)) }, [pause])
  useEffect(() => () => clearTimer(), [clearTimer])
  return { start, pause, reset, current }
}

export { parseTime }
export default useCountDown
