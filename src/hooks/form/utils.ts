import { isPromiseLike } from '../../utils/promise'
import { isNumber, isString } from '../../utils/validate'
import type { FormItemRule, NamePath } from '../../components/form/types'

export const normalizeTrigger = (trigger?: string | string[]) => trigger ? (Array.isArray(trigger) ? trigger : [trigger]) : []
export const toNamePath = (name?: NamePath): (string | number)[] => { if (name === undefined || name === null) return []; if (Array.isArray(name)) return name; if (isNumber(name)) return [name]; if (isString(name)) return name.split('.'); return [String(name)] }
export const serializeNamePath = (name?: NamePath): string => toNamePath(name).join('.')
export const getValueByName = (source: unknown, name: NamePath): unknown => toNamePath(name).reduce<unknown>((acc, key) => { if (acc == null) return acc; const k = String(key); if (Array.isArray(acc)) { const i = Number(k); return Number.isFinite(i) ? acc[i] : (acc as unknown as Record<string, unknown>)[k] }; return typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined }, source)
export const setValueByName = (source: Record<string, unknown>, name: NamePath, value: unknown): Record<string, unknown> => { const path = toNamePath(name); if (!path.length) return source; const clone = Array.isArray(source) ? [...source] : typeof source === 'object' && source !== null ? { ...(source as Record<string, unknown>) } : {}; let cursor: Record<string, unknown> | unknown[] = clone as Record<string, unknown> | unknown[]; path.forEach((key, index) => { const k = String(key), ki = Number(k); if (index === path.length - 1) { if (Array.isArray(cursor) && Number.isFinite(ki)) cursor[ki] = value; else (cursor as unknown as Record<string, unknown>)[k] = value; return }; const nv = Array.isArray(cursor) && Number.isFinite(ki) ? cursor[ki] : (cursor as unknown as Record<string, unknown>)[k]; const nc = nv === undefined || nv === null ? (isNumber(path[index + 1]) ? [] : {}) : Array.isArray(nv) ? [...nv] : typeof nv === 'object' ? { ...(nv as Record<string, unknown>) } : {}; if (Array.isArray(cursor) && Number.isFinite(ki)) cursor[ki] = nc; else (cursor as unknown as Record<string, unknown>)[k] = nc; cursor = nc as Record<string, unknown> | unknown[] }); return clone as Record<string, unknown> }

export const runRuleValidation = (rule: FormItemRule, value: unknown, values: Record<string, unknown>, fallbackMsg?: string): string | null | Promise<string | null> => {
  const msg = rule.message ?? fallbackMsg ?? 'Validation failed'; const empty = value == null || value === '' || (Array.isArray(value) && value.length === 0)
  if (rule.required && (empty || (rule.whitespace && isString(value) && value.trim().length === 0))) return msg
  if (empty) return null
  if (rule.pattern && isString(value) && !rule.pattern.test(value)) return msg
  if (rule.len !== undefined || rule.min !== undefined || rule.max !== undefined) { const len = isNumber(value) ? value : isString(value) || Array.isArray(value) ? value.length : 0; if (rule.len !== undefined && len !== rule.len) return msg; if (rule.min !== undefined && len < rule.min) return msg; if (rule.max !== undefined && len > rule.max) return msg }
  if (!rule.validator) return null
  const handleResult = (r: unknown) => isString(r) ? r : r === false ? msg : null
  const res = rule.validator(value, values); return isPromiseLike(res) ? res.then(handleResult) : handleResult(res)
}
