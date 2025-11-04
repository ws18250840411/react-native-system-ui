# DatePickerView

DatePickerView is the pure scrolling wheel used by `DatePicker`. Embed it in custom layouts without the popup shell.

## When To Use

- Build bespoke picker layouts inside your own modals or forms.
- Display the wheel inline instead of in a popup.
- Combine with other inputs to create composite pickers.

## Import

```tsx
import { DatePickerView } from 'react-native-system-ui';
```

## Example

```tsx
import React from 'react';
import { Card, DatePickerView } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState(new Date());

  return (
    <Card title="Inline date picker">
      <DatePickerView
        value={value}
        onChange={setValue}
        mode="Y-M-D"
        min={new Date(2020, 0, 1)}
        max={new Date(2030, 11, 31)}
      />
    </Card>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value / defaultValue | Controlled or initial `Date` | `Date` | `-` |
| onChange | Fired when the value changes | `(value: Date) => void` | `-` |
| mode | Column combination (`Y`, `Y-M-D`, etc.) | `DatePickerColumnMode` | `'Y-m'` |
| min / max | Minimum and maximum selectable dates | `Date` | Ten years before/after today |
| renderLabel | Custom label renderer for each column | `(type: DatePickerColumnType, value: number) => string` | Formats with locale digits |
| loading | Show a loading state | `boolean` | `false` |
