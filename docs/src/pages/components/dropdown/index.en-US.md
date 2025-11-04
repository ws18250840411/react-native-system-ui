# Dropdown

Dropdown presents filter menus that expand from the top or bottom edge of the screen.

## When To Use

- Provide lightweight list filters or sort controls without leaving the current view.
- Collect multiple related filters in a single toolbar.
- Support tree-style multi-select experiences with `Dropdown.Multiple`.

## Import

```tsx
import { Dropdown } from 'react-native-system-ui';
```

## Examples

### Single Select Filter

Render a menu with plain options. The overlay automatically positions itself based on the trigger.

```tsx
import React from 'react';
import { Dropdown } from 'react-native-system-ui';

function Example() {
  const options = [
    { label: 'All', value: 'all' },
    { label: 'In stock', value: 'stock' },
    { label: 'Out of stock', value: 'soldout' },
  ];
  const [status, setStatus] = React.useState('all');

  return (
    <Dropdown>
      <Dropdown.Item
        title="Status"
        options={options}
        value={status}
        onChange={setStatus}
      />
    </Dropdown>
  );
}

export default Example;
```

### Tree Multi-Select

`Dropdown.Multiple` accepts nested options and integrates with the tree search API.

```tsx
import React from 'react';
import { Dropdown } from 'react-native-system-ui';



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
  const [cities, setCities] = React.useState(['bj']);
  return (
    <Dropdown>
      <Dropdown.Multiple
        title="City"
        options={options}
        value={cities}
        onChange={setCities}
        search
        placeholder="Search city"
      />
    </Dropdown>
  );
}

export default Example;
```

## API

### Dropdown (container)

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| divider | Display a bottom divider beneath the trigger text | `boolean` | `true` |
| iconStyle | Style override for the trigger arrow | `StyleProp<ViewStyle>` | `-` |
| activeColor | Active color for trigger text and options | `ColorValue` | `dropdown_active_color` |
| direction | Default arrow orientation | `'up' \| 'down'` | `'down'` |
| titleStyle | Trigger wrapper style | `StyleProp<ViewStyle>` | `-` |
| titleTextStyle | Trigger text style | `StyleProp<TextStyle>` | `-` |
| duration | Animation duration in seconds | `number` | `animation_duration_fast` |
| zIndex | Layering of the popup | `number` | `10` |
| closeOnPressOutside | Close when tapping outside | `boolean` | `true` |
| theme | Override dropdown theme tokens | `Partial<DropdownTheme>` | `-` |

### Dropdown.Item

Shares tree capabilities (`search`, `onSearch`, `cancellable`).

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| titleStyle / titleTextStyle | Styles for the trigger text wrapper | `StyleProp<ViewStyle>` / `StyleProp<TextStyle>` | `-` |
| options | Options list (supports nested children) | `DropdownItemOption<T>[]` | `-` |
| value / defaultValue | Controlled / initial value | `T` | `-` |
| onChange | Called when an option is chosen | `(value: T, option: DropdownItemOption<T>) => void` | `-` |
| duration / zIndex | Animation duration / layer | `number` | `animation_duration_fast` / `10` |
| closeOnPressOutside | Close menu when tapping outside | `boolean` | `true` |
| loading | Show a loading spinner for the options list | `boolean` | `false` |
| placeholder | Placeholder displayed when nothing is selected | `string` | `''` |
| iconStyle | Style override for the arrow icon | `StyleProp<ViewStyle>` | `-` |
| disabled | Disable the current menu | `boolean` | `false` |

### Dropdown.Multiple

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value / defaultValue | Controlled / initial selection | `T[]` | `-` |
| onChange | Fired with the updated selection and option nodes | `(value: T[], options: DropdownItemOption<T>[]) => void` | `-` |
| beforeChecked | Intercept selection changes | `(event: { value: T[]; option: TreeOption; checked: boolean }) => T[] \| Promise<T[]>` | `-` |
| multipleMode | Tree multi-select strategy | `TreeProps['multipleMode']` | `'tag'` |
| ...rest | Inherits the same props as `Dropdown.Item` | `-` | `-` |

### Dropdown.Popup

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| targetHeight | Height of the trigger element | `number` | `-` |
| targetPageY | Vertical offset of the trigger | `number` | `-` |
| onPressShade | Callback when the shade area is pressed | `TouchableOpacityProps['onPress']` | `-` |
| safeAreaInset | Respect top and bottom safe areas | `boolean` | `true` |
| showShade | Render the shade overlay | `boolean` | `true` |
| contentStyle | Style override for the popup body | `StyleProp<ViewStyle>` | `-` |
| theme | Override popup theme tokens | `Partial<DropdownTheme>` | `-` |

> Theme tokens live in `packages/ui/src/components/dropdown/index.md`.
