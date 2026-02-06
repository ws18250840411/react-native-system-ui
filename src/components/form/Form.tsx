import React, { useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { View } from 'react-native'

import { shallowEqualObject } from '../../utils'
import { isPromiseLike } from '../../utils/promise'
import { isNumber, isString, isText } from '../../utils/validate'
import type {
  FormInstance,
  FormItemRule,
  FormProps,
  FormSubscribeProps,
  NamePath,
  RegisteredFieldOptions,
} from './types'
import { FORM_ALL_FIELDS_KEY, getValueByName, normalizeTrigger, serializeNamePath, setValueByName } from './utils'

export interface FormContextValue {
  getFieldValue: (name: NamePath) => unknown
  setFieldValue: (name: NamePath, value: unknown, trigger?: string) => void
  registerField: (name: NamePath, options: RegisteredFieldOptions) => () => void
  getFieldError: (name: NamePath) => string[] | undefined
  validateField: (name: NamePath, trigger?: string) => Promise<boolean>
  getFieldsValue: () => Record<string, unknown>
  subscribe: (
    listener: (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => void
  ) => () => void
  form?: FormInstance
  colon?: boolean
  labelWidth?: number
  showValidateMessage?: boolean
}

export const FormContext = React.createContext<FormContextValue | null>(null)

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
  const [, setFormVersion] = useState(0)
  const errorsRef = useRef<Record<string, string[]>>({})
  const lastInitialValuesRef = useRef<Record<string, unknown>>(mergedInitialValues)
  const fieldsRef = useRef<Record<string, RegisteredFieldOptions & { name: NamePath }>>({})
  const dependencyGraphRef = useRef(new Map<string, Set<string>>())
  const valuesRef = useRef<Record<string, unknown>>(mergedInitialValues)
  const validationSeqRef = useRef<Record<string, number>>({})
  const subscribersRef = useRef(
    new Set<(changed: Record<string, unknown>, all: Record<string, unknown>) => void>(),
  )

  const notify = useCallback((changedValues: Record<string, unknown>, nextValues: Record<string, unknown>) => {
    subscribersRef.current.forEach(listener => listener(changedValues, nextValues))
  }, [])

  useEffect(() => {
    if (shallowEqualObject(lastInitialValuesRef.current, mergedInitialValues)) {
      return
    }
    lastInitialValuesRef.current = mergedInitialValues
    valuesRef.current = mergedInitialValues
    errorsRef.current = {}
    setFormVersion(version => version + 1)
    notify({ [FORM_ALL_FIELDS_KEY]: true }, mergedInitialValues)
  }, [mergedInitialValues, notify])

  const setFieldErrors = useCallback((name: NamePath, nextErrors: string[]) => {
    const key = serializeNamePath(name)
    const prevErrors = errorsRef.current[key]
    if (!nextErrors.length) {
      if (!prevErrors) return
      const clone = { ...errorsRef.current }
      delete clone[key]
      errorsRef.current = clone
      notify({ [key]: getValueByName(valuesRef.current, name) }, valuesRef.current)
      return
    }
    if (prevErrors?.[0] === nextErrors[0] && prevErrors.length === nextErrors.length) {
      return
    }
    errorsRef.current = { ...errorsRef.current, [key]: nextErrors }
    notify({ [key]: getValueByName(valuesRef.current, name) }, valuesRef.current)
  }, [notify])

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
        const next = setValueByName(valuesRef.current, name, options.initialValue)
        valuesRef.current = next
        notify({ [key]: options.initialValue }, next)
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

  const validateWithDependents = useCallback(
    (key: string, name: NamePath, trigger: string | undefined, value: unknown, values: Record<string, unknown>) => {
      runFieldValidation(name, trigger, value, values)
      const dependents = dependencyGraphRef.current.get(key)
      if (dependents?.size) {
        for (const dk of dependents) {
          const meta = fieldsRef.current[dk]
          if (meta) runFieldValidation(meta.name, trigger, getValueByName(values, meta.name), values)
        }
      }
    },
    [runFieldValidation],
  )

  const setFieldValue = useCallback(
    (name: NamePath, value: unknown, trigger?: string) => {
      const nameKey = serializeNamePath(name)
      const prev = valuesRef.current
      if (getValueByName(prev, name) === value) return
      const next = setValueByName(prev, name, value)
      valuesRef.current = next
      onValuesChange?.(next, nameKey, value)
      validateWithDependents(nameKey, name, trigger, value, next)
      notify({ [nameKey]: value }, next)
    },
    [notify, onValuesChange, validateWithDependents],
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
    setFieldsValue: (next, options) => {
      const shouldValidate = options?.validate ?? false
      const prev = valuesRef.current
      let merged = prev
      const changed: Record<string, unknown> = {}
      Object.keys(next).forEach(key => {
        const newVal = next[key]
        if (getValueByName(merged, key) === newVal) return
        changed[key] = newVal
        merged = setValueByName(merged, key, newVal)
        onValuesChange?.(merged, key, newVal)
        if (shouldValidate) validateWithDependents(key, key, undefined, newVal, merged)
      })
      if (merged === prev) return
      valuesRef.current = merged
      notify(changed, merged)
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
      notify({ [FORM_ALL_FIELDS_KEY]: true }, next)
    },
    validateFields,
    getFieldError: (name: NamePath) => errorsRef.current[serializeNamePath(name)] ?? [],
  }

  useImperativeHandle(ref, () => formApi, [formApi])

  const contextValue = {
    getFieldValue: (name: NamePath) => getValueByName(valuesRef.current, name),
    setFieldValue,
    registerField,
    getFieldError: (name: NamePath) => errorsRef.current[serializeNamePath(name)],
    validateField: (name: NamePath, trigger?: string) => runFieldValidation(name, trigger),
    getFieldsValue: () => valuesRef.current,
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
      if (FORM_ALL_FIELDS_KEY in changed) {
        setValue(getSnapshot(all))
        return
      }
      if (!names || names.some(key => serializeNamePath(key) in changed)) {
        setValue(getSnapshot(all))
      }
    })
  }, [context, getSnapshot, names])

  useEffect(() => {
    setValue(getSnapshot())
  }, [getSnapshot])

  return value
}

export const FormSubscribe: React.FC<FormSubscribeProps> = ({ to, children }) => {
  const context = useContext(FormContext)
  const [changed, setChanged] = useState<Record<string, unknown>>({})

  useEffect(() => {
    if (!context?.subscribe) return undefined
    return context.subscribe(next => {
      if (to && !(FORM_ALL_FIELDS_KEY in next) && !Object.keys(next).some(key => to.includes(key))) return
      setChanged(next)
    })
  }, [context, to])

  return <>{children(changed, context?.form || null)}</>
}

export default InternalForm
