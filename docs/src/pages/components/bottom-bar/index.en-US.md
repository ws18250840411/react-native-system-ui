# Bottom Bar

BottomBar anchors actions or summaries to the bottom edge of the screen while respecting safe areas.

## Import

```tsx
import { BottomBar } from 'react-native-system-ui';
```

### Basic Usage

Wrap your call-to-action buttons or summary content. Padding is fully customizable.

```tsx
import React from 'react';
import { BottomBar, Button, Space } from 'react-native-system-ui';

function Example() {
  return (
    <BottomBar style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      <Space direction="horizontal" justify="space-between" align="center">
        <Button title="Cancel" variant="ghost" onPress={() => console.log('cancel')} />
        <Button title="Submit" variant="primary" onPress={() => console.log('submit')} />
      </Space>
    </BottomBar>
  );
}

export default Example;
```

### Customize Appearance

Control height, background color, divider, and even hide the bar when it is not needed. `keyboardShowNotRender` prevents the bar from being pushed upward on Android when the keyboard appears.

```tsx
import React from 'react';
import { BottomBar, Button, Space, Switch } from 'react-native-system-ui';

function Example() {
  const [hidden, setHidden] = React.useState(false);
  const [divider, setDivider] = React.useState(true);

  return (
    <Space>
      <Space direction="horizontal" align="center" justify="space-between">
        <Switch value={!hidden} onValueChange={value => setHidden(!value)} />
        <Button
          title={hidden ? 'Show toolbar' : 'Hide toolbar'}
          variant="secondary"
          onPress={() => setHidden(value => !value)}
        />
      </Space>

      <BottomBar
        hidden={hidden}
        divider={divider}
        backgroundColor="#111"
        height={60}
        style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
        <Space direction="horizontal" justify="space-between" align="center">
          <Button title="Support" variant="ghost" onPress={() => {}} />
          <Button title="Pay Now" variant="primary" onPress={() => console.log('pay')} />
        </Space>
      </BottomBar>
    </Space>
  );
}

export default Example;
```

## API

`BottomBar` extends the default React Native `View` props.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| safeAreaInsetBottom | Apply safe-area padding to the bottom edge. | `boolean` | `true` |
| backgroundColor | Background color of the toolbar. | `ColorValue` | `theme.bottom_bar_background_color` |
| height | Toolbar height. | `number` | `theme.bottom_bar_height` |
| hidden | Toggle visibility of the bar. | `boolean` | `false` |
| keyboardShowNotRender | Skip rendering while the keyboard is visible (Android only) to avoid being pushed upward. | `boolean` | `true` |
| divider | Show a separator line on top. | `boolean` | `true` |
| theme | Override bottom-bar theme tokens. | `Partial<BottomBar>` | `-` |
