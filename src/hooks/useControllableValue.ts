import React from 'react'
import { isFunction } from '../utils/validate'

export interface UseControllableValueOptions<T> {
  defaultValue?: T
  defaultValuePropName?: string
  valuePropName?: string
  trigger?: string
}

export type UseControllableValueProps = Record<string, any>

const hasProp = (obj: UseControllableValueProps, prop: string) =>
  Object.prototype.hasOwnProperty.call(obj, prop)

function useControllableValue<T = any>(
  props: UseControllableValueProps = {},
  options: UseControllableValueOptions<T> = {},
): [T, (value: T, ...args: any[]) => void] {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options

  const isControlled = hasProp(props, valuePropName)
  const value = props[valuePropName] as T

  const [internalValue, setInternalValue] = React.useState<T>(() => {
    if (isControlled) {
      return value
    }
    if (hasProp(props, defaultValuePropName)) {
      return props[defaultValuePropName]
    }
    return defaultValue as T
  })

  const mergedValue = isControlled ? value : internalValue

  const handlerRef = React.useRef(props[trigger])
  React.useEffect(() => {
    handlerRef.current = props[trigger]
  }, [props, trigger])

  const triggerChange = React.useCallback(
    (nextValue: T, ...args: any[]) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      const handler = handlerRef.current
      if (isFunction(handler)) {
        handler(nextValue, ...args)
      }
    },
    [isControlled],
  )

  return [mergedValue, triggerChange]
}

export default useControllableValue
