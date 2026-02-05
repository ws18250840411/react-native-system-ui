import{r as l,j as e,V as d,a as g,c as A,R as m,s as Ce}from"./main-O6KZrSH_.js";import{C as S}from"./index-DCx-GaLs.js";import{S as je}from"./Close-DpyqkEOI.js";import{L as be}from"./Loading-CdSfkQu4.js";import{P as fe}from"./Popup-DvjP5SkZ.js";import{c as Se,T as v}from"./createComponentTokensHook-KzOuLm4c.js";import{c as ve}from"./hairline-Dpq7rEkb.js";import{M}from"./index-DvCZppP1.js";import{u as I}from"./useAriaPress-DMjZXFvR.js";import{T as F}from"./index-CCLXK9-u.js";import"./Arrow-r8D7M_Tx.js";import"./IconBase-DZr7C-P7.js";import"./index-ANZ1PvOD.js";import"./extends-CF3RwP-h.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-D2qUv7UW.js";import"./Overlay-CmwAk_J5.js";import"./index-CJrLMJTa.js";import"./Animated-qBs3E5U6.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./index-C_v13XD0.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-Tvvid2F1.js";import"./index-Cq_gACMg.js";import"./SafeAreaView-L8uUXbhq.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./Checked-Cm5uhjGy.js";const ye=n=>{const{palette:t,spacing:i,fontSize:s}=n;return{defaults:{closeOnClickAction:!1,closeable:!0,round:!0,safeAreaInsetBottom:!0,overlay:!0,lockScroll:!0},layout:{popup:{paddingLeft:0,paddingRight:0,paddingBottom:0},panel:{width:"100%",maxHeight:"80%"},header:{position:"relative",flexDirection:"row",alignItems:"center",justifyContent:"center",paddingHorizontal:16},titleContainer:{flex:1,alignItems:"center",justifyContent:"center"},title:{fontWeight:"600",textAlign:"center"},titleNode:{alignItems:"center",justifyContent:"center"},closeButton:{position:"absolute",top:0,right:0,width:48,height:48,alignItems:"center",justifyContent:"center"},descriptionContainer:{paddingTop:12,paddingBottom:20,paddingHorizontal:16},description:{textAlign:"center",lineHeight:20},descriptionNode:{alignItems:"center",justifyContent:"center"},actions:{width:"100%"},item:{alignItems:"center",justifyContent:"center",width:"100%"},itemWithIcon:{flexDirection:"row",justifyContent:"center"},itemTextWrapper:{alignItems:"center",justifyContent:"center"},itemText:{lineHeight:24},subname:{marginTop:4,fontSize:12,lineHeight:18},subnameNode:{marginTop:4},icon:{marginRight:12},cancelGap:{width:"100%",marginBottom:0},cancel:{alignItems:"center",justifyContent:"center"},cancelText:{lineHeight:24}},colors:{background:"#ffffff",title:t.default[900],description:t.default[500],item:t.default[900],subitem:t.default[500],cancel:t.default[900],disabled:t.default[400],border:t.default[200],itemBackground:"#ffffff",itemPressedBackground:t.default[100],cancelBackground:"#ffffff",cancelGapBackground:t.default[100]??"#f1f2f5"},typography:{title:s.lg,item:s.md,description:s.sm},spacing:{horizontal:i.md,vertical:14,cancelGap:8}}},Ae=Se("actionSheet",ye),Fe=e.jsx(je,{size:18}),K=m.memo(({title:n,closeable:t,closeIcon:i,tokens:s,onClose:a})=>{const u=I({onPress:a}),{colors:r,typography:j}=s;return e.jsxs(d,{style:s.layout.header,children:[e.jsx(d,{style:s.layout.titleContainer,children:g(n)?e.jsx(v,{style:[s.layout.title,{color:r.title,fontSize:j.title}],children:n}):e.jsx(d,{style:s.layout.titleNode,children:n})}),t?e.jsx(M,{style:s.layout.closeButton,accessibilityRole:"button",hitSlop:8,...u.interactionProps,children:m.isValidElement(i)?m.cloneElement(i,{fill:r.description,color:r.description}):i}):null]})});K.displayName="ActionSheetHeader";const Q=m.memo(({action:n,index:t,tokens:i,onActionPress:s})=>{const a=!!n.disabled,u=!!n.loading,{colors:r,spacing:j,typography:T}=i,V=l.useCallback(()=>s(n,t),[n,t,s]),E=I({disabled:a||u,onPress:V,extraProps:{accessibilityRole:"button",accessibilityState:{disabled:a,busy:u},testID:`rv-action-sheet-item-${t}`}}),y=n.color??r.item,p=n.name,x=n.subname,b=!!n.icon,B=A(p),R=A(x);return e.jsxs(M,{style:({pressed:D})=>[i.layout.item,b&&i.layout.itemWithIcon,{paddingVertical:j.vertical,paddingHorizontal:j.horizontal,backgroundColor:D&&!a&&!u?r.itemPressedBackground:r.itemBackground},n.style],...E.interactionProps,children:[b&&e.jsx(d,{style:i.layout.icon,children:n.icon}),u?e.jsx(be,{size:20}):B?e.jsxs(d,{style:i.layout.itemTextWrapper,children:[g(p)?e.jsx(v,{style:[i.layout.itemText,{color:a?r.disabled:y,fontSize:T.item}],children:p}):p,R?g(x)?e.jsx(v,{style:[i.layout.subname,{color:r.subitem}],children:x}):e.jsx(d,{style:i.layout.subnameNode,children:x}):null]}):null]})});Q.displayName="ActionSheetItem";const U=m.memo(({cancelText:n,tokens:t,onPress:i})=>{const{colors:s,spacing:a,typography:u}=t,r=I({onPress:i,extraProps:{accessibilityRole:"button",testID:"rv-action-sheet-cancel"}});return e.jsxs(e.Fragment,{children:[e.jsx(d,{style:[t.layout.cancelGap,{height:a.cancelGap,backgroundColor:s.cancelGapBackground}]}),e.jsx(M,{style:[t.layout.cancel,{paddingVertical:a.vertical,paddingHorizontal:a.horizontal,backgroundColor:s.cancelBackground}],...r.interactionProps,children:g(n)?e.jsx(v,{style:[t.layout.cancelText,{color:s.cancel,fontSize:u.item}],children:n}):n})]})});U.displayName="ActionSheetCancel";const C=n=>{const{tokensOverride:t,visible:i,title:s,description:a,cancelText:u,actions:r=[],closeOnClickAction:j,closeOnSelect:T,closeable:V,closeIcon:E=Fe,beforeClose:y,onSelect:p,onCancel:x,onClose:b,children:B,round:R,safeAreaInsetBottom:D,overlay:te,lockScroll:ne,style:w,...ie}=n,o=Ae(t),L=V??o.defaults.closeable,se=R??o.defaults.round,oe=D??o.defaults.safeAreaInsetBottom,ce=te??o.defaults.overlay,le=ne??o.defaults.lockScroll,_=j??T??o.defaults.closeOnClickAction,N=A(s),z=A(a),H=A(u),$=l.useRef("close"),O=l.useRef(!1),P=l.useCallback(async c=>{if(!y)return!0;try{return await y(c)!==!1}catch{return!0}},[y]),k=l.useCallback(c=>{if(b){c==="cancel"&&x?.(),b();return}x?.()},[x,b]),f=l.useCallback(async c=>{if(!O.current){O.current=!0;try{if(!await P(c))return;k(c)}finally{O.current=!1}}},[k,P]),ae=l.useCallback(c=>{const h=c==="close-icon"?"close-icon":c==="overlay"?"overlay":"close";return $.current=h,P(h)},[P]),re=l.useCallback(()=>{k($.current)},[k]),G=l.useCallback(()=>{f("cancel")},[f]),W=l.useCallback(()=>{f("close-icon")},[f]),q=l.useCallback((c,h)=>{c.disabled||c.loading||(c.onPress?.(c),c.callback?.(c),p?.(c,h),_&&f("action"))},[p,f,_]),ue=l.useMemo(()=>[o.layout.popup,w],[w,o.layout.popup]),de=l.useMemo(()=>[o.layout.panel,{backgroundColor:o.colors.background}],[o.colors.background,o.layout.panel]),he=l.useMemo(()=>N?e.jsx(K,{title:s,closeable:L,closeIcon:E,tokens:o,onClose:W}):null,[E,L,W,N,s,o]),me=l.useMemo(()=>z?e.jsx(d,{style:[o.layout.descriptionContainer,ve(o.colors.border)],children:g(a)?e.jsx(v,{style:[o.layout.description,{color:o.colors.description,fontSize:o.typography.description}],children:a}):e.jsx(d,{style:o.layout.descriptionNode,children:a})}):null,[a,z,o.colors.border,o.colors.description,o.layout.description,o.layout.descriptionContainer,o.layout.descriptionNode,o.typography.description]),xe=l.useMemo(()=>r.map((c,h)=>e.jsx(Q,{action:c,index:h,tokens:o,onActionPress:q},c.key??h)),[r,q,o]),pe=l.useMemo(()=>H?e.jsx(U,{cancelText:u,tokens:o,onPress:G}):null,[u,G,H,o]);return e.jsx(fe,{visible:i,placement:"bottom",round:se,safeAreaInsetTop:N&&L,safeAreaInsetBottom:oe,overlay:ce,lockScroll:le,beforeClose:ae,onClose:re,style:ue,...ie,children:e.jsxs(d,{style:de,children:[he,me,e.jsx(d,{style:o.layout.actions,children:xe}),B,pe]})})};C.displayName="ActionSheet";const J=[{name:"选项一"},{name:"选项二"},{name:"选项三"}],ge=[{name:"选项一"},{name:"选项二"},{name:"选项三",subname:"描述信息"}],X=()=>{const[n,t]=m.useState(-1),i=()=>t(-1);return e.jsxs(e.Fragment,{children:[e.jsx(S,{title:"基础用法",isLink:!0,onPress:()=>t(1)}),e.jsx(S,{title:"展示取消按钮",isLink:!0,onPress:()=>t(2)}),e.jsx(S,{title:"展示描述信息",isLink:!0,onPress:()=>t(3)}),e.jsx(C,{visible:n===1,onCancel:i,actions:J,closeOnClickAction:!0,onSelect:s=>{F.info(String(s.name??""))}}),e.jsx(C,{visible:n===2,onCancel:i,actions:J,cancelText:"取消",closeOnClickAction:!0,onSelect:s=>{F.info(String(s.name??""))}}),e.jsx(C,{visible:n===3,onCancel:i,description:"这是一段描述信息",actions:ge,cancelText:"取消",closeOnClickAction:!0,onSelect:s=>{F.info(String(s.name??""))}})]})},Ee=`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
const actions1 = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息' },
]

export default () => {
  const [visible, setVisible] = React.useState(-1)
  const onCancel = () => setVisible(-1)
  return (
    <>
      <Cell title="基础用法" isLink onPress={() => setVisible(1)} />
      <Cell title="展示取消按钮" isLink onPress={() => setVisible(2)} />
      <Cell title="展示描述信息" isLink onPress={() => setVisible(3)} />

      <ActionSheet
        visible={visible === 1}
        onCancel={onCancel}
        actions={actions}
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 2}
        onCancel={onCancel}
        actions={actions}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 3}
        onCancel={onCancel}
        description="这是一段描述信息"
        actions={actions1}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`,Pe={code:Ee,sources:{_:{tsx:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
const actions1 = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息' },
]

export default () => {
  const [visible, setVisible] = React.useState(-1)
  const onCancel = () => setVisible(-1)
  return (
    <>
      <Cell title="基础用法" isLink onPress={() => setVisible(1)} />
      <Cell title="展示取消按钮" isLink onPress={() => setVisible(2)} />
      <Cell title="展示描述信息" isLink onPress={() => setVisible(3)} />

      <ActionSheet
        visible={visible === 1}
        onCancel={onCancel}
        actions={actions}
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 2}
        onCancel={onCancel}
        actions={actions}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 3}
        onCancel={onCancel}
        description="这是一段描述信息"
        actions={actions1}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
const actions1 = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息' },
]

export default () => {
  const [visible, setVisible] = React.useState(-1)
  const onCancel = () => setVisible(-1)
  return (
    <>
      <Cell title="基础用法" isLink onPress={() => setVisible(1)} />
      <Cell title="展示取消按钮" isLink onPress={() => setVisible(2)} />
      <Cell title="展示描述信息" isLink onPress={() => setVisible(3)} />

      <ActionSheet
        visible={visible === 1}
        onCancel={onCancel}
        actions={actions}
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 2}
        onCancel={onCancel}
        actions={actions}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 3}
        onCancel={onCancel}
        description="这是一段描述信息"
        actions={actions1}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`}},title:"基础示例",identifier:"action-sheet-basic",lang:"tsx",meta:{title:"基础示例"}},Y=()=>{const[n,t]=m.useState(!1),i=()=>t(!1);return e.jsxs(e.Fragment,{children:[e.jsx(S,{title:"展示描述",isLink:!0,onPress:()=>t(!0)}),e.jsx(C,{visible:n,onCancel:i,title:"分享",description:"描述信息",actions:[{name:"朋友圈",subname:"最多 9 张"},{name:"好友",subname:"单条消息"}],cancelText:"取消",closeOnClickAction:!0,onSelect:s=>{F.info(String(s.name??""))}})]})},ke=`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="展示描述" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        title="分享"
        description="描述信息"
        actions={[
          { name: '朋友圈', subname: '最多 9 张' },
          { name: '好友', subname: '单条消息' },
        ]}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`,Te={code:ke,sources:{_:{tsx:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="展示描述" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        title="分享"
        description="描述信息"
        actions={[
          { name: '朋友圈', subname: '最多 9 张' },
          { name: '好友', subname: '单条消息' },
        ]}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="展示描述" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        title="分享"
        description="描述信息"
        actions={[
          { name: '朋友圈', subname: '最多 9 张' },
          { name: '好友', subname: '单条消息' },
        ]}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`}},title:"描述与副标题",identifier:"action-sheet-description",lang:"tsx",meta:{title:"描述与副标题"}},Ve=[{name:"选项一",color:"#ee0a24"},{name:"选项二",disabled:!0},{loading:!0}],Z=()=>{const[n,t]=m.useState(!1),i=()=>t(!1);return e.jsxs(e.Fragment,{children:[e.jsx(S,{title:"选项状态",isLink:!0,onPress:()=>t(!0)}),e.jsx(C,{visible:n,onCancel:i,actions:Ve,cancelText:"取消",closeOnClickAction:!0,onSelect:s=>{s.name&&F.info(String(s.name))}})]})},Be=`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions2 = [
  { name: '选项一', color: '#ee0a24' },
  { name: '选项二', disabled: true },
  { loading: true },
]

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="选项状态" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        actions={actions2}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          if (action.name) {
            Toast.info(String(action.name))
          }
        }}
      />
    </>
  )
}

`,Re={code:Be,sources:{_:{tsx:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions2 = [
  { name: '选项一', color: '#ee0a24' },
  { name: '选项二', disabled: true },
  { loading: true },
]

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="选项状态" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        actions={actions2}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          if (action.name) {
            Toast.info(String(action.name))
          }
        }}
      />
    </>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions2 = [
  { name: '选项一', color: '#ee0a24' },
  { name: '选项二', disabled: true },
  { loading: true },
]

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="选项状态" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        actions={actions2}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          if (action.name) {
            Toast.info(String(action.name))
          }
        }}
      />
    </>
  )
}

`}},title:"选项状态",identifier:"action-sheet-status",lang:"tsx",meta:{title:"选项状态"}},ee=()=>{const[n,t]=m.useState(!1),i=()=>t(!1);return e.jsxs(e.Fragment,{children:[e.jsx(S,{title:"自定义面板",isLink:!0,onPress:()=>t(!0)}),e.jsx(C,{visible:n,onCancel:i,children:e.jsx(d,{style:De.content,children:e.jsx(v,{children:"内容"})})})]})},De=Ce.create({content:{padding:16,paddingBottom:160}}),Le=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ActionSheet, Cell } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="自定义面板" isLink onPress={() => setVisible(true)} />
      <ActionSheet visible={visible} onCancel={onCancel}>
        <View style={styles.content}>
          <Text>内容</Text>
        </View>
      </ActionSheet>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 160,
  },
})
`,Ne={code:Le,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ActionSheet, Cell } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="自定义面板" isLink onPress={() => setVisible(true)} />
      <ActionSheet visible={visible} onCancel={onCancel}>
        <View style={styles.content}>
          <Text>内容</Text>
        </View>
      </ActionSheet>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 160,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ActionSheet, Cell } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="自定义面板" isLink onPress={() => setVisible(true)} />
      <ActionSheet visible={visible} onCancel={onCancel}>
        <View style={styles.content}>
          <Text>内容</Text>
        </View>
      </ActionSheet>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 160,
  },
})
`}},title:"自定义内容",identifier:"action-sheet-custom",lang:"tsx",meta:{title:"自定义内容"}},Oe=function({previewer:n=()=>null,api:t=()=>null}){const i=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"actionsheet-动作面板","data-anchor":"actionsheet-动作面板",children:"ActionSheet 动作面板"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在屏幕底部弹出的操作面板，适合展示多个并列操作。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { ActionSheet } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["动作面板通过 ",e.jsx("code",{children:"actions"})," 属性定义选项，默认点击选项不会自动收起，可通过 ",e.jsx("code",{children:"closeOnClickAction"})," 开启自动收起。"]}),e.jsx("div",{children:e.jsx(i,{...Pe,children:e.jsx(X,{})})}),e.jsx("h3",{id:"描述与副标题","data-anchor":"描述与副标题",children:"描述与副标题"}),e.jsx("p",{children:"可为每个操作提供副标题说明，同时支持顶部描述文案。"}),e.jsx("div",{children:e.jsx(i,{...Te,children:e.jsx(Y,{})})}),e.jsx("h3",{id:"选项状态","data-anchor":"选项状态",children:"选项状态"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"loading"}),"、",e.jsx("code",{children:"disabled"}),"、",e.jsx("code",{children:"color"})," 设置选项状态。"]}),e.jsx("div",{children:e.jsx(i,{...Re,children:e.jsx(Z,{})})}),e.jsx("h3",{id:"自定义内容","data-anchor":"自定义内容",children:"自定义内容"}),e.jsx("p",{children:"操作项可带图标，自定义区域可放置按钮/提示等内容。"}),e.jsx("div",{children:e.jsx(i,{...Ne,children:e.jsx(ee,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"actionsheet-props","data-anchor":"actionsheet-props",children:"ActionSheet Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否展示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"actions"})}),e.jsx("td",{children:"操作列表"}),e.jsx("td",{children:e.jsx("code",{children:"ActionSheetAction[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"顶部描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelText"})}),e.jsx("td",{children:"底部取消按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnClickAction"})}),e.jsxs("td",{children:["点击选项后是否自动关闭（对齐 Vant ",e.jsx("code",{children:"close-on-click-action"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否展示右上角关闭按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlay"})}),e.jsx("td",{children:"是否展示蒙层（透传给 Popup）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnClickOverlay"})}),e.jsx("td",{children:"点击蒙层后是否关闭（透传给 Popup）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"round"})}),e.jsx("td",{children:"是否圆角（透传给 Popup）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"是否适配底部安全区"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onSelect"})}),e.jsx("td",{children:"点击操作项回调"}),e.jsx("td",{children:e.jsx("code",{children:"(action, index) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsxs("td",{children:["点击取消按钮时触发；未传 ",e.jsx("code",{children:"onClose"})," 时作为关闭回调兜底"]}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"beforeClose"})}),e.jsxs("td",{children:["关闭前拦截，返回 ",e.jsx("code",{children:"false"})," 可阻止关闭（支持 Promise）"]}),e.jsx("td",{children:e.jsx("code",{children:"(action) => boolean | Promise<boolean>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"关闭回调（遮罩/返回键/关闭按钮/手动触发）"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"其余"}),e.jsxs("td",{children:["支持 ",e.jsx("code",{children:"Popup"})," 的全部属性"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"actionsheetaction","data-anchor":"actionsheetaction",children:"ActionSheetAction"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"字段"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"操作名称"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"subname"})}),e.jsx("td",{children:"副标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"自定义颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsx("td",{children:"是否展示加载状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"自定义图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsxs("td",{children:["点击回调（先于 ",e.jsx("code",{children:"onSelect"})," 执行）"]}),e.jsx("td",{children:e.jsx("code",{children:"(action) => void"})})]})]})]})]})})},Me=[{Component:X,key:"action-sheet-basic",sources:{_:{tsx:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
const actions1 = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息' },
]

export default () => {
  const [visible, setVisible] = React.useState(-1)
  const onCancel = () => setVisible(-1)
  return (
    <>
      <Cell title="基础用法" isLink onPress={() => setVisible(1)} />
      <Cell title="展示取消按钮" isLink onPress={() => setVisible(2)} />
      <Cell title="展示描述信息" isLink onPress={() => setVisible(3)} />

      <ActionSheet
        visible={visible === 1}
        onCancel={onCancel}
        actions={actions}
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 2}
        onCancel={onCancel}
        actions={actions}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 3}
        onCancel={onCancel}
        description="这是一段描述信息"
        actions={actions1}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
const actions1 = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息' },
]

export default () => {
  const [visible, setVisible] = React.useState(-1)
  const onCancel = () => setVisible(-1)
  return (
    <>
      <Cell title="基础用法" isLink onPress={() => setVisible(1)} />
      <Cell title="展示取消按钮" isLink onPress={() => setVisible(2)} />
      <Cell title="展示描述信息" isLink onPress={() => setVisible(3)} />

      <ActionSheet
        visible={visible === 1}
        onCancel={onCancel}
        actions={actions}
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 2}
        onCancel={onCancel}
        actions={actions}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 3}
        onCancel={onCancel}
        description="这是一段描述信息"
        actions={actions1}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`}},title:"基础示例",identifier:"action-sheet-basic",lang:"tsx",meta:{title:"基础示例"}},{Component:Y,key:"action-sheet-description",sources:{_:{tsx:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="展示描述" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        title="分享"
        description="描述信息"
        actions={[
          { name: '朋友圈', subname: '最多 9 张' },
          { name: '好友', subname: '单条消息' },
        ]}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="展示描述" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        title="分享"
        description="描述信息"
        actions={[
          { name: '朋友圈', subname: '最多 9 张' },
          { name: '好友', subname: '单条消息' },
        ]}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
`}},title:"描述与副标题",identifier:"action-sheet-description",lang:"tsx",meta:{title:"描述与副标题"}},{Component:Z,key:"action-sheet-status",sources:{_:{tsx:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions2 = [
  { name: '选项一', color: '#ee0a24' },
  { name: '选项二', disabled: true },
  { loading: true },
]

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="选项状态" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        actions={actions2}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          if (action.name) {
            Toast.info(String(action.name))
          }
        }}
      />
    </>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions2 = [
  { name: '选项一', color: '#ee0a24' },
  { name: '选项二', disabled: true },
  { loading: true },
]

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="选项状态" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        actions={actions2}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          if (action.name) {
            Toast.info(String(action.name))
          }
        }}
      />
    </>
  )
}

`}},title:"选项状态",identifier:"action-sheet-status",lang:"tsx",meta:{title:"选项状态"}},{Component:ee,key:"action-sheet-custom",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ActionSheet, Cell } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="自定义面板" isLink onPress={() => setVisible(true)} />
      <ActionSheet visible={visible} onCancel={onCancel}>
        <View style={styles.content}>
          <Text>内容</Text>
        </View>
      </ActionSheet>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 160,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ActionSheet, Cell } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="自定义面板" isLink onPress={() => setVisible(true)} />
      <ActionSheet visible={visible} onCancel={onCancel}>
        <View style={styles.content}>
          <Text>内容</Text>
        </View>
      </ActionSheet>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 160,
  },
})
`}},title:"自定义内容",identifier:"action-sheet-custom",lang:"tsx",meta:{title:"自定义内容"}}],Ie={simulator:{compact:!0}},we=[{depth:1,text:"ActionSheet 动作面板",id:"actionsheet-动作面板"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"描述与副标题",id:"描述与副标题"},{depth:3,text:"选项状态",id:"选项状态"},{depth:3,text:"自定义内容",id:"自定义内容"},{depth:2,text:"API",id:"api"},{depth:3,text:"ActionSheet Props",id:"actionsheet-props"},{depth:3,text:"ActionSheetAction",id:"actionsheetaction"}],_e="/docs/components/action-sheet.md",ze="ActionSheet 动作面板",He="1768553221000",jt=n=>n.children({MdContent:Oe,demos:Me,frontmatter:Ie,slugs:we,filePath:_e,title:ze,updatedTime:He});export{Oe as MdContent,jt as default,Me as demos,_e as filePath,Ie as frontmatter,we as slugs,ze as title,He as updatedTime};
