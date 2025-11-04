# NumberInput 数字输入框

> 在原生 TextInput 基础上扩展数字输入限制、最值范围与格式化能力。

## 何时使用

- 需要输入金额、数量、权重等纯数字内容。
- 需要限制最小/最大值或小数位数。
- 搭配 `Field.NumberInput` 或 `Form` 以获得统一的单元格样式。

## 引入

```tsx
import { NumberInput } from 'react-native-system-ui';
```

## 代码演示

### 基础数字输入

```tsx
import React from 'react';
import { NumberInput, Space } from 'react-native-system-ui';

function Example() {
  const [weight, setWeight] = React.useState();

  return (
    <Space>
      <NumberInput
        placeholder="请输入体重"
        value={weight}
        onChange={setWeight}
        limitDecimals={1}
      />
      <NumberInput
        placeholder="整数数量"
        type="digit"
        min={0}
        max={999}
        defaultValue={10}
      />
    </Space>
  );
}

export default Example;
```

### 自定义格式化

```tsx
import React from 'react';
import { NumberInput } from 'react-native-system-ui';

function Example() {
  const [price, setPrice] = React.useState();

  return (
    <NumberInput
      placeholder="输入价格"
      value={price}
      onChange={setPrice}
      formatter={value => (value ? `¥ ${value}` : '')}
      parser={text => {
        const numeric = text?.replace(/[^\d.]/g, '');
        return numeric ? Number(numeric) : null;
      }}
    />
  );
}

export default Example;
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 输入内容格式：`digit` 整数、`number` 允许小数 | `'digit' \| 'number'` | `'number'` |
| value | 受控值 | `number` | `-` |
| defaultValue | 非受控初始值 | `number` | `-` |
| onChange | 输入结束后的回调 | `(value: number) => void` | `-` |
| min / max | 最小/最大值 | `number` | `Number.MIN_SAFE_INTEGER` / `Number.MAX_SAFE_INTEGER` |
| parser | 将格式化文本还原为数字 | `(value: string) => number \| null` | `-` |
| limitDecimals | 限制小数位，`-1` 表示不限制 | `number` | `-1` |
| validateTrigger | 范围校验触发时机 | `'onChangeText' \| 'onEndEditing'` | `'onEndEditing'` |
| 其余 | 继承 TextInput 的属性（去除 value、defaultValue、formatTrigger、showWordLimit、rows、type、onChange、onChangeText） | - | - |

> 注意：未显式设置 `keyboardType` 时，iOS 默认 `numbers-and-punctuation`，Android 默认 `decimal-pad`。
