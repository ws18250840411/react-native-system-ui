import { useCallback, useEffect, useRef, useState } from 'react'
import { isFunction } from '../utils/validate'

export interface UseControllableValueOptions<T> { defaultValue?: T; defaultValuePropName?: string; valuePropName?: string; trigger?: string }
export type UseControllableValueProps = object
const hasProp = (obj: object, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop)

function useControllableValue<T = unknown, P extends object = UseControllableValueProps>(props: P = {} as P, options: UseControllableValueOptions<T> = {}): [T, (value: T, ...args: unknown[]) => void] {
  const { defaultValue, defaultValuePropName = 'defaultValue', valuePropName = 'value', trigger = 'onChange' } = options
  const p = props as Record<string, unknown>
  const isControlled = hasProp(props, valuePropName)
  const value = p[valuePropName] as T
  const [internalValue, setInternalValue] = useState<T>(() => { if (isControlled) return value; if (hasProp(props, defaultValuePropName)) return p[defaultValuePropName] as T; return defaultValue as T })
  const handlerRef = useRef(p[trigger])
  useEffect(() => { handlerRef.current = p[trigger] }, [props, trigger])
  const triggerChange = useCallback((next: T, ...args: unknown[]) => { if (!isControlled) setInternalValue(next); if (isFunction(handlerRef.current)) (handlerRef.current as (v: T, ...r: unknown[]) => void)(next, ...args) }, [isControlled])
  return [isControlled ? value : internalValue, triggerChange]
}

export default useControllableValue
