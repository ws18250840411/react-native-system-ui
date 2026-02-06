import{j as e,V as r,r as p}from"./main-CC2DK3OK.js";import{C as t}from"./index-Dueh9AzQ.js";import{D as n}from"./index-D03jSN7d.js";import{T as C}from"./createComponentTokensHook-BcXZOvON.js";import{T as s}from"./index-CYc3exVx.js";import{S as g}from"./Close-BKbx2ovl.js";import{I as j}from"./index-D_JlQYPg.js";import"./Arrow-CP2eQgBg.js";import"./IconBase-BNmvoXvm.js";import"./hairline-Bq3nniT3.js";import"./index-CN-rk8sC.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-DVn62gIQ.js";import"./index-CJrLMJTa.js";import"./useLocale-B4lUqsPR.js";import"./promise-DzoogS-n.js";import"./index-BfHwmVBQ.js";import"./createPlatformShadow-BbOkyb5V.js";import"./color-BplLcdBL.js";import"./number-BG570ZaL.js";import"./index-BnjI8SiS.js";import"./Popup-G3cXoDWN.js";import"./Portal-D9I31KH1.js";import"./Animated-C-b5K9fC.js";import"./index-Cakcz3d2.js";import"./index-CCOraIhd.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-xa377Hoz.js";import"./index-BP7Blb5n.js";import"./SafeAreaView-CgItGtgs.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./Loading-_9EKEhr2.js";import"./Checked-BJm2Hkef.js";function u(){return e.jsxs(t.Group,{children:[e.jsx(t,{title:"弹窗提示",isLink:!0,onPress:()=>n.confirm({title:"标题",message:"代码是写出来给人看的，附带能在机器上运行",onCancel:()=>console.log("cancel"),onConfirm:()=>console.log("confirm")})}),e.jsx(t,{title:"弹窗提示（无标题）",isLink:!0,onPress:()=>n.alert({message:"代码是写出来给人看的，附带能在机器上运行"})}),e.jsx(t,{title:"确认弹框",isLink:!0,onPress:()=>n.confirm({title:"标题",message:"代码是写出来给人看的，附带能在机器上运行"})})]})}const D=`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="弹窗提示"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onCancel: () => console.log('cancel'),
            onConfirm: () => console.log('confirm'),
          })
        }
      />
      <Cell
        title="弹窗提示（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="确认弹框"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`,f={code:D,sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="弹窗提示"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onCancel: () => console.log('cancel'),
            onConfirm: () => console.log('confirm'),
          })
        }
      />
      <Cell
        title="弹窗提示（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="确认弹框"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="弹窗提示"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onCancel: () => console.log('cancel'),
            onConfirm: () => console.log('confirm'),
          })
        }
      />
      <Cell
        title="弹窗提示（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="确认弹框"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"基础用法",card:!0,identifier:"dialog-base",lang:"tsx",meta:{title:"基础用法",card:!0}};function c(){return e.jsxs(t.Group,{children:[e.jsx(t,{title:"Dialog.alert",isLink:!0,onPress:async()=>{await n.alert({title:"标题",message:"代码是写出来给人看的，附带能在机器上运行"}),console.log("confirm")}}),e.jsx(t,{title:"Dialog.confirm",isLink:!0,onPress:async()=>{try{await n.confirm({title:"标题",message:"代码是写出来给人看的，附带能在机器上运行"}),console.log("confirm")}catch{console.log("cancel")}}})]})}const F=`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogPromiseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="Dialog.alert"
        isLink
        onPress={async () => {
          await Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
          console.log('confirm')
        }}
      />
      <Cell
        title="Dialog.confirm"
        isLink
        onPress={async () => {
          try {
            await Dialog.confirm({
              title: '标题',
              message: '代码是写出来给人看的，附带能在机器上运行',
            })
            console.log('confirm')
          } catch (error) {
            console.log('cancel')
          }
        }}
      />
    </Cell.Group>
  )
}

`,E={code:F,sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogPromiseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="Dialog.alert"
        isLink
        onPress={async () => {
          await Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
          console.log('confirm')
        }}
      />
      <Cell
        title="Dialog.confirm"
        isLink
        onPress={async () => {
          try {
            await Dialog.confirm({
              title: '标题',
              message: '代码是写出来给人看的，附带能在机器上运行',
            })
            console.log('confirm')
          } catch (error) {
            console.log('cancel')
          }
        }}
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogPromiseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="Dialog.alert"
        isLink
        onPress={async () => {
          await Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
          console.log('confirm')
        }}
      />
      <Cell
        title="Dialog.confirm"
        isLink
        onPress={async () => {
          try {
            await Dialog.confirm({
              title: '标题',
              message: '代码是写出来给人看的，附带能在机器上运行',
            })
            console.log('confirm')
          } catch (error) {
            console.log('cancel')
          }
        }}
      />
    </Cell.Group>
  )
}

`}},title:"Promise调用",card:!0,identifier:"dialog-promise",lang:"tsx",meta:{title:"Promise调用",card:!0}};function a(){return e.jsxs(t.Group,{children:[e.jsx(t,{title:"圆角按钮弹窗",isLink:!0,onPress:()=>n.confirm({title:"标题",theme:"round-button",showCancelButton:!0,message:"代码是写出来给人看的，附带能在机器上运行"})}),e.jsx(t,{title:"圆角按钮弹窗（无标题）",isLink:!0,onPress:()=>n.alert({message:"代码是写出来给人看的，附带能在机器上运行",theme:"round-button"})})]})}const v=`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogThemeDemo() {
  return (
    <Cell.Group>
      <Cell
        title="圆角按钮弹窗"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            theme: 'round-button',
            showCancelButton: true,
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="圆角按钮弹窗（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
            theme: 'round-button',
          })
        }
      />
    </Cell.Group>
  )
}
`,y={code:v,sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogThemeDemo() {
  return (
    <Cell.Group>
      <Cell
        title="圆角按钮弹窗"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            theme: 'round-button',
            showCancelButton: true,
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="圆角按钮弹窗（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
            theme: 'round-button',
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogThemeDemo() {
  return (
    <Cell.Group>
      <Cell
        title="圆角按钮弹窗"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            theme: 'round-button',
            showCancelButton: true,
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="圆角按钮弹窗（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
            theme: 'round-button',
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"圆角按钮风格",card:!0,identifier:"dialog-theme",lang:"tsx",meta:{title:"圆角按钮风格",card:!0}};function d(){return e.jsx(t.Group,{children:e.jsx(t,{title:"自定义内容",isLink:!0,onPress:()=>n.alert({title:"标题",closeable:!0,theme:"round-button",message:e.jsx(r,{style:{alignItems:"center",margin:16},children:e.jsx(C,{style:{textAlign:"center"},children:"自定义内容：代码是写出来给人看的，附带能在机器上运行"})})})})})}const P=`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Text, View } from 'react-native'

export default function DialogCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义内容"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: (
              <View style={{ alignItems: 'center', margin: 16 }}>
                <Text style={{ textAlign: 'center' }}>
                  自定义内容：代码是写出来给人看的，附带能在机器上运行
                </Text>
              </View>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`,A={code:P,sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Text, View } from 'react-native'

export default function DialogCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义内容"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: (
              <View style={{ alignItems: 'center', margin: 16 }}>
                <Text style={{ textAlign: 'center' }}>
                  自定义内容：代码是写出来给人看的，附带能在机器上运行
                </Text>
              </View>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Text, View } from 'react-native'

export default function DialogCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义内容"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: (
              <View style={{ alignItems: 'center', margin: 16 }}>
                <Text style={{ textAlign: 'center' }}>
                  自定义内容：代码是写出来给人看的，附带能在机器上运行
                </Text>
              </View>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"自定义内容",card:!0,identifier:"dialog-custom",lang:"tsx",meta:{title:"自定义内容",card:!0}};function m(){return e.jsxs(t.Group,{children:[e.jsx(t,{title:"完全关闭后的回调",isLink:!0,onPress:()=>n.alert({title:"标题",message:"代码是写出来给人看的，附带能在机器上运行",onClosed:()=>console.log("onClosed")})}),e.jsx(t,{title:"异步关闭",isLink:!0,onPress:()=>n.show({title:"标题",message:"弹窗内容",showCancelButton:!0,onCancel:()=>new Promise(i=>{setTimeout(()=>{i(!0),s.success("取消按钮异步")},3e3)}),onConfirm:()=>new Promise(i=>{setTimeout(()=>{i(!0),s.success("确认按钮异步")},3e3)})})})]})}const B=`import React from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'

export default function DialogCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="完全关闭后的回调"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onClosed: () => console.log('onClosed'),
          })
        }
      />
      <Cell
        title="异步关闭"
        isLink
        onPress={() =>
          Dialog.show({
            title: '标题',
            message: '弹窗内容',
            showCancelButton: true,
            onCancel: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('取消按钮异步')
                }, 3000)
              })
            },
            onConfirm: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('确认按钮异步')
                }, 3000)
              })
            },
          })
        }
      />
    </Cell.Group>
  )
}

`,b={code:B,sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'

export default function DialogCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="完全关闭后的回调"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onClosed: () => console.log('onClosed'),
          })
        }
      />
      <Cell
        title="异步关闭"
        isLink
        onPress={() =>
          Dialog.show({
            title: '标题',
            message: '弹窗内容',
            showCancelButton: true,
            onCancel: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('取消按钮异步')
                }, 3000)
              })
            },
            onConfirm: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('确认按钮异步')
                }, 3000)
              })
            },
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'

export default function DialogCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="完全关闭后的回调"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onClosed: () => console.log('onClosed'),
          })
        }
      />
      <Cell
        title="异步关闭"
        isLink
        onPress={() =>
          Dialog.show({
            title: '标题',
            message: '弹窗内容',
            showCancelButton: true,
            onCancel: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('取消按钮异步')
                }, 3000)
              })
            },
            onConfirm: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('确认按钮异步')
                }, 3000)
              })
            },
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"关闭弹出框",card:!0,identifier:"dialog-close",lang:"tsx",meta:{title:"关闭弹出框",card:!0}};function h(){return e.jsxs(t.Group,{children:[e.jsx(t,{title:"关闭按钮",isLink:!0,onPress:()=>n.alert({title:"标题",closeable:!0,theme:"round-button",message:"代码是写出来给人看的，附带能在机器上运行"})}),e.jsx(t,{title:"自定义关闭按钮",isLink:!0,onPress:()=>n.alert({title:"标题",closeable:!0,closeIcon:e.jsx(g,{}),theme:"round-button",message:"代码是写出来给人看的，附带能在机器上运行"})})]})}const w=`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Close } from 'react-native-system-icon'

export default function DialogCloseIconDemo() {
  return (
    <Cell.Group>
      <Cell
        title="关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="自定义关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            closeIcon: <Close />,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`,k={code:w,sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Close } from 'react-native-system-icon'

export default function DialogCloseIconDemo() {
  return (
    <Cell.Group>
      <Cell
        title="关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="自定义关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            closeIcon: <Close />,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Close } from 'react-native-system-icon'

export default function DialogCloseIconDemo() {
  return (
    <Cell.Group>
      <Cell
        title="关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="自定义关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            closeIcon: <Close />,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"关闭按钮",card:!0,identifier:"dialog-closeicon",lang:"tsx",meta:{title:"关闭按钮",card:!0}};function x(){const[i,o]=p.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"组件调用",isLink:!0,onPress:()=>o(!0)}),e.jsx(n,{visible:i,title:"标题",showCancelButton:!0,onConfirm:()=>{s.info("点击确认按钮"),o(!1)},onCancel:()=>o(!1),children:e.jsx(r,{style:{alignItems:"center",padding:16},children:e.jsx(j,{source:{uri:"https://img.yzcdn.cn/vant/apple-3.jpg"},style:{width:200,height:200,borderRadius:8},resizeMode:"cover"})})})]})}const L=`import React, { useState } from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'
import { Image, View } from 'react-native'

export default function DialogComponentDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="标题"
        showCancelButton
        onConfirm={() => {
          Toast.info('点击确认按钮')
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      >
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Image
            source={{ uri: 'https://img.yzcdn.cn/vant/apple-3.jpg' }}
            style={{ width: 200, height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </Dialog>
    </>
  )
}

`,T={code:L,sources:{_:{tsx:`import React, { useState } from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'
import { Image, View } from 'react-native'

export default function DialogComponentDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="标题"
        showCancelButton
        onConfirm={() => {
          Toast.info('点击确认按钮')
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      >
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Image
            source={{ uri: 'https://img.yzcdn.cn/vant/apple-3.jpg' }}
            style={{ width: 200, height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </Dialog>
    </>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React, { useState } from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'
import { Image, View } from 'react-native'

export default function DialogComponentDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="标题"
        showCancelButton
        onConfirm={() => {
          Toast.info('点击确认按钮')
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      >
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Image
            source={{ uri: 'https://img.yzcdn.cn/vant/apple-3.jpg' }}
            style={{ width: 200, height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </Dialog>
    </>
  )
}

`}},title:"组件调用",card:!0,identifier:"dialog-component",lang:"tsx",meta:{title:"组件调用",card:!0}},G=function({previewer:i=()=>null,api:o=()=>null}){const l=i;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"dialog-弹出框","data-anchor":"dialog-弹出框",children:"Dialog 弹出框"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsxs("p",{children:["模态对话框组件，常用于消息提示、操作确认等场景，同时支持函数式调用（",e.jsx("code",{children:"Dialog.alert"})," / ",e.jsx("code",{children:"Dialog.confirm"}),"）与受控组件两种用法。"]}),e.jsxs("p",{children:["弹出框组件支持函数调用和组件调用两种方式。使用前需在应用根节点包裹 ",e.jsx("strong",{children:"ConfigProvider"})," 或 ",e.jsx("strong",{children:"Portal.Host"}),"，否则弹层无法挂载。详见 ",e.jsx("a",{href:"./config-provider.md",children:"ConfigProvider"})," / ",e.jsx("a",{href:"./portal.md",children:"Portal"}),"。"]}),e.jsx("h3",{id:"函数调用","data-anchor":"函数调用",children:"函数调用"}),e.jsx("p",{children:"Dialog 是一个函数，调用后会直接在页面中弹出相应的模态框。"}),e.jsx(l,{code:"import { Dialog } from 'react-native-system-ui';",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"消息提示","data-anchor":"消息提示",children:"消息提示"}),e.jsx("p",{children:"用于提示一些消息，只包含一个确认按钮。"}),e.jsx(l,{...f,children:e.jsx(u,{})}),e.jsx("h3",{id:"promise-调用","data-anchor":"promise-调用",children:"Promise 调用"}),e.jsx("p",{children:"Dialog 支持 promise"}),e.jsx(l,{...E,children:e.jsx(c,{})}),e.jsx("h3",{id:"圆角按钮风格","data-anchor":"圆角按钮风格",children:"圆角按钮风格"}),e.jsxs("p",{children:["将 theme 选项设置为 ",e.jsx("code",{children:"round-button"})," 可以展示圆角按钮风格的弹窗。"]}),e.jsx(l,{...y,children:e.jsx(a,{})}),e.jsx("h3",{id:"自定义内容","data-anchor":"自定义内容",children:"自定义内容"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"children"})," 属性可以传入 ",e.jsx("code",{children:"ReactNode"}),", 来自定义显示的内容。"]}),e.jsx(l,{...A,children:e.jsx(d,{})}),e.jsx("h3",{id:"关闭弹出框","data-anchor":"关闭弹出框",children:"关闭弹出框"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"onConfirm"})," 和 ",e.jsx("code",{children:"onCancel"})," 属性返回",e.jsx("code",{children:"Promise"}),"函数，在弹窗关闭前进行特定操作。"]}),e.jsx(l,{...b,children:e.jsx(m,{})}),e.jsx("h3",{id:"关闭按钮","data-anchor":"关闭按钮",children:"关闭按钮"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"closeable"})," 可以显示关闭按钮你，通过 ",e.jsx("code",{children:"closeIcon"})," 可以自定义按钮内容。"]}),e.jsx(l,{...k,children:e.jsx(h,{})}),e.jsx("h3",{id:"组件调用","data-anchor":"组件调用",children:"组件调用"}),e.jsx("p",{children:"如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式。"}),e.jsx(l,{...T,children:e.jsx(x,{})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"方法","data-anchor":"方法",children:"方法"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"参数"}),e.jsx("th",{children:"返回值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Dialog"})}),e.jsx("td",{children:"弹窗组件"}),e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:e.jsx("code",{children:"React.ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Dialog.show"})}),e.jsx("td",{children:"展示提示弹窗"}),e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:e.jsx("code",{children:"Promise"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Dialog.alert"})}),e.jsx("td",{children:"展示消息提示弹窗"}),e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:e.jsx("code",{children:"Promise"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Dialog.confirm"})}),e.jsx("td",{children:"展示消息确认弹窗"}),e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:e.jsx("code",{children:"Promise"})})]})]})]}),e.jsx("h4",{id:"注意","data-anchor":"注意",children:"注意"}),e.jsxs("p",{children:["对于指令式创建出来的 ",e.jsx("code",{children:"Dialog"}),"，并不会感知父组件的重渲染和其中 ",e.jsx("code",{children:"state"})," 的更新，因此下面这种写法是完全错误的："]}),e.jsx(l,{code:`export default function App() {
  const [captcha, setCaptcha] = useState('');
  const showCaptcha = () => {
    return Dialog.confirm({
      title: '短信验证',
      message: (
        <Field
          placeholder="请输入验证码"
          value={captcha} // App 中 captcha 的更新是不会传递到 Dialog 中的
          onChange={setCaptcha}
        />
      ),
    });
  };
  return <Button onPress={showCaptcha} text="Show Dialog" />;
}`,lang:"jsx"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["如果你需要在 ",e.jsx("code",{children:"Dialog"})," 中包含很多复杂的状态和逻辑，那么可以使用",e.jsx("strong",{children:"声明式"}),"的语法，或者考虑自己将内部状态和逻辑单独封装一个组件出来(",e.jsx("a",{href:"https://stackblitz.com/edit/react-ubsjro-tbmdt8?file=src%2FApp.tsx",children:"demo"}),")"]})}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("p",{children:["通过函数调用 ",e.jsx("code",{children:"Dialog"})," 时，支持传入以下选项："]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示弹窗"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"width"})}),e.jsxs("td",{children:["弹窗宽度，默认单位为 ",e.jsx("code",{children:"px"})]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"320"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"message"})}),e.jsxs("td",{children:["文本内容，支持通过 ",e.jsx("code",{children:"\\n"})," 换行"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"messageAlign"})}),e.jsx("td",{children:"内容对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"'left' | 'center' | 'right'"})}),e.jsx("td",{children:e.jsx("code",{children:"'center'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"theme"})}),e.jsx("td",{children:"样式风格"}),e.jsx("td",{children:e.jsx("code",{children:"'default' | 'round-button'"})}),e.jsx("td",{children:e.jsx("code",{children:"'default'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否展示关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIcon"})}),e.jsx("td",{children:"自定义关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showConfirmButton"})}),e.jsx("td",{children:"是否展示确认按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showCancelButton"})}),e.jsx("td",{children:"是否展示取消按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"confirmButtonText"})}),e.jsx("td",{children:"确认按钮文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'确认'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"confirmButtonColor"})}),e.jsx("td",{children:"确认按钮颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"confirmProps"})}),e.jsxs("td",{children:["确认按钮扩展状态（",e.jsx("code",{children:"loading"}),"/",e.jsx("code",{children:"disabled"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"DialogActionState"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelButtonText"})}),e.jsx("td",{children:"取消按钮文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'取消'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelButtonColor"})}),e.jsx("td",{children:"取消按钮颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题默认色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelProps"})}),e.jsxs("td",{children:["取消按钮扩展状态（",e.jsx("code",{children:"loading"}),"/",e.jsx("code",{children:"disabled"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"DialogActionState"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlay"})}),e.jsx("td",{children:"是否展示遮罩层"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlayStyle"})}),e.jsx("td",{children:"自定义遮罩层样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnBackPress"})}),e.jsx("td",{children:"Android 返回键是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnPopstate"})}),e.jsx("td",{children:"浏览器返回（popstate）是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"closeOnOverlayPress"})," / ",e.jsx("code",{children:"closeOnClickOverlay"})]}),e.jsx("td",{children:"点击遮罩层后是否关闭弹窗"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"beforeClose"})}),e.jsxs("td",{children:["关闭前回调，返回 ",e.jsx("code",{children:"false"})," 可阻止关闭（支持 Promise）"]}),e.jsx("td",{children:e.jsx("code",{children:"(action: 'confirm' | 'cancel' | 'close') => boolean | Promise<boolean>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"footer"})}),e.jsx("td",{children:"自定义底部按钮区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"contentStyle"})}),e.jsx("td",{children:"内容区样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleStyle"})}),e.jsx("td",{children:"标题样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"messageStyle"})}),e.jsx("td",{children:"消息文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tokensOverride"})}),e.jsx("td",{children:"覆盖 Dialog tokens"}),e.jsx("td",{children:e.jsx("code",{children:"DeepPartial<DialogTokens>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onConfirm"})}),e.jsx("td",{children:"点击确认按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"Dialog 关闭时的回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClosed"})}),e.jsx("td",{children:"Dialog 完全关闭（动画结束）时的回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["支持通过主题的 ",e.jsx("code",{children:"components.dialog"})," 覆盖 tokens，统一控制弹窗宽度、圆角、配色等设计语言。"]})})]})})},R=[{Component:u,key:"dialog-base",sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="弹窗提示"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onCancel: () => console.log('cancel'),
            onConfirm: () => console.log('confirm'),
          })
        }
      />
      <Cell
        title="弹窗提示（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="确认弹框"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="弹窗提示"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onCancel: () => console.log('cancel'),
            onConfirm: () => console.log('confirm'),
          })
        }
      />
      <Cell
        title="弹窗提示（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="确认弹框"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"基础用法",card:!0,identifier:"dialog-base",lang:"tsx",meta:{title:"基础用法",card:!0}},{Component:c,key:"dialog-promise",sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogPromiseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="Dialog.alert"
        isLink
        onPress={async () => {
          await Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
          console.log('confirm')
        }}
      />
      <Cell
        title="Dialog.confirm"
        isLink
        onPress={async () => {
          try {
            await Dialog.confirm({
              title: '标题',
              message: '代码是写出来给人看的，附带能在机器上运行',
            })
            console.log('confirm')
          } catch (error) {
            console.log('cancel')
          }
        }}
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogPromiseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="Dialog.alert"
        isLink
        onPress={async () => {
          await Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
          console.log('confirm')
        }}
      />
      <Cell
        title="Dialog.confirm"
        isLink
        onPress={async () => {
          try {
            await Dialog.confirm({
              title: '标题',
              message: '代码是写出来给人看的，附带能在机器上运行',
            })
            console.log('confirm')
          } catch (error) {
            console.log('cancel')
          }
        }}
      />
    </Cell.Group>
  )
}

`}},title:"Promise调用",card:!0,identifier:"dialog-promise",lang:"tsx",meta:{title:"Promise调用",card:!0}},{Component:a,key:"dialog-theme",sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogThemeDemo() {
  return (
    <Cell.Group>
      <Cell
        title="圆角按钮弹窗"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            theme: 'round-button',
            showCancelButton: true,
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="圆角按钮弹窗（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
            theme: 'round-button',
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogThemeDemo() {
  return (
    <Cell.Group>
      <Cell
        title="圆角按钮弹窗"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            theme: 'round-button',
            showCancelButton: true,
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="圆角按钮弹窗（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
            theme: 'round-button',
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"圆角按钮风格",card:!0,identifier:"dialog-theme",lang:"tsx",meta:{title:"圆角按钮风格",card:!0}},{Component:d,key:"dialog-custom",sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Text, View } from 'react-native'

export default function DialogCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义内容"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: (
              <View style={{ alignItems: 'center', margin: 16 }}>
                <Text style={{ textAlign: 'center' }}>
                  自定义内容：代码是写出来给人看的，附带能在机器上运行
                </Text>
              </View>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Text, View } from 'react-native'

export default function DialogCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义内容"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: (
              <View style={{ alignItems: 'center', margin: 16 }}>
                <Text style={{ textAlign: 'center' }}>
                  自定义内容：代码是写出来给人看的，附带能在机器上运行
                </Text>
              </View>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"自定义内容",card:!0,identifier:"dialog-custom",lang:"tsx",meta:{title:"自定义内容",card:!0}},{Component:m,key:"dialog-close",sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'

export default function DialogCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="完全关闭后的回调"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onClosed: () => console.log('onClosed'),
          })
        }
      />
      <Cell
        title="异步关闭"
        isLink
        onPress={() =>
          Dialog.show({
            title: '标题',
            message: '弹窗内容',
            showCancelButton: true,
            onCancel: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('取消按钮异步')
                }, 3000)
              })
            },
            onConfirm: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('确认按钮异步')
                }, 3000)
              })
            },
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'

export default function DialogCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="完全关闭后的回调"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onClosed: () => console.log('onClosed'),
          })
        }
      />
      <Cell
        title="异步关闭"
        isLink
        onPress={() =>
          Dialog.show({
            title: '标题',
            message: '弹窗内容',
            showCancelButton: true,
            onCancel: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('取消按钮异步')
                }, 3000)
              })
            },
            onConfirm: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('确认按钮异步')
                }, 3000)
              })
            },
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"关闭弹出框",card:!0,identifier:"dialog-close",lang:"tsx",meta:{title:"关闭弹出框",card:!0}},{Component:h,key:"dialog-closeicon",sources:{_:{tsx:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Close } from 'react-native-system-icon'

export default function DialogCloseIconDemo() {
  return (
    <Cell.Group>
      <Cell
        title="关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="自定义关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            closeIcon: <Close />,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Close } from 'react-native-system-icon'

export default function DialogCloseIconDemo() {
  return (
    <Cell.Group>
      <Cell
        title="关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="自定义关闭按钮"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            closeIcon: <Close />,
            theme: 'round-button',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"关闭按钮",card:!0,identifier:"dialog-closeicon",lang:"tsx",meta:{title:"关闭按钮",card:!0}},{Component:x,key:"dialog-component",sources:{_:{tsx:`import React, { useState } from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'
import { Image, View } from 'react-native'

export default function DialogComponentDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="标题"
        showCancelButton
        onConfirm={() => {
          Toast.info('点击确认按钮')
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      >
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Image
            source={{ uri: 'https://img.yzcdn.cn/vant/apple-3.jpg' }}
            style={{ width: 200, height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </Dialog>
    </>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React, { useState } from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'
import { Image, View } from 'react-native'

export default function DialogComponentDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="标题"
        showCancelButton
        onConfirm={() => {
          Toast.info('点击确认按钮')
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      >
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Image
            source={{ uri: 'https://img.yzcdn.cn/vant/apple-3.jpg' }}
            style={{ width: 200, height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </Dialog>
    </>
  )
}

`}},title:"组件调用",card:!0,identifier:"dialog-component",lang:"tsx",meta:{title:"组件调用",card:!0}}],_={simulator:{compact:!0}},V=[{depth:1,text:"Dialog 弹出框",id:"dialog-弹出框"},{depth:2,text:"介绍",id:"介绍"},{depth:3,text:"函数调用",id:"函数调用"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"消息提示",id:"消息提示"},{depth:3,text:"Promise 调用",id:"promise-调用"},{depth:3,text:"圆角按钮风格",id:"圆角按钮风格"},{depth:3,text:"自定义内容",id:"自定义内容"},{depth:3,text:"关闭弹出框",id:"关闭弹出框"},{depth:3,text:"关闭按钮",id:"关闭按钮"},{depth:3,text:"组件调用",id:"组件调用"},{depth:2,text:"API",id:"api"},{depth:3,text:"方法",id:"方法"},{depth:4,text:"注意",id:"注意"},{depth:3,text:"Props",id:"props"}],I="/docs/components/dialog.md",M="Dialog 弹出框",N="1770373480000",De=i=>i.children({MdContent:G,demos:R,frontmatter:_,slugs:V,filePath:I,title:M,updatedTime:N});export{G as MdContent,De as default,R as demos,I as filePath,_ as frontmatter,V as slugs,M as title,N as updatedTime};
