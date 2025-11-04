# Notify 消息提示

> 顶部下滑的条状提示，支持函数式与组件式调用，适合全局公告或轻量反馈。

## 何时使用

- 需要在当前页面顶部展示成功/失败/警告提醒时。
- 不希望遮挡主体内容，但需要较强关注度的提示。
- 与 `Toast` 类似但希望固定在顶部位置时。

## 引入

```tsx
import { Notify } from 'react-native-system-ui';
```

## 代码演示

### 函数式调用

```tsx
import React from 'react';
import { Button, Notify, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <Button title="成功" onPress={() => Notify.success('保存成功')} />
      <Button
        title="警告"
        onPress={() =>
          Notify({
            type: 'warning',
            message: '当前为测试环境',
            duration: 0,
          })
        }
      />
    </Space>
  );
}

export default Example;
```

### 组件调用

```tsx
import React from 'react';
import { Button, Notify } from 'react-native-system-ui';

function Example() {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button title="展示" onPress={() => setVisible(true)} />
      <Notify.Component
        visible={visible}
        message="表单已保存"
        type="success"
        onRequestClose={() => {
          setVisible(false);
          return true;
        }}
      />
    </>
  );
}

export default Example;
```

## API

### Notify.Component / Notify.NotifyComponent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示 | `boolean` | `false` |
| style | 外层容器样式 | `StyleProp<ViewStyle>` | `-` |
| textStyle | 文本样式 | `StyleProp<TextStyle>` | `-` |
| type | 语义类型 | `'primary' \| 'success' \| 'error' \| 'warning'` | `'primary'` |
| message | 提示内容 | `React.ReactNode` | `-` |
| color | 文本颜色 | `ColorValue` | `notify_text_color` |
| backgroundColor | 背景色 | `ColorValue` | 各状态默认值 |
| onPress | 点击通知条回调 | `TouchableWithoutFeedbackProps['onPress']` | `-` |
| onOpen / onOpened / onClose / onClosed | 生命周期回调 | `() => void` | `-` |
| onRequestClose | Android 返回键处理，返回 `true` 允许关闭 | `() => boolean` | `-` |
| duration | 展示时长（毫秒），0 表示常驻 | `number` | `3000` |
| theme | 覆盖主题变量 | `Partial<NotifyTheme>` | `-` |

### Notify(options)

函数式调用会自动创建组件实例，参数与 `Notify.Component` 一致，额外返回 `{ close, setMessage }`。

| 方法 | 说明 |
| --- | --- |
| `close()` | 主动关闭通知 |
| `setMessage(node)` | 动态更新文案 |

> 主题变量详见 `packages/ui/src/components/notify/index.md`。
