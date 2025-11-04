# Blank

Blank applies consistent outer or inner spacing around its children, making it easy to align content with the design system.

## Import

```tsx
import { Blank } from 'react-native-system-ui';
```

### Margin Spacing

Enable the sides you need and pick a preset size.

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Blank, Card, Divider, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Blank top bottom>
      <Card>
        <Space>
          <Text>Card title</Text>
          <Divider />
          <Text>Card body respects the blank margins.</Text>
        </Space>
      </Card>
    </Blank>
  );
}

export default Example;
```

### Padding Mode

Switch `type` to `padding` to push content inward instead of adding margin.

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Blank, Card } from 'react-native-system-ui';

function Example() {
  return (
    <Card>
      <Blank type="padding" size="l">
        <Text>Extra breathing room inside the card.</Text>
      </Blank>
    </Card>
  );
}

export default Example;
```

## API

`Blank` extends the default React Native `View` props.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| top | Applies top spacing. `true` uses the preset size; numbers set an explicit value. | `boolean \| number` | `false` |
| bottom | Applies bottom spacing. | `boolean \| number` | `false` |
| left | Applies left spacing. | `boolean \| number` | `true` |
| right | Applies right spacing. | `boolean \| number` | `true` |
| size | Preset spacing size when a side is `true`. | `'s' \| 'm' \| 'l'` | `'m'` |
| type | Whether to add margin (outside) or padding (inside). | `'margin' \| 'padding'` | `'margin'` |
| theme | Override blank theme tokens. | `Partial<BlankTheme>` | `-` |
