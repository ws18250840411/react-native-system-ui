import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastGlobalDemo() {
  const setPrimary = () => {
    Toast.setDefaultOptions({ duration: 3000, position: 'top' })
    Toast.success('之后默认 3 秒并展示在顶部')
  }

  const setLoadingDefault = () => {
    Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 })
    Toast.loading({ message: 'loading 默认禁止点击', duration: 1000 })
  }

  const reset = () => {
    Toast.resetDefaultOptions()
    Toast.show('配置已还原')
  }

  return (
    <>
      <Cell title="设置默认样式" isLink onPress={setPrimary} />
      <Cell title="配置 Loading 默认值" isLink onPress={setLoadingDefault} />
      <Cell title="重置默认配置" isLink onPress={reset} />
    </>
  )
}
