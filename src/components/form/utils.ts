import { isNumber, isString } from '../../utils'
import type { NamePath } from './types'

export const normalizeTrigger = (trigger?: string | string[]) =>
  trigger ? (Array.isArray(trigger) ? trigger : [trigger]) : []

export const toNamePath = (name?: NamePath): (string | number)[] => {
  if (name === undefined || name === null) return []
  if (Array.isArray(name)) return name
  if (isNumber(name)) return [name]
  if (isString(name)) {
    return name.split('.')
  }
  return [String(name)]
}

export const serializeNamePath = (name?: NamePath): string => {
  const path = toNamePath(name)
  return path.join('.')
}

export const getValueByName = (source: unknown, name: NamePath): unknown => {
  const path = toNamePath(name)
  return path.reduce<unknown>((acc, key) => {
    if (acc == null) return acc
    const keyStr = String(key)
    if (Array.isArray(acc)) {
      const index = Number(keyStr)
      return Number.isFinite(index)
        ? acc[index]
        : (acc as unknown as Record<string, unknown>)[keyStr]
    }
    if (typeof acc === 'object') {
      return (acc as Record<string, unknown>)[keyStr]
    }
    return undefined
  }, source)
}

export const setValueByName = (source: Record<string, unknown>, name: NamePath, value: unknown): Record<string, unknown> => {
  const path = toNamePath(name)
  if (!path.length) return source
  const clone =
    Array.isArray(source)
      ? [...source]
      : typeof source === 'object' && source !== null
        ? { ...(source as Record<string, unknown>) }
        : {}
  let cursor: Record<string, unknown> | unknown[] = clone as Record<string, unknown> | unknown[]
  path.forEach((key, index) => {
    const keyStr = String(key)
    const keyIndex = Number(keyStr)
    if (index === path.length - 1) {
      if (Array.isArray(cursor) && Number.isFinite(keyIndex)) {
        cursor[keyIndex] = value
      } else {
        ;(cursor as unknown as Record<string, unknown>)[keyStr] = value
      }
      return
    }
    const nextVal =
      Array.isArray(cursor) && Number.isFinite(keyIndex)
        ? cursor[keyIndex]
        : (cursor as unknown as Record<string, unknown>)[keyStr]
    const nextContainer =
      nextVal === undefined || nextVal === null
        ? isNumber(path[index + 1])
          ? []
          : {}
        : Array.isArray(nextVal)
          ? [...nextVal]
          : typeof nextVal === 'object'
            ? { ...(nextVal as Record<string, unknown>) }
            : {}
    if (Array.isArray(cursor) && Number.isFinite(keyIndex)) {
      cursor[keyIndex] = nextContainer
    } else {
      ;(cursor as unknown as Record<string, unknown>)[keyStr] = nextContainer
    }
    cursor = nextContainer as Record<string, unknown> | unknown[]
  })
  return clone as Record<string, unknown>
}
