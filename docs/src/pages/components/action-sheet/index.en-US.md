# Action Sheet

Action sheets slide up from the bottom of the screen to present contextual actions without leaving the current view.

## Import

```tsx
import { ActionSheet } from 'react-native-system-ui';
```

### Imperative Usage

Invoke the default export as a promise-based helper when you only need to show an action sheet temporarily.

```tsx
import React from 'react';
import { ActionSheet, Button, Space } from 'react-native-system-ui';

function Example() {
  const showBasic = React.useCallback(() => {
    ActionSheet({
      title: 'Choose an option',
      actions: ['Share', 'Pin', 'Archive'],
      cancelText: 'Cancel',
    })
      .then(({ item, index }) => {
        console.log('selected', item, index);
      })
      .catch(() => {
        console.log('cancelled');
      });
  }, []);

  const showWithStatus = React.useCallback(() => {
    ActionSheet({
      description: 'Actions can be loading or disabled.',
      actions: [
        { name: 'Highlight', color: '#fa541c' },
        { name: 'Processing…', loading: true },
        { name: 'Disabled', disabled: true },
      ],
      cancelText: 'Close',
      closeOnPressOverlay: false,
    }).catch(() => {});
  }, []);

  return (
    <Space>
      <Button title="Open Action Sheet" onPress={showBasic} />
      <Button title="Option States" variant="secondary" onPress={showWithStatus} />
    </Space>
  );
}

export default Example;
```

### Controlled Component

Use `ActionSheet.Component` when the sheet is part of your JSX tree and you manage its visibility manually.

```tsx
import React from 'react';
import { ActionSheet, Button } from 'react-native-system-ui';

function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button title="Manage Status" onPress={() => setOpen(true)} />

      <ActionSheet.Component
        visible={open}
        title="Manage item"
        description="Pick an action to continue."
        cancelText="Done"
        actions={[
          { name: 'Duplicate' },
          { name: 'Archive', color: '#1677ff' },
        ]}
        onSelect={(action, index) => {
          setOpen(false);
          console.log('select', action, index);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

export default Example;
```

## API

### `ActionSheet.Component` Props

Extends the shared popup props exposed by `PopupPropsCommon`.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| actions | List of options rendered inside the sheet. | `Action[]` | `-` |
| title | Header text displayed above the options. | `React.ReactNode` | `-` |
| cancelText | Text for the cancel button. | `string` | `-` |
| cancelTextStyle | Style override for the cancel button text. | `StyleProp<TextStyle>` | `-` |
| description | Optional description displayed above the list. | `React.ReactNode` | `-` |
| descriptionStyle | Style override for the description. | `StyleProp<TextStyle>` | `-` |
| safeAreaInsetTop | Safe area padding applied to the top. | `number` | `safeAreaInsets.top` |
| round | Whether to display rounded corners. | `boolean` | `true` |
| lazyRender | Render the content only when the sheet is visible. | `boolean` | `true` |
| theme | Partial theme tokens for the sheet. | `Partial<ActionSheetTheme>` | `-` |
| onCancel | Fired when the cancel button is pressed. | `() => void` | `-` |
| onSelect | Fired when an option is pressed (skipped for disabled/loading actions). | `(action: Action, index: number) => void` | `-` |

### `ActionSheet(options)` Helper

The imperative helper accepts every prop from `ActionSheet.Component` except `visible`, `actions`, `onCancel`, `onSelect`, and `onRequestClose`, plus the following additions.

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| actions | Options rendered by the sheet. Strings are converted to `{ name: string }`. | `(string \| Action)[]` | `-` |
| beforeClose | Called before the sheet closes. Return `false` (or a promise that resolves to `false`) to keep it open. | `(action: ActionSheetAction, item?: Action, index?: number) => boolean \| Promise<boolean>` | `-` |
| onResponse | Called when an action is triggered (`item`, `cancel`, or overlay tap). | `(action: ActionSheetAction, item?: Action, index?: number) => void` | `-` |
