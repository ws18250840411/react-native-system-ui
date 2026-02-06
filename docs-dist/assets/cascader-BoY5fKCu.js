import{R as F,r as p,i as we,j as e,V as E,a as W,b as jn,c as Fn}from"./main-BXb8DOxl.js";import{S as bn}from"./Checked-hxCKIkd8.js";import{S as wn,P as On}from"./Popup-CKHRlZsm.js";import{T as Oe}from"./index-DfZGaP25.js";import{c as Vn,T as $}from"./createComponentTokensHook-C7GS3cUR.js";import{u as Ve}from"./useControllableValue-B6yjddGc.js";import{u as En}from"./index-4Yp_2FWl.js";import{M as Pe}from"./index-DkTYenKX.js";import{F as Rn}from"./index-ZIcEKt2e.js";import{s as Ee}from"./compare-B0QhPEQa.js";import{F as _}from"./Field-CRK4EWhd.js";import{F as ee}from"./index-CYd7Z5-f.js";import{B as ne}from"./index-B_Jsx0Km.js";import{T as Bn}from"./index-QxcKJNa1.js";import{S as Pn}from"./Space-Q2CXJN-f.js";import"./IconBase-5wkEN6D1.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-DNoXqwcq.js";import"./Animated-BshxiKK9.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-BPY4IQIH.js";import"./index-CysvSvJu.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-VZ9qA3Du.js";import"./useAriaPress-6bm6-278.js";import"./SafeAreaView-DgWhFFT_.js";import"./useSafeAreaPadding-C6K9c3C6.js";import"./number-BrRWL1fO.js";import"./index-BSmhLq_l.js";import"./Arrow-D1qxk6Xz.js";import"./hairline-BrrexFH9.js";import"./index-C4pDPcGj.js";import"./useLocale-PK1ub-S0.js";import"./promise-nIQVXYv7.js";import"./Close-BDE-d6Lo.js";import"./index-9yrhdMQu.js";import"./index-CUJhPZZs.js";import"./color-DX_kf2WP.js";import"./Loading-C0Kht0oY.js";const Dn=n=>{const{palette:t,spacing:a,radii:c}=n,r=t.default[100],d="请选择";return{defaults:{placeholder:d,title:d,showHeader:!0,closeable:!0,swipeable:!0,poppable:!1,closeOnClickOverlay:!0,closeOnFinish:!0,popupPlacement:"bottom",popupRound:!0,loadingText:"加载中..."},layout:{container:{borderRadius:0,width:"100%"},header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:0},title:{lineHeight:20,includeFontPadding:!1},closeButton:{},tabsWrapper:{width:"100%"},tabsContentStatic:{width:"100%"},tabsItem:{alignItems:"center"},tabsTitle:{includeFontPadding:!1},tabTitleNode:{includeFontPadding:!1},optionList:{flexGrow:0},option:{justifyContent:"center"},optionContent:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},optionText:{lineHeight:20,includeFontPadding:!1},optionTextActive:{},optionLabel:{flex:1},empty:{textAlign:"center"},inlineChildren:{}},colors:{background:"#ffffff",headerText:t.default[900],placeholder:t.default[500],closeIcon:t.default[300],closeIconActive:t.default[500],tabText:t.default[900],tabActive:t.primary[500],tabInactive:t.default[500],optionText:t.default[900],optionDisabled:t.default[300],optionActiveBackground:r,optionActiveText:t.primary[500],divider:t.default[200]},typography:{titleSize:16,titleWeight:"500",tabsTitleSize:14,tabTitlePlaceholderWeight:"400",tabTitleWeight:"500",optionTextSize:14,optionTextActiveWeight:"500",emptyTextSize:14},sizing:{indicatorHeight:3,optionMinHeight:40,optionListHeight:384,headerHeight:48,closeIconSize:22,selectedIconSize:18},radii:{option:c.sm},spacing:{headerPaddingHorizontal:a.lg,tabNavPaddingHorizontal:6,tabNavPaddingVertical:2,tabPaddingHorizontal:10,optionPaddingVertical:10,optionPaddingHorizontal:a.lg,optionListPaddingTop:6,optionListPaddingBottom:0,closeButtonMarginLeft:8,optionLabelMarginRight:12,emptyPaddingVertical:24,inlineChildrenPaddingVertical:12}}},Sn=Vn("cascader",Dn),An=(n,t)=>{let a=1;const c=(r,d)=>{if(!r||!r.length)return;d>a&&(a=d);const u=d+1;r.forEach(l=>{Object.prototype.hasOwnProperty.call(l,t)&&u>a&&(a=u);const h=l[t];h&&h.length&&c(h,u)})};return c(n,1),a},Tn=(n=[],t,a)=>{const c=An(n,t.childrenKey),r=!a||!a.length?[n]:a.reduce((u,l,C)=>{if(l==null)return u;const h=u[C];if(!h)return u;const y=h.find(R=>R[t.valueKey]===a[C])?.[t.childrenKey];return y&&u.push(y),u},[n]),d=!a||!a.length?[]:a.map((u,l)=>r[l]?.find(C=>C[t.valueKey]===u));return{tabs:r,items:d,depth:c}},kn=n=>({textKey:n?.text??"text",valueKey:n?.value??"value",childrenKey:n?.children??"children"}),Re=(n=[],t,a)=>{const c=[];let r=n;return a.forEach(d=>{if(!r||!r.length)return;const u=r.find(l=>l[t.valueKey]===d);u&&(c.push(u),r=u[t.childrenKey]??[])}),c},Nn=n=>{const{tokensOverride:t,options:a=[],title:c,placeholder:r,activeColor:d,fieldNames:u,optionRender:l,showHeader:C,closeable:h,closeIcon:b,onChange:y,onClose:R,onFinish:L,onClickTab:I,onTabChange:ae,swipeable:_e,style:Le,testID:Ie,children:z,poppable:ze,visible:rt,defaultVisible:it,onVisibleChange:ct,closeOnClickOverlay:He,closeOnFinish:Me,popupPlacement:Ke,popupRound:We,popupProps:$e,loadingText:qe,...Je}=n,o=Sn(t),q=c??o.defaults.title,w=r??o.defaults.placeholder,J=d??o.colors.tabActive,oe=C??o.defaults.showHeader,Ue=_e??o.defaults.swipeable,v=ze??o.defaults.poppable,Ge=He??o.defaults.closeOnClickOverlay,le=Me??o.defaults.closeOnFinish,se=Ke??o.defaults.popupPlacement,Qe=We??o.defaults.popupRound,re=qe??o.defaults.loadingText,[ie,U]=Ve(n,{defaultValue:[],trigger:"onChange"}),m=kn(u),g=Array.isArray(ie)?ie:[],[G,Q]=p.useState(g),ce=h??o.defaults.closeable,[j,H]=Ve(n,{defaultValue:!1,valuePropName:"visible",defaultValuePropName:"defaultVisible",trigger:"onVisibleChange"}),O=v?G:g,{tabs:ue,items:D,depth:S}=Tn(a,m,O),{width:Xe}=En(),[Ye,Ze]=p.useState(0),en=p.useCallback(s=>{const i=s.nativeEvent.layout.width;i&&Ze(x=>x===i?x:i)},[]),nn=Re(a,m,g),[tn,de]=p.useState(0);p.useEffect(()=>{let i=Array.isArray(O)?O.length:0;i>=S&&(i=Math.max(S-1,0)),de(x=>x===i?x:i)},[O.length,S]),p.useEffect(()=>{(!v||!j)&&Q(s=>Ee(s,g)?s:g)},[g,v,j]);const A=p.useCallback(()=>{!v||j||(Q(s=>Ee(s,g)?s:g),H(!0))},[g,v,j,H]),X=p.useRef(R);X.current=R;const pe=p.useRef(y);pe.current=y;const xe=p.useRef(L);xe.current=L;const he=p.useRef(I);he.current=I;const ve=p.useRef(ae);ve.current=ae;const V=p.useCallback(s=>{!v||!j||(H(!1),s&&X.current?.())},[v,j,H]),an=p.useCallback(()=>{v&&(j?V(!0):A())},[V,A,v,j]),Y=jn(z),me=Y?z:null,on=p.useCallback(s=>{const i=we(s.index)?s.index:Number(s.name);if(Number.isNaN(i))return;const x=D[i]?.[m.textKey],k=W(x)?String(x):w;he.current?.(i,k)},[D,m.textKey,w]),ln=p.useCallback((s,i)=>{const x=we(i)?i:Number(s);Number.isNaN(x)||(de(x),ve.current?.(x))},[]),fe=p.useCallback((s,i)=>{if(s.disabled)return;const x=s[m.valueKey];if(x==null)return;const f=[...(v?G:g).slice(0,i),x],N=Re(a,m,f),M=s[m.childrenKey]??[],K=Object.prototype.hasOwnProperty.call(s,m.childrenKey),B=M.length>0,Z=K&&!B,be=f.length>=S,gn=!B&&!Z;v?(Q(f),pe.current?.(f,N)):U(f,N),(gn||be)&&(v&&(U(f,N),le&&V(!0)),xe.current?.(f,N))},[g,le,V,S,m,a,G,v,U]),Ce=p.useCallback(s=>{if(s<=0)return w;const i=D[s-1];return!i||!Object.prototype.hasOwnProperty.call(i,m.childrenKey)?w:(i[m.childrenKey]??[]).length===0&&O.length===s?re:w},[O.length,D,m.childrenKey,re,w]),sn=()=>{if(!ue.length)return e.jsx(Be,{optionList:[],tabIndex:0,selectedValue:O[0],activeColor:J,keys:m,optionRender:l,onSelect:fe,tokens:o,emptyText:Ce(0)});const s=!!Ue,i=Ye||Xe||void 0,x={height:o.sizing.headerHeight,paddingHorizontal:o.spacing.tabNavPaddingHorizontal,paddingVertical:o.spacing.tabNavPaddingVertical,backgroundColor:o.colors.background};return e.jsx(E,{style:o.layout.tabsWrapper,onLayout:en,children:e.jsx(Oe,{style:i?{width:i}:void 0,active:tn,onChange:ln,onClickTab:on,align:"center",swipeable:s,swipeThreshold:0,scrollable:!0,animated:!0,duration:300,color:J,lineHeight:o.sizing.indicatorHeight,titleActiveColor:o.colors.tabText,titleInactiveColor:o.colors.tabInactive,tabBarStyle:x,tabStyle:[o.layout.tabsItem,{paddingHorizontal:o.spacing.tabPaddingHorizontal}],titleStyle:[o.layout.tabsTitle,{fontSize:o.typography.tabsTitleSize}],contentStyle:s?void 0:o.layout.tabsContentStatic,children:ue.map((k,f)=>{const M=D[f]?.[m.textKey],K=W(M)?String(M):"",B=!K,Z=be=>e.jsx($,{style:[o.layout.tabTitleNode,{color:B?o.colors.tabInactive:o.colors.tabText,fontWeight:B?o.typography.tabTitlePlaceholderWeight:o.typography.tabTitleWeight}],children:B?w:K});return e.jsx(Oe.TabPane,{name:f,title:Z,children:e.jsx(Be,{optionList:k,tabIndex:f,selectedValue:O[f],activeColor:J,keys:m,optionRender:l,onSelect:fe,tokens:o,emptyText:Ce(f)})},f)})})})},ye=!v&&!Y?z:null,ge=e.jsxs(E,{testID:Ie,style:[o.layout.container,{backgroundColor:o.colors.background},Le],...Je,children:[oe?e.jsxs(E,{style:[o.layout.header,{height:o.sizing.headerHeight,paddingHorizontal:o.spacing.headerPaddingHorizontal}],children:[W(q)?e.jsx($,{style:[o.layout.title,{color:o.colors.headerText,fontSize:o.typography.titleSize,fontWeight:o.typography.titleWeight}],children:q}):q,ce?e.jsx(Pe,{hitSlop:8,onPress:()=>{v?V(!0):X.current?.()},style:[o.layout.closeButton,{marginLeft:o.spacing.closeButtonMarginLeft}],accessibilityRole:"button",accessibilityLabel:"关闭",children:b??(s=>e.jsx(wn,{size:o.sizing.closeIconSize,fill:s.pressed?o.colors.closeIconActive:o.colors.closeIcon,color:s.pressed?o.colors.closeIconActive:o.colors.closeIcon}))}):null]}):null,sn(),ye?e.jsx(E,{style:[o.layout.inlineChildren,{paddingVertical:o.spacing.inlineChildrenPaddingVertical,paddingHorizontal:o.spacing.headerPaddingHorizontal}],children:ye}):null]});if(!v)return ge;const{closeOnOverlayPress:rn,overlay:cn,onOpen:un,onOpened:dn,onClose:je,onClosed:pn,...T}=$e??{},xn=cn??!0,hn=rn??Ge,Fe=p.useRef(je);Fe.current=je;const vn=p.useCallback(()=>{Fe.current?.(),V(!0)},[V]),mn={open:A,close:()=>V(!0),toggle:an},fn=p.useCallback(s=>{if(!F.isValidElement(s))return s;const i=s.props,x=()=>{i.onPress?.(),i.onClick?.(),A()};return F.cloneElement(s,{onPress:x,onClick:x})},[A]),Cn=me?me(g,nn,mn):Y?null:z||null,yn=fn(Cn);return e.jsxs(e.Fragment,{children:[yn,e.jsx(On,{visible:j,placement:se,round:Qe,closeOnOverlayPress:hn,overlay:xn,safeAreaInsetTop:T?.safeAreaInsetTop!==void 0?T.safeAreaInsetTop:oe&&ce,safeAreaInsetBottom:T?.safeAreaInsetBottom!==void 0?T.safeAreaInsetBottom:se==="bottom",onOpen:un,onOpened:dn,onClose:vn,onClosed:pn,...T,style:{paddingLeft:0,paddingRight:0},children:ge})]})},_n=F.memo(({option:n,tabIndex:t,selected:a,activeColor:c,keys:r,optionRender:d,onSelect:u,tokens:l})=>{const C=n[r.valueKey],h=n[r.textKey],b=!!n.disabled,y=n.color??l.colors.optionText,R=b?l.colors.optionDisabled:a?n.color??c:y,L=d?d({option:n,selected:a}):W(h)?e.jsx($,{style:[l.layout.optionText,{color:R,fontSize:l.typography.optionTextSize},a&&{fontWeight:l.typography.optionTextActiveWeight}],children:h}):Fn(h)?h:null;return e.jsx(Pe,{testID:`cascader-option-${t}-${String(C)}`,style:({pressed:I})=>[l.layout.option,{minHeight:l.sizing.optionMinHeight,paddingVertical:l.spacing.optionPaddingVertical,paddingHorizontal:l.spacing.optionPaddingHorizontal},I&&!b&&{backgroundColor:l.colors.optionActiveBackground}],onPress:()=>u(n,t),disabled:b,children:e.jsxs(E,{style:l.layout.optionContent,children:[e.jsx(E,{style:[l.layout.optionLabel,{marginRight:l.spacing.optionLabelMarginRight}],children:L}),a?e.jsx(bn,{size:l.sizing.selectedIconSize,fill:c,color:c}):null]})})}),Be=F.memo(({optionList:n,tabIndex:t,selectedValue:a,activeColor:c,keys:r,optionRender:d,onSelect:u,tokens:l,emptyText:C})=>{const h=p.useCallback(({item:y})=>e.jsx(_n,{option:y,tabIndex:t,selected:a===y[r.valueKey],activeColor:c,keys:r,optionRender:d,onSelect:u,tokens:l}),[c,r,u,d,a,t,l]),b=p.useCallback(y=>String(y[r.valueKey]),[r.valueKey]);return n.length?e.jsx(Rn,{data:n,style:[l.layout.optionList,{height:l.sizing.optionListHeight}],contentContainerStyle:{paddingTop:l.spacing.optionListPaddingTop,paddingBottom:l.spacing.optionListPaddingBottom},showsVerticalScrollIndicator:!1,renderItem:h,keyExtractor:b,removeClippedSubviews:!0,initialNumToRender:20,windowSize:5}):e.jsx(E,{style:[l.layout.optionList,{height:l.sizing.optionListHeight}],children:e.jsx($,{style:[l.layout.empty,{color:l.colors.placeholder,paddingVertical:l.spacing.emptyPaddingVertical,fontSize:l.typography.emptyTextSize}],children:C})})}),P=F.memo(Nn);P.displayName="Cascader";const te=[{text:"浙江省",value:"330000",children:[{text:"杭州市",value:"330100",children:[{text:"上城区",value:"330102"},{text:"下城区",value:"330103"},{text:"江干区",value:"330104"}]},{text:"宁波市",value:"330200",children:[{text:"海曙区",value:"330203"},{text:"江北区",value:"330205"},{text:"北仑区",value:"330206"}]},{text:"温州市",value:"330300",children:[{text:"鹿城区",value:"330302"},{text:"龙湾区",value:"330303"},{text:"瓯海区",value:"330304"}]}]},{text:"江苏省",value:"320000",children:[{text:"南京市",value:"320100",children:[{text:"玄武区",value:"320102"},{text:"秦淮区",value:"320104"},{text:"建邺区",value:"320105"}]},{text:"无锡市",value:"320200",children:[{text:"锡山区",value:"320205"},{text:"惠山区",value:"320206"},{text:"滨湖区",value:"320211"}]},{text:"徐州市",value:"320300",children:[{text:"鼓楼区",value:"320302"},{text:"云龙区",value:"320303"},{text:"贾汪区",value:"320305"}]}]}],Ln=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function De(){const[n,t]=F.useState([]);return e.jsx(P,{poppable:!0,popupRound:!0,title:"请选择地区",options:te,value:n,onChange:a=>t(a),onFinish:a=>t(a),children:(a,c,r)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:Ln(c),placeholder:"请选择地区",onClick:r.open})})}const In=`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`,zn={code:In,sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"基础用法",identifier:"cascader-base",lang:"tsx",meta:{title:"基础用法"}},Hn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Se(){const n=ee.useForm(),t=()=>{n.current?.setFieldsValue({area:["330000","330100","330104"]})};return e.jsxs(ee,{ref:n,style:{paddingHorizontal:12},onFinish:a=>Bn.info(JSON.stringify(a)),children:[e.jsx(ee.Item,{name:"area",trigger:"onChange",children:e.jsx(P,{poppable:!0,popupRound:!0,title:"请选择地区",options:te,children:(a,c,r)=>e.jsx(_,{label:"地区",readOnly:!0,isLink:!0,value:Hn(c),placeholder:"请选择地区",onClick:r.open})})}),e.jsxs(Pn,{justify:"center",style:{marginTop:20},children:[e.jsx(ne,{type:"primary",text:"提交",onPress:()=>n.current?.submit()}),e.jsx(ne,{text:"设置默认值",onPress:t})]})]})}const Mn=`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`,Kn={code:Mn,sources:{_:{tsx:`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"Form中使用",identifier:"cascader-form",lang:"tsx",meta:{title:"Form中使用"}},Wn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Ae(){const[n,t]=F.useState([{text:"浙江省",value:"330000",children:[]}]),[a,c]=F.useState([]),r=d=>{const u=String(d[d.length-1]??""),l=n[0].children?.length===0;u===String(n[0].value)&&l&&setTimeout(()=>{t(C=>{const h=[...C];return h[0]={...h[0],children:[{text:"杭州市",value:"330100"},{text:"宁波市",value:"330200"}]},h})},800)};return e.jsx(P,{poppable:!0,popupRound:!0,title:"请选择地区",options:n,value:a,onChange:d=>{c(d),r(d)},children:(d,u,l)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:Wn(u),placeholder:"请选择地区",onClick:l.open})})}const $n=`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`,qn={code:$n,sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},title:"异步加载选项",identifier:"cascader-async",lang:"tsx",meta:{title:"异步加载选项"}},Jn=[{label:"浙江省",code:"330000",items:[{label:"杭州市",code:"330100"}]},{label:"江苏省",code:"320000",items:[{label:"南京市",code:"320100"}]}],Te={text:"label",value:"code",children:"items"},Un=n=>n.map(t=>t?.[Te.text]).filter(Boolean).join(" / ");function ke(){return e.jsx(P,{poppable:!0,popupRound:!0,fieldNames:Te,title:"请选择地区",options:Jn,children:(n,t,a)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:Un(t),placeholder:"请选择地区",onClick:a.open})})}const Gn=`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`,Qn={code:Gn,sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},title:"自定义字段名",identifier:"cascader-fieldnames",lang:"tsx",meta:{title:"自定义字段名"}},Xn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Ne(){const[n,t]=F.useState([]);return e.jsxs(e.Fragment,{children:[e.jsx(P,{poppable:!0,popupRound:!0,title:"请选择地区",options:te,value:n,onFinish:a=>t(a),children:(a,c,r)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:Xn(c),placeholder:"请选择地区",onClick:r.open})}),e.jsx(ne,{type:"primary",size:"small",style:{marginTop:12,alignSelf:"center",width:"90%"},text:"外部设置",onPress:()=>t(["330000","330100","330104"])})]})}const Yn=`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`,Zn={code:Yn,sources:{_:{tsx:`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"受控组件",identifier:"cascader-value",lang:"tsx",meta:{title:"受控组件"}},et=function({previewer:n=()=>null,api:t=()=>null}){const a=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"cascader-级联选择","data-anchor":"cascader-级联选择",children:"Cascader 级联选择"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"级联选择框，用于多层级数据的选择，典型场景为省市区选择。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(a,{code:"import { Cascader } from 'react-native-system-ui';",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx(a,{...zn,children:e.jsx(De,{})}),e.jsx("h3",{id:"form中使用","data-anchor":"form中使用",children:"Form中使用"}),e.jsx(a,{...Kn,children:e.jsx(Se,{})}),e.jsx("h3",{id:"异步加载选项","data-anchor":"异步加载选项",children:"异步加载选项"}),e.jsxs("p",{children:["可以监听 ",e.jsx("code",{children:"onChange"})," 事件并动态设置 ",e.jsx("code",{children:"options"}),"，实现异步加载选项。"]}),e.jsx(a,{...qn,children:e.jsx(Ae,{})}),e.jsx("h3",{id:"自定义字段名","data-anchor":"自定义字段名",children:"自定义字段名"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"fieldNames"})," 属性可以自定义 ",e.jsx("code",{children:"options"})," 里的字段名称。"]}),e.jsx(a,{...Qn,children:e.jsx(ke,{})}),e.jsx("h3",{id:"受控组件","data-anchor":"受控组件",children:"受控组件"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"value"})," 属性可以 Cascader 成为受控组件。"]}),e.jsx(a,{...Zn,children:e.jsx(Ne,{})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中的值"}),e.jsx("td",{children:e.jsx("code",{children:"(string | number)[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中的值"}),e.jsx("td",{children:e.jsx("code",{children:"(string | number)[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:"可选项数据源"}),e.jsx("td",{children:e.jsx("code",{children:"CascaderOption[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"optionRender"})}),e.jsx("td",{children:"自定义选项文字"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," option: CascaderOption, selected: boolean ","}",") => ReactNode"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"未选中时的提示文案"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'请选择'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"activeColor"})}),e.jsx("td",{children:"选中状态的高亮颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否显示关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIcon"})}),e.jsx("td",{children:"关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fieldNames"})}),e.jsxs("td",{children:["自定义 ",e.jsx("code",{children:"options"})," 结构中的字段"]}),e.jsx("td",{children:e.jsx("code",{children:"object"})}),e.jsx("td",{children:e.jsxs("code",{children:["{"," text: 'text', value: 'value', children: 'children' ","}"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeable"})}),e.jsx("td",{children:"是否开启手势左右滑动切换"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"渲染函数"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[], actions: CascaderActions) => ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选中项变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[]) => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"全部选项选择完成后触发"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[]) => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"点击关闭图标时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickTab"})}),e.jsx("td",{children:"点击标签时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(tabIndex: number, title: string) => void"})})]})]})]}),e.jsx("h3",{id:"cascaderoption-数据结构","data-anchor":"cascaderoption-数据结构",children:"CascaderOption 数据结构"}),e.jsxs("p",{children:[e.jsx("code",{children:"options"})," 属性是一个由对象构成的数组，数组中的每个对象配置一个可选项，对象可以包含以下值："]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"键名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text"})}),e.jsx("td",{children:"选项文字（必填）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"选项对应的值（必填）"}),e.jsx("td",{children:e.jsx("code",{children:"string | number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"选项文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"子选项列表"}),e.jsx("td",{children:e.jsx("code",{children:"CascaderOption[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用选项"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"className"})}),e.jsx("td",{children:"为对应列添加额外的 class"}),e.jsx("td",{children:e.jsx("code",{children:"string | Array | object"})})]})]})]}),e.jsx("h2",{id:"主题定制","data-anchor":"主题定制",children:"主题定制"}),e.jsx("h3",{id:"样式变量","data-anchor":"样式变量",children:"样式变量"}),e.jsxs("p",{children:["组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 ",e.jsx("a",{href:"/components/config-provider",children:"ConfigProvider 组件"}),"。"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"名称"}),e.jsx("th",{children:"默认值"}),e.jsx("th",{children:"描述"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-header-height"}),e.jsx("td",{children:e.jsx("em",{children:"48px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-header-padding"}),e.jsx("td",{children:e.jsx("em",{children:"0 var(--rv-padding-md)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-title-font-size"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-font-size-lg)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-title-line-height"}),e.jsx("td",{children:e.jsx("em",{children:"20px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-close-icon-size"}),e.jsx("td",{children:e.jsx("em",{children:"22px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-close-icon-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-5)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-close-icon-active-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-6)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-selected-icon-size"}),e.jsx("td",{children:e.jsx("em",{children:"18px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-tabs-height"}),e.jsx("td",{children:e.jsx("em",{children:"48px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-active-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-danger-color)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-options-height"}),e.jsx("td",{children:e.jsx("em",{children:"384px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-option-disabled-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-5)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-tab-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-text-color)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-unselected-tab-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-6)"})}),e.jsx("td",{children:"-"})]})]})]})]})})},nt=[{Component:De,key:"cascader-base",sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"基础用法",identifier:"cascader-base",lang:"tsx",meta:{title:"基础用法"}},{Component:Se,key:"cascader-form",sources:{_:{tsx:`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"Form中使用",identifier:"cascader-form",lang:"tsx",meta:{title:"Form中使用"}},{Component:Ae,key:"cascader-async",sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},title:"异步加载选项",identifier:"cascader-async",lang:"tsx",meta:{title:"异步加载选项"}},{Component:ke,key:"cascader-fieldnames",sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},title:"自定义字段名",identifier:"cascader-fieldnames",lang:"tsx",meta:{title:"自定义字段名"}},{Component:Ne,key:"cascader-value",sources:{_:{tsx:`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"受控组件",identifier:"cascader-value",lang:"tsx",meta:{title:"受控组件"}}],tt={simulator:{compact:!0}},at=[{depth:1,text:"Cascader 级联选择",id:"cascader-级联选择"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"Form中使用",id:"form中使用"},{depth:3,text:"异步加载选项",id:"异步加载选项"},{depth:3,text:"自定义字段名",id:"自定义字段名"},{depth:3,text:"受控组件",id:"受控组件"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"},{depth:3,text:"CascaderOption 数据结构",id:"cascaderoption-数据结构"},{depth:2,text:"主题定制",id:"主题定制"},{depth:3,text:"样式变量",id:"样式变量"}],ot="/docs/components/cascader.md",lt="Cascader 级联选择",st="1769570039000",Qt=n=>n.children({MdContent:et,demos:nt,frontmatter:tt,slugs:at,filePath:ot,title:lt,updatedTime:st});export{et as MdContent,Qt as default,nt as demos,ot as filePath,tt as frontmatter,at as slugs,lt as title,st as updatedTime};
