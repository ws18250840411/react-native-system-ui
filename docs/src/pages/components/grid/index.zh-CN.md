# Grid 栅格

> 24 栅格布局系统，基于 `Row` 与 `Col` 实现。

## 概述

- 使用 `Row` 在水平方向创建一组 `Col`。
- 内容必须放置在 `Col` 内，且 `Row` 的直接子元素只能是 `Col`。
- `Col` 的 `span` 取值范围为 `1~24`，超过 24 的部分会自动换行。
- `gap` 控制列间距，`offset` 可实现列的左右偏移。

## 代码演示

### 综合用法

演示基础列宽、间距、偏移、对齐等场景。

```tsx
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Col, Row, Space } from 'react-native-system-ui';

const Example = () => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#f30',
      flex: 1,
    },
    card2: {
      backgroundColor: '#680',
      flex: 1,
    },
    card3: {
      backgroundColor: '#876',
      flex: 1,
    },
  });

  const renderCol = (span, text, styleKey) => (
    <Col key={`${text}-${span}`} span={span}>
      <Text style={styles[styleKey]}>{text}</Text>
    </Col>
  );

  return (
    <ScrollView>
      <Space>
        <Card title="基础用法" square>
          <Row>
            {[
              { span: 8, text: 'Col span 8', style: 'card' },
              { span: 8, text: 'Col span 8', style: 'card2' },
              { span: 8, text: 'Col span 8', style: 'card3' },
              { span: 8, text: 'Col span 8', style: 'card3' },
              { span: 8, text: 'Col span 8', style: 'card' },
              { span: 8, text: 'Col span 8', style: 'card2' },
            ].map(item => renderCol(item.span, item.text, item.style))}
          </Row>
        </Card>

        <Card title="区块间隔" square>
          <Row gap={12}>
            {[
              { span: 8, text: 'Col span 8', style: 'card' },
              { span: 8, text: 'Col span 8', style: 'card2' },
              { span: 8, text: 'Col span 8', style: 'card3' },
            ].map(item => renderCol(item.span, item.text, item.style))}
          </Row>
        </Card>

        <Card title="左右偏移" square>
          <Row>
            <Col span={18} offset={2}>
              <Text style={styles.card}>span=18 offset=2</Text>
            </Col>
            {renderCol(4, 'Col span 4', 'card2')}
          </Row>
        </Card>

        <Card title="主轴对齐方式" square>
          <Text>justify="center"</Text>
          <Row justify="center">
            {[
              { span: 8, text: 'Col span 8', style: 'card' },
              { span: 8, text: 'Col span 8', style: 'card2' },
            ].map(item => renderCol(item.span, item.text, item.style))}
          </Row>

          <Text>justify="flex-end"</Text>
          <Row justify="flex-end">
            {[
              { span: 8, text: 'Col span 8', style: 'card' },
              { span: 8, text: 'Col span 8', style: 'card2' },
            ].map(item => renderCol(item.span, item.text, item.style))}
          </Row>

          <Text>justify="space-between"</Text>
          <Row justify="space-between">
            {[
              { span: 8, text: 'Col span 8', style: 'card' },
              { span: 8, text: 'Col span 8', style: 'card3' },
            ].map(item => renderCol(item.span, item.text, item.style))}
          </Row>
        </Card>

        <Card title="交叉轴对齐方式" square>
          <Text>align="center"</Text>
          <Row align="center">
            <Col span={8}>
              <Text style={styles.card}>{`Col span 8\nCol span 8`}</Text>
            </Col>
            {renderCol(8, 'Col span 8', 'card3')}
          </Row>

          <Text>justify="flex-end" align="flex-end"</Text>
          <Row justify="flex-end" align="flex-end">
            {renderCol(8, 'Col span 8', 'card3')}
            <Col span={8}>
              <Text style={styles.card}>{`Col span 8\nCol span 8`}</Text>
            </Col>
          </Row>

          <Text>justify="center" align="stretch"</Text>
          <Row justify="center" align="stretch">
            {renderCol(8, 'Col span 8', 'card3')}
            <Col span={8}>
              <Text style={styles.card}>{`Col span 8\nCol span 8`}</Text>
            </Col>
          </Row>
        </Card>
      </Space>
    </ScrollView>
  );
};

export default Example;
```

## API

### Row

| 属性名  | 描述             | 类型                          | 默认值 | 版本 |
| :------ | ---------------- | ----------------------------- | ------ | ---- |
| gap     | 列元素之间的间距 | `number`                      | `0`    | -    |
| justify | 主轴对齐方式     | `FlexStyle['justifyContent']` | -      | -    |
| align   | 交叉轴对齐方式   | `FlexStyle['alignItems']`     | -      | -    |

### Col

| 属性名 | 描述                           | 类型     | 默认值 | 版本 |
| :----- | ------------------------------ | -------- | ------ | ---- |
| span   | 列宽（1~24）                   | `number` | -      | -    |
| offset | 列的偏移距离（1 ~ 24 - span）  | `number` | `0`    | -    |
