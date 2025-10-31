# Avatar 头像

Avatar 头像用于展示用户形象或姓名缩写，提升识别度。

## 引入

```tsx
import { Avatar } from 'react-native-system-ui';
```

### 显示图片

传入 `uri` 即可渲染远程图片，默认直径为 48。

```tsx
import React from 'react';
import { Avatar } from 'react-native-system-ui';

export default Example = () => (
  <Avatar uri="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
);
```

### 使用姓名生成占位符

未提供 `uri` 时，组件会使用姓名生成首字母，占位也可自定义颜色与尺寸。

```tsx
import React from 'react';
import { Avatar, Space } from 'react-native-system-ui';

export default Example = () => (
  <Space direction="horizontal">
    <Avatar name="React Native" />
    <Avatar name="系统 UI" size={64} />
    <Avatar name="Design" size={40} />
  </Space>
);
```

## API

### Avatar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| uri | 头像图片地址 | `string` | `-` |
| size | 头像直径 | `number` | `48` |
| name | 姓名，用于生成首字母占位与无障碍文本 | `string` | `-` |
| style | 容器样式 | `StyleProp<ViewStyle>` | `-` |
| imageStyle | 图片样式 | `StyleProp<ImageStyle>` | `-` |
| textStyle | 占位符文字样式 | `StyleProp<TextStyle>` | `-` |
| accessibilityLabel | 自定义无障碍描述 | `string` | `name` |

