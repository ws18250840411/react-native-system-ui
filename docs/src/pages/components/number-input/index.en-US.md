# NumberInput

NumberInput extends `TextInput` with numeric-only parsing, min/max ranges, and decimal precision control.

## When To Use

- Capture amounts, quantities, or weights that must be numeric.
- Enforce upper/lower bounds or a fixed number of decimal places.
- Pair with `Field.NumberInput` for consistent cell layouts.

## Import

```tsx
import { NumberInput } from 'react-native-system-ui';
```

## Examples

### Basic Usage

```tsx
import React from 'react';
import { NumberInput, Space } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState();

  return (
    <Space>
      <NumberInput
        placeholder="Weight (kg)"
        value={value}
        onChange={setValue}
        limitDecimals={1}
      />
      <NumberInput
        placeholder="Quantity"
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

### Custom Formatter

```tsx
import React from 'react';
import { NumberInput } from 'react-native-system-ui';

function Example() {
  const [price, setPrice] = React.useState();

  return (
    <NumberInput
      placeholder="Price"
      value={price}
      onChange={setPrice}
      formatter={value => (value ? `$ ${value}` : '')}
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

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Input mode (`digit` for integers, `number` for decimals) | `'digit' \| 'number'` | `'number'` |
| value | Controlled value | `number` | `-` |
| defaultValue | Initial value | `number` | `-` |
| onChange | Fired when the numeric value changes | `(value: number) => void` | `-` |
| min / max | Minimum and maximum allowed values | `number` | `Number.MIN_SAFE_INTEGER` / `Number.MAX_SAFE_INTEGER` |
| parser | Convert formatted text back to a number | `(value: string) => number \| null` | `-` |
| limitDecimals | Limit decimal places (`-1` disables the limit) | `number` | `-1` |
| validateTrigger | When to run range validation | `'onChangeText' \| 'onEndEditing'` | `'onEndEditing'` |
| ...rest | Inherits all `TextInput` props except `value`, `defaultValue`, `formatTrigger`, `showWordLimit`, `rows`, `type`, `onChange`, `onChangeText` | `-` | `-` |

> Keyboard defaults: iOS uses `numbers-and-punctuation`, Android uses `decimal-pad` unless overridden.
