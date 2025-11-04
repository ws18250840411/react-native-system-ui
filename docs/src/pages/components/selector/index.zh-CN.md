# Selector 选择器

> 以弹层方式展示树形或多列选项，支持单选、多选、搜索与即时返回。

## 何时使用

- 需要从分类树中选择一个或多个条目。
- 期望在移动端复用 Web Select 的体验（带确认按钮、标题、关闭按钮）。
- 需要函数式调用或在组件树中受控展示。

## 引入

```tsx
import { Selector } from 'react-native-system-ui';
```

## 代码演示

### 组件式选择

```tsx
import React from 'react';
import { Button, Selector } from 'react-native-system-ui';

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
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState(undefined);

  return (
    <>
      <Button title="选择城市" onPress={() => setVisible(true)} />
      <Selector.Component
        visible={visible}
        title="请选择城市"
        options={options}
        value={value}
        onChange={(val, options) => {
          const next = Array.isArray(val) ? val[0] : val;
          setValue(next);
          console.log(options);
        }}
        onRequestClose={() => {
          setVisible(false);
          return true;
        }}
      />
    </>
  );
}

export default Example;
```

### 函数式调用

```tsx
import React from 'react';
import { Button, Selector } from 'react-native-system-ui';

function Example() {
  const options = [
    { label: '全部', value: 'all' },
    { label: '设计', value: 'design' },
    { label: '研发', value: 'dev' },
  ];

  const openSelector = () => {
    Selector({ options }).then(value => console.log('result', value));
  };

  return <Button title="打开选择器" onPress={openSelector} />;
}

export default Example;
```

## API

### Selector.Component / Selector.SelectorComponent

继承 `Popup` 公共属性（去除 `closeOnPressOverlay`、`onPressOverlay`）以及 `Tree` 的 `search`、`multiple` 等交互属性。额外参数如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值（单选或多选） | `SelectorValue \| SelectorValue[]` | `-` |
| defaultValue | 非受控初始值 | `SelectorValue \| SelectorValue[]` | `-` |
| onChange | 点击确认时触发 | `(value, options) => void` | `-` |
| options | 选项数据（支持树形） | `SelectorOption[]` | `-` |
| closeOnPressOverlay | 点击遮罩是否关闭 | `boolean` | `true` |
| title | 顶部标题 | `React.ReactNode` | `'请选择'` |
| showClose | 是否展示关闭图标 | `boolean` | `true` |
| onChangeImmediate | 值变化立即回写，返回加工后的 value | `(value) => SelectorValue \| SelectorValue[]` | `-` |
| safeAreaInsetTop | 顶部安全距离 | `number` | `safeAreaInsets.top` |
| confirmButtonText | 确认按钮文案 | `string` | `'确定'` |
| theme | 主题变量 | `Partial<SelectorTheme>` | `-` |

### Selector(options)

函数式调用（`Selector(...)`）会返回 `Promise<SelectorValue[] | SelectorValue>`，参数同 `Selector.Component`，额外支持：

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| beforeChange | 关闭前拦截，返回 `false` 或 `Promise<false>` 可阻止关闭 | `(value, options) => boolean \| Promise<boolean>` |

### Selector.Text

展示型组件，可放在 `Cell` 内部。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `React.ReactNode` | `'请选择'` |
| value | 当前值 | `SelectorValue` | `-` |
| options | 选项数组 | `SelectorOption[]` | `-` |
| onChange | 选择回调 | `(value, options) => void` | `-` |
| arrowDirection | 箭头方向 | `'left' \| 'up' \| 'right' \| 'down'` | `'right'` |
| divider | 是否展示底部分割线 | `boolean` | `true` |
| head | 左侧是否保留间距 | `boolean` | `true` |
| theme | 主题变量 | `Partial<SelectorTheme>` | `-` |
