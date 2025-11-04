# Divider

Divider visually separates content sections or inline actions.

## When To Use

- Break apart long paragraphs or form groups.
- Insert spacing between inline controls such as links or buttons.
- Display compact vertical dividers inside toolbars.

## Import

```tsx
import { Divider } from 'react-native-system-ui';
```

## Examples

### Horizontal Variants

Toggle theme, style, and color to match the surrounding layout.

```tsx
import React from 'react';
import { Divider, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <Divider>Default divider</Divider>
      <Divider type="dark">Dark theme</Divider>
      <Divider dashed color="#1677ff">Dashed divider</Divider>
    </Space>
  );
}

export default Example;
```

### Vertical Divider

Use a vertical line to split inline actions.

```tsx
import React from 'react';
import { Button, Divider, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space direction="horizontal" align="center">
      <Button title="Save" variant="ghost" />
      <Divider direction="vertical" style={{ height: 16 }} />
      <Button title="Share" variant="ghost" />
      <Divider direction="vertical" style={{ height: 16 }} />
      <Button title="Report" variant="ghost" />
    </Space>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| textStyle | Style override for the divider text | `StyleProp<TextStyle>` | `-` |
| type | Color scheme | `'dark' \| 'light'` | `'light'` |
| direction | Render a horizontal or vertical divider | `'horizontal' \| 'vertical'` | `'horizontal'` |
| dashed | Draw the divider as a dashed line | `boolean` | `false` |
| color | Custom line color | `ColorValue` | `-` |
| contentPosition | Align the label within the divider | `'left' \| 'center' \| 'right'` | `'center'` |
| theme | Override divider theme tokens | `Partial<DividerTheme>` | `-` |

> Theme tokens are listed in `packages/ui/src/components/divider/index.md`.
