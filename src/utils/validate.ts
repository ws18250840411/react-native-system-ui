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

export const isImageUrlString = (url: string) =>
  /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i.test(url)
