# Loading 加载指示

> 通过动画图标展示页面或局部的加载状态。

## 何时使用

- 请求数据或提交表单期间提示用户等待。
- 嵌入卡片、列表等局部内容区，对应 `Toast.loading` 的全局用法。
- 需要使用品牌动画时，可通过 `loadingIcon` 自定义动画。

## 引入

```tsx
import { Loading } from 'react-native-system-ui';
```

## 代码演示

### 基础样式

```tsx
import React from 'react';
import { Card, Loading, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Card title="订单状态" bodyStyle={{ alignItems: 'center' }}>
      <Space align="center">
        <Loading />
        <Loading type="spinner" color="#1677ff" />
      </Space>
    </Card>
  );
}

export default Example;
```

### 垂直布局与文案

```tsx
import React from 'react';
import { Loading } from 'react-native-system-ui';

function Example() {
  return (
    <Loading vertical textStyle={{ marginTop: 8 }}>
      正在生成报告...
    </Loading>
  );
}

export default Example;
```

### 自定义图标

```tsx
import React from 'react';
import { Loading } from 'react-native-system-ui';
import { View } from 'react-native';

const Square = ({ size, color }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: 4,
    }}
  />
);

function Example() {
  return (
    <Loading
      loadingIcon={(size, color) => <Square size={size} color={color} />}
      color="#f5222d"
      textStyle={{ marginTop: 8 }}
      vertical
    >
      上传中...
    </Loading>
  );
}

export default Example;
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| textStyle | 文案样式 | `StyleProp<TextStyle>` | `-` |
| color | 图标颜色 | `ColorValue` | `loading_icon_color` |
| type | 图标类型 | `'circular' \| 'spinner'` | `'circular'` |
| size | 图标大小（px） | `number` | `loading_icon_size` |
| textSize | 文案字号 | `number` | `loading_text_font_size` |
| vertical | 是否垂直排列图标与文字 | `boolean` | `false` |
| loadingIcon | 自定义加载图标 | `React.ReactNode \| ((size: number, color: ColorValue) => React.ReactNode)` | `-` |
| theme | 覆盖主题变量 | `Partial<LoadingTheme>` | `-` |

### Loading.Circular / Loading.Spinner

两个子组件都支持 `size`、`color`、`theme`，默认值与主组件一致。

> 更多主题变量请查看 `packages/ui/src/components/loading/index.md`。
