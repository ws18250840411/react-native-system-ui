# Space

Space enforces uniform gaps between child elements. It supports horizontal or vertical orientation, wrapping, and optional head/tail spacing.

## Import

```tsx
import { Space } from 'react-native-system-ui';
```

### Gap Presets

Choose among the design tokens (`s`, `m`, `l`) or pass a custom number of pixels.

```tsx
import React from 'react';
import { Blank, Button, Card, Space } from 'react-native-system-ui';

function Example() {
  const renderButtons = count =>
  new Array(count).fill(0).map((_, index) => <Button key={index} title="Button" />);
  return (
    <Blank top>
      <Space>
        <Card title="gap = s">
          <Space>{renderButtons(2)}</Space>
        </Card>
        <Card title="gap = m">
          <Space gap="m">{renderButtons(2)}</Space>
        </Card>
        <Card title="gap = l">
          <Space gap="l">{renderButtons(2)}</Space>
        </Card>
        <Card title="Custom gap">
          <Space direction="horizontal" gap={24}>
            {renderButtons(7)}
          </Space>
        </Card>
      </Space>
    </Blank>
  );
}

export default Example;
```

### Direction And Wrap

Switch layout direction or enable wrapping to flow items onto multiple lines.

```tsx
import React from 'react';
import { Blank, Button, Card, Space } from 'react-native-system-ui';

function Example() {
  const renderButtons = count =>
  new Array(count).fill(0).map((_, index) => <Button key={index} title="Button" />);

  return (
    <Blank top>
      <Space>
        <Card title="direction = vertical">
          <Space>{renderButtons(2)}</Space>
        </Card>
        <Card title="direction = horizontal">
          <Space direction="horizontal">{renderButtons(3)}</Space>
        </Card>
        <Card title="Wrap horizontal">
          <Space direction="horizontal" gap="m" wrap>
            {renderButtons(7)}
          </Space>
        </Card>
        <Card title="Wrap with shrink">
          <Space direction="horizontal" gap="m" wrap shrink>
            {renderButtons(7)}
          </Space>
        </Card>
      </Space>
    </Blank>
  );
}

export default Example;
```

### Alignment And Head/Tail

Add outer spacing with `head`/`tail`, or align items along either axis.

```tsx
import React from 'react';
import { Blank, Button, Card, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Blank top>
      <Space>
        <Card title="Head & tail" bodyPadding={false}>
          <Space head tail>
            <Button title="Primary" />
            <Button title="Secondary" variant="secondary" />
          </Space>
        </Card>
        <Card title="justify=center">
          <Space direction="horizontal" justify="center">
            <Button title="XL" size="xl" />
            <Button title="Default" />
            <Button title="XS" size="xs" />
          </Space>
        </Card>
        <Card title="align=center">
          <Space direction="horizontal" align="center">
            <Button title="XL" size="xl" />
            <Button title="Default" />
            <Button title="XS" size="xs" />
          </Space>
        </Card>
      </Space>
    </Blank>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Gap orientation. | `'vertical' \| 'horizontal'` | `'vertical'` |
| wrap | Wrap children when `direction="horizontal"`. | `boolean` | `false` |
| gap | Gap preset (`'s'`, `'m'`, `'l'`) or pixel value. | `number \| BlankProps['size']` | `'s'` |
| gapVertical | Override vertical gap size. | `number` | `theme.blank_size_{s,m,l}` |
| gapHorizontal | Override horizontal gap size. | `number` | `theme.blank_size_{s,m,l}` |
| head | Add spacing before the first child. | `boolean \| number` | `false` |
| tail | Add spacing after the last child. | `boolean \| number` | `false` |
| justify | Align children along the main axis. | `FlexStyle['justifyContent']` | `-` |
| align | Align children along the cross axis. | `FlexStyle['alignItems']` | `-` |
| minWidth | Minimum width for each child when wrapping. | `number` | `-` |
| shrink | Reduce trailing spacing when wrapping horizontally. | `boolean` | `false` |
