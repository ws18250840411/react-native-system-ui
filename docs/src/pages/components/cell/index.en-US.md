# Cell

Cells present a single row of information inside forms or settings views. Combine them with `Cell.Group` to build structured lists.

## Import

```tsx
import { Cell } from 'react-native-system-ui';
```

### Basic List

Each cell can display a title, value, optional description, and trailing arrow.

```tsx
import React from 'react';
import { Cell } from 'react-native-system-ui';

function Example() {
  return (
    <Cell.Group title="Account">
      <Cell title="Name" value="Ada Lovelace" />
      <Cell title="Email" value="ada@example.com" extra="Primary contact" />
      <Cell title="Security" value="Manage" isLink onPress={() => console.log('security')} />
    </Cell.Group>
  );
}

export default Example;
```

### Vertical Layout & Required State

Toggle `vertical` to stack content and `required` to show the asterisk. `valueExtra` is useful for hints or buttons.

```tsx
import React from 'react';
import { Button, Cell } from 'react-native-system-ui';

function Example() {
  return (
    <Cell.Group title="Billing details">
      <Cell
        title="Address"
        required
        vertical
        value="742 Evergreen Terrace, Springfield"
        valueExtra={<Button title="Edit" variant="ghost" onPress={() => {}} />}
      />
      <Cell
        title="Invoice notes"
        vertical
        divider={false}
        contentStyle={{ marginTop: 8 }}
        value="Invoices emailed every first Monday."
        extra="Only visible to you."
      />
    </Cell.Group>
  );
}

export default Example;
```

## API

### Cell Props

`Cell` extends the default React Native `Pressable` props.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Main label on the left. | `ReactNode` | `-` |
| titleExtra | Custom content placed before the title (icons, badges). | `ReactNode` | `-` |
| titleStyle | Style applied to the title container. | `StyleProp<ViewStyle>` | `-` |
| titleTextStyle | Style applied to text titles. | `StyleProp<TextStyle>` | `-` |
| titleTextNumberOfLines | Max number of lines for the title text. | `number` | `-` |
| value | Content aligned on the right (or below when `vertical`). | `ReactNode` | `-` |
| valueStyle | Style applied to the value container. | `StyleProp<ViewStyle>` | `-` |
| valueTextStyle | Style applied to text values. | `StyleProp<TextStyle>` | `-` |
| valueTextNumberOfLines | Max number of lines for the value text. | `number` | `-` |
| valueExtra | Extra node rendered after the value (e.g., switches, buttons). | `ReactNode` | `-` |
| extra | Description shown below the main row. | `ReactNode` | `-` |
| extraTextStyle | Style applied to description text. | `StyleProp<TextStyle>` | `-` |
| innerStyle | Style override for the root layout inside the pressable. | `StyleProp<ViewStyle>` | `-` |
| contentStyle | Style for the container that wraps `value`, `valueExtra`, and link arrow when `vertical` is `true`. | `StyleProp<ViewStyle>` | `-` |
| divider | Show the bottom divider line. | `boolean` | `true` |
| dividerLeftGap | Left margin for the divider. | `number` | `theme.cell_group_title_padding_horizontal` |
| dividerRightGap | Right margin for the divider. | `number` | `theme.cell_group_title_padding_horizontal` |
| isLink | Display a trailing arrow. | `boolean` | `false` |
| arrowDirection | Direction of the trailing arrow. | `'left' \| 'up' \| 'right' \| 'down'` | `'right'` |
| onPressLink | Callback when the trailing arrow is pressed. | `TouchableOpacityProps['onPress']` | `-` |
| center | Center the content vertically. | `boolean` | `false` |
| required | Display a leading asterisk. | `boolean` | `false` |
| vertical | Stack value and description beneath the title. | `boolean` | `false` |
| textAlign | Alignment for textual values when not `vertical`. | `'right' \| 'center' \| 'left'` | `'right'` |
| onPressDebounceWait | Debounce time in milliseconds before firing the `onPress` callback again. | `number` | `0` |
| underlayColor | Background color when pressed; defaults to the themed active color. | `ColorValue` | `theme.cell_active_color` |
| theme | Override cell theme tokens. | `Partial<CellTheme>` | `-` |

### Cell.Group Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Group header title. | `ReactNode` | `-` |
| extra | Content rendered on the right side of the header. | `ReactNode` | `-` |
| style | Style override for the outer container. | `StyleProp<ViewStyle>` | `-` |
| titleTextStyle | Style override for the header title text. | `StyleProp<TextStyle>` | `-` |
| bodyStyle | Style override for the body wrapper. | `StyleProp<ViewStyle>` | `-` |
| bodyTopDivider | Show a divider above the group body. | `boolean` | `false` |
| bodyBottomDivider | Show a divider below the group body. | `boolean` | `false` |
| onPressTitle | Callback when the header (title + extra) is pressed. | `TouchableWithoutFeedbackProps['onPress']` | `-` |
| onPressTitleText | Callback when the header title text is pressed. | `TextProps['onPress']` | `-` |
| theme | Override cell theme tokens. | `Partial<CellTheme>` | `-` |
