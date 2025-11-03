# Badge 徽标

> 在右上角展示徽标数字或小红点。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 代码演示

### 基础用法

包裹子组件或独立使用，支持最大值与偏移。

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Badge, Card, Space } from 'react-native-system-ui';

const Example = () => {
  const renderDemoItem = () => (
    <View
      style={{
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 4,
      }}
    />
  );

  return (
    <Space>
      <Card title="包裹子组件" square>
        <Space direction="horizontal">
          <Badge count="999">
            {renderDemoItem()}
          </Badge>

          <Badge dot>
            {renderDemoItem()}
          </Badge>

          <Badge count="999" loading>
            {renderDemoItem()}
          </Badge>

          <Badge count={0} showZero>
            {renderDemoItem()}
          </Badge>
        </Space>
      </Card>

      <Card title="最大值" square>
        <Space direction="horizontal">
          <Badge count={999} max={99}>
            {renderDemoItem()}
          </Badge>

          <Badge count={9} max={99}>
            {renderDemoItem()}
          </Badge>
        </Space>
      </Card>

      <Card title="自定义偏移" square>
        <Space direction="horizontal">
          <Badge count={9} offset={[8, -16]}>
            {renderDemoItem()}
          </Badge>

          <Badge dot offset={[8, -16]}>
            {renderDemoItem()}
          </Badge>
        </Space>
      </Card>

      <Card title="独立展示" square>
        <Space direction="horizontal" align="center" tail>
          <Badge count="新+" />
          <Badge count={999} />
          <Badge count={999} max={9} />
          <Badge dot />
        </Space>

        <Space gap={0}>
          <Space direction="horizontal" align="center">
            <Badge count="新+" />
            <Text>一段描述</Text>
          </Space>
          <Space direction="horizontal" align="center">
            <Badge count={999} />
            <Text>一段描述</Text>
          </Space>
          <Space direction="horizontal" align="center">
            <Badge count={999} max={9} />
            <Text>一段描述</Text>
          </Space>
          <Space direction="horizontal" align="center">
            <Badge dot />
            <Text>一段描述</Text>
          </Space>
        </Space>
      </Card>
    </Space>
  );
};

export default Example;
```

### 多彩徽标

内置多种预设色彩，同时支持自定义颜色。

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Badge, Card, Space } from 'react-native-system-ui';

const Example = () => {
  const renderDemoItem = () => (
    <View
      style={{
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 4,
      }}
    />
  );

  return (
    <Space>
      <Card title="内置颜色" square>
        <Space direction="horizontal">
          <Badge count={99} status="primary">
            {renderDemoItem()}
          </Badge>

          <Badge dot status="error">
            {renderDemoItem()}
          </Badge>

          <Badge dot status="success">
            {renderDemoItem()}
          </Badge>

          <Badge dot status="warning">
            {renderDemoItem()}
          </Badge>
        </Space>
      </Card>
      <Card title="自定义颜色" square>
        <Space direction="horizontal">
          <Badge count={99} color="#987">
            {renderDemoItem()}
          </Badge>

          <Badge dot color="#472">
            {renderDemoItem()}
          </Badge>

          <Badge dot color="#937">
            {renderDemoItem()}
          </Badge>
        </Space>
      </Card>
      <Card title="组合使用" square>
        <Space gap={0}>
          <Space direction="horizontal" align="center" gap={4}>
            <Badge dot status="primary" />
            <Text>一段描述</Text>
          </Space>
          <Space direction="horizontal" align="center" gap={4}>
            <Badge dot status="success" />
            <Text>一段描述</Text>
          </Space>
          <Space direction="horizontal" align="center" gap={4}>
            <Badge dot status="warning" />
            <Text>一段描述</Text>
          </Space>
          <Space direction="horizontal" align="center" gap={4}>
            <Badge dot status="error" />
            <Text>一段描述</Text>
          </Space>
          <Space direction="horizontal" align="center" gap={4}>
            <Badge dot color="#000" />
            <Text>一段描述</Text>
          </Space>
        </Space>
      </Card>
    </Space>
  );
};

export default Example;
```

## API

| 属性名         | 描述                                                     | 类型                                       | 默认值                   | 版本 |
| :------------- | -------------------------------------------------------- | ------------------------------------------ | ------------------------ | ---- |
| countStyle     | 文案样式                                                 | `StyleProp<ViewStyle>`                     | -                        | -    |
| countTextStyle | 文案文字样式                                             | `StyleProp<TextStyle>`                     | -                        | -    |
| count          | 徽标内容/展示的数字                                      | `number\|string`                           | -                        | -    |
| color          | 徽标背景颜色                                             | `ColorValue`                               | `badge_background_color` | -    |
| dot            | 不展示数字，只有一个小红点                               | `boolean`                                  | `false`                  | -    |
| max            | 最大值，超过最大值会显示 {max}+，仅当 count 为数字时有效 | `number`                                   | -                        | -    |
| loading        | 数据是否在加载中，如果在加载中就暂时不显示 count         | `boolean`                                  | `false`                  | -    |
| showZero       | 当数值为 0 时，是否展示 Badge                            | `boolean`                                  | `false`                  | -    |
| offset         | 设置状态点的位置偏移                                     | `[number, number]`                         | -                        | -    |
| status         | 内置颜色，优先级低于自定义 color                         | `'primary'\|'success'\|'warning'\|'error'` | -                        | -    |

## 主题定制

| 名称                      | 默认值                     | 描述 |
| :------------------------ | -------------------------- | ---- |
| badge_size                | 16                         | -    |
| badge_color               | `TOKENS.white`             | -    |
| badge_padding_vertical    | 0                          | -    |
| badge_padding_horizontal  | 3                          | -    |
| badge_font_size           | `TOKENS.font_size_1`       | -    |
| badge_font_weight         | 'bold'                     | -    |
| badge_background_color    | `TOKENS.red_6`             | -    |
| badge_count_border_radius | `TOKENS.border_radius_max` | -    |
| badge_dot_size            | 8                          | -    |
| badge_status_primary      | `TOKENS.brand_6`           | -    |
| badge_status_success      | `TOKENS.green_6`           | -    |
| badge_status_warning      | `TOKENS.yellow_6`          | -    |
| badge_status_error        | `TOKENS.red_6`             | -    |
