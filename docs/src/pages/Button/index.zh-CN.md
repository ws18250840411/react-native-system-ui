# Button 按钮

### 介绍

按钮用于触发一个操作，支持不同的视觉层级与交互状态。

### 引入

```jsx
import React from 'react'
import { Button } from 'react-native-system-ui'
```

### 基础用法

默认按钮展示最常见的交互。

```jsx
import React from 'react'
import { Button } from 'react-native-system-ui'

const Example = () => {
  const handlePress = () => {
    console.log('click default')
  }

  return <Button text="默认按钮" onPress={handlePress} />
}

export default Example
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 风格类型 | `'default' \| 'primary' \| 'danger'` | `'default'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `loading` | 是否为加载状态 | `boolean` | `false` |
| `onPress` | 点击事件回调 | `(event: GestureResponderEvent) => void` | `-` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onPress` | 点击按钮时触发 | `event: GestureResponderEvent` |
