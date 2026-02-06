import{R as h,r as l,j as e,V as u,a as g,c as y,s as ve}from"./main-BXb8DOxl.js";import{C as f}from"./index-BSmhLq_l.js";import{S as Ae}from"./Close-BDE-d6Lo.js";import{L as ye}from"./Loading-C0Kht0oY.js";import{P as Fe}from"./Popup-CKHRlZsm.js";import{c as ge,T as S}from"./createComponentTokensHook-C7GS3cUR.js";import{c as Ee}from"./hairline-BrrexFH9.js";import{M as w}from"./index-DkTYenKX.js";import{u as _}from"./useAriaPress-6bm6-278.js";import{T as F}from"./index-QxcKJNa1.js";import"./Arrow-D1qxk6Xz.js";import"./IconBase-5wkEN6D1.js";import"./index-9yrhdMQu.js";import"./extends-CF3RwP-h.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-DNoXqwcq.js";import"./Animated-BshxiKK9.js";import"./index-CJrLMJTa.js";import"./index-ZIcEKt2e.js";import"./index-CysvSvJu.js";import"./index-BPY4IQIH.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-VZ9qA3Du.js";import"./index-4Yp_2FWl.js";import"./SafeAreaView-DgWhFFT_.js";import"./useSafeAreaPadding-C6K9c3C6.js";import"./Checked-hxCKIkd8.js";const x={alignItems:"center",justifyContent:"center"},Pe=n=>{const{palette:t,spacing:i,fontSize:s}=n,a="#ffffff";return{defaults:{closeOnClickAction:!1,closeable:!0,round:!0,safeAreaInsetBottom:!0,overlay:!0,lockScroll:!0},layout:{popup:{paddingLeft:0,paddingRight:0,paddingBottom:0},panel:{width:"100%",maxHeight:"80%"},header:{position:"relative",flexDirection:"row",...x,paddingHorizontal:16},titleContainer:{flex:1,...x},title:{fontWeight:"600",textAlign:"center"},titleNode:x,closeButton:{position:"absolute",top:0,right:0,width:48,height:48,...x},descriptionContainer:{paddingTop:12,paddingBottom:20,paddingHorizontal:16},description:{textAlign:"center",lineHeight:20},descriptionNode:x,actions:{width:"100%"},item:{...x,width:"100%"},itemWithIcon:{flexDirection:"row",justifyContent:"center"},itemTextWrapper:x,itemText:{lineHeight:24},subname:{marginTop:4,fontSize:12,lineHeight:18},subnameNode:{marginTop:4},icon:{marginRight:12},cancelGap:{width:"100%",marginBottom:0},cancel:x,cancelText:{lineHeight:24}},colors:{background:a,title:t.default[900],description:t.default[500],item:t.default[900],subitem:t.default[500],cancel:t.default[900],disabled:t.default[400],border:t.default[200],itemBackground:a,itemPressedBackground:t.default[100],cancelBackground:a,cancelGapBackground:t.default[100]??"#f1f2f5"},typography:{title:s.lg,item:s.md,description:s.sm},spacing:{horizontal:i.md,vertical:14,cancelGap:8}}},ke=ge("actionSheet",Pe),Te=e.jsx(Ae,{size:18}),Q=h.memo(({title:n,closeable:t,closeIcon:i,tokens:s,onClose:a})=>{const d=_({onPress:a}),{colors:r,typography:m}=s;return e.jsxs(u,{style:s.layout.header,children:[e.jsx(u,{style:s.layout.titleContainer,children:g(n)?e.jsx(S,{style:[s.layout.title,{color:r.title,fontSize:m.title}],children:n}):e.jsx(u,{style:s.layout.titleNode,children:n})}),t?e.jsx(w,{style:s.layout.closeButton,accessibilityRole:"button",hitSlop:8,...d.interactionProps,children:h.isValidElement(i)?h.cloneElement(i,{fill:r.description,color:r.description}):i}):null]})});Q.displayName="ActionSheetHeader";const U=h.memo(({action:n,index:t,tokens:i,onActionPress:s})=>{const{disabled:a,loading:d,name:r,subname:m,icon:v}=n,{colors:p,spacing:A,typography:E}=i,P=_({disabled:!!a||!!d,onPress:l.useCallback(()=>s(n,t),[n,t,s]),extraProps:{accessibilityRole:"button",accessibilityState:{disabled:!!a,busy:!!d},testID:`rv-action-sheet-item-${t}`}}),k=n.color??p.item;return e.jsxs(w,{style:({pressed:T})=>[i.layout.item,!!v&&i.layout.itemWithIcon,{paddingVertical:A.vertical,paddingHorizontal:A.horizontal,backgroundColor:T&&!n.disabled&&!n.loading?p.itemPressedBackground:p.itemBackground},n.style],...P.interactionProps,children:[!!v&&e.jsx(u,{style:i.layout.icon,children:v}),d?e.jsx(ye,{size:20}):y(r)?e.jsxs(u,{style:i.layout.itemTextWrapper,children:[g(r)?e.jsx(S,{style:[i.layout.itemText,{color:n.disabled?p.disabled:k,fontSize:E.item}],children:r}):r,y(m)?g(m)?e.jsx(S,{style:[i.layout.subname,{color:p.subitem}],children:m}):e.jsx(u,{style:i.layout.subnameNode,children:m}):null]}):null]})});U.displayName="ActionSheetItem";const X=h.memo(({cancelText:n,tokens:t,onPress:i})=>{const{colors:s,spacing:a,typography:d}=t,r=_({onPress:i,extraProps:{accessibilityRole:"button",testID:"rv-action-sheet-cancel"}});return e.jsxs(e.Fragment,{children:[e.jsx(u,{style:[t.layout.cancelGap,{height:a.cancelGap,backgroundColor:s.cancelGapBackground}]}),e.jsx(w,{style:[t.layout.cancel,{paddingVertical:a.vertical,paddingHorizontal:a.horizontal,backgroundColor:s.cancelBackground}],...r.interactionProps,children:g(n)?e.jsx(S,{style:[t.layout.cancelText,{color:s.cancel,fontSize:d.item}],children:n}):n})]})});X.displayName="ActionSheetCancel";const Ve=n=>{const{tokensOverride:t,visible:i,title:s,description:a,cancelText:d,actions:r=[],closeOnClickAction:m,closeOnSelect:v,closeable:p,closeIcon:A=Te,beforeClose:E,onSelect:P,onCancel:k,onClose:T,children:ne,round:ie,safeAreaInsetBottom:se,overlay:oe,lockScroll:ce,style:le,...ae}=n,o=ke(t),R=p??o.defaults.closeable,re=ie??o.defaults.round,ue=se??o.defaults.safeAreaInsetBottom,de=oe??o.defaults.overlay,he=ce??o.defaults.lockScroll,I=m??v??o.defaults.closeOnClickAction,D=y(s),z=y(a),H=y(d),$=l.useRef("close"),L=l.useRef(!1),N=l.useRef(E);N.current=E;const O=l.useRef(T);O.current=T;const M=l.useRef(k);M.current=k;const G=l.useRef(P);G.current=P;const V=l.useCallback(async c=>{if(!N.current)return!0;try{return await N.current(c)!==!1}catch{return!0}},[]),B=l.useCallback(c=>{if(O.current){c==="cancel"&&M.current?.(),O.current();return}M.current?.()},[]),b=l.useCallback(async c=>{if(!L.current){L.current=!0;try{if(!await V(c))return;B(c)}finally{L.current=!1}}},[B,V]),me=l.useCallback(c=>($.current=c,V(c)),[V]),xe=l.useCallback(()=>{B($.current)},[B]),W=l.useCallback(()=>{b("cancel")},[b]),q=l.useCallback(()=>{b("close-icon")},[b]),J=l.useCallback((c,j)=>{c.disabled||c.loading||(c.onPress?.(c),c.callback?.(c),G.current?.(c,j),I&&b("action"))},[b,I]),pe=[o.layout.popup,le],Ce=[o.layout.panel,{backgroundColor:o.colors.background}],be=l.useMemo(()=>D?e.jsx(Q,{title:s,closeable:R,closeIcon:A,tokens:o,onClose:q}):null,[A,R,q,D,s,o]),je=l.useMemo(()=>z?e.jsx(u,{style:[o.layout.descriptionContainer,Ee(o.colors.border)],children:g(a)?e.jsx(S,{style:[o.layout.description,{color:o.colors.description,fontSize:o.typography.description}],children:a}):e.jsx(u,{style:o.layout.descriptionNode,children:a})}):null,[a,z,o.colors.border,o.colors.description,o.layout.description,o.layout.descriptionContainer,o.layout.descriptionNode,o.typography.description]),fe=l.useMemo(()=>r.map((c,j)=>e.jsx(U,{action:c,index:j,tokens:o,onActionPress:J},c.key??j)),[r,J,o]),Se=l.useMemo(()=>H?e.jsx(X,{cancelText:d,tokens:o,onPress:W}):null,[d,W,H,o]);return e.jsx(Fe,{visible:i,placement:"bottom",round:re,safeAreaInsetTop:D&&R,safeAreaInsetBottom:ue,overlay:de,lockScroll:he,beforeClose:me,onClose:xe,style:pe,...ae,children:e.jsxs(u,{style:Ce,children:[be,je,e.jsx(u,{style:o.layout.actions,children:fe}),ne,Se]})})},C=h.memo(Ve);C.displayName="ActionSheet";const K=[{name:"选项一"},{name:"选项二"},{name:"选项三"}],Be=[{name:"选项一"},{name:"选项二"},{name:"选项三",subname:"描述信息"}],Y=()=>{const[n,t]=h.useState(-1),i=()=>t(-1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:"基础用法",isLink:!0,onPress:()=>t(1)}),e.jsx(f,{title:"展示取消按钮",isLink:!0,onPress:()=>t(2)}),e.jsx(f,{title:"展示描述信息",isLink:!0,onPress:()=>t(3)}),e.jsx(C,{visible:n===1,onCancel:i,actions:K,closeOnClickAction:!0,onSelect:s=>{F.info(String(s.name??""))}}),e.jsx(C,{visible:n===2,onCancel:i,actions:K,cancelText:"取消",closeOnClickAction:!0,onSelect:s=>{F.info(String(s.name??""))}}),e.jsx(C,{visible:n===3,onCancel:i,description:"这是一段描述信息",actions:Be,cancelText:"取消",closeOnClickAction:!0,onSelect:s=>{F.info(String(s.name??""))}})]})},Re=`import React from 'react'
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
`,De={code:Re,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"基础示例",identifier:"action-sheet-basic",lang:"tsx",meta:{title:"基础示例"}},Z=()=>{const[n,t]=h.useState(!1),i=()=>t(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:"展示描述",isLink:!0,onPress:()=>t(!0)}),e.jsx(C,{visible:n,onCancel:i,title:"分享",description:"描述信息",actions:[{name:"朋友圈",subname:"最多 9 张"},{name:"好友",subname:"单条消息"}],cancelText:"取消",closeOnClickAction:!0,onSelect:s=>{F.info(String(s.name??""))}})]})},Le=`import React from 'react'
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
`,Ne={code:Le,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"描述与副标题",identifier:"action-sheet-description",lang:"tsx",meta:{title:"描述与副标题"}},Oe=[{name:"选项一",color:"#ee0a24"},{name:"选项二",disabled:!0},{loading:!0}],ee=()=>{const[n,t]=h.useState(!1),i=()=>t(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:"选项状态",isLink:!0,onPress:()=>t(!0)}),e.jsx(C,{visible:n,onCancel:i,actions:Oe,cancelText:"取消",closeOnClickAction:!0,onSelect:s=>{s.name&&F.info(String(s.name))}})]})},Me=`import React from 'react'
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

`,we={code:Me,sources:{_:{tsx:`import React from 'react'
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

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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

`}},title:"选项状态",identifier:"action-sheet-status",lang:"tsx",meta:{title:"选项状态"}},te=()=>{const[n,t]=h.useState(!1),i=()=>t(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:"自定义面板",isLink:!0,onPress:()=>t(!0)}),e.jsx(C,{visible:n,onCancel:i,children:e.jsx(u,{style:_e.content,children:e.jsx(S,{children:"内容"})})})]})},_e=ve.create({content:{padding:16,paddingBottom:160}}),Ie=`import React from 'react'
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
`,ze={code:Ie,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"自定义内容",identifier:"action-sheet-custom",lang:"tsx",meta:{title:"自定义内容"}},He=function({previewer:n=()=>null,api:t=()=>null}){const i=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"actionsheet-动作面板","data-anchor":"actionsheet-动作面板",children:"ActionSheet 动作面板"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在屏幕底部弹出的操作面板，适合展示多个并列操作。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { ActionSheet } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["动作面板通过 ",e.jsx("code",{children:"actions"})," 属性定义选项，默认点击选项不会自动收起，可通过 ",e.jsx("code",{children:"closeOnClickAction"})," 开启自动收起。"]}),e.jsx("div",{children:e.jsx(i,{...De,children:e.jsx(Y,{})})}),e.jsx("h3",{id:"描述与副标题","data-anchor":"描述与副标题",children:"描述与副标题"}),e.jsx("p",{children:"可为每个操作提供副标题说明，同时支持顶部描述文案。"}),e.jsx("div",{children:e.jsx(i,{...Ne,children:e.jsx(Z,{})})}),e.jsx("h3",{id:"选项状态","data-anchor":"选项状态",children:"选项状态"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"loading"}),"、",e.jsx("code",{children:"disabled"}),"、",e.jsx("code",{children:"color"})," 设置选项状态。"]}),e.jsx("div",{children:e.jsx(i,{...we,children:e.jsx(ee,{})})}),e.jsx("h3",{id:"自定义内容","data-anchor":"自定义内容",children:"自定义内容"}),e.jsx("p",{children:"操作项可带图标，自定义区域可放置按钮/提示等内容。"}),e.jsx("div",{children:e.jsx(i,{...ze,children:e.jsx(te,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"actionsheet-props","data-anchor":"actionsheet-props",children:"ActionSheet Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否展示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"actions"})}),e.jsx("td",{children:"操作列表"}),e.jsx("td",{children:e.jsx("code",{children:"ActionSheetAction[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"顶部描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelText"})}),e.jsx("td",{children:"底部取消按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnClickAction"})}),e.jsxs("td",{children:["点击选项后是否自动关闭（对齐 Vant ",e.jsx("code",{children:"close-on-click-action"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否展示右上角关闭按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlay"})}),e.jsx("td",{children:"是否展示蒙层（透传给 Popup）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnClickOverlay"})}),e.jsx("td",{children:"点击蒙层后是否关闭（透传给 Popup）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"round"})}),e.jsx("td",{children:"是否圆角（透传给 Popup）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"是否适配底部安全区"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onSelect"})}),e.jsx("td",{children:"点击操作项回调"}),e.jsx("td",{children:e.jsx("code",{children:"(action, index) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsxs("td",{children:["点击取消按钮时触发；未传 ",e.jsx("code",{children:"onClose"})," 时作为关闭回调兜底"]}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"beforeClose"})}),e.jsxs("td",{children:["关闭前拦截，返回 ",e.jsx("code",{children:"false"})," 可阻止关闭（支持 Promise）"]}),e.jsx("td",{children:e.jsx("code",{children:"(action) => boolean | Promise<boolean>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"关闭回调（遮罩/返回键/关闭按钮/手动触发）"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"其余"}),e.jsxs("td",{children:["支持 ",e.jsx("code",{children:"Popup"})," 的全部属性"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"actionsheetaction","data-anchor":"actionsheetaction",children:"ActionSheetAction"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"字段"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"操作名称"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"subname"})}),e.jsx("td",{children:"副标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"自定义颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsx("td",{children:"是否展示加载状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"自定义图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsxs("td",{children:["点击回调（先于 ",e.jsx("code",{children:"onSelect"})," 执行）"]}),e.jsx("td",{children:e.jsx("code",{children:"(action) => void"})})]})]})]})]})})},$e=[{Component:Y,key:"action-sheet-basic",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"基础示例",identifier:"action-sheet-basic",lang:"tsx",meta:{title:"基础示例"}},{Component:Z,key:"action-sheet-description",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"描述与副标题",identifier:"action-sheet-description",lang:"tsx",meta:{title:"描述与副标题"}},{Component:ee,key:"action-sheet-status",sources:{_:{tsx:`import React from 'react'
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

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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

`}},title:"选项状态",identifier:"action-sheet-status",lang:"tsx",meta:{title:"选项状态"}},{Component:te,key:"action-sheet-custom",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"自定义内容",identifier:"action-sheet-custom",lang:"tsx",meta:{title:"自定义内容"}}],Ge={simulator:{compact:!0}},We=[{depth:1,text:"ActionSheet 动作面板",id:"actionsheet-动作面板"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"描述与副标题",id:"描述与副标题"},{depth:3,text:"选项状态",id:"选项状态"},{depth:3,text:"自定义内容",id:"自定义内容"},{depth:2,text:"API",id:"api"},{depth:3,text:"ActionSheet Props",id:"actionsheet-props"},{depth:3,text:"ActionSheetAction",id:"actionsheetaction"}],qe="/docs/components/action-sheet.md",Je="ActionSheet 动作面板",Ke="1768553221000",At=n=>n.children({MdContent:He,demos:$e,frontmatter:Ge,slugs:We,filePath:qe,title:Je,updatedTime:Ke});export{He as MdContent,At as default,$e as demos,qe as filePath,Ge as frontmatter,We as slugs,Je as title,Ke as updatedTime};
