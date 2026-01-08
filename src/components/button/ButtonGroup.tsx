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
  type,
  size,
  plain,
  block,
  round,
  square,
  shadow,
  disabled,
  iconPosition,
  hairline,
  mode,
}) => {
  const { foundations } = useTheme()
  const gap = spacing ?? foundations.spacing.xs

  const groupValue = React.useMemo(
    () => ({
      type,
      size,
      plain,
      block,
      round,
      square,
      shadow,
      disabled,
      iconPosition,
      hairline,
      mode,
    }),
    [type, size, plain, block, round, square, shadow, disabled, iconPosition, hairline, mode]
  )

  const childArray = React.Children.toArray(children).filter(child => child != null)
  const wrapped = childArray.map((child, index) => {
    const key = React.isValidElement(child) && child.key !== null ? child.key : index
    const isLast = index === childArray.length - 1
    const marginStyles: ViewStyle =
      direction === 'horizontal'
        ? { marginRight: isLast ? 0 : gap }
        : { marginBottom: isLast ? 0 : gap }

    return (
      <View key={key} style={marginStyles}>
        {child}
      </View>
    )
  })

  return (
    <ButtonGroupContext.Provider value={groupValue}>
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
