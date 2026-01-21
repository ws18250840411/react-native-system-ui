import React from 'react'
import { View } from 'react-native'

import { isPromiseLike, isNumber, isString, isText } from '../../utils'
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

  const defaultInitialValuesRef = React.useRef<Record<string, unknown>>({})
  const mergedInitialValues = initialValuesProp ?? defaultInitialValuesRef.current
  const [values, setValues] = React.useState<Record<string, unknown>>(mergedInitialValues)
  const [errors, setErrors] = React.useState<Record<string, string[]>>({})
  const lastInitialValuesRef = React.useRef<Record<string, unknown>>(mergedInitialValues)
  const fieldsRef = React.useRef<Record<string, RegisteredFieldOptions & { name: NamePath }>>({})
  const valuesRef = React.useRef(values)
  const errorsRef = React.useRef(errors)
  const validationSeqRef = React.useRef<Record<string, number>>({})
  const subscribersRef = React.useRef(
    new Set<(changed: Record<string, unknown>, all: Record<string, unknown>) => void>(),
  )

  React.useEffect(() => {
    if (shallowEqual(lastInitialValuesRef.current, mergedInitialValues)) {
      return
    }
    lastInitialValuesRef.current = mergedInitialValues
    valuesRef.current = mergedInitialValues
    errorsRef.current = {}
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
      if (prevErrors?.[0] === nextErrors[0] && prevErrors.length === nextErrors.length) {
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
      delete fieldsRef.current[key]
      setFieldErrors(name, [])
    }
  }, [setFieldErrors])

  const notify = React.useCallback((changedValues: Record<string, unknown>, nextValues: Record<string, unknown>) => {
    subscribersRef.current.forEach(listener => listener(changedValues, nextValues))
  }, [])

  const runFieldValidation = React.useCallback(
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
    (name: NamePath, value: unknown, trigger?: string) => {
      const nameKey = serializeNamePath(name)
      setValues(prev => {
        const prevValue = getValueByName(prev, name)
        if (prevValue === value) return prev
        const next = setValueByName(prev, name, value)
        valuesRef.current = next
        onValuesChange?.(next, nameKey, value)
        runFieldValidation(name, trigger, value, next)
        for (const fieldName in fieldsRef.current) {
          const meta = fieldsRef.current[fieldName]
          if (meta.dependencies?.some(dep => serializeNamePath(dep) === nameKey)) {
            runFieldValidation(meta.name, trigger, getValueByName(next, meta.name), next)
          }
        }
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
        let merged = prev
        const changed: Record<string, unknown> = {}
        Object.keys(next).forEach(key => {
          const newVal = next[key]
          if (getValueByName(merged, key) === newVal) return
          changed[key] = newVal
          merged = setValueByName(merged, key, newVal)
          onValuesChange?.(merged, key, newVal)
          runFieldValidation(key, undefined, newVal, merged)
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
  }), [notify, onFinish, onValuesChange, validateFields, runFieldValidation])

  React.useImperativeHandle(ref, () => formApi, [formApi])

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
      subscribe: (listener: (changed: Record<string, unknown>, all: Record<string, unknown>) => void) => {
        subscribersRef.current.add(listener)
        return () => subscribersRef.current.delete(listener)
      },
      form: formApi,
      colon,
      labelWidth,
      showValidateMessage,
    }),
    [values, setFieldValue, registerField, getFieldError, contextValidateField, formApi, colon, labelWidth, showValidateMessage],
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

export const useWatch = (name?: NamePath | NamePath[], formRef?: React.MutableRefObject<FormInstance | null>) => {
  const context = React.useContext(FormContext)

  const names = React.useMemo(() => {
    if (name === undefined) return undefined
    if (!Array.isArray(name)) return [name]
    return name.length && isText(name[0])
      ? [name as NamePath]
      : (name as NamePath[])
  }, [name])

  const getSnapshot = React.useCallback(
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

export const FormSubscribe: React.FC<FormSubscribeProps> = ({ to, children }) => {
  const context = React.useContext(FormContext)
  const [changed, setChanged] = React.useState<Record<string, unknown>>({})

  React.useEffect(() => {
    if (!context?.subscribe) return undefined
    return context.subscribe(next => {
      if (to && !Object.keys(next).some(key => to.includes(key))) return
      setChanged(next)
    })
  }, [context, to])

  return <>{children(changed, context?.form ?? null)}</>
}

export default InternalForm
