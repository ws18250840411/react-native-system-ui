import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useControllableValue } from '../../hooks'
import type { DropdownItemProps, DropdownOption } from './types'
import { useDropdownMenuContext } from './DropdownMenuContext'
import { useDropdownMenuTokens } from './tokens'

const DropdownItem: React.FC<DropdownItemProps> = props => {
  const {
    options,
    placeholder = '请选择',
    label,
    closeOnSelect = true,
    textStyle,
    panelStyle,
    children,
    onChange,
    style,
    index = 0,
    ...rest
  } = props

  const tokens = useDropdownMenuTokens()
  const { activeIndex, toggleItem, updatePanel, closeMenu, activeColor } = useDropdownMenuContext()
  const [value, triggerChange] = useControllableValue(props, {
    defaultValue: undefined,
    trigger: 'onChange',
  })

  const isActive = activeIndex === index

  const selectedOption = options?.find(option => option.value === value)
  const displayLabel = label ?? selectedOption?.label ?? placeholder
  const displayColor = selectedOption ? (activeColor ?? tokens.colors.activeText) : tokens.colors.placeholder

  const handleSelect = React.useCallback(
    (option: DropdownOption) => {
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
                  option.disabled && { color: tokens.colors.placeholder },
                ]}
              >
                {option.label}
              </Text>
              {active ? <Text style={[styles.activeIndicator, { color: activeColor ?? tokens.colors.activeText }]}>✓</Text> : null}
            </Pressable>
          )
        })}
      </View>
    )
  }, [activeColor, children, handleSelect, options, panelStyle, tokens.colors.activeText, tokens.colors.placeholder, tokens.colors.text, value])

  React.useEffect(() => {
    if (isActive) {
      updatePanel(index, panelContent)
    }
  }, [index, isActive, panelContent, updatePanel])

  const handleToggle = () => {
    if (isActive) {
      closeMenu()
    } else {
      toggleItem(index, panelContent)
    }
  }

  return (
    <Pressable
      {...rest}
      style={[styles.item, style]}
      onPress={handleToggle}
      accessibilityRole="button"
      testID={`rv-dropdown-trigger-${index}`}
    >
      <Text
        style={[
          styles.title,
          textStyle,
          { color: selectedOption ? (activeColor ?? tokens.colors.activeText) : tokens.colors.placeholder },
        ]}
        numberOfLines={1}
      >
        {displayLabel}
      </Text>
      <Text style={[styles.arrow, { color: tokens.colors.placeholder }]}>{isActive ? '▲' : '▼'}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    flex: 1,
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
