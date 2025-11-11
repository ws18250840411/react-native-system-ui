import React from 'react'
import { Pressable } from 'react-native'
import type { PressableProps } from 'react-native'

export interface ButtonViewProps {
  pressableProps: PressableProps
  children: React.ReactNode
}

export const ButtonView = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonViewProps>(
  ({ pressableProps, children }, forwardedRef) => {
    return (
      <Pressable ref={forwardedRef} {...pressableProps}>
        {children}
      </Pressable>
    )
  }
)

ButtonView.displayName = 'ButtonView'
