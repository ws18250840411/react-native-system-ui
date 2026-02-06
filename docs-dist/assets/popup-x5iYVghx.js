import{R as i,j as e,V as p,s as P}from"./main-CC2DK3OK.js";import{C as o}from"./index-Dueh9AzQ.js";import{P as n}from"./Popup-G3cXoDWN.js";import{T as a}from"./createComponentTokensHook-BcXZOvON.js";import{S as F}from"./Fire-CQ6Z6s9L.js";import{A as y}from"./index-BnjI8SiS.js";import{S as v}from"./Space-DBTvvarp.js";import"./Arrow-CP2eQgBg.js";import"./IconBase-BNmvoXvm.js";import"./hairline-Bq3nniT3.js";import"./index-CN-rk8sC.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-DVn62gIQ.js";import"./index-CJrLMJTa.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-D9I31KH1.js";import"./Animated-C-b5K9fC.js";import"./index-Cakcz3d2.js";import"./index-CCOraIhd.js";import"./index-D_JlQYPg.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-xa377Hoz.js";import"./index-BP7Blb5n.js";import"./SafeAreaView-CgItGtgs.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./number-BG570ZaL.js";function h(){const[l,t]=i.useState(!1),[s,u]=i.useState(!1),[d,r]=i.useState(!1);return e.jsxs(o.Group,{children:[e.jsx(o,{title:"展示弹出层",isLink:!0,onPress:()=>t(!0)}),e.jsx(o,{title:"顶部安全区域可视化",isLink:!0,onPress:()=>u(!0)}),e.jsx(o,{title:"底部安全区域可视化",isLink:!0,onPress:()=>r(!0)}),e.jsx(n,{visible:l,onClose:()=>t(!1),children:e.jsx(p,{style:{paddingVertical:30,paddingHorizontal:50},children:e.jsx(a,{children:"内容"})})}),e.jsx(n,{visible:s,onClose:()=>u(!1),placement:"top",safeAreaInsetTop:!0,style:{backgroundColor:"#ffe7ba"},children:e.jsx(p,{style:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},children:e.jsx(a,{children:"顶部安全区为浅橙色"})})}),e.jsx(n,{visible:d,onClose:()=>r(!1),placement:"bottom",safeAreaInsetBottom:!0,style:{backgroundColor:"#ffe7ba"},children:e.jsx(p,{style:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},children:e.jsx(a,{children:"底部安全区为浅橙色"})})})]})}const g=`import React from 'react'
import { Text, View } from 'react-native'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupBaseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [safeVisible, setSafeVisible] = React.useState(false)
  const [safeBottomVisible, setSafeBottomVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="展示弹出层" isLink onPress={() => setVisible(true)} />
      <Cell title="顶部安全区域可视化" isLink onPress={() => setSafeVisible(true)} />
      <Cell title="底部安全区域可视化" isLink onPress={() => setSafeBottomVisible(true)} />
      <Popup visible={visible} onClose={() => setVisible(false)}>
        <View style={{ paddingVertical: 30, paddingHorizontal: 50 }}>
          <Text>内容</Text>
        </View>
      </Popup>
      <Popup
        visible={safeVisible}
        onClose={() => setSafeVisible(false)}
        placement="top"
        safeAreaInsetTop
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>顶部安全区为浅橙色</Text>
        </View>
      </Popup>
      <Popup
        visible={safeBottomVisible}
        onClose={() => setSafeBottomVisible(false)}
        placement="bottom"
        safeAreaInsetBottom
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>底部安全区为浅橙色</Text>
        </View>
      </Popup>
    </Cell.Group>
  )
}
`,E={code:g,sources:{_:{tsx:`import React from 'react'
import { Text, View } from 'react-native'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupBaseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [safeVisible, setSafeVisible] = React.useState(false)
  const [safeBottomVisible, setSafeBottomVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="展示弹出层" isLink onPress={() => setVisible(true)} />
      <Cell title="顶部安全区域可视化" isLink onPress={() => setSafeVisible(true)} />
      <Cell title="底部安全区域可视化" isLink onPress={() => setSafeBottomVisible(true)} />
      <Popup visible={visible} onClose={() => setVisible(false)}>
        <View style={{ paddingVertical: 30, paddingHorizontal: 50 }}>
          <Text>内容</Text>
        </View>
      </Popup>
      <Popup
        visible={safeVisible}
        onClose={() => setSafeVisible(false)}
        placement="top"
        safeAreaInsetTop
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>顶部安全区为浅橙色</Text>
        </View>
      </Popup>
      <Popup
        visible={safeBottomVisible}
        onClose={() => setSafeBottomVisible(false)}
        placement="bottom"
        safeAreaInsetBottom
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>底部安全区为浅橙色</Text>
        </View>
      </Popup>
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Text, View } from 'react-native'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupBaseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [safeVisible, setSafeVisible] = React.useState(false)
  const [safeBottomVisible, setSafeBottomVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="展示弹出层" isLink onPress={() => setVisible(true)} />
      <Cell title="顶部安全区域可视化" isLink onPress={() => setSafeVisible(true)} />
      <Cell title="底部安全区域可视化" isLink onPress={() => setSafeBottomVisible(true)} />
      <Popup visible={visible} onClose={() => setVisible(false)}>
        <View style={{ paddingVertical: 30, paddingHorizontal: 50 }}>
          <Text>内容</Text>
        </View>
      </Popup>
      <Popup
        visible={safeVisible}
        onClose={() => setSafeVisible(false)}
        placement="top"
        safeAreaInsetTop
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>顶部安全区为浅橙色</Text>
        </View>
      </Popup>
      <Popup
        visible={safeBottomVisible}
        onClose={() => setSafeBottomVisible(false)}
        placement="bottom"
        safeAreaInsetBottom
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>底部安全区为浅橙色</Text>
        </View>
      </Popup>
    </Cell.Group>
  )
}
`}},title:"基础用法",identifier:"popup-base",lang:"tsx",meta:{title:"基础用法"}};function m(){const[l,t]=i.useState(""),s=()=>t("");return e.jsxs(o.Group,{children:[e.jsx(o,{title:"顶部弹出",isLink:!0,onPress:()=>t("top")}),e.jsx(o,{title:"底部弹出",isLink:!0,onPress:()=>t("bottom")}),e.jsx(o,{title:"左侧弹出",isLink:!0,onPress:()=>t("left")}),e.jsx(o,{title:"右侧弹出",isLink:!0,onPress:()=>t("right")}),e.jsx(n,{visible:l==="top",style:{height:"30%"},placement:"top",onClose:s}),e.jsx(n,{visible:l==="bottom",style:{height:"30%"},placement:"bottom",onClose:s}),e.jsx(n,{visible:l==="left",style:{width:"30%",height:"100%"},placement:"left",onClose:s}),e.jsx(n,{visible:l==="right",style:{width:"30%",height:"100%"},placement:"right",onClose:s})]})}const S=`import React from 'react'

import { Cell, Popup, type PopupPlacement } from 'react-native-system-ui'

export default function PopupPlacementDemo() {
  const [state, setState] = React.useState<PopupPlacement | ''>('')

  const close = () => setState('')

  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => setState('top')} />
      <Cell title="底部弹出" isLink onPress={() => setState('bottom')} />
      <Cell title="左侧弹出" isLink onPress={() => setState('left')} />
      <Cell title="右侧弹出" isLink onPress={() => setState('right')} />

      <Popup visible={state === 'top'} style={{ height: '30%' }} placement="top" onClose={close} />
      <Popup visible={state === 'bottom'} style={{ height: '30%' }} placement="bottom" onClose={close} />
      <Popup visible={state === 'left'} style={{ width: '30%', height: '100%' }} placement="left" onClose={close} />
      <Popup visible={state === 'right'} style={{ width: '30%', height: '100%' }} placement="right" onClose={close} />
    </Cell.Group>
  )
}
`,V={code:S,sources:{_:{tsx:`import React from 'react'

import { Cell, Popup, type PopupPlacement } from 'react-native-system-ui'

export default function PopupPlacementDemo() {
  const [state, setState] = React.useState<PopupPlacement | ''>('')

  const close = () => setState('')

  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => setState('top')} />
      <Cell title="底部弹出" isLink onPress={() => setState('bottom')} />
      <Cell title="左侧弹出" isLink onPress={() => setState('left')} />
      <Cell title="右侧弹出" isLink onPress={() => setState('right')} />

      <Popup visible={state === 'top'} style={{ height: '30%' }} placement="top" onClose={close} />
      <Popup visible={state === 'bottom'} style={{ height: '30%' }} placement="bottom" onClose={close} />
      <Popup visible={state === 'left'} style={{ width: '30%', height: '100%' }} placement="left" onClose={close} />
      <Popup visible={state === 'right'} style={{ width: '30%', height: '100%' }} placement="right" onClose={close} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Popup, type PopupPlacement } from 'react-native-system-ui'

export default function PopupPlacementDemo() {
  const [state, setState] = React.useState<PopupPlacement | ''>('')

  const close = () => setState('')

  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => setState('top')} />
      <Cell title="底部弹出" isLink onPress={() => setState('bottom')} />
      <Cell title="左侧弹出" isLink onPress={() => setState('left')} />
      <Cell title="右侧弹出" isLink onPress={() => setState('right')} />

      <Popup visible={state === 'top'} style={{ height: '30%' }} placement="top" onClose={close} />
      <Popup visible={state === 'bottom'} style={{ height: '30%' }} placement="bottom" onClose={close} />
      <Popup visible={state === 'left'} style={{ width: '30%', height: '100%' }} placement="left" onClose={close} />
      <Popup visible={state === 'right'} style={{ width: '30%', height: '100%' }} placement="right" onClose={close} />
    </Cell.Group>
  )
}
`}},title:"弹出位置",identifier:"popup-placement",lang:"tsx",meta:{title:"弹出位置"}};function f(){const[l,t]=i.useState(!1),[s,u]=i.useState(!1),[d,r]=i.useState(!1);return e.jsxs(o.Group,{children:[e.jsx(o,{title:"关闭图标",isLink:!0,onPress:()=>t(!0)}),e.jsx(o,{title:"自定义关闭图标",isLink:!0,onPress:()=>u(!0)}),e.jsx(o,{title:"图标位置",isLink:!0,onPress:()=>r(!0)}),e.jsx(n,{visible:l,closeable:!0,style:{height:"30%"},placement:"bottom",onClose:()=>t(!1)}),e.jsx(n,{visible:s,closeable:!0,style:{height:"30%"},placement:"bottom",closeIcon:e.jsx(F,{}),onClose:()=>u(!1)}),e.jsx(n,{visible:d,closeable:!0,style:{height:"30%"},placement:"bottom",closeIconPosition:"top-left",onClose:()=>r(!1)})]})}const w=`import React from 'react'

import { Popup, Cell } from 'react-native-system-ui'
import { Fire } from 'react-native-system-icon'

export default function PopupCloseableDemo() {
  const [showCloseIcon, setShowCloseIcon] = React.useState(false)
  const [showCustomCloseIcon, setShowCustomCloseIcon] = React.useState(false)
  const [showCustomIconPosition, setShowCustomIconPosition] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="关闭图标" isLink onPress={() => setShowCloseIcon(true)} />
      <Cell title="自定义关闭图标" isLink onPress={() => setShowCustomCloseIcon(true)} />
      <Cell title="图标位置" isLink onPress={() => setShowCustomIconPosition(true)} />

      <Popup
        visible={showCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        onClose={() => setShowCloseIcon(false)}
      />
      <Popup
        visible={showCustomCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIcon={<Fire />}
        onClose={() => setShowCustomCloseIcon(false)}
      />
      <Popup
        visible={showCustomIconPosition}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIconPosition="top-left"
        onClose={() => setShowCustomIconPosition(false)}
      />
    </Cell.Group>
  )
}
`,B={code:w,sources:{_:{tsx:`import React from 'react'

import { Popup, Cell } from 'react-native-system-ui'
import { Fire } from 'react-native-system-icon'

export default function PopupCloseableDemo() {
  const [showCloseIcon, setShowCloseIcon] = React.useState(false)
  const [showCustomCloseIcon, setShowCustomCloseIcon] = React.useState(false)
  const [showCustomIconPosition, setShowCustomIconPosition] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="关闭图标" isLink onPress={() => setShowCloseIcon(true)} />
      <Cell title="自定义关闭图标" isLink onPress={() => setShowCustomCloseIcon(true)} />
      <Cell title="图标位置" isLink onPress={() => setShowCustomIconPosition(true)} />

      <Popup
        visible={showCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        onClose={() => setShowCloseIcon(false)}
      />
      <Popup
        visible={showCustomCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIcon={<Fire />}
        onClose={() => setShowCustomCloseIcon(false)}
      />
      <Popup
        visible={showCustomIconPosition}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIconPosition="top-left"
        onClose={() => setShowCustomIconPosition(false)}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Popup, Cell } from 'react-native-system-ui'
import { Fire } from 'react-native-system-icon'

export default function PopupCloseableDemo() {
  const [showCloseIcon, setShowCloseIcon] = React.useState(false)
  const [showCustomCloseIcon, setShowCustomCloseIcon] = React.useState(false)
  const [showCustomIconPosition, setShowCustomIconPosition] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="关闭图标" isLink onPress={() => setShowCloseIcon(true)} />
      <Cell title="自定义关闭图标" isLink onPress={() => setShowCustomCloseIcon(true)} />
      <Cell title="图标位置" isLink onPress={() => setShowCustomIconPosition(true)} />

      <Popup
        visible={showCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        onClose={() => setShowCloseIcon(false)}
      />
      <Popup
        visible={showCustomCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIcon={<Fire />}
        onClose={() => setShowCustomCloseIcon(false)}
      />
      <Popup
        visible={showCustomIconPosition}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIconPosition="top-left"
        onClose={() => setShowCustomIconPosition(false)}
      />
    </Cell.Group>
  )
}
`}},title:"关闭图标",identifier:"popup-closeable",lang:"tsx",meta:{title:"关闭图标"}};function x(){const[l,t]=i.useState(!1),[s,u]=i.useState(!1),d=async r=>s?!1:(u(!0),new Promise(j=>{setTimeout(()=>j(!0),800)}));return e.jsxs(o.Group,{children:[e.jsx(o,{title:"异步关闭",isLink:!0,onPress:()=>t(!0)}),e.jsx(n,{visible:l,placement:"center",closeable:!0,beforeClose:d,onClose:()=>t(!1),onClosed:()=>u(!1),round:!0,style:c.popup,children:e.jsx(p,{style:c.dialog,children:e.jsxs(v,{direction:"vertical",gap:12,align:"center",block:!1,children:[e.jsx(a,{style:c.title,children:"异步关闭"}),e.jsx(a,{style:c.tip,children:"点击遮罩或关闭图标关闭（将等待 800ms）"}),s?e.jsxs(p,{style:c.loadingRow,children:[e.jsx(y,{size:"small",color:"#64748b"}),e.jsx(a,{style:c.loading,children:"关闭中..."})]}):null]})})})]})}const c=P.create({popup:{padding:0},dialog:{width:280,paddingHorizontal:24,paddingVertical:22,alignItems:"center"},title:{fontSize:16,fontWeight:"600",color:"#0f172a",textAlign:"center"},tip:{fontSize:14,color:"#334155",textAlign:"center"},loadingRow:{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:4},loading:{fontSize:14,color:"#64748b",marginLeft:8}}),D=`import React from 'react'

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { Cell, Popup, Space } from 'react-native-system-ui'

export default function PopupBeforeCloseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const beforeClose = async (reason: 'close-icon' | 'overlay' | 'close') => {
    if (loading) return false
    setLoading(true)
    return new Promise<boolean>(resolve => {
      setTimeout(() => resolve(true), 800)
    })
  }

  return (
    <Cell.Group>
      <Cell title="异步关闭" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="center"
        closeable
        beforeClose={beforeClose}
        onClose={() => setVisible(false)}
        onClosed={() => setLoading(false)}
        round
        style={styles.popup}
      >
        <View style={styles.dialog}>
          <Space direction="vertical" gap={12} align="center" block={false}>
            <Text style={styles.title}>异步关闭</Text>
            <Text style={styles.tip}>点击遮罩或关闭图标关闭（将等待 800ms）</Text>
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#64748b" />
                <Text style={styles.loading}>关闭中...</Text>
              </View>
            ) : null}
          </Space>
        </View>
      </Popup>
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  popup: {
    padding: 0,
  },
  dialog: {
    width: 280,
    paddingHorizontal: 24,
    paddingVertical: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  tip: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loading: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
})
`,A={code:D,sources:{_:{tsx:`import React from 'react'

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { Cell, Popup, Space } from 'react-native-system-ui'

export default function PopupBeforeCloseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const beforeClose = async (reason: 'close-icon' | 'overlay' | 'close') => {
    if (loading) return false
    setLoading(true)
    return new Promise<boolean>(resolve => {
      setTimeout(() => resolve(true), 800)
    })
  }

  return (
    <Cell.Group>
      <Cell title="异步关闭" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="center"
        closeable
        beforeClose={beforeClose}
        onClose={() => setVisible(false)}
        onClosed={() => setLoading(false)}
        round
        style={styles.popup}
      >
        <View style={styles.dialog}>
          <Space direction="vertical" gap={12} align="center" block={false}>
            <Text style={styles.title}>异步关闭</Text>
            <Text style={styles.tip}>点击遮罩或关闭图标关闭（将等待 800ms）</Text>
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#64748b" />
                <Text style={styles.loading}>关闭中...</Text>
              </View>
            ) : null}
          </Space>
        </View>
      </Popup>
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  popup: {
    padding: 0,
  },
  dialog: {
    width: 280,
    paddingHorizontal: 24,
    paddingVertical: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  tip: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loading: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { Cell, Popup, Space } from 'react-native-system-ui'

export default function PopupBeforeCloseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const beforeClose = async (reason: 'close-icon' | 'overlay' | 'close') => {
    if (loading) return false
    setLoading(true)
    return new Promise<boolean>(resolve => {
      setTimeout(() => resolve(true), 800)
    })
  }

  return (
    <Cell.Group>
      <Cell title="异步关闭" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="center"
        closeable
        beforeClose={beforeClose}
        onClose={() => setVisible(false)}
        onClosed={() => setLoading(false)}
        round
        style={styles.popup}
      >
        <View style={styles.dialog}>
          <Space direction="vertical" gap={12} align="center" block={false}>
            <Text style={styles.title}>异步关闭</Text>
            <Text style={styles.tip}>点击遮罩或关闭图标关闭（将等待 800ms）</Text>
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#64748b" />
                <Text style={styles.loading}>关闭中...</Text>
              </View>
            ) : null}
          </Space>
        </View>
      </Popup>
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  popup: {
    padding: 0,
  },
  dialog: {
    width: 280,
    paddingHorizontal: 24,
    paddingVertical: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  tip: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loading: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
})
`}},title:"异步关闭",identifier:"popup-beforeclose",lang:"tsx",meta:{title:"异步关闭"}};function C(){const[l,t]=i.useState(!1);return e.jsxs(o.Group,{children:[e.jsx(o,{title:"圆角弹窗",isLink:!0,onPress:()=>t(!0)}),e.jsx(n,{visible:l,placement:"bottom",closeable:!0,round:!0,onClose:()=>t(!1),style:{height:"30%"}})]})}const I=`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupRoundDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="圆角弹窗" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="bottom"
        closeable
        round
        onClose={() => setVisible(false)}
        style={{ height: '30%' }}
      />
    </Cell.Group>
  )
}
`,k={code:I,sources:{_:{tsx:`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupRoundDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="圆角弹窗" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="bottom"
        closeable
        round
        onClose={() => setVisible(false)}
        style={{ height: '30%' }}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupRoundDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="圆角弹窗" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="bottom"
        closeable
        round
        onClose={() => setVisible(false)}
        style={{ height: '30%' }}
      />
    </Cell.Group>
  )
}
`}},title:"圆角",identifier:"popup-round",lang:"tsx",meta:{title:"圆角"}};function b(){const[l,t]=i.useState(!1);return e.jsxs(o.Group,{children:[e.jsx(o,{title:"标题弹框",isLink:!0,onPress:()=>t(!0)}),e.jsx(n,{visible:l,closeable:!0,title:"标题",description:"这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述",style:{height:"30%"},placement:"bottom",round:!0,onClose:()=>t(!1)})]})}const R=`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupTitleDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="标题弹框" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        closeable
        title="标题"
        description="这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述"
        style={{ height: '30%' }}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      />
    </Cell.Group>
  )
}

`,L={code:R,sources:{_:{tsx:`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupTitleDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="标题弹框" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        closeable
        title="标题"
        description="这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述"
        style={{ height: '30%' }}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupTitleDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="标题弹框" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        closeable
        title="标题"
        description="这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述"
        style={{ height: '30%' }}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      />
    </Cell.Group>
  )
}

`}},title:"标题弹窗",identifier:"popup-title",lang:"tsx",meta:{title:"标题弹窗"}},T=function({previewer:l=()=>null,api:t=()=>null}){const s=l;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"popup-弹出层","data-anchor":"popup-弹出层",children:"Popup 弹出层"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"基于 Portal 的弹出层，支持多方向、关闭图标、异步关闭以及圆角、安全区等配置，用来承载菜单、表单等浮层内容。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(s,{code:"import { Popup } from 'react-native-system-ui'",lang:"js"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["Popup 基于 Portal 渲染，使用前需在应用根节点包裹 ",e.jsx("strong",{children:"ConfigProvider"})," 或 ",e.jsx("strong",{children:"Portal.Host"}),"，否则弹层无法挂载。推荐使用 ",e.jsx("a",{href:"./config-provider.md",children:"ConfigProvider"}),"（内置主题与 PortalHost）。"]})}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"visible"})," 与 ",e.jsx("code",{children:"onClose"})," 受控弹层的打开/关闭状态，点击 ",e.jsx("code",{children:"Cell"})," 即可展示。示例使用默认的 ",e.jsx("code",{children:"center"})," 弹出位置，并仅展示一块内容区域。"]}),e.jsx("div",{children:e.jsx(s,{...E,children:e.jsx(h,{})})}),e.jsx("h3",{id:"弹出位置","data-anchor":"弹出位置",children:"弹出位置"}),e.jsxs("p",{children:["将 ",e.jsx("code",{children:"placement"}),"（部分实现中命名为 ",e.jsx("code",{children:"position"}),"）设置为 ",e.jsx("code",{children:"top"}),"、",e.jsx("code",{children:"bottom"}),"、",e.jsx("code",{children:"left"}),"、",e.jsx("code",{children:"right"})," 即可在不同方向弹出；",e.jsx("code",{children:"center"})," 的场景可参考基础用法。示例为每个方向维护独立的弹层，并通过样式控制高度/宽度。"]}),e.jsx("div",{children:e.jsx(s,{...V,children:e.jsx(m,{})})}),e.jsx("h3",{id:"关闭图标","data-anchor":"关闭图标",children:"关闭图标"}),e.jsxs("p",{children:["开启 ",e.jsx("code",{children:"closeable"})," 后会展示默认关闭图标，可用 ",e.jsx("code",{children:"closeIcon"})," 自定义图标节点，并用 ",e.jsx("code",{children:"closeIconPosition"})," 控制位置。示例覆盖三个常见场景：默认、替换图标以及左上角位置。"]}),e.jsx("div",{children:e.jsx(s,{...B,children:e.jsx(f,{})})}),e.jsx("h3",{id:"异步关闭","data-anchor":"异步关闭",children:"异步关闭"}),e.jsxs("p",{children:[e.jsx("code",{children:"beforeClose"})," 在关闭前触发，可返回 ",e.jsx("code",{children:"false"}),"/",e.jsx("code",{children:"Promise<false>"})," 阻止关闭，用于二次确认或异步校验。回调会收到触发来源（",e.jsx("code",{children:"close-icon"}),"、",e.jsx("code",{children:"overlay"}),"、",e.jsx("code",{children:"close"}),"）。"]}),e.jsx("div",{children:e.jsx(s,{...A,children:e.jsx(x,{})})}),e.jsx("h3",{id:"圆角样式","data-anchor":"圆角样式",children:"圆角样式"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"round"})," 后会根据弹出方向自动为对应边添加圆角。示例演示底部圆角弹窗，配合 ",e.jsx("code",{children:"closeable"})," 与固定位高度的底部弹层。"]}),e.jsx("div",{children:e.jsx(s,{...k,children:e.jsx(C,{})})}),e.jsx("h3",{id:"标题弹窗","data-anchor":"标题弹窗",children:"标题弹窗"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"title"})," 和 ",e.jsx("code",{children:"description"})," 属性后，会在弹层顶部渲染标题与描述，常用于底部弹窗。"]}),e.jsx("div",{children:e.jsx(s,{...L,children:e.jsx(b,{})})}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"safeArea"})," 或 ",e.jsx("code",{children:"safeAreaInsetTop"})," / ",e.jsx("code",{children:"safeAreaInsetBottom"})," 可适配刘海屏与底部安全区，见下方 API。"]}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"placement"})," / ",e.jsx("code",{children:"position"})]}),e.jsx("td",{children:"弹出位置"}),e.jsx("td",{children:e.jsx("code",{children:"'top' | 'bottom' | 'left' | 'right' | 'center'"})}),e.jsx("td",{children:e.jsx("code",{children:"'center'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlay"})}),e.jsx("td",{children:"是否显示遮罩"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlayStyle"})}),e.jsx("td",{children:"自定义遮罩样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlayAccessibilityLabel"})}),e.jsx("td",{children:"无障碍描述，用于提示遮罩按钮的用途"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"关闭弹层"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlayTestID"})}),e.jsx("td",{children:"遮罩测试标识"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"popup-overlay"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"closeOnOverlayPress"})," / ",e.jsx("code",{children:"closeOnClickOverlay"})]}),e.jsx("td",{children:"点击遮罩是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnBackPress"})}),e.jsx("td",{children:"Android 返回键是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnPopstate"})}),e.jsx("td",{children:"浏览器返回（popstate）是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否展示关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIcon"})}),e.jsx("td",{children:"自定义关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIconPosition"})}),e.jsx("td",{children:"关闭图标位置"}),e.jsx("td",{children:e.jsx("code",{children:"'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'"})}),e.jsx("td",{children:e.jsx("code",{children:"'top-right'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"round"})}),e.jsx("td",{children:"是否根据位置自动设置圆角"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"弹出层标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"弹出层描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeArea"})}),e.jsx("td",{children:"是否使用安全区内边距包裹内容"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetTop"})}),e.jsx("td",{children:"内容顶部是否预留安全区"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"内容底部是否预留安全区"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lockScroll"})}),e.jsx("td",{children:"是否锁定背景滚动/点击"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"destroyOnClose"})}),e.jsx("td",{children:"关闭后是否卸载内容"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"duration"})}),e.jsx("td",{children:"动画时长 (ms)"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"自定义层级"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"beforeClose"})}),e.jsxs("td",{children:["关闭前回调，返回 ",e.jsx("code",{children:"false"}),"/",e.jsx("code",{children:"Promise<false>"})," 阻止关闭"]}),e.jsx("td",{children:e.jsx("code",{children:"(reason: 'close-icon' | 'overlay' | 'close') => boolean | Promise<boolean>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"stopPropagation"})}),e.jsx("td",{children:"是否阻止内容区触发背景点击"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"其余"}),e.jsx("td",{children:"透传至内容容器"}),e.jsx("td",{children:e.jsx("code",{children:"ViewProps"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickOverlay"})}),e.jsx("td",{children:"点击遮罩层时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsxs("td",{children:["请求关闭时触发（配合受控 ",e.jsx("code",{children:"visible"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOpen"})}),e.jsx("td",{children:"弹层开始打开时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOpened"})}),e.jsx("td",{children:"弹层完全打开（动画结束）时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClosed"})}),e.jsx("td",{children:"弹层完全关闭时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]})]})]}),e.jsx("h3",{id:"类型定义","data-anchor":"类型定义",children:"类型定义"}),e.jsx(s,{code:"import type { PopupPlacement, PopupCloseIconPosition } from 'react-native-system-ui'",lang:"ts"}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"beforeClose"})," 会收到触发来源（",e.jsx("code",{children:"close-icon"}),"、",e.jsx("code",{children:"overlay"}),"、",e.jsx("code",{children:"close"}),"），可用于二次确认或异步校验。"]})}),e.jsx("h2",{id:"差异说明","data-anchor":"差异说明",children:"差异说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"duration"})," 单位为毫秒（ms）。"]}),e.jsxs("li",{children:["本库不提供 ",e.jsx("code",{children:"teleport"})," 挂载节点能力，但可通过在局部区域内包裹 ",e.jsx("code",{children:"Portal.Host"})," / ",e.jsx("code",{children:"ConfigProvider"})," 来控制弹层挂载位置与配置作用域。"]}),e.jsxs("li",{children:["React Native 环境不适用 ",e.jsx("code",{children:"className/overlayClass/transition"})," 等 DOM 能力，本库以样式 props（如 ",e.jsx("code",{children:"style/overlayStyle"}),"）替代。"]})]})]})})},G=[{Component:h,key:"popup-base",sources:{_:{tsx:`import React from 'react'
import { Text, View } from 'react-native'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupBaseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [safeVisible, setSafeVisible] = React.useState(false)
  const [safeBottomVisible, setSafeBottomVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="展示弹出层" isLink onPress={() => setVisible(true)} />
      <Cell title="顶部安全区域可视化" isLink onPress={() => setSafeVisible(true)} />
      <Cell title="底部安全区域可视化" isLink onPress={() => setSafeBottomVisible(true)} />
      <Popup visible={visible} onClose={() => setVisible(false)}>
        <View style={{ paddingVertical: 30, paddingHorizontal: 50 }}>
          <Text>内容</Text>
        </View>
      </Popup>
      <Popup
        visible={safeVisible}
        onClose={() => setSafeVisible(false)}
        placement="top"
        safeAreaInsetTop
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>顶部安全区为浅橙色</Text>
        </View>
      </Popup>
      <Popup
        visible={safeBottomVisible}
        onClose={() => setSafeBottomVisible(false)}
        placement="bottom"
        safeAreaInsetBottom
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>底部安全区为浅橙色</Text>
        </View>
      </Popup>
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Text, View } from 'react-native'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupBaseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [safeVisible, setSafeVisible] = React.useState(false)
  const [safeBottomVisible, setSafeBottomVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="展示弹出层" isLink onPress={() => setVisible(true)} />
      <Cell title="顶部安全区域可视化" isLink onPress={() => setSafeVisible(true)} />
      <Cell title="底部安全区域可视化" isLink onPress={() => setSafeBottomVisible(true)} />
      <Popup visible={visible} onClose={() => setVisible(false)}>
        <View style={{ paddingVertical: 30, paddingHorizontal: 50 }}>
          <Text>内容</Text>
        </View>
      </Popup>
      <Popup
        visible={safeVisible}
        onClose={() => setSafeVisible(false)}
        placement="top"
        safeAreaInsetTop
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>顶部安全区为浅橙色</Text>
        </View>
      </Popup>
      <Popup
        visible={safeBottomVisible}
        onClose={() => setSafeBottomVisible(false)}
        placement="bottom"
        safeAreaInsetBottom
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>底部安全区为浅橙色</Text>
        </View>
      </Popup>
    </Cell.Group>
  )
}
`}},title:"基础用法",identifier:"popup-base",lang:"tsx",meta:{title:"基础用法"}},{Component:m,key:"popup-placement",sources:{_:{tsx:`import React from 'react'

import { Cell, Popup, type PopupPlacement } from 'react-native-system-ui'

export default function PopupPlacementDemo() {
  const [state, setState] = React.useState<PopupPlacement | ''>('')

  const close = () => setState('')

  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => setState('top')} />
      <Cell title="底部弹出" isLink onPress={() => setState('bottom')} />
      <Cell title="左侧弹出" isLink onPress={() => setState('left')} />
      <Cell title="右侧弹出" isLink onPress={() => setState('right')} />

      <Popup visible={state === 'top'} style={{ height: '30%' }} placement="top" onClose={close} />
      <Popup visible={state === 'bottom'} style={{ height: '30%' }} placement="bottom" onClose={close} />
      <Popup visible={state === 'left'} style={{ width: '30%', height: '100%' }} placement="left" onClose={close} />
      <Popup visible={state === 'right'} style={{ width: '30%', height: '100%' }} placement="right" onClose={close} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Popup, type PopupPlacement } from 'react-native-system-ui'

export default function PopupPlacementDemo() {
  const [state, setState] = React.useState<PopupPlacement | ''>('')

  const close = () => setState('')

  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => setState('top')} />
      <Cell title="底部弹出" isLink onPress={() => setState('bottom')} />
      <Cell title="左侧弹出" isLink onPress={() => setState('left')} />
      <Cell title="右侧弹出" isLink onPress={() => setState('right')} />

      <Popup visible={state === 'top'} style={{ height: '30%' }} placement="top" onClose={close} />
      <Popup visible={state === 'bottom'} style={{ height: '30%' }} placement="bottom" onClose={close} />
      <Popup visible={state === 'left'} style={{ width: '30%', height: '100%' }} placement="left" onClose={close} />
      <Popup visible={state === 'right'} style={{ width: '30%', height: '100%' }} placement="right" onClose={close} />
    </Cell.Group>
  )
}
`}},title:"弹出位置",identifier:"popup-placement",lang:"tsx",meta:{title:"弹出位置"}},{Component:f,key:"popup-closeable",sources:{_:{tsx:`import React from 'react'

import { Popup, Cell } from 'react-native-system-ui'
import { Fire } from 'react-native-system-icon'

export default function PopupCloseableDemo() {
  const [showCloseIcon, setShowCloseIcon] = React.useState(false)
  const [showCustomCloseIcon, setShowCustomCloseIcon] = React.useState(false)
  const [showCustomIconPosition, setShowCustomIconPosition] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="关闭图标" isLink onPress={() => setShowCloseIcon(true)} />
      <Cell title="自定义关闭图标" isLink onPress={() => setShowCustomCloseIcon(true)} />
      <Cell title="图标位置" isLink onPress={() => setShowCustomIconPosition(true)} />

      <Popup
        visible={showCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        onClose={() => setShowCloseIcon(false)}
      />
      <Popup
        visible={showCustomCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIcon={<Fire />}
        onClose={() => setShowCustomCloseIcon(false)}
      />
      <Popup
        visible={showCustomIconPosition}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIconPosition="top-left"
        onClose={() => setShowCustomIconPosition(false)}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Popup, Cell } from 'react-native-system-ui'
import { Fire } from 'react-native-system-icon'

export default function PopupCloseableDemo() {
  const [showCloseIcon, setShowCloseIcon] = React.useState(false)
  const [showCustomCloseIcon, setShowCustomCloseIcon] = React.useState(false)
  const [showCustomIconPosition, setShowCustomIconPosition] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="关闭图标" isLink onPress={() => setShowCloseIcon(true)} />
      <Cell title="自定义关闭图标" isLink onPress={() => setShowCustomCloseIcon(true)} />
      <Cell title="图标位置" isLink onPress={() => setShowCustomIconPosition(true)} />

      <Popup
        visible={showCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        onClose={() => setShowCloseIcon(false)}
      />
      <Popup
        visible={showCustomCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIcon={<Fire />}
        onClose={() => setShowCustomCloseIcon(false)}
      />
      <Popup
        visible={showCustomIconPosition}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIconPosition="top-left"
        onClose={() => setShowCustomIconPosition(false)}
      />
    </Cell.Group>
  )
}
`}},title:"关闭图标",identifier:"popup-closeable",lang:"tsx",meta:{title:"关闭图标"}},{Component:x,key:"popup-beforeclose",sources:{_:{tsx:`import React from 'react'

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { Cell, Popup, Space } from 'react-native-system-ui'

export default function PopupBeforeCloseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const beforeClose = async (reason: 'close-icon' | 'overlay' | 'close') => {
    if (loading) return false
    setLoading(true)
    return new Promise<boolean>(resolve => {
      setTimeout(() => resolve(true), 800)
    })
  }

  return (
    <Cell.Group>
      <Cell title="异步关闭" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="center"
        closeable
        beforeClose={beforeClose}
        onClose={() => setVisible(false)}
        onClosed={() => setLoading(false)}
        round
        style={styles.popup}
      >
        <View style={styles.dialog}>
          <Space direction="vertical" gap={12} align="center" block={false}>
            <Text style={styles.title}>异步关闭</Text>
            <Text style={styles.tip}>点击遮罩或关闭图标关闭（将等待 800ms）</Text>
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#64748b" />
                <Text style={styles.loading}>关闭中...</Text>
              </View>
            ) : null}
          </Space>
        </View>
      </Popup>
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  popup: {
    padding: 0,
  },
  dialog: {
    width: 280,
    paddingHorizontal: 24,
    paddingVertical: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  tip: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loading: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { Cell, Popup, Space } from 'react-native-system-ui'

export default function PopupBeforeCloseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const beforeClose = async (reason: 'close-icon' | 'overlay' | 'close') => {
    if (loading) return false
    setLoading(true)
    return new Promise<boolean>(resolve => {
      setTimeout(() => resolve(true), 800)
    })
  }

  return (
    <Cell.Group>
      <Cell title="异步关闭" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="center"
        closeable
        beforeClose={beforeClose}
        onClose={() => setVisible(false)}
        onClosed={() => setLoading(false)}
        round
        style={styles.popup}
      >
        <View style={styles.dialog}>
          <Space direction="vertical" gap={12} align="center" block={false}>
            <Text style={styles.title}>异步关闭</Text>
            <Text style={styles.tip}>点击遮罩或关闭图标关闭（将等待 800ms）</Text>
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#64748b" />
                <Text style={styles.loading}>关闭中...</Text>
              </View>
            ) : null}
          </Space>
        </View>
      </Popup>
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  popup: {
    padding: 0,
  },
  dialog: {
    width: 280,
    paddingHorizontal: 24,
    paddingVertical: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  tip: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loading: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
})
`}},title:"异步关闭",identifier:"popup-beforeclose",lang:"tsx",meta:{title:"异步关闭"}},{Component:C,key:"popup-round",sources:{_:{tsx:`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupRoundDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="圆角弹窗" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="bottom"
        closeable
        round
        onClose={() => setVisible(false)}
        style={{ height: '30%' }}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupRoundDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="圆角弹窗" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="bottom"
        closeable
        round
        onClose={() => setVisible(false)}
        style={{ height: '30%' }}
      />
    </Cell.Group>
  )
}
`}},title:"圆角",identifier:"popup-round",lang:"tsx",meta:{title:"圆角"}},{Component:b,key:"popup-title",sources:{_:{tsx:`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupTitleDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="标题弹框" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        closeable
        title="标题"
        description="这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述"
        style={{ height: '30%' }}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupTitleDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="标题弹框" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        closeable
        title="标题"
        description="这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述"
        style={{ height: '30%' }}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      />
    </Cell.Group>
  )
}

`}},title:"标题弹窗",identifier:"popup-title",lang:"tsx",meta:{title:"标题弹窗"}}],z={simulator:{compact:!0}},_=[{depth:1,text:"Popup 弹出层",id:"popup-弹出层"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"弹出位置",id:"弹出位置"},{depth:3,text:"关闭图标",id:"关闭图标"},{depth:3,text:"异步关闭",id:"异步关闭"},{depth:3,text:"圆角样式",id:"圆角样式"},{depth:3,text:"标题弹窗",id:"标题弹窗"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"},{depth:3,text:"类型定义",id:"类型定义"},{depth:2,text:"差异说明",id:"差异说明"}],M="/docs/components/popup.md",N="Popup 弹出层",H="1770373480000",fe=l=>l.children({MdContent:T,demos:G,frontmatter:z,slugs:_,filePath:M,title:N,updatedTime:H});export{T as MdContent,fe as default,G as demos,M as filePath,z as frontmatter,_ as slugs,N as title,H as updatedTime};
