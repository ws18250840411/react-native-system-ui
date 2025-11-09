import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { View } from 'react-native'

import { useTheme } from '../../design-system'
import { ButtonGroupContext, type ButtonGroupContextValue } from './ButtonContext'

export interface ButtonGroupProps extends ButtonGroupContextValue {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  spacing?: number
  style?: StyleProp<ViewStyle>
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  direction = 'horizontal',
  spacing,
  style,
  ...contextValue
}) => {
  const { foundations } = useTheme()
  const gap = spacing ?? foundations.spacing.xs

  const wrapped = React.useMemo(() => {
    const validChildren = React.Children.toArray(children)
    return validChildren.map((child, index) => {
      const isLast = index === validChildren.length - 1
      const marginStyles: ViewStyle =
        direction === 'horizontal'
          ? { marginRight: isLast ? 0 : gap }
          : { marginBottom: isLast ? 0 : gap }

      return (
        <View key={index} style={marginStyles}>
          {child}
        </View>
      )
    })
  }, [children, direction, gap])

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <View
        style={[
          {
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            alignItems: 'center',
          },
          style,
        ]}
      >
        {wrapped}
      </View>
    </ButtonGroupContext.Provider>
  )
}
