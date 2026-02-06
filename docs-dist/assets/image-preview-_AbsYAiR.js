import{R as C,r as o,d as Be,j as e,V as I,s as Te,$ as Ge}from"./main-CX5QgiXt.js";import{C as c}from"./index-D361XNui.js";import{P as Me}from"./Popup-DLZFaqRn.js";import{S}from"./index-Clwguwvk.js";import{c as _e,T as re}from"./createComponentTokensHook-Hc3l7riF.js";import{M as $e}from"./index-CQ2P49YQ.js";import{I as Se}from"./index-BDzwQtXM.js";import{P as V}from"./Portal-BtmwX5Pt.js";import{S as ne}from"./Close-D6NXA1XS.js";import{T as Ne}from"./index-BUHqkOou.js";import"./Arrow-CFMZgj_G.js";import"./IconBase-D_kjvpJY.js";import"./hairline-6DGjxZ3L.js";import"./useAriaPress-sIRcrStb.js";import"./index-CJrLMJTa.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Animated-rPtBS5kg.js";import"./extends-CF3RwP-h.js";import"./index-BEnr4R_B.js";import"./index-CTcRCRb2.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-CF7tueuh.js";import"./index-4qDXDIEs.js";import"./SafeAreaView-DiARkPwI.js";import"./useSafeAreaPadding-Du1CT4G_.js";import"./number-DMCxwktP.js";import"./Overlay-uC1_KEGM.js";import"./Loading-Dy4Xe7Yb.js";import"./index-quLIWFrm.js";import"./Checked-C5Dq4Yeg.js";const Ve=n=>{const{palette:t,radii:l,fontSize:u,spacing:d}=n;return{colors:{background:"rgba(0,0,0,0.95)",indexBackground:"rgba(0,0,0,0.35)",indexText:"#fff",indicatorActive:t.primary?.[500]??"#1989fa",indicatorInactive:"rgba(255,255,255,0.4)",transparent:"transparent"},spacing:{indexTop:24,indexPaddingHorizontal:d.lg,indexPaddingVertical:d.xs},layout:{popupPadding:0,popupRadius:0},radii:{indexBadge:l.pill},typography:{indexTextSize:u.sm}}},Oe=_e("imagePreview",Ve),v=(n,t)=>t<=0?0:Math.max(0,Math.min(t-1,n)),te=8,se=te*te,He=C.memo(n=>{const{source:t,rendered:l,pressableHandlers:u}=n;return e.jsx($e,{style:m.slidePressable,...u,children:l?e.jsx(Se,{source:t,resizeMode:"contain",style:m.image}):e.jsx(I,{style:m.imagePlaceholder})})},(n,t)=>n.source===t.source&&n.rendered===t.rendered&&n.pressableHandlers===t.pressableHandlers),O=C.forwardRef((n,t)=>{const{visible:l,images:u=[],startPosition:d=0,swipeDuration:H=300,tokensOverride:D,lazyRender:y=!1,lazyRenderBuffer:me=1,showIndex:X=!0,indexRender:L,showIndicators:ge=!1,closeable:xe=!1,closeIcon:he,closeIconPosition:fe="top-right",closeOnlyClickCloseIcon:A=!1,overlay:ve=!0,overlayStyle:je,closeOnBackPress:Ce,closeOnPopstate:ye,zIndex:Pe,duration:Ie,safeAreaInsetTop:we=!0,safeAreaInsetBottom:Ee=!0,onChange:Y,onClose:W,onClosed:Re,beforeClose:q}=n,{colors:x,layout:U,radii:K,typography:Q,spacing:f}=Oe(D),B=o.useRef(null),J=o.useRef("close"),E=o.useRef(null),R=o.useRef(!1),p=u.length,[Fe,F]=o.useState(()=>v(d,p)),P=v(Fe,p),T=o.useRef({images:u,index:P,beforeClose:q,onClose:W});T.current={images:u,index:P,beforeClose:q,onClose:W};const ze=o.useMemo(()=>u.map(s=>Be(s)?{uri:s}:s),[u]);o.useEffect(()=>{F(s=>v(s,p))},[p]),o.useEffect(()=>{if(!l)return;const s=v(d,p);if(F(s),typeof requestAnimationFrame<"u"){const r=requestAnimationFrame(()=>{B.current?.swipeTo(s,!1)});return()=>cancelAnimationFrame(r)}},[p,d,l]);const z=o.useCallback(async s=>{const{beforeClose:r,images:i,index:a}=T.current;return r?await r({reason:s,index:a,image:i[a]})!==!1:!0},[]),k=o.useCallback(async(s,r=!1)=>{const{onClose:i,images:a,index:g}=T.current;!r&&!await z(s)||i?.({index:g,image:a[g]})},[z]),ke=o.useCallback(async s=>(J.current=s,z(s)),[z]),be=o.useCallback(()=>{k(J.current,!0)},[k]);o.useImperativeHandle(t,()=>({swipeTo:(s,r=!0)=>{const i=v(s,p);F(i),B.current?.swipeTo(i,r)}}),[p]);const De=o.useCallback(s=>{P!==s&&(F(s),Y?.(s))},[Y,P]),Z=o.useCallback(()=>{A||k("content")},[A,k]),b=o.useCallback(()=>{E.current=null,R.current=!1},[]),G=o.useCallback((s,r)=>{E.current={x:s,y:r},R.current=!1},[]),M=o.useCallback((s,r)=>{const i=E.current;if(!i)return;const a=s-i.x,g=r-i.y;a*a+g*g>=se&&(R.current=!0)},[]),_=o.useCallback((s,r)=>{const i=E.current,a=R.current;if(b(),!i||a)return;const g=s-i.x,$=r-i.y;g*g+$*$>=se||Z()},[Z,b]),Le=o.useMemo(()=>{const s={onTouchStart:r=>{const{pageX:i,pageY:a}=r.nativeEvent;i!=null&&a!=null&&G(i,a)},onTouchMove:r=>{const{pageX:i,pageY:a}=r.nativeEvent;i!=null&&a!=null&&M(i,a)},onTouchEnd:r=>{const{pageX:i,pageY:a}=r.nativeEvent;i!=null&&a!=null&&_(i,a)},onTouchCancel:b};return s.onMouseDown=r=>{const i=r.nativeEvent;i?.pageX!=null&&i?.pageY!=null&&G(i.pageX,i.pageY)},s.onMouseMove=r=>{const i=r.nativeEvent;i?.buttons===1&&i?.pageX!=null&&i?.pageY!=null&&M(i.pageX,i.pageY)},s.onMouseUp=r=>{const i=r.nativeEvent;i?.pageX!=null&&i?.pageY!=null&&_(i.pageX,i.pageY)},s},[M,G,b,_]),ee=o.useCallback((s,r)=>{if(!X||r===0)return null;const i=`${s+1} / ${r}`;return e.jsx(I,{style:[m.index,{top:f.indexTop}],testID:"rv-image-preview-index",children:e.jsx(I,{style:[m.indexBadge,{backgroundColor:x.indexBackground,borderRadius:K.indexBadge,paddingHorizontal:f.indexPaddingHorizontal,paddingVertical:f.indexPaddingVertical}],children:L?L({index:s,len:r}):e.jsx(re,{style:[m.indexText,{color:x.indexText,fontSize:Q.indexTextSize}],children:i})})})},[x.indexBackground,x.indexText,L,K.indexBadge,X,f.indexPaddingHorizontal,f.indexPaddingVertical,f.indexTop,Q.indexTextSize]),Ae=y?Math.max(0,me|0):0;return e.jsx(Me,{visible:l,overlay:ve,overlayStyle:je,closeOnOverlayPress:!A,closeOnBackPress:Ce,closeOnPopstate:ye,zIndex:Pe,duration:Ie,closeable:xe,closeIcon:he,closeIconPosition:fe,stopPropagation:!1,round:!1,safeAreaInsetTop:we,safeAreaInsetBottom:Ee,overlayTestID:"rv-image-preview-overlay",style:[m.popup,{backgroundColor:x.transparent,padding:U.popupPadding,borderRadius:U.popupRadius}],beforeClose:ke,onClose:be,onClosed:Re,children:e.jsxs(I,{style:[m.content,{backgroundColor:x.background}],children:[p===1?ee(0,1):null,p===0?e.jsx(I,{style:m.empty,testID:"rv-image-preview-empty"}):e.jsx(S,{ref:B,style:m.swiper,initialSwipe:v(d,p),loop:!1,autoplay:!1,touchable:p>1,indicator:(s,r)=>e.jsxs(e.Fragment,{children:[ee(r,s),ge&&s>1&&e.jsx(S.PagIndicator,{total:s,current:r,activeColor:x.indicatorActive,inactiveColor:x.indicatorInactive,style:{bottom:32},testID:"rv-image-preview-indicators"})]}),onChange:De,testID:"rv-image-preview-swiper",children:ze.map((s,r)=>e.jsx(S.Item,{style:m.slide,testID:`rv-image-preview-slide-${r}`,children:e.jsx(He,{source:s,rendered:!y||Math.abs(r-P)<=Ae,pressableHandlers:Le})},r))})]})})});O.displayName="ImagePreview";const m=Te.create({popup:{position:"absolute",top:0,left:0,right:0,bottom:0,width:"100%",height:"100%",maxWidth:"100%",maxHeight:"100%"},content:{flex:1},swiper:{flex:1},slide:{justifyContent:"center",alignItems:"center",flex:1},slidePressable:{flex:1,width:"100%",height:"100%",justifyContent:"center",alignItems:"center"},image:{width:"100%",height:"100%"},imagePlaceholder:{width:"100%",height:"100%"},empty:{flex:1},index:{position:"absolute",left:0,right:0,alignItems:"center",zIndex:1},indexBadge:{},indexText:{fontWeight:"500"}}),j=new Set,w=new Map,oe=n=>{V.remove(n),j.delete(n),w.delete(n)},N=n=>{const t=w.get(n);if(t){t();return}oe(n)},Xe=({id:n,options:t})=>{const[l,u]=o.useState(!0),d=o.useCallback(()=>{u(!1)},[]);o.useEffect(()=>(w.set(n,d),()=>{w.get(n)===d&&w.delete(n)}),[d,n]);const H=o.useCallback(y=>{t.onClose?.(y),u(!1)},[t]),D=o.useCallback(()=>{t.onClosed?.(),oe(n)},[n,t]);return e.jsx(O,{...t,visible:l,onClose:H,onClosed:D})},ie={open:(n={})=>{j.forEach(l=>N(l)),j.clear();const t=V.add(null);return j.add(t),V.update(t,e.jsx(Xe,{id:t,options:n})),()=>N(t)},clear:()=>{j.forEach(n=>N(n)),j.clear()}},Ye=Object.assign(O,{Host:Ge,open:ie.open,clear:ie.clear}),h=Ye,We=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"],le=()=>e.jsx(c.Group,{children:e.jsx(c,{title:"预览图片",isLink:!0,onPress:()=>h.open({images:We,onChange:n=>console.log(`当前展示第${n+1}张`)})})}),qe=`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default () => {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`,Ue={code:qe,sources:{_:{tsx:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default () => {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default () => {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"基础",identifier:"image-preview-basic",lang:"tsx",meta:{title:"基础"}},Ke=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function ce(){const n=C.useRef(null),t=l=>{n.current?.(),n.current=h.open({images:Ke,...l})};return C.useEffect(()=>()=>{n.current?.(),n.current=null},[]),e.jsxs(c.Group,{title:"配置项",children:[e.jsx(c,{title:"指定初始位置",isLink:!0,onPress:()=>t({startPosition:2})}),e.jsx(c,{title:"展示关闭按钮",isLink:!0,onPress:()=>t({startPosition:2,closeable:!0,closeIcon:e.jsx(ne,{size:18,fill:"#fff",color:"#fff"})})}),e.jsx(c,{title:"只允许点击关闭按钮关闭",isLink:!0,onPress:()=>t({closeable:!0,closeOnlyClickCloseIcon:!0,closeIcon:e.jsx(ne,{size:18,fill:"#fff",color:"#fff"})})}),e.jsx(c,{title:"监听关闭事件",isLink:!0,onPress:()=>t({startPosition:2,onClose:()=>{Ne.info("关闭预览")}})}),e.jsx(c,{title:"展示指示点",isLink:!0,onPress:()=>t({showIndicators:!0,showIndex:!1})})]})}const Qe=`import React from 'react'
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
`,Je={code:Qe,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"配置项",identifier:"image-preview-controls",lang:"tsx",meta:{title:"配置项"}},Ze=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function ae(){return e.jsx(c.Group,{children:e.jsx(c,{title:"异步关闭（2 秒后自动关闭）",isLink:!0,onPress:()=>{const n=h.open({images:Ze});setTimeout(()=>n(),2e3)}})})}const en=`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}


`,nn={code:en,sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}


`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}


`}},title:"异步关闭",identifier:"image-preview-async-close",lang:"tsx",meta:{title:"异步关闭"}},tn=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function ue(){const[n,t]=C.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(c.Group,{children:e.jsx(c,{title:"组件调用",isLink:!0,onPress:()=>t(!0)})}),e.jsx(h,{visible:n,onClose:()=>t(!1),images:tn,showIndicators:!0,showIndex:!1})]})}const sn=`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}


`,rn={code:sn,sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}


`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}


`}},title:"组件调用",identifier:"image-preview-component",lang:"tsx",meta:{title:"组件调用"}},on=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function de(){return e.jsx(c.Group,{children:e.jsx(c,{title:"自定义页码",isLink:!0,onPress:()=>h.open({images:on,showIndex:!0,indexRender:({index:n,len:t})=>e.jsx(re,{style:{color:"#fff"},children:`${n+1} / ${t}`})})})})}const ln=`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`,cn={code:ln,sources:{_:{tsx:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"自定义页码",identifier:"image-preview-custom-index",lang:"tsx",meta:{title:"自定义页码"}},an=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function pe(){const n=C.useRef(null),t=(d=0)=>{n.current?.(),n.current=h.open({images:an,startPosition:d,showIndicators:!0})},l=()=>{n.current?.(),n.current=null},u=()=>{h.clear(),n.current=null};return e.jsxs(c.Group,{title:"静态调用",children:[e.jsx(c,{title:"打开预览",isLink:!0,onPress:()=>t(0)}),e.jsx(c,{title:"从第二张开始",isLink:!0,onPress:()=>t(1)}),e.jsx(c,{title:"关闭当前",isLink:!0,onPress:l}),e.jsx(c,{title:"清空所有",isLink:!0,onPress:u})]})}const un=`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`,dn={code:un,sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`}},title:"静态调用",identifier:"image-preview-imperative",lang:"tsx",meta:{title:"静态调用"}},pn=function({previewer:n=()=>null,api:t=()=>null}){const l=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"imagepreview-图片预览","data-anchor":"imagepreview-图片预览",children:"ImagePreview 图片预览"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"全屏浏览图片，支持横向滑动切换、页码/指示器展示以及遮罩关闭控制。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(l,{code:"import { ImagePreview } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(l,{...Ue,children:e.jsx(le,{})})}),e.jsx("h3",{id:"配置项","data-anchor":"配置项",children:"配置项"}),e.jsx("div",{children:e.jsx(l,{...Je,children:e.jsx(ce,{})})}),e.jsx("h3",{id:"异步关闭","data-anchor":"异步关闭",children:"异步关闭"}),e.jsx("div",{children:e.jsx(l,{...nn,children:e.jsx(ae,{})})}),e.jsx("h3",{id:"组件调用","data-anchor":"组件调用",children:"组件调用"}),e.jsx("div",{children:e.jsx(l,{...rn,children:e.jsx(ue,{})})}),e.jsx("h3",{id:"自定义页码","data-anchor":"自定义页码",children:"自定义页码"}),e.jsx("div",{children:e.jsx(l,{...cn,children:e.jsx(de,{})})}),e.jsx("h3",{id:"静态调用","data-anchor":"静态调用",children:"静态调用"}),e.jsx("div",{children:e.jsx(l,{...dn,children:e.jsx(pe,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否展示 ImagePreview"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"images"})}),e.jsxs("td",{children:["图片数组，支持字符串 URL 或 ",e.jsx("code",{children:"ImageSourcePropType"})]}),e.jsx("td",{children:e.jsx("code",{children:"(string | ImageSourcePropType)[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"startPosition"})}),e.jsx("td",{children:"初始展示的图片下标"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeDuration"})}),e.jsx("td",{children:"图片切换动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lazyRender"})}),e.jsx("td",{children:"按需渲染图片（仅渲染当前页附近图片以优化性能）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lazyRenderBuffer"})}),e.jsxs("td",{children:[e.jsx("code",{children:"lazyRender"})," 开启时额外渲染的前后页数量"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showIndex"})}),e.jsx("td",{children:"是否展示顶部页码"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"indexRender"})}),e.jsx("td",{children:"自定义页码渲染内容"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," index, len ","}",") => ReactNode"]})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showIndicators"})}),e.jsx("td",{children:"是否展示底部指示器"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否展示关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIcon"})}),e.jsx("td",{children:"自定义关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIconPosition"})}),e.jsx("td",{children:"关闭图标位置"}),e.jsx("td",{children:e.jsx("code",{children:"'top-left' | 'top-right'"})}),e.jsx("td",{children:e.jsx("code",{children:"'top-right'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnlyClickCloseIcon"})}),e.jsx("td",{children:"仅点击关闭图标时才关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlay"})}),e.jsx("td",{children:"是否显示遮罩"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlayStyle"})}),e.jsx("td",{children:"遮罩样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnBackPress"})}),e.jsx("td",{children:"Android 返回键是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnPopstate"})}),e.jsx("td",{children:"Web history 返回时是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"自定义层级"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"duration"})}),e.jsx("td",{children:"动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"200"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"切换图片回调"}),e.jsx("td",{children:e.jsx("code",{children:"(index: number) => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"请求关闭时触发"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," index, image ","}",") => void"]})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"beforeClose"})}),e.jsxs("td",{children:["关闭前回调，返回 ",e.jsx("code",{children:"false"})," 阻止关闭"]}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," reason, index, image ","}",") => boolean | Promise<boolean>"]})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClosed"})}),e.jsx("td",{children:"关闭动画完成回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]})]})]}),e.jsx("h3",{id:"静态方法","data-anchor":"静态方法",children:"静态方法"}),e.jsxs("p",{children:["当需要在业务逻辑中直接打开预览时，可以使用静态方法。若项目未使用 ",e.jsx("code",{children:"ConfigProvider"}),"（它会自动挂载 ",e.jsx("code",{children:"<ImagePreview.Host />"}),"），记得在应用根部渲染一次 ",e.jsx("code",{children:"<ImagePreview.Host />"}),"，否则静态预览不会出现在界面上。"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"返回值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ImagePreview.open(options)"})}),e.jsx("td",{children:"打开图片预览"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ImagePreview.clear()"})}),e.jsx("td",{children:"关闭所有通过静态方法创建的预览"}),e.jsx("td",{children:e.jsx("code",{children:"void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ImagePreview.Host"})}),e.jsx("td",{children:"手动挂载静态预览的渲染容器"}),e.jsx("td",{children:e.jsx("code",{children:"ReactElement"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["差异说明：当前版本暂未实现双指缩放/拖拽等高级手势，后续将结合 ",e.jsx("code",{children:"gesture kit"})," 再迭代。"]})})]})})},mn=[{Component:le,key:"image-preview-basic",sources:{_:{tsx:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default () => {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default () => {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"基础",identifier:"image-preview-basic",lang:"tsx",meta:{title:"基础"}},{Component:ce,key:"image-preview-controls",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"配置项",identifier:"image-preview-controls",lang:"tsx",meta:{title:"配置项"}},{Component:ae,key:"image-preview-async-close",sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}


`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}


`}},title:"异步关闭",identifier:"image-preview-async-close",lang:"tsx",meta:{title:"异步关闭"}},{Component:ue,key:"image-preview-component",sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}


`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}


`}},title:"组件调用",identifier:"image-preview-component",lang:"tsx",meta:{title:"组件调用"}},{Component:de,key:"image-preview-custom-index",sources:{_:{tsx:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"自定义页码",identifier:"image-preview-custom-index",lang:"tsx",meta:{title:"自定义页码"}},{Component:pe,key:"image-preview-imperative",sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`}},title:"静态调用",identifier:"image-preview-imperative",lang:"tsx",meta:{title:"静态调用"}}],gn={simulator:{compact:!0}},xn=[{depth:1,text:"ImagePreview 图片预览",id:"imagepreview-图片预览"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"配置项",id:"配置项"},{depth:3,text:"异步关闭",id:"异步关闭"},{depth:3,text:"组件调用",id:"组件调用"},{depth:3,text:"自定义页码",id:"自定义页码"},{depth:3,text:"静态调用",id:"静态调用"},{depth:2,text:"API",id:"api"},{depth:3,text:"静态方法",id:"静态方法"}],hn="/docs/components/image-preview.md",fn="ImagePreview 图片预览",vn="1766649452000",Un=n=>n.children({MdContent:pn,demos:mn,frontmatter:gn,slugs:xn,filePath:hn,title:fn,updatedTime:vn});export{pn as MdContent,Un as default,mn as demos,hn as filePath,gn as frontmatter,xn as slugs,fn as title,vn as updatedTime};
