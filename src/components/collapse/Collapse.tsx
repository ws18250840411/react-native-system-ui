import React from 'react'
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewProps,
  type TextProps,
} from 'react-native'
import { Arrow } from 'react-native-system-icon'

import { useTheme } from '../../design-system'
import { useAriaPress } from '../../hooks'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

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
}

export interface CollapsePanelProps extends ViewProps {
  name?: string
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  extra?: React.ReactNode
  disabled?: boolean
  children?: React.ReactNode
  titleStyle?: TextProps['style']
  descriptionStyle?: TextProps['style']
}

interface CollapseTokens {
  colors: {
    border: string
    title: string
    description: string
    background: string
    active: string
  }
  spacing: {
    paddingVertical: number
    paddingHorizontal: number
    descriptionTop: number
  }
  typography: {
    titleSize: number
    descriptionSize: number
    fontFamily: string
    titleWeight: string
  }
  panel: {
    borderRadius: number
  }
}

const createCollapseTokens = (foundations: Foundations): CollapseTokens => {
  const { palette, spacing, fontSize, typography, radii } = foundations

  return {
    colors: {
      border: palette.default[200],
      title: palette.default[800],
      description: palette.default[500],
      background: palette.default[50],
      active: palette.default[100],
    },
    spacing: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      descriptionTop: spacing.xs,
    },
    typography: {
      titleSize: fontSize.md,
      descriptionSize: fontSize.sm,
      fontFamily: typography.fontFamily,
      titleWeight: typography.weight.medium,
    },
    panel: {
      borderRadius: radii.sm,
    },
  }
}

interface CollapseContextValue {
  activeKeys: string[]
  toggle: (name: string) => void
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

const useCollapseTokens = (overrides?: DeepPartial<CollapseTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createCollapseTokens(foundations)
    const globalOverrides = components?.collapse as DeepPartial<CollapseTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [foundations, components, overrides])
}

export const Collapse: React.FC<CollapseProps> & { Panel: React.FC<CollapsePanelProps> } = props => {
  const {
    children,
    accordion = false,
    value,
    defaultValue,
    onChange,
    border = true,
    iconPosition = 'right',
    expandIcon,
    disabled,
    style,
    ...rest
  } = props

  const tokens = useCollapseTokens()

  const controlled = value !== undefined
  const normalizedValue = normalizeValue(value)
  const normalizedDefault = normalizeValue(defaultValue) ?? []

  const [internalValue, setInternalValue] = React.useState<string[]>(() =>
    accordion ? normalizedDefault.slice(0, 1) : normalizedDefault,
  )

  const activeKeys = controlled
    ? accordion
      ? (normalizedValue ?? []).slice(0, 1)
      : normalizedValue ?? []
    : internalValue

  const toggle = React.useCallback(
    (name: string) => {
      if (disabled) return
      const current = activeKeys
      const exists = current.includes(name)
      let next: string[]
      if (accordion) {
        next = exists ? [] : [name]
      } else {
        next = exists ? current.filter(item => item !== name) : [...current, name]
      }
      if (!controlled) {
        setInternalValue(next)
      }
      onChange?.(buildOutputValue(next, accordion))
    },
    [accordion, activeKeys, controlled, disabled, onChange],
  )

  const contextValue = React.useMemo<CollapseContextValue>(() => ({
    activeKeys,
    toggle,
    accordion,
    iconPosition,
    expandIcon,
    border,
    disabled,
    tokens,
  }), [activeKeys, accordion, border, disabled, expandIcon, iconPosition, toggle, tokens])

  const items = React.Children.toArray(children)

  const renderedChildren = items.map((child, index) => {
    if (!React.isValidElement(child)) return child
    if (typeof child.type !== 'function' && typeof child.type !== 'object') {
      return child
    }
    const name = (child.props as CollapsePanelProps).name ?? String(index)
    return React.cloneElement(child, { name })
  })

  return (
    <CollapseContext.Provider value={contextValue}>
      <View style={style} {...rest}>
        {renderedChildren}
      </View>
    </CollapseContext.Provider>
  )
}

const CollapsePanel: React.FC<CollapsePanelProps> = props => {
  const context = React.useContext(CollapseContext)
  if (!context) {
    throw new Error('Collapse.Panel must be used within Collapse')
  }

  const {
    activeKeys,
    toggle,
    accordion,
    iconPosition,
    expandIcon,
    border,
    disabled: collapseDisabled,
    tokens,
  } = context

  const {
    name = '0',
    title,
    description,
    icon,
    extra,
    disabled,
    children,
    style,
    titleStyle,
    descriptionStyle,
    ...rest
  } = props

  const isActive = activeKeys.includes(String(name))
  const mergedDisabled = collapseDisabled || disabled

  const contentRef = React.useRef<View>(null)
  const [contentHeight, setContentHeight] = React.useState(0)
  const animation = React.useRef(new Animated.Value(isActive ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }, [animation, isActive])

  const handleToggle = () => {
    if (mergedDisabled) return
    toggle(String(name))
  }

  const handleLayout = (event: any) => {
    if (contentHeight === 0) {
      setContentHeight(event.nativeEvent.layout.height)
    }
  }

  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight],
    }),
    opacity: animation,
  }

  const renderExpandIcon = () => {
    if (typeof expandIcon === 'function') {
      return expandIcon(isActive)
    }
    if (expandIcon) {
      return expandIcon
    }
    return (
      <Animated.View style={{ transform: [{ rotate: animation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
        <Arrow size={14} fill={tokens.colors.description} />
      </Animated.View>
    )
  }

  const renderChildren = () => {
    if (typeof children === 'string' || typeof children === 'number') {
      return <Text style={{ color: tokens.colors.description, fontSize: tokens.typography.descriptionSize }}>{children}</Text>
    }
    return children
  }

  const content = (
    <Animated.View style={[styles.body, animatedStyle]}>
      <View
        onLayout={handleLayout}
        style={{ paddingHorizontal: tokens.spacing.paddingHorizontal, paddingBottom: tokens.spacing.paddingVertical }}
      >
        {renderChildren()}
      </View>
    </Animated.View>
  )

  const showBorder = border && !accordion

  const headerPress = useAriaPress({
    disabled: mergedDisabled,
    onPress: handleToggle,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityState: { expanded: isActive, disabled: mergedDisabled },
    },
  })

  return (
    <View
      style={[
        styles.panel,
        {
          borderColor: tokens.colors.border,
          borderTopWidth: showBorder ? StyleSheet.hairlineWidth : 0,
        },
        style,
      ]}
      {...rest}
    >
      <Pressable
        disabled={mergedDisabled}
        {...headerPress.interactionProps}
        style={[
          styles.header,
          {
            paddingHorizontal: tokens.spacing.paddingHorizontal,
            paddingVertical: tokens.spacing.paddingVertical,
            opacity: mergedDisabled ? 0.5 : headerPress.states.pressed ? 0.7 : 1,
          },
        ]}
      >
        {iconPosition === 'left' ? renderExpandIcon() : null}
        {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
        <View style={styles.headerText}>
          {title ? (
            <Text
              style={[
                styles.title,
                {
                  color: tokens.colors.title,
                  fontSize: tokens.typography.titleSize,
                  fontFamily: tokens.typography.fontFamily,
                  fontWeight: tokens.typography.titleWeight,
                },
                titleStyle,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text
              style={[
                styles.description,
                {
                  marginTop: tokens.spacing.descriptionTop,
                  color: tokens.colors.description,
                  fontSize: tokens.typography.descriptionSize,
                },
                descriptionStyle,
              ]}
              numberOfLines={2}
            >
              {description}
            </Text>
          ) : null}
        </View>
        <View style={{ flexShrink: 0, marginLeft: 8 }}>{extra}</View>
        {iconPosition === 'right' ? renderExpandIcon() : null}
      </Pressable>
      {contentHeight > 0 ? content : (
        <View style={{ paddingHorizontal: tokens.spacing.paddingHorizontal }} onLayout={handleLayout}>
          <View>{renderChildren()}</View>
        </View>
      )}
    </View>
  )
}

Collapse.Panel = CollapsePanel

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#111',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  body: {
    overflow: 'hidden',
  },
})

Collapse.displayName = 'Collapse'

export default Collapse
