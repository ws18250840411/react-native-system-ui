# Popup

Popup is a versatile overlay container that renders in a portal, supports safe areas, custom positions, and optional headers or keyboard shims.

## Import

```tsx
import { Popup } from 'react-native-system-ui';
```

### Header Variations

`Popup.Header` mirrors the `NavBar` look with optional close button, left/right extras, and callbacks.

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Popup, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <Popup.Header title="Sheet title" onClose={() => console.log('close')} />
      <Popup.Header title="Title only" showClose={false} />
      <Popup.Header
        title="Header with extras"
        leftExtra={<Text>Filters</Text>}
        rightExtra={<Text>Edit</Text>}
        onClose={() => console.log('close')}
      />
    </Space>
  );
}

export default Example;
```

### Positions And Lifecycle

Control where the popup enters from, toggle overlay behaviour, or destroy its children when hidden.

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Button, Popup, Space } from 'react-native-system-ui';

function Example() {
  const positions = ['center', 'top', 'bottom', 'left', 'right'];
  const [state, setState] = React.useState({
    visible: false,
    position: 'bottom',
    destroyVisible: false,
    overlayVisible: false,
  });

  const close = () => setState(prev => ({ ...prev, visible: false }));

  return (
    <>
      <Space>
        {positions.map(position => (
          <Button
            key={position}
            title={`Open ${position}`}
            onPress={() => setState(prev => ({ ...prev, visible: true, position }))}
          />
        ))}
        <Button
          title="Destroy on close"
          onPress={() => setState(prev => ({ ...prev, destroyVisible: true }))}
        />
        <Button
          title="Custom overlay"
          onPress={() => setState(prev => ({ ...prev, overlayVisible: true }))}
        />
      </Space>

      <Popup
        visible={state.visible}
        position={state.position}
        round
        safeAreaInsetBottom={state.position === 'bottom'}
        safeAreaInsetTop={state.position === 'top'}
        onPressOverlay={close}
        onRequestClose={() => {
          close();
          return true;
        }}>
        <Popup.Header title="Popup content" onClose={close} />
        <Text style={{ padding: 16 }}>Flexible container body.</Text>
      </Popup>

      <Popup
        visible={state.destroyVisible}
        destroyOnClosed
        position="bottom"
        round
        safeAreaInsetBottom
        onPressOverlay={() => setState(prev => ({ ...prev, destroyVisible: false }))}>
        <Popup.Header title="Fresh content" />
        <Text style={{ padding: 16 }}>Children mount each time.</Text>
      </Popup>

      <Popup
        visible={state.overlayVisible}
        position="center"
        overlayBackgroundColor="rgba(13, 148, 136, 0.45)"
        onPressOverlay={() => setState(prev => ({ ...prev, overlayVisible: false }))}>
        <Text style={{ padding: 24, fontSize: 16 }}>Custom overlay color</Text>
      </Popup>
    </>
  );
}

export default Example;
```

### Keyboard Shim

Use `Popup.KeyboardShim` for bottom sheets with text inputs. It keeps the content above the virtual keyboard.

```tsx
import React from 'react';
import { Button, Popup, Space, TextInput } from 'react-native-system-ui';

function Example() {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button title="Open editor" onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        position="bottom"
        round
        safeAreaInsetBottom
        onPressOverlay={() => setVisible(false)}>
        <Popup.Header title="Quick note" onClose={() => setVisible(false)} />
        <Space style={{ padding: 16 }}>
          <TextInput placeholder="Type your note" multiline />
        </Space>
        <Popup.KeyboardShim allowOnAndroid />
      </Popup>
    </>
  );
}

export default Example;
```

## API

### Popup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| visible | Controls visibility of the popup. | `boolean` | `false` |
| duration | Animation duration in milliseconds. | `number` | `theme.animation_duration_base` |
| overlay | Render a mask behind the popup. | `boolean` | `true` |
| closeOnPressOverlay | Whether tapping the overlay closes the popup. | `boolean` | `true` |
| onPressOverlay | Called when the overlay is tapped. | `() => void` | `-` |
| onOpen / onOpened | Lifecycle callbacks when the popup starts/finishes opening. | `() => void` | `-` |
| onClose / onClosed | Lifecycle callbacks when the popup starts/finishes closing. | `() => void` | `-` |
| onRequestClose | Android back handler. Return `true` to allow closing. | `() => boolean` | `-` |
| overlayBackgroundColor | Custom overlay color. | `OverlayProps['backgroundColor']` | `theme.overlay_background_color` |
| style | Style override for the popup container. | `StyleProp<ViewStyle>` | `-` |
| position | Where the popup enters from. | `'top' \| 'bottom' \| 'right' \| 'left' \| 'center'` | `'center'` |
| round | Display rounded corners. | `boolean` | `false` |
| safeAreaInsetBottom | Add bottom safe-area padding. | `boolean` | `false` |
| safeAreaInsetTop | Add top safe-area padding. | `boolean` | `false` |
| lazyRender | Delay rendering children until visible. | `boolean` | `true` |
| destroyOnClosed | Unmount children when the popup closes. | `boolean` | `false` |
| theme | Override popup theme tokens. | `Partial<PopupTheme>` | `-` |

### Popup.Header Props

Inherits most `NavBar` props except back arrow controls.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Header title content. | `ReactNode` | `-` |
| leftExtra | Left-aligned custom node. | `ReactNode` | `-` |
| rightExtra | Right-aligned custom node. | `ReactNode` | `-` |
| showClose | Display the default close icon. | `boolean` | `true` |
| onClose | Callback fired when the close icon is pressed. | `() => void` | `-` |
| theme | Override popup header theme tokens. | `Partial<PopupTheme>` | `-` |

### Popup.KeyboardShim Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| allowOnAndroid | Enable keyboard shim behaviour on Android (requires `windowSoftInputMode="adjustResize"`). | `boolean` | `false` |
