# Collapse

Collapse hides or reveals content panels with either "cell" or "card" styling.

## When To Use

- Break long forms or FAQ lists into expandable sections.
- Provide card-style accordions with custom headers and icons.
- Render heavy content lazily to improve performance.

## Import

```tsx
import { Collapse } from 'react-native-system-ui';
```

## Examples

```tsx
import React from 'react';
import { Collapse } from 'react-native-system-ui';

function Example() {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <Collapse
      title="Shipping address"
      collapse={expanded}
      onCollapse={setExpanded}
      type="card"
    >
      <Collapse.Body>
        旧金山 · Market Street · 94103
      </Collapse.Body>
    </Collapse>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Header content | `ReactNode` | `-` |
| titleStyle / titleTextStyle / iconStyle | Header container, text, and icon styles | `StyleProp<ViewStyle>` / `StyleProp<TextStyle>` | `-` |
| iconColor / iconSize | Arrow color and size | `ColorValue` / `number` | Theme defaults |
| bodyStyle | Style for the content wrapper | `StyleProp<ViewStyle>` | `-` |
| renderTitle / renderTitleExtra | Custom header renderers | `(collapsed: boolean) => ReactNode` | `-` |
| renderBody | Custom body renderer (overrides children) | `() => ReactNode` | `-` |
| collapse | Controlled collapsed state | `boolean` | `-` |
| defaultCollapse | Initial collapsed state | `boolean` | `false` |
| onCollapse | Fired when the state changes | `(collapse: boolean) => void` | `-` |
| type | Visual style: cell or card | `'cell' \| 'card'` | `'cell'` |
| onAnimationEnd | Called after the expand/collapse animation | `(collapse: boolean) => void` | `-` |
| bodyPadding | Toggle inner padding | `boolean` | `true` |
| headerDivider / bodyDivider | Show dividers for header/body | `boolean` | `true` / type-dependent |
| lazyRender | Render children only when expanded | `boolean` | `true` |
| square | Remove card rounding | `boolean` | `true` (card only) |
| theme | Override collapse tokens | `Partial<CollapseTheme>` | `-` |
