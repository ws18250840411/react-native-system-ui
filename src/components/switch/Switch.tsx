import React, { useCallback, useMemo } from 'react'
import { Switch as RNSwitch, type GestureResponderEvent } from 'react-native'
import { useControllableValue } from '../../hooks'
import { parseNumber } from '../../utils'
import type { SwitchProps } from './types'
import { useSwitchTokens } from './tokens'

type SwitchComponent = (<V = boolean>(props: SwitchProps<V>) => React.ReactElement) & { displayName?: string }

const SwitchImpl = <V,>(props: SwitchProps<V>) => {
  const { disabled: disabledProp, size: sizeProp, activeColor: activeColorProp, inactiveColor: inactiveColorProp, activeValue: activeValueProp, inactiveValue: inactiveValueProp, tokensOverride, onClick, style } = props
  const tokens = useSwitchTokens(tokensOverride)
  const disabled = disabledProp ?? tokens.defaults.disabled
  const activeValue = (activeValueProp ?? tokens.defaults.activeValue) as V
  const inactiveValue = (inactiveValueProp ?? tokens.defaults.inactiveValue) as V
  const scale = useMemo(() => {
    if (!tokens.defaults.size) return 1
    if (typeof sizeProp === 'string') {
      const value = sizeProp.toLowerCase()
      if (value === 'sm') return 0.75
      if (value === 'md') return 1
      if (value === 'lg') return 1.25
      const num = parseNumber(sizeProp, tokens.defaults.size)
      return Math.max(0, num / tokens.defaults.size)
    }
    if (typeof sizeProp === 'number') return Math.max(0, sizeProp / tokens.defaults.size)
    return 1
  }, [sizeProp, tokens.defaults.size])
  const [value, triggerChange] = useControllableValue<V>(props, { valuePropName: 'checked', defaultValuePropName: 'defaultChecked', defaultValue: inactiveValue, trigger: 'onChange' })
  const isChecked = Object.is(value, activeValue)
  const resolvedActiveColor = activeColorProp ?? tokens.colors.activeTrack
  const resolvedInactiveColor = inactiveColorProp ?? tokens.colors.inactiveTrack
  const handleTouchEnd = useCallback((event: GestureResponderEvent) => { if (disabled) return; onClick?.(event) }, [disabled, onClick])
  const handleValueChange = useCallback(() => { if (disabled) return; const next = isChecked ? inactiveValue : activeValue; if (Object.is(next, value)) return; triggerChange(next) }, [activeValue, disabled, inactiveValue, isChecked, triggerChange, value])
  return <RNSwitch value={isChecked} disabled={disabled} trackColor={{ false: resolvedInactiveColor, true: resolvedActiveColor }} thumbColor={tokens.colors.handle} ios_backgroundColor={resolvedInactiveColor} style={[{ transform: [{ scaleX: scale }, { scaleY: scale }] }, { opacity: disabled ? tokens.opacity.disabled : 1 }, style]} accessibilityRole="switch" accessibilityState={{ checked: isChecked, disabled }} onValueChange={handleValueChange} onTouchEnd={handleTouchEnd} />
}

export const Switch = React.memo(SwitchImpl) as unknown as SwitchComponent
Switch.displayName = 'Switch'
export default Switch
