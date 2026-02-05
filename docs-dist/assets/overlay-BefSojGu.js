import{R as o,j as e,O as a,V as r,s as n}from"./main-O6KZrSH_.js";import{O as u}from"./Overlay-CmwAk_J5.js";import{B as c}from"./index-DzU_0rvq.js";import{M as d}from"./index-DvCZppP1.js";import{L as b}from"./Loading-CdSfkQu4.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./color-cEGfwRja.js";import"./number-BcSDXImJ.js";import"./createPlatformShadow-BbOkyb5V.js";import"./createComponentTokensHook-KzOuLm4c.js";import"./useAriaPress-DMjZXFvR.js";import"./index-ANZ1PvOD.js";function y(){const[s,t]=o.useState(!1);return e.jsx(a,{children:e.jsxs(r,{style:{alignItems:"flex-start"},children:[e.jsx(c,{type:"primary",onPress:()=>t(!0),children:"显示遮罩"}),e.jsx(u,{isOpen:s,onRequestClose:()=>t(!1),style:n.absoluteFillObject,children:e.jsx(d,{style:{...n.absoluteFillObject,backgroundColor:"rgba(0,0,0,0.6)"},onPress:()=>t(!1)})})]})})}const h=`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`,x={code:h,sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`}},title:"基础用法",identifier:"overlay-basic",lang:"tsx",meta:{title:"基础用法"}};function v(){const[s,t]=o.useState(!1);return e.jsx(a,{children:e.jsxs(r,{style:{alignItems:"flex-start"},children:[e.jsx(c,{onPress:()=>t(!0),children:"加载中"}),e.jsxs(u,{isOpen:s,onRequestClose:()=>t(!1),style:n.absoluteFillObject,children:[e.jsx(d,{style:[n.absoluteFillObject,{backgroundColor:"rgba(0,0,0,0.6)"}],onPress:()=>t(!1)}),e.jsx(r,{style:i.center,pointerEvents:"box-none",children:e.jsx(r,{style:i.content,children:e.jsx(b,{children:"加载中..."})})})]})]})})}const i=n.create({center:{...n.absoluteFillObject,alignItems:"center",justifyContent:"center"},content:{alignItems:"center",padding:24,borderRadius:6,backgroundColor:"#ffffff"}}),f=`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`,j={code:f,sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`}},title:"自定义内容",identifier:"overlay-content",lang:"tsx",meta:{title:"自定义内容"}},m=function({previewer:s=()=>null,api:t=()=>null}){const l=s;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"overlay-遮罩层","data-anchor":"overlay-遮罩层",children:"Overlay 遮罩层"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"创建一个全屏遮罩，用于阻止背景交互、强调浮层内容。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(l,{code:"import { Overlay, OverlayProvider } from 'react-native-system-ui'",lang:"js"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["Overlay 依赖 ",e.jsx("code",{children:"<OverlayProvider>"})," 作为宿主容器；如果你已经使用 ",e.jsx("code",{children:"PortalHost"}),"/",e.jsx("code",{children:"ConfigProvider"}),"，则无需额外包裹。"]})}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(l,{...x,children:e.jsx(y,{})})}),e.jsx("h3",{id:"自定义内容","data-anchor":"自定义内容",children:"自定义内容"}),e.jsx("div",{children:e.jsx(l,{...j,children:e.jsx(v,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isOpen"})}),e.jsx("td",{children:"是否显示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsxs("td",{children:[e.jsx("code",{children:"isOpen"})," 的兼容别名"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"useRNModalOnAndroid"})}),e.jsxs("td",{children:["Android 端是否使用 ",e.jsx("code",{children:"Modal"})," 承载"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"useRNModal"})}),e.jsxs("td",{children:["强制使用 ",e.jsx("code",{children:"Modal"})," 承载"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onRequestClose"})}),e.jsxs("td",{children:[e.jsx("code",{children:"Modal"})," 关闭回调"]}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isKeyboardDismissable"})}),e.jsx("td",{children:"是否允许点击遮罩关闭键盘"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animationPreset"})}),e.jsxs("td",{children:["动画类型（",e.jsx("code",{children:"Modal"})," 或 Overlay 容器展示策略）"]}),e.jsx("td",{children:e.jsx("code",{children:"fade | slide | none"})}),e.jsx("td",{children:e.jsx("code",{children:"fade"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"Overlay 容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"Overlay 内部内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]})]})]})]})})},p=[{Component:y,key:"overlay-basic",sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`}},title:"基础用法",identifier:"overlay-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:v,key:"overlay-content",sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`}},title:"自定义内容",identifier:"overlay-content",lang:"tsx",meta:{title:"自定义内容"}}],O={simulator:{compact:!1}},P=[{depth:1,text:"Overlay 遮罩层",id:"overlay-遮罩层"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义内容",id:"自定义内容"},{depth:2,text:"API",id:"api"}],V="/docs/components/overlay.md",S="Overlay 遮罩层",F="1770111044000",_=s=>s.children({MdContent:m,demos:p,frontmatter:O,slugs:P,filePath:V,title:S,updatedTime:F});export{m as MdContent,_ as default,p as demos,V as filePath,O as frontmatter,P as slugs,S as title,F as updatedTime};
