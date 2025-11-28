import React from 'react'
import { View, type ViewProps } from 'react-native'

import { FormContext } from './FormContext'
import type { FormItemRule, RegisteredFieldOptions } from './types'

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
  validateFields: (names?: string[]) => Promise<Record<string, any>>
  getFieldError: (name: string) => string[]
}

export interface FormProps extends ViewProps {
  initialValues?: Record<string, any>
  colon?: boolean
  labelWidth?: number
  showValidateMessage?: boolean
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
    children,
    ...rest
  } = props

  const defaultInitialValuesRef = React.useRef<Record<string, any>>({})
  const mergedInitialValues = initialValuesProp ?? defaultInitialValuesRef.current
  const [values, setValues] = React.useState<Record<string, any>>(mergedInitialValues)
  const [errors, setErrors] = React.useState<Record<string, string[]>>({})
  const lastInitialValuesRef = React.useRef<Record<string, any>>(mergedInitialValues)
  const fieldsRef = React.useRef<Record<string, RegisteredFieldOptions>>({})
  const valuesRef = React.useRef(values)
  const errorsRef = React.useRef(errors)

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

  const setFieldErrors = React.useCallback((name: string, nextErrors: string[]) => {
    setErrors(prev => {
      const prevErrors = prev[name]
      if (!nextErrors.length) {
        if (!prevErrors) return prev
        const clone = { ...prev }
        delete clone[name]
        return clone
      }
      if (
        prevErrors &&
        prevErrors.length === nextErrors.length &&
        prevErrors.every((item, index) => item === nextErrors[index])
      ) {
        return prev
      }
      return { ...prev, [name]: nextErrors }
    })
  }, [])

  const registerField = React.useCallback((name: string, options: RegisteredFieldOptions) => {
    fieldsRef.current[name] = options
    return () => {
      delete fieldsRef.current[name]
      setFieldErrors(name, [])
    }
  }, [setFieldErrors])

  const runFieldValidation = React.useCallback(
    async (
      name: string,
      trigger?: string,
      valueOverride?: any,
      valuesOverride?: Record<string, any>,
    ): Promise<boolean> => {
      const fieldOptions = fieldsRef.current[name]
      const fieldRules = fieldOptions?.rules ?? []
      if (!fieldRules.length) {
        setFieldErrors(name, [])
        return true
      }

      const activeRules = trigger
        ? fieldRules.filter(rule => {
            if (!rule.validateTrigger) return true
            const triggers = normalizeTrigger(rule.validateTrigger)
            return triggers.includes(trigger)
          })
        : fieldRules

      if (!activeRules.length) {
        return true
      }

      const currentValues = valuesOverride ?? valuesRef.current
      const value = valueOverride ?? currentValues[name]

      for (const rule of activeRules) {
        const result = runRuleValidation(rule, value, currentValues)
        const error = isPromise(result) ? await result : result
        if (error) {
          setFieldErrors(name, [error])
          return false
        }
      }

      setFieldErrors(name, [])
      return true
    },
    [setFieldErrors],
  )

  const validateFields = React.useCallback(
    async (names?: string[]) => {
      const fieldNames = names ?? Object.keys(fieldsRef.current)
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
    (name: string, value: any, trigger?: string) => {
      setValues(prev => {
        const next = { ...prev, [name]: value }
        onValuesChange?.(next, name, value)
        runFieldValidation(name, trigger, value, next)
        return next
      })
    },
    [onValuesChange, runFieldValidation],
  )

  React.useImperativeHandle(
    ref,
    () => ({
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
          const merged = { ...prev, ...next }
          Object.keys(next).forEach(key => {
            onValuesChange?.(merged, key, next[key])
            runFieldValidation(key, undefined, next[key], merged)
          })
          return merged
        })
      },
      resetFields: () => {
        setValues(lastInitialValuesRef.current)
        setErrors({})
      },
      validateFields,
      getFieldError: (name: string) => errorsRef.current[name] ?? [],
    }),
    [onFinish, onValuesChange, validateFields, runFieldValidation],
  )

  const getFieldError = React.useCallback((name: string) => errors[name], [errors])

  const contextValidateField = React.useCallback(
    (name: string, trigger?: string) => runFieldValidation(name, trigger),
    [runFieldValidation],
  )

  const contextValue = React.useMemo(
    () => ({
      values,
      setFieldValue,
      registerField,
      getFieldError,
      validateField: contextValidateField,
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
      </View>
    </FormContext.Provider>
  )
})

InternalForm.displayName = 'Form'

export default InternalForm
