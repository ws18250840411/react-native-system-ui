import React from 'react'
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import type { TextInputProps } from 'react-native'
import { Clear, QuestionO } from 'react-native-system-icon'

import Cell from '../cell'
import Dialog from '../dialog'
import { isDef, isFiniteNumber, isFunction, isObject, isRenderable, isText } from '../../utils/validate'
import { formatNumberInput } from '../../utils/string'
import type { FieldInstance, FieldProps, FieldTooltipProps } from './types'
import { useFieldTokens } from './tokens'

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
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    outlineStyle: 'solid',
    outlineWidth: 0,
    outlineColor: 'transparent',
    backgroundColor: 'transparent',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  textarea: {
    flex: 1,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    outlineStyle: 'solid',
    outlineWidth: 0,
    outlineColor: 'transparent',
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
  },
  children: {
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
  message: {},
  wordLimit: {},
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
  const tokens = useFieldTokens(props.tokensOverride)

  const {
    tokensOverride: _tokensOverride,
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
  const mergedTitleStyle = [
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
  ]

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
  const describedByIds = [
    isRenderable(errorMessage) ? errorId : null,
    isRenderable(resolvedDescription) ? introId : null,
  ].filter(Boolean) as string[]
  const describedBy = describedByIds.length ? describedByIds : undefined

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
  const [textareaHeight, setTextareaHeight] = React.useState<number | undefined>(minHeight)

  const formatValue = (inputValue: string, trigger: 'onChange' | 'onBlur' = 'onChange') =>
    formatter && trigger === formatTrigger ? formatter(inputValue) : inputValue

  const updateValue = (next: string, trigger: 'onChange' | 'onBlur' = 'onChange') => {
    const formatted = formatValue(next, trigger)
    if (!isControlled) {
      setInternalValue(formatted)
    }
    onChangeText?.(formatted)
  }

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
  )

  const finalTextAlign = controlAlign !== 'left' ? controlAlign : inputAlignProp

  const showClear =
    clearable &&
    !readOnly &&
    (value ?? '') !== '' &&
    (clearTrigger === 'always' ||
      (clearTrigger === 'focus' && (focused || pressingClear)))

  const handleChangeText = (text: string) => {
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
  }

  const handleFocus = (event: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
    setFocused(true)
    onFocus?.(event)
    if (readOnly) {
      inputRef.current?.blur()
    }
  }

  const handleBlur = (event: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
    updateValue(value ?? '', 'onBlur')
    setFocused(false)
    onBlur?.(event)
  }

  const handlePressIn = (event: Parameters<NonNullable<TextInputProps['onPressIn']>>[0]) => {
    onPressIn?.(event)
    onClickInput?.()
  }

  const handleContentSizeChange = (event: { nativeEvent: { contentSize: { height: number } } }) => {
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
  }

  const handleClear = () => {
    updateValue('')
    inputRef.current?.clear?.()
    inputRef.current?.focus?.()
    onClear?.()
  }

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
      <View style={styles.labelRow}>
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
    let dialogProps: FieldTooltipProps | { message: React.ReactNode } = { message: tooltip as React.ReactNode }

    if (!React.isValidElement(tooltip) && !isText(tooltip)) {
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
    const webMouseDownProps = {
      onMouseDown: (event: any) => {
        event.preventDefault?.()
        event.stopPropagation?.()
      },
    } as any
    return (
      <Pressable
        style={[
          styles.clearIcon,
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
      return <View style={[styles.children, { minHeight: tokens.sizes.controlMinHeight }]}>{children}</View>
    }

    const inputStyles = [
      isTextarea ? styles.textarea : styles.input,
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
            styles.wordLimit,
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
            styles.message,
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
          styles.message,
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
            styles.message,
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

  const contentWrapperStyle = [
    {
      width: '100%' as const,
      justifyContent: alignMap[controlAlign],
    },
    contentStyle,
  ]

  const renderAffix = (node: React.ReactNode) => {
    if (isText(node)) {
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
      accessibilityState={error ? ({ invalid: true } as any) : undefined}
      accessibilityLabel={isText(label) ? String(label) : undefined}
      onPress={onClick}
      android_ripple={androidRipple}
    >
      <View style={styles.body}>
        {prefix ? (
          <View style={[styles.prefix, { paddingRight: tokens.spacing.prefixGap }]}>
            {renderAffix(prefix)}
          </View>
        ) : null}
        <View style={[styles.controlWrapper, { minHeight: tokens.sizes.controlMinHeight }]}>
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
