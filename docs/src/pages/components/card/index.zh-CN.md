# Card 卡片

> 通用卡片容器，用于承载文本、图文或操作区域。

## 何时使用

- 列表页使用 `size="s"`，结合 `titleLeftExtra` 与 `footer` 展示更多辅助信息。
- 详情页采用默认尺寸 `size="m"`，配合 `Space`、`Collapse` 等组件组织内容。

## 元素结构

```bash
|-- View  ## style
|--|-- View  ## headerStyle
|--|--|-- View  ## titleStyle
|--|--|--|-- titleLeftExtra  ## 属性 titleLeftExtra
|--|--|--|-- Text  ## titleTextStyle，或自定义 title
|--|--|-- extra  ## 属性 extra
|--|-- Divider  ## 属性 headerDivider 控制是否显示
|--|-- Card.Body  ## bodyStyle
|--|--|-- Skeleton | children
|--|-- Divider  ## 属性 footerDivider 控制是否显示
|--|-- View  ## footerStyle
|--|--|-- Text  ## footerTextStyle，或自定义 footer
```

## 代码演示

### 经典卡片

包含标题、内容与操作区域，可自定义左右扩展、尺寸以及内边距。

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Blank, Button, Card, Space, Tag } from 'react-native-system-ui';

const Example = () => {
  const renderParagraphs = rows =>
    rows.map((text, index) => <Text key={`${text}-${index}`}>{text}</Text>);

  return (
    <Blank>
      <Space head>
        <Card>{renderParagraphs(['卡片无标题', 'Card content', 'Card content', 'Card content'])}</Card>

        <Card extra={<Button type="link" text="More" />}>
          {renderParagraphs(['卡片无标题，有自定义标题扩展', 'Card content', 'Card content', 'Card content'])}
        </Card>

        <Card title="Default card" extra={<Button type="link" text="More" />}>
          {renderParagraphs(['卡片有标题，有自定义标题扩展', 'Card content', 'Card content', 'Card content'])}
        </Card>

        <Card
          title="Default card"
          titleLeftExtra={<Tag>标签1</Tag>}
          extra={<Button type="link" text="More" />}>
          {renderParagraphs(['卡片有标题，有左侧扩展与右侧操作', 'Card content', 'Card content', 'Card content'])}
        </Card>

        <Card
          size="s"
          title="s card s card s card s card s card"
          titleLeftExtra={<Tag>标签2</Tag>}
          extra={<Button type="link" text="More" />}>
          {renderParagraphs(['s 尺寸的圆角、标题文字大小', 'Card content', 'Card content', 'Card content'])}
        </Card>

        <Card
          title="Default card"
          footer="Default card Default card Default card Default card Default card Default card Default card">
          {renderParagraphs(['自定义 footer', 'Card content', 'Card content', 'Card content'])}
        </Card>

        <Card title="title" bodyPadding={false}>
          {renderParagraphs(['内容区域无内边距', 'Card content', 'Card content', 'Card content'])}
        </Card>

        <Card title="title" bodyPadding={32}>
          {renderParagraphs([
            '自定义内容区域内边距 bodyPadding={32}',
            'Card content',
            'Card content',
            'Card content',
          ])}
        </Card>

        <Card title="title" bodyPadding={{ top: true, bottom: 32 }}>
          {renderParagraphs([
            '自定义内容区域内边距 bodyPadding={{ top: true, bottom: 32 }}',
            'Card content',
            'Card content',
            'Card content',
          ])}
        </Card>

        <Card
          title="title"
          bodyPadding={{ top: true, bottom: 32 }}
          bodyStyle={{ paddingVertical: 40 }}>
          {renderParagraphs([
            '自定义内容区域样式 bodyStyle={{ paddingVertical: 40 }}',
            '自定义内容区域内边距 bodyPadding={{ top: true, bottom: 32 }}',
            'Card content',
            'Card content',
          ])}
        </Card>
      </Space>
    </Blank>
  );
};

export default Example;
```

### 预加载占位

通过 `loading` 属性展示骨架占位，与实际内容布局一致。

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Blank, Button, Card, Space } from 'react-native-system-ui';

const Example = () => {
  const renderCard = props => (
    <Card {...props}>
      {['Card content', 'Card content', 'Card content'].map((text, index) => (
        <Text key={`${text}-${index}`}>{text}</Text>
      ))}
    </Card>
  );

  return (
    <Blank>
      <Space head>
        {renderCard({ loading: true })}
        {renderCard({ loading: true, extra: <Button type="link" text="More" /> })}
        {renderCard({
          loading: true,
          title: 'Default card',
          extra: <Button type="link" text="More" />,
        })}
        {renderCard({
          loading: true,
          title: 'Default card',
          extra: <Button type="link" text="More" />,
          footer: 'Default card Default card',
        })}
      </Space>
    </Blank>
  );
};

export default Example;
```

### 方形卡片

`square` 属性可将圆角切换为直角样式。

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Blank, Button, Card, Space } from 'react-native-system-ui';

const Example = () => {
  const renderCard = () => (
    <Card square title="Default card" extra={<Button type="link" text="More" />}>
      {['Card content', 'Card content', 'Card content'].map((text, index) => (
        <Text key={`${text}-${index}`}>{text}</Text>
      ))}
    </Card>
  );

  return (
    <Blank>
      <Space head>
        {renderCard()}
        {renderCard()}
      </Space>
    </Blank>
  );
};

export default Example;
```

## API

### Card

| 属性名          | 描述                                                      | 类型                                                                                                              | 默认值  | 版本 |
| :-------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------- | ---- |
| title           | 标题                                                      | `React.ReactNode`                                                                                                 | -       | -    |
| titleLeftExtra  | 标题左侧区域                                              | `React.ReactNode`                                                                                                 | -       | -    |
| extra           | 标题右上角的操作区域                                      | `React.ReactNode`                                                                                                 | -       | -    |
| footer          | 底部区域                                                  | `React.ReactNode`                                                                                                 | -       | -    |
| headerStyle     | 自定义标题区域样式                                        | `StyleProp<ViewStyle>`                                                                                            | -       | -    |
| titleStyle      | 标题容器样式                                              | `StyleProp<ViewStyle>`                                                                                            | -       | -    |
| titleTextStyle  | 标题文案样式                                              | `StyleProp<TextStyle>`                                                                                            | -       | -    |
| bodyStyle       | 内容区域自定义样式                                        | `StyleProp<ViewStyle>`                                                                                            | -       | -    |
| footerStyle     | 底部区域样式                                              | `StyleProp<ViewStyle>`                                                                                            | -       | -    |
| footerTextStyle | 底部文案样式                                              | `StyleProp<TextStyle>`                                                                                            | -       | -    |
| size            | 卡片尺寸                                                  | `'m' \| 's'`                                                                                                      | `'m'`   | -    |
| square          | 是否展示直角                                              | `boolean`                                                                                                         | `false` | -    |
| loading         | 内容是否加载中                                            | `boolean`                                                                                                         | `false` | -    |
| headerDivider   | 是否展示标题底部分割线                                    | `boolean`                                                                                                         | `true`  | -    |
| footerDivider   | 是否展示底部顶部的分割线                                  | `boolean`                                                                                                         | `true`  | -    |
| bodyPadding     | 内容区域内边距                                            | `boolean \| number \| { left?: boolean \| number; right?: boolean \| number; top?: boolean \| number; bottom?: boolean \| number; }` | `true`  | -    |
| onPressHeader   | 点击标题区域（包含 `titleLeftExtra`、`title`、`extra`）触发 | `TouchableWithoutFeedbackProps['onPress']`                                                                        | -       | -    |
| onLayoutHeader  | 标题区域渲染完成回调                                      | `ViewProps['onLayout']`                                                                                           | -       | -    |
| onLayoutBody    | 内容区域渲染完成回调                                      | `ViewProps['onLayout']`                                                                                           | -       | -    |

### Card.Body

| 属性名  | 描述   | 类型                       | 默认值 | 版本 |
| :------ | ------ | -------------------------- | ------ | ---- |
| padding | 内边距 | `CardProps['bodyPadding']` | -      | -    |

## 主题定制

| 名称                           | 默认值                   | 描述 |
| :----------------------------- | ------------------------ | ---- |
| card_background_color          | `TOKENS.white`           | -    |
| card_padding                   | `TOKENS.space_3`         | -    |
| card_header_gap                | `TOKENS.space_2`         | -    |
| card_m_header_height           | 50                       | -    |
| card_m_header_text_font_size   | `TOKENS.font_size_7`     | -    |
| card_m_header_text_line_height | `TOKENS.line_height_2`   | -    |
| card_m_border_radius           | `TOKENS.border_radius_m` | -    |
| card_s_header_height           | 40                       | -    |
| card_s_header_text_font_size   | `TOKENS.font_size_5`     | -    |
| card_s_header_text_line_height | `TOKENS.line_height_1`   | -    |
| card_s_border_radius           | `TOKENS.border_radius_s` | -    |
| card_header_text_color         | `TOKENS.gray_8`          | -    |
| card_footer_text_font_size     | `TOKENS.font_size_3`     | -    |
| card_footer_text_color         | `TOKENS.gray_7`          | -    |
| card_footer_text_line_height   | 20                       | -    |
| card_footer_padding_vertical   | `TOKENS.space_2`         | -    |
