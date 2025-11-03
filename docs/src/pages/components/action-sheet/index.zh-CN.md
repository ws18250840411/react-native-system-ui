# ActionSheet 动作面板

> 底部弹起的模态面板，包含与当前情境相关的多个选项。

## 何时使用

常用于从一组操作中快速选择其一，例如订单操作、消息处理等。

## 代码演示

### 基础用法

函数式调用返回 Promise，支持取消、描述信息以及滚动场景。

```tsx
import React from 'react';
import { ActionSheet, Cell } from 'react-native-system-ui';

const Example = () => {
  const showPrompt = () => {
    ActionSheet({
      actions: ['选项一', '选项二'],
    })
      .then(({ item, index }) => {
        console.log('提示弹窗 -> 选项', item, index);
      })
      .catch(error => {
        console.log('提示弹窗 -> 关闭', error);
      });
  };

  const showWithCancel = () => {
    ActionSheet({
      actions: ['选项一', '选项二'],
      cancelText: '取消了',
    })
      .then(({ item, index }) => {
        console.log('展示取消按钮 -> 选项', item, index);
      })
      .catch(error => {
        console.log('展示取消按钮 -> 关闭', error);
      });
  };

  const showWithCallbacks = () => {
    ActionSheet({
      actions: new Array(3).fill(0).map((_, index) => ({
        name: `选项${index}`,
        callback: () => {
          console.log('独立 callback -> ', index);
        },
      })),
    }).catch(() => {});
  };

  const showScrollable = safeAreaInsetTop => {
    ActionSheet({
      title: '出现滚动条',
      description: '会出现的',
      cancelText: '取消了',
      safeAreaInsetTop,
      actions: new Array(20).fill(0).map((_, i) => `选项-${i}`),
    })
      .then(({ item, index }) => {
        console.log('出现滚动条 -> 选项', item, index);
      })
      .catch(error => {
        console.log('出现滚动条 -> 关闭', error);
      });
  };

  const showWithDescription = () => {
    ActionSheet({
      actions: ['选项一', '选项二'],
      cancelText: '取消了',
      description: '这是一段描述信息',
      beforeClose: (action, _, index) => {
        if (action === 'item') {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(index === 0);
            }, 3000);
          });
        }
        return true;
      },
    })
      .then(({ item, index }) => {
        console.log('展示描述信息 -> 选项', item, index);
      })
      .catch(error => {
        console.log('展示描述信息 -> 关闭', error);
      });
  };

  const showWithStatus = () => {
    ActionSheet({
      actions: [
        { name: '着色选项', color: '#f30' },
        { name: 'loading', loading: true },
        { name: '禁用选项', disabled: true },
      ],
      cancelText: '取消了',
      closeOnPressOverlay: false,
    })
      .then(({ item, index }) => {
        console.log('选项状态 -> 选中', item, index);
      })
      .catch(error => {
        console.log('选项状态 -> 关闭', error);
      });
  };

  return (
    <>
      <Cell.Group title="基础用法">
        <Cell title="提示弹窗" isLink onPress={showPrompt} />
        <Cell title="独立 callback" isLink onPress={showWithCallbacks} />
        <Cell title="出现滚动条" isLink onPress={() => showScrollable()} />
        <Cell
          title="出现滚动条:自定义顶部边距"
          isLink
          onPress={() => showScrollable(100)}
        />
        <Cell title="展示取消按钮" isLink onPress={showWithCancel} />
        <Cell
          title="展示描述信息"
          isLink
          divider={false}
          onPress={showWithDescription}
        />
      </Cell.Group>

      <Cell.Group title="选项状态">
        <Cell
          title="选项状态展示"
          isLink
          divider={false}
          onPress={showWithStatus}
        />
      </Cell.Group>
    </>
  );
};

export default Example;
```

### 组件用法

以受控组件方式管理显示状态，`onSelect`、`onCancel` 等事件可自行处理。

```tsx
import React from 'react';
import { ActionSheet, Cell } from 'react-native-system-ui';

const Example = () => {
  const [visible, setVisible] = React.useState(false);

  const close = React.useCallback(() => {
    setVisible(false);
  }, []);

  const open = React.useCallback(() => {
    console.log('组件调用 -> show');
    setVisible(true);
  }, []);

  return (
    <>
      <Cell.Group title="组件调用">
        <Cell title="组件调用" isLink divider={false} onPress={open} />
      </Cell.Group>

      <ActionSheet.Component
        title="这里应该有一个标题"
        description="这是一段描述信息"
        cancelText="取消"
        visible={visible}
        actions={[
          { name: '选项1' },
          { name: '选项2', color: '#f30' },
          { name: 'loading', loading: true },
          { name: 'disabled', disabled: true },
          { name: '选项3' },
        ]}
        onPressOverlay={() => {
          console.log('组件调用 -> onPressOverlay');
          close();
        }}
        onCancel={() => {
          console.log('组件调用 -> onCancel');
          close();
        }}
        onSelect={(action, index) => {
          console.log('组件调用 -> onSelect', action, index);
          close();
        }}
      />
    </>
  );
};

export default Example;
```

## API

### ActionSheet.Component

继承 Popup 公共属性。

| 属性名           | 描述                                     | 类型                                    | 默认值               | 版本 |
| :--------------- | ---------------------------------------- | --------------------------------------- | -------------------- | ---- |
| actions          | 面板选项列表                             | `Action[]`                              | -                    | -    |
| title            | 顶部标题                                 | `React.ReactNode`                       | -                    | -    |
| cancelText       | 取消按钮文字                             | `string`                                | -                    | -    |
| cancelTextStyle  | 取消按钮文字样式                         | `StyleProp<TextStyle>`                  | -                    | -    |
| description      | 选项上方的描述信息                       | `React.ReactNode`                       | -                    | -    |
| descriptionStyle | 选项上方的描述信息样式                   | `StyleProp<TextStyle>`                  | -                    | -    |
| safeAreaInsetTop | 顶部安全高度                             | `number`                                | `safeAreaInsets.top` | -    |
| round            | 是否显示圆角                             | `boolean`                               | `true`               | -    |
| lazyRender       | 是否在显示弹层时才渲染节点               | `boolean`                               | `true`               | -    |
| onCancel         | 点击取消按钮时触发                       | `() => void`                            | -                    | -    |
| onSelect         | 点击选项时触发，禁用或加载状态下不会触发 | `(action: Action, index: number) => void` | -                  | -    |

### ActionSheet

除去 `visible`、`actions`、`onCancel`、`onSelect`、`onRequestClose` 外与 `ActionSheetProps` 一致。

| 属性名      | 描述                                                      | 类型                                                                                   | 默认值 | 版本 |
| :---------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------ | ---- |
| actions     | 面板选项列表                                              | `(string \| Action)[]`                                                                 | -      | -    |
| beforeClose | 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise | `(action: ActionSheetAction, item?: Action, index?: number) => boolean \| Promise<boolean>` | -  | -    |
| onResponse  | 触发了某个选项                                            | `(action: ActionSheetAction, item?: Action, index?: number) => void`                   | -      | -    |

## 主题定制

| 名称                                 | 默认值                 | 描述 |
| :----------------------------------- | ---------------------- | ---- |
| action_sheet_description_color       | `TOKENS.gray_7`        | -    |
| action_sheet_description_font_size   | `TOKENS.font_size_3`   | -    |
| action_sheet_description_line_height | `TOKENS.line_height_1` | -    |
| action_sheet_text_color              | `TOKENS.gray_8`        | -    |
| action_sheet_text_font_size          | `TOKENS.font_size_5`   | -    |
| action_sheet_cancel_padding_top      | `TOKENS.space_2`       | -    |
| action_sheet_cancel_padding_color    | `TOKENS.gray_2`        | -    |
