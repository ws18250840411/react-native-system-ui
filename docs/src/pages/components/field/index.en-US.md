# Field

Field wraps `Cell` with form-friendly controls, giving inputs, selectors, switches, and more a consistent layout.

## When To Use

- Build forms where every row should align with the same typography and spacing.
- Switch quickly between display, text entry, selector, and picker variants without rewriting layout code.
- Pair with `Form` so value and validation logic stay consistent.

## Import

```tsx
import { Field } from 'react-native-system-ui';
```

## Examples

### Text Display And Entry

```tsx
import React from 'react';
import { Field } from 'react-native-system-ui';

function Example() {
  const [note, setNote] = React.useState('Verified');

  return (
    <>
      <Field.Text title="Verification" value={note} />
      <Field.TextInput
        title="Notes"
        placeholder="Add a remark"
        value={note}
        onChangeText={setNote}
      />
    </>
  );
}

export default Example;
```

### Selector And Date Picker

```tsx
import React from 'react';
import { Field } from 'react-native-system-ui';

function Example() {
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];
  const [gender, setGender] = React.useState();
  const [birthday, setBirthday] = React.useState();

  return (
    <>
      <Field.Selector
        title="Gender"
        options={genderOptions}
        value={gender}
        onChange={setGender}
        placeholder="Select"
      />
      <Field.Date
        title="Birthday"
        value={birthday}
        onChange={setBirthday}
        placeholder="Pick a date"
      />
    </>
  );
}

export default Example;
```

### Switch, Checkbox, Password

```tsx
import React from 'react';
import { Field } from 'react-native-system-ui';

function Example() {
  const [notifications, setNotifications] = React.useState(true);
  const [skills, setSkills] = React.useState(['rn']);

  return (
    <>
      <Field.Switch title="Notifications" value={notifications} onChange={setNotifications} />
      <Field.Checkbox
        title="Skills"
        options={[
          { label: 'React Native', value: 'rn' },
          { label: 'Swift', value: 'swift' },
        ]}
        value={skills}
        onChange={value => setSkills(value)}
        multiple
      />
      <Field.PasswordInput title="Payment PIN" placeholder="Enter" />
    </>
  );
}

export default Example;
```

## API

Each subcomponent keeps its original props while inheriting layout props from `Cell`. The table below lists the extra conveniences provided by Field wrappers. For full type definitions see `packages/ui/src/components/field/interface.ts`.

### Field.Text

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| placeholder | Placeholder when no value is provided | `string` | `-` |
| placeholderTextColor | Placeholder color | `ColorValue` | `text_input_placeholder_text_color` |
| value | Content shown on the right side | `string \| number \| React.ReactNode` | `-` |

### Field.Selector (extends `SelectorProps`)

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| placeholder | Placeholder text | `string` | `-` |
| placeholderTextColor | Placeholder color | `ColorValue` | `text_input_placeholder_text_color` |
| optionsLoading | Display a loading state for options | `boolean` | `false` |
| editable | Allow interaction | `boolean` | `true` |
| clearable | Show a clear icon (hides the arrow when enabled) | `boolean` | `false` |
| selectorTitle | Title displayed in the selector modal | `string` | `'请选择'` |
| renderResultText | Custom renderer for the selected value | `(value, options) => React.ReactNode` | `-` |
| isLink | Show the right arrow | `boolean` | `true` |

### Field.TextInput / Field.NumberInput / Field.PasswordInput

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| textInputStyle | Style override for the underlying input | `StyleProp<TextStyle>` | `-` |
| textInputBordered | Show an input border | `boolean` | `false` |
| textAlign | Text alignment | `'left' \| 'center' \| 'right'` | `'right'` |
| ...rest | Inherit all props from the respective input component | `-` | `-` |

### Field.Switch

Passes through every prop from `Switch` while keeping the `Cell` shell (`title`, `extra`, `divider`, etc.).

### Field.Date / Field.DateRange

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value / defaultValue | Controlled / initial value | `Date` / `DatePickerRangeValue` | `-` |
| onChange | Fired when the selection changes | `(value) => void` | `-` |
| mode | Picker mode | `DatePickerSingleMethodProps['mode']` | `'date'` |
| min / max | Min and max selectable values | `Date` | `-` |
| renderLabel | Customize wheel labels | `(type, option) => React.ReactNode` | `-` |
| datePickerTitle | Title displayed in the modal | `string` | `-` |
| clearable | Show a clear icon | `boolean` | `false` |
| editable | Allow editing | `boolean` | `true` |
| placeholder / placeholderTextColor | Placeholder text and color | `string` / `ColorValue` | `-` / `text_input_placeholder_text_color` |

### Field.Checkbox

Wraps `Checkbox.Group`—all group props (`options`, `multiple`, `deselect`, etc.) are supported, while `title`, `extra`, and layout props come from `Cell`.

### Field.ButtonOption

Wraps `Button.OptionGroup`, enabling segmented button selectors with `multiple`, `round`, `scrollable`, and other option-group props.

## Theme

Field relies on `Cell` and the underlying control themes; it does not add unique theme tokens of its own.
