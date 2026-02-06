import{R as b,r as p,i as we,j as e,V as E,a as W,b as jn,c as bn}from"./main-CC2DK3OK.js";import{S as Fn}from"./Checked-BJm2Hkef.js";import{S as wn,P as On}from"./Popup-G3cXoDWN.js";import{T as Oe}from"./index-Ccpl5y1z.js";import{c as Vn,T as $}from"./createComponentTokensHook-BcXZOvON.js";import{u as Ve}from"./useControllableValue-BBYtc-A6.js";import{u as En}from"./index-BP7Blb5n.js";import{M as Pe}from"./index-CN-rk8sC.js";import{F as Rn}from"./index-Cakcz3d2.js";import{s as Ee}from"./compare-B0QhPEQa.js";import{F as _}from"./Field-DkY6Dtkh.js";import{F as ee}from"./index-CrmypR8q.js";import{B as ne}from"./index-BfHwmVBQ.js";import{T as Bn}from"./index-CYc3exVx.js";import{S as Pn}from"./Space-DBTvvarp.js";import"./IconBase-BNmvoXvm.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-D9I31KH1.js";import"./Animated-C-b5K9fC.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-D_JlQYPg.js";import"./index-CCOraIhd.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-xa377Hoz.js";import"./useAriaPress-DVn62gIQ.js";import"./SafeAreaView-CgItGtgs.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./number-BG570ZaL.js";import"./index-Dueh9AzQ.js";import"./Arrow-CP2eQgBg.js";import"./hairline-Bq3nniT3.js";import"./index-D03jSN7d.js";import"./useLocale-B4lUqsPR.js";import"./promise-DzoogS-n.js";import"./Close-BKbx2ovl.js";import"./index-BnjI8SiS.js";import"./index-CfGUJPQW.js";import"./color-BplLcdBL.js";import"./Loading-_9EKEhr2.js";const Dn=n=>{const{palette:t,spacing:a,radii:u}=n,r=t.default[100],d="请选择";return{defaults:{placeholder:d,title:d,showHeader:!0,closeable:!0,swipeable:!0,poppable:!1,closeOnClickOverlay:!0,closeOnFinish:!0,popupPlacement:"bottom",popupRound:!0,loadingText:"加载中..."},layout:{container:{borderRadius:0,width:"100%"},header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:0},title:{lineHeight:20,includeFontPadding:!1},closeButton:{},tabsWrapper:{width:"100%"},tabsContentStatic:{width:"100%"},tabsItem:{alignItems:"center"},tabsTitle:{includeFontPadding:!1},tabTitleNode:{includeFontPadding:!1},optionList:{flexGrow:0},option:{justifyContent:"center"},optionContent:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},optionText:{lineHeight:20,includeFontPadding:!1},optionTextActive:{},optionLabel:{flex:1},empty:{textAlign:"center"},inlineChildren:{}},colors:{background:"#ffffff",headerText:t.default[900],placeholder:t.default[500],closeIcon:t.default[300],closeIconActive:t.default[500],tabText:t.default[900],tabActive:t.primary[500],tabInactive:t.default[500],optionText:t.default[900],optionDisabled:t.default[300],optionActiveBackground:r,optionActiveText:t.primary[500],divider:t.default[200]},typography:{titleSize:16,titleWeight:"500",tabsTitleSize:14,tabTitlePlaceholderWeight:"400",tabTitleWeight:"500",optionTextSize:14,optionTextActiveWeight:"500",emptyTextSize:14},sizing:{indicatorHeight:3,optionMinHeight:40,optionListHeight:384,headerHeight:48,closeIconSize:22,selectedIconSize:18},radii:{option:u.sm},spacing:{headerPaddingHorizontal:a.lg,tabNavPaddingHorizontal:6,tabNavPaddingVertical:2,tabPaddingHorizontal:10,optionPaddingVertical:10,optionPaddingHorizontal:a.lg,optionListPaddingTop:6,optionListPaddingBottom:0,closeButtonMarginLeft:8,optionLabelMarginRight:12,emptyPaddingVertical:24,inlineChildrenPaddingVertical:12}}},Sn=Vn("cascader",Dn),An=(n,t)=>{let a=1;const u=(r,d)=>{if(!r||!r.length)return;d>a&&(a=d);const c=d+1;r.forEach(l=>{Object.prototype.hasOwnProperty.call(l,t)&&c>a&&(a=c);const h=l[t];h&&h.length&&u(h,c)})};return u(n,1),a},Tn=(n=[],t,a)=>{const u=An(n,t.childrenKey),r=!a||!a.length?[n]:a.reduce((c,l,C)=>{if(l==null)return c;const h=c[C];if(!h)return c;const y=h.find(R=>R[t.valueKey]===a[C])?.[t.childrenKey];return y&&c.push(y),c},[n]),d=!a||!a.length?[]:a.map((c,l)=>r[l]?.find(C=>C[t.valueKey]===c));return{tabs:r,items:d,depth:u}},kn=n=>({textKey:n?.text??"text",valueKey:n?.value??"value",childrenKey:n?.children??"children"}),Re=(n=[],t,a)=>{const u=[];let r=n;return a.forEach(d=>{if(!r||!r.length)return;const c=r.find(l=>l[t.valueKey]===d);c&&(u.push(c),r=c[t.childrenKey]??[])}),u},Nn=n=>{const{tokensOverride:t,options:a=[],title:u,placeholder:r,activeColor:d,fieldNames:c,optionRender:l,showHeader:C,closeable:h,closeIcon:F,onChange:y,onClose:R,onFinish:L,onClickTab:I,onTabChange:ae,swipeable:_e,style:Le,testID:Ie,children:z,poppable:ze,visible:rt,defaultVisible:it,onVisibleChange:ut,closeOnClickOverlay:He,closeOnFinish:Me,popupPlacement:Ke,popupRound:We,popupProps:$e,loadingText:qe,...Je}=n,o=Sn(t),q=u??o.defaults.title,w=r??o.defaults.placeholder,J=d??o.colors.tabActive,oe=C??o.defaults.showHeader,Ue=_e??o.defaults.swipeable,m=ze??o.defaults.poppable,Ge=He??o.defaults.closeOnClickOverlay,le=Me??o.defaults.closeOnFinish,se=Ke??o.defaults.popupPlacement,Qe=We??o.defaults.popupRound,re=qe??o.defaults.loadingText,[ie,U]=Ve(n,{defaultValue:[],trigger:"onChange"}),v=kn(c),g=Array.isArray(ie)?ie:[],[G,Q]=p.useState(g),ue=h??o.defaults.closeable,[j,H]=Ve(n,{defaultValue:!1,valuePropName:"visible",defaultValuePropName:"defaultVisible",trigger:"onVisibleChange"}),O=m?G:g,{tabs:ce,items:D,depth:S}=Tn(a,v,O),{width:Xe}=En(),[Ye,Ze]=p.useState(0),en=p.useCallback(s=>{const i=s.nativeEvent.layout.width;i&&Ze(x=>x===i?x:i)},[]),nn=Re(a,v,g),[tn,de]=p.useState(0);p.useEffect(()=>{let i=Array.isArray(O)?O.length:0;i>=S&&(i=Math.max(S-1,0)),de(x=>x===i?x:i)},[O.length,S]),p.useEffect(()=>{(!m||!j)&&Q(s=>Ee(s,g)?s:g)},[g,m,j]);const A=p.useCallback(()=>{!m||j||(Q(s=>Ee(s,g)?s:g),H(!0))},[g,m,j,H]),X=p.useRef(R);X.current=R;const pe=p.useRef(y);pe.current=y;const xe=p.useRef(L);xe.current=L;const he=p.useRef(I);he.current=I;const me=p.useRef(ae);me.current=ae;const V=p.useCallback(s=>{!m||!j||(H(!1),s&&X.current?.())},[m,j,H]),an=p.useCallback(()=>{m&&(j?V(!0):A())},[V,A,m,j]),Y=jn(z),ve=Y?z:null,on=p.useCallback(s=>{const i=we(s.index)?s.index:Number(s.name);if(Number.isNaN(i))return;const x=D[i]?.[v.textKey],k=W(x)?String(x):w;he.current?.(i,k)},[D,v.textKey,w]),ln=p.useCallback((s,i)=>{const x=we(i)?i:Number(s);Number.isNaN(x)||(de(x),me.current?.(x))},[]),fe=p.useCallback((s,i)=>{if(s.disabled)return;const x=s[v.valueKey];if(x==null)return;const f=[...(m?G:g).slice(0,i),x],N=Re(a,v,f),M=s[v.childrenKey]??[],K=Object.prototype.hasOwnProperty.call(s,v.childrenKey),B=M.length>0,Z=K&&!B,Fe=f.length>=S,gn=!B&&!Z;m?(Q(f),pe.current?.(f,N)):U(f,N),(gn||Fe)&&(m&&(U(f,N),le&&V(!0)),xe.current?.(f,N))},[g,le,V,S,v,a,G,m,U]),Ce=p.useCallback(s=>{if(s<=0)return w;const i=D[s-1];return!i||!Object.prototype.hasOwnProperty.call(i,v.childrenKey)?w:(i[v.childrenKey]??[]).length===0&&O.length===s?re:w},[O.length,D,v.childrenKey,re,w]),sn=()=>{if(!ce.length)return e.jsx(Be,{optionList:[],tabIndex:0,selectedValue:O[0],activeColor:J,keys:v,optionRender:l,onSelect:fe,tokens:o,emptyText:Ce(0)});const s=!!Ue,i=Ye||Xe||void 0,x={height:o.sizing.headerHeight,paddingHorizontal:o.spacing.tabNavPaddingHorizontal,paddingVertical:o.spacing.tabNavPaddingVertical,backgroundColor:o.colors.background};return e.jsx(E,{style:o.layout.tabsWrapper,onLayout:en,children:e.jsx(Oe,{style:i?{width:i}:void 0,active:tn,onChange:ln,onClickTab:on,align:"center",swipeable:s,swipeThreshold:0,scrollable:!0,animated:!0,duration:300,color:J,lineHeight:o.sizing.indicatorHeight,titleActiveColor:o.colors.tabText,titleInactiveColor:o.colors.tabInactive,tabBarStyle:x,tabStyle:[o.layout.tabsItem,{paddingHorizontal:o.spacing.tabPaddingHorizontal}],titleStyle:[o.layout.tabsTitle,{fontSize:o.typography.tabsTitleSize}],contentStyle:s?void 0:o.layout.tabsContentStatic,children:ce.map((k,f)=>{const M=D[f]?.[v.textKey],K=W(M)?String(M):"",B=!K,Z=Fe=>e.jsx($,{style:[o.layout.tabTitleNode,{color:B?o.colors.tabInactive:o.colors.tabText,fontWeight:B?o.typography.tabTitlePlaceholderWeight:o.typography.tabTitleWeight}],children:B?w:K});return e.jsx(Oe.TabPane,{name:f,title:Z,children:e.jsx(Be,{optionList:k,tabIndex:f,selectedValue:O[f],activeColor:J,keys:v,optionRender:l,onSelect:fe,tokens:o,emptyText:Ce(f)})},f)})})})},ye=!m&&!Y?z:null,ge=e.jsxs(E,{testID:Ie,style:[o.layout.container,{backgroundColor:o.colors.background},Le],...Je,children:[oe?e.jsxs(E,{style:[o.layout.header,{height:o.sizing.headerHeight,paddingHorizontal:o.spacing.headerPaddingHorizontal}],children:[W(q)?e.jsx($,{style:[o.layout.title,{color:o.colors.headerText,fontSize:o.typography.titleSize,fontWeight:o.typography.titleWeight}],children:q}):q,ue?e.jsx(Pe,{hitSlop:8,onPress:()=>{m?V(!0):X.current?.()},style:[o.layout.closeButton,{marginLeft:o.spacing.closeButtonMarginLeft}],accessibilityRole:"button",accessibilityLabel:"关闭",children:F??(s=>e.jsx(wn,{size:o.sizing.closeIconSize,fill:s.pressed?o.colors.closeIconActive:o.colors.closeIcon,color:s.pressed?o.colors.closeIconActive:o.colors.closeIcon}))}):null]}):null,sn(),ye?e.jsx(E,{style:[o.layout.inlineChildren,{paddingVertical:o.spacing.inlineChildrenPaddingVertical,paddingHorizontal:o.spacing.headerPaddingHorizontal}],children:ye}):null]});if(!m)return ge;const{closeOnOverlayPress:rn,overlay:un,onOpen:cn,onOpened:dn,onClose:je,onClosed:pn,...T}=$e??{},xn=un??!0,hn=rn??Ge,be=p.useRef(je);be.current=je;const mn=p.useCallback(()=>{be.current?.(),V(!0)},[V]),vn={open:A,close:()=>V(!0),toggle:an},fn=p.useCallback(s=>{if(!b.isValidElement(s))return s;const i=s.props,x=()=>{i.onPress?.(),i.onClick?.(),A()};return b.cloneElement(s,{onPress:x,onClick:x})},[A]),Cn=ve?ve(g,nn,vn):Y?null:z||null,yn=fn(Cn);return e.jsxs(e.Fragment,{children:[yn,e.jsx(On,{visible:j,placement:se,round:Qe,closeOnOverlayPress:hn,overlay:xn,safeAreaInsetTop:T?.safeAreaInsetTop!==void 0?T.safeAreaInsetTop:oe&&ue,safeAreaInsetBottom:T?.safeAreaInsetBottom!==void 0?T.safeAreaInsetBottom:se==="bottom",onOpen:cn,onOpened:dn,onClose:mn,onClosed:pn,...T,style:{paddingLeft:0,paddingRight:0},children:ge})]})},_n=b.memo(({option:n,tabIndex:t,selected:a,activeColor:u,keys:r,optionRender:d,onSelect:c,tokens:l})=>{const C=n[r.valueKey],h=n[r.textKey],F=!!n.disabled,y=n.color??l.colors.optionText,R=F?l.colors.optionDisabled:a?n.color??u:y,L=d?d({option:n,selected:a}):W(h)?e.jsx($,{style:[l.layout.optionText,{color:R,fontSize:l.typography.optionTextSize},a&&{fontWeight:l.typography.optionTextActiveWeight}],children:h}):bn(h)?h:null;return e.jsx(Pe,{testID:`cascader-option-${t}-${String(C)}`,style:({pressed:I})=>[l.layout.option,{minHeight:l.sizing.optionMinHeight,paddingVertical:l.spacing.optionPaddingVertical,paddingHorizontal:l.spacing.optionPaddingHorizontal},I&&!F&&{backgroundColor:l.colors.optionActiveBackground}],onPress:()=>c(n,t),disabled:F,children:e.jsxs(E,{style:l.layout.optionContent,children:[e.jsx(E,{style:[l.layout.optionLabel,{marginRight:l.spacing.optionLabelMarginRight}],children:L}),a?e.jsx(Fn,{size:l.sizing.selectedIconSize,fill:u,color:u}):null]})})}),Be=b.memo(({optionList:n,tabIndex:t,selectedValue:a,activeColor:u,keys:r,optionRender:d,onSelect:c,tokens:l,emptyText:C})=>{const h=p.useCallback(({item:y})=>e.jsx(_n,{option:y,tabIndex:t,selected:a===y[r.valueKey],activeColor:u,keys:r,optionRender:d,onSelect:c,tokens:l}),[u,r,c,d,a,t,l]),F=p.useCallback(y=>String(y[r.valueKey]),[r.valueKey]);return n.length?e.jsx(Rn,{data:n,style:[l.layout.optionList,{height:l.sizing.optionListHeight}],contentContainerStyle:{paddingTop:l.spacing.optionListPaddingTop,paddingBottom:l.spacing.optionListPaddingBottom},showsVerticalScrollIndicator:!1,renderItem:h,keyExtractor:F,removeClippedSubviews:!0,initialNumToRender:20,windowSize:5}):e.jsx(E,{style:[l.layout.optionList,{height:l.sizing.optionListHeight}],children:e.jsx($,{style:[l.layout.empty,{color:l.colors.placeholder,paddingVertical:l.spacing.emptyPaddingVertical,fontSize:l.typography.emptyTextSize}],children:C})})}),P=b.memo(Nn);P.displayName="Cascader";const te=[{text:"浙江省",value:"330000",children:[{text:"杭州市",value:"330100",children:[{text:"上城区",value:"330102"},{text:"下城区",value:"330103"},{text:"江干区",value:"330104"}]},{text:"宁波市",value:"330200",children:[{text:"海曙区",value:"330203"},{text:"江北区",value:"330205"},{text:"北仑区",value:"330206"}]},{text:"温州市",value:"330300",children:[{text:"鹿城区",value:"330302"},{text:"龙湾区",value:"330303"},{text:"瓯海区",value:"330304"}]}]},{text:"江苏省",value:"320000",children:[{text:"南京市",value:"320100",children:[{text:"玄武区",value:"320102"},{text:"秦淮区",value:"320104"},{text:"建邺区",value:"320105"}]},{text:"无锡市",value:"320200",children:[{text:"锡山区",value:"320205"},{text:"惠山区",value:"320206"},{text:"滨湖区",value:"320211"}]},{text:"徐州市",value:"320300",children:[{text:"鼓楼区",value:"320302"},{text:"云龙区",value:"320303"},{text:"贾汪区",value:"320305"}]}]}],Ln=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function De(){const[n,t]=b.useState([]);return e.jsx(P,{poppable:!0,popupRound:!0,title:"请选择地区",options:te,value:n,onChange:a=>t(a),onFinish:a=>t(a),children:(a,u,r)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:Ln(u),placeholder:"请选择地区",onClick:r.open})})}const In=`import React from 'react'
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
`}},title:"基础用法",identifier:"cascader-base",lang:"tsx",meta:{title:"基础用法"}},Hn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Se(){const n=ee.useForm(),t=()=>{n.current?.setFieldsValue({area:["330000","330100","330104"]})};return e.jsxs(ee,{ref:n,style:{paddingHorizontal:12},onFinish:a=>Bn.info(JSON.stringify(a)),children:[e.jsx(ee.Item,{name:"area",trigger:"onChange",children:e.jsx(P,{poppable:!0,popupRound:!0,title:"请选择地区",options:te,children:(a,u,r)=>e.jsx(_,{label:"地区",readOnly:!0,isLink:!0,value:Hn(u),placeholder:"请选择地区",onClick:r.open})})}),e.jsxs(Pn,{justify:"center",style:{marginTop:20},children:[e.jsx(ne,{type:"primary",text:"提交",onPress:()=>n.current?.submit()}),e.jsx(ne,{text:"设置默认值",onPress:t})]})]})}const Mn=`import React from 'react'
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
`}},title:"Form中使用",identifier:"cascader-form",lang:"tsx",meta:{title:"Form中使用"}},Wn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Ae(){const[n,t]=b.useState([{text:"浙江省",value:"330000",children:[]}]),[a,u]=b.useState([]),r=d=>{const c=String(d[d.length-1]??""),l=n[0].children?.length===0;c===String(n[0].value)&&l&&setTimeout(()=>{t(C=>{const h=[...C];return h[0]={...h[0],children:[{text:"杭州市",value:"330100"},{text:"宁波市",value:"330200"}]},h})},800)};return e.jsx(P,{poppable:!0,popupRound:!0,title:"请选择地区",options:n,value:a,onChange:d=>{u(d),r(d)},children:(d,c,l)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:Wn(c),placeholder:"请选择地区",onClick:l.open})})}const $n=`import React from 'react'
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
`}},title:"自定义字段名",identifier:"cascader-fieldnames",lang:"tsx",meta:{title:"自定义字段名"}},Xn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Ne(){const[n,t]=b.useState([]);return e.jsxs(e.Fragment,{children:[e.jsx(P,{poppable:!0,popupRound:!0,title:"请选择地区",options:te,value:n,onFinish:a=>t(a),children:(a,u,r)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:Xn(u),placeholder:"请选择地区",onClick:r.open})}),e.jsx(ne,{type:"primary",size:"small",style:{marginTop:12,alignSelf:"center",width:"90%"},text:"外部设置",onPress:()=>t(["330000","330100","330104"])})]})}const Yn=`import React from 'react'
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
`}},title:"受控组件",identifier:"cascader-value",lang:"tsx",meta:{title:"受控组件"}},et=function({previewer:n=()=>null,api:t=()=>null}){const a=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"cascader-级联选择","data-anchor":"cascader-级联选择",children:"Cascader 级联选择"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"级联选择框，用于多层级数据的选择，典型场景为省市区选择。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(a,{code:"import { Cascader } from 'react-native-system-ui';",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx(a,{...zn,children:e.jsx(De,{})}),e.jsx("h3",{id:"form中使用","data-anchor":"form中使用",children:"Form中使用"}),e.jsx(a,{...Kn,children:e.jsx(Se,{})}),e.jsx("h3",{id:"异步加载选项","data-anchor":"异步加载选项",children:"异步加载选项"}),e.jsxs("p",{children:["可以监听 ",e.jsx("code",{children:"onChange"})," 事件并动态设置 ",e.jsx("code",{children:"options"}),"，实现异步加载选项。"]}),e.jsx(a,{...qn,children:e.jsx(Ae,{})}),e.jsx("h3",{id:"自定义字段名","data-anchor":"自定义字段名",children:"自定义字段名"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"fieldNames"})," 属性可以自定义 ",e.jsx("code",{children:"options"})," 里的字段名称。"]}),e.jsx(a,{...Qn,children:e.jsx(ke,{})}),e.jsx("h3",{id:"受控组件","data-anchor":"受控组件",children:"受控组件"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"value"})," 属性可以 Cascader 成为受控组件。"]}),e.jsx(a,{...Zn,children:e.jsx(Ne,{})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中的值"}),e.jsx("td",{children:e.jsx("code",{children:"(string | number)[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中的值"}),e.jsx("td",{children:e.jsx("code",{children:"(string | number)[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:"可选项数据源"}),e.jsx("td",{children:e.jsx("code",{children:"CascaderOption[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"optionRender"})}),e.jsx("td",{children:"自定义选项文字"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," option: CascaderOption, selected: boolean ","}",") => ReactNode"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"未选中时的提示文案"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'请选择'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"activeColor"})}),e.jsx("td",{children:"选中状态的高亮颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否显示关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIcon"})}),e.jsx("td",{children:"关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fieldNames"})}),e.jsxs("td",{children:["自定义 ",e.jsx("code",{children:"options"})," 结构中的字段"]}),e.jsx("td",{children:e.jsx("code",{children:"object"})}),e.jsx("td",{children:e.jsxs("code",{children:["{"," text: 'text', value: 'value', children: 'children' ","}"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeable"})}),e.jsx("td",{children:"是否开启手势左右滑动切换"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"渲染函数"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[], actions: CascaderActions) => ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选中项变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[]) => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"全部选项选择完成后触发"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[]) => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"点击关闭图标时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickTab"})}),e.jsx("td",{children:"点击标签时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(tabIndex: number, title: string) => void"})})]})]})]}),e.jsx("h3",{id:"cascaderoption-数据结构","data-anchor":"cascaderoption-数据结构",children:"CascaderOption 数据结构"}),e.jsxs("p",{children:[e.jsx("code",{children:"options"})," 属性是一个由对象构成的数组，数组中的每个对象配置一个可选项，对象可以包含以下值："]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"键名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text"})}),e.jsx("td",{children:"选项文字（必填）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"选项对应的值（必填）"}),e.jsx("td",{children:e.jsx("code",{children:"string | number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"选项文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"子选项列表"}),e.jsx("td",{children:e.jsx("code",{children:"CascaderOption[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用选项"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["支持通过主题的 ",e.jsx("code",{children:"components.cascader"})," 覆盖 tokens，统一控制标题、选中色、选项高度等设计语言。"]})})]})})},nt=[{Component:De,key:"cascader-base",sources:{_:{tsx:`import React from 'react'
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
`}},title:"受控组件",identifier:"cascader-value",lang:"tsx",meta:{title:"受控组件"}}],tt={simulator:{compact:!0}},at=[{depth:1,text:"Cascader 级联选择",id:"cascader-级联选择"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"Form中使用",id:"form中使用"},{depth:3,text:"异步加载选项",id:"异步加载选项"},{depth:3,text:"自定义字段名",id:"自定义字段名"},{depth:3,text:"受控组件",id:"受控组件"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"},{depth:3,text:"CascaderOption 数据结构",id:"cascaderoption-数据结构"}],ot="/docs/components/cascader.md",lt="Cascader 级联选择",st="1770373480000",Qt=n=>n.children({MdContent:et,demos:nt,frontmatter:tt,slugs:at,filePath:ot,title:lt,updatedTime:st});export{et as MdContent,Qt as default,nt as demos,ot as filePath,tt as frontmatter,at as slugs,lt as title,st as updatedTime};
