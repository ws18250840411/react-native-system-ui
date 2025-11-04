# Dropdown 下拉菜单

> 在页头或列表顶部快速切换筛选项的弹出式菜单。

## 何时使用

- 列表筛选、排序条件较少时。
- 需要集中放置多个筛选项，并在弹出层内展示多层级选项时。
- 搭配 `Dropdown.Multiple` 做多选树形筛选。

## 引入

```tsx
import { Dropdown } from 'react-native-system-ui';
```

## 代码演示

### 基础筛选

`options` 传入数组即可渲染弹出的备选项。

```tsx
import React from 'react';
import { Dropdown } from 'react-native-system-ui';

function Example() {
  const cities = [
    { label: '不限', value: 'all' },
    { label: '北京', value: 'bj' },
    { label: '上海', value: 'sh' },
  ];
  const [value, setValue] = React.useState('all');

  return (
    <Dropdown>
      <Dropdown.Item
        title="城市"
        options={cities}
        value={value}
        onChange={setValue}
      />
    </Dropdown>
  );
}

export default Example;
```

### 多选 & 搜索

依赖 Tree 数据结构，可一次性勾选多个选项。

```tsx
import React from 'react';
import { Dropdown } from 'react-native-system-ui';

function Example() {
  const options = [
    {
      label: '一线城市',
      value: 'tier1',
      children: [
        { label: '北京', value: 'bj' },
        { label: '上海', value: 'sh' },
      ],
    },
  ];
  const [value, setValue] = React.useState(['bj']);

  return (
    <Dropdown>
      <Dropdown.Multiple
        title="城市"
        options={options}
        value={value}
        onChange={setValue}
        search
        placeholder="搜索城市"
      />
    </Dropdown>
  );
}

export default Example;
```

## API

### Dropdown（容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| divider | 是否显示菜单文本下方分割线 | `boolean` | `true` |
| iconStyle | 文字右侧箭头样式 | `StyleProp<ViewStyle>` | `-` |
| activeColor | 文案/选项选中态颜色 | `ColorValue` | `dropdown_active_color` |
| direction | 默认箭头方向 | `'up' \| 'down'` | `'down'` |
| titleStyle | 标题容器样式 | `StyleProp<ViewStyle>` | `-` |
| titleTextStyle | 标题文本样式 | `StyleProp<TextStyle>` | `-` |
| duration | 展开/收起动画时长（秒） | `number` | `animation_duration_fast` |
| zIndex | 菜单 z-index | `number` | `10` |
| closeOnPressOutside | 点击外部是否关闭 | `boolean` | `true` |
| theme | 覆盖主题变量 | `Partial<DropdownTheme>` | `-` |

### Dropdown.Item

继承 `TreeProps` 的 `search`、`onSearch`、`cancellable` 等能力。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| titleStyle / titleTextStyle | 标题区域样式 | `StyleProp<ViewStyle>` / `StyleProp<TextStyle>` | `-` |
| options | 选项数据，支持树形结构 | `DropdownItemOption<T>[]` | `-` |
| value / defaultValue | 当前值 / 初始值 | `T` | `-` |
| onChange | 选中项变化回调 | `(value: T, option: DropdownItemOption<T>) => void` | `-` |
| duration / zIndex | 同容器 | `number` | `animation_duration_fast` / `10` |
| closeOnPressOutside | 点击外部是否关闭 | `boolean` | `true` |
| loading | 选项是否加载中 | `boolean` | `false` |
| placeholder | 未选择时的占位文案 | `string` | `''` |
| iconStyle | 文本右侧图标样式 | `StyleProp<ViewStyle>` | `-` |
| disabled | 禁用当前菜单 | `boolean` | `false` |

### Dropdown.Multiple

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / defaultValue | 受控值 / 初始值 | `T[]` | `-` |
| onChange | 选中项变化回调 | `(value: T[], options: DropdownItemOption<T>[]) => void` | `-` |
| beforeChecked | 勾选前拦截 | `(event: { value: T[]; option: TreeOption; checked: boolean }) => T[] \| Promise<T[]>` | `-` |
| multipleMode | Tree 多选策略 | `TreeProps['multipleMode']` | `'tag'` |
| 其余属性 | 继承 `Dropdown.Item` | - | - |

### Dropdown.Popup

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| targetHeight | 触发区域高度 | `number` | `-` |
| targetPageY | 触发区域纵坐标 | `number` | `-` |
| onPressShade | 点击遮罩层回调 | `TouchableOpacityProps['onPress']` | `-` |
| safeAreaInset | 顶部/底部安全区 | `boolean` | `true` |
| showShade | 是否渲染遮罩空白区域 | `boolean` | `true` |
| contentStyle | 弹层内容样式 | `StyleProp<ViewStyle>` | `-` |
| theme | 主题变量 | `Partial<DropdownTheme>` | `-` |

> 主题变量同 `packages/ui/src/components/dropdown/index.md`。
