# Cell 单元格

> 列表中的基础展示项，可承载标题、说明或输入类内容。

## 何时使用

- 在表单或设置页展示键值信息。
- 处理需要点击跳转的列表项目，可结合 `isLink` 箭头。
- 通过 `Cell.Group` 将同类信息组织在一起。

## 元素结构

```bash
## 最基础的元素结构
|-- Pressable  ## style
|--|-- View  ## innerStyle
|--|--|-- 内容部分 上下或左右布局
|--|-- Divider  ## 属性 divider 控制是否显示，dividerLeftGap、dividerRightGap

## innerStyle 左右布局
|-- View  ## innerStyle（flex 横向）
|--|-- View  ## titleStyle
|--|--|-- requiredJSX  ## 属性 required 控制是否显示
|--|--|-- titleExtra  ## 属性 titleExtra
|--|--|-- Text  ## titleTextStyle/title
|--|-- View  ## valueStyle
|--|--|-- Text  ## valueTextStyle/value
|--|-- valueExtra  ## 属性 valueExtra
|--|-- linkJSX  ## 属性 isLink 控制是否显示

## innerStyle 上下布局
|-- View  ## innerStyle（flex 纵向）
|--|-- View  ## titleStyle
|--|--|-- requiredJSX/titleExtra/title
|--|-- View  ## contentStyle
|--|--|-- View  ## valueStyle
|--|--|--|-- Text  ## value/valueTextStyle
|--|--|-- valueExtra  ## 属性 valueExtra
|--|--|-- linkJSX  ## 属性 isLink 控制是否显示
```

## 代码演示

### 基础用法

单独使用 `Cell` 展示标题、文案或点击交互。

```tsx
import React from 'react';
import { Cell, Toast } from 'react-native-system-ui';

const Example = () => {
  const showToast = message => {
    Toast(message);
  };

  return (
    <>
      <Cell title="标题" value="显示文案" />
      <Cell required title="必填" value="显示文案" />
      <Cell title="仅有标题" />
      <Cell value="仅有文案" />
      <Cell title="仅有标题，右侧有箭头，一般表示可以点击" isLink />
      <Cell
        title="标题有多行：右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击"
        isLink
      />
      <Cell
        titleTextNumberOfLines={1}
        title="标题只有一行：右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击"
        isLink
      />
      <Cell
        title="onPress 点击事件"
        isLink
        onPress={() => {
          showToast('onPress 点击整个单元格');
        }}
      />
      <Cell
        title="onLongPress 点击事件"
        isLink
        onLongPress={() => {
          showToast('onLongPress 点击整个单元格');
        }}
      />
      <Cell
        title="onPressIn 点击事件"
        isLink
        onPressIn={() => {
          showToast('onPressIn 点击整个单元格');
        }}
      />
      <Cell
        title="onPressOut 点击事件"
        isLink
        onPressOut={() => {
          showToast('onPressOut 点击整个单元格');
        }}
      />
      <Cell
        title="onPressLink 点击箭头事件"
        isLink
        onPressLink={() => {
          showToast('点击箭头');
        }}
      />
      <Cell title="标题" extra="这里的有一个可以扩展说明的文案" />
      <Cell
        title="标题"
        value="7个"
        extra="这里的有一个可以扩展说明的文案，这里的有一个可以扩展说明的文案"
        onPress={() => {
          showToast('点击整个单元格');
        }}
        isLink
      />
      <Cell title="标题" extra={`这里的有一个可以扩展\n说明的文案`} />
      <Cell title="标题" value={`多行文本\n多行文本`} />
      <Cell title="最后一项" value="一般不显示分割线" divider={false} />
    </>
  );
};

export default Example;
```

### 分割线控制

自定义分割线左右边距，或去除分割线。

```tsx
import React from 'react';
import { Cell } from 'react-native-system-ui';

const Example = () => {
  return (
    <>
      <Cell.Group title="默认，左右保留边距">
        <Cell title="标题" />
        <Cell title="标题" />
        <Cell title="标题" />
        <Cell title="标题" divider={false} />
      </Cell.Group>

      <Cell.Group title="左侧无边距，右侧保留边距">
        <Cell title="标题" value="左侧无" dividerLeftGap={0} />
        <Cell title="标题" value="左侧无" dividerLeftGap={0} />
        <Cell title="标题" value="左侧无" dividerLeftGap={0} divider={false} />
      </Cell.Group>

      <Cell.Group title="右侧无边距，左侧保留边距">
        <Cell title="标题" value="右侧无" dividerRightGap={0} />
        <Cell title="标题" value="右侧无" dividerRightGap={0} />
        <Cell title="标题" value="右侧无" dividerRightGap={0} />
        <Cell title="标题" value="右侧无" dividerRightGap={0} divider={false} />
      </Cell.Group>

      <Cell.Group title="左右自定义边距">
        <Cell title="标题" value="左右皆无" dividerLeftGap={0} dividerRightGap={0} />
        <Cell title="标题" value="左24右0" dividerLeftGap={24} dividerRightGap={0} />
        <Cell title="标题" value="左0右24" dividerLeftGap={0} dividerRightGap={24} />
        <Cell title="标题" value="不显示分割线" divider={false} />
      </Cell.Group>
    </>
  );
};

export default Example;
```

### 排版布局

支持左右对齐、上下布局、内容居中等场景。

```tsx
import React from 'react';
import { Cell } from 'react-native-system-ui';

const Example = () => {
  return (
    <>
      <Cell title="标题" value="文案左对齐" textAlign="left" />
      <Cell title="标题" value="文案居中" textAlign="center" />
      <Cell title="标题" value="文案右对齐" />
      <Cell title="标题" value="上下布局" vertical />
      <Cell
        title="标题"
        value="上下布局不能修改文案对齐方式"
        vertical
        textAlign="right"
        isLink
      />
      <Cell title="标题" value={`多行文本\n多行文本`} center />
      <Cell title="标题" value={`多行文本\n多行文本`} center isLink />
      <Cell title="最后一项" value="一般不显示分割线" divider={false} />
    </>
  );
};

export default Example;
```

### 样式扩展

覆盖各个部件的样式，包含箭头方向、左右扩展区域。

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Cell, Tag } from 'react-native-system-ui';

const Example = () => {
  return (
    <>
      <Cell
        title={<Text style={{ alignSelf: 'center' }}>自定义 title JSX</Text>}
        value="显示文案"
      />
      <Cell
        title="标题"
        valueStyle={{ justifyContent: 'center', alignItems: 'center' }}
        value={<Text>自定义 value JSX</Text>}
      />
      <Cell
        title="自定义样式"
        titleStyle={{ backgroundColor: '#f5f5f5' }}
        titleTextStyle={{ color: '#f30' }}
        valueStyle={{ backgroundColor: '#000' }}
        valueTextStyle={{ color: '#fff' }}
        value="title、value 部件自定义样式"
      />
      <Cell title="自定义箭头方向" value="down" isLink arrowDirection="down" />
      <Cell title="自定义箭头方向" value="up" isLink arrowDirection="up" />
      <Cell
        title="title 左侧扩展"
        value="显示文案"
        titleExtra={
          <Tag
            size="s"
            style={{
              alignSelf: 'center',
              marginRight: 4,
            }}>
            啊哈
          </Tag>
        }
      />
      <Cell
        title="value 与箭头之间的扩展"
        value="显示文案"
        valueExtra={
          <Tag
            size="s"
            style={{
              alignSelf: 'center',
              marginLeft: 4,
            }}>
            啊哈
          </Tag>
        }
      />
      <Cell
        title="value 与箭头之间的扩展"
        value="显示文案"
        isLink
        valueExtra={
          <Tag
            size="s"
            style={{
              alignSelf: 'center',
              marginLeft: 4,
            }}>
            啊哈
          </Tag>
        }
      />
      <Cell title="最后一项" value="一般不显示分割线" divider={false} />
    </>
  );
};

export default Example;
```

### 单元格组

`Cell.Group` 支持标题、额外说明、上下分割线等配置。

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Cell, Space, Theme, Toast } from 'react-native-system-ui';

const Example = () => {
  const { gray_1, gray_3 } = Theme.useThemeTokens();

  return (
    <Space>
      <Cell.Group
        title="分组标题"
        extra={<Text>extra</Text>}
        onPressTitle={() => {
          Toast('onPressTitle');
        }}
        onPressTitleText={() => {
          Toast('onPressTitleText');
        }}>
        <Cell title="标题" value="显示文案" />
        <Cell required title="必填" value="显示文案" />
        <Cell title="最后一项" value="一般不显示分割线" divider={false} />
      </Cell.Group>

      <View
        style={{
          backgroundColor: gray_1,
          paddingVertical: 24,
        }}>
        <Cell.Group
          title="内容区域有上下分割线"
          titleTextStyle={{ color: '#f30', backgroundColor: gray_3 }}
          bodyTopDivider
          bodyBottomDivider>
          <Cell title="标题" value="显示文案" />
          <Cell required title="必填" value="显示文案" />
          <Cell title="最后一项" value="一般不显示分割线" divider={false} />
        </Cell.Group>
      </View>
    </Space>
  );
};

export default Example;
```

## API

### Cell

| 属性名                 | 描述                                                                             | 类型                               | 默认值                                | 版本 |
| :--------------------- | -------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------- | ---- |
| innerStyle             | 内部布局样式                                                                     | `StyleProp<ViewStyle>`             | -                                     | -    |
| title                  | 左侧标题                                                                         | `React.ReactNode`                  | -                                     | -    |
| titleStyle             | 左侧标题容器样式                                                                 | `StyleProp<ViewStyle>`             | -                                     | -    |
| titleTextStyle         | 左侧标题文案样式                                                                 | `StyleProp<TextStyle>`             | -                                     | -    |
| titleExtra             | 标题左侧自定义内容                                                               | `React.ReactNode`                  | -                                     | -    |
| value                  | 右侧内容                                                                         | `React.ReactNode`                  | -                                     | -    |
| valueStyle             | 右侧内容容器样式                                                                 | `StyleProp<ViewStyle>`             | -                                     | -    |
| valueTextStyle         | 右侧内容文案样式                                                                 | `StyleProp<TextStyle>`             | -                                     | -    |
| valueExtra             | 右侧内容与箭头之间的自定义区域                                                   | `React.ReactNode`                  | -                                     | -    |
| extra                  | 单元格底部的描述信息                                                             | `React.ReactNode`                  | -                                     | -    |
| extraTextStyle         | 描述信息文案样式                                                                 | `StyleProp<TextStyle>`             | -                                     | -    |
| contentStyle           | 上下布局时包裹内容的容器样式                                                     | `StyleProp<ViewStyle>`             | -                                     | -    |
| divider                | 是否显示底部分割线                                                               | `boolean`                          | `true`                                | -    |
| dividerLeftGap         | 分割线左侧边距                                                                   | `number`                           | `24`                                  | -    |
| dividerRightGap        | 分割线右侧边距                                                                   | `number`                           | `24`                                  | -    |
| dividerComponent       | 自定义分割线组件                                                                 | `React.ReactNode`                  | -                                     | -    |
| center                 | 内容区是否垂直居中（主要影响多行文本）                                           | `boolean`                          | `false`                               | -    |
| vertical               | 是否采用上下布局                                                                 | `boolean`                          | `false`                               | -    |
| textAlign              | 右侧文案对齐方式                                                                 | `'left' \| 'center' \| 'right'`    | `'right'`                             | -    |
| required               | 是否展示必填星号                                                                 | `boolean`                          | `false`                               | -    |
| requiredColor          | 必填标记颜色                                                                     | `ColorValue`                       | `cell_required_color`                 | -    |
| isLink                 | 是否展示箭头                                                                     | `boolean`                          | `false`                               | -    |
| arrowDirection         | 箭头方向                                                                         | `'right' \| 'up' \| 'down'`        | `'right'`                             | -    |
| titleTextNumberOfLines | 标题最大行数                                                                     | `number`                           | `2`                                   | -    |
| valueTextNumberOfLines | 右侧文案最大行数                                                                 | `number`                           | `2`                                   | -    |
| onPress                | 点击整行回调                                                                     | `(event: GestureResponderEvent) => void` | -                             | -    |
| onLongPress            | 长按整行回调                                                                     | `(event: GestureResponderEvent) => void` | -                             | -    |
| onPressIn              | 按下整行回调                                                                     | `(event: GestureResponderEvent) => void` | -                             | -    |
| onPressOut             | 离开整行回调                                                                     | `(event: GestureResponderEvent) => void` | -                             | -    |
| onPressLink            | 点击箭头回调                                                                     | `(event: GestureResponderEvent) => void` | -                             | -    |

### Cell.Group

| 属性名            | 描述                                    | 类型                               | 默认值 | 版本 |
| :---------------- | --------------------------------------- | ---------------------------------- | ------ | ---- |
| title             | 分组标题                                | `React.ReactNode`                  | -      | -    |
| titleTextStyle    | 标题文字样式                            | `StyleProp<TextStyle>`             | -      | -    |
| extra             | 右侧附加内容                            | `React.ReactNode`                  | -      | -    |
| bodyTopDivider    | 内容区域顶部是否展示分割线              | `boolean`                          | `false`| -    |
| bodyBottomDivider | 内容区域底部是否展示分割线              | `boolean`                          | `false`| -    |
| onPressTitle      | 点击标题区域回调                        | `() => void`                       | -      | -    |
| onPressTitleText  | 点击标题文字回调                        | `() => void`                       | -      | -    |

## 主题定制

| 名称                            | 默认值                  | 描述 |
| :------------------------------ | ----------------------- | ---- |
| cell_height                     | 56                      | -    |
| cell_background_color           | `TOKENS.white`          | -    |
| cell_padding_horizontal         | `TOKENS.space_3`        | -    |
| cell_padding_vertical           | `TOKENS.space_3`        | -    |
| cell_title_color                | `TOKENS.gray_8`         | -    |
| cell_title_font_size            | `TOKENS.font_size_5`    | -    |
| cell_title_line_height          | `TOKENS.line_height_1`  | -    |
| cell_value_min_width            | 100                     | -    |
| cell_value_text_color           | `TOKENS.gray_7`         | -    |
| cell_extra_text_color           | `TOKENS.gray_6`         | -    |
| cell_extra_text_font_size       | `TOKENS.font_size_3`    | -    |
| cell_extra_text_line_height     | 16                      | -    |
| cell_required_color             | `TOKENS.red_6`          | -    |
| cell_required_width             | `TOKENS.space_3`        | -    |
| cell_icon_link_margin_left      | `TOKENS.space_2`        | -    |
