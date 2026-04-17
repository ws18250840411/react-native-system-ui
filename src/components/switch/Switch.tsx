import React, { useCallback, useMemo } from 'react'
import { Switch as RNSwitch, type GestureResponderEvent } from 'react-native'
import useControllableValue from '../../hooks/useControllableValue'
import { parseNumber } from '../../utils/number'
import type { SwitchProps } from './types'
import { useSwitchTokens } from './tokens'

type SwitchComponent = (<V = boolean>(props: SwitchProps<V>) => React.ReactElement) & { displayName?: string }

const SwitchImpl = <V,>(props: SwitchProps<V>) => {
  const { disabled: disP, size: szP, activeColor: actClrP, inactiveColor: inactClrP, activeValue: actValP, inactiveValue: inactValP, tokensOverride, onClick, style } = props; const tokens = useSwitchTokens(tokensOverride); const disabled = disP ?? tokens.defaults.disabled; const activeValue = (actValP ?? tokens.defaults.activeValue) as V; const inactiveValue = (inactValP ?? tokens.defaults.inactiveValue) as V
  const scale = useMemo(() => { if (!tokens.defaults.size) return 1; if (typeof szP === 'string') { const v = szP.toLowerCase(); if (v === 'sm') return 0.75; if (v === 'md') return 1; if (v === 'lg') return 1.25; return Math.max(0, parseNumber(szP, tokens.defaults.size) / tokens.defaults.size) }; if (typeof szP === 'number') return Math.max(0, szP / tokens.defaults.size); return 1 }, [szP, tokens.defaults.size]); const [value, triggerChange] = useControllableValue<V>(props, { valuePropName: 'checked', defaultValuePropName: 'defaultChecked', defaultValue: inactiveValue, trigger: 'onChange' }); const isChecked = Object.is(value, activeValue); const actClr = actClrP ?? tokens.colors.activeTrack; const inactClr = inactClrP ?? tokens.colors.inactiveTrack; const handleTouchEnd = useCallback((event: GestureResponderEvent) => { if (disabled) return; onClick?.(event) }, [disabled, onClick]); const handleValueChange = useCallback(() => { if (disabled) return; const next = isChecked ? inactiveValue : activeValue; if (Object.is(next, value)) return; triggerChange(next) }, [activeValue, disabled, inactiveValue, isChecked, triggerChange, value]); return <RNSwitch value={isChecked} disabled={disabled} trackColor={{ false: inactClr, true: actClr }} thumbColor={tokens.colors.handle} ios_backgroundColor={inactClr} style={[{ transform: [{ scaleX: scale }, { scaleY: scale }] }, { opacity: disabled ? tokens.opacity.disabled : 1 }, style]} accessibilityRole="switch" accessibilityState={{ checked: isChecked, disabled }} onValueChange={handleValueChange} onTouchEnd={handleTouchEnd} />
}

export const Switch = React.memo(SwitchImpl) as unknown as SwitchComponent
Switch.displayName = 'Switch'
export default Switch
