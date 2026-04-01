import React, { useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Animated, Easing, View, type LayoutChangeEvent, type ViewProps, type TextProps } from 'react-native'
import { Arrow } from '../../internal/icons'
import { useReducedMotion } from '../../hooks/animation'
import { Cell } from '../cell'
import type { DeepPartial } from '../../types'
import { createHairlineView, isFunction, isNumber, isObject, isRenderable, renderTextOrNode } from '../../utils'
import { useCollapseTokens } from './tokens'
import type { CollapseTokens } from './types'
export type CollapseValue = string | string[]
export interface CollapseProps extends ViewProps { children?: React.ReactNode; accordion?: boolean; value?: CollapseValue; defaultValue?: CollapseValue; onChange?: (value: CollapseValue) => void; border?: boolean; iconPosition?: 'left' | 'right'; expandIcon?: React.ReactNode | ((active: boolean) => React.ReactNode); disabled?: boolean; tokensOverride?: DeepPartial<CollapseTokens> }
export interface CollapsePanelProps extends ViewProps { index?: number; name?: string; title?: React.ReactNode; description?: React.ReactNode; label?: React.ReactNode; icon?: React.ReactNode; extra?: React.ReactNode; value?: React.ReactNode; border?: boolean; isLink?: boolean; size?: 'normal' | 'large'; disabled?: boolean; readOnly?: boolean; children?: React.ReactNode; titleStyle?: TextProps['style']; descriptionStyle?: TextProps['style'] }
export type CollapsePanelInstance = { toggle: (expand?: boolean) => void }
interface CollapseContextValue { activeKeys: string[]; toggle: (name: string, expand?: boolean) => void; accordion: boolean; iconPosition: 'left' | 'right'; expandIcon?: CollapseProps['expandIcon']; border: boolean; disabled?: boolean; tokens: CollapseTokens }
const CollapseContext = React.createContext<CollapseContextValue | null>(null)
const normalizeValue = (value?: CollapseValue): string[] | undefined => value === undefined ? undefined : Array.isArray(value) ? value.map(String) : value === null ? [] : [String(value)]
const buildOutputValue = (keys: string[], accordion: boolean): CollapseValue => accordion ? (keys[0] ?? '') : keys
type CollapseComponent = React.FC<CollapseProps> & {
  Panel: React.ForwardRefExoticComponent<CollapsePanelProps & React.RefAttributes<CollapsePanelInstance>>
  Item: React.ForwardRefExoticComponent<CollapsePanelProps & React.RefAttributes<CollapsePanelInstance>>
}
const CollapseImpl = ((props: CollapseProps) => {
  const { tokensOverride, children, accordion: accP, value, defaultValue, onChange, border: borderP, iconPosition: iconPosP, expandIcon, disabled, style, ...rest } = props; const tokens = useCollapseTokens(tokensOverride); const accordion = accP ?? tokens.defaults.accordion; const border = borderP ?? tokens.defaults.border; const iconPosition = iconPosP ?? tokens.defaults.iconPosition; const { colors } = tokens; const controlled = value !== undefined; const normVal = normalizeValue(value); const normDef = normalizeValue(defaultValue) ?? []; const onChangeRef = useRef(onChange); onChangeRef.current = onChange; const [internalValue, setInternalValue] = useState<string[]>(() => accordion ? normDef.slice(0, 1) : normDef); const activeKeys = controlled ? (accordion ? (normVal ?? []).slice(0, 1) : normVal ?? []) : internalValue; const toggle = useCallback((name: string, expand?: boolean) => { if (disabled) return; const existing = activeKeys.includes(name); const shouldExpand = expand ?? !existing; const nextKeys = accordion ? (shouldExpand ? [name] : existing ? [] : activeKeys) : (shouldExpand ? (existing ? activeKeys : [...activeKeys, name]) : (existing ? activeKeys.filter(k => k !== name) : activeKeys)); if (!controlled) setInternalValue(nextKeys); onChangeRef.current?.(buildOutputValue(nextKeys, accordion)) }, [accordion, activeKeys, controlled, disabled]); const ctxVal: CollapseContextValue = useMemo(() => ({ activeKeys, toggle, accordion, iconPosition, expandIcon, border, disabled, tokens }), [accordion, activeKeys, border, disabled, expandIcon, iconPosition, tokens, toggle]); const renderedChildren = useMemo(() => { const items = React.Children.toArray(children); return items.map((child, i) => { if (!React.isValidElement(child)) return child; if (!isFunction(child.type) && !isObject(child.type)) return child; const name = (child.props as CollapsePanelProps).name ?? String(i); return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, { name, index: i }) }) }, [children]); return (
    <CollapseContext.Provider value={ctxVal}>
      <View style={[tokens.layout.container, border && { backgroundColor: colors.background }, style]} {...rest}>
        {border && <Hairline tokens={tokens} position="top" color={colors.border} />}
        {border && <Hairline tokens={tokens} position="bottom" color={colors.border} />}
        {renderedChildren}
      </View>
    </CollapseContext.Provider>
  )
}) as CollapseComponent
const Hairline = React.memo<{ tokens: CollapseTokens; position: 'top' | 'bottom'; color: string; inset?: number }>(({ tokens, position, color, inset = 0 }) => { const hairlineStyle = createHairlineView({ position, color, left: inset, right: inset }); return <View pointerEvents="none" style={[tokens.layout.hairline, hairlineStyle]} /> })
const CollapsePanel = React.forwardRef<CollapsePanelInstance, CollapsePanelProps>((props, ref) => {
  const context = useContext(CollapseContext)
  const reducedMotion = useReducedMotion()
  if (!context) throw new Error('Collapse.Panel must be used within Collapse')
  const { activeKeys, toggle, iconPosition, expandIcon, disabled: contextDisabled, tokens } = context
  const { name = '0', index = 0, title, description, label, icon, extra, value, border: panelBorder = tokens.defaults.panelBorder, isLink: isLinkProp = tokens.defaults.panelIsLink, size: sizeProp = tokens.defaults.panelSize, disabled, readOnly, children, style, titleStyle, descriptionStyle, ...rest } = props
  const nameKey = String(name)
  const isActive = activeKeys.includes(nameKey)
  const mergedDisabled = contextDisabled || disabled
  const { colors, spacing, typography } = tokens
  const [contentHeight, setContentHeight] = useState(0)
  const animation = useRef(new Animated.Value(isActive ? 1 : 0)).current
  const collapseAnimRef = useRef<Animated.CompositeAnimation | null>(null)
  const rotation = animation.interpolate({ inputRange: [0, 1], outputRange: ['90deg', '-90deg'] })
  useEffect(() => { collapseAnimRef.current?.stop(); const anim = Animated.timing(animation, { toValue: isActive ? 1 : 0, duration: reducedMotion ? 0 : tokens.defaults.animationDuration, easing: Easing.ease, useNativeDriver: false, isInteraction: false }); collapseAnimRef.current = anim; anim.start(({ finished }) => { if (finished) collapseAnimRef.current = null }); return () => { collapseAnimRef.current?.stop(); collapseAnimRef.current = null } }, [animation, isActive, reducedMotion, tokens.defaults.animationDuration])
  const renderedLabel = description ?? label
  const renderedValue = extra ?? value
  const handleToggle = useCallback(() => { if (mergedDisabled || readOnly) return; toggle(nameKey) }, [mergedDisabled, nameKey, readOnly, toggle])
  useImperativeHandle(ref, () => ({ toggle: (expand?: boolean) => { if (mergedDisabled || readOnly) return; toggle(nameKey, expand) } }), [mergedDisabled, nameKey, readOnly, toggle])
  const handleContentLayout = useCallback((event: LayoutChangeEvent) => { const height = event.nativeEvent.layout.height; if (isNumber(height) && Number.isFinite(height)) setContentHeight(prev => prev === height ? prev : height) }, [])
  const animatedStyle = useMemo(() => ({ height: animation.interpolate({ inputRange: [0, 1], outputRange: [0, contentHeight] }) }), [animation, contentHeight])
  const renderExpandIcon = useCallback(() => isFunction(expandIcon) ? expandIcon(isActive) : expandIcon ? expandIcon : (
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <Arrow size={16} fill={mergedDisabled ? colors.disabled : colors.arrow} />
    </Animated.View>
  ), [colors.arrow, colors.disabled, expandIcon, isActive, mergedDisabled, rotation])
  const contentNode = useMemo(() => renderTextOrNode(children, { color: mergedDisabled ? colors.disabled : colors.description, fontFamily: typography.fontFamily, fontSize: typography.descriptionSize, lineHeight: Math.round(typography.descriptionSize * 1.5) }), [children, colors.description, colors.disabled, mergedDisabled, typography.descriptionSize, typography.fontFamily])
  const showInnerBorder = Boolean(panelBorder)
  const showTopBorder = index > 0 && showInnerBorder
  const showHeaderBottomBorder = isActive && showInnerBorder
  const showExpandIcon = isLinkProp && !readOnly
  const headerIcon = iconPosition === 'left' ? (showExpandIcon || isRenderable(icon) ? (
    <View style={tokens.layout.headerIconRow}>
      {showExpandIcon && <View style={{ marginRight: icon ? tokens.spacing.iconGap : 0 }}>{renderExpandIcon()}</View>}
      {icon}
    </View>
  ) : undefined) : icon
  const headerRightIcon = iconPosition === 'right' && showExpandIcon ? renderExpandIcon() : undefined
  return (
    <View style={[tokens.layout.panel, { backgroundColor: colors.background }, style]} {...rest}>
      {showTopBorder && <Hairline tokens={tokens} position="top" color={colors.border} inset={spacing.paddingHorizontal} />}
      <View style={tokens.layout.headerWrapper}>
        <Cell title={title} label={renderedLabel} icon={headerIcon} value={renderedValue} size={sizeProp} border={false} disabled={mergedDisabled} onPress={readOnly ? undefined : handleToggle} accessibilityState={{ expanded: isActive, disabled: mergedDisabled }} titleStyle={mergedDisabled ? [titleStyle, { color: colors.disabled }] : titleStyle} labelStyle={mergedDisabled ? [descriptionStyle, { color: colors.disabled }] : descriptionStyle} valueStyle={mergedDisabled ? { color: colors.disabled } : undefined} rightIcon={headerRightIcon} />
        {showHeaderBottomBorder && <Hairline tokens={tokens} position="bottom" color={colors.border} inset={spacing.paddingHorizontal} />}
      </View>
      <Animated.View style={[tokens.layout.bodyWrapper, animatedStyle]}>
        <View onLayout={handleContentLayout} style={[tokens.layout.bodyContent, { paddingVertical: spacing.paddingVertical, paddingHorizontal: spacing.paddingHorizontal, backgroundColor: colors.background }]}>
          {contentNode}
        </View>
      </Animated.View>
    </View>
  )
})
CollapseImpl.Panel = CollapsePanel
CollapseImpl.Item = CollapsePanel
export const Collapse = Object.assign(React.memo(CollapseImpl), { Panel: CollapsePanel, Item: CollapsePanel })
export default Collapse
