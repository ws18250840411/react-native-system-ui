import React from 'react'
import { Platform, View } from 'react-native'
import { Cell, Grid, Search, Space, Switch, Toast, Typography } from 'react-native-system-ui'
import * as Icons from 'react-native-system-icon'

type IconComponent = React.ComponentType<any>
type IconItem = { name: string; component: IconComponent }

const BASIC_ICON_NAMES = [
  'Arrow',
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
  'Success',
  'Cross',
  'Plus',
  'Minus',
  'Fail',
  'Circle',
] as const

const BASIC_ICON_SET = new Set<string>(BASIC_ICON_NAMES)

const toKebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]{2,})([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()

const isMatch = (name: string, keyword: string) => {
  const trimmed = keyword.trim()
  if (!trimmed) return true
  const lower = trimmed.toLowerCase()
  return name.toLowerCase().includes(lower) || toKebabCase(name).includes(lower)
}

const copyToClipboard = async (text: string) => {
  if (Platform.OS !== 'web') return

  try {
    await navigator.clipboard?.writeText(text)
    return
  } catch {}

  try {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)

    const selection = document.getSelection()
    const selected = selection?.rangeCount ? selection.getRangeAt(0) : null

    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    if (selected && selection) {
      selection.removeAllRanges()
      selection.addRange(selected)
    }
  } catch {}
}

const getIconItems = (names: string[], keyword: string): IconItem[] => {
  const map = Icons as unknown as Record<string, IconComponent>
  return names
    .filter(name => isMatch(name, keyword))
    .map(name => ({ name, component: map[name] }))
    .filter(item => typeof item.component !== 'undefined')
}

export default function IconListDemo() {
  const [baseVisible, setBaseVisible] = React.useState(true)
  const [outlineVisible, setOutlineVisible] = React.useState(true)
  const [filledVisible, setFilledVisible] = React.useState(true)
  const [keyword, setKeyword] = React.useState('')
  const deferredKeyword = React.useDeferredValue(keyword)

  const allIconNames = React.useMemo(() => Object.keys(Icons).sort(), [])

  const baseNames = React.useMemo(
    () => allIconNames.filter(name => BASIC_ICON_SET.has(name)),
    [allIconNames],
  )
  const outlineNames = React.useMemo(
    () => allIconNames.filter(name => !BASIC_ICON_SET.has(name) && name.endsWith('O')),
    [allIconNames],
  )
  const filledNames = React.useMemo(
    () => allIconNames.filter(name => !BASIC_ICON_SET.has(name) && !name.endsWith('O')),
    [allIconNames],
  )

  const baseIcons = React.useMemo(() => getIconItems(baseNames, deferredKeyword), [baseNames, deferredKeyword])
  const outlineIcons = React.useMemo(() => getIconItems(outlineNames, deferredKeyword), [outlineNames, deferredKeyword])
  const filledIcons = React.useMemo(() => getIconItems(filledNames, deferredKeyword), [filledNames, deferredKeyword])

  const handleCopy = React.useCallback(async (name: string) => {
    const tag = `<${name} />`
    const isWeb = Platform.OS === 'web'
    await copyToClipboard(tag)
    Toast.show({ message: isWeb ? `复制成功: ${tag}` : tag, duration: 1500 })
  }, [])

  const renderGrid = (items: IconItem[]) => (
    <Grid border={false} columnNum={7}>
      {items.map(item => (
        <Grid.Item
          key={item.name}
          icon={(size, color) => <item.component size={size} fill={color} color={color} />}
          text={item.name}
          onPress={() => handleCopy(item.name)}
        />
      ))}
    </Grid>
  )

  return (
    <Space direction="vertical" gap={12}>
      <View
        style={{
          padding: 12,
          backgroundColor: '#ffffff',
          borderRadius: 12,
        }}
      >
        <Space align="center" wrap gap={[12, 8]}>
          <Cell
            center
            border={false}
            title="基础图标"
            rightIcon={<Switch checked={baseVisible} size={20} onChange={setBaseVisible} />}
          />
          <Cell
            center
            border={false}
            title="线框风格"
            rightIcon={<Switch checked={outlineVisible} size={20} onChange={setOutlineVisible} />}
          />
          <Cell
            center
            border={false}
            title="实底风格"
            rightIcon={<Switch checked={filledVisible} size={20} onChange={setFilledVisible} />}
          />
          <View style={{ flexGrow: 1, minWidth: 240 }}>
            <Search
              value={keyword}
              onChange={setKeyword}
              placeholder="在此搜索图标，点击图标可复制代码"
              background="transparent"
            />
          </View>
        </Space>
      </View>

      {baseVisible && baseIcons.length ? (
        <>
          <Typography.Title level={3}>基础图标</Typography.Title>
          {renderGrid(baseIcons)}
        </>
      ) : null}

      {outlineVisible && outlineIcons.length ? (
        <>
          <Typography.Title level={3}>线框风格</Typography.Title>
          {renderGrid(outlineIcons)}
        </>
      ) : null}

      {filledVisible && filledIcons.length ? (
        <>
          <Typography.Title level={3}>实底风格</Typography.Title>
          {renderGrid(filledIcons)}
        </>
      ) : null}
    </Space>
  )
}
