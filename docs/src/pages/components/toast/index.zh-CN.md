# Toast 轻提示

> 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

## 何时使用

- 提供成功、警告或错误反馈，提示后自动消失。
- 展示加载状态，阻止用户重复操作。
- 不打断用户流程的轻量提示。

## 代码演示

### 综合用法

支持文本、成功/失败、加载、倒计时、自定义图标与位置等多种方式。

```tsx
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Cell, Toast } from 'react-native-system-ui';

const Example = () => {
  const [loading, setLoading] = React.useState(false);
  const loadingToastRef = React.useRef(null);

  React.useEffect(() => {
    if (loading) {
      loadingToastRef.current = Toast.loading({
        message: '测试',
        duration: 0,
        forbidPress: true,
      });

      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }

    if (loadingToastRef.current) {
      loadingToastRef.current.close();
      loadingToastRef.current = null;
    }
  }, [loading]);

  const CustomIcon = () => (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f30',
      }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>✓</Text>
    </View>
  );

  const showCountdownLoading = () => {
    let second = 3;
    const buildMessage = () => `倒计时 ${second} 秒...`;
    const handler = Toast.loading({
      message: buildMessage(),
      forbidPress: true,
      duration: 0,
    });

    const loop = () => {
      if (second > 0) {
        handler.setMessage(buildMessage());
        second -= 1;
        setTimeout(loop, 1000);
      } else {
        handler.close();
      }
    };

    loop();
  };

  return (
    <ScrollView>
      <Cell.Group title="奇怪的尝试">
        <Cell title="状态控制 loading" onPress={() => setLoading(true)} />
        <Cell
          title="文字提示:快速移除:失败"
          isLink
          onPress={() => {
            const { close } = Toast.loading('提示内容');
            close();
          }}
        />
        <Cell
          title="文字提示:快速移除:成功"
          isLink
          divider={false}
          onPress={() => {
            const { close } = Toast.loading('提示内容');
            setTimeout(() => close(), 0);
          }}
        />
      </Cell.Group>

      <Cell.Group title="基础用法">
        <Cell
          title="文字提示:禁止背景点击"
          isLink
          onPress={() =>
            Toast({
              message: '提示内容',
              forbidPress: true,
            })
          }
        />
        <Cell
          title="文字提示:文案换行"
          isLink
          onPress={() =>
            Toast({
              message: `提示内容\n新的`,
              forbidPress: true,
            })
          }
        />
        <Cell title="成功提示" isLink onPress={() => Toast.success('恭喜你')} />
        <Cell title="失败提示" isLink onPress={() => Toast.fail('很抱歉哟')} />
        <Cell
          title="自定义图标"
          isLink
          divider={false}
          onPress={() =>
            Toast({
              type: 'icon',
              message: '自定义图标',
              icon: <CustomIcon />,
            })
          }
        />
      </Cell.Group>

      <Cell.Group title="loading">
        <Cell
          title="加载提示:禁止背景点击:无提示内容"
          isLink
          onPress={() =>
            Toast.loading({
              forbidPress: true,
            })
          }
        />
        <Cell
          title="加载提示:禁止背景点击"
          isLink
          onPress={() =>
            Toast.loading({
              message: '加载中...',
              forbidPress: true,
            })
          }
        />
        <Cell
          title="加载提示:圆形图标"
          isLink
          onPress={() =>
            Toast({
              type: 'loading',
              loadingType: 'circular',
              message: '加载中...',
              forbidPress: true,
            })
          }
        />
        <Cell
          title="加载提示倒计时"
          isLink
          divider={false}
          onPress={showCountdownLoading}
        />
      </Cell.Group>

      <Cell.Group title="自定义位置">
        <Cell
          title="顶部展示"
          isLink
          onPress={() =>
            Toast({
              message: '提示内容',
              forbidPress: true,
              position: 'top',
            })
          }
        />
        <Cell
          title="底部展示"
          isLink
          divider={false}
          onPress={() =>
            Toast({
              message: '提示内容',
              forbidPress: true,
              position: 'bottom',
            })
          }
        />
      </Cell.Group>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default Example;
```

## API

`Toast.loading`、`Toast.success`、`Toast.fail` 与 `Toast` 的使用方式一致，`Toast.clear` 暂未实现，`Toast.setDefaultOptions` 可配置默认参数（如时长、遮罩）。

去掉 Popup 公共属性中的 `visible`、`duration`、`closeOnPressOverlay`。

| 属性名              | 描述                                                              | 类型                        | 默认值      | 版本 |
| :------------------ | ----------------------------------------------------------------- | --------------------------- | ----------- | ---- |
| type                | 提示类型 `'text' \| 'loading' \| 'success' \| 'fail' \| 'icon'`   | `ToastType`                 | `'text'`    | -    |
| position            | 显示位置 `'top' \| 'bottom' \| 'middle'`                          | `'top' \| 'bottom' \| 'middle'` | `'middle'` | -    |
| message             | 文本内容（支持 `\n` 换行）                                        | `string`                    | `''`        | -    |
| overlay             | 是否显示遮罩层                                                    | `boolean`                   | `false`     | -    |
| forbidPress         | 是否禁止背景点击                                                  | `boolean`                   | `false`     | -    |
| closeOnPress        | 点击后立即关闭                                                    | `boolean`                   | `false`     | -    |
| closeOnPressOverlay | 点击遮罩后是否关闭                                                | `boolean`                   | `false`     | -    |
| loadingType         | 加载图标类型 `'circular' \| 'spinner'`                            | `'circular' \| 'spinner'`   | `'spinner'` | -    |
| duration            | 展示时长 (ms)，设置为 `0` 时不会自动消失                          | `number`                    | `2000`      | -    |
| icon                | 自定义图标                                                        | `React.ReactNode`           | -           | -    |

## 主题定制

| 名称                           | 默认值                          | 描述 |
| :----------------------------- | ------------------------------- | ---- |
| toast_max_width                | '70%'                           | -    |
| toast_background_color         | rgba(0,0,0,`TOKENS.opacity_70`) | -    |
| toast_border_radius            | `TOKENS.border_radius_xl`       | -    |
| toast_text_border_radius       | `TOKENS.border_radius_m`        | -    |
| toast_icon_color               | `TOKENS.white`                  | -    |
| toast_icon_padding             | `TOKENS.space_1`                | -    |
| toast_icon_size                | 36                              | -    |
| toast_inner_padding_vertical   | `TOKENS.space_4`                | -    |
| toast_inner_padding_horizontal | `TOKENS.space_4`                | -    |
| toast_inner_width              | 120                             | -    |
| toast_inner_min_height         | 120                             | -    |
| toast_font_size                | `TOKENS.font_size_3`            | -    |
| toast_text_color               | `TOKENS.white`                  | -    |
| toast_line_height              | 20                              | -    |
| toast_text_min_width           | 96                              | -    |
| toast_text_padding_vertical    | `TOKENS.space_2`                | -    |
| toast_text_padding_horizontal  | `TOKENS.space_3`                | -    |
| toast_text_margin_top          | `TOKENS.space_2`                | -    |
| toast_position_top_distance    | '20%'                           | -    |
| toast_position_bottom_distance | '20%'                           | -    |

## FAQ

### 同步关闭时确保元素已创建

```tsx
const doCheck = () => {
  const { close } = Toast.loading({
    message: '检测中...',
    duration: 0,
    forbidPress: true,
  });

  // 业务逻辑...

  // 同步关闭可能无效，使用 setTimeout 确保元素已创建
  setTimeout(() => {
    close();
  }, 0);
};
```
