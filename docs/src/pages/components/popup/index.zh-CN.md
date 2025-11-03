# Popup 弹出层

> 可在任意位置唤起的弹出层容器，支持遮罩、圆角、顶部/底部安全区、Portal 渲染等能力。

## 元素结构

```bash
|-- Overlay
|-- Animated.View  ## style、round、position、safeAreaInsetBottom、zIndex
|--|-- children
```

## 代码演示

### Header

适用于各种弹出层头部场景，支持左右扩展、关闭按钮。

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Blank, Popup, Space } from 'react-native-system-ui';

const Example = () => (
  <Blank top>
    <Space>
      <Popup.Header
        title="标题"
        onClose={() => {
          console.log('标题:onClose');
        }}
      />

      <Popup.Header title="纯标题" showClose={false} />

      <Popup.Header
        title="左右拓展"
        leftExtra={<Text>leftExtra</Text>}
        rightExtra={<Text>rightExtra</Text>}
        onClose={() => {
          console.log('左右拓展:onClose');
        }}
      />
    </Space>
  </Blank>
);

export default Example;
```

### Popup

通过 `position` 控制出现方向，`destroyOnClosed`、`overlayBackgroundColor` 等属性也可组合使用。

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Button, Card, Popup, Space, TextInput } from 'react-native-system-ui';

const positions = ['center', 'left', 'right', 'top', 'bottom'];

const Example = () => {
  const [state, setState] = React.useState({
    show: false,
    position: 'left',
    showDestroy: false,
    showOverlay: false,
  });

  const close = () => setState(prev => ({ ...prev, show: false }));

  return (
    <>
      <Card title="基础用法" square>
        <Space>
          {positions.map(position => (
            <Button
              key={position}
              type="primary"
              text={`弹出位置:${position}`}
              onPress={() => setState(prev => ({ ...prev, show: true, position }))}
          />
          ))}

          <Button
            type="primary"
            text="destroyOnClosed"
            onPress={() => setState(prev => ({ ...prev, showDestroy: true }))}
          />

          <Button
            type="primary"
            text="overlayBackgroundColor"
            onPress={() => setState(prev => ({ ...prev, showOverlay: true }))}
          />
        </Space>
      </Card>

      <Popup
        safeAreaInsetBottom={state.position !== 'top'}
        safeAreaInsetTop={state.position !== 'bottom'}
        visible={state.show}
        position={state.position}
        round
        onPressOverlay={close}
        onRequestClose={() => {
          close();
          return true;
        }}>
        <Popup.Header title="某一个标题" onClose={close} />
        <Card>
          <Text>内容</Text>
        </Card>
      </Popup>

      <Popup
        destroyOnClosed
        visible={state.showDestroy}
        round
        position="bottom"
        safeAreaInsetBottom
        onPressOverlay={() => setState(prev => ({ ...prev, showDestroy: false }))}>
        <Popup.Header title="每次打开都是新的子元素" />
        <TextInput placeholder="请输入价格" addonAfter="元/kg" addonBefore="采购价" />
        <Popup.KeyboardShim />
      </Popup>

      <Popup
        overlayBackgroundColor="#098"
        visible={state.showOverlay}
        round
        position="bottom"
        safeAreaInsetBottom
        onPressOverlay={() => setState(prev => ({ ...prev, showOverlay: false }))}>
        <Popup.Header title="自定义 Overlay 颜色" />
      </Popup>
    </>
  );
};

export default Example;
```

### 软键盘垫片

`Popup.KeyboardShim` 适用于底部弹出层内含输入框的场景，自动撑开可视区域。

```tsx
import React from 'react';
import { Keyboard, ScrollView, Text } from 'react-native';
import { Blank, Button, ButtonBar, Popup, TextInput } from 'react-native-system-ui';

const Example = () => {
  const [visible, setVisible] = React.useState(false);
  const [list, setList] = React.useState([]);

  return (
    <Blank top>
      <Button text="底部弹出、内部有输入框" onPress={() => setVisible(true)} />

      <Popup
        visible={visible}
        position="bottom"
        round
        onClose={() => Keyboard.dismiss()}>
        <Popup.Header
          title="底部弹出、内部有输入框"
          onClose={() => setVisible(false)}
        />
        <Blank>
          <Text>某些有趣的</Text>
          <TextInput
            bordered
            placeholder="请输入备注"
            onChangeText={text =>
              setList(text ? new Array(20).fill(0).map((_, i) => `${text}-${i}`) : [])
            }
          />
        </Blank>

        <ScrollView style={{ maxHeight: 200 }}>
          {list.map(item => (
            <Text key={item} style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
              {item}
            </Text>
          ))}
        </ScrollView>

        <Popup.KeyboardShim />

        <ButtonBar alone>
          <Button text="保存" />
        </ButtonBar>
      </Popup>
    </Blank>
  );
};

export default Example;
```

### Page

`Popup.Page` 看似独立页面，适合复杂表单或大屏弹层。

```tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Blank, Button, ButtonBar, Field, Popup, Space } from 'react-native-system-ui';

const Example = () => {
  const [visible, setVisible] = React.useState(false);

  const renderBlock = (color, key) => (
    <View key={key} style={{ height: 200, backgroundColor: color }} />
  );

  return (
    <Blank top>
      <Button text="弹出层当做一个页面" onPress={() => setVisible(true)} />

      <Popup.Page visible={visible} round>
        <Popup.Header title="独立页面" onClose={() => setVisible(false)} />

        <ScrollView>
          <Space tail>
            {[
              '#f09',
              '#876',
              '#123',
              '#678',
              '#321',
            ].map((color, index) => renderBlock(color, `color-${index}`))}
            {['文案棒', '文案秒', '文案雅', '文案水'].map(name => (
              <Field.TextInput key={name} title={name} placeholder="请输入" divider={false} />
            ))}
          </Space>
        </ScrollView>

        <ButtonBar alone>
          <Button text="确定" />
        </ButtonBar>
      </Popup.Page>
    </Blank>
  );
};

export default Example;
```

## API

### 公共属性

| 属性名              | 描述                                                                      | 类型            | 默认值                    | 版本 |
| :------------------ | ------------------------------------------------------------------------- | --------------- | ------------------------- | ---- |
| visible             | 是否显示                                                                  | `boolean`       | `false`                   | -    |
| duration            | 动画时长 (ms)                                                             | `number`        | `animation_duration_base` | -    |
| overlay             | 是否显示遮罩层                                                            | `boolean`       | `true`                    | -    |
| closeOnPressOverlay | 点击遮罩层是否关闭                                                        | `boolean`       | `true`                    | -    |
| onPressOverlay      | 点击遮罩层回调                                                            | `() => void`    | -                         | -    |
| onOpen              | 打开时触发                                                                | `() => void`    | -                         | -    |
| onOpened            | 打开且动画结束后触发                                                      | `() => void`    | -                         | -    |
| onClose             | 关闭时触发                                                                | `() => void`    | -                         | -    |
| onClosed            | 关闭且动画结束后触发                                                      | `() => void`    | -                         | -    |
| onRequestClose      | Android 返回按钮事件                                                      | `() => boolean` | -                         | -    |

### Popup / Popup.Component

`Popup` 内部通过 Portal 渲染，`Popup.Component` 需自行放置。

| 属性名              | 描述                                                            | 类型                   | 默认值     | 版本 |
| :------------------ | --------------------------------------------------------------- | ---------------------- | ---------- | ---- |
| style               | 最外层样式                                                      | `StyleProp<ViewStyle>` | -          | -    |
| position            | 弹出位置 `'top' \| 'bottom' \| 'right' \| 'left' \| 'center'`   | `PopupPosition`        | `'center'` | -    |
| round               | 是否显示圆角                                                    | `boolean`              | `false`    | -    |
| safeAreaInsetBottom | 是否适配底部安全区                                              | `boolean`              | `false`    | -    |
| safeAreaInsetTop    | 是否适配顶部安全区                                              | `boolean`              | `false`    | -    |
| lazyRender          | 是否延迟渲染                                                    | `boolean`              | `true`     | -    |
| destroyOnClosed     | 关闭时销毁内容（下次重新渲染）                                  | `boolean`              | `false`    | -    |

### Popup.Header

去掉 `NavBarProps` 的 `showBackArrow`、`backArrowColor`、`backArrowSize`、`onPressBackArrow`、`border`。

| 属性名    | 描述             | 类型         | 默认值 | 版本 |
| :-------- | ---------------- | ------------ | ------ | ---- |
| onClose   | 点击关闭         | `() => void` | -      | -    |
| showClose | 是否显示关闭按钮 | `boolean`    | `true` | -    |

### Popup.Page / Popup.PageComponent <Badge>0.2.47+</Badge>

去掉 `PopupProps` 的 `position`、`safeAreaInsetTop`。

| 属性名           | 描述         | 类型     | 默认值               | 版本 |
| :--------------- | ------------ | -------- | -------------------- | ---- |
| safeAreaInsetTop | 顶部安全高度 | `number` | `safeAreaInsets.top` | -    |

### Popup.KeyboardShim

| 属性名         | 描述                                                                                                                        | 类型      | 默认值  | 版本 |
| :------------- | --------------------------------------------------------------------------------------------------------------------------- | --------- | ------- | ---- |
| allowOnAndroid | 是否在 Android 设备中生效（需设置 `android:windowSoftInputMode="adjustResize"`）                                           | `boolean` | `false` | -    |

## 主题定制

| 名称                         | 默认值                    | 描述 |
| :--------------------------- | ------------------------- | ---- |
| popup_background_color       | `TOKENS.white`            | -    |
| popup_round_border_radius    | `TOKENS.border_radius_xl` | -    |
| popup_close_icon_size        | 24                        | -    |
| popup_close_icon_color       | `TOKENS.gray_7`           | -    |
| popup_close_icon_margin_left | `TOKENS.space_2`          | -    |

## FAQ

### 受控输入控件无法输入中文

Popup 内部使用 Portal，状态变化会导致子组件重新渲染，可将输入框拆分到独立组件：

```tsx
import React from 'react';

const PopupInner = () => {
  const [value, setValue] = React.useState('');
  return <TextInput placeholder="请输入关键词" value={value} onChangeText={setValue} />;
};

const Demo = ({ visible }) => (
  <Popup visible={visible}>
    <PopupInner />
  </Popup>
);
```
