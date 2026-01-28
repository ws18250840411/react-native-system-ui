import React, { useMemo } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { Platform, View } from 'react-native'

import { ButtonGroupContext, type ButtonGroupContextValue } from './ButtonContext'
import { useButtonTokens } from './tokens'

export interface ButtonGroupProps extends ButtonGroupContextValue {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  spacing?: number
  style?: StyleProp<ViewStyle>
}

export const ButtonGroup = React.memo<ButtonGroupProps>(({
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
  const tokens = useButtonTokens()
  const gap = spacing ?? tokens.spacing.groupGap
  const isHorizontal = direction === 'horizontal'
  const supportsGap = Platform.OS === 'web'

  const groupValue = useMemo(
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

  const containerStyle = useMemo(() => {
    const base: ViewStyle = {
      flexDirection: isHorizontal ? 'row' : 'column',
      alignItems: 'center',
    }

    if (block) {
      base.width = '100%'
    }

    if (supportsGap) {
      if (isHorizontal) {
        base.columnGap = gap
      } else {
        base.rowGap = gap
      }
    }

    return [base, style]
  }, [isHorizontal, block, supportsGap, gap, style])

  const content = useMemo(() => {
    if (supportsGap) {
      return children
    }

    const childArray = React.Children.toArray(children).filter(child => child != null)
    return childArray.map((child, index) => {
      if (!React.isValidElement(child)) return child

      const element = child as React.ReactElement<{ style?: StyleProp<ViewStyle> }>

      const isLast = index === childArray.length - 1
      const marginStyle = isHorizontal
        ? { marginRight: isLast ? 0 : gap }
        : { marginBottom: isLast ? 0 : gap }

      return React.cloneElement(element, {
        style: [element.props.style, marginStyle],
        key: element.key ?? index,
      })
    })
  }, [children, supportsGap, isHorizontal, gap])

  return (
    <ButtonGroupContext.Provider value={groupValue}>
      <View style={containerStyle}>
        {content}
      </View>
    </ButtonGroupContext.Provider>
  )
})

ButtonGroup.displayName = 'ButtonGroup'
