# Dialog 对话框

> 弹出模态框，用于消息提示、确认操作或在当前页面内完成特定交互。支持函数式调用与受控组件两种方式。

## 何时使用

- 需要在当前页面停留并提示用户确认时。
- 需要收集少量输入但不希望跳转新页面时。
- 需要在任意位置唤起对话框（函数式）或在组件树中受控管理显示状态时。

## 代码演示

### 基础用法

函数式调用 `Dialog`/`Dialog.confirm`，可自定义标题、内容、按钮及 `beforeClose`。

```tsx
import React from 'react';
import { Cell, Dialog } from 'react-native-system-ui';

const Example = () => {
  const cells = React.useMemo(
    () => [
      {
        title: '提示弹窗: 固定 200 宽',
        action: () =>
          Dialog({
            title: '这里是标题',
            message: '提示弹窗',
            width: 200,
          }).then(result => console.log('提示弹窗：', result)),
      },
      {
        title: '提示弹窗: 默认',
        action: () =>
          Dialog({
            title: '这里是标题',
            message: '一袋米要抗几楼，一袋米要抗二楼，一袋米要给多了，一袋米由我洗嘞',
          }).then(result => console.log('提示弹窗：', result)),
      },
      {
        title: '提示弹窗: close',
        action: () =>
          Dialog({
            title: '这里是标题',
            showClose: true,
            message: '一袋米要抗几楼，一袋米要抗二楼，一袋米要给多了，一袋米由我洗嘞',
          }).then(result => console.log('提示弹窗：', result)),
      },
      {
        title: '提示弹窗:无内容',
        action: () =>
          Dialog({
            title:
              '一袋米要抗几楼，一袋米要抗二楼，一袋米要给多了，一袋米由我洗嘞，一袋米我洗了那么多泥，和那堆黑瓦，瓦坷垃，颗颗有泥，谁给你一袋米呦，辛辣天森',
          }).then(result => console.log('提示弹窗：', result)),
      },
      {
        title: '提示弹窗:无标题',
        action: () =>
          Dialog({
            message:
              '一袋米要抗几楼，一袋米要抗二楼，一袋米要给多了，一袋米由我洗嘞，一袋米我洗了那么多泥，和那堆黑瓦，瓦坷垃，颗颗有泥，谁给你一袋米呦，辛辣天森',
          }).then(result => console.log('提示弹窗（无标题）：', result)),
      },
      {
        title: '确认弹窗:按钮逆转',
        action: () =>
          Dialog.confirm({
            title: '提示',
            message: '一袋米要抗几楼，一袋米要抗二楼',
            buttonReverse: true,
          }).then(action => {
            if (action === 'confirm') {
              Dialog({ message: 'confirm' });
            }
          }),
      },
      {
        title: '确认弹窗:多行文字',
        action: () =>
          Dialog.confirm({
            title: '提示',
            message: '一袋米要抗几楼，一袋米要抗二楼，一袋米要给多了，一袋米由我洗嘞',
          }),
      },
      {
        title: '确认弹窗:删除',
        action: () =>
          Dialog.confirm({
            title: '提示',
            message: '一袋米要抗几楼，一袋米要抗二楼，一袋米要给多了，一袋米由我洗嘞',
            confirmButtonColor: '#F30',
            confirmButtonText: '删除',
          }),
      },
      {
        title: '确认弹窗:按钮文案加粗',
        action: () =>
          Dialog.confirm({
            title: '提示',
            message: '一袋米要抗几楼，一袋米要抗二楼，一袋米要给多了，一袋米由我洗嘞',
            cancelButtonTextBold: true,
          }),
      },
      {
        title: '确认弹窗:自定义颜色/异步 beforeClose',
        action: () =>
          Dialog.confirm({
            title: '提示',
            message: '确定要删除这个数据吗？',
            confirmButtonColor: '#690',
            confirmButtonText: '删除吗',
            cancelButtonColor: '#007',
            cancelButtonText: '我就不',
            beforeClose: action =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve(action !== 'cancel');
                }, 3000);
              }),
          }).then(action => console.log('确认弹窗 -> ', action)),
      },
      {
        title: '其他:自定义 Overlay 颜色',
        action: () =>
          Dialog.confirm({
            title: '提示',
            message: '自定义 Overlay 颜色',
            overlayBackgroundColor: '#098',
          }),
      },
    ],
    [],
  );

  return (
    <Cell.Group title="基础用法">
      {cells.map(item => (
        <Cell
          key={item.title}
          title={item.title}
          isLink
          divider={item.title === '其他:自定义 Overlay 颜色' ? false : undefined}
          onPress={item.action}
        />
      ))}
    </Cell.Group>
  );
};

export default Example;
```

### 输入框

`Dialog.input` 搭载文本或数字输入框，可结合异步校验、默认值及安全区域。

```tsx
import React from 'react';
import { Cell, Dialog, Toast } from 'react-native-system-ui';

const Example = () => {
  const showDialog = options => {
    Dialog.input(options);
  };

  return (
    <Cell.Group title="输入框">
      <Cell
        title="普通文字"
        isLink
        onPress={() =>
          showDialog({
            title: '输入框？',
            placeholder: '请输入内容',
            onPressConfirm: text => console.log(text),
          })
        }
      />
      <Cell
        title="普通文字:自定义顶部安全"
        isLink
        onPress={() =>
          showDialog({
            safeAreaTop: 200,
            title: '输入框？',
            placeholder: '请输入内容',
            onPressConfirm: text => console.log(text),
          })
        }
      />
      <Cell
        title="普通文字:close"
        isLink
        onPress={() =>
          showDialog({
            title: '输入框？',
            placeholder: '请输入内容',
            showClose: true,
            onPressConfirm: text => console.log(text),
          })
        }
      />
      <Cell
        title="普通文字:提示文案"
        isLink
        onPress={() =>
          showDialog({
            title: '输入框',
            placeholder: '请输入内容',
            message: '一袋米要抗几楼，一袋米要抗二楼，一袋米要给多了，一袋米由我洗嘞',
            onPressConfirm: text => console.log(text),
          })
        }
      />
      <Cell
        title="必须有值:确认时延迟关闭"
        isLink
        onPress={() =>
          showDialog({
            title: '输入框',
            placeholder: '请输入内容',
            onPressConfirm: text => {
              if (text.trim()) {
                return new Promise(resolve => setTimeout(resolve, 2000));
              }
              Toast('请输入内容');
              return false;
            },
          })
        }
      />
      <Cell
        title="普通文字:默认值"
        isLink
        onPress={() =>
          showDialog({
            title: '输入框？',
            defaultValue: '43434',
            placeholder: '请输入内容',
            onPressConfirm: text => console.log(text),
          })
        }
      />
      <Cell
        title="多行文字:默认值"
        isLink
        onPress={() =>
          showDialog({
            title: '输入框？',
            placeholder: '请输入内容',
            type: 'textarea',
            defaultValue: '343434',
            onPressConfirm: text => console.log(text),
          })
        }
      />
      <Cell
        title="多行文字:提示文案"
        isLink
        onPress={() =>
          showDialog({
            title: '输入框？',
            placeholder: '请输入内容',
            message: '一袋米要抗几楼，一袋米要抗二楼，一袋米要给多了，一袋米由我洗嘞',
            type: 'textarea',
            defaultValue: '343434',
            onPressConfirm: text => console.log(text),
          })
        }
      />
      <Cell
        title="数字:digit"
        isLink
        onPress={() =>
          showDialog({
            title: '输入框？',
            type: 'digit',
            placeholder: '请输入内容',
            numberInput: { keyboardType: 'number-pad', maxLength: 16 },
            onPressConfirm: text => console.log(text),
          })
        }
      />
      <Cell
        title="数字:number"
        isLink
        onPress={() =>
          showDialog({
            title: '输入框？',
            type: 'number',
            placeholder: '请输入内容',
            numberInput: { keyboardType: 'decimal-pad', maxLength: 12 },
            onPressConfirm: text => console.log(text),
          })
        }
      />
      <Cell
        title="数字:number:4位小数"
        isLink
        divider={false}
        onPress={() =>
          showDialog({
            title: '输入框？',
            type: 'number',
            placeholder: '请输入内容',
            numberInput: {
              min: 0,
              limitDecimals: 4,
              addonBefore: '采购费用',
              addonAfter: '元',
              keyboardType: 'decimal-pad',
            },
            onPressConfirm: text => {
              if (!text.trim()) {
                Toast('请填写取消原因');
                return false;
              }
              return new Promise(resolve => setTimeout(() => resolve(true), 600));
            },
          })
        }
      />
    </Cell.Group>
  );
};

export default Example;
```

### 组件调用

通过 `Dialog.Component` 受控管理显示与按钮 loading 状态。

```tsx
import React from 'react';
import { Cell, Dialog } from 'react-native-system-ui';

const Example = () => {
  const [state, setState] = React.useState({
    visible: false,
    confirmLoading: false,
    cancelLoading: false,
  });

  const open = () => setState(prev => ({ ...prev, visible: true }));
  const close = () => setState({ visible: false, confirmLoading: false, cancelLoading: false });

  return (
    <>
      <Cell.Group title="组件调用">
        <Cell title="组件调用" isLink divider={false} onPress={open} />
      </Cell.Group>

      <Dialog.Component
        title="这里应该有一个标题"
        showCancelButton
        visible={state.visible}
        confirmButtonLoading={state.confirmLoading}
        cancelButtonLoading={state.cancelLoading}
        message="哈哈哈哈哈哈哈嗝"
        onPressOverlay={close}
        onPressCancel={() =>
          setState(prev => ({ ...prev, cancelLoading: true }))
        }
        onPressConfirm={() => {
          setState(prev => ({ ...prev, confirmLoading: true }));
          setTimeout(close, 1000);
        }}
      />
    </>
  );
};

export default Example;
```

### 自定义输入框

使用 `Dialog.Keyboard` 自定义内容，结合 `NumberInput` 与按钮。

```tsx
import React from 'react';
import { Keyboard } from 'react-native';
import { Blank, Button, Cell, Dialog, NumberInput, Space } from 'react-native-system-ui';

const Example = () => {
  const [visible, setVisible] = React.useState(false);

  const open = () => setVisible(true);
  const close = React.useCallback(() => {
    Keyboard.dismiss();
    setVisible(false);
  }, []);

  const renderNumberInput = label => (
    <NumberInput
      key={label}
      bordered
      addonBefore={label}
      addonAfter="人"
      min={0}
      placeholder="请填写"
      keyboardType="number-pad"
    />
  );

  return (
    <>
      <Cell.Group title="自定义输入框">
        <Cell title="简单输入框" isLink divider={false} onPress={open} />
      </Cell.Group>

      <Dialog.Keyboard
        title="这里应该有一个标题"
        message="为了您的账户安全，首次登录请修改密码！密码为8-20位大小写字母、数字或符号，不允许有空格"
        visible={visible}
        showConfirmButton={false}
        showCancelButton={false}
        closeOnPressOverlay={false}
        showClose
        onPressClose={close}>
        <Blank top={24} bottom={32} left={24} right={24}>
          <Space gap={16}>
            {['临时工', '正式工'].map(renderNumberInput)}
          </Space>
        </Blank>
        <Blank bottom={24} left={24} right={24}>
          <Button text="确定" type="primary" onPress={close} />
        </Blank>
      </Dialog.Keyboard>
    </>
  );
};

export default Example;
```

## API

### Dialog 公共属性

继承 Popup 公共属性。

| 属性名                | 描述                                              | 类型                                       | 默认值     | 版本 |
| :-------------------- | ------------------------------------------------- | ------------------------------------------ | ---------- | ---- |
| style                 | 最外层样式                                        | `StyleProp<ViewStyle>`                     | -          | -    |
| title                 | 标题                                              | `React.ReactNode`                          | -          | -    |
| width                 | 弹窗宽度                                          | `DimensionValue`                           | `300`      | -    |
| message               | 文本内容，支持 `\n` 换行                          | `React.ReactNode`                          | -          | -    |
| messageAlign          | 内容对齐方式                                      | `'center' \| 'left' \| 'right'`            | `'center'` | -    |
| showConfirmButton     | 是否展示确认按钮                                  | `boolean`                                  | `true`     | -    |
| showCancelButton      | 是否展示取消按钮                                  | `boolean`                                  | -          | -    |
| confirmButtonText     | 确认按钮文案                                      | `string`                                   | `'确认'`   | -    |
| confirmButtonColor    | 确认按钮颜色                                      | `ColorValue`                               | -          | -    |
| confirmButtonTextBold | 确认按钮文案是否加粗                              | `boolean`                                  | `true`     | -    |
| cancelButtonText      | 取消按钮文案                                      | `string`                                   | `'取消'`   | -    |
| cancelButtonColor     | 取消按钮颜色                                      | `ColorValue`                               | -          | -    |
| cancelButtonTextBold  | 取消按钮文案是否加粗                              | `boolean`                                  | `false`    | -    |
| showClose             | 是否显示关闭按钮                                  | `boolean`                                  | `false`    | -    |
| onPressClose          | 点击关闭按钮回调                                  | `TouchableWithoutFeedbackProps['onPress']` | -          | -    |
| buttonReverse         | 是否翻转确认/取消按钮顺序                        | `boolean`                                  | `false`    | -    |

### Dialog.Component

继承 Dialog 公共属性。

| 属性名               | 描述           | 类型         | 默认值  | 版本 |
| :------------------- | -------------- | ------------ | ------- | ---- |
| cancelButtonLoading  | 取消按钮加载中 | `boolean`    | `false` | -    |
| confirmButtonLoading | 确认按钮加载中 | `boolean`    | `false` | -    |
| onPressCancel        | 点击取消       | `() => void` | -       | -    |
| onPressConfirm       | 点击确定       | `() => void` | -       | -    |

### Dialog

去掉 Dialog 公共属性中的 `visible`、`onPressOverlay`、`onPressClose`、`onRequestClose`。

| 属性名      | 描述                                                      | 类型                                                 | 默认值 | 版本 |
| :---------- | --------------------------------------------------------- | ---------------------------------------------------- | ------ | ---- |
| beforeClose | 关闭前的回调，返回 `false` 可阻止关闭，支持返回 Promise   | `(action: DialogAction) => boolean \| Promise<boolean>` | -   | -    |

### Dialog.Keyboard <Badge>0.2.48+</Badge>

### Dialog.KeyboardComponent <Badge>0.2.48+</Badge>

`Dialog.KeyboardComponent` 内部不嵌套 Portal，继承 Dialog 公共属性。

| 属性名      | 描述               | 类型     | 默认值               | 版本 |
| :---------- | ------------------ | -------- | -------------------- | ---- |
| safeAreaTop | 自定义顶部安全边距 | `number` | `safeAreaInsets.top` | -    |

### Dialog.input

去掉 Dialog 公共属性的 `visible`、`onPressOverlay`、`messageAlign`、`onPressClose`。

| 属性名         | 描述                                                      | 类型                                                                                   | 默认值               | 版本 |
| :------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------- | ---- |
| safeAreaTop    | 自定义顶部安全边距                                        | `number`                                                                               | `safeAreaInsets.top` | -    |
| beforeClose    | 关闭前回调，返回 `false` 阻止关闭，支持 Promise           | `(action: Exclude<DialogAction, 'overlay'>, text: string) => boolean \| Promise<boolean>` | -                  | -    |
| onPressCancel  | 点击取消回调                                              | `(text: string) => boolean \| Promise<boolean> \| void \| Promise<void>`               | -                    | -    |
| onPressConfirm | 点击确定回调                                              | `(text: string) => boolean \| Promise<boolean> \| void \| Promise<void>`               | -                    | -    |
| defaultValue   | 默认值                                                    | `string`                                                                               | -                    | -    |
| placeholder    | 输入提示                                                  | `string`                                                                               | -                    | -    |
| type           | 输入框类型                                                | `TextInputProps['type'] \| NumberInputProps['type']`                                   | `'text'`             | -    |
| autoFocus      | 是否自动聚焦                                              | `boolean`                                                                              | `true`               | -    |
| textInput      | 自定义 TextInput 属性                                     | `Omit<TextInputProps, 'defaultValue' \| 'placeholder' \| 'type' \| 'autoFocus'>`       | -                    | -    |
| numberInput    | 自定义 NumberInput 属性                                   | `Omit<NumberInputProps, 'defaultValue' \| 'placeholder' \| 'type' \| 'autoFocus'>`     | -                    | -    |

## 主题定制

| 名称                              | 默认值                           | 描述 |
| :-------------------------------- | -------------------------------- | ---- |
| dialog_width                      | 300                              | -    |
| dialog_transition                 | `TOKENS.animation_duration_base` | -    |
| dialog_border_radius              | `TOKENS.border_radius_xl`        | -    |
| dialog_background_color           | `TOKENS.white`                   | -    |
| dialog_close_color                | `TOKENS.gray_8`                  | -    |
| dialog_close_size                 | 20                               | -    |
| dialog_header_font_weight         | 'bold'                           | -    |
| dialog_header_line_height         | `TOKENS.line_height_3`           | -    |
| dialog_header_padding_top         | `TOKENS.space_6`                 | -    |
| dialog_header_padding_bottom      | `TOKENS.space_4`                 | -    |
| dialog_header_font_size           | `TOKENS.font_size_7`             | -    |
| dialog_header_color               | `TOKENS.gray_8`                  | -    |
| dialog_message_padding_horizontal | `TOKENS.space_6`                 | -    |
| dialog_message_font_size          | `TOKENS.font_size_5`             | -    |
| dialog_message_line_height        | `TOKENS.line_height_1`           | -    |
| dialog_message_text_color         | `TOKENS.gray_7`                  | -    |
| dialog_footer_margin_top          | `TOKENS.space_4`                 | -    |
| dialog_footer_divider_color       | `TOKENS.gray_4`                  | -    |
| dialog_confirm_button_text_color  | `TOKENS.brand_6`                 | -    |
| dialog_cancel_button_text_color   | `TOKENS.gray_8`                  | -    |
| dialog_input_gap                  | `TOKENS.space_4`                 | -    |
