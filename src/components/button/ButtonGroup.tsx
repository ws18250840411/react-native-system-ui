import React, { useMemo } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { View } from 'react-native'
import { ButtonGroupContext } from './Button'
import type { ButtonGroupContextValue } from './Button'
import { useButtonTokens } from './tokens'

export interface ButtonGroupProps extends ButtonGroupContextValue { children: React.ReactNode; direction?: 'horizontal' | 'vertical'; spacing?: number; style?: StyleProp<ViewStyle> }

export const ButtonGroup = React.memo<ButtonGroupProps>(({ children, direction = 'horizontal', spacing, style, type, size, plain, block, round, square, shadow, disabled, iconPosition, hairline }) => { const tokens = useButtonTokens(); const gap = spacing ?? tokens.spacing.groupGap; const grpVal = useMemo(() => ({ type, size, plain, block, round, square, shadow, disabled, iconPosition, hairline }), [block, disabled, hairline, iconPosition, plain, round, shadow, size, square, type]); return <ButtonGroupContext.Provider value={grpVal}><View style={[{ flexDirection: direction === 'horizontal' ? 'row' : 'column', alignItems: 'center', gap, width: block ? '100%' : undefined } as ViewStyle, style]}>{children}</View></ButtonGroupContext.Provider>
})
