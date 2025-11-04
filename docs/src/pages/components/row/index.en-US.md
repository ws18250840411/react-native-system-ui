# Row

Row is the horizontal container in the grid system. It arranges `Col` children along the main axis and provides gap and alignment controls. See the [Grid](../grid/index.en-US.md) page for end-to-end patterns.

## Import

```tsx
import { Col, Row } from 'react-native-system-ui';
```

## Examples

### Alignment Modes

Use `justify` for horizontal alignment and `align` for the cross axis.

```tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Col, Row, Space } from 'react-native-system-ui';

const styles = StyleSheet.create({
  row: { marginBottom: 12 },
  cell: {
    flex: 1,
    borderRadius: 4,
    paddingVertical: 12,
    color: '#fff',
    textAlign: 'center',
  },
  cell1: { backgroundColor: '#1677ff' },
  cell2: { backgroundColor: '#52c41a' },
  cell3: { backgroundColor: '#722ed1' },
});

const renderRow = (
  title: string,
  rowProps: React.ComponentProps<typeof Row>,
  labels: string[],
) => (
  <View key={title} style={styles.row}>
    <Text style={{ marginBottom: 6 }}>{title}</Text>
    <Row {...rowProps}>
      {labels.map((label, index) => (
        <Col key={label} span={8}>
          <Text
            style={[
              styles.cell,
              [styles.cell1, styles.cell2, styles.cell3][index % 3],
            ]}>
            {label}
          </Text>
        </Col>
      ))}
    </Row>
  </View>
);

function Example() {
  return (
    <Space>
      <Card title="Main axis" square>
        {[
          { title: 'justify="flex-start"', props: { justify: 'flex-start' }, labels: ['Start', 'Start', 'Start'] },
          { title: 'justify="center"', props: { justify: 'center' }, labels: ['Center', 'Center'] },
          { title: 'justify="space-between"', props: { justify: 'space-between' }, labels: ['Between', 'Between'] },
        ].map(item => renderRow(item.title, item.props, item.labels))}
      </Card>

      <Card title="Cross axis" square>
        {[
          {
            title: 'align="center"',
            props: { align: 'center' },
            labels: ['Align center', 'Align center'],
          },
          {
            title: 'align="flex-end"',
            props: { align: 'flex-end' },
            labels: ['Bottom', 'Bottom'],
          },
        ].map(item => renderRow(item.title, item.props, item.labels))}
      </Card>
    </Space>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| gap | Spacing between columns (pixels). | `number` | `0` |
| justify | Flexbox justification along the main axis. | `FlexStyle['justifyContent']` | `-` |
| align | Flexbox alignment along the cross axis. | `FlexStyle['alignItems']` | `-` |
