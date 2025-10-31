# Button

Buttons trigger actions and guide users toward the primary task at hand.

## Import

```tsx
import { Button } from 'react-native-system-ui';
```

### Basic Usage

A default button with copy and a press handler.

```tsx
import React from 'react';
import { Button } from 'react-native-system-ui';

export default Example = () => (
  <Button title="Default Button" onPress={() => console.log('click default')} />
);
```

### Visual Variants

Switch between `primary`, `secondary`, and `ghost` styles via the `variant` prop.

```tsx
import React from 'react';
import { Button, Space } from 'react-native-system-ui';

export default Example = () => (
  <Space>
    <Button title="Primary" variant="primary" />
    <Button title="Secondary" variant="secondary" />
    <Button title="Ghost" variant="ghost" />
  </Space>
);
```

### Sizes

Choose `sm`, `md`, or `lg` to match layout needs.

```tsx
import React from 'react';
import { Button, Space } from 'react-native-system-ui';

export default Example = () => (
  <Space>
    <Button title="Small" size="sm" />
    <Button title="Medium" size="md" />
    <Button title="Large" size="lg" />
  </Space>
);
```

## API

### Button Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Button label | `string` | `-` |
| children | Custom button content | `ReactNode` | `-` |
| variant | Visual style. `primary` `secondary` `ghost` | `'primary' \| 'secondary' \| 'ghost'` | `primary` |
| size | Size preset. `sm` `md` `lg` | `'sm' \| 'md' \| 'lg'` | `md` |
| leftIcon | Icon displayed before text | `ReactNode` | `-` |
| rightIcon | Icon displayed after text | `ReactNode` | `-` |
| disabled | Disable interaction | `boolean` | `false` |
| style | Container style | `StyleProp<ViewStyle>` | `-` |
| textStyle | Text style override | `StyleProp<TextStyle>` | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| onPress | Fired when the button is pressed | `(event: GestureResponderEvent) => void` |

