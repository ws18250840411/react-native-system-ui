import React, { useMemo } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { View } from 'react-native'
import type { ButtonIconPosition, ButtonShadowLevel, ButtonSize, ButtonType } from './types'
import { useButtonTokens } from './tokens'

export interface ButtonGroupContextValue { type?: ButtonType; size?: ButtonSize; plain?: boolean; block?: boolean; round?: boolean; square?: boolean; shadow?: boolean | ButtonShadowLevel; disabled?: boolean; iconPosition?: ButtonIconPosition; hairline?: boolean }
export const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(null)

export interface ButtonGroupProps extends ButtonGroupContextValue { children: React.ReactNode; direction?: 'horizontal' | 'vertical'; spacing?: number; style?: StyleProp<ViewStyle> }

export const ButtonGroup = React.memo<ButtonGroupProps>(({ children, direction = 'horizontal', spacing, style, type, size, plain, block, round, square, shadow, disabled, iconPosition, hairline }) => { const tokens = useButtonTokens(); const gap = spacing ?? tokens.spacing.groupGap; const grpVal = useMemo(() => ({ type, size, plain, block, round, square, shadow, disabled, iconPosition, hairline }), [block, disabled, hairline, iconPosition, plain, round, shadow, size, square, type]); const ctrStyle = useMemo(() => [{ flexDirection: direction === 'horizontal' ? 'row' : 'column', alignItems: 'center', gap, width: block ? '100%' : undefined } as ViewStyle, style], [block, direction, gap, style]); return <ButtonGroupContext.Provider value={grpVal}><View style={ctrStyle}>{children}</View></ButtonGroupContext.Provider>
})
