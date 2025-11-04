# DatePicker

DatePicker displays a popup wheel picker for single dates or ranges. It reuses `DatePickerView` columns and `Popup` behaviors, and exposes imperative helpers.

## When To Use

- Select a calendar date, time, or custom Y/M/D/H columns within a modal.
- Collect date ranges with reset/clear actions.
- Invoke a picker programmatically and await the result.

## Import

```tsx
import { DatePicker } from 'react-native-system-ui';
```

## Examples

### Component Usage

```tsx
import React from 'react';
import { Button, DatePicker } from 'react-native-system-ui';

function Example() {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState();

  return (
    <>
      <Button title="Pick date" onPress={() => setVisible(true)} />
      <DatePicker.Component
        visible={visible}
        value={value}
        mode="Y-M-D"
        min={new Date(2020, 0, 1)}
        max={new Date(2030, 11, 31)}
        title="Select a date"
        onConfirm={date => {
          setValue(date);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </>
  );
}

export default Example;
```

### Imperative Range Picker

```tsx
import React from 'react';
import { Button, DatePicker } from 'react-native-system-ui';

function Example() {
  const openRange = () => {
    DatePicker.range({ mode: 'Y-M-D', title: 'Booking window' }).then(({ action, values }) => {
      if (action === 'confirm') {
        console.log('range', values);
      }
    });
  };

  return <Button title="Pick range" onPress={openRange} />;
}

export default Example;
```

## API

### DatePicker.Component

Inherits `Popup` props (except `visible`, `onPressOverlay`, `onRequestClose`) and `DatePickerView` props (except `value`, `onChange`, `loading`).

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value / defaultValue | Controlled or initial `Date` | `Date` | `-` |
| mode | Column combination (`Y`, `Y-M-D`, etc.) | `DatePickerColumnMode` | `'Y-M-D'` |
| min / max | Allowed date range | `Date` | `-` |
| title | Header title | `ReactNode` | `-` |
| confirmButtonText / cancelButtonText | Button labels | `string` | `'确认'` / `'取消'` |
| onConfirm / onCancel | Button callbacks | `(value: Date) => void` | `-` |
| onPressOverlay | Fired when tapping the overlay | `(value: Date) => void` | `-` |
| beforeClose | Guard close behavior | `(action: DatePickerAction, value: Date) => boolean \| Promise<boolean>` | `-` |
| theme | Override picker theme tokens | `Partial<DatePickerTheme>` | `-` |

### DatePicker.range(options)

Imperative helper that returns a promise resolving to `{ action, values }`.

| Prop | Description | Type |
| --- | --- | --- |
| mode | Column mode for start/end | `DatePickerColumnMode` |
| defaultValue / value | Initial or controlled range | `[Date | null, Date | null]` |
| placeholder | Placeholder text for start/end | `[string, string]` |
| confirmButtonText / resetButtonText / clearButtonText | Button labels | `string` |
| clearable | Show a clear button | `boolean` |
| onChange / onConfirm / onCancel / onClear | Event callbacks | `(values: DatePickerRangeValue) => void` |
| beforeClose | Guard closing (`cancel`, `confirm`, `overlay`, `clear`) | `(action: DatePickerRangeAction, values: DatePickerRangeValue) => boolean \| Promise<boolean>` |

### DatePicker.RangeView

Standalone view component for building custom layouts; accepts the same props as `DatePickerRangeViewProps`.
