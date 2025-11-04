# Checkbox 复选框

> 在一组可选项中进行多选或切换布尔状态。

## 何时使用

- 需要勾选 0~N 个选项时，例如兴趣标签或合规确认。
- 需要展示带说明文字的布尔状态时。
- 想复用 `Checkbox.Group` 快速输出横向/纵向复选列表时。

## 引入

```tsx
import { Checkbox } from 'react-native-system-ui';
```

## 代码演示

### 基础用法

受控与非受控均可，`activeValue` 与 `inactiveValue` 控制复选框输出的值。

```tsx
import React from 'react';
import { Checkbox, Space } from 'react-native-system-ui';

function Example() {
  const [checked, setChecked] = React.useState(true);

  return (
    <Space>
      <Checkbox label="受控复选框" value={checked} onChange={setChecked} />
      <Checkbox label="默认选中" defaultValue />
      <Checkbox label="禁用状态" disabled />
    </Space>
  );
}

export default Example;
```

### Checkbox.Group 组合

`options` 传入数组即可渲染多组复选框，支持多选和滚动布局。

```tsx
import React from 'react';
import { Checkbox } from 'react-native-system-ui';

function Example() {
  const options = [
    { label: '北京', value: 'bj' },
    { label: '上海', value: 'sh' },
    { label: '广州', value: 'gz', disabled: true },
  ];
  const [cities, setCities] = React.useState(['bj']);

  return (
    <Checkbox.Group
      options={options}
      multiple
      value={cities}
      onChange={value => setCities(value)}
    />
  );
}

export default Example;
```

## API

### Checkbox

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `ActiveValueT \| InactiveValueT` | `-` |
| defaultValue | 初始值（非受控） | `ActiveValueT \| InactiveValueT` | `-` |
| onChange | 选中状态变更回调 | `(value: ActiveValueT \| InactiveValueT) => void` | `-` |
| activeValue | 选中时的输出值 | `ActiveValueT` | `true` |
| inactiveValue | 未选中时的输出值 | `InactiveValueT` | `false` |
| label | 显示在复选框旁的内容 | `React.ReactNode` | `-` |
| labelDisabled | 禁用文字区域点击 | `boolean` | `false` |
| labelPosition | 文字位置 | `'left' \| 'right'` | `'right'` |
| labelTextStyle | 文案样式 | `StyleProp<TextStyle>` | `-` |
| iconStyle | 图标容器样式 | `StyleProp<ViewStyle>` | `-` |
| iconSize | 图标大小（px） | `number` | `checkbox_icon_size` |
| activeColor | 选中图标颜色 | `ColorValue` | `checkbox_checked_icon_color` |
| inactiveColor | 未选中图标颜色 | `ColorValue` | `checkbox_icon_color` |
| renderIcon | 自定义图标渲染 | `(props) => React.ReactNode` | `-` |
| gap | 图标与文字的间距 | `number` | `checkbox_label_margin` |
| disabled | 是否禁用 | `boolean` | `false` |
| theme | 个性化主题变量 | `Partial<CheckboxTheme>` | `-` |

### Checkbox.Group

继承 `Space` 的布局属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数组，可为单项设置 `disabled`、`iconSize` 等 | `{ value: ActiveValueT; label: string; disabled?: boolean; iconSize?: number; }[]` | `-` |
| value | 当前选中值 | `ActiveValueT \| ActiveValueT[]` | `-` |
| defaultValue | 初始选中值 | `ActiveValueT \| ActiveValueT[]` | `-` |
| onChange | 选项变更回调 | `(value: ActiveValueT[] \| ActiveValueT, options: { value: ActiveValueT; label: string; disabled?: boolean }[]) => void` | `-` |
| multiple | 是否多选 | `boolean` | `false` |
| editable | 是否可编辑 | `boolean` | `true` |
| scrollable | 横向布局是否可滚动 | `boolean` | `false` |
| deselect | 单选时是否允许取消 | `boolean` | `true` |
| checkboxLabelTextStyle | 统一设置子项文字样式 | `CheckboxProps['labelTextStyle']` | `-` |
| checkboxIconLabelGap | 统一设置图文间距 | `number` | `-` |
| iconSize / activeColor / inactiveColor / renderIcon | 同 `Checkbox` | `-` |

### Checkbox.Icon

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 是否高亮 | `boolean` | `false` |
| activeColor | 选中颜色 | `ColorValue` | `checkbox_checked_icon_color` |
| inactiveColor | 未选中颜色 | `ColorValue` | `checkbox_icon_color` |
| size | 尺寸（px） | `number` | `checkbox_icon_size` |
| theme | 个性化主题变量 | `Partial<CheckboxTheme>` | `-` |

> 主题变量请参考 `packages/ui/src/components/checkbox/index.md`。
