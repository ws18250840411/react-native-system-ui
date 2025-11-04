# TabBar 标签栏

> 底部导航栏或横向选项卡的容器，支持徽标、指示器、文字放大等效果。

## 何时使用

- 应用底部主导航切换多个页面。
- 顶部 Tab 栏需要滚动、指示器或徽章。
- 与 `Tabs`、`BottomBar` 组合实现定制化布局。

## 引入

```tsx
import { TabBar } from 'react-native-system-ui';
```

## 代码演示

### 基础导航

```tsx
import React from 'react';
import { TabBar } from 'react-native-system-ui';

function Example() {
  const options = [
    { label: '首页', value: 'home' },
    { label: '消息', value: 'message', badge: 3 },
    { label: '我的', value: 'profile' },
  ];
  const [value, setValue] = React.useState('home');

  return <TabBar options={options} value={value} onChange={setValue} />;
}

export default Example;
```

### 指示器与滚动对齐

```tsx
import React from 'react';
import { TabBar } from 'react-native-system-ui';

function Example() {
  const options = Array.from({ length: 8 }).map((_, index) => ({
    label: `标签${index + 1}`,
    value: index,
  }));
  const [value, setValue] = React.useState(0);

  return (
    <TabBar
      options={options}
      value={value}
      onChange={setValue}
      indicator
      tabAlign="left"
      labelBulge
    />
  );
}

export default Example;
```

## API

继承 `BottomBar` 的布局属性（`safeAreaInsetBottom`、`divider` 等）。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数组（请保持引用稳定） | `TabItem<T>[]` | `-` |
| value | 受控值 | `T` | `-` |
| defaultValue | 非受控初始值 | `T` | `-` |
| onChange | 切换回调 | `(value: T) => void` | `-` |
| textColor / iconColor | 普通态文字 / 图标颜色 | `ColorValue` | `tab_bar_text_color` / `tab_bar_icon_color` |
| activeTextColor / activeIconColor | 激活态文字 / 图标颜色 | `ColorValue` | `tab_bar_active_text_color` / `tab_bar_active_icon_color` |
| indicator | 是否显示底部指示器 | `boolean` | `false` |
| indicatorWidth | 指示器宽度（0 表示撑满，未设置则与文字等宽） | `number` | `-` |
| indicatorHeight | 指示器高度（0 隐藏） | `number` | `3` |
| indicatorColor | 指示器颜色 | `ColorValue` | `tab_bar_indicator_color` |
| tabAlign | 选项排列方式，`left` 可滚动 | `'left' \| 'center'` | `'center'` |
| labelBulge | 激活项文字缩放：`true` 使用默认 1.2，传数字自定义倍数 | `boolean \| number` | `1.2` |
| theme | 主题变量 | `Partial<TabBarTheme>` | `-` |

> 主题变量见 `packages/ui/src/components/tab-bar/index.md`。
