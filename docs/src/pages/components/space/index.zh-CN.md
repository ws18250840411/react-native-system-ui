# Space 间距

> 控制子元素之间的统一间距，避免组件紧贴在一起。

## 何时使用

- 行内元素需要保持统一水平或垂直间距。
- 需要快速设置对齐方式、头尾留白或换行时。

## 代码演示

### 间距大小

`gap` 提供 `s/m/l` 三种预设值，也可直接传入数字。

```tsx
import React from 'react';
import { Blank, Button, Card, Space } from 'react-native-system-ui';

const Example = () => {
  const renderButtons = count =>
    new Array(count).fill(0).map((_, index) => <Button key={index} text="Button" />);

  return (
    <Blank top>
      <Space>
        <Card title="间距:s">
          <Space>{renderButtons(2)}</Space>
        </Card>

        <Card title="间距:m">
          <Space gap="m">{renderButtons(2)}</Space>
        </Card>

        <Card title="间距:l">
          <Space gap="l">{renderButtons(2)}</Space>
        </Card>

        <Card title="间距:自定义">
          <Space direction="horizontal" gap={24}>
            {renderButtons(7)}
          </Space>
        </Card>
      </Space>
    </Blank>
  );
};

export default Example;
```

### 排版方向

通过 `direction` 切换水平/垂直布局，`wrap` 可在横向时自动换行。

```tsx
import React from 'react';
import { Blank, Button, Card, Space } from 'react-native-system-ui';
import { Text } from 'react-native';

const Example = () => {
  const renderButtons = count =>
    new Array(count).fill(0).map((_, index) => <Button key={index} text="Button" />);

  return (
    <Blank top>
      <Space>
        <Card title="方向:vertical">
          <Space>{renderButtons(2)}</Space>
        </Card>

        <Card title="方向:horizontal">
          <Space direction="horizontal">{renderButtons(2)}</Space>
        </Card>

        <Card title="方向:horizontal:子组件过多">
          <Text>横向排版、不换行，gapVertical 为 0</Text>
          <Space direction="horizontal">{renderButtons(7)}</Space>
        </Card>

        <Card title="方向:horizontal:wrap" bodyPadding={{ bottom: false }}>
          <Text>多行时可通过父节点移除多余内边距</Text>
          <Space gap="m" direction="horizontal" wrap>
            {renderButtons(7)}
          </Space>
        </Card>

        <Card title="方向:horizontal:wrap + shrink">
          <Text>shrink（0.3.17+）可收缩底部多余间距</Text>
          <Space gap="m" direction="horizontal" wrap shrink>
            {renderButtons(7)}
          </Space>
        </Card>
      </Space>
    </Blank>
  );
};

export default Example;
```

### 其他能力

头尾留白、主轴/交叉轴对齐、混合尺寸等场景。

```tsx
import React from 'react';
import { Blank, Button, Card, Space } from 'react-native-system-ui';

const Example = () => {
  return (
    <Blank top>
      <Space>
        <Card title="上下外边距" bodyPadding={false}>
          <Space head tail>
            <Button text="Button" />
            <Button text="Button" />
          </Space>
        </Card>

        <Card title="主轴对齐方式">
          <Space direction="horizontal" justify="center">
            <Button text="Button" size="xl" />
            <Button text="Button" size="m" />
            <Button text="Button" size="xs" />
          </Space>
        </Card>

        <Card title="交叉轴对齐方式">
          <Space direction="horizontal" align="center">
            <Button text="Button" size="xl" />
            <Button text="Button" size="m" />
            <Button text="Button" size="xs" />
          </Space>
        </Card>
      </Space>
    </Blank>
  );
};

export default Example;
```

## API

| 属性名        | 描述                                   | 类型                          | 默认值               | 版本    |
| :------------ | -------------------------------------- | ----------------------------- | -------------------- | ------- |
| direction     | 间距方向                               | `'vertical' \| 'horizontal'`  | `'vertical'`         | -       |
| wrap          | 水平布局时是否自动换行                 | `boolean`                     | `false`              | -       |
| gap           | 间距大小                               | `number \| BlankProps['size']` | `'s'`               | -       |
| gapVertical   | 垂直间距（覆盖 gap 对垂直方向的数值）  | `number`                      | `blank_size_{s,m,l}` | -       |
| gapHorizontal | 水平间距（覆盖 gap 对水平方向的数值）  | `number`                      | `blank_size_{s,m,l}` | -       |
| head          | 是否在头部追加留白                     | `boolean \| number`           | `false`              | -       |
| tail          | 是否在尾部追加留白                     | `boolean \| number`           | `false`              | -       |
| justify       | 主轴对齐方式                           | `FlexStyle['justifyContent']` | -                    | -       |
| align         | 交叉轴对齐方式                         | `FlexStyle['alignItems']`     | -                    | -       |
| minWidth      | 子元素最小宽度                         | `number`                      | -                    | -       |
| shrink        | 横向布局时是否收缩尾部边距             | `boolean`                     | `false`              | `0.3.17+` |

## 主题定制

间距大小依赖 `Blank` 组件的 `blank_size_{s,m,l}` 主题变量。
