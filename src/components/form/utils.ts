import { isNumber, isString } from '../../utils/validate'
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

export const getValueByName = (source: any, name: NamePath): any => {
  const path = toNamePath(name)
  return path.reduce((acc, key) => (acc == null ? acc : acc[key]), source)
}

export const setValueByName = (source: any, name: NamePath, value: any) => {
  const path = toNamePath(name)
  if (!path.length) return value
  const clone = Array.isArray(source) ? [...source] : { ...(source ?? {}) }
  let cursor: any = clone
  path.forEach((key, index) => {
    if (index === path.length - 1) {
      cursor[key] = value
      return
    }
    const nextVal = cursor[key]
    const nextContainer =
      nextVal === undefined || nextVal === null
        ? isNumber(path[index + 1])
          ? []
          : {}
        : Array.isArray(nextVal)
          ? [...nextVal]
          : { ...nextVal }
    cursor[key] = nextContainer
    cursor = nextContainer
  })
  return clone
}
