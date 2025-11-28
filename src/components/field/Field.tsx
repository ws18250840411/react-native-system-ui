import { Arrow, QuestionO } from '@react-vant/icons'
import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native'

import Dialog from '../dialog'
import { useAriaPress } from '../../hooks'
import type { FieldFormatTrigger, FieldProps, FieldTooltip } from './types'
import { useFieldTokens } from './tokens'

const arrowTransforms: Record<string, { transform: { rotate: string }[] }> = {
  left: { transform: [{ rotate: '180deg' }] },
  right: { transform: [{ rotate: '0deg' }] },
  up: { transform: [{ rotate: '-90deg' }] },
  down: { transform: [{ rotate: '90deg' }] },
}

const controlAlignMap = {
  'flex-start': 'flex-start',
  center: 'center',
  'flex-end': 'flex-end',
} as const

type FocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0]
type BlurEvent = Parameters<NonNullable<TextInputProps['onBlur']>>[0]
type PressInEvent = Parameters<NonNullable<TextInputProps['onPressIn']>>[0]

const toStringValue = (value?: string | number | null) => {
  if (value === undefined || value === null) return ''
  return typeof value === 'string' ? value : String(value)
}

export const Field = React.forwardRef<TextInput, FieldProps>((props, ref) => {
  const {
    label,
    labelStyle,
    labelWidth,
    labelAlign = 'left',
    required,
    colon = false,
    tooltip,
    intro,
    errorMessage,
    description,
    error = false,
    clearable = false,
    clearTrigger,
    inputAlign,
    controlAlign,
    center = false,
    border = true,
    size = 'normal',
    clickable = false,
    isLink = false,
    arrowDirection = 'right',
    leftIcon,
    rightIcon,
    prefix,
    suffix,
    button,
    extra,
    type = 'text',
    rows,
    autosize,
    autoSize,
    showWordLimit = false,
    formatter,
    formatTrigger = 'onChange',
    clearIcon,
    onClear,
    onClick,
    onPress,
    onClickInput,
    onClickLeftIcon,
    onClickRightIcon,
    onOverlimit,
    style,
    inputStyle,
    contentStyle,
    value: valueProp,
    defaultValue,
    onChangeText,
    readOnly = false,
    disabled = false,
    androidRipple,
    editable = true,
    keyboardType: keyboardTypeProp,
    onFocus,
    onBlur,
    onPressIn,
    maxLength,
    secureTextEntry,
    ...inputProps
  } = props

  const tokens = useFieldTokens()
  const resolvedType = type
  const isTextarea = resolvedType === 'textarea'
  const resolvedKeyboardType =
    keyboardTypeProp ??
    (resolvedType === 'number' || resolvedType === 'digit'
      ? 'numeric'
      : resolvedType === 'tel'
        ? 'phone-pad'
        : undefined)

  const resolvedLabelWidth = labelWidth ?? tokens.defaults.labelWidth
  const resolvedClearTrigger = clearTrigger ?? tokens.defaults.clearTrigger
  const resolvedInputAlign = inputAlign ?? tokens.defaults.inputAlign
  const resolvedControlAlign = controlAlign ?? tokens.defaults.controlAlign
  const textareaAutosize = autoSize ?? autosize ?? false
  const suffixNode = suffix ?? button
  const helperDescription = description ?? intro
  const resolvedPressHandler = onPress ?? onClick

  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = React.useState<string>(toStringValue(defaultValue))
  const inputValue = isControlled ? toStringValue(valueProp) : internalValue

  const handleFocusState = React.useRef(false)
  const inputRef = React.useRef<TextInput>(null)

  const mergedRef = React.useCallback(
    (node: TextInput | null) => {
      inputRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ;(ref as React.MutableRefObject<TextInput | null>).current = node
      }
    },
    [ref],
  )

  const filterValueByType = React.useCallback(
    (text: string) => {
      if (resolvedType === 'digit') {
        return text.replace(/[^0-9]/g, '')
      }
      if (resolvedType === 'number') {
        return text.replace(/[^0-9.-]/g, '')
      }
      return text
    },
    [resolvedType],
  )

  const formatValue = React.useCallback(
    (text: string, trigger: FieldFormatTrigger) => {
      if (formatter && trigger === formatTrigger) {
        return formatter(text)
      }
      return text
    },
    [formatTrigger, formatter],
  )

  const commitValue = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next)
      }
      onChangeText?.(next)
    },
    [isControlled, onChangeText],
  )

  const setValue = React.useCallback(
    (next: string, trigger: FieldFormatTrigger = 'onChange') => {
      const filtered = filterValueByType(next)
      let limited = filtered
      if (typeof maxLength === 'number' && filtered.length > maxLength) {
        onOverlimit?.(filtered)
        limited = filtered.slice(0, maxLength)
      }
      const formatted = formatValue(limited, trigger)
      commitValue(formatted)
    },
    [commitValue, filterValueByType, formatValue, maxLength, onOverlimit],
  )

  const [textareaHeight, setTextareaHeight] = React.useState<number | undefined>(() => {
    if (!isTextarea) return undefined
    const rowCount = rows ?? (typeof textareaAutosize === 'object' ? textareaAutosize.minRows ?? 1 : 1)
    return rowCount * tokens.defaults.textareaLineHeight
  })

  React.useEffect(() => {
    if (!isTextarea) return
    const rowCount = rows ?? (typeof textareaAutosize === 'object' ? textareaAutosize.minRows ?? 1 : 1)
    setTextareaHeight(rowCount * tokens.defaults.textareaLineHeight)
  }, [isTextarea, rows, textareaAutosize, tokens.defaults.textareaLineHeight])

  const resolvedEditable = editable && !disabled && !readOnly

  const showClear =
    !!inputValue &&
    clearable &&
    resolvedEditable &&
    (!handleFocusState.current ? resolvedClearTrigger === 'always' : true)

  const clearPress = useAriaPress({
    onPress: () => {
      setValue('', 'onChange')
      onClear?.()
    },
  })

  const showCounter = showWordLimit && typeof maxLength === 'number' && maxLength > 0
  const showArrow = isLink
  const helperColor = errorMessage ? tokens.colors.error : tokens.colors.description
  const borderColor = error || errorMessage ? tokens.colors.error : tokens.colors.border
  const paddingVertical =
    size === 'large' ? tokens.spacing.paddingVerticalLarge : tokens.spacing.paddingVertical

  const tooltipNode = React.useMemo(() => {
    if (!tooltip) return null
    if (React.isValidElement(tooltip)) {
      return <View style={styles.tooltip}>{tooltip}</View>
    }
    if (typeof tooltip === 'string') {
      return (
        <Pressable
          style={styles.tooltip}
          hitSlop={8}
          onPress={() => {
            Dialog.show({ message: tooltip })
          }}
        >
          <QuestionO />
        </Pressable>
      )
    }
    const { icon, ...dialogOptions } = tooltip as Exclude<FieldTooltip, React.ReactNode>
    return (
      <Pressable
        style={styles.tooltip}
        hitSlop={8}
        onPress={() => {
          Dialog.show(dialogOptions)
        }}
      >
        {icon ?? <QuestionO />}
      </Pressable>
    )
  }, [tooltip])

  const isInteractive = (clickable || isLink || typeof resolvedPressHandler === 'function') && !disabled
  const rootPress = useAriaPress({
    disabled: !isInteractive,
    onPress: resolvedPressHandler,
    extraProps: {
      accessibilityRole: 'button',
    },
  })

  const ContainerComponent: React.ComponentType<any> = isInteractive ? Pressable : View

  const containerStyle = [
    styles.container,
    {
      paddingHorizontal: tokens.spacing.paddingHorizontal,
      paddingVertical,
      backgroundColor: tokens.colors.background,
      borderBottomWidth: border ? tokens.border.width : 0,
      borderBottomColor: border ? borderColor : 'transparent',
    },
    center && styles.center,
    disabled && { opacity: tokens.states.disabledOpacity },
    style,
  ]

  const bodyStyle = [
    styles.body,
    { alignItems: controlAlignMap[resolvedControlAlign] },
    contentStyle,
  ]

  const renderLabel = () => {
    if (!label && !required) return null
    return (
      <View
        style={[
          styles.label,
          {
            width: resolvedLabelWidth,
            marginRight: tokens.spacing.labelGap,
            alignItems: labelAlign === 'right' ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        {required ? <Text style={[styles.required, { color: tokens.colors.error }]}>*</Text> : null}
        {label ? (
          <View style={styles.labelRow}>
            <Text
              style={[
                styles.labelText,
                {
                  color: error || errorMessage ? tokens.colors.error : tokens.colors.label,
                  fontSize: tokens.typography.labelSize,
                },
                labelStyle,
              ]}
            >
              {label}
              {colon ? '：' : null}
            </Text>
            {tooltipNode}
          </View>
        ) : null}
      </View>
    )
  }

  const renderIcon = (
    icon?: React.ReactNode,
    handler?: (() => void) | undefined,
  ) => {
    if (!icon) return null
    if (!handler) {
      return <View style={styles.icon}>{icon}</View>
    }
    return (
      <Pressable hitSlop={8} style={styles.icon} onPress={handler} accessibilityRole="button">
        {icon}
      </Pressable>
    )
  }

  const helperNode = errorMessage ?? helperDescription

  const handleFocusEvent = (event: FocusEvent) => {
    handleFocusState.current = true
    onFocus?.(event)
  }

  const handleBlurEvent = (event: BlurEvent) => {
    handleFocusState.current = false
    if (formatter && formatTrigger === 'onBlur') {
      const filtered = filterValueByType(inputValue)
      const formatted = formatValue(filtered, 'onBlur')
      if (formatted !== inputValue) {
        commitValue(formatted)
      }
    }
    onBlur?.(event)
  }

  const handlePressIn = (event: PressInEvent) => {
    onClickInput?.()
    onPressIn?.(event)
  }

  return (
    <ContainerComponent
      style={isInteractive ? [...containerStyle, { opacity: rootPress.states.pressed ? 0.6 : 1 }] : containerStyle}
      android_ripple={isInteractive ? androidRipple ?? { color: '#f2f3f5' } : undefined}
      {...(isInteractive ? rootPress.interactionProps : {})}
    >
      <View style={[styles.row, center && styles.rowCenter]}>
        {renderLabel()}
        <View style={bodyStyle}>
          {prefix ? <View style={[styles.affix, { marginRight: tokens.spacing.prefixGap }]}>{prefix}</View> : null}
          {renderIcon(leftIcon, onClickLeftIcon)}
          <TextInput
            ref={mergedRef}
            {...inputProps}
            editable={resolvedEditable}
            keyboardType={resolvedKeyboardType as TextInputProps['keyboardType']}
            secureTextEntry={resolvedType === 'password' ? true : secureTextEntry}
            multiline={isTextarea}
            style={[
              styles.input,
              {
                textAlign: resolvedInputAlign,
                color: resolvedEditable ? tokens.colors.text : tokens.colors.disabledText,
                fontSize: tokens.typography.fontSize,
                textAlignVertical: isTextarea ? 'top' : 'center',
                height: isTextarea ? textareaHeight : undefined,
              },
              inputStyle,
            ]}
            placeholderTextColor={tokens.colors.placeholder}
            value={inputValue}
            maxLength={maxLength}
            onFocus={handleFocusEvent}
            onBlur={handleBlurEvent}
            onPressIn={handlePressIn}
            onChangeText={text => setValue(text, 'onChange')}
            onContentSizeChange={
              isTextarea
                ? event => {
                    const { height } = event.nativeEvent.contentSize
                    let nextHeight = height
                    if (textareaAutosize) {
                      const minRows =
                        typeof textareaAutosize === 'object' ? textareaAutosize.minRows ?? rows : rows
                      const maxRows = typeof textareaAutosize === 'object' ? textareaAutosize.maxRows : undefined
                      const minHeight = (minRows ?? 1) * tokens.defaults.textareaLineHeight
                      const maxHeight = maxRows
                        ? maxRows * tokens.defaults.textareaLineHeight
                        : undefined
                      nextHeight = Math.max(minHeight, height)
                      if (typeof maxHeight === 'number') {
                        nextHeight = Math.min(nextHeight, maxHeight)
                      }
                    } else if (rows) {
                      nextHeight = Math.max(rows * tokens.defaults.textareaLineHeight, height)
                    }
                    setTextareaHeight(nextHeight)
                  }
                : undefined
            }
          />
          {showClear ? (
            <Pressable hitSlop={8} style={styles.icon} {...clearPress.interactionProps}>
              {clearIcon ?? (
                <Text style={[styles.clearText, { color: tokens.colors.clearIcon }]}>×</Text>
              )}
            </Pressable>
          ) : (
            renderIcon(rightIcon, onClickRightIcon)
          )}
          {suffixNode ? (
            <View style={[styles.affix, { marginLeft: tokens.spacing.suffixGap }]}>{suffixNode}</View>
          ) : null}
        </View>
        {extra ? (
          <View style={[styles.extra, { marginLeft: tokens.spacing.extraGap }]}>
            {typeof extra === 'string' ? (
              <Text style={{ color: tokens.colors.extra }}>{extra}</Text>
            ) : (
              extra
            )}
          </View>
        ) : null}
        {showArrow ? (
          <View style={[styles.arrow, arrowTransforms[arrowDirection] ?? arrowTransforms.right]}>
            <Arrow size={tokens.arrow.size} color={tokens.arrow.color} />
          </View>
        ) : null}
      </View>
      {helperNode ? (
        <Text
          style={[
            styles.message,
            {
              color: helperColor,
              marginTop: tokens.spacing.messageMarginTop,
              fontSize: tokens.typography.helperSize,
            },
          ]}
        >
          {helperNode}
        </Text>
      ) : null}
      {showCounter ? (
        <Text
          style={[
            styles.counter,
            {
              color: tokens.colors.counter,
              marginTop: tokens.spacing.counterMarginTop,
              fontSize: tokens.typography.counterSize,
            },
          ]}
        >
          {`${inputValue.length}/${maxLength}`}
        </Text>
      ) : null}
    </ContainerComponent>
  )
})

Field.displayName = 'Field'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowCenter: {
    alignItems: 'center',
  },
  label: {
    flexDirection: 'column',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
  },
  required: {
    fontSize: 14,
    marginBottom: 2,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
  },
  icon: {
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 16,
  },
  message: {
    marginTop: 4,
  },
  counter: {
    textAlign: 'right',
  },
  tooltip: {
    marginLeft: 4,
  },
  affix: {
    justifyContent: 'center',
  },
  extra: {
    justifyContent: 'center',
  },
  arrow: {
    marginLeft: 4,
  },
})

export default Field
