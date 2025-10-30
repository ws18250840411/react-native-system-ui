import { EyeOutline, EyeCloseOutline } from '../../foundation/icons'
import React, { useMemo, memo, forwardRef } from 'react'

import { getDefaultValue } from '../../foundation/helpers'
import { useControllableValue, usePersistFn } from '../../foundation/hooks'
import TextInput from '../text-input'
import type { TextInputInstance } from '../text-input/interface'
import Theme from '../../theme'

import type { PasswordInputProps } from './interface'

const hitSlop = { top: 4, bottom: 4, left: 4, right: 4 }

/**
 * 密码输入
 */
const PasswordInput = forwardRef<TextInputInstance, PasswordInputProps>(
  (
    {
      iconSize = 20,
      iconColor,

      ...restProps
    },
    ref,
  ) => {
    const TOKENS = Theme.useThemeTokens()
    const [secure, onChangeSecureTextEntry] = useControllableValue(restProps, {
      valuePropName: 'secureTextEntry',
      defaultValuePropName: 'defaultSecureTextEntry',
      defaultValue: true,
      trigger: 'onChangeSecureTextEntry',
    })

    iconColor = getDefaultValue(iconColor, TOKENS.gray_6)
    const iconStyle = useMemo(
      () => ({ marginLeft: TOKENS.space_2 }),
      [TOKENS.space_2],
    )

    const onPressIcon = usePersistFn(() => {
      onChangeSecureTextEntry(!secure)
    })

    const IconSuffix = secure ? EyeCloseOutline : EyeOutline

    return (
      <TextInput
        {...restProps}
        ref={ref}
        secureTextEntry={secure}
        suffix={
          <IconSuffix
            size={iconSize}
            color={iconColor}
            onPress={onPressIcon}
            style={iconStyle}
            hitSlop={hitSlop}
          />
        }
      />
    )
  },
)

export default memo(PasswordInput)
