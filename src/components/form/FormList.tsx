import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { FormContext } from './FormContext'
import { FORM_ALL_FIELDS_KEY, getValueByName, serializeNamePath } from './utils'
import type { NamePath } from './types'

export interface FormListField {
  name: number
  key: number
  isListField: true
}

export interface FormListOperation {
  add: (defaultValue?: unknown, index?: number) => void
  remove: (index: number) => void
  move: (from: number, to: number) => void
}

export interface FormListProps {
  name: NamePath
  initialValue?: unknown[]
  children: (fields: FormListField[], operation: FormListOperation) => React.ReactNode
}

const getList = (context: { getFieldsValue: () => Record<string, unknown> }, name: NamePath): unknown[] => {
  const raw = getValueByName(context.getFieldsValue(), name)
  return Array.isArray(raw) ? raw : []
}

export const FormList: React.FC<FormListProps> = ({ name, initialValue, children }) => {
  const context = useContext(FormContext)
  const keyRef = useRef(0)
  const nameKey = serializeNamePath(name)
  const [listValue, setListValue] = useState<unknown[]>(() => context ? getList(context, name) : [])

  const ensureInitial = useCallback(() => {
    if (!context) return
    if (getValueByName(context.getFieldsValue(), name) === undefined && initialValue !== undefined) {
      context.setFieldValue(name, initialValue)
    }
  }, [context, initialValue, name])

  useEffect(() => {
    ensureInitial()
  }, [ensureInitial])

  useEffect(() => {
    if (!context?.subscribe) return undefined
    return context.subscribe((changed, all) => {
      if (FORM_ALL_FIELDS_KEY in changed || nameKey in changed) {
        const nextRaw = getValueByName(all, name)
        setListValue(Array.isArray(nextRaw) ? nextRaw : [])
      }
    })
  }, [context, name, nameKey])

  const add = useCallback((defaultValue?: unknown, index?: number) => {
    if (!context) return
    const arr = getList(context, name)
    const insertIndex = typeof index === 'number' ? index : arr.length
    const next = [...arr]
    next.splice(insertIndex, 0, defaultValue)
    context.setFieldValue(name, next)
    keyRef.current += 1
  }, [context, name])

  const remove = useCallback((index: number) => {
    if (!context) return
    const arr = getList(context, name)
    if (index < 0 || index >= arr.length) return
    context.setFieldValue(name, arr.slice(0, index).concat(arr.slice(index + 1)))
  }, [context, name])

  const move = useCallback((from: number, to: number) => {
    if (!context) return
    const arr = getList(context, name)
    if (from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) return
    const next = [...arr]
    const item = next.splice(from, 1)[0]
    next.splice(to, 0, item)
    context.setFieldValue(name, next)
  }, [context, name])

  if (!context) return null

  const fields: FormListField[] = listValue.map((_, index) => ({
    name: index,
    key: keyRef.current + index,
    isListField: true,
  }))

  return <>{children(fields, { add, remove, move })}</>
}

FormList.displayName = 'Form.List'
