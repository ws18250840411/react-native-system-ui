import type { Ref } from 'react'
import React, { forwardRef, memo } from 'react'

import Theme from '../theme'
import useControllableValue from './hooks/useControllableValue'
import type { TokensType } from './theme/interface'

type StyleModule<CV = any, CS = any> = {
  varCreator: (tokens: TokensType) => CV
  styleCreator?: (cv: CV, tokens: TokensType) => CS
}

type SetupContext<P> = {
  props: P
  ref: Ref<any>
  useTheme: <CV, CS>(
    module: StyleModule<CV, CS>,
    override?: Partial<CV>,
  ) => {
    vars: CV
    styles: CS
    tokens: TokensType
  }
  useControllable: typeof useControllableValue
}

type SetupResult = () => React.ReactElement | null

type SetupFn<P> = (ctx: SetupContext<P>) => SetupResult

export function createFC<P>(setup: SetupFn<P>) {
  const Component = forwardRef<any, P>((props, ref) => {
    const useTheme = <CV, CS>(
      module: StyleModule<CV, CS>,
      override?: Partial<CV>,
    ) => {
      const [vars, styles, tokens] = Theme.useStyle({
        varCreator: module.varCreator,
        styleCreator: module.styleCreator,
        theme: override,
      })

      return {
        vars,
        styles,
        tokens,
      }
    }

    const ctx: SetupContext<P> = {
      props,
      ref,
      useTheme,
      useControllable: useControllableValue,
    }

    const render = setup(ctx)
    return render()
  })

  Component.displayName = setup.name || 'Component'

  return memo(Component)
}
