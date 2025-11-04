# Notify

Notify slides down from the top of the screen to deliver high-visibility messages. Use it either imperatively or as a controlled component.

## When To Use

- Show success or error feedback without blocking the current view.
- Display short-lived announcements at the top edge of the app.
- Provide persistent warnings by setting `duration={0}`.

## Import

```tsx
import { Notify } from 'react-native-system-ui';
```

## Examples

### Imperative Helpers

```tsx
import React from 'react';
import { Button, Notify, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <Button title="Success" onPress={() => Notify.success('Profile updated')} />
      <Button
        title="Persistent Warning"
        onPress={() =>
          Notify({
            type: 'warning',
            message: 'Sandbox mode enabled',
            duration: 0,
          })
        }
      />
    </Space>
  );
}

export default Example;
```

### Controlled Component

```tsx
import React from 'react';
import { Button, Notify } from 'react-native-system-ui';

function Example() {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button title="Show" onPress={() => setVisible(true)} />
      <Notify.Component
        visible={visible}
        message="Draft saved"
        type="success"
        onRequestClose={() => {
          setVisible(false);
          return true;
        }}
      />
    </>
  );
}

export default Example;
```

## API

### Notify.Component / Notify.NotifyComponent

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| visible | Controls visibility | `boolean` | `false` |
| style | Container style | `StyleProp<ViewStyle>` | `-` |
| textStyle | Text style override | `StyleProp<TextStyle>` | `-` |
| type | Semantic variant | `'primary' \| 'success' \| 'error' \| 'warning'` | `'primary'` |
| message | Message content | `React.ReactNode` | `-` |
| color | Text color | `ColorValue` | `notify_text_color` |
| backgroundColor | Background color | `ColorValue` | variant-specific |
| onPress | Tap handler for the banner | `TouchableWithoutFeedbackProps['onPress']` | `-` |
| onOpen / onOpened / onClose / onClosed | Lifecycle callbacks | `() => void` | `-` |
| onRequestClose | Android back handler. Return `true` to close. | `() => boolean` | `-` |
| duration | Auto-dismiss duration (ms). `0` keeps it visible. | `number` | `3000` |
| theme | Override notify theme tokens | `Partial<NotifyTheme>` | `-` |

### Notify(options)

Imperative helper returning `{ close, setMessage }`. Options mirror `Notify.Component` (except `visible`).

| Method | Description |
| --- | --- |
| `close()` | Dismiss the notify banner. |
| `setMessage(node)` | Update the displayed message. |

> Theme tokens are available in `packages/ui/src/components/notify/index.md`.
