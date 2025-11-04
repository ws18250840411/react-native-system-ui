# Empty

Empty provides a friendly placeholder when there is no data to display.

## When To Use

- Lists, dashboards, or tabs that currently have no content.
- Onboarding moments that encourage users to create their first item.

## Import

```tsx
import { Empty } from 'react-native-system-ui';
```

## Examples

```tsx
import React from 'react';
import { Button, Empty, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <Empty text="No orders yet" />
      <Empty
        icon={<Empty.Icon name="network" />}
        text={
          <>
            没有网络
            <Button title="Retry" size="sm" onPress={() => {}} />
          </>
        }
        full
      />
    </Space>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| style | Wrapper style | `StyleProp<ViewStyle>` | `-` |
| textStyle | Style for the description text | `StyleProp<TextStyle>` | `-` |
| iconStyle | Style for the icon container | `StyleProp<ViewStyle>` | `-` |
| icon | Custom illustration | `React.ReactNode` | Built-in SVG |
| text | Message shown under the icon | `React.ReactNode` | `'暂无数据'` |
| full | Stretch to fill the available height | `boolean` | `false` |
| theme | Override empty-state theme tokens | `Partial<EmptyTheme>` | `-` |
