# Tag

Tag highlights keywords, statuses, or removable filters with multiple sizes and visual styles.

## When To Use

- Emphasize an item’s state such as “New”, “Beta”, or “Hot”.
- Render removable filter chips or tag clouds.
- Pair with cards, list items, or charts to convey extra metadata.

## Import

```tsx
import { Tag } from 'react-native-system-ui';
```

## Examples

### Visual Variants

```tsx
import React from 'react';
import { Space, Tag } from 'react-native-system-ui';

function Example() {
  return (
    <Space direction="horizontal">
      <Tag>Primary</Tag>
      <Tag type="hazy">Hazy</Tag>
      <Tag type="ghost">Ghost</Tag>
    </Space>
  );
}

export default Example;
```

### Closable Tag

```tsx
import React from 'react';
import { Tag } from 'react-native-system-ui';

function Example() {
  const [visible, setVisible] = React.useState(true);

  return visible ? (
    <Tag closable onClose={() => setVisible(false)}>
      Removable
    </Tag>
  ) : null;
}

export default Example;
```

### Custom Color & Icon

```tsx
import React from 'react';
import { Tag } from 'react-native-system-ui';

function Example() {
  return (
    <Tag
      type="ghost"
      color="#165dff"
      textColor="#165dff"
      icon={<Tag.Icon name="star" />}
    >
      Featured
    </Tag>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| size | Tag size | `'l' \| 'm' \| 's'` | `'m'` |
| type | Visual style (`primary`, `hazy`, `ghost`) | `TagType` | `'primary'` |
| visible | Control visibility | `boolean` | `true` |
| closable | Show a close button | `boolean` | `false` |
| onClose | Fired when the close button is pressed | `() => void` | `-` |
| color | Custom background color | `ColorValue` | `-` |
| textColor | Custom text color | `ColorValue` | `-` |
| innerStyle | Wrapper style around the content | `StyleProp<ViewStyle>` | `-` |
| closeIcon | Custom close icon node | `React.ReactNode` | `-` |
| icon | Custom leading icon | `React.ReactNode` | `-` |
| hairline | Render a thin border | `boolean` | `false` |
| theme | Override tag theme tokens | `Partial<TagTheme>` | `-` |
| children | Tag content | `React.ReactNode` | `-` |

> Refer to `packages/ui/src/components/tag/index.md` for theme token details.
