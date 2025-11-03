# Col 列

> 栅格系统中的列组件，一般与 `Row` 搭配使用。

## 何时使用

- 将布局划分为 24 份的等比例栅格。
- 需要通过 `span` 控制占比，通过 `offset` 控制偏移。

更多栅格示例可查看 [Grid 栅格](../grid/index.zh-CN.md)。

## 代码演示

### 基础布局

`Col` 只能作为 `Row` 的子元素，`span` 表示所占的 24 等份，`offset` 用于偏移。

```tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, Col, Row, Space } from 'react-native-system-ui';

const Example = () => {
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

  const renderText = (span, text, style) => (
    <Text key={text} style={[styles.block, style]}>
      {`span=${span} ${text}`}
    </Text>
  );

  return (
    <Space>
      <Card title="等宽栅格" square>
        <Row>
          {[styles.block1, styles.block2, styles.block3].map((style, index) => (
            <Col key={index} span={8}>
              {renderText(8, '列', style)}
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="设置间距" square>
        <Row gap={12}>
          {[styles.block1, styles.block2, styles.block3].map((style, index) => (
            <Col key={index} span={8}>
              {renderText(8, '列', style)}
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="偏移与组合" square>
        <Row>
          <Col span={12}>
            {renderText(12, '主要内容', styles.block1)}
          </Col>
          <Col span={8} offset={4}>
            {renderText(8, '右侧信息 offset=4', styles.block2)}
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default Example;
```

## API

| 属性名 | 描述                           | 类型     | 默认值 | 版本 |
| :----- | ------------------------------ | -------- | ------ | ---- |
| span   | 列宽度，占 24 栅格中的多少份   | `number` | -      | -    |
| offset | 列偏移量，取值范围 `0 ~ 24`    | `number` | `0`    | -    |
