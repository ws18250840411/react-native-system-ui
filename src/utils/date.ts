export const padZero = (value: number | string, length = 2) => {
  const s = String(value)
  return s.length >= length ? s : `${'0'.repeat(length - s.length)}${s}`
}

export const times = (count: number, fn: (index: number) => string) =>
  Array.from({ length: count }, (_, i) => fn(i))

export const getTrueValue = (value?: string) => {
  if (!value) return 0
  const n = parseInt(value, 10)
  return Number.isNaN(n) ? 0 : n
}

export const getMonthEndDay = (year: number, month: number) =>
  32 - new Date(year, month - 1, 32).getDate()

export const isValidDate = (value: unknown): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime())

export interface TimeDuration { days: number; hours: number; minutes: number; seconds: number; milliseconds: number }

export const formatDuration = (fmt: string, time: TimeDuration) => {
  let { days, hours, minutes, seconds, milliseconds } = time; let t = fmt
  if (t.includes('DD')) t = t.replace('DD', padZero(days)); else hours += days * 24
  if (t.includes('HH')) t = t.replace('HH', padZero(hours)); else minutes += hours * 60
  if (t.includes('mm')) t = t.replace('mm', padZero(minutes)); else seconds += minutes * 60
  if (t.includes('ss')) t = t.replace('ss', padZero(seconds)); else milliseconds += seconds * 1000
  if (t.includes('S')) { const ms = padZero(milliseconds, 3); if (t.includes('SSS')) t = t.replace('SSS', ms); else if (t.includes('SS')) t = t.replace('SS', ms.slice(0, 2)); else t = t.replace('S', ms.charAt(0)) }
  return t
}
