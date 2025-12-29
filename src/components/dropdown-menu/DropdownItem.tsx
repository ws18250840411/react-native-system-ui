import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useControllableValue } from '../../hooks'
import { createHairlineBorderBottom } from '../../utils/hairline'
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
    name,
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
  const {
    activeIndex,
    registerPanel,
    toggleItem,
    showItem,
    closeMenu,
    activeColor,
    activeIcon,
    direction,
    disabled: menuDisabled,
    menuValue,
    onMenuChange,
  } = useDropdownMenuContext()

  // 如果 DropdownMenu 有 value，优先从那里获取
  const menuItemValue = name && menuValue ? menuValue[name] : undefined
  const isMenuControlled = name !== undefined && menuValue !== undefined

  const [localValue, setLocalValue] = React.useState<DropdownOption['value'] | undefined>(
    () => props.value ?? props.defaultValue ?? menuItemValue
  )

  React.useEffect(() => {
    if (isMenuControlled && menuItemValue !== undefined) {
      setLocalValue(menuItemValue)
    } else if (props.value !== undefined) {
      setLocalValue(props.value)
    }
  }, [isMenuControlled, menuItemValue, props.value])

  const value = isMenuControlled ? menuItemValue : (props.value ?? localValue)

  const isActive = activeIndex === index
  const itemDisabled = menuDisabled || itemDisabledProp

  const selectedOption = options?.find(option => option.value === value)
  const selectedText = getOptionText(selectedOption)
  const displayLabel = title ?? label ?? selectedText ?? placeholder
  const displayColor = itemDisabled
    ? tokens.colors.disabledText
    : isActive
      ? (activeColor ?? tokens.colors.activeText)
      : selectedOption
        ? (activeColor ?? tokens.colors.activeText)
        : tokens.colors.placeholder

  const handleSelect = React.useCallback(
    (option: DropdownOption) => {
      if (option.disabled) return
      const newValue = option.value

      // 如果 DropdownMenu 有 onChange，更新 menuValue
      if (name && onMenuChange) {
        const newMenuValue = { ...menuValue, [name]: newValue }
        onMenuChange(newMenuValue)
      }

      // 如果 Item 有自己的 onChange，也调用
      onChange?.(newValue, option)

      // 更新本地值（非受控模式）
      if (!isMenuControlled && props.value === undefined) {
        setLocalValue(newValue)
      }

      if (closeOnSelect) {
        closeMenu()
      }
    },
    [closeMenu, closeOnSelect, name, onMenuChange, menuValue, onChange, isMenuControlled, props.value]
  )

  const renderActiveIcon = React.useCallback(() => {
    const color = activeColor ?? tokens.colors.activeText
    if (activeIcon) {
      if (React.isValidElement(activeIcon)) {
        const iconProps = (activeIcon.props ?? {}) as Record<string, unknown>
        const canSetColor = Object.prototype.hasOwnProperty.call(iconProps, 'fill') || Object.prototype.hasOwnProperty.call(iconProps, 'color')
        return canSetColor
          ? React.cloneElement(activeIcon as React.ReactElement<any>, { fill: color, color })
          : activeIcon
      }
      if (typeof activeIcon === 'string' || typeof activeIcon === 'number') {
        return <Text style={[styles.activeIndicator, { color }]}>{activeIcon}</Text>
      }
      return <View style={styles.activeIndicatorNode}>{activeIcon}</View>
    }
    return <Text style={[styles.activeIndicator, { color }]}>✓</Text>
  }, [activeColor, activeIcon, tokens.colors.activeText])

  const renderOptionIcon = React.useCallback(
    (optionIcon: DropdownOption['icon']) => {
      if (!optionIcon) return null
      if (React.isValidElement(optionIcon)) return optionIcon
      if (typeof optionIcon === 'string' || typeof optionIcon === 'number') {
        return <Text style={styles.optionIconText}>{optionIcon}</Text>
      }
      return optionIcon
    },
    [],
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
          const optionColor = option.disabled
            ? tokens.colors.disabledText
            : active
              ? (activeColor ?? tokens.colors.activeText)
              : tokens.colors.text
          return (
            <Pressable
              key={String(option.value)}
              style={[styles.optionRow, createHairlineBorderBottom('rgba(0,0,0,0.06)')]}
              onPress={() => handleSelect(option)}
              disabled={option.disabled}
              testID={`rv-dropdown-option-${option.value}`}
            >
              <View style={styles.optionLeft}>
                {option.icon ? (
                  <View style={styles.optionIcon}>
                    {renderOptionIcon(option.icon)}
                  </View>
                ) : null}
                {typeof optionText === 'string' || typeof optionText === 'number' ? (
                  <Text style={[styles.optionText, { color: optionColor }]}>{optionText}</Text>
                ) : (
                  <View style={styles.optionTextNode}>{optionText}</View>
                )}
              </View>
              {active ? renderActiveIcon() : null}
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

  const titleStyle = React.useMemo(
    () => [
      styles.title,
      {
        fontSize: tokens.sizing.titleFontSize,
        lineHeight: tokens.sizing.titleLineHeight,
        paddingHorizontal: tokens.spacing.titlePadding,
      },
      textStyle,
      { color: displayColor },
    ],
    [tokens.sizing.titleFontSize, tokens.sizing.titleLineHeight, tokens.spacing.titlePadding, textStyle, displayColor, isActive, selectedOption, activeColor, tokens.colors.activeText, tokens.colors.placeholder, itemDisabled, tokens.colors.disabledText]
  )

  const arrowStyle = React.useMemo(() => {
    const baseStyle: any = [styles.arrow, { borderTopColor: tokens.colors.arrow }]
    if (isActive) {
      baseStyle.push(styles.arrowActive)
      baseStyle.push({
        borderBottomColor: activeColor ?? tokens.colors.activeText,
      })
    }
    return baseStyle
  }, [isActive, activeColor, tokens.colors.activeText, tokens.colors.arrow])

  return (
    <Pressable
      {...rest}
      style={[styles.item, barScrollable ? styles.itemScrollable : null, style]}
      onPress={handleToggle}
      accessibilityRole="button"
      testID={`rv-dropdown-trigger-${index}`}
      disabled={itemDisabled}
    >
      {typeof displayLabel === 'string' || typeof displayLabel === 'number' ? (
        <Text
          style={titleStyle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {displayLabel}
        </Text>
      ) : (
        <View style={styles.titleNode}>{displayLabel}</View>
      )}
      <View style={arrowStyle} />
    </Pressable>
  )
})

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: 0, // hack for flex ellipsis
  },
  itemScrollable: {
    flex: 0,
    paddingHorizontal: 12,
  },
  title: {
    // fontSize and lineHeight will be set dynamically
  },
  titleNode: {
    flexShrink: 1,
    minWidth: 0,
  },
  arrow: {
    marginLeft: 4,
    width: 6,
    height: 6,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    opacity: 0.8,
  },
  arrowActive: {
    borderTopWidth: 0,
    borderBottomWidth: 4,
    borderBottomColor: 'currentColor',
    borderTopColor: 'transparent',
    opacity: 1,
  },
  optionPanel: {
    paddingHorizontal: 0,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  optionIcon: {
    marginRight: 8,
  },
  optionIconText: {
    fontSize: 16,
  },
  optionText: {
    fontSize: 16,
  },
  optionTextNode: {
    flex: 1,
  },
  activeIndicator: {
    marginLeft: 12,
  },
  activeIndicatorNode: {
    marginLeft: 12,
  },
  customPanel: {
    padding: 16,
  },
})

DropdownItem.displayName = 'DropdownMenu.Item'

export default DropdownItem
