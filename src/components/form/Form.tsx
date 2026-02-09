import React, { useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { shallowEqualObject, renderTextOrNode } from '../../utils'
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
  const defaultValuesRef = useRef<Record<string, unknown>>({}), errorsRef = useRef<Record<string, string[]>>({}), lastInitialValuesRef = useRef<Record<string, unknown>>(initialValues ?? defaultValuesRef.current), fieldsRef = useRef<Record<string, RegisteredFieldOptions & { name: NamePath }>>({}), dependencyGraphRef = useRef(new Map<string, Set<string>>()), valuesRef = useRef<Record<string, unknown>>(initialValues ?? defaultValuesRef.current), validationSeqRef = useRef<Record<string, number>>({}), subscribersRef = useRef(new Set<(changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => void>()), onValuesChangeRef = useRef(onValuesChange), onFinishRef = useRef(onFinish); onValuesChangeRef.current = onValuesChange; onFinishRef.current = onFinish; const mergedInitialValues = initialValues ?? defaultValuesRef.current; const [, setVersion] = useState(0); const notify = useCallback((changedValues: Record<string, unknown>, newValues: Record<string, unknown>) => { subscribersRef.current.forEach(l => l(changedValues, newValues)) }, [])
  useEffect(() => {
    if (shallowEqualObject(lastInitialValuesRef.current, mergedInitialValues)) return
    lastInitialValuesRef.current = mergedInitialValues
    valuesRef.current = mergedInitialValues
    errorsRef.current = {}
    setVersion(v => v + 1)
    notify({ [FORM_ALL_FIELDS_KEY]: true }, mergedInitialValues)
  }, [mergedInitialValues, notify])
  const setFieldErrors = useCallback((name: NamePath, newErrors: string[]) => {
    const key = serializeNamePath(name); const prevE = errorsRef.current[key]
    if (!newErrors.length) { if (!prevE) return; const cl = { ...errorsRef.current }; delete cl[key]; errorsRef.current = cl; notify({ [key]: getValueByName(valuesRef.current, name) }, valuesRef.current); return }
    if (prevE?.[0] === newErrors[0] && prevE.length === newErrors.length) return
    errorsRef.current = { ...errorsRef.current, [key]: newErrors }; notify({ [key]: getValueByName(valuesRef.current, name) }, valuesRef.current)
  }, [notify])
  const registerField = useCallback((name: NamePath, opts: RegisteredFieldOptions) => {
    const key = serializeNamePath(name); const prev = fieldsRef.current[key]
    if (prev?.dependencies?.length) { for (const dep of prev.dependencies) { const dk = serializeNamePath(dep); const s = dependencyGraphRef.current.get(dk); if (!s) continue; s.delete(key); if (!s.size) dependencyGraphRef.current.delete(dk) } }
    fieldsRef.current[key] = { ...opts, name }
    if (opts.dependencies?.length) { for (const dep of opts.dependencies) { const dk = serializeNamePath(dep); const s = dependencyGraphRef.current.get(dk); if (s) s.add(key); else dependencyGraphRef.current.set(dk, new Set([key])) } }
    if (opts.initialValue !== undefined) { const exInit = getValueByName(lastInitialValuesRef.current, name); if (exInit === undefined) lastInitialValuesRef.current = setValueByName(lastInitialValuesRef.current, name, opts.initialValue); const exState = getValueByName(valuesRef.current, name); if (exState === undefined) { const next = setValueByName(valuesRef.current, name, opts.initialValue); valuesRef.current = next; notify({ [key]: opts.initialValue }, next) } }
    return () => { const cur = fieldsRef.current[key]; delete fieldsRef.current[key]; if (cur?.dependencies?.length) { for (const dep of cur.dependencies) { const dk = serializeNamePath(dep); const s = dependencyGraphRef.current.get(dk); if (!s) continue; s.delete(key); if (!s.size) dependencyGraphRef.current.delete(dk) } }; setFieldErrors(name, []) }
  }, [notify, setFieldErrors])
  const localeRef = useRef(locale); localeRef.current = locale; const validateField = useCallback(async (name: NamePath, trigger?: string, valueOverride?: unknown, valuesOverride?: Record<string, unknown>): Promise<boolean> => {
    const key = serializeNamePath(name); const seq = (validationSeqRef.current[key] ?? 0) + 1; validationSeqRef.current[key] = seq
    const fOpts = fieldsRef.current[key]; const fRules = fOpts?.rules ?? []
    if (!fRules.length) { setFieldErrors(name, []); return true }
    let appRules = trigger ? fRules.filter(r => { const rt = r.validateTrigger ?? fOpts.validateTrigger; return !rt || normalizeTrigger(rt).includes(trigger) }) : fRules
    if (!appRules.length) { if (!errorsRef.current[key]?.length) return true; appRules = fRules }
    const curVals = valuesOverride ?? valuesRef.current; const val = valueOverride ?? getValueByName(curVals, name); const fbMsg = localeRef.current?.vanForm?.validationFailed
    for (const rule of appRules) { const result = runRuleValidation(rule, val, curVals, fbMsg); const err = isPromiseLike(result) ? await result : result; if (validationSeqRef.current[key] !== seq) return true; if (err) { setFieldErrors(name, [err]); return false } }
    if (validationSeqRef.current[key] !== seq) return true; setFieldErrors(name, []); return true
  }, [setFieldErrors])
  const validateFields = useCallback(async (names?: NamePath[]) => { const fNames = names ?? Object.values(fieldsRef.current).map(it => it.name); const results = await Promise.all(fNames.map(n => validateField(n))); if (results.some(r => !r)) throw errorsRef.current; return valuesRef.current }, [validateField])
  const validateWithDependencies = useCallback((key: string, name: NamePath, trigger: string | undefined, val: unknown, vals: Record<string, unknown>) => { validateField(name, trigger, val, vals); const deps = dependencyGraphRef.current.get(key); if (deps?.size) { for (const dk of deps) { const m = fieldsRef.current[dk]; if (m) validateField(m.name, trigger, getValueByName(vals, m.name), vals) } } }, [validateField])
  const setFieldValue = useCallback((name: NamePath, val: unknown, trigger?: string) => { const nKey = serializeNamePath(name); const prev = valuesRef.current; if (getValueByName(prev, name) === val) return; const next = setValueByName(prev, name, val); valuesRef.current = next; onValuesChangeRef.current?.(next, nKey, val); validateWithDependencies(nKey, name, trigger, val, next); notify({ [nKey]: val }, next) }, [notify, validateWithDependencies])
  const formApi = useMemo((): FormInstance => ({
    submit: async () => { try { const res = await validateFields(); onFinishRef.current?.(res); return res } catch { return undefined } },
    getFieldsValue: () => valuesRef.current,
    setFieldsValue: (next, opts) => { const sV = opts?.validate ?? false; const prev = valuesRef.current; let m = prev; const ch: Record<string, unknown> = {}; Object.keys(next).forEach(k => { const nv = next[k]; if (getValueByName(m, k) === nv) return; ch[k] = nv; m = setValueByName(m, k, nv); onValuesChangeRef.current?.(m, k, nv); if (sV) validateWithDependencies(k, k, undefined, nv, m) }); if (m === prev) return; valuesRef.current = m; notify(ch, m) },
    resetFields: () => { let n = lastInitialValuesRef.current; Object.values(fieldsRef.current).forEach(mem => { if (mem.initialValue === undefined) return; if (getValueByName(n, mem.name) !== undefined) return; n = setValueByName(n, mem.name, mem.initialValue) }); valuesRef.current = n; errorsRef.current = {}; notify({ [FORM_ALL_FIELDS_KEY]: true }, n) },
    validateFields,
    getFieldError: (name: NamePath) => errorsRef.current[serializeNamePath(name)] ?? [],
  }), [validateFields, validateWithDependencies, notify])
  useImperativeHandle(ref, () => formApi, [formApi])
  const ctxVal = useMemo((): FormContextValue => ({ getFieldValue: (name: NamePath) => getValueByName(valuesRef.current, name), setFieldValue, registerField, getFieldError: (name: NamePath) => errorsRef.current[serializeNamePath(name)], validateField: (name: NamePath, trigger?: string) => validateField(name, trigger), getFieldsValue: () => valuesRef.current, subscribe: (listener: (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => void) => { subscribersRef.current.add(listener); return () => subscribersRef.current.delete(listener) }, form: formApi, colon, labelWidth, showValidateMessage }), [setFieldValue, registerField, validateField, formApi, colon, labelWidth, showValidateMessage])
  return <FormContext.Provider value={ctxVal}><View style={style} {...rest}>{children}{isText(footer) ? renderTextOrNode(footer, []) : footer}</View></FormContext.Provider>
}

const InternalFormRef = React.forwardRef<FormInstance, FormProps>(InternalFormImpl)
const InternalForm = React.memo(InternalFormRef)

export const useWatch = (name?: NamePath | NamePath[], formRef?: React.MutableRefObject<FormInstance | null>) => {
  const ctx = useContext(FormContext); const nPaths = name === undefined ? undefined : !Array.isArray(name) ? [name] : name.length && isText(name[0]) ? [name as NamePath] : (name as NamePath[])
  const getValue = useCallback((allValues?: Record<string, unknown>) => { const src = allValues ?? ctx?.getFieldsValue?.() ?? formRef?.current?.getFieldsValue?.() ?? {}; if (!nPaths) return src; if (nPaths.length === 1) return getValueByName(src, nPaths[0]); const picked: Record<string, unknown> = {}; for (const k of nPaths) picked[serializeNamePath(k)] = getValueByName(src, k); return picked }, [ctx, formRef, nPaths])
  const [val, setVal] = useState(() => getValue()); useEffect(() => { if (!ctx?.subscribe) return undefined; return ctx.subscribe((ch, all) => { if (FORM_ALL_FIELDS_KEY in ch) { setVal(getValue(all)); return }; if (!nPaths || nPaths.some(k => serializeNamePath(k) in ch)) setVal(getValue(all)) }) }, [ctx, getValue, nPaths]); useEffect(() => { setVal(getValue()) }, [getValue]); return val
}

export const FormSubscribe: React.FC<FormSubscribeProps> = ({ to, children }) => {
  const ctx = useContext(FormContext); const [chVals, setChVals] = useState<Record<string, unknown>>({}); useEffect(() => { if (!ctx?.subscribe) return undefined; return ctx.subscribe(n => { if (to && !(FORM_ALL_FIELDS_KEY in n) && !Object.keys(n).some(k => to.includes(k))) return; setChVals(n) }) }, [ctx, to]); return <>{children(chVals, ctx?.form || null)}</>
}

export default InternalForm
