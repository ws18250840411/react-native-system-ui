import React from 'react'

import { isFunction, isString } from '../../utils'
import { FormContext } from './FormContext'
import type { FormItemProps, FormItemRule } from './types'
import { normalizeTrigger } from './utils'

export type { FormItemProps, FormItemRule } from './types'

const EMPTY_RULES: FormItemRule[] = []

export const FormItem: React.FC<FormItemProps> = ({
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
  const context = React.useContext(FormContext)

  if (!context) {
    if (renderProps) {
      return (
        <>
          {children({
            getFieldValue: () => undefined,
            getFieldsValue: () => ({}),
            form: null,
          })}
        </>
      )
    }
    return <>{children}</>
  }

  const normalizedRules = rules ?? EMPTY_RULES
  const prevValuesRef = React.useRef<Record<string, unknown>>(context.values)

  React.useEffect(() => {
    prevValuesRef.current = context.values
  }, [context.values])

  const shouldRender = !shouldUpdate || shouldUpdate(prevValuesRef.current, context.values)

  React.useEffect(() => {
    if (!name) return undefined
    return context.registerField(name, {
      rules: normalizedRules,
      dependencies,
      initialValue,
      validateTrigger: validateTrigger ?? trigger,
    })
  }, [context.registerField, name, normalizedRules, dependencies, initialValue, validateTrigger, trigger])

  const mergedValue = name ? context.getFieldValue(name) : undefined
  const mergedShowMessage = showValidateMessage ?? context.showValidateMessage ?? true
  const fieldErrors = name ? context.getFieldError(name) : undefined
  const firstError = mergedShowMessage ? fieldErrors?.[0] : undefined
  const mergedRequired = required ?? normalizedRules.some(rule => rule.required)
  const mergedValidateTriggers = normalizeTrigger(validateTrigger ?? trigger)

  if (renderProps) {
    if (!shouldRender) return null
    const node = children({
      getFieldValue: context.getFieldValue,
      getFieldsValue: context.getFieldsValue,
      form: context.form ?? null,
    })
    return <>{node}</>
  }

  if (!name) {
    return <>{children}</>
  }

  if (!shouldRender) return null

  const childArray = React.Children.toArray(children)
  if (childArray.length !== 1) {
    return <>{children}</>
  }

  const child = childArray[0] as React.ReactElement<Record<string, unknown>>

  const handleChange = (next: unknown) => {
    context.setFieldValue(name, next, trigger)
    const original = (child.props as Record<string, unknown>)[trigger]
    if (isFunction(original)) {
      original(next)
    }
  }

  const isFieldLike =
    (() => {
      const displayName = (child.type as unknown as { displayName?: string }).displayName
      return (
        isString(displayName) &&
        (displayName.includes('Field') || displayName.includes('Input'))
      )
    })()

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
      if (isFunction(original)) {
        original(...args)
      }
      context.validateField(name, eventName)
    }
  })

  if (label !== undefined && child.props.label === undefined) {
    injectedProps.label = label
  }
  if (context.colon !== undefined && injectedProps.label !== undefined && child.props.colon === undefined) {
    injectedProps.colon = context.colon
  }
  if (context.labelWidth !== undefined && child.props.labelWidth === undefined) {
    injectedProps.labelWidth = context.labelWidth
  }
  if (description && child.props.description === undefined) {
    injectedProps.description = description
  }
  if (intro && child.props.intro === undefined) {
    injectedProps.intro = intro
  }
  if (tooltip && child.props.tooltip === undefined) {
    injectedProps.tooltip = tooltip
  }
  if (mergedRequired && child.props.required === undefined) {
    injectedProps.required = true
  }
  if (firstError && child.props.errorMessage === undefined) {
    injectedProps.error = true
    injectedProps.errorMessage = firstError
  }

  return React.cloneElement(child, injectedProps)
}

FormItem.displayName = 'FormItem'
