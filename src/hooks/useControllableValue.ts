import { useCallback, useEffect, useRef, useState } from 'react'
import { isFunction } from '../utils/base'
export interface UseControllableValueOptions<T> { defaultValue?: T; defaultValuePropName?: string; valuePropName?: string; trigger?: string }
export type UseControllableValueProps = object
const hasProp = (obj: object, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop)
function useControllableValue<T = unknown, P extends object = UseControllableValueProps>(props: P = {} as P, options: UseControllableValueOptions<T> = {}): [T, (value: T, ...args: unknown[]) => void] {
  const { defaultValue, defaultValuePropName = 'defaultValue', valuePropName = 'value', trigger = 'onChange' } = options; const p = props as Record<string, unknown>; const ctrl = hasProp(props, valuePropName); const val = p[valuePropName] as T
  const [intVal, setIntVal] = useState<T>(() => { if (ctrl) return val; if (hasProp(props, defaultValuePropName)) return p[defaultValuePropName] as T; return defaultValue as T }); const hRef = useRef(p[trigger])
  const triggerHandler = p[trigger]
  useEffect(() => { hRef.current = triggerHandler }, [triggerHandler])
  const setVal = useCallback((next: T, ...args: unknown[]) => { if (!ctrl) setIntVal(next); if (isFunction(hRef.current)) (hRef.current as (v: T, ...r: unknown[]) => void)(next, ...args) }, [ctrl]); return [ctrl ? val : intVal, setVal]
}
export default useControllableValue
