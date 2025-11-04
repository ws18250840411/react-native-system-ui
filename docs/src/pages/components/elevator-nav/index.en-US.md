# ElevatorNav

ElevatorNav provides an anchor-based navigation bar that appears after scrolling past a threshold.

## When To Use

- Long single-page documents that need quick navigation between sections.
- To display an anchor list once users have scrolled deeper into the content.
- When you want to reuse the same anchor structure both in native scroll views and custom containers.

## Import

```tsx
import { ElevatorNav } from 'react-native-system-ui';
```

## Example

```tsx
import React from 'react';
import { ElevatorNav, Card } from 'react-native-system-ui';

function Example() {
  const sections = [
    { key: 'intro', title: 'Introduction' },
    { key: 'usage', title: 'Usage' },
    { key: 'faq', title: 'FAQ' },
  ];

  return (
    <ElevatorNav triggerOffset={160}>
      {sections.map(section => (
        <ElevatorNav.Anchor key={section.key} title={section.title}>
          <Card title={section.title} style={{ marginBottom: 24 }}>
            内容...
          </Card>
        </ElevatorNav.Anchor>
      ))}
    </ElevatorNav>
  );
}

export default Example;
```

## API

### ElevatorNav

Inherits `ScrollViewProps`.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| triggerOffset | Offset (in px) after which the floating tab bar appears | `number` | `100` |
| tabBarHeight | Height of the floating tab bar | `number` | `40` |
| scrollComponent | Custom scroll container implementation | `React.FC<ScrollViewProps & { ref: React.MutableRefObject<ScrollView> }>` | `-` |

### ElevatorNav.Anchor

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Unique anchor title used for navigation | `string` | `-` |
| children | Section content | `React.ReactNode` | `-` |
