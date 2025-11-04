# NavBar 导航栏

> 页面顶部的导航条，内置返回箭头、左右扩展区域与分割线。

## 何时使用

- 需要在应用内实现类似系统标题栏的导航体验。
- 在表单、详情页顶部展示标题和返回操作。
- 需要在右侧放置更多操作按钮（分享、编辑等）。

## 引入

```tsx
import { NavBar } from 'react-native-system-ui';
```

## 代码演示

### 基础导航

```tsx
import React from 'react';
import { NavBar } from 'react-native-system-ui';

function Example() {
  return (
    <NavBar
      title="订单详情"
      leftExtra={null}
      onPressBackArrow={() => console.log('back')}
    />
  );
}

export default Example;
```

### 自定义左右区域

```tsx
import React from 'react';
import { Button, NavBar, Space } from 'react-native-system-ui';

function Example() {
  return (
    <NavBar
      title="商品"
      leftExtra={<Button title="客服" variant="ghost" onPress={() => {}} />}
      rightExtra={
        <Space direction="horizontal">
          <Button title="收藏" size="sm" variant="ghost" />
          <Button title="分享" size="sm" variant="ghost" />
        </Space>
      }
    />
  );
}

export default Example;
```

### 深色背景

```tsx
import React from 'react';
import { NavBar } from 'react-native-system-ui';

function Example() {
  return (
    <NavBar
      title="夜间模式"
      style={{ backgroundColor: '#111' }}
      titleTextStyle={{ color: '#fff' }}
      backArrowColor="#fff"
      divider={false}
    />
  );
}

export default Example;
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 外层容器样式 | `StyleProp<ViewStyle>` | `-` |
| leftStyle / rightStyle | 左/右区域样式 | `StyleProp<ViewStyle>` | `-` |
| leftExtra / rightExtra | 左/右自定义内容 | `JSX.Element` | `-` |
| title | 标题文字或自定义节点 | `React.ReactNode` | `-` |
| titleTextStyle | 标题文字样式 | `StyleProp<TextStyle>` | `-` |
| showBackArrow | 是否显示返回按钮 | `boolean` | `true` |
| backArrowColor | 返回按钮颜色 | `ColorValue` | `nav_bar_icon_color` |
| backArrowSize | 返回按钮尺寸 | `number` | `nav_bar_arrow_size` |
| divider | 是否显示底部分割线 | `boolean` | `true` |
| onPressBackArrow | 点击返回按钮回调 | `() => void` | `-` |
| theme | 覆盖主题变量 | `Partial<NavBarTheme>` | `-` |

> 主题变量参见 `packages/ui/src/components/nav-bar/index.md`。
