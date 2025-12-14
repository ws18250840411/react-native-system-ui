import React from 'react'

import { Uploader } from 'react-native-system-ui'

import { demoData, upload } from './utils'

export default () => {
  return <Uploader defaultValue={demoData} upload={upload} />
}
