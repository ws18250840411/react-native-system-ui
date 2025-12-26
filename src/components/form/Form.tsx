import React from 'react'
import { View, type ViewProps } from 'react-native'

import { FormContext } from './FormContext'
import type { FormItemRule, NamePath, RegisteredFieldOptions } from './types'
import { getValueByName, serializeNamePath, setValueByName, toNamePath } from './utils'

const normalizeTrigger = (trigger?: string | string[]) => {
  if (!trigger) return []
  return Array.isArray(trigger) ? trigger : [trigger]
}

const isEmptyValue = (value: any) =>
  value === undefined || value === null || value === ''

const getValueLength = (value: any) => {
  if (typeof value === 'number') {
    return value
  }
  if (typeof value === 'string') {
    return value.length
  }
  if (Array.isArray(value)) {
    return value.length
  }
  return 0
}

const isPromise = <T,>(value: any): value is Promise<T> =>
  !!value && typeof value === 'object' && typeof value.then === 'function'

const runRuleValidation = (
  rule: FormItemRule,
  value: any,
  values: Record<string, any>,
): string | null | Promise<string | null> => {
  const message = rule.message ?? '表单验证未通过'
  const isString = typeof value === 'string'
  const empty = isEmptyValue(value)

  if (rule.required) {
    if (empty) {
      return message
    }
    if (rule.whitespace && isString && value.trim().length === 0) {
      return message
    }
  }

  if (empty) {
    return null
  }

  if (rule.pattern && isString && !rule.pattern.test(value)) {
    return message
  }

  if (rule.len !== undefined) {
    const length = getValueLength(value)
    if (length !== rule.len) {
      return message
    }
  }

  if (rule.min !== undefined) {
    const length = getValueLength(value)
    if (length < rule.min) {
      return message
    }
  }

  if (rule.max !== undefined) {
    const length = getValueLength(value)
    if (length > rule.max) {
      return message
    }
  }

  if (rule.validator) {
    const result = rule.validator(value, values)
    if (isPromise(result)) {
      return result.then(res => {
        if (typeof res === 'string') {
          return res
        }
        if (res === false) {
          return message
        }
        return null
      })
    }
    if (typeof result === 'string') {
      return result
    }
    if (result === false) {
      return message
    }
  }

  return null
}

const shallowEqual = (
  prev?: Record<string, any> | null,
  next?: Record<string, any> | null,
): boolean => {
  if (prev === next) return true
  if (!prev || !next) return false
  const prevKeys = Object.keys(prev)
  const nextKeys = Object.keys(next)
  if (prevKeys.length !== nextKeys.length) {
    return false
  }
  for (const key of prevKeys) {
    if (prev[key] !== next[key]) {
      return false
    }
  }
  return true
}

export interface FormInstance {
  submit: () => Promise<Record<string, any> | undefined>
  getFieldsValue: () => Record<string, any>
  setFieldsValue: (values: Record<string, any>) => void
  resetFields: () => void
  validateFields: (names?: NamePath[]) => Promise<Record<string, any>>
  getFieldError: (name: NamePath) => string[]
}

export interface FormProps extends ViewProps {
  initialValues?: Record<string, any>
  colon?: boolean
  labelWidth?: number
  showValidateMessage?: boolean
  footer?: React.ReactNode
  onValuesChange?: (values: Record<string, any>, name: string, value: any) => void
  onFinish?: (values: Record<string, any>) => void
  children?: React.ReactNode
}

const InternalForm = React.forwardRef<FormInstance, FormProps>((props, ref) => {
  const {
    initialValues: initialValuesProp,
    colon,
    labelWidth,
    showValidateMessage = true,
    onValuesChange,
    onFinish,
    style,
    footer,
    children,
    ...rest
  } = props

  const defaultInitialValuesRef = React.useRef<Record<string, any>>({})
  const mergedInitialValues = initialValuesProp ?? defaultInitialValuesRef.current
  const [values, setValues] = React.useState<Record<string, any>>(mergedInitialValues)
  const [errors, setErrors] = React.useState<Record<string, string[]>>({})
  const lastInitialValuesRef = React.useRef<Record<string, any>>(mergedInitialValues)
  const fieldsRef = React.useRef<Record<string, RegisteredFieldOptions & { name: NamePath }>>({})
  const valuesRef = React.useRef(values)
  const errorsRef = React.useRef(errors)
  const validationSeqRef = React.useRef<Record<string, number>>({})
  const subscribersRef = React.useRef(new Set<(changed: Record<string, any>, all: Record<string, any>) => void>())
  const formApiRef = React.useRef<FormInstance | null>(null)

  React.useEffect(() => {
    valuesRef.current = values
  }, [values])

  React.useEffect(() => {
    errorsRef.current = errors
  }, [errors])

  React.useEffect(() => {
    if (shallowEqual(lastInitialValuesRef.current, mergedInitialValues)) {
      return
    }
    lastInitialValuesRef.current = mergedInitialValues
    setValues(mergedInitialValues)
    setErrors({})
  }, [mergedInitialValues])

  const setFieldErrors = React.useCallback((name: NamePath, nextErrors: string[]) => {
    const key = serializeNamePath(name)
    setErrors(prev => {
      const prevErrors = prev[key]
      if (!nextErrors.length) {
        if (!prevErrors) return prev
        const clone = { ...prev }
        delete clone[key]
        errorsRef.current = clone
        return clone
      }
      if (
        prevErrors &&
        prevErrors.length === nextErrors.length &&
        prevErrors.every((item, index) => item === nextErrors[index])
      ) {
        return prev
      }
      const clone = { ...prev, [key]: nextErrors }
      errorsRef.current = clone
      return clone
    })
  }, [])

  const registerField = React.useCallback((name: NamePath, options: RegisteredFieldOptions) => {
    const key = serializeNamePath(name)
    fieldsRef.current[key] = { ...options, name }

    // 将 Form.Item initialValue 合并到表单初始值与当前值（仅在该字段尚未有值时）
    if (options.initialValue !== undefined) {
      const existsInInitial = getValueByName(lastInitialValuesRef.current, name)
      if (existsInInitial === undefined) {
        lastInitialValuesRef.current = setValueByName(lastInitialValuesRef.current, name, options.initialValue)
      }
      const existsInState = getValueByName(valuesRef.current, name)
      if (existsInState === undefined) {
        setValues(prev => {
          if (getValueByName(prev, name) !== undefined) return prev
          return setValueByName(prev, name, options.initialValue)
        })
      }
    }

    return () => {
      delete fieldsRef.current[key]
      setFieldErrors(name, [])
    }
  }, [setFieldErrors])

  const notify = React.useCallback((changedValues: Record<string, any>, nextValues: Record<string, any>) => {
    subscribersRef.current.forEach(listener => listener(changedValues, nextValues))
  }, [])

  const runFieldValidation = React.useCallback(
    async (
      name: NamePath,
      trigger?: string,
      valueOverride?: any,
      valuesOverride?: Record<string, any>,
    ): Promise<boolean> => {
      const key = serializeNamePath(name)
      const validationSeq = (validationSeqRef.current[key] ?? 0) + 1
      validationSeqRef.current[key] = validationSeq
      const fieldOptions = fieldsRef.current[key]
      const fieldRules = fieldOptions?.rules ?? []
      if (!fieldRules.length) {
        setFieldErrors(name, [])
        return true
      }

      let activeRules = trigger
        ? fieldRules.filter(rule => {
          const ruleTrigger = rule.validateTrigger ?? fieldOptions.validateTrigger
          if (!ruleTrigger) return true // 默认全通过？还是默认 onChange？通常如果 FormItem 没设，Rule 没设，就是 onChange
          const triggers = normalizeTrigger(ruleTrigger)
          return triggers.includes(trigger)
        })
        : fieldRules

      if (!activeRules.length) {
        const existingErrors = errorsRef.current[key]
        if (!existingErrors || !existingErrors.length) {
          return true
        }
        activeRules = fieldRules
      }

      const currentValues = valuesOverride ?? valuesRef.current
      const value = valueOverride ?? getValueByName(currentValues, name)

      for (const rule of activeRules) {
        const result = runRuleValidation(rule, value, currentValues)
        const error = isPromise(result) ? await result : result
        if (validationSeqRef.current[key] !== validationSeq) {
          return true
        }
        if (error) {
          setFieldErrors(name, [error])
          return false
        }
      }

      if (validationSeqRef.current[key] !== validationSeq) {
        return true
      }
      setFieldErrors(name, [])
      return true
    },
    [setFieldErrors],
  )

  const validateFields = React.useCallback(
    async (names?: NamePath[]) => {
      const fieldNames = names ?? Object.values(fieldsRef.current).map(item => item.name)
      const results = await Promise.all(fieldNames.map(name => runFieldValidation(name)))
      const hasError = results.some(result => !result)
      if (hasError) {
        throw errorsRef.current
      }
      return valuesRef.current
    },
    [runFieldValidation],
  )

  const setFieldValue = React.useCallback(
    (name: NamePath, value: any, trigger?: string) => {
      const nameKey = serializeNamePath(name)
      setValues(prev => {
        const prevValue = getValueByName(prev, name)
        if (prevValue === value) return prev
        const next = setValueByName(prev, name, value)
        valuesRef.current = next
        onValuesChange?.(next, nameKey, value)
        runFieldValidation(name, trigger, value, next)
        Object.entries(fieldsRef.current).forEach(([fieldName, meta]) => {
          if (meta.dependencies?.some(dep => serializeNamePath(dep) === nameKey)) {
            runFieldValidation(meta.name, trigger, getValueByName(next, meta.name), next)
          }
        })
        notify({ [nameKey]: value }, next)
        return next
      })
    },
    [notify, onValuesChange, runFieldValidation],
  )

  const formApi = React.useMemo<FormInstance>(() => ({
    submit: async () => {
      try {
        const result = await validateFields()
        onFinish?.(result)
        return result
      } catch (error) {
        return undefined
      }
    },
    getFieldsValue: () => valuesRef.current,
    setFieldsValue: next => {
      setValues(prev => {
        let changed = false
        let merged: Record<string, any> = prev
        Object.keys(next).forEach(key => {
          const newVal = next[key]
          const nextMerged = setValueByName(merged, key, newVal)
          if (nextMerged !== merged) {
            changed = true
            merged = nextMerged
            const keyPath = serializeNamePath(key)
            onValuesChange?.(merged, keyPath, newVal)
            runFieldValidation(key, undefined, newVal, merged)
          }
        })
        if (!changed) return prev
        valuesRef.current = merged
        notify(next, merged)
        return merged
      })
    },
    resetFields: () => {
      // 基于 form 初始值 + 各字段的 initialValue 重新构造
      let next = lastInitialValuesRef.current
      Object.values(fieldsRef.current).forEach(meta => {
        if (meta.initialValue === undefined) return
        if (getValueByName(next, meta.name) !== undefined) return
        next = setValueByName(next, meta.name, meta.initialValue)
      })
      valuesRef.current = next
      setValues(next)
      setErrors({})
      notify(next, next)
    },
    validateFields,
    getFieldError: (name: NamePath) => errorsRef.current[serializeNamePath(name)] ?? [],
  }), [notify, onFinish, onValuesChange, validateFields, runFieldValidation])

  React.useImperativeHandle(ref, () => formApi, [formApi])
  React.useEffect(() => {
    formApiRef.current = formApi
  }, [formApi])

  const getFieldError = React.useCallback((name: NamePath) => errors[serializeNamePath(name)], [errors])

  const getFieldValue = React.useCallback((name: NamePath) => getValueByName(values, name), [values])

  const contextValidateField = React.useCallback(
    (name: NamePath, trigger?: string) => runFieldValidation(name, trigger),
    [runFieldValidation],
  )

  const contextValue = React.useMemo(
    () => ({
      values,
      getFieldValue,
      setFieldValue,
      registerField,
      getFieldError,
      validateField: contextValidateField,
      getFieldsValue: () => values,
      subscribe: (listener: (changed: Record<string, any>, all: Record<string, any>) => void) => {
        subscribersRef.current.add(listener)
        return () => subscribersRef.current.delete(listener)
      },
      form: formApiRef.current,
      colon,
      labelWidth,
      showValidateMessage,
    }),
    [values, setFieldValue, registerField, getFieldError, contextValidateField, colon, labelWidth, showValidateMessage],
  )

  return (
    <FormContext.Provider value={contextValue}>
      <View style={style} {...rest}>
        {children}
        {footer}
      </View>
    </FormContext.Provider>
  )
})

InternalForm.displayName = 'Form'

export const useWatch = (
  name?: NamePath | NamePath[],
  formRef?: React.MutableRefObject<FormInstance | null>
) => {
  const context = React.useContext(FormContext)

  const names = React.useMemo<(NamePath[] | undefined)>(() => {
    if (name === undefined) return undefined
    if (Array.isArray(name) && name.length && (typeof name[0] === 'string' || typeof name[0] === 'number')) {
      return [name as NamePath]
    }
    if (Array.isArray(name)) return name as NamePath[]
    return [name]
  }, [name])

  const getSnapshot = React.useCallback(
    (allValues?: Record<string, any>) => {
      const source = allValues ?? context?.getFieldsValue?.() ?? formRef?.current?.getFieldsValue?.() ?? {}
      if (!names) return source
      if (names.length === 1) {
        return getValueByName(source, names[0])
      }
      const picked: Record<string, any> = {}
      names.forEach(key => {
        picked[serializeNamePath(key)] = getValueByName(source, key)
      })
      return picked
    },
    [context, formRef, names],
  )

  const [value, setValue] = React.useState(() => getSnapshot())

  React.useEffect(() => {
    if (!context?.subscribe) return undefined
    return context.subscribe((changed, all) => {
      if (!names || names.some(key => serializeNamePath(key) in changed)) {
        setValue(getSnapshot(all))
      }
    })
  }, [context, getSnapshot, names])

  return value
}

export interface FormSubscribeProps {
  to?: string[]
  children: (changedValues: Record<string, any>, form: FormInstance | null) => React.ReactNode
}

export const FormSubscribe: React.FC<FormSubscribeProps> = ({ to, children }) => {
  const context = React.useContext(FormContext)
  const [payload, setPayload] = React.useState<{ changed: Record<string, any>; all: Record<string, any> }>(() => ({
    changed: {},
    all: context?.getFieldsValue?.() ?? {},
  }))

  React.useEffect(() => {
    if (!context?.subscribe) return undefined
    return context.subscribe((changed, all) => {
      if (to && !Object.keys(changed).some(key => to.includes(key))) return
      setPayload({ changed, all })
    })
  }, [context, to])

  return <>{children(payload.changed, context?.form ?? null)}</>
}

export default InternalForm
