import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  View,
} from 'react-native'
import { Search as SearchIcon } from 'react-native-system-icon'

import { useAriaPress, useControllableValue } from '../../hooks'
import { isText } from '../../utils/validate'
import { useLocale } from '../config-provider/useLocale'
import Field, { type FieldInstance, type FieldProps } from '../field'
import { useSearchTokens } from './tokens'
import type { SearchProps, SearchRef, SearchShape } from './types'

const SearchComponent = (props: SearchProps, ref: React.Ref<SearchRef>) => {
  const locale = useLocale()
  const tokens = useSearchTokens(props.tokensOverride)
  const {
    tokensOverride: _tokensOverride,
    label,
    action,
    actionText,
    showAction = false,
    shape = tokens.defaults.shape,
    background,
    style: containerStyle,
    fieldStyle,
    fieldContentStyle,
    clearTrigger,
    clearable = true,
    leftIcon,
    rightIcon,
    errorMessage,
    onSearch,
    onCancel,
    onChangeText,
    onChange,
    onSubmitEditing,
    value: valueProp,
    defaultValue,
    returnKeyType,
    inputStyle,
    align,
    inputAlign,
    ...restFieldProps
  } = props

  const [value, triggerChange] = useControllableValue<string>(props, { defaultValue: '' })
  const inputValue = value ?? ''
  const resolvedInputAlign = align ?? inputAlign

  const handleChange = React.useCallback(
    (next: string) => {
      triggerChange(next)
      onChangeText?.(next)
    },
    [onChangeText, triggerChange],
  )

  const handleCancel = React.useCallback(() => {
    handleChange('')
    onCancel?.()
  }, [handleChange, onCancel])

  type SubmitEvent = Parameters<NonNullable<FieldProps['onSubmitEditing']>>[0]

  const handleSubmit = React.useCallback(
    (event: SubmitEvent) => {
      onSearch?.(inputValue)
      onSubmitEditing?.(event)
    },
    [inputValue, onSearch, onSubmitEditing],
  )

  const resolvedBackground = background ?? tokens.colors.background
  const resolvedLeftIcon = leftIcon ?? (
    <SearchIcon size={tokens.icon.size} fill={tokens.colors.icon} color={tokens.colors.icon} />
  )
  const resolvedClearTrigger = clearTrigger ?? tokens.defaults.clearTrigger
  const resolvedReturnKeyType = returnKeyType ?? 'search'
  const shouldShowAction = !!action || showAction
  const isCustomActionText = React.isValidElement(actionText)
  const shouldRenderCancelAction = shouldShowAction && !action && !isCustomActionText
  const radius = shape === 'round' ? tokens.radius.round : tokens.radius.square

  const inputRef = React.useRef<FieldInstance>(null)
  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => handleChange(''),
    }),
    [handleChange],
  )

  const cancelActionPress = useAriaPress({
    disabled: !shouldRenderCancelAction,
    onPress: handleCancel,
    extraProps: {
      accessibilityRole: 'button',
      testID: 'rnsu-search-action',
    },
  })

  const containerStyles = [
    styles.container,
    {
      paddingHorizontal: tokens.spacing.paddingHorizontal,
      paddingVertical: tokens.spacing.paddingVertical,
      backgroundColor: resolvedBackground,
    },
    containerStyle,
  ]

  const contentStyles = [
    styles.content,
    {
      borderRadius: radius,
      paddingHorizontal: tokens.spacing.contentPaddingHorizontal,
      paddingVertical: tokens.spacing.contentPaddingVertical,
      backgroundColor: tokens.colors.contentBackground,
    },
  ]

  const renderLabel = () => {
    if (!label) return null
    if (isText(label)) {
      return (
        <Text
          style={{
            marginRight: tokens.spacing.labelGap,
            color: tokens.colors.label,
            fontSize: tokens.typography.label,
            fontWeight: tokens.typography.labelWeight as TextStyle['fontWeight'],
          }}
        >
          {label}
        </Text>
      )
    }
    return (
      <View style={{ marginRight: tokens.spacing.labelGap }}>{label}</View>
    )
  }

  const renderAction = () => {
    if (action) {
      return (
        <View style={[styles.actionWrapper, { marginLeft: tokens.spacing.actionGap }]}>
          {action}
        </View>
      )
    }
    if (!shouldShowAction) return null

    if (isCustomActionText) {
      return (
        <View style={[styles.actionWrapper, { marginLeft: tokens.spacing.actionGap }]}>
          {actionText}
        </View>
      )
    }

    return (
      <Pressable
        style={[
          styles.actionWrapper,
          {
            marginLeft: tokens.spacing.actionGap,
            opacity: cancelActionPress.states.pressed ? tokens.opacity.actionPressed : 1,
          },
        ]}
        {...cancelActionPress.interactionProps}
      >
        <Text
          style={{
            color: tokens.colors.action,
            fontSize: tokens.typography.action,
            fontWeight: tokens.typography.actionWeight as TextStyle['fontWeight'],
          }}
        >
          {actionText ?? locale.cancel}
        </Text>
      </Pressable>
    )
  }

  return (
    <View style={containerStyles}>
      <View style={contentStyles}>
        {renderLabel()}
        <View style={styles.fieldWrapper}>
          <Field
            ref={inputRef}
            type='search'
            value={inputValue}
            onChangeText={handleChange}
            clearable={clearable}
            clearTrigger={resolvedClearTrigger}
            leftIcon={resolvedLeftIcon}
            rightIcon={rightIcon}
            center={!errorMessage}
            errorMessage={errorMessage}
            inputAlign={resolvedInputAlign}
            border={false}
            style={[styles.field, fieldStyle]}
            contentStyle={[styles.fieldContent, fieldContentStyle]}
            inputStyle={[styles.input, inputStyle]}
            onSubmitEditing={handleSubmit}
            returnKeyType={resolvedReturnKeyType}
            {...restFieldProps}
          />
        </View>
      </View>
      {renderAction()}
    </View>
  )
}

export const Search = React.forwardRef(SearchComponent)

Search.displayName = 'Search'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldWrapper: {
    flex: 1,
  },
  field: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  fieldContent: {
    paddingVertical: 0,
  },
  input: {
    paddingVertical: 0,
  },
  actionWrapper: {
    justifyContent: 'center',
  },
})

export default Search
