# Row 行

> 栅格系统中的行容器，用于承载多个 `Col`。

## 何时使用

- 需要在水平方向创建栅格布局时。
- 通过 `justify`、`align` 设置主轴与交叉轴对齐。
- 配合 `gap` 控制列与列之间的间距。

更多完整示例参考 [Grid 栅格](../grid/index.zh-CN.md)。

## 代码演示

### 排列与对齐

`Row` 将子元素沿主轴排列，`justify` 控制水平方向，`align` 控制垂直方向。

```tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Col, Row, Space } from 'react-native-system-ui';

const Example = () => {
  const styles = StyleSheet.create({
    row: {
      marginBottom: 12,
    },
    cell: {
      flex: 1,
      borderRadius: 4,
      paddingVertical: 10,
      textAlign: 'center',
      color: '#fff',
    },
    cell1: { backgroundColor: '#5B8FF9' },
    cell2: { backgroundColor: '#61DDAA' },
    cell3: { backgroundColor: '#65789B' },
  });

  const renderRow = (title, rowProps, texts) => (
    <View key={title} style={styles.row}>
      <Text style={{ marginBottom: 6 }}>{title}</Text>
      <Row {...rowProps}>
        {texts.map((text, index) => (
          <Col key={text} span={8}>
            <Text
              style={[
                styles.cell,
                index === 0 ? styles.cell1 : index === 1 ? styles.cell2 : styles.cell3,
              ]}>
              {text}
            </Text>
          </Col>
        ))}
      </Row>
    </View>
  );

  return (
    <Space>
      <Card title="主轴对齐" square>
        {[
          {
            title: 'justify="flex-start"',
            props: { justify: 'flex-start' },
            texts: ['左侧', '左侧', '左侧'],
          },
          {
            title: 'justify="center"',
            props: { justify: 'center' },
            texts: ['居中', '居中'],
          },
          {
            title: 'justify="space-between"',
            props: { justify: 'space-between' },
            texts: ['两端', '两端'],
          },
        ].map(item => renderRow(item.title, item.props, item.texts))}
      </Card>

      <Card title="交叉轴对齐" square>
        <Row align="center" style={{ marginBottom: 12 }}>
          <Col span={8}>
            <Text style={[styles.cell, styles.cell1]}>{`align="center"\nspan=8`}</Text>
          </Col>
          <Col span={8}>
            <Text style={[styles.cell, styles.cell2]}>span=8</Text>
          </Col>
        </Row>

        <Row justify="flex-end" align="flex-end">
          <Col span={8}>
            <Text style={[styles.cell, styles.cell3]}>{`align="flex-end"\nspan=8`}</Text>
          </Col>
          <Col span={8}>
            <Text style={[styles.cell, styles.cell1]}>{`span=8\nspan=8`}</Text>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default Example;
```

## API

| 属性名  | 描述             | 类型                          | 默认值 | 版本 |
| :------ | ---------------- | ----------------------------- | ------ | ---- |
| gap     | 列元素之间的间距 | `number`                      | `0`    | -    |
| justify | 主轴对齐         | `FlexStyle['justifyContent']` | -      | -    |
| align   | 交叉轴对齐       | `FlexStyle['alignItems']`     | -      | -    |
