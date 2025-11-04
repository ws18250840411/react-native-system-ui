# Search

Search combines an input, search icon, optional back button, and action button for quickly building search headers.

## When To Use

- Provide keyword search at the top of a list or home screen.
- Offer a built-in cancel/back affordance without composing your own layout.
- Trigger `onSearch` automatically as people type or customize prefixes/suffixes.

## Import

```tsx
import { Search } from 'react-native-system-ui';
```

## Examples

### Basic Search

```tsx
import React from 'react';
import { Search } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState('');

  return (
    <Search
      value={value}
      placeholder="Search destinations"
      onChangeText={setValue}
      onSearch={keyword => console.log('search', keyword)}
    />
  );
}

export default Example;
```

### Auto Search & Back Button

```tsx
import React from 'react';
import { Search, Space } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState('');

  return (
    <Space>
      <Search
        value={value}
        placeholder="Auto search"
        autoSearch
        onChangeText={setValue}
        onSearch={keyword => console.log('auto search', keyword)}
      />
      <Search
        placeholder="With back"
        showBack
        onPressBack={() => console.log('back')}
      />
    </Space>
  );
}

export default Example;
```

## API

Inherits `TextInput` props such as `value`, `defaultValue`, `placeholder`, `placeholderTextColor`, `autoFocus`, and `onChangeText`.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| iconSize | Icon size in pixels | `number` | `20` |
| iconColor | Icon color | `ColorValue` | `text_input_placeholder_text_color` |
| onSearch | Fired when the search button is pressed or auto search triggers | `(value: string) => void` | `-` |
| showBack | Display a back arrow on the left | `boolean` | `false` |
| onPressBack | Handler for the back arrow | `() => void` | `-` |
| autoSearch | Call `onSearch` whenever the value changes | `boolean` | `false` |
| onSearchDebounceWait | Debounce time (ms) for auto search | `number` | `300` |
| searchText | Label of the search button | `string` | `'搜索'` |
| extra | Custom node rendered to the right of the search button | `React.ReactNode` | `-` |
| prefix | Custom prefix rendered inside the input | `React.ReactNode` | `-` |
| suffix | Custom suffix rendered inside the input | `React.ReactNode` | `-` |
| showSearchButton | Hide or show the search button | `boolean` | `true` |
| theme | Override search theme tokens | `Partial<SearchTheme>` | `-` |

> When `Search` lives inside a `ScrollView`, add `keyboardShouldPersistTaps="handled"` so the clear button works while the keyboard is visible.
