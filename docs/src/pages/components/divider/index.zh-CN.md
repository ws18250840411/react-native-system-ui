# Divider 分割线

> 用于在视觉上分隔内容块或行内元素。

## 何时使用

- 拆分不同章节的内容或表单段落。
- 在行内文本/操作之间添加分隔符。
- 结合 `direction="vertical"` 构建紧凑的操作列表。

## 引入

```tsx
import { Divider } from 'react-native-system-ui';
```

## 代码演示

### 基础样式

支持深浅主题、虚线和自定义颜色。

```tsx
import React from 'react';
import { Divider, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <Divider>默认分割线</Divider>
      <Divider type="dark">深色主题</Divider>
      <Divider dashed color="#1677ff">虚线分割线</Divider>
    </Space>
  );
}

export default Example;
```

### 纵向分隔

`direction="vertical"` 仅渲染一条线，常用于行内操作。

```tsx
import React from 'react';
import { Divider, Space, Button } from 'react-native-system-ui';

function Example() {
  return (
    <Space direction="horizontal" align="center">
      <Button title="收藏" variant="ghost" />
      <Divider direction="vertical" style={{ height: 16 }} />
      <Button title="分享" variant="ghost" />
      <Divider direction="vertical" style={{ height: 16 }} />
      <Button title="举报" variant="ghost" />
    </Space>
  );
}

export default Example;
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| textStyle | 文案样式 | `StyleProp<TextStyle>` | `-` |
| type | 颜色模式 | `'dark' \| 'light'` | `'light'` |
| direction | 分割线方向，纵向仅渲染线条 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| dashed | 是否使用虚线 | `boolean` | `false` |
| color | 自定义颜色 | `ColorValue` | `-` |
| contentPosition | 文案位置 | `'left' \| 'center' \| 'right'` | `'center'` |
| theme | 主题变量覆盖 | `Partial<DividerTheme>` | `-` |

> 主题变量参考 `packages/ui/src/components/divider/index.md`。
