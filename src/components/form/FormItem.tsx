import React, { useContext, useEffect, useRef, useState } from 'react'
import { isFunction, isString } from '../../utils'
import { FormContext } from './FormContext'
import type { FormItemProps, FormItemRule } from './types'
import { FORM_ALL_FIELDS_KEY, normalizeTrigger, serializeNamePath } from './utils'

export type { FormItemProps, FormItemRule } from './types'

const EMPTY_RULES: FormItemRule[] = []
const EMPTY_VALUES: Record<string, unknown> = {}

const FormItemImpl: React.FC<FormItemProps> = ({ name, label, description, intro, tooltip, rules, dependencies, valuePropName = 'value', trigger = 'onChangeText', validateTrigger, showValidateMessage, required, shouldUpdate, initialValue, children }) => {
  const renderProps = typeof children === 'function'
  const ctx = useContext(FormContext)
  const normalizedRules = rules ?? EMPTY_RULES
  const nameKey = name ? serializeNamePath(name) : undefined
  const shouldAlwaysUpdate = renderProps && !nameKey && !shouldUpdate
  const previousValuesRef = useRef<Record<string, unknown>>(EMPTY_VALUES)
  const [, forceUpdate] = useState(0)
  useEffect(() => {
    if (!ctx?.subscribe) return undefined
    return ctx.subscribe((changedValues, all) => {
      if (FORM_ALL_FIELDS_KEY in changedValues) { forceUpdate(v => v + 1); return }
      if (shouldAlwaysUpdate) { forceUpdate(v => v + 1); return }
      if (shouldUpdate) {
        if (shouldUpdate(previousValuesRef.current, all)) forceUpdate(v => v + 1)
        return
      }
      if (nameKey && nameKey in changedValues) forceUpdate(v => v + 1)
    })
  }, [ctx, nameKey, shouldUpdate, shouldAlwaysUpdate])
  const currentValues = ctx?.getFieldsValue() ?? EMPTY_VALUES
  useEffect(() => { previousValuesRef.current = currentValues }, [currentValues])
  useEffect(() => {
    if (!name || !ctx) return undefined
    return ctx.registerField(name, { rules: normalizedRules, dependencies, initialValue, validateTrigger: validateTrigger ?? trigger })
  }, [ctx, name, normalizedRules, dependencies, initialValue, validateTrigger, trigger])
  if (!ctx) {
    if (renderProps) return <>{children({ getFieldValue: () => undefined, getFieldsValue: () => EMPTY_VALUES, form: null })}</>
    return <>{children}</>
  }
  const shouldRender = !shouldUpdate || shouldUpdate(previousValuesRef.current, currentValues)
  const modelValue = name ? ctx.getFieldValue(name) : undefined
  const mergedShowValidateMessage = showValidateMessage ?? ctx.showValidateMessage ?? true
  const fieldErrors = name ? ctx.getFieldError(name) : undefined
  const fieldError = mergedShowValidateMessage ? fieldErrors?.[0] : undefined
  const mergedRequired = required ?? normalizedRules.some(r => r.required)
  const mergedValidateTrigger = normalizeTrigger(validateTrigger ?? trigger)
  if (renderProps) {
    if (!shouldRender) return null
    return <>{children({ getFieldValue: ctx.getFieldValue, getFieldsValue: ctx.getFieldsValue, form: ctx.form || null })}</>
  }
  if (!name) return <>{children}</>
  if (!shouldRender) return null
  const childrenArray = React.Children.toArray(children)
  if (childrenArray.length !== 1) return <>{children}</>
  const child = childrenArray[0] as React.ReactElement<Record<string, unknown>>
  const handleChange = (next: unknown) => {
    ctx.setFieldValue(name, next, trigger)
    const original = (child.props as Record<string, unknown>)[trigger]
    if (isFunction(original)) original(next)
  }
  const displayName = (child.type as unknown as { displayName?: string }).displayName
  const isFieldLike = isString(displayName) && (displayName.includes('Field') || displayName.includes('Input'))
  const resolvedValue = () => {
    const childValue = (child.props as Record<string, unknown>)[valuePropName]
    if (childValue !== undefined) return childValue
    if (modelValue !== undefined) return modelValue
    if (isFieldLike && valuePropName === 'value') return ''
    return modelValue
  }
  const injectedProps: Record<string, unknown> = { [valuePropName]: resolvedValue(), [trigger]: handleChange }
  mergedValidateTrigger.forEach(eventName => {
    if (!eventName || eventName === trigger) return
    const original = (child.props as Record<string, unknown>)[eventName]
    injectedProps[eventName] = (...args: unknown[]) => {
      if (isFunction(original)) original(...args)
      ctx.validateField(name, eventName)
    }
  })
  const childProps = child.props
  if (label !== undefined && childProps.label === undefined) injectedProps.label = label
  if (ctx.colon !== undefined && injectedProps.label !== undefined && childProps.colon === undefined) injectedProps.colon = ctx.colon
  if (ctx.labelWidth !== undefined && childProps.labelWidth === undefined) injectedProps.labelWidth = ctx.labelWidth
  if (description && childProps.description === undefined) injectedProps.description = description
  if (intro && childProps.intro === undefined) injectedProps.intro = intro
  if (tooltip && childProps.tooltip === undefined) injectedProps.tooltip = tooltip
  if (mergedRequired && childProps.required === undefined) injectedProps.required = true
  if (fieldError && childProps.errorMessage === undefined) { injectedProps.error = true; injectedProps.errorMessage = fieldError }
  return React.cloneElement(child, injectedProps)
}

FormItemImpl.displayName = 'FormItem'
export const FormItem = React.memo(FormItemImpl)
export default FormItem
