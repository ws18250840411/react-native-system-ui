# Card

Card is a flexible container for grouping related content, supporting headers, footers, actions, and skeleton loading states.

## Import

```tsx
import { Card } from 'react-native-system-ui';
```

### Classic Card

Combine header extras and footer text. Use `titleLeftExtra` for badges or meta data.

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Button, Card, Space, Tag } from 'react-native-system-ui';

const paragraphs = rows =>
  rows.map((item, index) => (
    <Text key={`${item}-${index}`} style={{ lineHeight: 22 }}>
      {item}
    </Text>
  ));

function Example() {
  return (
    <Space>
      <Card title="Default card">{paragraphs(['Card content', 'Card content'])}</Card>

      <Card
        title="Team activity"
        titleLeftExtra={<Tag>Beta</Tag>}
        extra={<Button title="Manage" variant="ghost" onPress={() => {}} />}
        footer="Last updated 5 minutes ago">
        {paragraphs(['Invite new members', 'Track invitations and approvals.'])}
      </Card>

      <Card
        size="s"
        title="Compact card"
        extra={<Button title="More" variant="secondary" onPress={() => {}} />}>
        {paragraphs(['Use the small size in dense lists.'])}
      </Card>
    </Space>
  );
}

export default Example;
```

### Layout And States

Disable padding or show a loading skeleton while data loads.

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Card, Space } from 'react-native-system-ui';

const Content = () => (
  <>
    <Text>Payment summary</Text>
    <Text>Total: $98.00</Text>
  </>
);

function Example() {
  return (
    <Space>
      <Card loading title="Fetching data" />

      <Card title="No padding" bodyPadding={false}>
        <Content />
      </Card>

      <Card title="Custom padding" bodyPadding={{ top: true, bottom: 24 }}>
        <Content />
      </Card>

      <Card title="Square corners" square>
        <Content />
      </Card>
    </Space>
  );
}

export default Example;
```

## API

`Card` extends the default React Native `View` props. `Card.Body` is exposed for advanced composition.

### Card Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Header title content. | `React.ReactNode` | `-` |
| titleLeftExtra | Content rendered to the left of the title (tags, icons, etc.). | `React.ReactNode` | `-` |
| extra | Content rendered on the right side of the header. | `React.ReactNode` | `-` |
| footer | Footer content displayed below the divider. | `React.ReactNode` | `-` |
| headerStyle | Style override for the header container. | `StyleProp<ViewStyle>` | `-` |
| titleStyle | Style override for the title wrapper. | `StyleProp<ViewStyle>` | `-` |
| titleTextStyle | Style override for plain-text titles. | `StyleProp<TextStyle>` | `-` |
| bodyStyle | Style override for the content area. | `StyleProp<ViewStyle>` | `-` |
| footerStyle | Style override for the footer container. | `StyleProp<ViewStyle>` | `-` |
| footerTextStyle | Style override for plain-text footers. | `StyleProp<TextStyle>` | `-` |
| size | Size preset for spacing and typography. | `'m' \| 's'` | `'m'` |
| square | Remove rounded corners. | `boolean` | `false` |
| loading | Display skeleton placeholders instead of children. | `boolean` | `false` |
| headerDivider | Show a divider below the header. | `boolean` | `true` |
| footerDivider | Show a divider above the footer. | `boolean` | `true` |
| bodyPadding | Toggle or customize body padding. Numbers set uniform padding; pass an object for per-side control. | `boolean \| number \| { left?: boolean \| number; right?: boolean \| number; top?: boolean \| number; bottom?: boolean \| number }` | `true` |
| onPressHeader | Called when the header (title, left extra, extra) is pressed. | `TouchableWithoutFeedbackProps['onPress']` | `-` |
| onLayoutHeader | Layout callback for the header. | `ViewProps['onLayout']` | `-` |
| onLayoutBody | Layout callback for the body. | `ViewProps['onLayout']` | `-` |
| theme | Override card theme tokens. | `Partial<CardTheme>` | `-` |

### Card.Body Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| padding | Inherit the same padding API exposed on `Card`. | `CardProps['bodyPadding']` | `true` |
