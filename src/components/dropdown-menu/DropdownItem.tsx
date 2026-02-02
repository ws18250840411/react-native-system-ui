import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useControllableValue } from '../../hooks'
import { createHairlineBorderBottom, isText } from '../../utils'
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
    tokensOverride,
    children,
    onChange,
    onOpen,
    onClose,
    style,
    index = 0,
    barScrollable = false,
    ...rest
  } = props

  const tokens = useDropdownMenuTokens(tokensOverride)
  const {
    activeIndex,
    registerPanel,
    toggleItem,
    showItem,
    closeMenu,
    activeColor,
    activeIcon,
    disabled: menuDisabled,
    menuValue,
    onMenuChange,
  } = useDropdownMenuContext()

  const [itemValue, triggerChange] = useControllableValue<DropdownOption['value'] | undefined>(props)
  const menuItemValue = name ? menuValue?.[name] : undefined
  const value = menuItemValue !== undefined ? menuItemValue : itemValue

  const isActive = activeIndex === index
  const itemDisabled = menuDisabled || itemDisabledProp

  const selectedOption = options?.find(option => option.value === value)
  const selectedText = getOptionText(selectedOption)
  const displayLabel = title ?? label ?? selectedText ?? placeholder
  const activeTextColor = activeColor ?? tokens.colors.activeText
  const displayColor = itemDisabled
    ? tokens.colors.disabledText
    : isActive || selectedOption
      ? activeTextColor
      : tokens.colors.placeholder

  const panelContent = useMemo(() => {
    if (children) {
      return (
        <View
          style={[
            styles.customPanel,
            { padding: tokens.spacing.customPanelPadding },
            panelStyle,
          ]}
        >
          {children}
        </View>
      )
    }
    if (!options?.length) {
      return null
    }

    const renderActiveIcon = () => {
      const color = activeTextColor
      if (activeIcon) {
        if (React.isValidElement(activeIcon)) {
          const iconElement = activeIcon as React.ReactElement<Record<string, unknown>>
          const iconProps = iconElement.props
          return iconProps && ('fill' in iconProps || 'color' in iconProps)
            ? React.cloneElement(iconElement, { fill: color, color })
            : iconElement
        }
        if (isText(activeIcon)) {
          return (
            <Text style={[styles.indicator, { color, marginLeft: tokens.spacing.indicatorMarginLeft }]}>
              {activeIcon}
            </Text>
          )
        }
        return <View style={[styles.indicator, { marginLeft: tokens.spacing.indicatorMarginLeft }]}>{activeIcon}</View>
      }
      return (
        <Text style={[styles.indicator, { color, marginLeft: tokens.spacing.indicatorMarginLeft }]}>
          ✓
        </Text>
      )
    }

    const renderOptionIcon = (optionIcon: DropdownOption['icon']) => {
      if (!optionIcon) return null
      if (React.isValidElement(optionIcon)) return optionIcon
      if (isText(optionIcon)) {
        return (
          <Text style={[styles.optionIconText, { fontSize: tokens.sizing.optionFontSize }]}>
            {optionIcon}
          </Text>
        )
      }
      return optionIcon
    }

    const handleSelect = (option: DropdownOption) => {
      if (option.disabled) return
      const newValue = option.value

      if (name && onMenuChange) onMenuChange({ ...(menuValue ?? {}), [name]: newValue })
      triggerChange(newValue, option)

      if (closeOnSelect) {
        closeMenu()
      }
    }

    return (
      <View
        style={[
          styles.optionPanel,
          { paddingHorizontal: tokens.spacing.panelPaddingHorizontal },
          panelStyle,
        ]}
      >
        {options.map(option => {
          const active = value === option.value
          const optionText = getOptionText(option)
          const optionColor = option.disabled
            ? tokens.colors.disabledText
            : active
              ? activeTextColor
              : tokens.colors.text
          return (
            <Pressable
              key={String(option.value)}
              style={[
                styles.optionRow,
                {
                  paddingVertical: tokens.spacing.optionRowPaddingVertical,
                  paddingHorizontal: tokens.spacing.optionRowPaddingHorizontal,
                },
                createHairlineBorderBottom('rgba(0,0,0,0.06)'),
              ]}
              onPress={() => handleSelect(option)}
              disabled={option.disabled}
              testID={`rv-dropdown-option-${option.value}`}
            >
              <View style={styles.optionLeft}>
                {option.icon ? (
                  <View style={[styles.optionIcon, { marginRight: tokens.spacing.optionIconMarginRight }]}>
                    {renderOptionIcon(option.icon)}
                  </View>
                ) : null}
                {isText(optionText) ? (
                  <Text
                    style={[
                      styles.optionText,
                      { color: optionColor, fontSize: tokens.sizing.optionFontSize },
                    ]}
                  >
                    {optionText}
                  </Text>
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
    activeIcon,
    activeTextColor,
    children,
    closeMenu,
    closeOnSelect,
    menuValue,
    name,
    onMenuChange,
    options,
    panelStyle,
    tokens,
    triggerChange,
    value,
  ])

  useEffect(() => {
    registerPanel(index, panelContent)
  }, [index, panelContent, registerPanel])

  const prevActiveRef = useRef(isActive)
  useEffect(() => {
    if (isActive && !prevActiveRef.current) {
      onOpen?.()
    }
    if (!isActive && prevActiveRef.current) {
      onClose?.()
    }
    prevActiveRef.current = isActive
  }, [isActive, onClose, onOpen])

  const handleToggle = useCallback(() => {
    if (itemDisabled) return
    if (isActive) {
      closeMenu()
    } else {
      toggleItem(index)
    }
  }, [closeMenu, index, isActive, itemDisabled, toggleItem])

  useImperativeHandle(
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

  const titleStyle = useMemo(() => ([
    {
      fontSize: tokens.sizing.titleFontSize,
      lineHeight: tokens.sizing.titleLineHeight,
      paddingHorizontal: tokens.spacing.titlePadding,
    },
    textStyle,
    { color: displayColor },
  ]), [displayColor, textStyle, tokens.sizing.titleFontSize, tokens.sizing.titleLineHeight, tokens.spacing.titlePadding])

  const arrowStyle = useMemo(() => ([
    styles.arrow,
    {
      borderTopColor: tokens.colors.arrow,
      marginLeft: tokens.spacing.arrowMarginLeft,
      width: tokens.sizing.arrowSize,
      height: tokens.sizing.arrowSize,
      borderLeftWidth: tokens.sizing.arrowBorderWidth,
      borderRightWidth: tokens.sizing.arrowBorderWidth,
      borderTopWidth: tokens.sizing.arrowBorderHeight,
      borderLeftColor: tokens.colors.transparent,
      borderRightColor: tokens.colors.transparent,
      opacity: tokens.opacity.arrowInactive,
    },
    isActive && styles.arrowActive,
    isActive && {
      borderBottomColor: activeColor ?? tokens.colors.activeText,
      borderBottomWidth: tokens.sizing.arrowBorderHeight,
      borderTopColor: tokens.colors.transparent,
      opacity: tokens.opacity.arrowActive,
    },
  ]), [
    activeColor,
    isActive,
    tokens.colors.activeText,
    tokens.colors.arrow,
    tokens.colors.transparent,
    tokens.opacity.arrowActive,
    tokens.opacity.arrowInactive,
    tokens.sizing.arrowBorderHeight,
    tokens.sizing.arrowBorderWidth,
    tokens.sizing.arrowSize,
    tokens.spacing.arrowMarginLeft,
  ])

  return (
    <Pressable
      {...rest}
      style={[
        styles.item,
        barScrollable ? [styles.itemScrollable, { paddingHorizontal: tokens.spacing.itemScrollablePaddingHorizontal }] : null,
        style,
      ]}
      onPress={handleToggle}
      accessibilityRole="button"
      testID={`rv-dropdown-trigger-${index}`}
      disabled={itemDisabled}
    >
      {isText(displayLabel) ? (
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
    minWidth: 0,
  },
  itemScrollable: {
    flex: 0,
  },
  titleNode: {
    flexShrink: 1,
    minWidth: 0,
  },
  arrow: {
  },
  arrowActive: {
    borderTopWidth: 0,
  },
  optionPanel: {
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  optionIcon: {
  },
  optionIconText: {
  },
  optionText: {
  },
  optionTextNode: {
    flex: 1,
  },
  indicator: {
  },
  customPanel: {
  },
})

DropdownItem.displayName = 'DropdownMenu.Item'

export default DropdownItem
