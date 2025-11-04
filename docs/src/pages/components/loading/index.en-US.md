# Loading

Loading displays a spinner or circular indicator to communicate ongoing work.

## When To Use

- Show inline progress while fetching or submitting data.
- Pair with `Toast.loading` for page-level feedback and keep `Loading` for embedded states.
- Replace the icon with a custom animation when product guidelines require bespoke visuals.

## Import

```tsx
import { Loading } from 'react-native-system-ui';
```

## Examples

### Inline Indicator

```tsx
import React from 'react';
import { Card, Loading, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Card title="Order status" bodyStyle={{ alignItems: 'center' }}>
      <Space align="center">
        <Loading />
        <Loading type="spinner" color="#1677ff" />
      </Space>
    </Card>
  );
}

export default Example;
```

### Vertical Layout With Text

```tsx
import React from 'react';
import { Loading } from 'react-native-system-ui';

function Example() {
  return (
    <Loading vertical textStyle={{ marginTop: 8 }}>
      正在生成报告...
    </Loading>
  );
}

export default Example;
```

### Custom Icon

```tsx
import React from 'react';
import { Loading } from 'react-native-system-ui';
import { View } from 'react-native';

const Square = ({ size, color }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: 4,
    }}
  />
);

function Example() {
  return (
    <Loading
      loadingIcon={(size, color) => (
        <Square
          size={size}
          color={typeof color === 'string' ? color : '#f5222d'}
        />
      )}
      color="#f5222d"
      textStyle={{ marginTop: 8 }}
      vertical
    >
      Uploading file...
    </Loading>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| textStyle | Style for the optional text | `StyleProp<TextStyle>` | `-` |
| color | Icon color | `ColorValue` | `theme.loading_icon_color` |
| type | Built-in icon type | `'circular' \| 'spinner'` | `'circular'` |
| size | Icon size (px) | `number` | `theme.loading_icon_size` |
| textSize | Font size for text | `number` | `theme.loading_text_font_size` |
| vertical | Stack icon and text vertically | `boolean` | `false` |
| loadingIcon | Custom renderer for the loading graphic | `React.ReactNode \| ((size: number, color: ColorValue) => React.ReactNode)` | `-` |
| theme | Override loading theme tokens | `Partial<LoadingTheme>` | `-` |

### Loading.Circular / Loading.Spinner

Both expose `size`, `color`, and `theme` props with the same defaults as the root component.

> Theme tokens are documented in `packages/ui/src/components/loading/index.md`.
