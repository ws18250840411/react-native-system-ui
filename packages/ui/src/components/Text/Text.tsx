import React from 'react'
import { Text as RNText } from 'react-native'
import type { TextProps, TextStyle, StyleProp } from 'react-native'

import { createFC } from '../../foundation/createFC'
import { createThemeModule } from '../../theme'

export type TypographyProps = TextProps

const textTheme = createThemeModule({
  vars: (tokens) => ({
    color: tokens.colors.text,
    fontFamily: tokens.typography.fontFamily,
  }),
  styles: (vars) => ({
    base: {
      color: vars.color,
      fontFamily: vars.fontFamily,
    } as TextStyle,
  }),
})

const Text = createFC<TypographyProps>(({ props, ref, useTheme }) => {
  const { styles } = useTheme(textTheme)
  return () => {
    const { style, ...rest } = props
    const composed: StyleProp<TextStyle> = [styles.base, style]
    return <RNText ref={ref} style={composed} {...rest} />
  }
})

export default Text
