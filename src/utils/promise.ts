import { isFunction, isObject } from './validate'

export const isPromiseLike = (value: unknown): value is Promise<unknown> =>
  isObject(value) && isFunction((value as any).then)

