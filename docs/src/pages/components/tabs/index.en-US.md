# Tabs

Tabs combines a `TabBar` header with managed tab panels, including badges, indicators, and lazy rendering.

## When To Use

- Switch between multiple sections within the same screen.
- Use scrollable/indicator tab bars without manually wiring panel logic.
- Leverage `TabBar` styling while letting Tabs handle active state and rendering.

## Import

```tsx
import { Tabs } from 'react-native-system-ui';
```

## Examples

### Basic Tabs

```tsx
import React from 'react';
import { Tabs } from 'react-native-system-ui';

function Example() {
  return (
    <Tabs defaultActiveKey="articles">
      <Tabs.TabPane key="articles" tab="Articles">
        Articles content
      </Tabs.TabPane>
      <Tabs.TabPane key="photos" tab="Photos" badge="New">
        Photos content
      </Tabs.TabPane>
      <Tabs.TabPane key="settings" tab="Settings" lazyRender={false}>
        Settings content
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Example;
```

### Controlled With Divider

```tsx
import React from 'react';
import { Tabs } from 'react-native-system-ui';

function Example() {
  const [activeKey, setActiveKey] = React.useState('overview');

  return (
    <Tabs
      activeKey={activeKey}
      onChange={setActiveKey}
      divider
      dividerColor="#e5e7eb"
    >
      <Tabs.TabPane key="overview" tab="Overview">
        Overview content
      </Tabs.TabPane>
      <Tabs.TabPane key="metrics" tab="Metrics">
        Metrics content
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Example;
```

## API

### Tabs

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| tabBarStyle | Style applied to the TabBar wrapper | `TabBarProps['style']` | `-` |
| tabBarHeight | Height of the TabBar | `TabBarProps['height']` | `-` |
| tabBarBackgroundColor | Background color of the TabBar | `TabBarProps['backgroundColor']` | `bottom_bar_background_color` |
| activeKey | Controlled active panel key | `string` | `-` |
| defaultActiveKey | Initial panel key | `string` | `-` |
| onChange | Fired when the active tab changes | `(activeKey: string) => void` | `-` |
| divider | Show a divider under the bar | `boolean` | `false` |
| dividerColor | Custom divider color | `ColorValue` | `-` |
| children | List of `Tabs.TabPane` | `React.ReactNode` | `-` |

> Tabs also passes through `TabBar` props such as `textColor`, `indicator`, `tabAlign`, `labelBulge`, and more.

### Tabs.TabPane

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| key | Matches `activeKey` | `string` | `-` |
| tab | Label displayed in the TabBar | `string` | `-` |
| badge | Badge value shown next to the tab | `number \| string` | `-` |
| lazyRender | Render children only when active | `boolean` | `true` |
| children | Content of the panel | `React.ReactNode` | `-` |

### Tabs.TabView

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| active | Whether the panel is currently visible | `boolean` | `false` |
| lazyRender | Lazy render the content | `boolean` | `true` |
| children | Panel content | `React.ReactNode` | `-` |
