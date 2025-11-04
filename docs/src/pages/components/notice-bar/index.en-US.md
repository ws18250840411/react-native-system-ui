# NoticeBar

NoticeBar surfaces prominent alerts or announcements with optional actions and status colors.

## When To Use

- Broadcast system updates, maintenance windows, or marketing promotions.
- Warn users after form submission while keeping them on the page.
- Provide dismissible or linkable banners that sit above content.

## Import

```tsx
import { NoticeBar } from 'react-native-system-ui';
```

## Examples

### Status Variants

```tsx
import React from 'react';
import { NoticeBar, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <NoticeBar message="Scheduled maintenance tonight" />
      <NoticeBar status="success" message="Payment received" />
      <NoticeBar status="error" message="Card declined, try another method" />
    </Space>
  );
}

export default Example;
```

### Modes And Wrapping

```tsx
import React from 'react';
import { NoticeBar } from 'react-native-system-ui';

function Example() {
  return (
    <>
      <NoticeBar
        mode="closeable"
        message="Login from a new device. Tap to dismiss."
        onPressClose={() => console.log('close')}
      />
      <NoticeBar
        mode="link"
        message="New version is available. Tap for details."
        onPress={() => console.log('link')}
      />
      <NoticeBar wrapable square={false} message="This is a longer announcement that will wrap when wrapable is enabled." />
    </>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| message | Notice content | `React.ReactNode` | `-` |
| messageTextStyle | Style override for the text | `StyleProp<TextStyle>` | `-` |
| status | Semantic color scheme | `'primary' \| 'success' \| 'warning' \| 'error'` | `'warning'` |
| mode | Interaction mode (`closeable` or `link`) | `'closeable' \| 'link'` | `-` |
| bordered | Show an outline | `boolean` | `false` |
| color | Text color | `ColorValue` | `notice_bar_text_color` |
| backgroundColor | Background color | `ColorValue` | `notice_bar_background_color` |
| iconColor | Icon color | `ColorValue` | `notice_bar_text_color` |
| wrapable | Allow the message to wrap across lines | `boolean` | `false` |
| square | Use square corners | `boolean` | `true` |
| size | Size preset | `'m' \| 's'` | `'m'` |
| renderLeftIcon / renderRightIcon | Custom icons on either side | `(color: ColorValue, size: number) => React.ReactNode` | `-` |
| onPressClose | Fired when the close icon is tapped | `() => void` | `-` |
| onPress | Tap handler when `mode="link"` | `TouchableWithoutFeedbackProps['onPress']` | `-` |
| theme | Override notice bar theme tokens | `Partial<NoticeBarTheme>` | `-` |

> Theme tokens are documented in `packages/ui/src/components/notice-bar/index.md`.
