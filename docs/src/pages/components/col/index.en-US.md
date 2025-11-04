# Col

`Col` represents a single column in the 24-column responsive grid. Use it together with `Row` to build layouts. More patterns live inside the [Grid](../grid/index.en-US.md) component page.

## Import

```tsx
import { Col, Row } from 'react-native-system-ui';
```

### Basic Grid

Each column occupies `span / 24` of the available width. `offset` reserves empty space to the left of the column.

```tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, Col, Row, Space } from 'react-native-system-ui';

const styles = StyleSheet.create({
  block: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  block1: { backgroundColor: '#5B8FF9' },
  block2: { backgroundColor: '#5AD8A6' },
  block3: { backgroundColor: '#5D7092' },
});

const renderText = (span, label, style) => (
  <Text key={label} style={[styles.block, style]}>
    {`span=${span} ${label}`}
  </Text>
);

function Example() {
  return (
    <Space>
      <Card title="Equal columns" square>
        <Row>
          {[styles.block1, styles.block2, styles.block3].map((style, index) => (
            <Col key={index} span={8}>
              {renderText(8, 'column', style)}
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="Gap and offset" square>
        <Row gap={12}>
          <Col span={12}>{renderText(12, 'content', styles.block1)}</Col>
          <Col span={8} offset={4}>
            {renderText(8, 'aside (offset=4)', styles.block2)}
          </Col>
        </Row>
      </Card>
    </Space>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Number of grid columns the element should occupy (0–24). | `number` | `-` |
| offset | How many grid columns to leave empty on the left. | `number` | `0` |
