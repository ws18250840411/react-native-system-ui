import React from 'react'

import { Dialog, Uploader } from 'react-native-system-ui'

import { demoData, upload } from './utils'

export default () => {
  return (
    <Uploader
      defaultValue={demoData}
      upload={upload}
      onDelete={() => Dialog.confirm({ title: '提示', message: '确认删除?🤔' })}
    />
  )
}
