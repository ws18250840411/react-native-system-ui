# Badge

Badges highlight unread counts or status dots, most commonly attached to icons, avatars, or navigation elements.

## Import

```tsx
import { Badge } from 'react-native-system-ui';
```

### Numeric Badges

Set `count` to display a number. Use `max` to clamp large values or `showZero` to keep the badge visible when the count is zero.

```tsx
import React from 'react';
import { Badge, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space direction="horizontal">
      <Badge count={8} />
      <Badge count={120} max={99} />
      <Badge count={0} showZero />
    </Space>
  );
}

export default Example;
```

### Attached To Content

Render children inside `Badge` to pin the indicator to the top-right corner.

```tsx
import React from 'react';
import { Avatar, Badge } from 'react-native-system-ui';

function Example() {
  return (
    <Badge count={3} status="success">
      <Avatar name="Ada Lovelace" />
    </Badge>
  );
}

export default Example;
```

## API

`Badge` extends the default React Native `View` props.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| count | Text or number displayed inside the badge. | `number \| string` | `-` |
| dot | Render a dot without any text. | `boolean` | `false` |
| max | Maximum numeric value. Anything higher renders as `{max}+`. Only applies when `count` is a number. | `number` | `-` |
| loading | Hide the badge temporarily while new data is loading. | `boolean` | `false` |
| showZero | Keep the badge visible when `count` equals zero. | `boolean` | `false` |
| color | Custom background color for the badge. | `ColorValue` | `theme.badge_background_color` |
| status | Built-in color preset. Lower priority than `color`. | `'primary' \| 'success' \| 'warning' \| 'error'` | `-` |
| offset | Translates the badge relative to its anchor element. | `[number, number]` | `-` |
| countStyle | Style applied to the badge container. | `StyleProp<ViewStyle>` | `-` |
| countTextStyle | Style applied to the textual content. | `StyleProp<TextStyle>` | `-` |
| theme | Override theme tokens for badge styling. | `Partial<BadgeTheme>` | `-` |
