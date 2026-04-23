import { isValidElement } from 'react'

export const isDef = <T>(val: T): val is NonNullable<T> => val !== undefined && val !== null
export const isRenderable = (node: unknown): boolean => node != null && typeof node !== 'boolean'
export const isText = (node: unknown): node is string | number => typeof node === 'string' || typeof node === 'number'
export const isNumber = (val: unknown): val is number => typeof val === 'number' && !Number.isNaN(val)
export const isFiniteNumber = (val: unknown): val is number => isNumber(val) && Number.isFinite(val)
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
export const isValidNode = (node: unknown): boolean => isRenderable(node) && (typeof node !== 'string' || node.length > 0)
export const isPlainObject = (val: unknown): val is Record<string, any> =>
  !!val && typeof val === 'object' && !Array.isArray(val) && !isValidElement(val)
export const isTwoCNChar = (value: string) => /^(?:[\u4e00-\u9fa5]){2}$/.test(value)

export const toArray = <T>(value: T | T[] | undefined | null): T[] => {
  if (value === undefined || value === null) return []
  if (Array.isArray(value)) return value
  return [value]
}

export const shallowEqualArray = <T>(a: T[] = [], b: T[] = []) => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return false
  return true
}

export const shallowEqualObject = (a?: Record<string, unknown> | null, b?: Record<string, unknown> | null): boolean => {
  if (a === b) return true
  if (!a || !b) return false
  const keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  for (const key of keys) if (a[key] !== b[key]) return false
  return true
}

const isDeepComparableObject = (value: unknown): value is Record<string, unknown> =>
  Object.prototype.toString.call(value) === '[object Object]'

export const deepEqualObject = (a: unknown, b: unknown): boolean => {
  if (a === b) return true
  if (a == null || b == null) return false
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i += 1) if (!deepEqualObject(a[i], b[i])) return false
    return true
  }
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (!isDeepComparableObject(a) || !isDeepComparableObject(b)) return false
  const aKeys = Object.keys(a)
  if (aKeys.length !== Object.keys(b).length) return false
  for (const key of aKeys) if (!deepEqualObject(a[key], b[key])) return false
  return true
}

export const ensureSpace = (value: string, autoInsertSpace: boolean) =>
  autoInsertSpace && isTwoCNChar(value) ? value.split('').join(' ') : value

export const trimExtraChar = (value: string, char: string, regExp: RegExp) => {
  const index = value.indexOf(char)
  if (index === -1) return value
  if (char === '-' && index !== 0) return value.slice(0, index)
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
}

export const formatNumberInput = (value: string, allowDot = true, allowMinus = true) => {
  let next = allowDot ? trimExtraChar(value, '.', /\./g) : value.split('.')[0]
  next = allowMinus ? trimExtraChar(next, '-', /-/g) : next.replace(/-/g, '')
  return next.replace(allowDot ? /[^-0-9.]/g : /[^-0-9]/g, '')
}

export const isPromiseLike = (value: unknown): value is Promise<unknown> =>
  isObject(value) && isFunction((value as { then?: unknown }).then)
