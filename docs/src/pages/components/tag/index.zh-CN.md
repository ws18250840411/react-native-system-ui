# Tag 标签

> 用于标记关键词、状态或可关闭的筛选条件，支持多种尺寸和类型。

## 何时使用

- 突出显示对象的状态或类别，例如“新”、“Hot”。
- 展示可关闭的筛选项或标签云。
- 与列表项、卡片、图表等组合，增强信息密度。

## 引入

```tsx
import { Tag } from 'react-native-system-ui';
```

## 代码演示

### 基础类型

```tsx
import React from 'react';
import { Space, Tag } from 'react-native-system-ui';

function Example() {
  return (
    <Space direction="horizontal">
      <Tag>Primary</Tag>
      <Tag type="hazy">Hazy</Tag>
      <Tag type="ghost">Ghost</Tag>
    </Space>
  );
}

export default Example;
```

### 可关闭标签

```tsx
import React from 'react';
import { Tag } from 'react-native-system-ui';

function Example() {
  const [visible, setVisible] = React.useState(true);

  return visible ? (
    <Tag closable onClose={() => setVisible(false)}>
      可关闭
    </Tag>
  ) : null;
}

export default Example;
```

### 自定义颜色与图标

```tsx
import React from 'react';
import { Tag } from 'react-native-system-ui';

function Example() {
  return (
    <Tag
      type="ghost"
      color="#165dff"
      textColor="#165dff"
      icon={<Tag.Icon name="star" />}
    >
      推荐
    </Tag>
  );
}

export default Example;
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 大小 | `'l' \| 'm' \| 's'` | `'m'` |
| type | 样式类型：`primary`、`hazy`、`ghost` | `TagType` | `'primary'` |
| visible | 是否展示标签 | `boolean` | `true` |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| onClose | 点击关闭触发 | `() => void` | `-` |
| color | 自定义背景色 | `ColorValue` | `-` |
| textColor | 自定义文字颜色 | `ColorValue` | `-` |
| innerStyle | 内部容器样式 | `StyleProp<ViewStyle>` | `-` |
| closeIcon | 自定义关闭按钮 | `React.ReactNode` | `-` |
| icon | 自定义左侧图标 | `React.ReactNode` | `-` |
| hairline | 是否使用细边框 | `boolean` | `false` |
| theme | 主题变量 | `Partial<TagTheme>` | `-` |
| children | 标签内容 | `React.ReactNode` | `-` |

> 主题变量详见 `packages/ui/src/components/tag/index.md`。
