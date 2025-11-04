# Flex

Flex is a convenience wrapper around React Native flexbox, providing semantic props for direction and alignment plus a paired `Flex.Item`.

## Import

```tsx
import { Flex } from 'react-native-system-ui';
```

### Layout Patterns

Switch the direction, alignment, and wrapping behaviour on demand.

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Flex, Space } from 'react-native-system-ui';

const Dot = ({ size = 20 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#1677ff',
      margin: 4,
    }}
  />
);

function Example() {
  return (
    <Space head tail>
      <Card title="Direction" square>
        <Text>direction="row"</Text>
        <Flex>
          <Flex.Item style={{ paddingRight: 8 }}>
            <Button title="Primary" size="sm" />
          </Flex.Item>
          <Flex.Item style={{ paddingRight: 8 }}>
            <Button title="Secondary" size="sm" variant="secondary" />
          </Flex.Item>
          <Flex.Item>
            <Button title="Ghost" size="sm" variant="ghost" />
          </Flex.Item>
        </Flex>

        <Text style={{ marginTop: 12 }}>direction="column"</Text>
        <Flex direction="column" align="stretch">
          <Button title="Upload" size="sm" />
          <Button title="Download" size="sm" variant="secondary" style={{ marginTop: 8 }} />
        </Flex>
      </Card>

      <Card title="Justify & align" square>
        <Text>justify="center"</Text>
        <Flex justify="center">
          <Dot />
          <Dot />
          <Dot />
        </Flex>

        <Text style={{ marginTop: 12 }}>justify="between" align="center"</Text>
        <Flex justify="between" align="center">
          <Dot />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Dot />
            <Dot size={36} />
          </View>
        </Flex>
      </Card>
    </Space>
  );
}

export default Example;
```

## API

### Flex Props

`Flex` extends the default `TouchableWithoutFeedbackProps`, allowing press handlers.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Flex direction of the main axis. | `FlexStyle['flexDirection']` | `'row'` |
| wrap | Flex wrapping behaviour. | `FlexStyle['flexWrap']` | `'nowrap'` |
| justify | Distribution along the main axis. | `'start' \| 'end' \| 'center' \| 'between' \| 'around'` | `'start'` |
| align | Alignment along the cross axis. | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | `'center'` |

### Flex.Item Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| flex | Flex grow/shrink value applied to the item. | `FlexStyle['flex']` | `1` |
