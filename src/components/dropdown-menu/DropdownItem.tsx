import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useControllableValue } from '../../hooks'
import type { DropdownItemInstance, DropdownItemProps, DropdownOption } from './types'
import { useDropdownMenuContext } from './DropdownMenuContext'
import { useDropdownMenuTokens } from './tokens'

const getOptionText = (option?: DropdownOption) => option?.text ?? option?.label

const DropdownItem = React.forwardRef<DropdownItemInstance, DropdownItemProps>((props, ref) => {
  const {
    options,
    placeholder = '请选择',
    title,
    label,
    disabled: itemDisabledProp = false,
    closeOnSelect = true,
    textStyle,
    panelStyle,
    children,
    onChange,
    onOpen,
    onClose,
    style,
    index = 0,
    barScrollable = false,
    ...rest
  } = props

  const tokens = useDropdownMenuTokens()
  const { activeIndex, registerPanel, toggleItem, showItem, closeMenu, activeColor, activeIcon, direction, disabled: menuDisabled } = useDropdownMenuContext()
  const [value, triggerChange] = useControllableValue(props, {
    defaultValue: undefined,
    trigger: 'onChange',
  })

  const isActive = activeIndex === index
  const itemDisabled = menuDisabled || itemDisabledProp

  const selectedOption = options?.find(option => option.value === value)
  const selectedText = getOptionText(selectedOption)
  const displayLabel = title ?? label ?? selectedText ?? placeholder
  const displayColor = itemDisabled
    ? tokens.colors.disabledText
    : selectedOption
      ? (activeColor ?? tokens.colors.activeText)
      : tokens.colors.placeholder

  const handleSelect = React.useCallback(
    (option: DropdownOption) => {
      if (option.disabled) return
      triggerChange(option.value, option)
      if (closeOnSelect) {
        closeMenu()
      }
    },
    [closeMenu, closeOnSelect, triggerChange]
  )

  const panelContent = React.useMemo(() => {
    if (children) {
      return (
        <View style={[styles.customPanel, panelStyle]}>
          {children}
        </View>
      )
    }
    if (!options?.length) {
      return null
    }
    return (
      <View style={[styles.optionPanel, panelStyle]}>
        {options.map(option => {
          const active = value === option.value
          const optionText = getOptionText(option)
          return (
            <Pressable
              key={String(option.value)}
              style={styles.optionRow}
              onPress={() => handleSelect(option)}
              disabled={option.disabled}
              testID={`rv-dropdown-option-${option.value}`}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: active ? (activeColor ?? tokens.colors.activeText) : tokens.colors.text },
                  option.disabled && { color: tokens.colors.disabledText },
                ]}
              >
                {optionText}
              </Text>
              {active
                ? activeIcon ?? (
                  <Text style={[styles.activeIndicator, { color: activeColor ?? tokens.colors.activeText }]}>
                    ✓
                  </Text>
                )
                : null}
            </Pressable>
          )
        })}
      </View>
    )
  }, [
    activeColor,
    activeIcon,
    children,
    handleSelect,
    options,
    panelStyle,
    tokens.colors.activeText,
    tokens.colors.disabledText,
    tokens.colors.placeholder,
    tokens.colors.text,
    value,
  ])

  React.useEffect(() => {
    registerPanel(index, panelContent)
  }, [index, panelContent, registerPanel])

  const prevActiveRef = React.useRef(isActive)
  React.useEffect(() => {
    if (isActive && !prevActiveRef.current) {
      onOpen?.()
    }
    if (!isActive && prevActiveRef.current) {
      onClose?.()
    }
    prevActiveRef.current = isActive
  }, [isActive, onClose, onOpen])

  const handleToggle = () => {
    if (itemDisabled) return
    if (isActive) {
      closeMenu()
    } else {
      toggleItem(index)
    }
  }

  React.useImperativeHandle(
    ref,
    () => ({
      toggle: handleToggle,
      open: () => {
        if (itemDisabled) return
        if (isActive) return
        showItem(index)
      },
      close: () => {
        if (!isActive) return
        closeMenu()
      },
    }),
    [closeMenu, handleToggle, index, isActive, itemDisabled, showItem],
  )

  return (
    <Pressable
      {...rest}
      style={[styles.item, barScrollable ? styles.itemScrollable : null, style]}
      onPress={handleToggle}
      accessibilityRole="button"
      testID={`rv-dropdown-trigger-${index}`}
      disabled={itemDisabled}
    >
      <Text
        style={[
          styles.title,
          textStyle,
          { color: displayColor },
        ]}
        numberOfLines={1}
      >
        {displayLabel}
      </Text>
      <Text style={[styles.arrow, { color: tokens.colors.placeholder }]}>{isActive ? '▲' : '▼'}</Text>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    flex: 1,
  },
  itemScrollable: {
    flex: 0,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  arrow: {
    marginLeft: 4,
    fontSize: 10,
  },
  optionPanel: {
    paddingHorizontal: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  optionText: {
    fontSize: 16,
  },
  activeIndicator: {
    marginLeft: 12,
  },
  customPanel: {
    padding: 16,
  },
})

DropdownItem.displayName = 'DropdownMenu.Item'

export default DropdownItem
