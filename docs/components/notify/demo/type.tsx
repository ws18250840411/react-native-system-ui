import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyTypeDemo() {
  return (
    <>
      <Cell title="主要通知" isLink onPress={() => Notify.primary('主要提示')} />
      <Cell title="成功通知" isLink onPress={() => Notify.success('操作成功')} />
      <Cell title="危险通知" isLink onPress={() => Notify.danger('操作失败')} />
      <Cell title="警告通知" isLink onPress={() => Notify.warning('请注意风险')} />
    </>
  )
}

