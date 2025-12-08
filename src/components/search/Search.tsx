import { Search as SearchIcon } from '@react-vant/icons'
import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import { useAriaPress } from '../../hooks'
import { useLocale } from '../config-provider/useLocale'
import Field from '../field'
import type { FieldProps } from '../field'
import type { FieldInstance } from '../field/types'
import { useSearchTokens } from './tokens'
import type { SearchProps, SearchRef, SearchShape } from './types'

const toValue = (value?: string) => (value ?? '')

const shapeRadiusMap = (shape: SearchShape, square: number, round: number) => {
  return shape === 'round' ? round : square
}

const SearchComponent = (props: SearchProps, ref: React.Ref<SearchRef>) => {
  const locale = useLocale()
  const tokens = useSearchTokens()
  const {
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
    onSearch,
    onCancel,
    onChangeText,
    onSubmitEditing,
    value: valueProp,
    defaultValue,
    returnKeyType,
    inputStyle,
    ...restFieldProps
  } = props

  const [internalValue, setInternalValue] = React.useState(() => toValue(defaultValue))
  const isControlled = valueProp !== undefined
  const inputValue = isControlled ? toValue(valueProp) : internalValue

  const handleChange = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next)
      }
      onChangeText?.(next)
    },
    [isControlled, onChangeText],
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
    <SearchIcon color={tokens.colors.icon} size={tokens.icon.size} />
  )
  const resolvedClearTrigger = clearTrigger ?? tokens.defaults.clearTrigger
  const resolvedReturnKeyType = returnKeyType ?? 'search'
  const shouldShowAction = !!action || showAction
  const radius = shapeRadiusMap(shape, tokens.radius.square, tokens.radius.round)

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

  const actionPress = useAriaPress({
    disabled: !!action || !shouldShowAction,
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
    if (typeof label === 'string' || typeof label === 'number') {
      return (
        <Text
          style={[
            styles.labelText,
            {
              marginRight: tokens.spacing.labelGap,
              color: tokens.colors.label,
              fontSize: tokens.typography.label,
            },
          ]}
        >
          {label}
        </Text>
      )
    }
    return (
      <View style={{ marginRight: tokens.spacing.labelGap }}>
        {label}
      </View>
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
    return (
      <Pressable
        style={[
          styles.actionWrapper,
          {
            marginLeft: tokens.spacing.actionGap,
            opacity: actionPress.states.pressed ? 0.6 : 1,
          },
        ]}
        {...actionPress.interactionProps}
      >
        <Text
          style={[
            styles.actionText,
            {
              color: tokens.colors.action,
              fontSize: tokens.typography.action,
            },
          ]}
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
  labelText: {
    fontWeight: '500',
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
  actionText: {
    fontWeight: '500',
  },
})

export default Search
