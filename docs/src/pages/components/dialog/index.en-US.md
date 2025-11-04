# Dialog

Dialog displays a modal prompt to confirm actions, show information, or collect light-weight input. It can be invoked imperatively or rendered as a controlled component.

## Import

```tsx
import { Dialog } from 'react-native-system-ui';
```

### Imperative Alerts And Confirms

Call `Dialog()` or `Dialog.confirm()` to open a modal anywhere in your code. Both return a promise that resolves when a button is pressed and rejects when closed.

```tsx
import React from 'react';
import { Cell, Dialog } from 'react-native-system-ui';

function Example() {
  const cells = React.useMemo(
    () => [
      {
        title: 'Info dialog',
        action: () =>
          Dialog({
            title: 'Connection lost',
            message: 'We will retry in the background.',
            showCancelButton: false,
          }),
      },
      {
        title: 'Confirmation',
        action: () =>
          Dialog.confirm({
            title: 'Delete file?',
            message: 'This action cannot be undone.',
            confirmButtonColor: '#F5222D',
            confirmButtonText: 'Delete',
          }).then(action => console.log('action ->', action)),
      },
      {
        title: 'Before close (async)',
        action: () =>
          Dialog.confirm({
            title: 'Leave the form?',
            message: 'Unsaved changes will be lost.',
            beforeClose: action =>
              new Promise(resolve => {
                setTimeout(() => resolve(action !== 'confirm'), 1200);
              }),
          }),
      },
    ],
    [],
  );

  return (
    <Cell.Group title="Quick actions">
      {cells.map(item => (
        <Cell key={item.title} title={item.title} isLink onPress={item.action} />
      ))}
    </Cell.Group>
  );
}

export default Example;
```

### Controlled Component

Render `Dialog.Component` when you need to control visibility in JSX, attach form controls, or integrate with external state.

```tsx
import React from 'react';
import { Button, Dialog, Space } from 'react-native-system-ui';

function Example() {
  const [visible, setVisible] = React.useState(false);

  return (
    <Space>
      <Button title="Open modal" onPress={() => setVisible(true)} />

      <Dialog.Component
        visible={visible}
        title="Create project"
        message="Dialogs rendered as components give you full control."
        showCancelButton
        confirmButtonText="Create"
        onPressCancel={() => setVisible(false)}
        onPressConfirm={() => {
          setVisible(false);
          console.log('confirm');
        }}
        onRequestClose={() => setVisible(false)}
      />
    </Space>
  );
}

export default Example;
```

### Input Dialog

`Dialog.input()` renders a text or number input. The resolver receives the entered value.

```tsx
import React from 'react';
import { Button, Dialog } from 'react-native-system-ui';

function Example() {
  const promptName = () => {
    Dialog.input({
      title: 'Rename folder',
      placeholder: 'Team name',
      defaultValue: 'Design System',
      confirmButtonText: 'Save',
      beforeClose: (action, text) => {
        if (action === 'confirm' && text.trim().length === 0) {
          return false;
        }
        return true;
      },
    }).then(({ action, text }) => console.log(action, text));
  };

  return <Button title="Rename" onPress={promptName} />;
}

export default Example;
```

## API

### `Dialog.Component` Props

Extends the shared popup props from `PopupPropsCommon`.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Header title content. | `ReactNode` | `-` |
| message | Body content. Use `\n` to add line breaks when passing strings. | `ReactNode` | `-` |
| messageAlign | Alignment of the message text. | `'center' \| 'left' \| 'right'` | `'center'` |
| width | Dialog width. | `DimensionValue` | `300` |
| showConfirmButton | Toggle confirm button visibility. | `boolean` | `true` |
| showCancelButton | Toggle cancel button visibility. | `boolean` | `false` |
| confirmButtonText | Confirm button label. | `string` | `'确认'` |
| confirmButtonColor | Confirm button color. | `ColorValue` | `-` |
| confirmButtonTextBold | Render confirm text in bold. | `boolean` | `true` |
| confirmButtonLoading | Display a loading indicator on the confirm button. | `boolean` | `false` |
| cancelButtonText | Cancel button label. | `string` | `'取消'` |
| cancelButtonColor | Cancel button color. | `ColorValue` | `-` |
| cancelButtonTextBold | Render cancel text in bold. | `boolean` | `false` |
| cancelButtonLoading | Display a loading indicator on the cancel button. | `boolean` | `false` |
| showClose | Show a close icon in the top-right corner. | `boolean` | `false` |
| onPressClose | Callback when the close icon is pressed. | `TouchableWithoutFeedbackProps['onPress']` | `-` |
| buttonReverse | Swap the order of cancel and confirm buttons. | `boolean` | `false` |
| style | Style override for the dialog container. | `StyleProp<ViewStyle>` | `-` |
| children | Render custom JSX inside the dialog body. | `ReactNode` | `-` |
| onPressCancel | Called when the cancel button is pressed. | `() => void` | `-` |
| onPressConfirm | Called when the confirm button is pressed. | `() => void` | `-` |
| theme | Override dialog theme tokens. | `Partial<DialogTheme>` | `-` |

### `Dialog(options)` Helper

Accepts all props from `Dialog.Component` except `visible`, `onPressCancel`, `onPressConfirm`, and `onRequestClose`, plus the following additions.

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| beforeClose | Called before the dialog closes. Return `false`/`Promise<false>` to keep it open. | `(action: DialogAction) => boolean \| Promise<boolean>` | `-` |
| onResponse | Fired after the dialog closes with the action name. | `(action: DialogAction) => void` | `-` |

`Dialog.confirm(options)` sets `showCancelButton` to `true` by default. `Dialog.alert(options)` is an alias for `Dialog(options)`.

### `Dialog.input(options)`

All base options are supported in addition to specialized input props.

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| defaultValue | Initial value of the input. | `string` | `''` |
| placeholder | Placeholder text for the input. | `string` | `-` |
| type | Input type forwarded to `TextInput` or `NumberInput`. | `TextInputProps['type'] \| NumberInputProps['type']` | `'text'` |
| autoFocus | Auto focus the input on open. | `boolean` | `true` |
| textInput | Props forwarded to the underlying `TextInput`. | `Omit<TextInputProps, 'defaultValue' \| 'placeholder' \| 'type' \| 'autoFocus'>` | `-` |
| numberInput | Props forwarded to the underlying `NumberInput`. | `Omit<NumberInputProps, 'defaultValue' \| 'placeholder' \| 'type' \| 'autoFocus'>` | `-` |
| beforeClose | Validate before closing (triggered by confirm or cancel). | `(action: Exclude<DialogAction, 'overlay'>, text: string) => boolean \| Promise<boolean>` | `-` |
| onPressCancel | Custom cancel handler, receives the current text. | `(text: string) => boolean \| Promise<boolean> \| void` | `-` |
| onPressConfirm | Custom confirm handler, receives the current text. | `(text: string) => boolean \| Promise<boolean> \| void` | `-` |
