import React, { useCallback, useId, useImperativeHandle, useMemo, useRef, useState } from 'react'
import {
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native'
import type { TextInputProps } from 'react-native'
import { Clear, QuestionO } from 'react-native-system-icon'

import Cell from '../cell'
import Dialog from '../dialog'
import { formatNumberInput } from '../../utils/string'
import { isDef, isFiniteNumber, isFunction, isObject, isRenderable, isText } from '../../utils/validate'
import type { FieldInstance, FieldProps, FieldTooltipProps } from './types'
import { useFieldTokens } from './tokens'
import type { DialogShowOptions } from '../dialog'
import { alignMap, mapKeyboardType } from './utils'

export const Field = React.forwardRef<FieldInstance, FieldProps>((props, ref) => {
  const {
    tokensOverride,
    label,
    labelWidth: labelWidthProp,
    labelAlign: labelAlignProp,
    inputAlign: inputAlignProp,
    controlAlign: controlAlignProp,
    required = false,
    colon = false,
    intro,
    description,
    tooltip,
    error = false,
    errorMessage,
    errorMessageAlign = 'left',
    disabled = false,
    readOnly = false,
    clearable = false,
    clearTrigger: clearTriggerProp,
    clearIcon,
    leftIcon,
    rightIcon,
    prefix,
    suffix: suffixProp,
    button,
    extra,
    value: valueProp,
    defaultValue = '',
    type = 'text',
    rows: rowsProp,
    autoSize = false,
    formatter,
    formatTrigger: formatTriggerProp,
    showWordLimit = false,
    onOverlimit,
    onClear,
    onClick,
    onClickInput,
    onClickLeftIcon,
    onClickRightIcon,
    border,
    center,
    clickable,
    isLink,
    arrowDirection,
    size,
    titleStyle,
    contentStyle,
    inputStyle,
    labelStyle,
    introStyle,
    errorMessageStyle,
    style,
    androidRipple,
    children,
    placeholderTextColor,
    onFocus,
    onBlur,
    onPressIn,
    onChangeText,
    maxLength,
    ...restInputProps
  } = props

  const tokens = useFieldTokens(tokensOverride)

  const labelWidth = labelWidthProp ?? tokens.defaults.labelWidth
  const labelAlign = labelAlignProp ?? tokens.defaults.labelAlign
  const inputAlign = inputAlignProp ?? tokens.defaults.inputAlign
  const controlAlign = controlAlignProp ?? tokens.defaults.controlAlign
  const clearTrigger = clearTriggerProp ?? tokens.defaults.clearTrigger
  const rows = rowsProp ?? tokens.defaults.rows
  const formatTrigger = formatTriggerProp ?? tokens.defaults.formatTrigger

  const mergedTitleStyle = useMemo(
    () => [
      {
        width: labelWidth,
        minWidth: labelWidth,
        maxWidth: labelWidth,
        flexBasis: labelWidth,
        marginRight: tokens.spacing.labelGap,
        flexShrink: 0,
        flexGrow: 0,
      },
      titleStyle,
    ],
    [labelWidth, titleStyle, tokens.spacing.labelGap],
  )

  const resolvedSuffix = suffixProp ?? button
  const resolvedDescription = intro ?? description
  const resolvedPlaceholderColor =
    placeholderTextColor ?? (disabled ? tokens.colors.disabled : tokens.colors.placeholder)

  const isTextarea = type === 'textarea'
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = isControlled ? valueProp ?? '' : internalValue
  const [focused, setFocused] = useState(false)
  const [pressingClear, setPressingClear] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const introId = useId()
  const errorId = useId()
  const describedBy = useMemo(() => {
    const ids = [
      isRenderable(errorMessage) ? errorId : null,
      isRenderable(resolvedDescription) ? introId : null,
    ].filter(Boolean) as string[]
    return ids.length ? ids : undefined
  }, [errorId, errorMessage, introId, resolvedDescription])

  const lineHeight = tokens.defaults.textareaLineHeight
  const autoSizeConfig = autoSize && isObject(autoSize) ? autoSize : undefined
  const minRows = !isTextarea
    ? 1
    : autoSizeConfig && isDef(autoSizeConfig.minRows)
      ? Math.max(1, autoSizeConfig.minRows!)
      : Math.max(1, rows)
  const maxRows =
    !isTextarea
      ? undefined
      : autoSizeConfig && isDef(autoSizeConfig.maxRows)
        ? Math.max(1, autoSizeConfig.maxRows!)
        : undefined

  const minHeight = isTextarea
    ? Math.max(tokens.sizes.textareaMinHeight, minRows * lineHeight)
    : undefined
  const maxHeight = isTextarea && maxRows ? Math.max(tokens.sizes.textareaMinHeight, maxRows * lineHeight) : undefined
  const [textareaHeight, setTextareaHeight] = useState<number | undefined>(minHeight)

  const formatValue = useCallback(
    (inputValue: string, trigger: 'onChange' | 'onBlur' = 'onChange') =>
      formatter && trigger === formatTrigger ? formatter(inputValue) : inputValue,
    [formatTrigger, formatter],
  )

  const updateValue = useCallback(
    (next: string, trigger: 'onChange' | 'onBlur' = 'onChange') => {
      const formatted = formatValue(next, trigger)
      if (!isControlled) {
        setInternalValue(formatted)
      }
      onChangeText?.(formatted)
    },
    [formatValue, isControlled, onChangeText],
  )

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => updateValue(''),
      get nativeElement() {
        return inputRef.current
      },
    }),
  )

  const finalTextAlign = controlAlign !== 'left' ? controlAlign : inputAlign

  const showClear =
    clearable &&
    !readOnly &&
    (value ?? '') !== '' &&
    (clearTrigger === 'always' ||
      (clearTrigger === 'focus' && (focused || pressingClear)))

  const handleChangeText = useCallback((text: string) => {
    let next = text ?? ''

    if (type === 'number' || type === 'digit') {
      const allowDot = type === 'number'
      next = formatNumberInput(next, allowDot, allowDot)
    }

    if (isFiniteNumber(maxLength) && maxLength >= 0 && next.length > maxLength) {
      onOverlimit?.(next)
      next = next.slice(0, maxLength)
    }

    updateValue(next, 'onChange')
  }, [maxLength, onOverlimit, type, updateValue])

  const handleFocus = useCallback((event: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
    setFocused(true)
    onFocus?.(event)
    if (readOnly) {
      inputRef.current?.blur()
    }
  }, [onFocus, readOnly])

  const handleBlur = useCallback((event: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
    updateValue(value ?? '', 'onBlur')
    setFocused(false)
    onBlur?.(event)
  }, [onBlur, updateValue, value])

  const handlePressIn = useCallback((event: Parameters<NonNullable<TextInputProps['onPressIn']>>[0]) => {
    onPressIn?.(event)
    onClickInput?.()
  }, [onClickInput, onPressIn])

  const handleContentSizeChange = useCallback((event: { nativeEvent: { contentSize: { height: number } } }) => {
    if (!isTextarea) return
    const contentHeight = event.nativeEvent.contentSize?.height ?? 0
    if (!contentHeight) return

    let nextHeight = contentHeight
    if (autoSize) {
      nextHeight = Math.max(minHeight ?? contentHeight, contentHeight)
      if (maxHeight) {
        nextHeight = Math.min(nextHeight, maxHeight)
      }
    } else if (minHeight) {
      nextHeight = Math.max(minHeight, contentHeight)
    }
    setTextareaHeight(nextHeight)
  }, [autoSize, isTextarea, maxHeight, minHeight])

  const handleClear = useCallback(() => {
    updateValue('')
    inputRef.current?.clear?.()
    inputRef.current?.focus?.()
    onClear?.()
  }, [onClear, updateValue])

  const renderLabel = () => {
    if (!isRenderable(label)) return null
    const isPlain = isText(label)

    const content = isPlain ? (
      <Text
        style={[
          {
            color: disabled ? tokens.colors.disabled : tokens.colors.label,
            fontSize: tokens.typography.labelSize,
            textAlign: labelAlign,
          },
          labelStyle,
        ]}
        numberOfLines={1}
      >
        {label}
        {colon ? ':' : ''}
      </Text>
    ) : (
      label
    )

    return (
      <View style={tokens.layout.labelRow}>
        {content}
        {isRenderable(tooltip) ? renderTooltip() : null}
      </View>
    )
  }

  const renderTooltip = () => {
    if (!isRenderable(tooltip)) return null
    const defaultIcon = (
      <QuestionO size={tokens.sizes.icon} fill={tokens.colors.tooltip} color={tokens.colors.tooltip} />
    )
    let icon: React.ReactNode = defaultIcon
    let dialogProps: DialogShowOptions = { message: tooltip as React.ReactNode }

    if (!React.isValidElement(tooltip) && !isText(tooltip)) {
      const { icon: customIcon, ...rest } = tooltip as FieldTooltipProps
      icon = customIcon ?? defaultIcon
      dialogProps = rest as DialogShowOptions
    }

    return (
      <Pressable
        style={[tokens.layout.tooltip, { marginLeft: tokens.spacing.rightIconGap }]}
        onPress={() => Dialog.show(dialogProps)}
        accessibilityRole="button"
      >
        {icon}
      </Pressable>
    )
  }

  const renderLeftIcon = () => {
    if (!leftIcon) return null
    const content = (
      <View
        style={[
          tokens.layout.leftIcon,
          {
            marginRight: tokens.spacing.leftIconGap,
            minWidth: tokens.sizes.icon,
          },
        ]}
      >
        {leftIcon}
      </View>
    )
    if (!onClickLeftIcon) return content
    return (
      <Pressable onPress={onClickLeftIcon} accessibilityRole="button">
        {content}
      </Pressable>
    )
  }

  const renderRightIcon = () => {
    if (!rightIcon) return null
    const node = (
      <View
        style={[
          tokens.layout.rightIcon,
          {
            paddingHorizontal: tokens.spacing.rightIconGap,
          },
        ]}
      >
        {rightIcon}
      </View>
    )
    if (!onClickRightIcon) return node
    return (
      <Pressable onPress={onClickRightIcon} accessibilityRole="button">
        {node}
      </Pressable>
    )
  }

  const renderClearIcon = () => {
    if (!showClear) return null
    const webMouseDownProps =
      Platform.OS === 'web'
        ? ({
          onMouseDown: (event: { preventDefault?: () => void; stopPropagation?: () => void }) => {
            event.preventDefault?.()
            event.stopPropagation?.()
          },
        } as unknown as React.ComponentProps<typeof Pressable>)
        : undefined
    return (
      <Pressable
        style={[
          tokens.layout.clearIcon,
          {
            paddingHorizontal: tokens.spacing.rightIconGap,
          },
        ]}
        {...webMouseDownProps}
        onPressIn={() => setPressingClear(true)}
        onPressOut={() => setPressingClear(false)}
        onPress={handleClear}
        accessibilityRole="button"
      >
        {React.isValidElement(clearIcon)
          ? clearIcon
          : <Clear size={tokens.sizes.clearIcon} fill={tokens.colors.clear} color={tokens.colors.clear} />}
      </Pressable>
    )
  }

  const renderControl = () => {
    if (isRenderable(children)) {
      return <View style={[tokens.layout.children, { minHeight: tokens.sizes.controlMinHeight }]}>{children}</View>
    }

    const inputStyles = [
      isTextarea ? tokens.layout.textarea : tokens.layout.input,
      {
        color: disabled ? tokens.colors.disabled : error ? tokens.colors.error : tokens.colors.input,
        fontSize: tokens.typography.inputSize,
        textAlign: finalTextAlign,
        ...(isTextarea
          ? {
            lineHeight,
            height: textareaHeight,
            minHeight,
          }
          : {
            minHeight: tokens.sizes.controlMinHeight,
          }),
      },
      inputStyle,
    ]

    return (
      <TextInput
        ref={inputRef}
        style={inputStyles}
        value={value}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPressIn={handlePressIn}
        editable={!disabled && !readOnly}
        secureTextEntry={type === 'password'}
        multiline={isTextarea}
        numberOfLines={isTextarea ? rows : undefined}
        keyboardType={restInputProps.keyboardType ?? mapKeyboardType(type)}
        placeholderTextColor={resolvedPlaceholderColor}
        onContentSizeChange={isTextarea ? handleContentSizeChange : undefined}
        // @ts-ignore
        accessibilityDescribedBy={describedBy}
        clearButtonMode="never"
        {...restInputProps}
      />
    )
  }

  const renderWordLimit = () => {
    if (!showWordLimit || maxLength === undefined || maxLength === null) {
      return null
    }
    const currentCount = (value ?? '').length
    const content = isFunction(showWordLimit)
      ? showWordLimit({ currentCount, maxLength })
      : `${currentCount}/${maxLength}`

    if (content === null || content === false) return null

    if (isText(content)) {
      return (
        <Text
          style={[
            tokens.layout.wordLimit,
            {
              color: tokens.colors.wordLimit,
              fontSize: tokens.typography.wordLimitSize ?? 12,
              textAlign: 'right',
              alignSelf: 'flex-end',
              marginTop: tokens.spacing.wordLimitMarginTop,
            },
          ]}
        >
          {content}
        </Text>
      )
    }

    return content
  }

  const renderMessage = () => {
    if (!isRenderable(errorMessage)) return null
    if (isText(errorMessage)) {
      return (
        <Text
          nativeID={errorId}
          style={[
            tokens.layout.message,
            {
              color: tokens.colors.error,
              fontSize: tokens.typography.messageSize,
              textAlign: errorMessageAlign,
              marginTop: tokens.spacing.messageMarginTop,
            },
            errorMessageStyle,
          ]}
          accessibilityLiveRegion="polite"
        >
          {errorMessage}
        </Text>
      )
    }
    return (
      <View
        nativeID={errorId}
        style={[
          tokens.layout.message,
          {
            alignSelf: alignMap[errorMessageAlign],
            marginTop: tokens.spacing.messageMarginTop,
          },
        ]}
        accessibilityLiveRegion="polite"
      >
        {errorMessage}
      </View>
    )
  }

  const renderIntro = () => {
    if (!isRenderable(resolvedDescription)) return null
    if (isText(resolvedDescription)) {
      return (
        <Text
          nativeID={introId}
          style={[
            tokens.layout.message,
            {
              color: tokens.colors.intro,
              fontSize: tokens.typography.introSize,
              textAlign: controlAlign,
              marginTop: tokens.spacing.introMarginTop,
            },
            introStyle,
          ]}
        >
          {resolvedDescription}
        </Text>
      )
    }
    return (
      <View nativeID={introId} style={{ marginTop: tokens.spacing.introMarginTop }}>
        {resolvedDescription}
      </View>
    )
  }

  const contentWrapperStyle = useMemo(
    () => [
      {
        width: '100%' as const,
        justifyContent: alignMap[controlAlign],
      },
      contentStyle,
    ],
    [contentStyle, controlAlign],
  )

  const renderAffix = (node: React.ReactNode) => {
    if (isText(node)) {
      return (
        <Text
          style={[
            tokens.layout.affixText,
            {
              color: tokens.colors.input,
              fontSize: tokens.typography.inputSize,
            },
          ]}
          numberOfLines={1}
        >
          {node}
        </Text>
      )
    }
    return node
  }

  return (
    <Cell
      title={renderLabel()}
      icon={renderLeftIcon()}
      required={required}
      border={border}
      center={center}
      size={size}
      clickable={clickable}
      isLink={isLink}
      arrowDirection={arrowDirection}
      extra={extra}
      titleStyle={mergedTitleStyle}
      style={style}
      contentStyle={contentWrapperStyle}
      accessibilityState={
        error
          ? ({ invalid: true } as unknown as React.ComponentProps<typeof Cell>['accessibilityState'])
          : undefined
      }
      accessibilityLabel={isText(label) ? String(label) : undefined}
      onPress={onClick}
      android_ripple={androidRipple}
    >
      <View style={tokens.layout.body}>
        {prefix ? (
          <View style={[tokens.layout.prefix, { paddingRight: tokens.spacing.prefixGap }]}>
            {renderAffix(prefix)}
          </View>
        ) : null}
        <View style={[tokens.layout.controlWrapper, { minHeight: tokens.sizes.controlMinHeight }]}>
          {renderControl()}
          {renderClearIcon()}
        </View>
        {renderRightIcon()}
        {resolvedSuffix ? (
          <View style={[tokens.layout.suffix, { paddingLeft: tokens.spacing.suffixGap }]}>
            {renderAffix(resolvedSuffix)}
          </View>
        ) : null}
      </View>
      {renderWordLimit()}
      {renderMessage()}
      {renderIntro()}
    </Cell>
  )
})

Field.displayName = 'Field'

export default Field
