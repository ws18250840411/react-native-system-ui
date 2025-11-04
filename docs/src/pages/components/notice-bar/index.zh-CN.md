# NoticeBar 通知栏

> 在页面顶部或列表中展示醒目的通知信息，可搭配不同状态、模式与操作图标。

## 何时使用

- 系统公告、版本提醒、营销活动提示。
- 表单提交后需要给用户额外说明/警告的场景。
- 希望展示可关闭或跳转链接的提示条。

## 引入

```tsx
import { NoticeBar } from 'react-native-system-ui';
```

## 代码演示

### 基础状态

```tsx
import React from 'react';
import { NoticeBar, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <NoticeBar message="系统维护通知" />
      <NoticeBar status="success" message="支付成功，正在跳转" />
      <NoticeBar status="error" message="余额不足，请充值" />
    </Space>
  );
}

export default Example;
```

### 模式与换行

```tsx
import React from 'react';
import { NoticeBar } from 'react-native-system-ui';

function Example() {
  return (
    <>
      <NoticeBar
        mode="closeable"
        message="登录异常，点击右侧关闭"
        onPressClose={() => console.log('close')}
      />
      <NoticeBar
        mode="link"
        message="新版本上线，点击查看详情"
        renderRightIcon={(color, size) => null}
        onPress={() => console.log('link')}
      />
      <NoticeBar wrapable square={false} message="文字较长时可开启 wrapable 以自动换行显示" />
    </>
  );
}

export default Example;
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 通知内容 | `React.ReactNode` | `-` |
| messageTextStyle | 内容文字样式 | `StyleProp<TextStyle>` | `-` |
| status | 语义状态（决定默认色） | `'primary' \| 'success' \| 'warning' \| 'error'` | `'warning'` |
| mode | 模式：可关闭或链接 | `'closeable' \| 'link'` | `-` |
| bordered | 显示描边 | `boolean` | `false` |
| color | 文本颜色 | `ColorValue` | `notice_bar_text_color` |
| backgroundColor | 背景色 | `ColorValue` | `notice_bar_background_color` |
| iconColor | 左右图标颜色 | `ColorValue` | `notice_bar_text_color` |
| wrapable | 是否换行 | `boolean` | `false` |
| square | 圆角或直角 | `boolean` | `true` |
| size | 尺寸 | `'m' \| 's'` | `'m'` |
| renderLeftIcon / renderRightIcon | 自定义左右图标 | `(color: ColorValue, size: number) => React.ReactNode` | `-` |
| onPressClose | 点击关闭按钮回调 | `() => void` | `-` |
| onPress | `mode="link"` 时点击右侧区域回调 | `TouchableWithoutFeedbackProps['onPress']` | `-` |
| theme | 主题变量 | `Partial<NoticeBarTheme>` | `-` |

> 主题变量见 `packages/ui/src/components/notice-bar/index.md`。
