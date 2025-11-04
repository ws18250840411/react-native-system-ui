# Switch

Switch toggles between on/off states with optional loading, disabled, and custom label support.

## When To Use

- Represent binary settings that apply immediately (notifications, dark mode, etc.).
- Intercept state changes with `beforeChange` or show a loading state while persisting changes.
- Combine with `Field.Switch` to reuse the same cell layout across forms.

## Import

```tsx
import { Switch } from 'react-native-system-ui';
```

## Examples

### Controlled & Uncontrolled

```tsx
import React from 'react';
import { Switch, Space } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState(true);

  return (
    <Space>
      <Switch value={value} onChange={setValue} />
      <Switch defaultValue={false} />
    </Space>
  );
}

export default Example;
```

### Loading, Disabled, Guarded

```tsx
import React from 'react';
import { Switch, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <Switch loading />
      <Switch disabled defaultValue={true} />
      <Switch
        defaultValue={false}
        beforeChange={next => {
          console.log('before change', next);
          return new Promise(resolve => setTimeout(() => resolve(true), 500));
        }}
      />
    </Space>
  );
}

export default Example;
```

### Custom Colors & Content

```tsx
import React from 'react';
import { Switch } from 'react-native-system-ui';

function Example() {
  return (
    <Switch
      defaultValue
      activeColor="#10b981"
      inactiveColor="#d1d5db"
      activeChildren="ON"
      inactiveChildren="OFF"
    />
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value | Controlled value | `ActiveValueT \| InactiveValueT` | `-` |
| defaultValue | Initial value | `ActiveValueT \| InactiveValueT` | `-` |
| onChange | Fired when the state changes | `(value: ActiveValueT \| InactiveValueT) => void` | `-` |
| beforeChange | Guard callback. Return `false`/`Promise<false>` to cancel | `(value: ActiveValueT \| InactiveValueT) => boolean \| Promise<boolean>` | `-` |
| loading | Show a loading spinner and lock interaction | `boolean` | `false` |
| disabled | Disable interaction | `boolean` | `false` |
| size | Switch size (px) | `number` | `switch_size` |
| activeColor | Background color when on | `ColorValue` | `switch_on_background_color` |
| inactiveColor | Background color when off | `ColorValue` | `switch_background_color` |
| activeValue / inactiveValue | Values returned for on/off | `ActiveValueT` / `InactiveValueT` | `true` / `false` |
| activeChildren / inactiveChildren | Custom content displayed inside | `React.ReactNode` | `-` |
| onPress | Fired whenever the switch is tapped | `() => void` | `-` |
| theme | Override theme tokens | `Partial<SwitchTheme>` | `-` |

> Theme tokens are listed in `packages/ui/src/components/switch/index.md`.
