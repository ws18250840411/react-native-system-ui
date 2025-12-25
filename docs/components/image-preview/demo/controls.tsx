import React from 'react'
import { Close } from 'react-native-system-icon'
import { Cell, ImagePreview, Toast } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewConfigDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (options: Parameters<typeof ImagePreview.open>[0]) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({ images, ...options })
  }

  React.useEffect(() => {
    return () => {
      destroyRef.current?.()
      destroyRef.current = null
    }
  }, [])

  return (
    <Cell.Group title="配置项">
      <Cell title="指定初始位置" isLink onPress={() => open({ startPosition: 2 })} />
      <Cell
        title="展示关闭按钮"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            closeable: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="只允许点击关闭按钮关闭"
        isLink
        onPress={() =>
          open({
            closeable: true,
            closeOnlyClickCloseIcon: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="监听关闭事件"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            onClose: () => {
              Toast.info('关闭预览')
            },
          })
        }
      />
      <Cell
        title="展示指示点"
        isLink
        onPress={() =>
          open({
            showIndicators: true,
            showIndex: false,
          })
        }
      />
    </Cell.Group>
  )
}
