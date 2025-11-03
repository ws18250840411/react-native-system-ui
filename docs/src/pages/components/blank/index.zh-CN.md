# Blank 留白 <Badge>0.2.3+</Badge>

> 控制容器的外内边距，常用于内容两侧或上下留白。

## 何时使用

- 需要为页面内容提供一致的左右留白。
- 列表或卡片顶部、底部增加额外空白。
- 需要快速切换外边距/内边距。

## 代码演示

### 方向与类型

支持 `left/right/top/bottom` 四个方向，默认使用外边距，可通过 `type="padding"` 改为内边距。

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Blank, Card, Divider, Space } from 'react-native-system-ui';

const Example = () => {
  const Tip = ({ label, color }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{label}</Text>
        <View style={{ width: 20, height: 20, marginLeft: 12, backgroundColor: color }} />
      </View>
    );
  };

  const cardBodyColor = '#61649f';
  const blankColor = '#098';
  const textBgColor = '#f5f5f5';
  const dividerColor = '#2b333e';

  return (
    <Blank top bottom>
      <Space>
        <Tip label="Card body" color={cardBodyColor} />
        <Tip label="Blank" color={blankColor} />
        <Tip label="Blank text" color={textBgColor} />
        <Tip label="Divider" color={dividerColor} />

        <Card title="外边距" bodyPadding={false} bodyStyle={{ backgroundColor: cardBodyColor }}>
          <Blank style={{ backgroundColor: blankColor }}>
            <Text style={{ backgroundColor: textBgColor }}>默认状态:左右边距</Text>
          </Blank>

          <Divider style={{ backgroundColor: dividerColor }}>·</Divider>

          <Blank top bottom style={{ backgroundColor: blankColor }}>
            <Text style={{ backgroundColor: textBgColor }}>上下左右</Text>
          </Blank>
        </Card>

        <Card title="内边距" bodyPadding={false} bodyStyle={{ backgroundColor: cardBodyColor }}>
          <Blank style={{ backgroundColor: blankColor }} type="padding">
            <Text style={{ backgroundColor: textBgColor }}>默认状态:左右边距</Text>
          </Blank>

          <Divider style={{ backgroundColor: dividerColor }}>·</Divider>

          <Blank top bottom style={{ backgroundColor: blankColor }} type="padding">
            <Text style={{ backgroundColor: textBgColor }}>上下左右</Text>
          </Blank>
        </Card>
      </Space>
    </Blank>
  );
};

export default Example;
```

### 留白大小

可分别指定四个方向的距离，也可以通过 `size` 使用预设的 `s/m/l`。

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Blank, Card, Divider, Space } from 'react-native-system-ui';

const Example = () => {
  const Tip = ({ label, color }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{label}</Text>
      <View style={{ width: 20, height: 20, marginLeft: 12, backgroundColor: color }} />
    </View>
  );

  const cardBodyColor = '#61649f';
  const blankColor = '#098';
  const textBgColor = '#f5f5f5';
  const dividerColor = '#2b333e';

  return (
    <Blank top bottom>
      <Space>
        <Tip label="Card body" color={cardBodyColor} />
        <Tip label="Blank" color={blankColor} />
        <Tip label="Blank text" color={textBgColor} />
        <Tip label="Divider" color={dividerColor} />

        <Card title="直接修改" bodyPadding={false} bodyStyle={{ backgroundColor: cardBodyColor }}>
          <Blank
            style={{ backgroundColor: blankColor }}
            left={4}
            top={8}
            right={12}
            bottom={20}>
            <Text style={{ backgroundColor: textBgColor }}>
              {`left={4} top={8} right={12} bottom={20}`}
            </Text>
          </Blank>
        </Card>

        <Card title="内置 size" bodyPadding={false} bodyStyle={{ backgroundColor: cardBodyColor }}>
          <Blank top bottom style={{ backgroundColor: blankColor }} size="s">
            <Text style={{ backgroundColor: textBgColor }}>size="s"</Text>
          </Blank>

          <Divider style={{ backgroundColor: dividerColor }}>·</Divider>

          <Blank top bottom style={{ backgroundColor: blankColor }} size="m">
            <Text style={{ backgroundColor: textBgColor }}>size="m"</Text>
          </Blank>

          <Divider style={{ backgroundColor: dividerColor }}>·</Divider>

          <Blank top bottom style={{ backgroundColor: blankColor }} size="l">
            <Text style={{ backgroundColor: textBgColor }}>size="l"</Text>
          </Blank>
        </Card>
      </Space>
    </Blank>
  );
};

export default Example;
```

## API

| 属性名 | 描述         | 类型                  | 默认值     | 版本 |
| :----- | ------------ | --------------------- | ---------- | ---- |
| top    | 上边距       | `boolean \| number`   | `false`    | -    |
| bottom | 下边距       | `boolean \| number`   | `false`    | -    |
| left   | 左边距       | `boolean \| number`   | `true`     | -    |
| right  | 右边距       | `boolean \| number`   | `true`     | -    |
| size   | 预设留白大小 | `'s' \| 'm' \| 'l'`   | `'m'`      | -    |
| type   | 边距类型     | `'margin' \| 'padding'` | `'margin'` | -    |

## 主题定制

| 名称         | 默认值           | 描述 |
| :----------- | ---------------- | ---- |
| blank_size_s | `TOKENS.space_2` | -    |
| blank_size_m | `TOKENS.space_3` | -    |
| blank_size_l | `TOKENS.space_4` | -    |
