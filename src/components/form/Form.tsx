import React, { useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { shallowEqualObject } from '../../utils'
import { isPromiseLike } from '../../utils/promise'
import { isNumber, isString, isText } from '../../utils/validate'
import type { FormInstance, FormItemRule, FormProps, FormSubscribeProps, NamePath, RegisteredFieldOptions } from './types'
import { FORM_ALL_FIELDS_KEY, getValueByName, normalizeTrigger, serializeNamePath, setValueByName } from './utils'
import { useLocale } from '../config-provider/useLocale'

export interface FormContextValue {
  getFieldValue: (name: NamePath) => unknown
  setFieldValue: (name: NamePath, value: unknown, trigger?: string) => void
  registerField: (name: NamePath, options: RegisteredFieldOptions) => () => void
  getFieldError: (name: NamePath) => string[] | undefined
  validateField: (name: NamePath, trigger?: string) => Promise<boolean>
  getFieldsValue: () => Record<string, unknown>
  subscribe: (listener: (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => void) => () => void
  form?: FormInstance
  colon?: boolean
  labelWidth?: number
  showValidateMessage?: boolean
}

export const FormContext = React.createContext<FormContextValue | null>(null)

const runRuleValidation = (rule: FormItemRule, value: unknown, values: Record<string, unknown>, fallbackMsg?: string): string | null | Promise<string | null> => {
  const msg = rule.message ?? fallbackMsg ?? 'Validation failed'
  const empty = value == null || value === '' || (Array.isArray(value) && value.length === 0)
  if (rule.required && (empty || (rule.whitespace && isString(value) && value.trim().length === 0))) return msg
  if (empty) return null
  if (rule.pattern && isString(value) && !rule.pattern.test(value)) return msg
  if (rule.len !== undefined || rule.min !== undefined || rule.max !== undefined) {
    const len = isNumber(value) ? value : isString(value) || Array.isArray(value) ? value.length : 0
    if (rule.len !== undefined && len !== rule.len) return msg
    if (rule.min !== undefined && len < rule.min) return msg
    if (rule.max !== undefined && len > rule.max) return msg
  }
  if (!rule.validator) return null
  const handleResult = (r: unknown) => isString(r) ? r : r === false ? msg : null
  const res = rule.validator(value, values)
  return isPromiseLike(res) ? res.then(handleResult) : handleResult(res)
}

const InternalFormImpl = (props: FormProps, ref: React.ForwardedRef<FormInstance>) => {
  const { initialValues, colon, labelWidth, showValidateMessage = true, onValuesChange, onFinish, style, footer, children, ...rest } = props
  const locale = useLocale()
  const defaultValuesRef = useRef<Record<string, unknown>>({}), errorsRef = useRef<Record<string, string[]>>({}), lastInitialValuesRef = useRef<Record<string, unknown>>(initialValues ?? defaultValuesRef.current), fieldsRef = useRef<Record<string, RegisteredFieldOptions & { name: NamePath }>>({}), dependencyGraphRef = useRef(new Map<string, Set<string>>()), valuesRef = useRef<Record<string, unknown>>(initialValues ?? defaultValuesRef.current), validationSeqRef = useRef<Record<string, number>>({}), subscribersRef = useRef(new Set<(changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => void>()), onValuesChangeRef = useRef(onValuesChange), onFinishRef = useRef(onFinish)
  onValuesChangeRef.current = onValuesChange
  onFinishRef.current = onFinish
  const mergedInitialValues = initialValues ?? defaultValuesRef.current
  const [, setVersion] = useState(0)
  const notify = useCallback((changedValues: Record<string, unknown>, newValues: Record<string, unknown>) => { subscribersRef.current.forEach(listener => listener(changedValues, newValues)) }, [])
  useEffect(() => {
    if (shallowEqualObject(lastInitialValuesRef.current, mergedInitialValues)) return
    lastInitialValuesRef.current = mergedInitialValues
    valuesRef.current = mergedInitialValues
    errorsRef.current = {}
    setVersion(v => v + 1)
    notify({ [FORM_ALL_FIELDS_KEY]: true }, mergedInitialValues)
  }, [mergedInitialValues, notify])
  const setFieldErrors = useCallback((name: NamePath, newErrors: string[]) => {
    const key = serializeNamePath(name)
    const prevErrors = errorsRef.current[key]
    if (!newErrors.length) {
      if (!prevErrors) return
      const cleared = { ...errorsRef.current }
      delete cleared[key]
      errorsRef.current = cleared
      notify({ [key]: getValueByName(valuesRef.current, name) }, valuesRef.current)
      return
    }
    if (prevErrors?.[0] === newErrors[0] && prevErrors.length === newErrors.length) return
    errorsRef.current = { ...errorsRef.current, [key]: newErrors }
    notify({ [key]: getValueByName(valuesRef.current, name) }, valuesRef.current)
  }, [notify])
  const registerField = useCallback((name: NamePath, opts: RegisteredFieldOptions) => {
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
    fieldsRef.current[key] = { ...opts, name }
    if (opts.dependencies?.length) {
      for (const dep of opts.dependencies) {
        const depKey = serializeNamePath(dep)
        const set = dependencyGraphRef.current.get(depKey)
        if (set) set.add(key)
        else dependencyGraphRef.current.set(depKey, new Set([key]))
      }
    }
    if (opts.initialValue !== undefined) {
      const existingInInitial = getValueByName(lastInitialValuesRef.current, name)
      if (existingInInitial === undefined) lastInitialValuesRef.current = setValueByName(lastInitialValuesRef.current, name, opts.initialValue)
      const existingInState = getValueByName(valuesRef.current, name)
      if (existingInState === undefined) {
        const next = setValueByName(valuesRef.current, name, opts.initialValue)
        valuesRef.current = next
        notify({ [key]: opts.initialValue }, next)
      }
    }
    return () => {
      const cur = fieldsRef.current[key]
      delete fieldsRef.current[key]
      if (cur?.dependencies?.length) {
        for (const dep of cur.dependencies) {
          const depKey = serializeNamePath(dep)
          const set = dependencyGraphRef.current.get(depKey)
          if (!set) continue
          set.delete(key)
          if (!set.size) dependencyGraphRef.current.delete(depKey)
        }
      }
      setFieldErrors(name, [])
    }
  }, [notify, setFieldErrors])
  const localeRef = useRef(locale)
  localeRef.current = locale
  const validateField = useCallback(async (name: NamePath, trigger?: string, valueOverride?: unknown, valuesOverride?: Record<string, unknown>): Promise<boolean> => {
    const key = serializeNamePath(name)
    const validationSeq = (validationSeqRef.current[key] ?? 0) + 1
    validationSeqRef.current[key] = validationSeq
    const fieldOpts = fieldsRef.current[key]
    const fieldRules = fieldOpts?.rules ?? []
    if (!fieldRules.length) { setFieldErrors(name, []); return true }
    let applicableRules = trigger ? fieldRules.filter(r => {
      const ruleTrigger = r.validateTrigger ?? fieldOpts.validateTrigger
      return !ruleTrigger || normalizeTrigger(ruleTrigger).includes(trigger)
    }) : fieldRules
    if (!applicableRules.length) {
      if (!errorsRef.current[key]?.length) return true
      applicableRules = fieldRules
    }
    const currentValues = valuesOverride ?? valuesRef.current
    const value = valueOverride ?? getValueByName(currentValues, name)
    const fallbackMsg = localeRef.current?.vanForm?.validationFailed
    for (const rule of applicableRules) {
      const result = runRuleValidation(rule, value, currentValues, fallbackMsg)
      const error = isPromiseLike(result) ? await result : result
      if (validationSeqRef.current[key] !== validationSeq) return true
      if (error) { setFieldErrors(name, [error]); return false }
    }
    if (validationSeqRef.current[key] !== validationSeq) return true
    setFieldErrors(name, [])
    return true
  }, [setFieldErrors])
  const validateFields = useCallback(async (names?: NamePath[]) => {
    const fieldNames = names ?? Object.values(fieldsRef.current).map(item => item.name)
    const results = await Promise.all(fieldNames.map(n => validateField(n)))
    const hasError = results.some(r => !r)
    if (hasError) throw errorsRef.current
    return valuesRef.current
  }, [validateField])
  const validateWithDependencies = useCallback((key: string, name: NamePath, trigger: string | undefined, val: unknown, vals: Record<string, unknown>) => {
    validateField(name, trigger, val, vals)
    const deps = dependencyGraphRef.current.get(key)
    if (deps?.size) {
      for (const depKey of deps) {
        const member = fieldsRef.current[depKey]
        if (member) validateField(member.name, trigger, getValueByName(vals, member.name), vals)
      }
    }
  }, [validateField])
  const setFieldValue = useCallback((name: NamePath, val: unknown, trigger?: string) => {
    const nameKey = serializeNamePath(name)
    const prev = valuesRef.current
    if (getValueByName(prev, name) === val) return
    const next = setValueByName(prev, name, val)
    valuesRef.current = next
    onValuesChangeRef.current?.(next, nameKey, val)
    validateWithDependencies(nameKey, name, trigger, val, next)
    notify({ [nameKey]: val }, next)
  }, [notify, validateWithDependencies])
  const formApi = useMemo((): FormInstance => ({
    submit: async () => { try { const res = await validateFields(); onFinishRef.current?.(res); return res } catch { return undefined } },
    getFieldsValue: () => valuesRef.current,
    setFieldsValue: (next, opts) => {
      const shouldValidate = opts?.validate ?? false
      const prev = valuesRef.current
      let merged = prev
      const changed: Record<string, unknown> = {}
      Object.keys(next).forEach(k => {
        const newValue = next[k]
        if (getValueByName(merged, k) === newValue) return
        changed[k] = newValue
        merged = setValueByName(merged, k, newValue)
        onValuesChangeRef.current?.(merged, k, newValue)
        if (shouldValidate) validateWithDependencies(k, k, undefined, newValue, merged)
      })
      if (merged === prev) return
      valuesRef.current = merged
      notify(changed, merged)
    },
    resetFields: () => {
      let next = lastInitialValuesRef.current
      Object.values(fieldsRef.current).forEach(member => {
        if (member.initialValue === undefined) return
        if (getValueByName(next, member.name) !== undefined) return
        next = setValueByName(next, member.name, member.initialValue)
      })
      valuesRef.current = next
      errorsRef.current = {}
      notify({ [FORM_ALL_FIELDS_KEY]: true }, next)
    },
    validateFields,
    getFieldError: (name: NamePath) => errorsRef.current[serializeNamePath(name)] ?? [],
  }), [validateFields, validateWithDependencies, notify])
  useImperativeHandle(ref, () => formApi, [formApi])
  const contextValue = useMemo((): FormContextValue => ({
    getFieldValue: (name: NamePath) => getValueByName(valuesRef.current, name),
    setFieldValue,
    registerField,
    getFieldError: (name: NamePath) => errorsRef.current[serializeNamePath(name)],
    validateField: (name: NamePath, trigger?: string) => validateField(name, trigger),
    getFieldsValue: () => valuesRef.current,
    subscribe: (listener: (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => void) => { subscribersRef.current.add(listener); return () => subscribersRef.current.delete(listener) },
    form: formApi,
    colon,
    labelWidth,
    showValidateMessage,
  }), [setFieldValue, registerField, validateField, formApi, colon, labelWidth, showValidateMessage])
  return <FormContext.Provider value={contextValue}><View style={style} {...rest}>{children}{footer}</View></FormContext.Provider>
}

const InternalFormRef = React.forwardRef<FormInstance, FormProps>(InternalFormImpl)
const InternalForm = React.memo(InternalFormRef)

export const useWatch = (name?: NamePath | NamePath[], formRef?: React.MutableRefObject<FormInstance | null>) => {
  const ctx = useContext(FormContext)
  const namePaths = name === undefined ? undefined : !Array.isArray(name) ? [name] : name.length && isText(name[0]) ? [name as NamePath] : (name as NamePath[])
  const getValue = useCallback((allValues?: Record<string, unknown>) => {
    const source = allValues ?? ctx?.getFieldsValue?.() ?? formRef?.current?.getFieldsValue?.() ?? {}
    if (!namePaths) return source
    if (namePaths.length === 1) return getValueByName(source, namePaths[0])
    const picked: Record<string, unknown> = {}
    for (const k of namePaths) picked[serializeNamePath(k)] = getValueByName(source, k)
    return picked
  }, [ctx, formRef, namePaths])
  const [val, setVal] = useState(() => getValue())
  useEffect(() => {
    if (!ctx?.subscribe) return undefined
    return ctx.subscribe((changedValues, all) => {
      if (FORM_ALL_FIELDS_KEY in changedValues) { setVal(getValue(all)); return }
      if (!namePaths || namePaths.some(k => serializeNamePath(k) in changedValues)) setVal(getValue(all))
    })
  }, [ctx, getValue, namePaths])
  useEffect(() => { setVal(getValue()) }, [getValue])
  return val
}

export const FormSubscribe: React.FC<FormSubscribeProps> = ({ to, children }) => {
  const ctx = useContext(FormContext)
  const [changedValues, setChangedValues] = useState<Record<string, unknown>>({})
  useEffect(() => {
    if (!ctx?.subscribe) return undefined
    return ctx.subscribe(next => {
      if (to && !(FORM_ALL_FIELDS_KEY in next) && !Object.keys(next).some(k => to.includes(k))) return
      setChangedValues(next)
    })
  }, [ctx, to])
  return <>{children(changedValues, ctx?.form || null)}</>
}

export default InternalForm
