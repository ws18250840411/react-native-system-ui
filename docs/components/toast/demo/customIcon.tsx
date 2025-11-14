import React from 'react'

import { Button, Toast, Space, Icon } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Button
      onPress={() =>
        Toast.show({
          message: '自定义图标',
          icon: <Icon name="info" color="#2563eb" size={22} />,
        })
      }
    >
      自定义 Icon
    </Button>
    <Button
      onPress={() =>
        Toast.show({
          message: '图片也可以',
          icon: (
            <Icon
              name="star"
              color="#fbbf24"
              size={22}
            />
          ),
          duration: 1500,
        })
      }
    >
      自定义图片
    </Button>
  </Space>
)
