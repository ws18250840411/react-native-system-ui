import React, { useContext, useEffect, useRef, useState } from 'react'

import { isFunction, isString } from '../../utils'
import { FormContext } from './FormContext'
import type { FormItemProps, FormItemRule } from './types'
import { FORM_ALL_FIELDS_KEY, normalizeTrigger, serializeNamePath } from './utils'

export type { FormItemProps, FormItemRule } from './types'

const EMPTY_RULES: FormItemRule[] = []
const EMPTY_VALUES: Record<string, unknown> = {}

const FormItemImpl: React.FC<FormItemProps> = ({
  name,
  label,
  description,
  intro,
  tooltip,
  rules,
  dependencies,
  valuePropName = 'value',
  trigger = 'onChangeText',
  validateTrigger,
  showValidateMessage,
  required,
  shouldUpdate,
  initialValue,
  children,
}) => {
  const renderProps = typeof children === 'function'
  const context = useContext(FormContext)
  const normalizedRules = rules ?? EMPTY_RULES
  const nameKey = name ? serializeNamePath(name) : undefined
  const subscribeAll = renderProps && !nameKey && !shouldUpdate
  const prevValuesRef = useRef<Record<string, unknown>>(EMPTY_VALUES)
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (!context?.subscribe) return undefined
    return context.subscribe((changed, all) => {
      if (FORM_ALL_FIELDS_KEY in changed) { forceUpdate(v => v + 1); return }
      if (subscribeAll) { forceUpdate(v => v + 1); return }
      if (shouldUpdate) {
        if (shouldUpdate(prevValuesRef.current, all)) forceUpdate(v => v + 1)
        return
      }
      if (nameKey && nameKey in changed) forceUpdate(v => v + 1)
    })
  }, [context, nameKey, shouldUpdate, subscribeAll])

  const currentValues = context?.getFieldsValue() ?? EMPTY_VALUES
  useEffect(() => {
    prevValuesRef.current = currentValues
  }, [currentValues])

  useEffect(() => {
    if (!name || !context) return undefined
    return context.registerField(name, {
      rules: normalizedRules,
      dependencies,
      initialValue,
      validateTrigger: validateTrigger ?? trigger,
    })
  }, [context, name, normalizedRules, dependencies, initialValue, validateTrigger, trigger])

  if (!context) {
    if (renderProps) return <>{children({ getFieldValue: () => undefined, getFieldsValue: () => EMPTY_VALUES, form: null })}</>
    return <>{children}</>
  }

  const shouldRender = !shouldUpdate || shouldUpdate(prevValuesRef.current, currentValues)
  const mergedValue = name ? context.getFieldValue(name) : undefined
  const mergedShowMessage = showValidateMessage ?? context.showValidateMessage ?? true
  const fieldErrors = name ? context.getFieldError(name) : undefined
  const firstError = mergedShowMessage ? fieldErrors?.[0] : undefined
  const mergedRequired = required ?? normalizedRules.some(rule => rule.required)
  const mergedValidateTriggers = normalizeTrigger(validateTrigger ?? trigger)

  if (renderProps) {
    if (!shouldRender) return null
    return <>{children({ getFieldValue: context.getFieldValue, getFieldsValue: context.getFieldsValue, form: context.form || null })}</>
  }

  if (!name) return <>{children}</>
  if (!shouldRender) return null

  const childArray = React.Children.toArray(children)
  if (childArray.length !== 1) return <>{children}</>

  const child = childArray[0] as React.ReactElement<Record<string, unknown>>

  const handleChange = (next: unknown) => {
    context.setFieldValue(name, next, trigger)
    const original = (child.props as Record<string, unknown>)[trigger]
    if (isFunction(original)) original(next)
  }

  const displayName = (child.type as unknown as { displayName?: string }).displayName
  const isFieldLike = isString(displayName) && (displayName.includes('Field') || displayName.includes('Input'))

  const resolveValue = () => {
    const childValue = (child.props as Record<string, unknown>)[valuePropName]
    if (childValue !== undefined) return childValue
    if (mergedValue !== undefined) return mergedValue
    if (isFieldLike && valuePropName === 'value') return ''
    return mergedValue
  }

  const injectedProps: Record<string, unknown> = {
    [valuePropName]: resolveValue(),
    [trigger]: handleChange,
  }

  mergedValidateTriggers.forEach(eventName => {
    if (!eventName || eventName === trigger) return
    const original = (child.props as Record<string, unknown>)[eventName]
    injectedProps[eventName] = (...args: unknown[]) => {
      if (isFunction(original)) original(...args)
      context.validateField(name, eventName)
    }
  })

  const cp = child.props
  if (label !== undefined && cp.label === undefined) injectedProps.label = label
  if (context.colon !== undefined && injectedProps.label !== undefined && cp.colon === undefined) injectedProps.colon = context.colon
  if (context.labelWidth !== undefined && cp.labelWidth === undefined) injectedProps.labelWidth = context.labelWidth
  if (description && cp.description === undefined) injectedProps.description = description
  if (intro && cp.intro === undefined) injectedProps.intro = intro
  if (tooltip && cp.tooltip === undefined) injectedProps.tooltip = tooltip
  if (mergedRequired && cp.required === undefined) injectedProps.required = true
  if (firstError && cp.errorMessage === undefined) { injectedProps.error = true; injectedProps.errorMessage = firstError }

  return React.cloneElement(child, injectedProps)
}

FormItemImpl.displayName = 'FormItem'

export const FormItem = React.memo(FormItemImpl)
