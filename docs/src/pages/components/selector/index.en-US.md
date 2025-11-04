# Selector

Selector is a popup picker similar to a web Select component. It supports tree data, single/multiple selection, search, and both imperative or controlled usage.

## When To Use

- Choose one or more items from a hierarchical list.
- Provide a modal selector with confirm/cancel actions on mobile.
- Trigger the picker programmatically via a promise-based helper.

## Import

```tsx
import { Selector } from 'react-native-system-ui';
```

## Examples

### Controlled Component

```tsx
import React from 'react';
import { Button, Selector } from 'react-native-system-ui';

function Example() {
  const options = [
    {
      label: 'Tier 1',
      value: 'tier1',
      children: [
        { label: 'Beijing', value: 'bj' },
        { label: 'Shanghai', value: 'sh' },
      ],
    },
  ];
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState(undefined);

  return (
    <>
      <Button title="Pick city" onPress={() => setVisible(true)} />
      <Selector.Component
        visible={visible}
        title="Choose city"
        options={options}
        value={value}
        onChange={(val, options) => {
          const next = Array.isArray(val) ? val[0] : val;
          setValue(next);
          console.log(options);
        }}
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

### Imperative Helper

```tsx
import React from 'react';
import { Button, Selector } from 'react-native-system-ui';

function Example() {
  const options = [
    { label: 'All', value: 'all' },
    { label: 'Design', value: 'design' },
    { label: 'Engineering', value: 'eng' },
  ];

  const openSelector = () => {
    Selector({ options }).then(result => console.log('result', result));
  };

  return <Button title="Open selector" onPress={openSelector} />;
}

export default Example;
```

## API

### Selector.Component / Selector.SelectorComponent

Extends `Popup` props (minus `closeOnPressOverlay` and `onPressOverlay`) and tree-related props (`search`, `multiple`, etc.) from `TreeProps`.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value | Controlled value (single or multiple) | `SelectorValue \| SelectorValue[]` | `-` |
| defaultValue | Initial value | `SelectorValue \| SelectorValue[]` | `-` |
| onChange | Fires after the confirm button | `(value, options) => void` | `-` |
| options | Option data (tree supported) | `SelectorOption[]` | `-` |
| closeOnPressOverlay | Close when tapping the overlay | `boolean` | `true` |
| title | Header title | `React.ReactNode` | `'请选择'` |
| showClose | Show a close icon | `boolean` | `true` |
| onChangeImmediate | Mutate the value immediately as the user navigates | `(value) => SelectorValue \| SelectorValue[]` | `-` |
| safeAreaInsetTop | Safe area inset for the header | `number` | `safeAreaInsets.top` |
| confirmButtonText | Confirm button label | `string` | `'确定'` |
| theme | Override selector theme tokens | `Partial<SelectorTheme>` | `-` |

### Selector(options)

Imperative helper returning a promise that resolves with the selected value(s). Accepts the same options as `Selector.Component` plus:

| Prop | Description | Type |
| --- | --- | --- |
| beforeChange | Intercept close behavior; return `false`/`Promise<false>` to keep it open | `(value, options) => boolean \| Promise<boolean>` |

### Selector.Text

Inline text version for showing the current selection.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Label displayed on the left | `React.ReactNode` | `'请选择'` |
| value | Current value | `SelectorValue` | `-` |
| options | Options used to build the label | `SelectorOption[]` | `-` |
| onChange | Triggered when the inline selector changes | `(value, options) => void` | `-` |
| arrowDirection | Arrow direction | `'left' \| 'up' \| 'right' \| 'down'` | `'right'` |
| divider | Display a divider under the row | `boolean` | `true` |
| head | Reserve leading spacing | `boolean` | `true` |
| theme | Override selector text theme tokens | `Partial<SelectorTheme>` | `-` |
