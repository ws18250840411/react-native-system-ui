# Button 按钮

Button 按钮用于触发操作，是系统 UI 中最常见的交互元素。

## 引入

```tsx
import { Button } from 'react-native-system-ui';
```

### 基本用法

最基础的按钮形态，支持 `title` 文案与点击事件。

```tsx
import React from 'react';
import { Button } from 'react-native-system-ui';

export default Example = () => (
  <Button title="默认按钮" onPress={() => console.log('点击默认按钮')} />
);
```

### 主题风格

通过 `variant` 切换不同视觉风格，可选值为 `primary`、`secondary` 和 `ghost`。

```tsx
import React from 'react';
import { Button, Space } from 'react-native-system-ui';

export default Example = () => (
  <Space>
    <Button title="Primary" variant="primary" />
    <Button title="Secondary" variant="secondary" />
    <Button title="Ghost" variant="ghost" />
  </Space>
);
```

### 设置尺寸

三种尺寸用于适配不同布局场景，可通过 `size` 指定。

```tsx
import React from 'react';
import { Button, Space } from 'react-native-system-ui';

export default Example = () => (
  <Space>
    <Button title="小号按钮" size="sm" />
    <Button title="默认按钮" size="md" />
    <Button title="大号按钮" size="lg" />
  </Space>
);
```

## API

### Button Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 按钮文本 | `string` | `-` |
| children | 自定义按钮内容 | `ReactNode` | `-` |
| variant | 按钮风格，可选值 `primary` `secondary` `ghost` | `'primary' \| 'secondary' \| 'ghost'` | `primary` |
| size | 尺寸，可选值 `sm` `md` `lg` | `'sm' \| 'md' \| 'lg'` | `md` |
| leftIcon | 左侧图标 | `ReactNode` | `-` |
| rightIcon | 右侧图标 | `ReactNode` | `-` |
| disabled | 是否禁用 | `boolean` | `false` |
| style | 按钮容器样式 | `StyleProp<ViewStyle>` | `-` |
| textStyle | 文本样式 | `StyleProp<TextStyle>` | `-` |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onPress | 点击按钮触发 | `(event: GestureResponderEvent) => void` |

