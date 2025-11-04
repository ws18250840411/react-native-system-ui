# Checkbox

Checkboxes toggle boolean choices or collect multiple selections from a small option set.

## When To Use

- Offer opt-in confirmations such as user agreements or marketing preferences.
- Present multi-select filters where the order does not matter.
- Combine with `Checkbox.Group` to lay out horizontal or vertical clusters quickly.

## Import

```tsx
import { Checkbox } from 'react-native-system-ui';
```

## Examples

### Controlled And Uncontrolled

Manage the value yourself or let the component keep its internal state.

```tsx
import React from 'react';
import { Checkbox, Space } from 'react-native-system-ui';

function Example() {
  const [checked, setChecked] = React.useState(true);

  return (
    <Space>
      <Checkbox label="Controlled" value={checked} onChange={setChecked} />
      <Checkbox label="Default checked" defaultValue />
      <Checkbox label="Disabled" disabled />
    </Space>
  );
}

export default Example;
```

### Checkbox.Group

Feed options to render a whole group. Set `multiple` for multi-select workflows.

```tsx
import React from 'react';
import { Checkbox } from 'react-native-system-ui';

function Example() {
  const options = [
    { label: 'Design', value: 'design' },
    { label: 'Product', value: 'pm' },
    { label: 'Engineering', value: 'eng', disabled: true },
  ];
  const [roles, setRoles] = React.useState(['design']);

  return (
    <Checkbox.Group
      options={options}
      multiple
      value={roles}
      onChange={value => {
        const next = Array.isArray(value) ? value : [value];
        setRoles(next);
      }}
    />
  );
}

export default Example;
```

## API

### Checkbox

Extends the default React Native `View` props.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value | Controlled value | `ActiveValueT \| InactiveValueT` | `-` |
| defaultValue | Initial value in uncontrolled mode | `ActiveValueT \| InactiveValueT` | `-` |
| onChange | Fires whenever the checked state changes | `(value: ActiveValueT \| InactiveValueT) => void` | `-` |
| activeValue | Value returned when checked | `ActiveValueT` | `true` |
| inactiveValue | Value returned when unchecked | `InactiveValueT` | `false` |
| label | Text or node rendered next to the checkbox | `React.ReactNode` | `-` |
| labelDisabled | Disable tapping the label | `boolean` | `false` |
| labelPosition | Place the label before or after the icon | `'left' \| 'right'` | `'right'` |
| labelTextStyle | Style override for label text | `StyleProp<TextStyle>` | `-` |
| iconStyle | Style override for the icon wrapper | `StyleProp<ViewStyle>` | `-` |
| iconSize | Icon size in pixels | `number` | `checkbox_icon_size` |
| activeColor | Icon color when checked | `ColorValue` | `checkbox_checked_icon_color` |
| inactiveColor | Icon color when unchecked | `ColorValue` | `checkbox_icon_color` |
| renderIcon | Custom renderer for the icon | `(props) => React.ReactNode` | `-` |
| gap | Spacing between the icon and label | `number` | `checkbox_label_margin` |
| disabled | Disable the checkbox | `boolean` | `false` |
| theme | Override checkbox theme tokens | `Partial<CheckboxTheme>` | `-` |

### Checkbox.Group

Inherits alignment props from `Space`.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| options | Option list, each item may override `disabled`, `iconSize`, etc. | `{ value: ActiveValueT; label: string; disabled?: boolean; iconSize?: number; }[]` | `-` |
| value | Controlled values | `ActiveValueT \| ActiveValueT[]` | `-` |
| defaultValue | Initial values | `ActiveValueT \| ActiveValueT[]` | `-` |
| onChange | Triggered when the selection changes | `(value: ActiveValueT[] \| ActiveValueT, options: { value: ActiveValueT; label: string; disabled?: boolean }[]) => void` | `-` |
| multiple | Allow multiple selections | `boolean` | `false` |
| editable | Toggle interaction | `boolean` | `true` |
| scrollable | Enable horizontal scrolling when laid out in a row | `boolean` | `false` |
| deselect | Allow deselecting the current item in single-select mode | `boolean` | `true` |
| checkboxLabelTextStyle | Shared label style for every option | `CheckboxProps['labelTextStyle']` | `-` |
| checkboxIconLabelGap | Shared gap between icon and label | `number` | `-` |
| iconSize / activeColor / inactiveColor / renderIcon | Mirrors `Checkbox` props | `-` |

### Checkbox.Icon

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| active | Whether the icon is highlighted | `boolean` | `false` |
| activeColor | Color when active | `ColorValue` | `checkbox_checked_icon_color` |
| inactiveColor | Color when inactive | `ColorValue` | `checkbox_icon_color` |
| size | Icon size in pixels | `number` | `checkbox_icon_size` |
| theme | Override icon theme tokens | `Partial<CheckboxTheme>` | `-` |

> For the list of theme tokens, see `packages/ui/src/components/checkbox/index.md`.
