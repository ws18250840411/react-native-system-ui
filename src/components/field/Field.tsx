import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import type { TextInputProps } from 'react-native'

import Cell from '../cell'
import Dialog from '../dialog'
import Icon from '../icon'
import type { FieldInstance, FieldProps, FieldTooltipProps } from './types'
import { useFieldTokens } from './tokens'

const isDef = (val: any) => val !== undefined && val !== null

const trimExtraChar = (value: string, char: string, regExp: RegExp) => {
  const index = value.indexOf(char)
  if (index === -1) return value
  if (char === '-' && index !== 0) {
    return value.slice(0, index)
  }
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
}

const formatNumber = (value: string, allowDot = true, allowMinus = true) => {
  let next = value
  if (allowDot) {
    next = trimExtraChar(next, '.', /\./g)
  } else {
    next = next.split('.')[0]
  }

  if (allowMinus) {
    next = trimExtraChar(next, '-', /-/g)
  } else {
    next = next.replace(/-/g, '')
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g
  return next.replace(regExp, '')
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
    overflow: 'hidden',
    minHeight: 24,
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    outlineStyle: 'none',
    backgroundColor: 'transparent',
  },
  textarea: {
    flex: 1,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    outlineStyle: 'none',
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
  },
  children: {
    minHeight: 24,
    justifyContent: 'center',
  },
  leftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefix: {
    justifyContent: 'center',
  },
  suffix: {
    justifyContent: 'center',
  },
  affixText: {
    includeFontPadding: false,
  },
  clearIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
    minWidth: 0,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  tooltip: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 0,
  },
  wordLimit: {
    marginTop: 0,
  },
})

const alignMap: Record<'left' | 'center' | 'right', 'flex-start' | 'center' | 'flex-end'> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

const mapKeyboardType = (type: FieldProps['type']): TextInputProps['keyboardType'] => {
  switch (type) {
    case 'number':
      return 'decimal-pad'
    case 'digit':
      return 'number-pad'
    case 'tel':
      return 'phone-pad'
    default:
      return undefined
  }
}

export const Field = React.forwardRef<FieldInstance, FieldProps>((props, ref) => {
  const tokens = useFieldTokens()

  const {
    label,
    labelWidth = tokens.defaults.labelWidth,
    labelAlign = tokens.defaults.labelAlign,
    inputAlign: inputAlignProp = tokens.defaults.inputAlign,
    controlAlign = tokens.defaults.controlAlign,
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
    clearTrigger = tokens.defaults.clearTrigger,
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
    rows = tokens.defaults.rows,
    autoSize = false,
    formatter,
    formatTrigger = tokens.defaults.formatTrigger,
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
  const mergedTitleStyle = React.useMemo(
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
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const value = isControlled ? valueProp ?? '' : internalValue
  const [focused, setFocused] = React.useState(false)
  const [pressingClear, setPressingClear] = React.useState(false)
  const inputRef = React.useRef<TextInput>(null)
  const introId = React.useId()
  const errorId = React.useId()
  const describedBy = React.useMemo(() => {
    const ids: string[] = []
    if (errorMessage) ids.push(errorId)
    if (resolvedDescription) ids.push(introId)
    return ids.length ? ids : undefined
  }, [errorId, errorMessage, introId, resolvedDescription])

  const lineHeight = tokens.defaults.textareaLineHeight
  const minRows = React.useMemo(() => {
    if (!isTextarea) return 1
    if (autoSize && typeof autoSize === 'object' && isDef(autoSize.minRows)) {
      return Math.max(1, autoSize.minRows!)
    }
    return Math.max(1, rows)
  }, [autoSize, isTextarea, rows])

  const maxRows = React.useMemo(() => {
    if (!isTextarea) return undefined
    if (autoSize && typeof autoSize === 'object' && isDef(autoSize.maxRows)) {
      return Math.max(1, autoSize.maxRows!)
    }
    return undefined
  }, [autoSize, isTextarea])

  const minHeight = isTextarea
    ? Math.max(tokens.sizes.textareaMinHeight, minRows * lineHeight)
    : undefined
  const maxHeight = isTextarea && maxRows ? Math.max(tokens.sizes.textareaMinHeight, maxRows * lineHeight) : undefined
  const [textareaHeight, setTextareaHeight] = React.useState<number | undefined>(minHeight)

  const formatValue = React.useCallback(
    (inputValue: string, trigger: 'onChange' | 'onBlur' = 'onChange') => {
      if (formatter && trigger === formatTrigger) {
        return formatter(inputValue)
      }
      return inputValue
    },
    [formatter, formatTrigger],
  )

  const updateValue = React.useCallback(
    (next: string, trigger: 'onChange' | 'onBlur' = 'onChange') => {
      const formatted = formatValue(next, trigger)
      if (!isControlled) {
        setInternalValue(formatted)
      }
      onChangeText?.(formatted)
    },
    [formatValue, isControlled, onChangeText],
  )

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => updateValue(''),
      get nativeElement() {
        return inputRef.current
      },
    }),
    [updateValue],
  )

  const finalTextAlign = controlAlign !== 'left' ? controlAlign : inputAlignProp

  const showClear = React.useMemo(() => {
    if (clearable && !readOnly) {
      const hasValue = (value ?? '') !== ''
      const trigger =
        clearTrigger === 'always' ||
        (clearTrigger === 'focus' && (focused || pressingClear))
      return hasValue && trigger
    }
    return false
  }, [clearable, clearTrigger, focused, pressingClear, readOnly, value])

  const handleChangeText = React.useCallback(
    (text: string) => {
      let next = text ?? ''

      if (type === 'number' || type === 'digit') {
        const allowDot = type === 'number'
        next = formatNumber(next, allowDot, allowDot)
      }

      if (typeof maxLength === 'number' && maxLength >= 0 && next.length > maxLength) {
        onOverlimit?.(next)
        next = next.slice(0, maxLength)
      }

      updateValue(next, 'onChange')
    },
    [maxLength, onOverlimit, type, updateValue],
  )

  const handleFocus = React.useCallback(
    (event: any) => {
      setFocused(true)
      onFocus?.(event)
      if (readOnly) {
        inputRef.current?.blur()
      }
    },
    [onFocus, readOnly],
  )

  const handleBlur = React.useCallback(
    (event: any) => {
      updateValue(value ?? '', 'onBlur')
      setFocused(false)
      onBlur?.(event)
    },
    [onBlur, updateValue, value],
  )

  const handlePressIn = React.useCallback(
    (event: any) => {
      onPressIn?.(event)
      onClickInput?.()
    },
    [onClickInput, onPressIn],
  )

  const handleContentSizeChange = React.useCallback(
    (event: { nativeEvent: { contentSize: { height: number } } }) => {
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
    },
    [autoSize, isTextarea, maxHeight, minHeight],
  )

  const handleClear = React.useCallback(() => {
    // 清空受控/非受控值，并立刻保持焦点，避免 Web 上触发 blur 后按钮消失但文本未清空
    updateValue('')
    inputRef.current?.clear?.()
    inputRef.current?.focus?.()
    onClear?.()
  }, [onClear, updateValue])

  const renderLabel = () => {
    if (!label) return null
    const isPlain = typeof label === 'string' || typeof label === 'number'

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
      <View style={styles.labelRow}>
        {content}
        {tooltip ? renderTooltip() : null}
      </View>
    )
  }

  const renderTooltip = () => {
    if (!tooltip) return null
    const defaultIcon = <Icon name="question-o" color={tokens.colors.tooltip} size={tokens.sizes.icon} />
    let icon: React.ReactNode = defaultIcon
    let dialogProps: FieldTooltipProps | { message: React.ReactNode } = { message: tooltip as React.ReactNode }

    if (!(React.isValidElement(tooltip) || typeof tooltip === 'string')) {
      const { icon: customIcon, ...rest } = tooltip as FieldTooltipProps
      icon = customIcon ?? defaultIcon
      dialogProps = rest as FieldTooltipProps
    }

    return (
      <Pressable
        style={[styles.tooltip, { marginLeft: tokens.spacing.rightIconGap }]}
        onPress={() => Dialog.show(dialogProps as any)}
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
          styles.leftIcon,
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
          styles.rightIcon,
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
    return (
      <Pressable
        style={[
          styles.clearIcon,
          {
            paddingHorizontal: tokens.spacing.rightIconGap,
          },
        ]}
        onMouseDown={event => {
          // 阻止鼠标按下让输入失焦（Web）
          event.preventDefault?.()
          event.stopPropagation?.()
        }}
        onPressIn={() => setPressingClear(true)}
        onPressOut={() => setPressingClear(false)}
        onPress={handleClear}
        accessibilityRole="button"
      >
        {React.isValidElement(clearIcon)
          ? clearIcon
          : <Icon name="clear" color={tokens.colors.clear} size={tokens.sizes.clearIcon} />}
      </Pressable>
    )
  }

  const renderControl = () => {
    if (isDef(children)) {
      return <View style={styles.children}>{children}</View>
    }

    const inputStyles = React.useMemo(() => {
      const base = [
        styles.input,
        {
          color: disabled ? tokens.colors.disabled : error ? tokens.colors.error : tokens.colors.input,
          fontSize: tokens.typography.inputSize,
          textAlign: finalTextAlign,
          lineHeight: tokens.typography.inputLineHeight,
          height: tokens.typography.inputLineHeight,
        },
        inputStyle,
      ]

      if (isTextarea) {
        base.push({
          ...styles.textarea,
          minHeight,
          height: textareaHeight,
          lineHeight,
        })
      }
      return base
    }, [
      disabled,
      error,
      finalTextAlign,
      inputStyle,
      isTextarea,
      lineHeight,
      minHeight,
      textareaHeight,
      tokens.colors.disabled,
      tokens.colors.error,
      tokens.colors.input,
      tokens.typography.inputLineHeight,
      tokens.typography.inputSize,
    ])

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
        accessibilityDescribedBy={describedBy}
        aria-describedby={describedBy?.join(' ')}
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
    const content =
      typeof showWordLimit === 'function'
        ? showWordLimit({ currentCount, maxLength })
        : `${currentCount}/${maxLength}`

    if (content === null || content === false) return null

    if (typeof content === 'string' || typeof content === 'number') {
      return (
        <Text
          style={[
            styles.wordLimit,
            {
              color: tokens.colors.wordLimit,
              fontSize: tokens.typography.wordLimitSize ?? 12,
              // React Vant 默认字数统计靠右展示，这里保持一致
              textAlign: 'right',
              alignSelf: 'flex-end',
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
    if (!errorMessage) return null
    if (typeof errorMessage === 'string' || typeof errorMessage === 'number') {
      return (
        <Text
          nativeID={errorId}
          style={[
            styles.message,
            {
              color: tokens.colors.error,
              fontSize: tokens.typography.messageSize,
              textAlign: errorMessageAlign,
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
        style={[styles.message, { alignSelf: alignMap[errorMessageAlign] }]}
        accessibilityLiveRegion="polite"
      >
        {errorMessage}
      </View>
    )
  }

  const renderIntro = () => {
    if (!resolvedDescription) return null
    if (typeof resolvedDescription === 'string' || typeof resolvedDescription === 'number') {
      return (
        <Text
          nativeID={introId}
          style={[
            styles.message,
            {
              color: tokens.colors.intro,
              fontSize: tokens.typography.introSize,
              textAlign: controlAlign,
            },
            introStyle,
          ]}
        >
          {resolvedDescription}
        </Text>
      )
    }
    return (
      <View nativeID={introId}>
        {resolvedDescription}
      </View>
    )
  }

  const contentWrapperStyle = React.useMemo(
    () => [
      {
        width: '100%',
        justifyContent: alignMap[controlAlign],
      },
      contentStyle,
    ],
    [contentStyle, controlAlign],
  )

  const renderAffix = React.useCallback(
    (node: React.ReactNode) => {
      if (typeof node === 'string' || typeof node === 'number') {
        return (
          <Text
            style={[
              styles.affixText,
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
    },
    [tokens.colors.input, tokens.typography.inputSize],
  )

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
      accessibilityState={error ? { invalid: true } : undefined}
      accessibilityLabel={label && typeof label === 'string' ? label : undefined}
      onPress={onClick}
      android_ripple={androidRipple}
    >
      <View style={styles.body}>
        {prefix ? (
          <View style={[styles.prefix, { paddingRight: tokens.spacing.prefixGap }]}>
            {renderAffix(prefix)}
          </View>
        ) : null}
        <View style={styles.controlWrapper}>
          {renderControl()}
          {renderClearIcon()}
        </View>
        {renderRightIcon()}
        {resolvedSuffix ? (
          <View style={[styles.suffix, { paddingLeft: tokens.spacing.suffixGap }]}>
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
