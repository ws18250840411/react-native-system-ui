import React from 'react'

import { Space } from 'react-native-system-ui'

const Card = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 6 }}>{children}</div>
)

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Space justify="center" block>
      <Card>1</Card>
      <Card>
        2
        <br />2
      </Card>
      <Card>
        3
        <br />3
        <br />3
      </Card>
    </Space>
    <Space align="end">
      <Card>1</Card>
      <Card>
        2
        <br />2
      </Card>
      <Card>
        3
        <br />3
        <br />3
      </Card>
    </Space>
  </div>
)
