import React from 'react'
import { Text, View } from 'react-native'

import { Fire } from 'react-native-system-icon'
import { Uploader } from 'react-native-system-ui'

import { demoData, upload } from './utils'

export default () => {
  return (
    <Uploader
      defaultValue={demoData}
      upload={upload}
      previewSize={60}
      uploadIcon={<Fire />}
      previewCoverRender={item =>
        item.filename ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.2)',
              paddingVertical: 4,
              paddingHorizontal: 6,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }} numberOfLines={1}>
              {item.filename}
            </Text>
          </View>
        ) : null
      }
    />
  )
}
