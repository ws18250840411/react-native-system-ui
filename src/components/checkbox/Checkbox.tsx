import React, { useContext, useEffect, useImperativeHandle, useRef } from 'react'
import { Platform, Pressable, Text, View, type GestureResponderEvent, type StyleProp, type ViewStyle } from 'react-native'
import { useCheckbox, useCheckboxGroupItem } from '@react-native-aria/checkbox'
import { useToggleState } from '@react-stately/toggle'
import type { CheckboxProps } from './types'
import { CheckboxGroupContext } from './CheckboxContext'
import { useCheckboxTokens } from './tokens'
import { createHairlineView, renderTextOrNode } from '../../utils'
import { isRenderable, isText } from '../../utils/validate'

const EMPTY_CHECKBOX_GROUP_STATE = { value: [] as string[], isDisabled: false, isReadOnly: false, isSelected: () => false, setValue: () => {}, addValue: () => {}, removeValue: () => {}, toggleValue: () => {} } as any

const CheckboxImpl = (p: CheckboxProps, ref: React.ForwardedRef<View>) => {
  const { children, name, value, iconRender, bindGroup: bgp, shape, iconSize, checkedColor, labelPosition, labelDisabled, disabled, style, labelStyle, tokensOverride, hitSlop = 8, accessibilityLabel, ['aria-label']: al, onClick, onChange, ...rest } = p
  const t = useCheckboxTokens(tokensOverride)
  const g = useContext(CheckboxGroupContext)
  const bg = bgp ?? t.defaults.bindGroup
  const rs = shape ?? g?.shape ?? t.defaults.shape
  const ris = iconSize ?? g?.iconSize ?? t.defaults.iconSize
  const rcc = checkedColor ?? g?.checkedColor ?? t.colors.checkedBackground
  const rir = iconRender ?? g?.iconRender
  const rlp = labelPosition ?? t.defaults.labelPosition
  const rld = labelDisabled ?? g?.labelDisabled ?? t.defaults.labelDisabled
  const rd = Boolean(disabled || g?.state.isDisabled)
  const rv = value ?? name
  const sv = rv == null ? undefined : String(rv)
  const ir = useRef<View>(null)
  useImperativeHandle(ref, () => ir.current!)
  const ss = useToggleState({ isSelected: p.checked, defaultSelected: p.defaultChecked, onChange })
  const ig = !!g && sv !== undefined && bg
  const { onBlur, onFocus, ...cr } = rest
  useEffect(() => {
    if (g && bg && sv !== undefined && rv !== undefined) {
      g.registerValue(sv, rv, rd)
      return () => g.unregisterValue(sv)
    }
    return undefined
  }, [bg, g, sv, rv, rd])
  const ral = accessibilityLabel ?? al ?? (isText(children) ? String(children) : undefined) ?? sv ?? 'checkbox'
  const ar = ir as unknown as React.RefObject<HTMLInputElement>
  const { inputProps: gip } = useCheckboxGroupItem(
    { ...cr, value: sv ?? '', isDisabled: rd, 'aria-label': ral },
    ig && g ? g.state : EMPTY_CHECKBOX_GROUP_STATE,
    ar,
  )
  const { inputProps: sip } = useCheckbox(
    { ...cr, isDisabled: rd, value: sv, 'aria-label': ral },
    ss,
    ar,
  )
  const ip: Partial<React.ComponentProps<typeof Pressable>> = ig && g
    ? (gip as unknown as Partial<React.ComponentProps<typeof Pressable>>)
    : (sip as unknown as Partial<React.ComponentProps<typeof Pressable>>)
  const ic = ig && g
    ? g.state.isSelected(sv!)
    : (p.checked !== undefined ? p.checked : ss.isSelected)
  const br = rs === 'round' ? ris / 2 : t.radii.square
  const bc = rd ? t.colors.disabledBorder : ic ? rcc : t.colors.border
  const bgc = rd ? t.colors.disabledBackground : ic ? rcc : t.colors.background
  const lc = rd || rld ? t.colors.labelDisabled : t.colors.label
  const ss_ = rlp === 'left' ? { marginRight: t.spacing.gap } : { marginLeft: t.spacing.gap }
  const oop = ip?.onPress
  const mip: Partial<React.ComponentProps<typeof Pressable>> = ip ? {
    ...ip,
    onPress: (e: GestureResponderEvent) => {
      onClick?.(e)
      if (ig && g?.max && !ic && g.state.value.length >= g.max) return
      if (oop) {
        oop(e)
        return
      }
      if (ig && g && sv !== undefined) {
        if (ic) g.state.removeValue(sv)
        else g.state.addValue(sv)
        return
      }
      if (p.checked !== undefined) {
        onChange?.(!p.checked)
        return
      }
      if (onChange) {
        ss.setSelected(!ss.isSelected)
      }
    },
  } : {}
  const ln = !isRenderable(children) ? null : isText(children) ? (
    <Text accessible={false} style={[t.layout.label, { color: lc, fontSize: t.typography.fontSize, lineHeight: t.typography.fontSize * t.typography.lineHeightMultiplier, fontFamily: t.typography.fontFamily, fontWeight: t.typography.fontWeight }, labelStyle]}>{children}</Text>
  ) : (
    <View accessible={false} style={labelStyle as unknown as StyleProp<ViewStyle>}>{children}</View>
  )
  const ibs = { width: ris, height: ris, borderRadius: br, backgroundColor: bgc }
  const di = (
    <View style={[t.layout.icon, ibs]}>
      {ic && <Text style={[t.layout.checkmark, { color: t.colors.checkmark, fontSize: ris * t.icon.scale }]}>✓</Text>}
      <View style={createHairlineView({ position: 'all', color: bc, borderRadius: br })} />
    </View>
  )
  let iv: React.ReactNode = di
  if (rir) {
    iv = rir({ checked: Boolean(ic), disabled: Boolean(rd) }) ?? null
  }
  const i = !rd && !rld
  const lw = ln && (
    <View style={[t.layout.labelWrapper, ss_]} pointerEvents={rld ? 'none' : undefined} accessible={false}>
      {ln}
    </View>
  )
  const iws = [t.layout.iconWrapper, rlp === 'left' ? { marginLeft: t.spacing.gap } : { marginRight: t.spacing.gap }]
  const iw = i ? (
    <View style={iws}>{iv}</View>
  ) : (
    <Pressable {...mip} ref={ir} disabled={rd} accessibilityLabel={ral} accessibilityRole="checkbox" accessibilityState={{ checked: ic, disabled: !!rd }} style={iws} hitSlop={hitSlop}>
      {iv}
    </Pressable>
  )
  const cnt = rlp === 'left' ? <>{lw}{iw}</> : <>{iw}{lw}</>
  if (i) {
    return (
      <Pressable {...mip} ref={ir} disabled={rd} accessibilityLabel={ral} accessibilityRole="checkbox" accessibilityState={{ checked: ic, disabled: !!rd }} style={({ pressed }) => [t.layout.container, style, Platform.OS === 'web' && ({ cursor: 'pointer' } as unknown as ViewStyle), pressed && { opacity: 0.8 }]} hitSlop={hitSlop}>
        {cnt}
      </Pressable>
    )
  }
  return (
    <View style={[t.layout.container, style]}>
      {cnt}
    </View>
  )
}

const CheckboxForwardRef = React.forwardRef<View, CheckboxProps>(CheckboxImpl)
export const Checkbox = React.memo(CheckboxForwardRef)
export default Checkbox
