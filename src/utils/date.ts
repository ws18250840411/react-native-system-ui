export const padZero = (value: number | string, length = 2) => {
  const str = String(value)
  return str.length >= length ? str : `${'0'.repeat(length - str.length)}${str}`
}

export const times = (count: number, iteratee: (index: number) => string) => {
  return Array.from({ length: count }, (_, index) => iteratee(index))
}

export const getTrueValue = (value?: string) => {
  if (!value) return 0
  const parsed = parseInt(value, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

export const getMonthEndDay = (year: number, month: number) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

export const isValidDate = (value: unknown): value is Date => {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

export interface TimeDuration {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export const formatDuration = (format: string, currentTime: TimeDuration) => {
  const { days } = currentTime
  let { hours, minutes, seconds, milliseconds } = currentTime
  let template = format

  if (template.includes('DD')) {
    template = template.replace('DD', padZero(days))
  } else {
    hours += days * 24
  }

  if (template.includes('HH')) {
    template = template.replace('HH', padZero(hours))
  } else {
    minutes += hours * 60
  }

  if (template.includes('mm')) {
    template = template.replace('mm', padZero(minutes))
  } else {
    seconds += minutes * 60
  }

  if (template.includes('ss')) {
    template = template.replace('ss', padZero(seconds))
  } else {
    milliseconds += seconds * 1000
  }

  if (template.includes('S')) {
    const ms = padZero(milliseconds, 3)
    if (template.includes('SSS')) {
      template = template.replace('SSS', ms)
    } else if (template.includes('SS')) {
      template = template.replace('SS', ms.slice(0, 2))
    } else {
      template = template.replace('S', ms.charAt(0))
    }
  }

  return template
}

