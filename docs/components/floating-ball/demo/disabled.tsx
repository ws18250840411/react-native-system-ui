import React from 'react'
import { FloatingBall, Toast } from 'react-native-system-ui'

export default () => <FloatingBall draggable={false} onPress={() => Toast.info('按钮')} />
