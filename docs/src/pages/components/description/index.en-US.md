# Description

Description displays read-only fields in a two-column layout, ideal for detail pages.

## When To Use

- Present multiple label/value pairs in a compact block.
- Render values that might require custom formatting (dates, ranges, currency).
- Provide consistent empty states and responsive layouts.

## Import

```tsx
import { Description } from 'react-native-system-ui';
```

## Examples

```tsx
import React from 'react';
import { Card, Description } from 'react-native-system-ui';

function Example() {
  return (
    <Card title="Profile">
      <Description.Group size="m" colon>
        <Description label="Name" text="Ada Lovelace" />
        <Description label="Role" text="Mathematician" />
        <Description label="Email" text="ada@example.com" />
      </Description.Group>
    </Card>
  );
}

export default Example;
```

## API

### Description.Group

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| colon | Show a colon between label and text | `boolean` | `true` |
| contentStyle / contentTextStyle | Styles for the value wrapper/text | `StyleProp<ViewStyle>` / `StyleProp<TextStyle>` | `-` |
| labelStyle / labelTextStyle | Styles for the label wrapper/text | `StyleProp<ViewStyle>` / `StyleProp<TextStyle>` | `-` |
| labelWidth | Fixed width for the label | `number` | `-` |
| layout | Horizontal or stacked layout | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | Typography size preset | `'s' \| 'm' \| 'l'` | `'m'` |
| numberOfLines | Truncate value text after N lines | `number` | `-` |
| justify / align | Flex alignment for the row | `FlexStyle['justifyContent']` / `FlexStyle['alignItems']` | `-` |
| empty | Placeholder for empty values | `React.ReactNode` | `'--'` |
| showEmpty | Force rendering the placeholder even when `children` exist | `boolean` | `false` |

### Description

Inherits `DescriptionGroup` props.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| label | Label text | `string` | `-` |
| text | Value text (fallback when no children) | `string` | `-` |
| hidden | Hide the row entirely | `boolean` | `false` |
| bold | Render the value in bold | `boolean` | `false` |
| color | Override value color | `ColorValue` | `-` |
| addonBefore / addonAfter | Nodes rendered before/after the value | `React.ReactNode` | `-` |
| renderLabel | Custom label renderer | `(colon: string) => React.ReactNode` | `-` |
| render | Custom row renderer | `(content, addonBefore, addonAfter) => React.ReactNode` | `-` |
| empty / showEmpty | Row-level placeholders | `React.ReactNode` / `boolean` | `-` / `false` |

### Description.Thousand

Formats numbers with thousand separators.

| Prop | Description | Type |
| --- | --- | --- |
| text | Number to display | `number` |

### Description.Date / Description.DateRange

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| text | Date or `[start, end]` | `Date` / `[Date, Date]` | `-` |
| mode | Formatting mode (for `Date`) | `DatePickerColumnMode` | `'Y-m'` |
| split | Separator between start/end | `string` | `'至'` |
