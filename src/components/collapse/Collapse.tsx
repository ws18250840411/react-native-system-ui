import React from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type ViewProps,
  type TextProps,
} from 'react-native'
import { Arrow } from 'react-native-system-icon'

import { Cell } from '../cell'
import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { createHairlineView } from '../../utils/hairline'
import { isFunction, isNumber, isObject, isRenderable, isText } from '../../utils/validate'

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

export interface CollapseTokens {
  colors: {
    border: string
    title: string
    description: string
    background: string
    active: string
    arrow: string
    disabled: string
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
      background: '#ffffff',
      active: palette.default[50],
      arrow: palette.default[400],
      disabled: palette.default[400],
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
      titleWeight: String(typography.weight.medium),
    },
    panel: {
      borderRadius: radii.sm,
    },
  }
}

const useCollapseTokens = createComponentTokensHook('collapse', createCollapseTokens)

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
    children,
    tokensOverride,
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

  const tokens = useCollapseTokens(tokensOverride)
  const { colors } = tokens

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

  const items = React.Children.toArray(children)

  const renderedChildren = items.map((child, index) => {
    if (!React.isValidElement(child)) return child
    if (!isFunction(child.type) && !isObject(child.type)) {
      return child
    }
    const name = (child.props as CollapsePanelProps).name ?? String(index)
    return React.cloneElement(child as React.ReactElement<any>, { name, index })
  })

  return (
    <CollapseContext.Provider value={contextValue}>
      <View style={[styles.container, border && { backgroundColor: colors.background }, style]} {...rest}>
        {border ? <Hairline position="top" color={colors.border} /> : null}
        {border ? <Hairline position="bottom" color={colors.border} /> : null}
        {renderedChildren}
      </View>
    </CollapseContext.Provider>
  )
}) as CollapseComponent

const Hairline: React.FC<{
  position: 'top' | 'bottom'
  color: string
  inset?: number
}> = ({ position, color, inset = 0 }) => {
  const hairlineStyle = createHairlineView({
    position,
    color,
    left: inset,
    right: inset,
  })

  return <View pointerEvents="none" style={[styles.hairline, hairlineStyle]} />
}

const CollapsePanel = React.forwardRef<CollapsePanelInstance, CollapsePanelProps>((props, ref) => {
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
    index = 0,
    title,
    description,
    label,
    icon,
    extra,
    value,
    border: panelBorder = true,
    isLink = true,
    size = 'normal',
    disabled,
    readOnly,
    children,
    style,
    titleStyle,
    descriptionStyle,
    ...rest
  } = props

  const isActive = activeKeys.includes(String(name))
  const mergedDisabled = collapseDisabled || disabled
  const { colors, spacing, typography } = tokens

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

  const resolvedLabel = description ?? label
  const resolvedValue = extra ?? value

  const handleToggle = () => {
    if (mergedDisabled || readOnly) return
    toggle(String(name))
  }

  React.useImperativeHandle(
    ref,
    () => ({
      toggle: (expand?: boolean) => {
        if (mergedDisabled || readOnly) return
        toggle(String(name), expand)
      },
    }),
    [mergedDisabled, name, readOnly, toggle],
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

  const renderExpandIcon = () => {
    if (isFunction(expandIcon)) {
      return expandIcon(isActive)
    }
    if (expandIcon) {
      return expandIcon
    }
    return (
      <Animated.View
        style={{
          transform: [
            {
              rotate: animation.interpolate({ inputRange: [0, 1], outputRange: ['90deg', '-90deg'] }),
            },
          ],
        }}
      >
        <Arrow size={16} fill={mergedDisabled ? colors.disabled : colors.arrow} />
      </Animated.View>
    )
  }

  const renderChildren = () => {
    if (isText(children)) {
      return (
        <Text
          style={{
            color: colors.description,
            fontSize: typography.descriptionSize,
            lineHeight: Math.round(typography.descriptionSize * 1.5),
          }}
        >
          {children}
        </Text>
      )
    }
    return children
  }

  const showItemBorder = Boolean(panelBorder)
  const showTopBorder = index > 0 && showItemBorder
  const showHeaderBottomBorder = isActive && showItemBorder
  const showExpandIcon = isLink && !readOnly

  const headerIcon =
    iconPosition === 'left'
      ? showExpandIcon || isRenderable(icon)
        ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {showExpandIcon ? <View style={{ marginRight: icon ? 8 : 0 }}>{renderExpandIcon()}</View> : null}
            {icon}
          </View>
        )
        : undefined
      : icon

  const headerRightIcon = iconPosition === 'right' && showExpandIcon ? renderExpandIcon() : undefined

  return (
    <View
      style={[
        styles.panel,
        {
          backgroundColor: colors.background,
        },
        style,
      ]}
      {...rest}
    >
      {showTopBorder ? <Hairline position="top" color={colors.border} inset={spacing.paddingHorizontal} /> : null}
      <View style={styles.headerWrapper}>
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
          titleStyle={titleStyle}
          labelStyle={descriptionStyle}
          rightIcon={headerRightIcon}
        />
        {showHeaderBottomBorder ? (
          <Hairline position="bottom" color={colors.border} inset={spacing.paddingHorizontal} />
        ) : null}
      </View>
      <Animated.View style={[styles.bodyWrapper, animatedStyle]}>
        <View
          onLayout={handleContentLayout}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            paddingVertical: spacing.paddingVertical,
            paddingHorizontal: spacing.paddingHorizontal,
            backgroundColor: colors.background,
          }}
        >
          {renderChildren()}
        </View>
      </Animated.View>
    </View>
  )
})

Collapse.Panel = CollapsePanel
Collapse.Item = CollapsePanel

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  panel: {
    position: 'relative',
  },
  hairline: {
    position: 'absolute',
  },
  headerWrapper: {
    position: 'relative',
  },
  bodyWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
})

Collapse.displayName = 'Collapse'

export default Collapse
