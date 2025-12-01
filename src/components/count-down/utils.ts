import type { CountDownCurrentTime } from '../../hooks'

const padZero = (value: number | string, length = 2) => String(value).padStart(length, '0')

export const parseFormat = (format: string, currentTime: CountDownCurrentTime) => {
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
