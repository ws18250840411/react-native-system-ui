import React, { useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Text,
  View,
  type LayoutChangeEvent,
  type ViewProps,
  type TextProps,
} from 'react-native'
import { Arrow } from 'react-native-system-icon'

import { Cell } from '../cell'
import type { DeepPartial } from '../../types'
import { createHairlineView, isFunction, isNumber, isObject, isRenderable, isText } from '../../utils'
import { useCollapseTokens } from './tokens'
import type { CollapseTokens } from './types'

export type CollapseValue = string | string[]

export interface CollapseProps extends ViewProps {
  children?: React.ReactNode
  accordion?: boolean
  value?: CollapseValue
  defaultValue?: CollapseValue
  onChange?: (value: CollapseValue) => void
  border?: boolean
  iconPosition?: 'left' | 'right'
  expandIcon?: React.ReactNode | ((active: boolean) => React.ReactNode)
  disabled?: boolean
  tokensOverride?: DeepPartial<CollapseTokens>
}

export interface CollapsePanelProps extends ViewProps {
  /** @private */
  index?: number
  name?: string
  title?: React.ReactNode
  description?: React.ReactNode
  label?: React.ReactNode
  icon?: React.ReactNode
  extra?: React.ReactNode
  value?: React.ReactNode
  border?: boolean
  isLink?: boolean
  size?: 'normal' | 'large'
  disabled?: boolean
  readOnly?: boolean
  children?: React.ReactNode
  titleStyle?: TextProps['style']
  descriptionStyle?: TextProps['style']
}

export type CollapsePanelInstance = {
  toggle: (expand?: boolean) => void
}

interface CollapseContextValue {
  activeKeys: string[]
  toggle: (name: string, expand?: boolean) => void
  accordion: boolean
  iconPosition: 'left' | 'right'
  expandIcon?: CollapseProps['expandIcon']
  border: boolean
  disabled?: boolean
  tokens: CollapseTokens
}

const CollapseContext = React.createContext<CollapseContextValue | null>(null)

const normalizeValue = (value?: CollapseValue): string[] | undefined => {
  if (value === undefined) return undefined
  if (Array.isArray(value)) return value.map(String)
  if (value === null) return []
  return [String(value)]
}

const buildOutputValue = (keys: string[], accordion: boolean): CollapseValue => {
  if (accordion) {
    return keys[0] ?? ''
  }
  return keys
}

type CollapseComponent = React.FC<CollapseProps> & {
  Panel: React.ForwardRefExoticComponent<CollapsePanelProps & React.RefAttributes<CollapsePanelInstance>>
  Item: React.ForwardRefExoticComponent<CollapsePanelProps & React.RefAttributes<CollapsePanelInstance>>
}

export const Collapse = ((props: CollapseProps) => {
  const {
    tokensOverride,
    children,
    accordion: accordionProp,
    value,
    defaultValue,
    onChange,
    border: borderProp,
    iconPosition: iconPositionProp,
    expandIcon,
    disabled,
    style,
    ...rest
  } = props
  const tokens = useCollapseTokens(tokensOverride)
  const accordion = accordionProp ?? tokens.defaults.accordion
  const border = borderProp ?? tokens.defaults.border
  const iconPosition = iconPositionProp ?? tokens.defaults.iconPosition

  const { colors } = tokens

  const controlled = value !== undefined
  const normalizedValue = normalizeValue(value)
  const normalizedDefault = normalizeValue(defaultValue) ?? []

  const [internalValue, setInternalValue] = useState<string[]>(() =>
    accordion ? normalizedDefault.slice(0, 1) : normalizedDefault,
  )

  const activeKeys = controlled
    ? accordion
      ? (normalizedValue ?? []).slice(0, 1)
      : normalizedValue ?? []
    : internalValue

  const toggle = useCallback(
    (name: string, expand?: boolean) => {
      if (disabled) return
      const current = activeKeys
      const exists = current.includes(name)
      let next: string[]
      if (accordion) {
        if (expand === true) {
          next = exists ? current : [name]
        } else if (expand === false) {
          next = exists ? [] : current
        } else {
          next = exists ? [] : [name]
        }
      } else {
        if (expand === true) {
          next = exists ? current : [...current, name]
        } else if (expand === false) {
          next = exists ? current.filter(item => item !== name) : current
        } else {
          next = exists ? current.filter(item => item !== name) : [...current, name]
        }
      }
      if (!controlled) {
        setInternalValue(next)
      }
      onChange?.(buildOutputValue(next, accordion))
    },
    [accordion, activeKeys, controlled, disabled, onChange],
  )

  const contextValue: CollapseContextValue = {
    activeKeys,
    toggle,
    accordion,
    iconPosition,
    expandIcon,
    border,
    disabled,
    tokens,
  }

  const renderedChildren = (() => {
    const items = React.Children.toArray(children)
    return items.map((child, index) => {
      if (!React.isValidElement(child)) return child
      if (!isFunction(child.type) && !isObject(child.type)) {
        return child
      }
      const name = (child.props as CollapsePanelProps).name ?? String(index)
      return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, { name, index })
    })
  })()

  return (
    <CollapseContext.Provider value={contextValue}>
      <View style={[tokens.layout.container, border && { backgroundColor: colors.background }, style]} {...rest}>
        {border && <Hairline tokens={tokens} position="top" color={colors.border} />}
        {border && <Hairline tokens={tokens} position="bottom" color={colors.border} />}
        {renderedChildren}
      </View>
    </CollapseContext.Provider>
  )
}) as CollapseComponent

const Hairline: React.FC<{
  tokens: CollapseTokens
  position: 'top' | 'bottom'
  color: string
  inset?: number
}> = ({ tokens, position, color, inset = 0 }) => {
  const hairlineStyle = createHairlineView({
    position,
    color,
    left: inset,
    right: inset,
  })

  return <View pointerEvents="none" style={[tokens.layout.hairline, hairlineStyle]} />
}

const CollapsePanel = React.forwardRef<CollapsePanelInstance, CollapsePanelProps>((props, ref) => {
  const context = useContext(CollapseContext)
  if (!context) {
    throw new Error('Collapse.Panel must be used within Collapse')
  }

  const {
    activeKeys,
    toggle,
    iconPosition,
    expandIcon,
    disabled: collapseDisabled,
    tokens,
  } = context

  const {
    name = '0',
    index = 0,
    title,
    description,
    label,
    icon,
    extra,
    value,
    border: panelBorder = tokens.defaults.panelBorder,
    isLink = tokens.defaults.panelIsLink,
    size = tokens.defaults.panelSize,
    disabled,
    readOnly,
    children,
    style,
    titleStyle,
    descriptionStyle,
    ...rest
  } = props

  const nameKey = String(name)
  const isActive = activeKeys.includes(nameKey)
  const mergedDisabled = collapseDisabled || disabled
  const { colors, spacing, typography } = tokens

  const [contentHeight, setContentHeight] = useState(0)
  const animation = useRef(new Animated.Value(isActive ? 1 : 0)).current
  const rotate = animation.interpolate({ inputRange: [0, 1], outputRange: ['90deg', '-90deg'] })

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isActive ? 1 : 0,
      duration: tokens.defaults.animationDuration,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }, [animation, isActive, tokens.defaults.animationDuration])

  const resolvedLabel = description ?? label
  const resolvedValue = extra ?? value

  const handleToggle = useCallback(() => {
    if (mergedDisabled || readOnly) return
    toggle(nameKey)
  }, [mergedDisabled, nameKey, readOnly, toggle])

  useImperativeHandle(
    ref,
    () => ({
      toggle: (expand?: boolean) => {
        if (mergedDisabled || readOnly) return
        toggle(nameKey, expand)
      },
    }),
    [mergedDisabled, nameKey, readOnly, toggle],
  )

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const nextHeight = event.nativeEvent.layout.height
    if (isNumber(nextHeight) && Number.isFinite(nextHeight) && nextHeight !== contentHeight) {
      setContentHeight(nextHeight)
    }
  }

  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight],
    }),
  }

  const renderExpandIcon = useCallback(() => {
    if (isFunction(expandIcon)) {
      return expandIcon(isActive)
    }
    if (expandIcon) {
      return expandIcon
    }
    return (
      <Animated.View
        style={{
          transform: [{ rotate }],
        }}
      >
        <Arrow size={16} fill={mergedDisabled ? colors.disabled : colors.arrow} />
      </Animated.View>
    )
  }, [colors.arrow, colors.disabled, expandIcon, isActive, mergedDisabled, rotate])

  const contentNode = !isText(children) ? children : (
    <Text
      style={{
        color: mergedDisabled ? colors.disabled : colors.description,
        fontSize: typography.descriptionSize,
        lineHeight: Math.round(typography.descriptionSize * 1.5),
      }}
    >
      {children}
    </Text>
  )

  const showItemBorder = Boolean(panelBorder)
  const showTopBorder = index > 0 && showItemBorder
  const showHeaderBottomBorder = isActive && showItemBorder
  const showExpandIcon = isLink && !readOnly

  const headerIcon =
    iconPosition === 'left'
      ? showExpandIcon || isRenderable(icon)
        ? (
          <View style={tokens.layout.headerIconRow}>
            {showExpandIcon ? (
              <View style={{ marginRight: icon ? tokens.spacing.iconGap : 0 }}>
                {renderExpandIcon()}
              </View>
            ) : null}
            {icon}
          </View>
        )
        : undefined
      : icon

  const headerRightIcon = iconPosition === 'right' && showExpandIcon ? renderExpandIcon() : undefined

  return (
    <View
      style={[
        tokens.layout.panel,
        {
          backgroundColor: colors.background,
        },
        style,
      ]}
      {...rest}
    >
      {showTopBorder ? (
        <Hairline tokens={tokens} position="top" color={colors.border} inset={spacing.paddingHorizontal} />
      ) : null}
      <View style={tokens.layout.headerWrapper}>
        <Cell
          title={title}
          label={resolvedLabel}
          icon={headerIcon}
          value={resolvedValue}
          size={size}
          border={false}
          disabled={mergedDisabled}
          onPress={readOnly ? undefined : handleToggle}
          accessibilityState={{ expanded: isActive, disabled: mergedDisabled }}
          titleStyle={mergedDisabled ? [titleStyle, { color: colors.disabled }] : titleStyle}
          labelStyle={mergedDisabled ? [descriptionStyle, { color: colors.disabled }] : descriptionStyle}
          valueStyle={mergedDisabled ? { color: colors.disabled } : undefined}
          rightIcon={headerRightIcon}
        />
        {showHeaderBottomBorder ? (
          <Hairline tokens={tokens} position="bottom" color={colors.border} inset={spacing.paddingHorizontal} />
        ) : null}
      </View>
      <Animated.View style={[tokens.layout.bodyWrapper, animatedStyle]}>
        <View
          onLayout={handleContentLayout}
          style={[
            tokens.layout.bodyContent,
            {
              paddingVertical: spacing.paddingVertical,
              paddingHorizontal: spacing.paddingHorizontal,
              backgroundColor: colors.background,
            },
          ]}
        >
          {contentNode}
        </View>
      </Animated.View>
    </View>
  )
})

Collapse.Panel = CollapsePanel
Collapse.Item = CollapsePanel

Collapse.displayName = 'Collapse'

export default Collapse
