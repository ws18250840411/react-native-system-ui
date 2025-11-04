# NavBar

NavBar provides a customizable top-app bar with a title, back arrow, and optional left/right actions.

## When To Use

- Create in-app navigation bars that mimic native headers.
- Display contextual actions (share, edit, support) without leaving the screen.
- Apply brand styling on top of a consistent layout foundation.

## Import

```tsx
import { NavBar } from 'react-native-system-ui';
```

## Examples

### Basic Navigation

```tsx
import React from 'react';
import { NavBar } from 'react-native-system-ui';

function Example() {
  return (
    <NavBar title="Order Details" onPressBackArrow={() => console.log('back')} />
  );
}

export default Example;
```

### Custom Actions

```tsx
import React from 'react';
import { Button, NavBar, Space } from 'react-native-system-ui';

function Example() {
  return (
    <NavBar
      title="Product"
      leftExtra={<Button title="Support" variant="ghost" onPress={() => {}} />}
      rightExtra={
        <Space direction="horizontal">
          <Button title="Favorite" size="sm" variant="ghost" />
          <Button title="Share" size="sm" variant="ghost" />
        </Space>
      }
    />
  );
}

export default Example;
```

### Dark Theme

```tsx
import React from 'react';
import { NavBar } from 'react-native-system-ui';

function Example() {
  return (
    <NavBar
      title="Night Mode"
      style={{ backgroundColor: '#111' }}
      titleTextStyle={{ color: '#fff' }}
      backArrowColor="#fff"
      divider={false}
    />
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| style | Wrapper style | `StyleProp<ViewStyle>` | `-` |
| leftStyle / rightStyle | Style overrides for left/right slots | `StyleProp<ViewStyle>` | `-` |
| leftExtra / rightExtra | Custom nodes rendered on either side | `JSX.Element` | `-` |
| title | Title text or node | `React.ReactNode` | `-` |
| titleTextStyle | Title text style | `StyleProp<TextStyle>` | `-` |
| showBackArrow | Show the default back arrow | `boolean` | `true` |
| backArrowColor | Arrow color | `ColorValue` | `nav_bar_icon_color` |
| backArrowSize | Arrow size | `number` | `nav_bar_arrow_size` |
| divider | Display a bottom divider | `boolean` | `true` |
| onPressBackArrow | Tap handler for the back arrow | `() => void` | `-` |
| theme | Override NavBar theme tokens | `Partial<NavBarTheme>` | `-` |

> Theme tokens are listed in `packages/ui/src/components/nav-bar/index.md`.
