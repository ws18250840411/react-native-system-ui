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
  const clear = useCallback(() => { if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null } }, [])
  const update = useCallback((rem: number) => { remainRef.current = rem; const next = parseTime(rem); setCurrent(next); onChangeRef.current?.(next); if (rem === 0) { countingRef.current = false; clear(); onFinishRef.current?.() } }, [clear])
  const tick = useCallback(() => { if (!countingRef.current) return; clear(); const rem = Math.max(endTimeRef.current - Date.now(), 0); update(rem); if (rem <= 0) return; timerRef.current = setTimeout(tick, msRef.current ? Math.max(1, Math.min(30, rem)) : Math.max(1, Math.min(rem, (rem % 1000) + 1))) }, [clear, update])
  const start = useCallback(() => { if (countingRef.current || remainRef.current <= 0) return; countingRef.current = true; endTimeRef.current = Date.now() + remainRef.current; tick() }, [tick])
  const pause = useCallback(() => { if (!countingRef.current) return; countingRef.current = false; remainRef.current = Math.max(endTimeRef.current - Date.now(), 0); clear() }, [clear])
  const reset = useCallback((newT?: number) => { pause(); const n = Math.max(0, isNumber(newT) ? newT : timeRef.current); remainRef.current = n; endTimeRef.current = Date.now() + n; setCurrent(parseTime(n)) }, [pause])
  useEffect(() => () => clear(), [clear])
  return { start, pause, reset, current }
}

export { parseTime }
export default useCountDown
