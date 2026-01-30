import React, { useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { View } from 'react-native'

import { isPromiseLike } from '../../utils/promise'
import { isNumber, isString, isText } from '../../utils/validate'
import { FormContext } from './FormContext'
import type {
  FormInstance,
  FormItemRule,
  FormProps,
  FormSubscribeProps,
  NamePath,
  RegisteredFieldOptions,
} from './types'
import { getValueByName, normalizeTrigger, serializeNamePath, setValueByName } from './utils'

const runRuleValidation = (
  rule: FormItemRule,
  value: unknown,
  values: Record<string, unknown>,
): string | null | Promise<string | null> => {
  const message = rule.message ?? '表单验证未通过'
  const empty = value == null || value === '' || (Array.isArray(value) && value.length === 0)

  if (rule.required && (empty || (rule.whitespace && isString(value) && value.trim().length === 0))) {
    return message
  }
  if (empty) return null
  if (rule.pattern && isString(value) && !rule.pattern.test(value)) return message

  if (rule.len !== undefined || rule.min !== undefined || rule.max !== undefined) {
    const length =
      isNumber(value)
        ? value
        : isString(value) || Array.isArray(value)
          ? value.length
          : 0
    if (rule.len !== undefined && length !== rule.len) return message
    if (rule.min !== undefined && length < rule.min) return message
    if (rule.max !== undefined && length > rule.max) return message
  }

  if (!rule.validator) return null
  const handle = (result: unknown) =>
    isString(result) ? result : result === false ? message : null
  const result = rule.validator(value, values)
  return isPromiseLike(result) ? result.then(handle) : handle(result)
}

const shallowEqual = (
  prev?: Record<string, unknown> | null,
  next?: Record<string, unknown> | null,
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

  const defaultInitialValuesRef = useRef<Record<string, unknown>>({})
  const mergedInitialValues = initialValuesProp ?? defaultInitialValuesRef.current
  const [values, setValues] = useState<Record<string, unknown>>(mergedInitialValues)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const lastInitialValuesRef = useRef<Record<string, unknown>>(mergedInitialValues)
  const fieldsRef = useRef<Record<string, RegisteredFieldOptions & { name: NamePath }>>({})
  const dependencyGraphRef = useRef(new Map<string, Set<string>>())
  const valuesRef = useRef(values)
  const errorsRef = useRef(errors)
  const validationSeqRef = useRef<Record<string, number>>({})
  const subscribersRef = useRef(
    new Set<(changed: Record<string, unknown>, all: Record<string, unknown>) => void>(),
  )

  useEffect(() => {
    if (shallowEqual(lastInitialValuesRef.current, mergedInitialValues)) {
      return
    }
    lastInitialValuesRef.current = mergedInitialValues
    valuesRef.current = mergedInitialValues
    errorsRef.current = {}
    setValues(mergedInitialValues)
    setErrors({})
  }, [mergedInitialValues])

  const setFieldErrors = useCallback((name: NamePath, nextErrors: string[]) => {
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
      if (prevErrors?.[0] === nextErrors[0] && prevErrors.length === nextErrors.length) {
        return prev
      }
      const clone = { ...prev, [key]: nextErrors }
      errorsRef.current = clone
      return clone
    })
  }, [])

  const registerField = useCallback((name: NamePath, options: RegisteredFieldOptions) => {
    const key = serializeNamePath(name)
    const prev = fieldsRef.current[key]
    if (prev?.dependencies?.length) {
      for (const dep of prev.dependencies) {
        const depKey = serializeNamePath(dep)
        const set = dependencyGraphRef.current.get(depKey)
        if (!set) continue
        set.delete(key)
        if (!set.size) dependencyGraphRef.current.delete(depKey)
      }
    }

    fieldsRef.current[key] = { ...options, name }

    if (options.dependencies?.length) {
      for (const dep of options.dependencies) {
        const depKey = serializeNamePath(dep)
        const set = dependencyGraphRef.current.get(depKey)
        if (set) {
          set.add(key)
        } else {
          dependencyGraphRef.current.set(depKey, new Set([key]))
        }
      }
    }

    if (options.initialValue !== undefined) {
      const existsInInitial = getValueByName(lastInitialValuesRef.current, name)
      if (existsInInitial === undefined) {
        lastInitialValuesRef.current = setValueByName(lastInitialValuesRef.current, name, options.initialValue)
      }
      const existsInState = getValueByName(valuesRef.current, name)
      if (existsInState === undefined) {
        setValues(prev => {
          if (getValueByName(prev, name) !== undefined) return prev
          const next = setValueByName(prev, name, options.initialValue)
          valuesRef.current = next
          return next
        })
      }
    }

    return () => {
      const current = fieldsRef.current[key]
      delete fieldsRef.current[key]
      if (current?.dependencies?.length) {
        for (const dep of current.dependencies) {
          const depKey = serializeNamePath(dep)
          const set = dependencyGraphRef.current.get(depKey)
          if (!set) continue
          set.delete(key)
          if (!set.size) dependencyGraphRef.current.delete(depKey)
        }
      }
      setFieldErrors(name, [])
    }
  }, [setFieldErrors])

  const notify = useCallback((changedValues: Record<string, unknown>, nextValues: Record<string, unknown>) => {
    subscribersRef.current.forEach(listener => listener(changedValues, nextValues))
  }, [])

  const runFieldValidation = useCallback(
    async (
      name: NamePath,
      trigger?: string,
      valueOverride?: unknown,
      valuesOverride?: Record<string, unknown>,
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
          return !ruleTrigger || normalizeTrigger(ruleTrigger).includes(trigger)
        })
        : fieldRules

      if (!activeRules.length) {
        if (!errorsRef.current[key]?.length) return true
        activeRules = fieldRules
      }

      const currentValues = valuesOverride ?? valuesRef.current
      const value = valueOverride ?? getValueByName(currentValues, name)

      for (const rule of activeRules) {
        const result = runRuleValidation(rule, value, currentValues)
        const error = isPromiseLike(result) ? await result : result
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

  const validateFields = useCallback(
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

  const setFieldValue = useCallback(
    (name: NamePath, value: unknown, trigger?: string) => {
      const nameKey = serializeNamePath(name)
      setValues(prev => {
        const prevValue = getValueByName(prev, name)
        if (prevValue === value) return prev
        const next = setValueByName(prev, name, value)
        valuesRef.current = next
        onValuesChange?.(next, nameKey, value)
        runFieldValidation(name, trigger, value, next)
        const dependents = dependencyGraphRef.current.get(nameKey)
        if (dependents?.size) {
          for (const dependentKey of dependents) {
            const meta = fieldsRef.current[dependentKey]
            if (!meta) continue
            runFieldValidation(meta.name, trigger, getValueByName(next, meta.name), next)
          }
        }
        notify({ [nameKey]: value }, next)
        return next
      })
    },
    [notify, onValuesChange, runFieldValidation],
  )

  const formApi: FormInstance = {
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
        let merged = prev
        const changed: Record<string, unknown> = {}
        Object.keys(next).forEach(key => {
          const newVal = next[key]
          if (getValueByName(merged, key) === newVal) return
          changed[key] = newVal
          merged = setValueByName(merged, key, newVal)
          onValuesChange?.(merged, key, newVal)
          runFieldValidation(key, undefined, newVal, merged)
          const dependents = dependencyGraphRef.current.get(key)
          if (dependents?.size) {
            for (const dependentKey of dependents) {
              const meta = fieldsRef.current[dependentKey]
              if (!meta) continue
              runFieldValidation(meta.name, undefined, getValueByName(merged, meta.name), merged)
            }
          }
        })
        if (merged === prev) return prev
        valuesRef.current = merged
        notify(changed, merged)
        return merged
      })
    },
    resetFields: () => {
      let next = lastInitialValuesRef.current
      Object.values(fieldsRef.current).forEach(meta => {
        if (meta.initialValue === undefined) return
        if (getValueByName(next, meta.name) !== undefined) return
        next = setValueByName(next, meta.name, meta.initialValue)
      })
      valuesRef.current = next
      errorsRef.current = {}
      setValues(next)
      setErrors({})
      notify(next, next)
    },
    validateFields,
    getFieldError: (name: NamePath) => errorsRef.current[serializeNamePath(name)] ?? [],
  }

  useImperativeHandle(ref, () => formApi, [formApi])

  const getFieldError = useCallback((name: NamePath) => errors[serializeNamePath(name)], [errors])

  const getFieldValue = useCallback((name: NamePath) => getValueByName(values, name), [values])

  const contextValidateField = useCallback(
    (name: NamePath, trigger?: string) => runFieldValidation(name, trigger),
    [runFieldValidation],
  )

  const contextValue = {
    values,
    getFieldValue,
    setFieldValue,
    registerField,
    getFieldError,
    validateField: contextValidateField,
    getFieldsValue: () => values,
    subscribe: (listener: (changed: Record<string, unknown>, all: Record<string, unknown>) => void) => {
      subscribersRef.current.add(listener)
      return () => subscribersRef.current.delete(listener)
    },
    form: formApi,
    colon,
    labelWidth,
    showValidateMessage,
  }

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

export const useWatch = (name?: NamePath | NamePath[], formRef?: React.MutableRefObject<FormInstance | null>) => {
  const context = useContext(FormContext)

  const names =
    name === undefined
      ? undefined
      : !Array.isArray(name)
        ? [name]
        : name.length && isText(name[0])
          ? [name as NamePath]
          : (name as NamePath[])

  const getSnapshot = useCallback(
    (allValues?: Record<string, unknown>) => {
      const source = allValues ?? context?.getFieldsValue?.() ?? formRef?.current?.getFieldsValue?.() ?? {}
      if (!names) return source
      if (names.length === 1) return getValueByName(source, names[0])
      const picked: Record<string, unknown> = {}
      for (const key of names) picked[serializeNamePath(key)] = getValueByName(source, key)
      return picked
    },
    [context, formRef, names],
  )

  const [value, setValue] = useState(() => getSnapshot())

  useEffect(() => {
    if (!context?.subscribe) return undefined
    return context.subscribe((changed, all) => {
      if (!names || names.some(key => serializeNamePath(key) in changed)) {
        setValue(getSnapshot(all))
      }
    })
  }, [context, getSnapshot, names])

  return value
}

export const FormSubscribe: React.FC<FormSubscribeProps> = ({ to, children }) => {
  const context = useContext(FormContext)
  const [changed, setChanged] = useState<Record<string, unknown>>({})

  useEffect(() => {
    if (!context?.subscribe) return undefined
    return context.subscribe(next => {
      if (to && !Object.keys(next).some(key => to.includes(key))) return
      setChanged(next)
    })
  }, [context, to])

  return <>{children(changed, context?.form || null)}</>
}

export default InternalForm
