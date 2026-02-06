import React, { useCallback, useImperativeHandle, useRef } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Search as SearchIcon } from 'react-native-system-icon'

import { useAriaPress, useControllableValue } from '../../hooks'
import { isText } from '../../utils/validate'
import { useLocale } from '../config-provider/useLocale'
import Field, { type FieldInstance, type FieldProps } from '../field'
import { useSearchTokens } from './tokens'
import type { SearchProps, SearchRef } from './types'

const SearchComponent = (props: SearchProps, ref: React.Ref<SearchRef>) => {
  const locale = useLocale()
  const {
    tokensOverride,
    label,
    action,
    actionText,
    showAction = false,
    shape: shapeProp,
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
    onSubmitEditing,
    returnKeyType,
    inputStyle,
    align,
    inputAlign,
    ...restFieldProps
  } = props
  const tokens = useSearchTokens(tokensOverride)
  const shape = shapeProp ?? tokens.defaults.shape

  const [value, triggerChange] = useControllableValue<string>(props, { defaultValue: '' })

  const inputValue = value ?? ''
  const resolvedInputAlign = align ?? inputAlign

  const onChangeTextRef = useRef(onChangeText)
  onChangeTextRef.current = onChangeText
  const onCancelRef = useRef(onCancel)
  onCancelRef.current = onCancel
  const onSearchRef = useRef(onSearch)
  onSearchRef.current = onSearch
  const onSubmitEditingRef = useRef(onSubmitEditing)
  onSubmitEditingRef.current = onSubmitEditing
  const inputValueRef = useRef(inputValue)
  inputValueRef.current = inputValue

  const handleChange = useCallback(
    (next: string) => {
      triggerChange(next)
      onChangeTextRef.current?.(next)
    },
    [triggerChange],
  )

  const handleCancel = useCallback(() => {
    handleChange('')
    onCancelRef.current?.()
  }, [handleChange])

  type SubmitEvent = Parameters<NonNullable<FieldProps['onSubmitEditing']>>[0]

  const handleSubmit = useCallback(
    (event: SubmitEvent) => {
      onSearchRef.current?.(inputValueRef.current)
      onSubmitEditingRef.current?.(event)
    },
    [],
  )

  const resolvedBackground = background ?? tokens.colors.background
  const resolvedLeftIcon = leftIcon ?? <SearchIcon size={tokens.icon.size} fill={tokens.colors.icon} color={tokens.colors.icon} />
  const resolvedClearTrigger = clearTrigger ?? tokens.defaults.clearTrigger
  const resolvedReturnKeyType = returnKeyType ?? 'search'
  const shouldShowAction = !!action || showAction
  const isCustomActionText = React.isValidElement(actionText)
  const shouldRenderCancelAction = shouldShowAction && !action && !isCustomActionText
  const radius = shape === 'round' ? tokens.radius.round : tokens.radius.square

  const inputRef = useRef<FieldInstance>(null)
  useImperativeHandle(
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

  const labelNode = !label ? null : isText(label) ? (
    <Text
      style={{
        marginRight: tokens.spacing.labelGap,
        color: tokens.colors.label,
        fontSize: tokens.typography.label,
        fontWeight: tokens.typography.labelWeight,
      }}
    >
      {label}
    </Text>
  ) : (
    <View style={{ marginRight: tokens.spacing.labelGap }}>{label}</View>
  )

  const actionNode = action ? (
    <View style={[styles.actionWrapper, { marginLeft: tokens.spacing.actionGap }]}>
      {action}
    </View>
  ) : !shouldShowAction ? null : isCustomActionText ? (
    <View style={[styles.actionWrapper, { marginLeft: tokens.spacing.actionGap }]}>
      {actionText}
    </View>
  ) : (
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
          fontWeight: tokens.typography.actionWeight,
        }}
      >
        {actionText ?? locale.cancel}
      </Text>
    </Pressable>
  )

  return (
    <View style={containerStyles}>
      <View style={contentStyles}>
        {labelNode}
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
            style={[
              { paddingHorizontal: tokens.spacing.none, paddingVertical: tokens.spacing.none },
              fieldStyle,
            ]}
            contentStyle={[
              { paddingVertical: tokens.spacing.none },
              fieldContentStyle,
            ]}
            inputStyle={[
              { paddingVertical: tokens.spacing.none },
              inputStyle,
            ]}
            onSubmitEditing={handleSubmit}
            returnKeyType={resolvedReturnKeyType}
            {...restFieldProps}
          />
        </View>
      </View>
      {actionNode}
    </View>
  )
}

const SearchForwardRef = React.forwardRef(SearchComponent)
SearchForwardRef.displayName = 'Search'
export const Search = React.memo(SearchForwardRef)

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
  actionWrapper: {
    justifyContent: 'center',
  },
})

export default Search
