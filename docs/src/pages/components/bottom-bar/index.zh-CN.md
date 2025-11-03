# BottomBar 底部工具栏

> 固定在屏幕底部的容器，可承载操作按钮或信息提示。

## 何时使用

在页面底部需要展示固定操作条，例如订单确认、提交表单或展示总价时。

## 代码演示

### 基础用法

默认会自动适配底部安全区，可直接放置任意子元素。

```tsx
import React from 'react';
import { BottomBar, Button, Space } from 'react-native-system-ui';

const Example = () => {
  return (
    <BottomBar style={{ padding: 16 }}>
      <Space direction="horizontal" justify="space-between" align="center">
        <Button text="取消" type="ghost" onPress={() => console.log('取消')} />
        <Button text="提交" type="primary" onPress={() => console.log('提交')} />
      </Space>
    </BottomBar>
  );
};

export default Example;
```

### 自定义外观

支持控制高度、背景色与分割线，可在软键盘弹出时手动隐藏。

```tsx
import React from 'react';
import { BottomBar, Button, Space, Switch } from 'react-native-system-ui';

const Example = () => {
  const [hidden, setHidden] = React.useState(false);
  const [divider, setDivider] = React.useState(true);

  return (
    <Space>
      <Space direction="horizontal" align="center">
        <Switch value={!hidden} onValueChange={value => setHidden(!value)} />
        <Button
          text={hidden ? '显示工具栏' : '隐藏工具栏'}
          type="outline"
          onPress={() => setHidden(value => !value)}
        />
      </Space>
      <Space direction="horizontal" align="center">
        <Switch value={divider} onValueChange={setDivider} />
        <Button
          text={divider ? '关闭分割线' : '显示分割线'}
          type="outline"
          onPress={() => setDivider(value => !value)}
        />
      </Space>

      <BottomBar
        hidden={hidden}
        divider={divider}
        backgroundColor="#111"
        height={60}
        style={{ padding: 16 }}>
        <Space direction="horizontal" justify="space-between" align="center">
          <Button text="客服" type="ghost" textColor="#fff" onPress={() => {}} />
          <Button text="立即支付" type="primary" onPress={() => console.log('支付')} />
        </Space>
      </BottomBar>
    </Space>
  );
};

export default Example;
```

## API

| 属性名                | 描述                                                                                                   | 类型         | 默认值                        | 版本 |
| :-------------------- | ------------------------------------------------------------------------------------------------------ | ------------ | ----------------------------- | ---- |
| safeAreaInsetBottom   | 是否开启底部安全区适配                                                                                 | `boolean`    | `true`                        | -    |
| backgroundColor       | 背景色                                                                                                 | `ColorValue` | `bottom_bar_background_color` | -    |
| height                | 工具栏高度                                                                                             | `number`     | `bottom_bar_height`           | -    |
| hidden                | 是否隐藏                                                                                               | `boolean`    | `false`                       | -    |
| keyboardShowNotRender | 软键盘弹出时是否不渲染（仅 Android 生效，避免被软键盘顶起）                                           | `boolean`    | `true`                        | -    |
| divider               | 是否显示顶部分割线                                                                                     | `boolean`    | `true`                        | -    |
| style                 | 自定义容器样式                                                                                         | `StyleProp<ViewStyle>` | -                      | -    |

## 主题定制

| 名称                        | 默认值         | 描述 |
| :-------------------------- | -------------- | ---- |
| bottom_bar_background_color | `TOKENS.white` | -    |
| bottom_bar_height           | 50             | -    |
