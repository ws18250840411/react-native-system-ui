# ButtonBar

ButtonBar groups primary actions at the bottom of the screen. It supports both configuration arrays and custom children.

## When To Use

- Detail pages or dialogs that need persistent "Cancel / Confirm" actions.
- List or dashboard views that require a fixed action rail.
- You want ButtonBar to automatically collapse overflow actions into an `ActionSheet`.

## Import

```tsx
import { ButtonBar } from 'react-native-system-ui';
```

## Examples

### Config-Driven Buttons

```tsx
import React from 'react';
import { ButtonBar } from 'react-native-system-ui';

const buttons = [
  { text: 'Cancel', variant: 'ghost', onPress: () => console.log('cancel') },
  { text: 'Submit', variant: 'primary', onPress: () => console.log('submit') },
];

function Example() {
  return <ButtonBar buttons={buttons} />;
}

export default Example;
```

### Custom Children

```tsx
import React from 'react';
import { Button, ButtonBar, Space } from 'react-native-system-ui';

function Example() {
  return (
    <ButtonBar alone>
      <Space direction="horizontal">
        <Button title="Save draft" variant="ghost" onPress={() => {}} />
        <Button title="Publish" variant="primary" onPress={() => {}} />
      </Space>
    </ButtonBar>
  );
}

export default Example;
```

## API

Inherits layout props from `BottomBar`.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| alone | Compact mode when rendering a single button | `boolean` | `false` |
| buttons | Config array. Hidden items (`hidden: true`) will not render. | `Array<Omit<ButtonProps, 'onPress'> & { hidden?: boolean; onPress?: () => void }>` | `[]` |
| count | Maximum number of config buttons to display before collapsing into an ActionSheet | `number` | `4` |
| moreText | Label for the overflow ActionSheet trigger | `string` | `'更多'` |
| blankSize | Horizontal padding size | `BlankProps['size']` | `'m'` |
| theme | Override ButtonBar theme tokens | `Partial<ButtonBarTheme>` | `-` |

### ButtonBar.Confirm <Badge>0.3.9+</Badge>

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| cancel | Custom node rendered on the left (e.g., cancel button(s)) | `React.ReactNode` | `-` |
| children | Main confirm button(s) | `React.ReactNode` | `-` |
