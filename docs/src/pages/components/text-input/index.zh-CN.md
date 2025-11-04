# TextInput 输入框

> 在原生 TextInput 之上补充清除图标、前后缀、字数统计、格式化等能力。

## 何时使用

- 需要在移动端实现与 Ant Design Input 类似的交互。
- 需要带前后缀、外部 addon、边框、多行文本或清除按钮。
- 对输入内容做格式化、字数统计或限制显示宽度时。

## 引入

```tsx
import { TextInput } from 'react-native-system-ui';
```

## 代码演示

### 基础与清除

```tsx
import React from 'react';
import { TextInput } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState('');

  return (
    <TextInput
      placeholder="请输入昵称"
      value={value}
      onChangeText={setValue}
      clearable
    />
  );
}

export default Example;
```

### 前缀/后缀与 addon

```tsx
import React from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native-system-ui';

function Example() {
  return (
    <TextInput
      bordered
      prefix={<Text>+86</Text>}
      suffix={<Text>@mail.com</Text>}
      addonBefore={<Text>账号</Text>}
      addonAfter={<Text>必填</Text>}
      placeholder="请输入手机号"
    />
  );
}

export default Example;
```

### 多行文本与字数

```tsx
import React from 'react';
import { TextInput } from 'react-native-system-ui';

function Example() {
  return (
    <TextInput
      type="textarea"
      rows={3}
      showWordLimit
      maxLength={120}
      placeholder="请输入备注"
    />
  );
}

export default Example;
```

## API

除原生 TextInput 属性外，新增以下能力：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 输入框形态：单行或多行 | `'text' \| 'textarea'` | `'text'` |
| rows | 多行最少行数 | `number` | `2` |
| clearable | 是否显示清除图标 | `boolean` | `false` |
| clearTrigger | 清除图标显示时机 | `'always' \| 'focus'` | `'focus'` |
| formatter | 输入格式化函数 | `(value: string) => string` | `-` |
| formatTrigger | 触发格式化的时机 | `'onEndEditing' \| 'onChangeText'` | `'onChangeText'` |
| showWordLimit | 是否在 textarea 模式下展示字数统计（需配合 `maxLength`） | `boolean` | `false` |
| bordered | 是否显示边框 | `boolean` | `false` |
| addonBefore / addonAfter | 边框外前后缀 | `React.ReactNode` | `-` |
| addonGroupStyle / addonBeforeTextStyle / addonAfterTextStyle | addon 容器与文本样式 | `StyleProp<ViewStyle>` / `StyleProp<TextStyle>` | `-` |
| prefix / suffix | 边框内前缀/后缀 | `React.ReactNode` | `-` |
| prefixTextStyle / suffixTextStyle | 内部前后缀文本样式 | `StyleProp<TextStyle>` | `-` |
| fixGroupStyle | prefix/suffix 外层样式 | `StyleProp<ViewStyle>` | `-` |
| inputWidth | 自定义输入区域宽度 | `number` | `-` |
| size | 预设尺寸 | `'xl' \| 'l' \| 'm' \| 's'` | `'m'` |
| onChange | 输入值变更时回调（返回字符串） | `(value: string) => void` | `-` |
| textareaMaxHeight | 多行输入的最大高度 | `number` | `-` |
| theme | 主题变量 | `Partial<TextInputTheme>` | `-` |

### 事件说明

- `onFocus / onBlur`：`event.nativeEvent.text`
- `onChange`：直接返回字符串，便于受控
- `onChangeText`：与原生一致
- `onEndEditing`：`event.nativeEvent.text`

> 放入 `ScrollView` 时，如需在键盘弹出状态下点击清除按钮，请为 `ScrollView` 设置 `keyboardShouldPersistTaps="handled"`。
