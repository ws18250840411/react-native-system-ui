import React, { useContext, useEffect, useRef, useState } from 'react'
import { FormContext, FORM_ALL_FIELDS_KEY, getValueByName, serializeNamePath } from './Form'
import type { NamePath } from './types'

export interface FormListField { name: number; key: number; isListField: true }
export interface FormListOperation { add: (defaultValue?: unknown, index?: number) => void; remove: (index: number) => void; move: (from: number, to: number) => void }
export interface FormListProps { name: NamePath; initialValue?: unknown[]; children: (fields: FormListField[], operation: FormListOperation) => React.ReactNode }

const getList = (context: { getFieldsValue: () => Record<string, unknown> }, name: NamePath): unknown[] => { const raw = getValueByName(context.getFieldsValue(), name); return Array.isArray(raw) ? raw : [] }

export const FormList: React.FC<FormListProps> = ({ name, initialValue, children }) => {
  const ctx = useContext(FormContext); const keyCounterRef = useRef(0); const keysRef = useRef<number[]>([]); const nKey = serializeNamePath(name); const [listValue, setListValue] = useState<unknown[]>(() => ctx ? getList(ctx, name) : [])
  const syncKeys = (len: number) => { const k = keysRef.current; while (k.length < len) k.push(keyCounterRef.current++); if (k.length > len) keysRef.current = k.slice(0, len) }
  useEffect(() => { if (ctx && getValueByName(ctx.getFieldsValue(), name) === undefined && initialValue !== undefined) ctx.setFieldValue(name, initialValue) }, [ctx, initialValue, name]); useEffect(() => { if (!ctx?.subscribe) return undefined; return ctx.subscribe((ch, all) => { if (FORM_ALL_FIELDS_KEY in ch || nKey in ch) { const next = getValueByName(all, name); const nl = Array.isArray(next) ? next : []; syncKeys(nl.length); setListValue(nl) } }) }, [ctx, name, nKey])
  const add = (defaultValue?: unknown, index?: number) => { if (!ctx) return; const a = getList(ctx, name); const i = typeof index === 'number' ? index : a.length; const next = [...a]; next.splice(i, 0, defaultValue); keysRef.current.splice(i, 0, keyCounterRef.current++); ctx.setFieldValue(name, next) }; const remove = (index: number) => { if (!ctx) return; const a = getList(ctx, name); if (index < 0 || index >= a.length) return; keysRef.current.splice(index, 1); ctx.setFieldValue(name, a.slice(0, index).concat(a.slice(index + 1))) }; const move = (from: number, to: number) => { if (!ctx) return; const a = getList(ctx, name); if (from === to || from < 0 || to < 0 || from >= a.length || to >= a.length) return; const next = [...a]; const item = next.splice(from, 1)[0]; next.splice(to, 0, item); const [movedKey] = keysRef.current.splice(from, 1); keysRef.current.splice(to, 0, movedKey); ctx.setFieldValue(name, next) }
  if (!ctx) return null; syncKeys(listValue.length); const fields: FormListField[] = listValue.map((_, i) => ({ name: i, key: keysRef.current[i], isListField: true })); return <>{children(fields, { add, remove, move })}</>
}
FormList.displayName = 'Form.List'
