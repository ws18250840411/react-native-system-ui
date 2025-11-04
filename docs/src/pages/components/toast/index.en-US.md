# Toast

Toast surfaces transient feedback above the current screen—use it for lightweight status, blocking loading indicators, or quick confirmations.

## Import

```tsx
import { Toast } from 'react-native-system-ui';
```

### Basic Messages

Trigger text, success, or failure toasts anywhere in your code. The helper returns a controller with `close()` and `setMessage()`.

```tsx
import React from 'react';
import { Cell } from 'react-native-system-ui';

function Example() {
  return (
    <Cell.Group title="Messages">
      <Cell title="Text toast" isLink onPress={() => Toast({ message: 'Saved successfully' })} />
      <Cell title="Success" isLink onPress={() => Toast.success('Everything looks great')} />
      <Cell title="Failure" isLink onPress={() => Toast.fail('Something went wrong')} />
    </Cell.Group>
  );
}

export default Example;
```

### Loading And Countdown

`Toast.loading()` keeps the toast on screen until you close it manually—handy for async work or countdowns.

```tsx
import React from 'react';
import { Cell, Toast } from 'react-native-system-ui';

function Example() {
  const showCountdown = () => {
    let remaining = 3;
    const buildMessage = () => `Retrying in ${remaining}…`;
    const handler = Toast.loading({
      message: buildMessage(),
      forbidPress: true,
      duration: 0,
    });

    const tick = () => {
      if (remaining === 0) {
        handler.close();
        Toast.success('Done');
        return;
      }
      remaining -= 1;
      handler.setMessage(buildMessage());
      setTimeout(tick, 1000);
    };

    tick();
  };

  return (
    <Cell.Group title="Loading states">
      <Cell
        title="Block interactions"
        isLink
        onPress={() =>
          Toast.loading({
            message: 'Processing…',
            forbidPress: true,
            duration: 0,
          })
        }
      />
      <Cell title="Countdown" isLink onPress={showCountdown} />
    </Cell.Group>
  );
}

export default Example;
```

### Custom Icon And Placement

Pass your own icon or change the placement to top or bottom.

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Cell, Toast } from 'react-native-system-ui';

const CustomIcon = () => (
  <View
    style={{
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#f5222d',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Text style={{ color: '#fff', fontWeight: 'bold' }}>!</Text>
  </View>
);

function Example() {
  return (
    <Cell.Group title="Customization">
      <Cell
        title="Top placement"
        isLink
        onPress={() => Toast({ message: 'Heads up!', position: 'top' })}
      />
      <Cell
        title="Custom icon"
        isLink
        onPress={() =>
          Toast({
            type: 'icon',
            message: 'DIY icon',
            icon: <CustomIcon />,
          })
        }
      />
    </Cell.Group>
  );
}

export default Example;
```

## API

Toast shares a common interface across all helper methods (`Toast`, `Toast.success`, `Toast.fail`, `Toast.loading`). It inherits popup lifecycle callbacks except for `visible`, `duration`, and `closeOnPressOverlay`, which are overridden below.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Toast style: plain text, loading spinner, success, failure, or custom icon. | `'text' \| 'loading' \| 'success' \| 'fail' \| 'icon'` | `'text'` |
| position | Vertical placement on the screen. | `'top' \| 'bottom' \| 'middle'` | `'middle'` |
| message | Text content. Use `\n` for line breaks. | `string` | `''` |
| overlay | Show a translucent overlay behind the toast. | `boolean` | `false` |
| forbidPress | Prevent background touches while visible. | `boolean` | `false` |
| closeOnPress | Close toast when the toast itself is pressed. | `boolean` | `false` |
| closeOnPressOverlay | Close toast when the overlay is pressed. | `boolean` | `false` |
| loadingType | Spinner style when `type="loading"`. | `'circular' \| 'spinner'` | `'spinner'` |
| duration | Auto-dismiss time in milliseconds. `0` keeps the toast open. | `number` | `2000` |
| icon | Custom React node rendered above the message (used when `type="icon"`). | `React.ReactNode` | `-` |
| onOpen / onOpened | Lifecycle callbacks triggered when the toast opens. | `() => void` | `-` |
| onClose / onClosed | Lifecycle callbacks triggered when the toast closes. | `() => void` | `-` |
| onPressOverlay | Fired when the overlay is pressed. | `() => void` | `-` |
| onRequestClose | Android back handler. | `() => boolean` | `-` |
| overlayBackgroundColor | Custom overlay color. | `OverlayProps['backgroundColor']` | `theme.overlay_background_color` |
| theme | Override toast theme tokens. | `Partial<ToastTheme>` | `-` |

Each helper returns an object with:

| Method | Description | Type |
| --- | --- | --- |
| close | Programmatically dismiss the toast. | `() => void` |
| setMessage | Update the toast message while it is visible. | `(message: string) => void` |
