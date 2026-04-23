import React, { useCallback } from 'react'
import { Switch as RNSwitch, type GestureResponderEvent } from 'react-native'
import useControllableValue from '../../hooks/useControllableValue'
import { parseNumber } from '../../utils/number'
import type { SwitchProps } from './types'
import { useSwitchTokens } from './tokens'

type SwitchComponent = (<V = boolean>(props: SwitchProps<V>) => React.ReactElement) & { displayName?: string }

const SwitchImpl = <V,>(props: SwitchProps<V>) => {
  const { disabled: disP, size: szP, activeColor: actClrP, inactiveColor: inactClrP, activeValue: actValP, inactiveValue: inactValP, tokensOverride, onClick, style } = props; const tokens = useSwitchTokens(tokensOverride); const disabled = disP ?? tokens.defaults.disabled; const activeValue = (actValP ?? tokens.defaults.activeValue) as V; const inactiveValue = (inactValP ?? tokens.defaults.inactiveValue) as V
  let scale = 1; if (tokens.defaults.size) { if (typeof szP === 'string') { const v = szP.toLowerCase(); scale = v === 'sm' ? 0.75 : v === 'md' ? 1 : v === 'lg' ? 1.25 : Math.max(0, parseNumber(szP, tokens.defaults.size) / tokens.defaults.size) } else if (typeof szP === 'number') scale = Math.max(0, szP / tokens.defaults.size) }; const valuePropName = Object.prototype.hasOwnProperty.call(props, 'checked') ? 'checked' : 'value'; const [value, triggerChange] = useControllableValue<V>(props, { valuePropName, defaultValuePropName: 'defaultChecked', defaultValue: inactiveValue, trigger: 'onChange' }); const isChecked = Object.is(value, activeValue); const actClr = actClrP ?? tokens.colors.activeTrack; const inactClr = inactClrP ?? tokens.colors.inactiveTrack; const handleTouchEnd = useCallback((event: GestureResponderEvent) => { if (disabled) return; onClick?.(event) }, [disabled, onClick]); const handleValueChange = useCallback((nextChecked?: boolean) => { if (disabled) return; const next = (typeof nextChecked === 'boolean' ? nextChecked : !isChecked) ? activeValue : inactiveValue; if (Object.is(next, value)) return; triggerChange(next) }, [activeValue, disabled, inactiveValue, isChecked, triggerChange, value]); return <RNSwitch value={isChecked} disabled={disabled} trackColor={{ false: inactClr, true: actClr }} thumbColor={tokens.colors.handle} ios_backgroundColor={inactClr} style={[{ transform: [{ scaleX: scale }, { scaleY: scale }] }, { opacity: disabled ? tokens.opacity.disabled : 1 }, style]} accessibilityRole="switch" accessibilityState={{ checked: isChecked, disabled }} onValueChange={handleValueChange} onTouchEnd={handleTouchEnd} />
}

export const Switch = React.memo(SwitchImpl) as unknown as SwitchComponent
Switch.displayName = 'Switch'
export default Switch
