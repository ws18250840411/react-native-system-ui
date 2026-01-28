import { useCallback, useEffect, useRef, useState } from 'react'
import { isFunction } from '../utils/validate'

export interface UseControllableValueOptions<T> {
  defaultValue?: T
  defaultValuePropName?: string
  valuePropName?: string
  trigger?: string
}

export type UseControllableValueProps = object

const hasProp = (obj: object, prop: string) =>
  Object.prototype.hasOwnProperty.call(obj, prop)

function useControllableValue<T = unknown, P extends object = UseControllableValueProps>(
  props: P = {} as P,
  options: UseControllableValueOptions<T> = {},
): [T, (value: T, ...args: unknown[]) => void] {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options

  const propsRecord = props as Record<string, unknown>
  const isControlled = hasProp(props, valuePropName)
  const value = propsRecord[valuePropName] as T

  const [internalValue, setInternalValue] = useState<T>(() => {
    if (isControlled) {
      return value
    }
    if (hasProp(props, defaultValuePropName)) {
      return propsRecord[defaultValuePropName] as T
    }
    return defaultValue as T
  })

  const mergedValue = isControlled ? value : internalValue

  const handlerRef = useRef(propsRecord[trigger])
  useEffect(() => {
    handlerRef.current = propsRecord[trigger]
  }, [props, trigger])

  const triggerChange = useCallback(
    (nextValue: T, ...args: unknown[]) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      const handler = handlerRef.current
      if (isFunction(handler)) {
        ; (handler as (value: T, ...rest: unknown[]) => void)(nextValue, ...args)
      }
    },
    [isControlled],
  )

  return [mergedValue, triggerChange]
}

export default useControllableValue
