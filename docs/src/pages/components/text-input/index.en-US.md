# TextInput

TextInput extends the native React Native input with clear buttons, prefixes/suffixes, addons, formatting, and textarea support.

## When To Use

- Reproduce Ant Design–style inputs on mobile.
- Add prefixes, suffixes, addons, borders, or clear buttons without writing extra wrappers.
- Format values (currency, masking) or display word counts for multi-line inputs.

## Import

```tsx
import { TextInput } from 'react-native-system-ui';
```

## Examples

### Basic With Clear Button

```tsx
import React from 'react';
import { TextInput } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState('');

  return (
    <TextInput
      placeholder="Enter nickname"
      value={value}
      onChangeText={setValue}
      clearable
    />
  );
}

export default Example;
```

### Prefix / Suffix & Addons

```tsx
import React from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native-system-ui';

function Example() {
  return (
    <TextInput
      bordered
      prefix={<Text>+86</Text>}
      suffix={<Text>@mail.com</Text>}
      addonBefore={<Text>Account</Text>}
      addonAfter={<Text>Required</Text>}
      placeholder="Phone number"
    />
  );
}

export default Example;
```

### Textarea With Word Count

```tsx
import React from 'react';
import { TextInput } from 'react-native-system-ui';

function Example() {
  return (
    <TextInput
      type="textarea"
      rows={3}
      showWordLimit
      maxLength={120}
      placeholder="Leave a note"
    />
  );
}

export default Example;
```

## API

In addition to native `TextInput` props, the component exposes the following:

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Input shape (`text` or `textarea`) | `'text' \| 'textarea'` | `'text'` |
| rows | Minimum rows when `type="textarea"` | `number` | `2` |
| clearable | Show a clear icon | `boolean` | `false` |
| clearTrigger | When to show the clear icon | `'always' \| 'focus'` | `'focus'` |
| formatter | Format value before rendering | `(value: string) => string` | `-` |
| formatTrigger | When the formatter runs | `'onEndEditing' \| 'onChangeText'` | `'onChangeText'` |
| showWordLimit | Display a word counter (works with textarea + `maxLength`) | `boolean` | `false` |
| bordered | Render a border around the input | `boolean` | `false` |
| addonBefore / addonAfter | Addons outside the border | `React.ReactNode` | `-` |
| addonGroupStyle / addonBeforeTextStyle / addonAfterTextStyle | Styles for the addon wrapper/text | `StyleProp<ViewStyle>` / `StyleProp<TextStyle>` | `-` |
| prefix / suffix | Nodes rendered inside the border | `React.ReactNode` | `-` |
| prefixTextStyle / suffixTextStyle | Styles for prefix/suffix text | `StyleProp<TextStyle>` | `-` |
| fixGroupStyle | Wrapper style for prefix/suffix | `StyleProp<ViewStyle>` | `-` |
| inputWidth | Explicit width for the input area | `number` | `-` |
| size | Preset size | `'xl' \| 'l' \| 'm' \| 's'` | `'m'` |
| onChange | Value-change callback that receives the string directly | `(value: string) => void` | `-` |
| textareaMaxHeight | Maximum height for textarea mode | `number` | `-` |
| theme | Override text-input theme tokens | `Partial<TextInputTheme>` | `-` |

### Event Notes

- `onChangeText(value)` and `onChange(value)` both receive the current string.
- `onFocus`, `onBlur`, and `onEndEditing` surface the value via `event.nativeEvent.text`.

> When nested in a `ScrollView`, set `keyboardShouldPersistTaps="handled"` to ensure the clear button works while the keyboard is visible.