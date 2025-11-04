# Grid

Grid is a 24-column layout system implemented with `Row` and `Col`. Each row splits horizontal space into equal parts so you can build responsive dashboards and forms.

## Overview

- Wrap columns in `Row`. Rows only accept `Col` children.
- Set `span` on a column to occupy `span / 24` of the row width.
- Use `offset` to push a column to the right, and `gap` to add gutter spacing.
- Alignment props mirror native flexbox: `justify` for the main axis, `align` for the cross axis.

## Import

```tsx
import { Col, Row } from 'react-native-system-ui';
```

## Examples

### Combined Usage

Demonstrates spans, gaps, offsets, and alignment modes.

```tsx
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Col, Row, Space } from 'react-native-system-ui';

const styles = StyleSheet.create({
  card: { backgroundColor: '#1677ff', color: '#fff', textAlign: 'center', paddingVertical: 16 },
  card2: { backgroundColor: '#52c41a', color: '#fff', textAlign: 'center', paddingVertical: 16 },
  card3: { backgroundColor: '#722ed1', color: '#fff', textAlign: 'center', paddingVertical: 16 },
});

const renderCol = (span, text, style) => (
  <Col key={`${text}-${span}`} span={span}>
    <Text style={style}>{text}</Text>
  </Col>
);

function Example() {
  return (
    <ScrollView>
      <Space head tail>
        <Card title="Basic spans" square>
          <Row>
            {[styles.card, styles.card2, styles.card3].map((style, index) =>
              renderCol(8, `Col span ${8}`, style),
            )}
          </Row>
        </Card>

        <Card title="Gutter spacing" square>
          <Row gap={12}>
            {[styles.card, styles.card2, styles.card3].map((style, index) =>
              renderCol(8, `Col span ${8}`, style),
            )}
          </Row>
        </Card>

        <Card title="Offset and combinations" square>
          <Row>
            <Col span={18} offset={2}>
              <Text style={styles.card}>span=18 offset=2</Text>
            </Col>
            {renderCol(4, 'Col span 4', styles.card2)}
          </Row>
        </Card>

        <Card title="Alignment" square>
          <Text>justify="center"</Text>
          <Row justify="center">
            {[
              { span: 8, text: 'Col span 8', style: styles.card },
              { span: 8, text: 'Col span 8', style: styles.card2 },
            ].map(item => renderCol(item.span, item.text, item.style))}
          </Row>

          <Text style={{ marginTop: 12 }}>justify="space-between"</Text>
          <Row justify="space-between">
            {[
              { span: 8, text: 'Col span 8', style: styles.card },
              { span: 8, text: 'Col span 8', style: styles.card3 },
            ].map(item => renderCol(item.span, item.text, item.style))}
          </Row>

          <Text style={{ marginTop: 12 }}>align="center"</Text>
          <Row align="center">
            <Col span={8}>
              <Text style={[styles.card, { paddingVertical: 32 }]}>
                {`Col span 8\nmultiple lines`}
              </Text>
            </Col>
            {renderCol(8, 'Col span 8', styles.card2)}
          </Row>
        </Card>
      </Space>
    </ScrollView>
  );
}

export default Example;
```

## API

### Row Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| gap | Horizontal spacing between columns (in pixels). | `number` | `0` |
| justify | Flexbox justification along the main axis. | `FlexStyle['justifyContent']` | `-` |
| align | Flexbox alignment along the cross axis. | `FlexStyle['alignItems']` | `-` |

### Col Props

See also the dedicated [Col documentation](../col/index.en-US.md).

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Number of grid columns to take (1–24). | `number` | `-` |
| offset | Number of empty columns placed before the element. | `number` | `0` |
