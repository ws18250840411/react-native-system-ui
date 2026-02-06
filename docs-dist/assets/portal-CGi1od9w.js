import{R as a,j as e,V as n,s as o}from"./main-CC2DK3OK.js";import{C as i}from"./index-Dueh9AzQ.js";import{P as u}from"./Portal-D9I31KH1.js";import{M as b}from"./index-CN-rk8sC.js";import{T as d}from"./createComponentTokensHook-BcXZOvON.js";import{B as p}from"./index-BfHwmVBQ.js";import"./Arrow-CP2eQgBg.js";import"./IconBase-BNmvoXvm.js";import"./hairline-Bq3nniT3.js";import"./useAriaPress-DVn62gIQ.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./createPlatformShadow-BbOkyb5V.js";import"./color-BplLcdBL.js";import"./number-BG570ZaL.js";import"./index-BnjI8SiS.js";function f(){const[t,l]=a.useState(!1);return e.jsxs(i.Group,{children:[e.jsx(i,{title:"显示浮层",isLink:!0,onPress:()=>l(!0)}),t?e.jsx(u,{children:e.jsxs(n,{style:c.layer,pointerEvents:"box-none",children:[e.jsx(b,{style:c.mask,onPress:()=>l(!1)}),e.jsxs(n,{style:c.dialog,children:[e.jsx(d,{style:c.title,children:"这里是 Portal 内容"}),e.jsx(p,{type:"primary",block:!0,onPress:()=>l(!1),children:"我知道了"})]})]})}):null]})}const c=o.create({layer:{...o.absoluteFillObject,alignItems:"center",justifyContent:"center"},mask:{...o.absoluteFillObject,backgroundColor:"rgba(15,23,42,0.45)"},dialog:{width:260,paddingHorizontal:24,paddingVertical:28,borderRadius:14,backgroundColor:"#fff",shadowColor:"rgba(0, 0, 0, 0.1)",shadowOpacity:1,shadowRadius:12,shadowOffset:{width:0,height:8},elevation:6},title:{fontSize:16,fontWeight:"600",color:"#111",textAlign:"center",marginBottom:18}}),C=`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示浮层" isLink onPress={() => setVisible(true)} />
      {visible ? (
        <Portal>
          <View style={styles.layer} pointerEvents="box-none">
            <Pressable style={styles.mask} onPress={() => setVisible(false)} />
            <View style={styles.dialog}>
              <Text style={styles.title}>这里是 Portal 内容</Text>
              <Button type="primary" block onPress={() => setVisible(false)}>
                我知道了
              </Button>
            </View>
          </View>
        </Portal>
      ) : null}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.45)',
  },
  dialog: {
    width: 260,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 18,
  },
})
`,P={code:C,sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示浮层" isLink onPress={() => setVisible(true)} />
      {visible ? (
        <Portal>
          <View style={styles.layer} pointerEvents="box-none">
            <Pressable style={styles.mask} onPress={() => setVisible(false)} />
            <View style={styles.dialog}>
              <Text style={styles.title}>这里是 Portal 内容</Text>
              <Button type="primary" block onPress={() => setVisible(false)}>
                我知道了
              </Button>
            </View>
          </View>
        </Portal>
      ) : null}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.45)',
  },
  dialog: {
    width: 260,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 18,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示浮层" isLink onPress={() => setVisible(true)} />
      {visible ? (
        <Portal>
          <View style={styles.layer} pointerEvents="box-none">
            <Pressable style={styles.mask} onPress={() => setVisible(false)} />
            <View style={styles.dialog}>
              <Text style={styles.title}>这里是 Portal 内容</Text>
              <Button type="primary" block onPress={() => setVisible(false)}>
                我知道了
              </Button>
            </View>
          </View>
        </Portal>
      ) : null}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.45)',
  },
  dialog: {
    width: 260,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 18,
  },
})
`}},title:"基础用法",identifier:"portal-basic",lang:"tsx",meta:{title:"基础用法"}};function h(){const[t,l]=a.useState(!1),[s,y]=a.useState(!1);return e.jsxs(i.Group,{children:[e.jsx(i,{title:"显示提示层",isLink:!0,onPress:()=>l(!0)}),e.jsx(i,{title:"显示确认层",isLink:!0,onPress:()=>y(!0)}),(t||s)&&e.jsx(u,{children:e.jsxs(n,{pointerEvents:"box-none",style:o.absoluteFillObject,children:[t?e.jsxs(n,{style:[r.toast,r.tipToast],children:[e.jsx(d,{style:r.toastText,children:"这里是提示层"}),e.jsx(p,{size:"mini",onPress:()=>l(!1),children:"关闭提示层"})]}):null,s?e.jsxs(n,{style:[r.toast,r.confirmToast],children:[e.jsx(d,{style:r.toastText,children:"这里是确认层"}),e.jsx(p,{size:"mini",type:"primary",onPress:()=>y(!1),children:"关闭确认层"})]}):null]})})]})}const r=o.create({toast:{position:"absolute",left:24,right:24,padding:16,borderRadius:12,backgroundColor:"#1c1c1e",gap:12,alignItems:"flex-start"},tipToast:{top:120,backgroundColor:"rgba(0,0,0,0.85)"},confirmToast:{top:200,backgroundColor:"#1d4ed8"},toastText:{color:"#fff",fontSize:14}}),j=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalMultipleDemo() {
  const [tipVisible, setTipVisible] = React.useState(false)
  const [confirmVisible, setConfirmVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示提示层" isLink onPress={() => setTipVisible(true)} />
      <Cell title="显示确认层" isLink onPress={() => setConfirmVisible(true)} />

      {(tipVisible || confirmVisible) && (
        <Portal>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
            {tipVisible ? (
              <View style={[styles.toast, styles.tipToast]}>
                <Text style={styles.toastText}>这里是提示层</Text>
                <Button size="mini" onPress={() => setTipVisible(false)}>
                  关闭提示层
                </Button>
              </View>
            ) : null}
            {confirmVisible ? (
              <View style={[styles.toast, styles.confirmToast]}>
                <Text style={styles.toastText}>这里是确认层</Text>
                <Button size="mini" type="primary" onPress={() => setConfirmVisible(false)}>
                  关闭确认层
                </Button>
              </View>
            ) : null}
          </View>
        </Portal>
      )}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1c1c1e',
    gap: 12,
    alignItems: 'flex-start',
  },
  tipToast: {
    top: 120,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  confirmToast: {
    top: 200,
    backgroundColor: '#1d4ed8',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
})
`,V={code:j,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalMultipleDemo() {
  const [tipVisible, setTipVisible] = React.useState(false)
  const [confirmVisible, setConfirmVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示提示层" isLink onPress={() => setTipVisible(true)} />
      <Cell title="显示确认层" isLink onPress={() => setConfirmVisible(true)} />

      {(tipVisible || confirmVisible) && (
        <Portal>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
            {tipVisible ? (
              <View style={[styles.toast, styles.tipToast]}>
                <Text style={styles.toastText}>这里是提示层</Text>
                <Button size="mini" onPress={() => setTipVisible(false)}>
                  关闭提示层
                </Button>
              </View>
            ) : null}
            {confirmVisible ? (
              <View style={[styles.toast, styles.confirmToast]}>
                <Text style={styles.toastText}>这里是确认层</Text>
                <Button size="mini" type="primary" onPress={() => setConfirmVisible(false)}>
                  关闭确认层
                </Button>
              </View>
            ) : null}
          </View>
        </Portal>
      )}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1c1c1e',
    gap: 12,
    alignItems: 'flex-start',
  },
  tipToast: {
    top: 120,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  confirmToast: {
    top: 200,
    backgroundColor: '#1d4ed8',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalMultipleDemo() {
  const [tipVisible, setTipVisible] = React.useState(false)
  const [confirmVisible, setConfirmVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示提示层" isLink onPress={() => setTipVisible(true)} />
      <Cell title="显示确认层" isLink onPress={() => setConfirmVisible(true)} />

      {(tipVisible || confirmVisible) && (
        <Portal>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
            {tipVisible ? (
              <View style={[styles.toast, styles.tipToast]}>
                <Text style={styles.toastText}>这里是提示层</Text>
                <Button size="mini" onPress={() => setTipVisible(false)}>
                  关闭提示层
                </Button>
              </View>
            ) : null}
            {confirmVisible ? (
              <View style={[styles.toast, styles.confirmToast]}>
                <Text style={styles.toastText}>这里是确认层</Text>
                <Button size="mini" type="primary" onPress={() => setConfirmVisible(false)}>
                  关闭确认层
                </Button>
              </View>
            ) : null}
          </View>
        </Portal>
      )}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1c1c1e',
    gap: 12,
    alignItems: 'flex-start',
  },
  tipToast: {
    top: 120,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  confirmToast: {
    top: 200,
    backgroundColor: '#1d4ed8',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
})
`}},title:"多个浮层并行",identifier:"portal-multiple",lang:"tsx",meta:{title:"多个浮层并行"}};function m(){const t=a.useRef(null),l=()=>{const s=u.add(e.jsx(n,{pointerEvents:"box-none",style:o.absoluteFillObject,children:e.jsx(n,{style:x.toast,children:e.jsx(d,{style:x.toastText,children:"通过 Portal.add 插入节点"})})}));t.current=s,setTimeout(()=>{u.remove(s),t.current===s&&(t.current=null)},1500)};return a.useEffect(()=>()=>{t.current!==null&&u.remove(t.current)},[]),e.jsx(i.Group,{children:e.jsx(i,{title:"Portal.add 显示提示",isLink:!0,onPress:l})})}const x=o.create({toast:{position:"absolute",bottom:60,left:24,right:24,paddingVertical:12,paddingHorizontal:16,borderRadius:8,backgroundColor:"rgba(0,0,0,0.85)"},toastText:{color:"#fff",textAlign:"center"}}),g=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Cell, Portal } from 'react-native-system-ui'

export default function PortalStaticDemo() {
  const keyRef = React.useRef<number | null>(null)

  const showToast = () => {
    const key = Portal.add(
      <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
        <View style={styles.toast}>
          <Text style={styles.toastText}>通过 Portal.add 插入节点</Text>
        </View>
      </View>
    )
    keyRef.current = key
    setTimeout(() => {
      Portal.remove(key)
      if (keyRef.current === key) {
        keyRef.current = null
      }
    }, 1500)
  }

  React.useEffect(() => {
    return () => {
      if (keyRef.current !== null) {
        Portal.remove(keyRef.current)
      }
    }
  }, [])

  return (
    <Cell.Group>
      <Cell title="Portal.add 显示提示" isLink onPress={showToast} />
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
  },
})
`,F={code:g,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Cell, Portal } from 'react-native-system-ui'

export default function PortalStaticDemo() {
  const keyRef = React.useRef<number | null>(null)

  const showToast = () => {
    const key = Portal.add(
      <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
        <View style={styles.toast}>
          <Text style={styles.toastText}>通过 Portal.add 插入节点</Text>
        </View>
      </View>
    )
    keyRef.current = key
    setTimeout(() => {
      Portal.remove(key)
      if (keyRef.current === key) {
        keyRef.current = null
      }
    }, 1500)
  }

  React.useEffect(() => {
    return () => {
      if (keyRef.current !== null) {
        Portal.remove(keyRef.current)
      }
    }
  }, [])

  return (
    <Cell.Group>
      <Cell title="Portal.add 显示提示" isLink onPress={showToast} />
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Cell, Portal } from 'react-native-system-ui'

export default function PortalStaticDemo() {
  const keyRef = React.useRef<number | null>(null)

  const showToast = () => {
    const key = Portal.add(
      <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
        <View style={styles.toast}>
          <Text style={styles.toastText}>通过 Portal.add 插入节点</Text>
        </View>
      </View>
    )
    keyRef.current = key
    setTimeout(() => {
      Portal.remove(key)
      if (keyRef.current === key) {
        keyRef.current = null
      }
    }, 1500)
  }

  React.useEffect(() => {
    return () => {
      if (keyRef.current !== null) {
        Portal.remove(keyRef.current)
      }
    }
  }, [])

  return (
    <Cell.Group>
      <Cell title="Portal.add 显示提示" isLink onPress={showToast} />
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
  },
})
`}},title:"静态调用",identifier:"portal-static",lang:"tsx",meta:{title:"静态调用"}},E=function({previewer:t=()=>null,api:l=()=>null}){const s=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"portal-全局挂载","data-anchor":"portal-全局挂载",children:"Portal 全局挂载"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsxs("p",{children:["Portal 是 Overlay 的轻量包装，负责承载浮层内容。常见于弹窗、Toast 这类“脱离当前层级”的组件。静态 API 通过 ",e.jsx("code",{children:"PortalHost"})," 分发挂载事件，保证多个浮层按插入顺序叠加。"]}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(s,{code:"import { Portal } from 'react-native-system-ui'",lang:"js"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["组件与静态 API 都需要在应用入口处挂载一次 ",e.jsx("code",{children:"<Portal.Host>"}),"（或使用已经内置 PortalHost 的 ",e.jsx("code",{children:"ConfigProvider"}),"）。"]})}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["最常见的是在 ",e.jsx("code",{children:"Cell"}),"/按钮中触发展示，再由 ",e.jsx("code",{children:"Portal"})," 将浮层挂载到 Host 层。"]}),e.jsx("div",{children:e.jsx(s,{...P,children:e.jsx(f,{})})}),e.jsx("h3",{id:"多个浮层并行","data-anchor":"多个浮层并行",children:"多个浮层并行"}),e.jsxs("p",{children:[e.jsx("code",{children:"Portal"})," 通过 Host 统一承载多个浮层，可自由控制不同内容和蒙层。"]}),e.jsx("div",{children:e.jsx(s,{...V,children:e.jsx(h,{})})}),e.jsx("h3",{id:"静态调用","data-anchor":"静态调用",children:"静态调用"}),e.jsxs("p",{children:[e.jsx("code",{children:"Portal.add/Portal.remove"})," 便于封装 ",e.jsx("code",{children:"Toast.show"}),"、",e.jsx("code",{children:"Dialog.alert"})," 这类静态 API。"]}),e.jsx("div",{children:e.jsx(s,{...F,children:e.jsx(m,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"Portal 内部内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"null"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isOpen"})}),e.jsx("td",{children:"是否展示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsxs("td",{children:[e.jsx("code",{children:"isOpen"})," 的兼容别名"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"useRNModalOnAndroid"})}),e.jsxs("td",{children:["Android 端是否使用 ",e.jsx("code",{children:"Modal"})," 承载"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"useRNModal"})}),e.jsxs("td",{children:["强制使用 ",e.jsx("code",{children:"Modal"})," 承载"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onRequestClose"})}),e.jsxs("td",{children:[e.jsx("code",{children:"Modal"})," 关闭回调"]}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isKeyboardDismissable"})}),e.jsx("td",{children:"是否允许点击遮罩关闭键盘"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animationPreset"})}),e.jsxs("td",{children:["动画类型（",e.jsx("code",{children:"Modal"})," 或 Overlay 容器展示策略）"]}),e.jsx("td",{children:e.jsx("code",{children:"fade | slide | none"})}),e.jsx("td",{children:e.jsx("code",{children:"fade"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"Overlay 容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"ViewStyle"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"portalhost-props","data-anchor":"portalhost-props",children:"Portal.Host Props"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["建议全局只挂载一个 ",e.jsx("code",{children:"Portal.Host"}),"，避免多 Host 造成叠层管理混乱。"]})}),e.jsx("h3",{id:"静态方法","data-anchor":"静态方法",children:"静态方法"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Portal.Host"})}),e.jsx("td",{children:"顶层容器，需要在应用根部渲染一次，内部会把 Portal 队列渲染到页面最顶层。"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Portal.add(children, key?)"})}),e.jsxs("td",{children:["直接插入节点，返回的 key 可用于 ",e.jsx("code",{children:"Portal.remove"})," 或 ",e.jsx("code",{children:"Portal.update"}),"。"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Portal.remove(key)"})}),e.jsx("td",{children:"根据 key 移除节点。"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Portal.update(key, children)"})}),e.jsx("td",{children:"更新已经存在的节点内容。"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Portal.clear()"})}),e.jsx("td",{children:"清空当前所有挂载的 Portal 节点，常用于退出页面或文档切换时的兜底清理。"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["静态方法同样依赖已挂载的 ",e.jsx("code",{children:"PortalHost"}),"，请在应用入口处显式挂载一次。"]})}),e.jsx("h2",{id:"差异说明","data-anchor":"差异说明",children:"差异说明"}),e.jsx("ul",{children:e.jsxs("li",{children:["本库将 Portal 抽象为独立组件，便于跨端统一弹层出口与静态 API 实现（Web 框架通常以 ",e.jsx("code",{children:"teleport"})," 参数内置在弹层组件中）。"]})})]})})},T=[{Component:f,key:"portal-basic",sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示浮层" isLink onPress={() => setVisible(true)} />
      {visible ? (
        <Portal>
          <View style={styles.layer} pointerEvents="box-none">
            <Pressable style={styles.mask} onPress={() => setVisible(false)} />
            <View style={styles.dialog}>
              <Text style={styles.title}>这里是 Portal 内容</Text>
              <Button type="primary" block onPress={() => setVisible(false)}>
                我知道了
              </Button>
            </View>
          </View>
        </Portal>
      ) : null}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.45)',
  },
  dialog: {
    width: 260,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 18,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示浮层" isLink onPress={() => setVisible(true)} />
      {visible ? (
        <Portal>
          <View style={styles.layer} pointerEvents="box-none">
            <Pressable style={styles.mask} onPress={() => setVisible(false)} />
            <View style={styles.dialog}>
              <Text style={styles.title}>这里是 Portal 内容</Text>
              <Button type="primary" block onPress={() => setVisible(false)}>
                我知道了
              </Button>
            </View>
          </View>
        </Portal>
      ) : null}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.45)',
  },
  dialog: {
    width: 260,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 18,
  },
})
`}},title:"基础用法",identifier:"portal-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:h,key:"portal-multiple",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalMultipleDemo() {
  const [tipVisible, setTipVisible] = React.useState(false)
  const [confirmVisible, setConfirmVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示提示层" isLink onPress={() => setTipVisible(true)} />
      <Cell title="显示确认层" isLink onPress={() => setConfirmVisible(true)} />

      {(tipVisible || confirmVisible) && (
        <Portal>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
            {tipVisible ? (
              <View style={[styles.toast, styles.tipToast]}>
                <Text style={styles.toastText}>这里是提示层</Text>
                <Button size="mini" onPress={() => setTipVisible(false)}>
                  关闭提示层
                </Button>
              </View>
            ) : null}
            {confirmVisible ? (
              <View style={[styles.toast, styles.confirmToast]}>
                <Text style={styles.toastText}>这里是确认层</Text>
                <Button size="mini" type="primary" onPress={() => setConfirmVisible(false)}>
                  关闭确认层
                </Button>
              </View>
            ) : null}
          </View>
        </Portal>
      )}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1c1c1e',
    gap: 12,
    alignItems: 'flex-start',
  },
  tipToast: {
    top: 120,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  confirmToast: {
    top: 200,
    backgroundColor: '#1d4ed8',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalMultipleDemo() {
  const [tipVisible, setTipVisible] = React.useState(false)
  const [confirmVisible, setConfirmVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示提示层" isLink onPress={() => setTipVisible(true)} />
      <Cell title="显示确认层" isLink onPress={() => setConfirmVisible(true)} />

      {(tipVisible || confirmVisible) && (
        <Portal>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
            {tipVisible ? (
              <View style={[styles.toast, styles.tipToast]}>
                <Text style={styles.toastText}>这里是提示层</Text>
                <Button size="mini" onPress={() => setTipVisible(false)}>
                  关闭提示层
                </Button>
              </View>
            ) : null}
            {confirmVisible ? (
              <View style={[styles.toast, styles.confirmToast]}>
                <Text style={styles.toastText}>这里是确认层</Text>
                <Button size="mini" type="primary" onPress={() => setConfirmVisible(false)}>
                  关闭确认层
                </Button>
              </View>
            ) : null}
          </View>
        </Portal>
      )}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1c1c1e',
    gap: 12,
    alignItems: 'flex-start',
  },
  tipToast: {
    top: 120,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  confirmToast: {
    top: 200,
    backgroundColor: '#1d4ed8',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
})
`}},title:"多个浮层并行",identifier:"portal-multiple",lang:"tsx",meta:{title:"多个浮层并行"}},{Component:m,key:"portal-static",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Cell, Portal } from 'react-native-system-ui'

export default function PortalStaticDemo() {
  const keyRef = React.useRef<number | null>(null)

  const showToast = () => {
    const key = Portal.add(
      <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
        <View style={styles.toast}>
          <Text style={styles.toastText}>通过 Portal.add 插入节点</Text>
        </View>
      </View>
    )
    keyRef.current = key
    setTimeout(() => {
      Portal.remove(key)
      if (keyRef.current === key) {
        keyRef.current = null
      }
    }, 1500)
  }

  React.useEffect(() => {
    return () => {
      if (keyRef.current !== null) {
        Portal.remove(keyRef.current)
      }
    }
  }, [])

  return (
    <Cell.Group>
      <Cell title="Portal.add 显示提示" isLink onPress={showToast} />
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Cell, Portal } from 'react-native-system-ui'

export default function PortalStaticDemo() {
  const keyRef = React.useRef<number | null>(null)

  const showToast = () => {
    const key = Portal.add(
      <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
        <View style={styles.toast}>
          <Text style={styles.toastText}>通过 Portal.add 插入节点</Text>
        </View>
      </View>
    )
    keyRef.current = key
    setTimeout(() => {
      Portal.remove(key)
      if (keyRef.current === key) {
        keyRef.current = null
      }
    }, 1500)
  }

  React.useEffect(() => {
    return () => {
      if (keyRef.current !== null) {
        Portal.remove(keyRef.current)
      }
    }
  }, [])

  return (
    <Cell.Group>
      <Cell title="Portal.add 显示提示" isLink onPress={showToast} />
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
  },
})
`}},title:"静态调用",identifier:"portal-static",lang:"tsx",meta:{title:"静态调用"}}],k={simulator:{compact:!0}},v=[{depth:1,text:"Portal 全局挂载",id:"portal-全局挂载"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"多个浮层并行",id:"多个浮层并行"},{depth:3,text:"静态调用",id:"静态调用"},{depth:2,text:"API",id:"api"},{depth:3,text:"Portal.Host Props",id:"portalhost-props"},{depth:3,text:"静态方法",id:"静态方法"},{depth:2,text:"差异说明",id:"差异说明"}],w="/docs/components/portal.md",S="Portal 全局挂载",B="1770373480000",J=t=>t.children({MdContent:E,demos:T,frontmatter:k,slugs:v,filePath:w,title:S,updatedTime:B});export{E as MdContent,J as default,T as demos,w as filePath,k as frontmatter,v as slugs,S as title,B as updatedTime};
