# Field 输入项

> 基于 Cell + 各类表单控件的组合封装，统一对齐、占位与校验体验。

## 何时使用

- 需要在移动端表单中复用同一套单元格外观。
- 需要在文本、选择器、开关、日期等类型之间快速切换。
- 配合 `Form` 或 `Form.Item` 一起使用时，可直接复用 `value` / `onChange` 规则。

## 引入

```tsx
import { Field } from 'react-native-system-ui';
```

## 代码演示

### 文本展示与输入

```tsx
import React from 'react';
import { Field, FieldTextProps } from 'react-native-system-ui';

function Example() {
  const [note, setNote] = React.useState('已实名');

  return (
    <>
      <Field.Text title="实名认证" value={note} />
      <Field.TextInput
        title="备注"
        placeholder="填写备注"
        value={note}
        onChangeText={setNote}
      />
    </>
  );
}

export default Example;
```

### 选择器与日期

```tsx
import React from 'react';
import { Field } from 'react-native-system-ui';

function Example() {
  const genderOptions = [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
  ];
  const [gender, setGender] = React.useState();
  const [date, setDate] = React.useState();

  return (
    <>
      <Field.Selector
        title="性别"
        options={genderOptions}
        value={gender}
        onChange={setGender}
        placeholder="请选择"
      />
      <Field.Date
        title="出生日期"
        value={date}
        onChange={setDate}
        placeholder="请选择日期"
      />
    </>
  );
}

export default Example;
```

### 开关、复选和密码

```tsx
import React from 'react';
import { Field } from 'react-native-system-ui';

function Example() {
  const [enabled, setEnabled] = React.useState(true);
  const [skills, setSkills] = React.useState(['rn']);

  return (
    <>
      <Field.Switch title="开启通知" value={enabled} onChange={setEnabled} />
      <Field.Checkbox
        title="擅长技能"
        options={[
          { label: 'React Native', value: 'rn' },
          { label: 'Swift', value: 'swift' },
        ]}
        value={skills}
        onChange={value => setSkills(value)}
        multiple
      />
      <Field.PasswordInput title="支付密码" placeholder="请输入" />
    </>
  );
}

export default Example;
```

## API

Field 由多个子组件组成，均继承 `Cell` 的排版能力，仅列出与原组件差异的属性。详细类型可参考 `packages/ui/src/components/field/interface.ts`。

### Field.Text

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 没有值时的提示文案 | `string` | `-` |
| placeholderTextColor | 占位文字颜色 | `ColorValue` | `text_input_placeholder_text_color` |
| value | 展示内容 | `string \| number \| React.ReactNode` | `-` |

### Field.Selector（继承 SelectorProps）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 占位文案 | `string` | `-` |
| placeholderTextColor | 占位颜色 | `ColorValue` | `text_input_placeholder_text_color` |
| optionsLoading | 候选项是否加载中 | `boolean` | `false` |
| editable | 是否允许选择 | `boolean` | `true` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| selectorTitle | 弹出标题 | `string` | `'请选择'` |
| renderResultText | 自定义已选结果文案 | `(value, options) => React.ReactNode` | `-` |
| isLink | 是否展示右侧箭头 | `boolean` | `true` |

### Field.TextInput / Field.NumberInput / Field.PasswordInput

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| textInputStyle | 输入框样式 | `StyleProp<TextStyle>` | `-` |
| textInputBordered | 是否展示边框 | `boolean` | `false` |
| textAlign | 文本对齐 | `'left' \| 'right' \| 'center'` | `'right'` |
| 其余 | 继承对应 `TextInput`/`NumberInput`/`PasswordInput` 属性 | - | - |

### Field.Switch（继承 SwitchProps）

同 `Switch`，额外保留 `Cell` 的 `title`、`extra` 等属性。

### Field.Date / Field.DateRange

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / defaultValue | 当前值 / 初始值 | `Date` / `DatePickerRangeValue` | `-` |
| onChange | 值变化回调 | `(value) => void` | `-` |
| mode | 选择器模式 | `DatePickerSingleMethodProps['mode']` | `'date'` |
| min / max | 最小/最大值 | `Date` | `-` |
| renderLabel | 自定义列标签 | `(type, option) => ReactNode` | `-` |
| datePickerTitle | 弹窗标题 | `string` | `-` |
| clearable | 是否可清除 | `boolean` | `false` |
| editable | 是否可编辑 | `boolean` | `true` |

### Field.Checkbox（继承 CheckboxGroupProps）

复用 `Checkbox.Group` 的 `options`、`multiple`、`deselect` 等全部属性，`title`、`extra` 等来自 `Cell`。

### Field.ButtonOption（继承 ButtonOptionGroupProps）

用于按钮组选择逻辑，支持 `multiple`、`round`、`scrollable` 等。

## 主题

Field 本身不包含额外主题变量，主要复用 `Cell` 及各子组件的主题配置。
