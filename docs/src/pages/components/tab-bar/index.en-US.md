# TabBar

TabBar provides a bottom or top navigation rail with badges, icons, indicators, and scrollable layouts.

## When To Use

- Build primary bottom navigation across app sections.
- Create a horizontally scrollable tab list with an indicator and badges.
- Pair with `Tabs` or `BottomBar` for hybrid layouts.

## Import

```tsx
import { TabBar } from 'react-native-system-ui';
```

## Examples

### Basic Navigation

```tsx
import React from 'react';
import { TabBar } from 'react-native-system-ui';

function Example() {
  const options = [
    { label: 'Home', value: 'home' },
    { label: 'Inbox', value: 'inbox', badge: 2 },
    { label: 'Profile', value: 'profile' },
  ];
  const [value, setValue] = React.useState('home');

  return <TabBar options={options} value={value} onChange={setValue} />;
}

export default Example;
```

### Indicator & Scroll Alignments

```tsx
import React from 'react';
import { TabBar } from 'react-native-system-ui';

function Example() {
  const options = Array.from({ length: 8 }).map((_, index) => ({
    label: `Tab ${index + 1}`,
    value: index,
  }));
  const [value, setValue] = React.useState(0);

  return (
    <TabBar
      options={options}
      value={value}
      onChange={setValue}
      indicator
      tabAlign="left"
      labelBulge
    />
  );
}

export default Example;
```

## API

Inherits `BottomBar` props such as `safeAreaInsetBottom`, `divider`, and keyboard handling.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| options | Tab definitions (keep references stable) | `TabItem<T>[]` | `-` |
| value | Controlled value | `T` | `-` |
| defaultValue | Initial value | `T` | `-` |
| onChange | Fired when a tab is selected | `(value: T) => void` | `-` |
| textColor / iconColor | Default text / icon color | `ColorValue` | `tab_bar_text_color` / `tab_bar_icon_color` |
| activeTextColor / activeIconColor | Active text / icon color | `ColorValue` | `tab_bar_active_text_color` / `tab_bar_active_icon_color` |
| indicator | Enable underline indicator | `boolean` | `false` |
| indicatorWidth | Indicator width (`0` = full width, undefined = match label) | `number` | `-` |
| indicatorHeight | Indicator height (`0` hides it) | `number` | `3` |
| indicatorColor | Indicator color | `ColorValue` | `tab_bar_indicator_color` |
| tabAlign | Layout mode; `left` enables scrolling | `'left' \| 'center'` | `'center'` |
| labelBulge | Emphasize the active label (`true` = 1.2x, or pass a number) | `boolean \| number` | `1.2` |
| theme | Override tab-bar theme tokens | `Partial<TabBarTheme>` | `-` |

> Theme token details live in `packages/ui/src/components/tab-bar/index.md`.
