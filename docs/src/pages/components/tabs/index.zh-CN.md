# Tabs 标签页

> 基于 `TabBar` 的内容切换组件，包含选项卡头与对应面板。

## 何时使用

- 需要在同一页面切换多个内容区域。
- 需要滑动/滚动的 TabBar 与懒加载面板。
- 结合 `TabBar` 自定义头部样式，但希望面板渲染由组件管理。

## 引入

```tsx
import { Tabs } from 'react-native-system-ui';
```

## 代码演示

### 基础用法

```tsx
import React from 'react';
import { Tabs } from 'react-native-system-ui';

function Example() {
  return (
    <Tabs defaultActiveKey="articles">
      <Tabs.TabPane key="articles" tab="文章">
        文章内容
      </Tabs.TabPane>
      <Tabs.TabPane key="photos" tab="照片" badge="New">
        图片内容
      </Tabs.TabPane>
      <Tabs.TabPane key="settings" tab="设置" lazyRender={false}>
        设置内容
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Example;
```

### 受控与分割线

```tsx
import React from 'react';
import { Tabs } from 'react-native-system-ui';

function Example() {
  const [activeKey, setActiveKey] = React.useState('a');

  return (
    <Tabs
      activeKey={activeKey}
      onChange={setActiveKey}
      divider
      dividerColor="#e5e7eb"
    >
      <Tabs.TabPane key="a" tab="概览">
        概览内容
      </Tabs.TabPane>
      <Tabs.TabPane key="b" tab="数据">
        数据内容
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Example;
```

## API

### Tabs

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabBarStyle | TabBar 容器样式 | `TabBarProps['style']` | `-` |
| tabBarHeight | TabBar 高度 | `TabBarProps['height']` | `-` |
| tabBarBackgroundColor | TabBar 背景色 | `TabBarProps['backgroundColor']` | `bottom_bar_background_color` |
| activeKey | 当前激活面板 key | `string` | `-` |
| defaultActiveKey | 默认激活 key | `string` | `-` |
| onChange | 面板切换回调 | `(activeKey: string) => void` | `-` |
| divider | 是否展示分割线 | `boolean` | `false` |
| dividerColor | 自定义分割线颜色 | `ColorValue` | `-` |
| children | TabPane 列表 | `React.ReactNode` | `-` |

> Tabs 还继承了 `TabBar` 的颜色、指示器、对齐等属性（`textColor`、`indicator`、`tabAlign`、`labelBulge` 等）。

### Tabs.TabPane

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 对应 `activeKey` | `string` | `-` |
| tab | 选项卡标题 | `string` | `-` |
| badge | 徽标数字或文本 | `number \| string` | `-` |
| lazyRender | 是否仅在激活时渲染子节点 | `boolean` | `true` |
| children | 面板内容 | `React.ReactNode` | `-` |

### Tabs.TabView

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前是否激活 | `boolean` | `false` |
| lazyRender | 是否懒加载 | `boolean` | `true` |
| children | 面板内容 | `React.ReactNode` | `-` |
