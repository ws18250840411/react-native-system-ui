# Flex 布局

> 对 CSS Flex 的封装，快速实现主轴/交叉轴的排列与对齐。

## 代码演示

### 综合示例

展示常用的排列方向与对齐场景。

```tsx
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, Flex, Space } from 'react-native-system-ui';

const Example = () => {
  const Circle = ({ size = 20 }) => (
    <View
      style={{
        borderRadius: size / 2,
        backgroundColor: '#527fe4',
        width: size,
        height: size,
        margin: 1,
      }}
    />
  );

  return (
    <ScrollView>
      <Space head tail>
        <Card title="项目的排列方向" square>
          <Space>
            <Text>direction="row": 主轴为水平方向，起点在左端</Text>
            <Flex>
              <Flex.Item style={{ paddingRight: 4 }}>
                <Button size="xs">按钮1</Button>
              </Flex.Item>
              <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                <Button size="xs">按钮2</Button>
              </Flex.Item>
              <Flex.Item style={{ paddingLeft: 4 }}>
                <Button size="xs">按钮3</Button>
              </Flex.Item>
            </Flex>

            <Text>direction="column": 主轴为垂直方向，起点在上沿</Text>
            <Flex direction="column">
              <Flex.Item style={{ paddingBottom: 4 }}>
                <Button size="xs">按钮1</Button>
              </Flex.Item>
              <Flex.Item style={{ paddingBottom: 4 }}>
                <Button size="xs">按钮2</Button>
              </Flex.Item>
              <Flex.Item style={{ paddingBottom: 4 }}>
                <Button size="xs">按钮3</Button>
              </Flex.Item>
            </Flex>
          </Space>
        </Card>

        <Card title="对齐方式" square>
          <Space>
            <Text>justify="start": 左对齐</Text>
            <Flex justify="start">
              <Circle />
              <Circle />
              <Circle />
              <Circle />
              <Circle />
            </Flex>

            <Text>justify="center": 居中</Text>
            <Flex justify="center">
              <Circle />
              <Circle />
              <Circle />
              <Circle />
              <Circle />
            </Flex>

            <Text>justify="end": 右对齐</Text>
            <Flex justify="end">
              <Circle />
              <Circle />
              <Circle />
              <Circle />
              <Circle />
            </Flex>
          </Space>
        </Card>

        <Card title="组合使用" square>
          <Flex justify="between">
            <Circle />
            <Flex align="center">
              <Circle />
              <Circle size={40} />
            </Flex>
          </Flex>
        </Card>
      </Space>
    </ScrollView>
  );
};

export default Example;
```

## API

### Flex

| 属性名    | 描述           | 类型                         | 默认值     | 版本 |
| :-------- | -------------- | ---------------------------- | ---------- | ---- |
| direction | 主轴方向       | `FlexStyle['flexDirection']` | `'row'`    | -    |
| wrap      | 是否换行       | `FlexStyle['flexWrap']`      | `'nowrap'` | -    |
| justify   | 主轴对齐       | `FlexJustify`                | `'start'`  | -    |
| align     | 交叉轴对齐     | `FlexAlign`                  | `'center'` | -    |

### Flex.Item

| 属性名 | 描述 | 类型                | 默认值 | 版本 |
| :----- | ---- | ------------------- | ------ | ---- |
| flex   | 占比 | `FlexStyle['flex']` | `1`    | -    |
