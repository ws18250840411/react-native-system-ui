import{j as e,R as r}from"./main-BaO0UwhN.js";import{C as t}from"./index-BSowDGnV.js";import{T as s}from"./index-c00oQYhR.js";import{S as C}from"./Info-Bj7TM9VS.js";import{S as j}from"./Star-1hQGEyOq.js";import{S as g}from"./Switch-BdCyK9Li.js";import"./Arrow-Y1DZl7O_.js";import"./IconBase-elbJGmhV.js";import"./createComponentTokensHook-CsVvHGcO.js";import"./hairline-BK-uo_cS.js";import"./index-DvDeiqEs.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-vCycRA2r.js";import"./index-CJrLMJTa.js";import"./Portal-vGIZ7r4p.js";import"./Overlay-Dg1pVwqB.js";import"./Loading-DQ_FTosf.js";import"./index-B5BUYRhk.js";import"./Checked-B0wewlVb.js";import"./Close-CwI1Rg5N.js";import"./index-DUXwXCyb.js";import"./index-B-eg80hO.js";import"./Animated-B6RZ2J5i.js";import"./index-CQklZrC-.js";import"./index-DbTCD1vV.js";import"./SafeAreaView-CB0OnAI8.js";import"./useSafeAreaPadding-wXYTmIbN.js";import"./useOverlayStack-B46smszT.js";import"./animation-BpxpeSKC.js";import"./useControllableValue-CUaUrHTT.js";import"./number-C0AOJ3fJ.js";function n(){return e.jsxs(t.Group,{children:[e.jsx(t,{title:"文字提示",isLink:!0,onPress:()=>s.info("提示内容")}),e.jsx(t,{title:"加载提示",isLink:!0,onPress:()=>s.loading({message:"加载中...",forbidClick:!0})}),e.jsx(t,{title:"成功提示",isLink:!0,onPress:()=>s.success("操作成功")}),e.jsx(t,{title:"失败提示",isLink:!0,onPress:()=>s.fail("操作失败")})]})}const P=`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="文字提示" isLink onPress={() => Toast.info('提示内容')} />
      <Cell
        title="加载提示"
        isLink
        onPress={() =>
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
          })
        }
      />
      <Cell title="成功提示" isLink onPress={() => Toast.success('操作成功')} />
      <Cell title="失败提示" isLink onPress={() => Toast.fail('操作失败')} />
    </Cell.Group>
  )
}
`,y={code:P,sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="文字提示" isLink onPress={() => Toast.info('提示内容')} />
      <Cell
        title="加载提示"
        isLink
        onPress={() =>
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
          })
        }
      />
      <Cell title="成功提示" isLink onPress={() => Toast.success('操作成功')} />
      <Cell title="失败提示" isLink onPress={() => Toast.fail('操作失败')} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="文字提示" isLink onPress={() => Toast.info('提示内容')} />
      <Cell
        title="加载提示"
        isLink
        onPress={() =>
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
          })
        }
      />
      <Cell title="成功提示" isLink onPress={() => Toast.success('操作成功')} />
      <Cell title="失败提示" isLink onPress={() => Toast.fail('操作失败')} />
    </Cell.Group>
  )
}
`}},title:"基础用法",identifier:"toast-base",lang:"tsx",meta:{title:"基础用法"}};function a(){return e.jsxs(t.Group,{children:[e.jsx(t,{title:"顶部弹出",isLink:!0,onPress:()=>s.show({position:"top",message:"顶部提示"})}),e.jsx(t,{title:"中部弹出",isLink:!0,onPress:()=>s.show({position:"middle",message:"中部提示"})}),e.jsx(t,{title:"底部弹出",isLink:!0,onPress:()=>s.show({position:"bottom",message:"底部提示"})})]})}const k=`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastPositionDemo() {
  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => Toast.show({ position: 'top', message: '顶部提示' })} />
      <Cell
        title="中部弹出"
        isLink
        onPress={() => Toast.show({ position: 'middle', message: '中部提示' })}
      />
      <Cell
        title="底部弹出"
        isLink
        onPress={() => Toast.show({ position: 'bottom', message: '底部提示' })}
      />
    </Cell.Group>
  )
}
`,v={code:k,sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastPositionDemo() {
  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => Toast.show({ position: 'top', message: '顶部提示' })} />
      <Cell
        title="中部弹出"
        isLink
        onPress={() => Toast.show({ position: 'middle', message: '中部提示' })}
      />
      <Cell
        title="底部弹出"
        isLink
        onPress={() => Toast.show({ position: 'bottom', message: '底部提示' })}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastPositionDemo() {
  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => Toast.show({ position: 'top', message: '顶部提示' })} />
      <Cell
        title="中部弹出"
        isLink
        onPress={() => Toast.show({ position: 'middle', message: '中部提示' })}
      />
      <Cell
        title="底部弹出"
        isLink
        onPress={() => Toast.show({ position: 'bottom', message: '底部提示' })}
      />
    </Cell.Group>
  )
}
`}},title:"位置控制",identifier:"toast-position",lang:"tsx",meta:{title:"位置控制"}};function c(){const i=()=>{const l=s.loading({message:"加载中...",forbidClick:!0});setTimeout(()=>{l.config({type:"success",message:"加载完成",duration:1500})},1500)};return e.jsx(t.Group,{children:e.jsx(t,{title:"加载并更新状态",isLink:!0,onPress:i})})}const L=`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastLoadingDemo() {
  const showLoading = () => {
    const toast = Toast.loading({ message: '加载中...', forbidClick: true })

    setTimeout(() => {
      toast.config({ type: 'success', message: '加载完成', duration: 1500 })
    }, 1500)
  }

  return (
    <Cell.Group>
      <Cell title="加载并更新状态" isLink onPress={showLoading} />
    </Cell.Group>
  )
}
`,w={code:L,sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastLoadingDemo() {
  const showLoading = () => {
    const toast = Toast.loading({ message: '加载中...', forbidClick: true })

    setTimeout(() => {
      toast.config({ type: 'success', message: '加载完成', duration: 1500 })
    }, 1500)
  }

  return (
    <Cell.Group>
      <Cell title="加载并更新状态" isLink onPress={showLoading} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastLoadingDemo() {
  const showLoading = () => {
    const toast = Toast.loading({ message: '加载中...', forbidClick: true })

    setTimeout(() => {
      toast.config({ type: 'success', message: '加载完成', duration: 1500 })
    }, 1500)
  }

  return (
    <Cell.Group>
      <Cell title="加载并更新状态" isLink onPress={showLoading} />
    </Cell.Group>
  )
}
`}},title:"动态更新",identifier:"toast-loading",lang:"tsx",meta:{title:"动态更新"}};function d(){return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"使用图标组件",isLink:!0,onPress:()=>s.show({message:"自定义图标",icon:e.jsx(C,{size:22,fill:"#2563eb",color:"#2563eb"})})}),e.jsx(t,{title:"使用图片",isLink:!0,onPress:()=>s.show({message:"也可以放图片",icon:e.jsx(j,{size:22,fill:"#fbbf24",color:"#fbbf24"}),duration:1500})})]})}const R=`import React from 'react'

import { Info, Star } from 'react-native-system-icon'
import { Cell, Toast } from 'react-native-system-ui'

export default function ToastCustomIconDemo() {
  return (
    <>
      <Cell
        title="使用图标组件"
        isLink
        onPress={() =>
          Toast.show({
            message: '自定义图标',
            icon: <Info size={22} fill="#2563eb" color="#2563eb" />,
          })
        }
      />
      <Cell
        title="使用图片"
        isLink
        onPress={() =>
          Toast.show({
            message: '也可以放图片',
            icon: <Star size={22} fill="#fbbf24" color="#fbbf24" />,
            duration: 1500,
          })
        }
      />
    </>
  )
}
`,b={code:R,sources:{_:{tsx:`import React from 'react'

import { Info, Star } from 'react-native-system-icon'
import { Cell, Toast } from 'react-native-system-ui'

export default function ToastCustomIconDemo() {
  return (
    <>
      <Cell
        title="使用图标组件"
        isLink
        onPress={() =>
          Toast.show({
            message: '自定义图标',
            icon: <Info size={22} fill="#2563eb" color="#2563eb" />,
          })
        }
      />
      <Cell
        title="使用图片"
        isLink
        onPress={() =>
          Toast.show({
            message: '也可以放图片',
            icon: <Star size={22} fill="#fbbf24" color="#fbbf24" />,
            duration: 1500,
          })
        }
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info, Star } from 'react-native-system-icon'
import { Cell, Toast } from 'react-native-system-ui'

export default function ToastCustomIconDemo() {
  return (
    <>
      <Cell
        title="使用图标组件"
        isLink
        onPress={() =>
          Toast.show({
            message: '自定义图标',
            icon: <Info size={22} fill="#2563eb" color="#2563eb" />,
          })
        }
      />
      <Cell
        title="使用图片"
        isLink
        onPress={() =>
          Toast.show({
            message: '也可以放图片',
            icon: <Star size={22} fill="#fbbf24" color="#fbbf24" />,
            duration: 1500,
          })
        }
      />
    </>
  )
}
`}},title:"自定义图标",identifier:"toast-customicon",lang:"tsx",meta:{title:"自定义图标"}};function u(){return e.jsxs(t.Group,{children:[e.jsx(t,{title:"禁止背景点击",isLink:!0,onPress:()=>s.show({message:"请求处理中...",forbidClick:!0,duration:1500})}),e.jsx(t,{title:"展示遮罩",isLink:!0,onPress:()=>s.show({message:"带遮罩提示",overlay:!0,duration:1500})}),e.jsx(t,{title:"点击遮罩关闭",isLink:!0,onPress:()=>s.show({message:"点击遮罩关闭",overlay:!0,closeOnClickOverlay:!0,duration:0})}),e.jsx(t,{title:"点击提示即可关闭",isLink:!0,onPress:()=>s.show({message:"点击我即可关闭",closeOnClick:!0,duration:0})})]})}const D=`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastInteractionDemo() {
  return (
    <Cell.Group>
      <Cell
        title="禁止背景点击"
        isLink
        onPress={() => Toast.show({ message: '请求处理中...', forbidClick: true, duration: 1500 })}
      />
      <Cell
        title="展示遮罩"
        isLink
        onPress={() => Toast.show({ message: '带遮罩提示', overlay: true, duration: 1500 })}
      />
      <Cell
        title="点击遮罩关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击遮罩关闭',
            overlay: true,
            closeOnClickOverlay: true,
            duration: 0,
          })
        }
      />
      <Cell
        title="点击提示即可关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击我即可关闭',
            closeOnClick: true,
            duration: 0,
          })
        }
      />
    </Cell.Group>
  )
}
`,M={code:D,sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastInteractionDemo() {
  return (
    <Cell.Group>
      <Cell
        title="禁止背景点击"
        isLink
        onPress={() => Toast.show({ message: '请求处理中...', forbidClick: true, duration: 1500 })}
      />
      <Cell
        title="展示遮罩"
        isLink
        onPress={() => Toast.show({ message: '带遮罩提示', overlay: true, duration: 1500 })}
      />
      <Cell
        title="点击遮罩关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击遮罩关闭',
            overlay: true,
            closeOnClickOverlay: true,
            duration: 0,
          })
        }
      />
      <Cell
        title="点击提示即可关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击我即可关闭',
            closeOnClick: true,
            duration: 0,
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastInteractionDemo() {
  return (
    <Cell.Group>
      <Cell
        title="禁止背景点击"
        isLink
        onPress={() => Toast.show({ message: '请求处理中...', forbidClick: true, duration: 1500 })}
      />
      <Cell
        title="展示遮罩"
        isLink
        onPress={() => Toast.show({ message: '带遮罩提示', overlay: true, duration: 1500 })}
      />
      <Cell
        title="点击遮罩关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击遮罩关闭',
            overlay: true,
            closeOnClickOverlay: true,
            duration: 0,
          })
        }
      />
      <Cell
        title="点击提示即可关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击我即可关闭',
            closeOnClick: true,
            duration: 0,
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"禁止点击",identifier:"toast-forbidclick",lang:"tsx",meta:{title:"禁止点击"}};function m(){const i=r.useRef(null),l=r.useRef(null),[o,f]=r.useState(!1);r.useEffect(()=>{s.allowMultiple(o)},[o]),r.useEffect(()=>()=>{s.allowMultiple(!1),s.clear()},[]);const h=()=>{i.current=s.show({message:"第一个 Toast",duration:0})},x=()=>{l.current=s.show({message:"第二个 Toast",duration:0})};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"允许多个 Toast",value:e.jsx(g,{checked:o,onChange:T=>f(T)})}),e.jsx(t,{title:"显示第一个 Toast",isLink:!0,onPress:h}),e.jsx(t,{title:"显示第二个 Toast",isLink:!0,onPress:x}),e.jsx(t,{title:"清除第一个",isLink:!0,onPress:()=>i.current?.clear()}),e.jsx(t,{title:"清除第二个",isLink:!0,onPress:()=>l.current?.clear()})]})}const G=`import React from 'react'

import { Cell, Switch, Toast } from 'react-native-system-ui'

export default function ToastMultipleDemo() {
  const firstRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const secondRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const [multiple, setMultiple] = React.useState(false)

  React.useEffect(() => {
    Toast.allowMultiple(multiple)
  }, [multiple])

  React.useEffect(() => {
    return () => {
      Toast.allowMultiple(false)
      Toast.clear()
    }
  }, [])

  const showFirst = () => {
    firstRef.current = Toast.show({
      message: '第一个 Toast',
      duration: 0,
    })
  }

  const showSecond = () => {
    secondRef.current = Toast.show({
      message: '第二个 Toast',
      duration: 0,
    })
  }

  return (
    <>
      <Cell title="允许多个 Toast" value={<Switch checked={multiple} onChange={val => setMultiple(val)} />} />
      <Cell title="显示第一个 Toast" isLink onPress={showFirst} />
      <Cell title="显示第二个 Toast" isLink onPress={showSecond} />
      <Cell title="清除第一个" isLink onPress={() => firstRef.current?.clear()} />
      <Cell title="清除第二个" isLink onPress={() => secondRef.current?.clear()} />
    </>
  )
}
`,_={code:G,sources:{_:{tsx:`import React from 'react'

import { Cell, Switch, Toast } from 'react-native-system-ui'

export default function ToastMultipleDemo() {
  const firstRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const secondRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const [multiple, setMultiple] = React.useState(false)

  React.useEffect(() => {
    Toast.allowMultiple(multiple)
  }, [multiple])

  React.useEffect(() => {
    return () => {
      Toast.allowMultiple(false)
      Toast.clear()
    }
  }, [])

  const showFirst = () => {
    firstRef.current = Toast.show({
      message: '第一个 Toast',
      duration: 0,
    })
  }

  const showSecond = () => {
    secondRef.current = Toast.show({
      message: '第二个 Toast',
      duration: 0,
    })
  }

  return (
    <>
      <Cell title="允许多个 Toast" value={<Switch checked={multiple} onChange={val => setMultiple(val)} />} />
      <Cell title="显示第一个 Toast" isLink onPress={showFirst} />
      <Cell title="显示第二个 Toast" isLink onPress={showSecond} />
      <Cell title="清除第一个" isLink onPress={() => firstRef.current?.clear()} />
      <Cell title="清除第二个" isLink onPress={() => secondRef.current?.clear()} />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Switch, Toast } from 'react-native-system-ui'

export default function ToastMultipleDemo() {
  const firstRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const secondRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const [multiple, setMultiple] = React.useState(false)

  React.useEffect(() => {
    Toast.allowMultiple(multiple)
  }, [multiple])

  React.useEffect(() => {
    return () => {
      Toast.allowMultiple(false)
      Toast.clear()
    }
  }, [])

  const showFirst = () => {
    firstRef.current = Toast.show({
      message: '第一个 Toast',
      duration: 0,
    })
  }

  const showSecond = () => {
    secondRef.current = Toast.show({
      message: '第二个 Toast',
      duration: 0,
    })
  }

  return (
    <>
      <Cell title="允许多个 Toast" value={<Switch checked={multiple} onChange={val => setMultiple(val)} />} />
      <Cell title="显示第一个 Toast" isLink onPress={showFirst} />
      <Cell title="显示第二个 Toast" isLink onPress={showSecond} />
      <Cell title="清除第一个" isLink onPress={() => firstRef.current?.clear()} />
      <Cell title="清除第二个" isLink onPress={() => secondRef.current?.clear()} />
    </>
  )
}
`}},title:"多条提示",identifier:"toast-multiple",lang:"tsx",meta:{title:"多条提示"}};function p(){const i=()=>{s.setDefaultOptions({duration:3e3,position:"top"}),s.success("之后默认 3 秒并展示在顶部")},l=()=>{s.setDefaultOptions("loading",{forbidClick:!0,duration:0}),s.loading({message:"loading 默认禁止点击",duration:1e3})},o=()=>{s.resetDefaultOptions(),s.show("配置已还原")};return e.jsxs(t.Group,{children:[e.jsx(t,{title:"设置默认样式",isLink:!0,onPress:i}),e.jsx(t,{title:"配置 Loading 默认值",isLink:!0,onPress:l}),e.jsx(t,{title:"重置默认配置",isLink:!0,onPress:o})]})}const S=`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastGlobalDemo() {
  const setPrimary = () => {
    Toast.setDefaultOptions({ duration: 3000, position: 'top' })
    Toast.success('之后默认 3 秒并展示在顶部')
  }

  const setLoadingDefault = () => {
    Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 })
    Toast.loading({ message: 'loading 默认禁止点击', duration: 1000 })
  }

  const reset = () => {
    Toast.resetDefaultOptions()
    Toast.show('配置已还原')
  }

  return (
    <Cell.Group>
      <Cell title="设置默认样式" isLink onPress={setPrimary} />
      <Cell title="配置 Loading 默认值" isLink onPress={setLoadingDefault} />
      <Cell title="重置默认配置" isLink onPress={reset} />
    </Cell.Group>
  )
}
`,O={code:S,sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastGlobalDemo() {
  const setPrimary = () => {
    Toast.setDefaultOptions({ duration: 3000, position: 'top' })
    Toast.success('之后默认 3 秒并展示在顶部')
  }

  const setLoadingDefault = () => {
    Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 })
    Toast.loading({ message: 'loading 默认禁止点击', duration: 1000 })
  }

  const reset = () => {
    Toast.resetDefaultOptions()
    Toast.show('配置已还原')
  }

  return (
    <Cell.Group>
      <Cell title="设置默认样式" isLink onPress={setPrimary} />
      <Cell title="配置 Loading 默认值" isLink onPress={setLoadingDefault} />
      <Cell title="重置默认配置" isLink onPress={reset} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastGlobalDemo() {
  const setPrimary = () => {
    Toast.setDefaultOptions({ duration: 3000, position: 'top' })
    Toast.success('之后默认 3 秒并展示在顶部')
  }

  const setLoadingDefault = () => {
    Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 })
    Toast.loading({ message: 'loading 默认禁止点击', duration: 1000 })
  }

  const reset = () => {
    Toast.resetDefaultOptions()
    Toast.show('配置已还原')
  }

  return (
    <Cell.Group>
      <Cell title="设置默认样式" isLink onPress={setPrimary} />
      <Cell title="配置 Loading 默认值" isLink onPress={setLoadingDefault} />
      <Cell title="重置默认配置" isLink onPress={reset} />
    </Cell.Group>
  )
}
`}},title:"默认配置",identifier:"toast-global",lang:"tsx",meta:{title:"默认配置"}},I=function({previewer:i=()=>null,api:l=()=>null}){const o=i;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"toast-轻提示","data-anchor":"toast-轻提示",children:"Toast 轻提示"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Toast } from 'react-native-system-ui'",lang:"js"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["使用 Toast 前，需在应用根节点包裹 ",e.jsx("strong",{children:"ConfigProvider"})," 或 ",e.jsx("strong",{children:"Portal.Host"}),"，否则弹层无法挂载。推荐使用 ",e.jsx("a",{href:"./config-provider.md",children:"ConfigProvider"}),"（内置主题与 PortalHost）。"]})}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(o,{...y,children:e.jsx(n,{})})}),e.jsx("h3",{id:"位置控制","data-anchor":"位置控制",children:"位置控制"}),e.jsx("div",{children:e.jsx(o,{...v,children:e.jsx(a,{})})}),e.jsx("h3",{id:"加载与动态更新","data-anchor":"加载与动态更新",children:"加载与动态更新"}),e.jsx("div",{children:e.jsx(o,{...w,children:e.jsx(c,{})})}),e.jsx("h3",{id:"自定义图标","data-anchor":"自定义图标",children:"自定义图标"}),e.jsx("div",{children:e.jsx(o,{...b,children:e.jsx(d,{})})}),e.jsx("h3",{id:"禁止背景点击","data-anchor":"禁止背景点击",children:"禁止背景点击"}),e.jsx("div",{children:e.jsx(o,{...M,children:e.jsx(u,{})})}),e.jsx("h3",{id:"多条提示并行","data-anchor":"多条提示并行",children:"多条提示并行"}),e.jsx("div",{children:e.jsx(o,{..._,children:e.jsx(m,{})})}),e.jsx("h3",{id:"全局配置","data-anchor":"全局配置",children:"全局配置"}),e.jsx("div",{children:e.jsx(o,{...O,children:e.jsx(p,{})})}),e.jsx("h3",{id:"静态调用","data-anchor":"静态调用",children:"静态调用"}),e.jsxs("p",{children:["Toast 支持 ",e.jsx("code",{children:"show/success/fail/loading/info"})," 等静态方法，直接在任意位置调用即可展示提示。"]}),e.jsx(o,{code:`Toast.success('提交成功')
Toast.show({ message: '处理中', position: 'top' })
Toast.loading({ message: '加载中', forbidClick: true })`,lang:"ts"}),e.jsx("p",{children:"静态方法会返回 toast 句柄，可用于动态更新或清除："}),e.jsx(o,{code:`const toast = Toast.loading({ message: '加载中...', forbidClick: true })
toast.config({ type: 'success', message: '完成', duration: 1500 })`,lang:"ts"}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示（受控模式）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"message"})}),e.jsx("td",{children:"提示文本"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"提示类型（决定默认图标）"}),e.jsx("td",{children:e.jsx("code",{children:"'info' | 'success' | 'fail' | 'loading'"})}),e.jsx("td",{children:e.jsx("code",{children:"'info'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"自定义图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconSize"})}),e.jsx("td",{children:"内置图标/加载图标大小"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"36"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"duration"})}),e.jsx("td",{children:"自动关闭延时（ms），0 表示不会自动关闭"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"2000"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"position"})}),e.jsx("td",{children:"显示位置"}),e.jsx("td",{children:e.jsx("code",{children:"'top' | 'middle' | 'bottom'"})}),e.jsx("td",{children:e.jsx("code",{children:"'middle'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlay"})}),e.jsx("td",{children:"是否展示半透明遮罩"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlayStyle"})}),e.jsx("td",{children:"遮罩样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"forbidClick"})}),e.jsx("td",{children:"展示时禁止点击背景"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnClickOverlay"})}),e.jsx("td",{children:"点击遮罩层后是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnClick"})}),e.jsx("td",{children:"点击 Toast 本身后是否立即关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"Toast 容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textStyle"})}),e.jsx("td",{children:"文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"关闭时触发（静态和受控模式均会回调）"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOpened"})}),e.jsx("td",{children:"完全展示后的回调函数"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClosed"})}),e.jsx("td",{children:"动画结束后触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"静态方法","data-anchor":"静态方法",children:"静态方法"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"`Toast.show(options \\"}),e.jsx("td",{children:"message)`"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Toast.success / fail / info / loading(options)"})}),e.jsxs("td",{children:["快捷方法，自动设置 ",e.jsx("code",{children:"type"}),"，返回 ",e.jsxs("code",{children:["{"," clear, config, update ","}"]})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Toast.clear()"})}),e.jsx("td",{children:"关闭所有通过静态方法创建的提示"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Toast.allowMultiple(value)"})}),e.jsx("td",{children:"是否允许多个 Toast 同时存在，默认单例"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Toast.setDefaultOptions(options)"})}),e.jsxs("td",{children:["设置全局默认配置，或针对某个 ",e.jsx("code",{children:"type"})," 设置默认项"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Toast.resetDefaultOptions(type?)"})}),e.jsxs("td",{children:["重置默认配置，",e.jsx("code",{children:"type"})," 为空时清空所有默认项"]})]})]})]}),e.jsx("h2",{id:"差异说明","data-anchor":"差异说明",children:"差异说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["React Vant 支持直接调用 ",e.jsx("code",{children:"Toast(options \\| message)"}),"；本库使用 ",e.jsx("code",{children:"Toast.show(options \\| message)"}),"，并额外提供 ",e.jsx("code",{children:"<Toast visible />"})," 受控用法。"]}),e.jsxs("li",{children:["React Vant 提供 ",e.jsx("code",{children:"teleport/className/overlayClass/transition"})," 等 DOM 能力；本库在 React Native 环境不适用，统一通过 Portal + 样式 props（如 ",e.jsx("code",{children:"style/overlayStyle"}),"）实现。"]})]})]})})},N=[{Component:n,key:"toast-base",sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="文字提示" isLink onPress={() => Toast.info('提示内容')} />
      <Cell
        title="加载提示"
        isLink
        onPress={() =>
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
          })
        }
      />
      <Cell title="成功提示" isLink onPress={() => Toast.success('操作成功')} />
      <Cell title="失败提示" isLink onPress={() => Toast.fail('操作失败')} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="文字提示" isLink onPress={() => Toast.info('提示内容')} />
      <Cell
        title="加载提示"
        isLink
        onPress={() =>
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
          })
        }
      />
      <Cell title="成功提示" isLink onPress={() => Toast.success('操作成功')} />
      <Cell title="失败提示" isLink onPress={() => Toast.fail('操作失败')} />
    </Cell.Group>
  )
}
`}},title:"基础用法",identifier:"toast-base",lang:"tsx",meta:{title:"基础用法"}},{Component:a,key:"toast-position",sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastPositionDemo() {
  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => Toast.show({ position: 'top', message: '顶部提示' })} />
      <Cell
        title="中部弹出"
        isLink
        onPress={() => Toast.show({ position: 'middle', message: '中部提示' })}
      />
      <Cell
        title="底部弹出"
        isLink
        onPress={() => Toast.show({ position: 'bottom', message: '底部提示' })}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastPositionDemo() {
  return (
    <Cell.Group>
      <Cell title="顶部弹出" isLink onPress={() => Toast.show({ position: 'top', message: '顶部提示' })} />
      <Cell
        title="中部弹出"
        isLink
        onPress={() => Toast.show({ position: 'middle', message: '中部提示' })}
      />
      <Cell
        title="底部弹出"
        isLink
        onPress={() => Toast.show({ position: 'bottom', message: '底部提示' })}
      />
    </Cell.Group>
  )
}
`}},title:"位置控制",identifier:"toast-position",lang:"tsx",meta:{title:"位置控制"}},{Component:c,key:"toast-loading",sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastLoadingDemo() {
  const showLoading = () => {
    const toast = Toast.loading({ message: '加载中...', forbidClick: true })

    setTimeout(() => {
      toast.config({ type: 'success', message: '加载完成', duration: 1500 })
    }, 1500)
  }

  return (
    <Cell.Group>
      <Cell title="加载并更新状态" isLink onPress={showLoading} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastLoadingDemo() {
  const showLoading = () => {
    const toast = Toast.loading({ message: '加载中...', forbidClick: true })

    setTimeout(() => {
      toast.config({ type: 'success', message: '加载完成', duration: 1500 })
    }, 1500)
  }

  return (
    <Cell.Group>
      <Cell title="加载并更新状态" isLink onPress={showLoading} />
    </Cell.Group>
  )
}
`}},title:"动态更新",identifier:"toast-loading",lang:"tsx",meta:{title:"动态更新"}},{Component:d,key:"toast-customicon",sources:{_:{tsx:`import React from 'react'

import { Info, Star } from 'react-native-system-icon'
import { Cell, Toast } from 'react-native-system-ui'

export default function ToastCustomIconDemo() {
  return (
    <>
      <Cell
        title="使用图标组件"
        isLink
        onPress={() =>
          Toast.show({
            message: '自定义图标',
            icon: <Info size={22} fill="#2563eb" color="#2563eb" />,
          })
        }
      />
      <Cell
        title="使用图片"
        isLink
        onPress={() =>
          Toast.show({
            message: '也可以放图片',
            icon: <Star size={22} fill="#fbbf24" color="#fbbf24" />,
            duration: 1500,
          })
        }
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info, Star } from 'react-native-system-icon'
import { Cell, Toast } from 'react-native-system-ui'

export default function ToastCustomIconDemo() {
  return (
    <>
      <Cell
        title="使用图标组件"
        isLink
        onPress={() =>
          Toast.show({
            message: '自定义图标',
            icon: <Info size={22} fill="#2563eb" color="#2563eb" />,
          })
        }
      />
      <Cell
        title="使用图片"
        isLink
        onPress={() =>
          Toast.show({
            message: '也可以放图片',
            icon: <Star size={22} fill="#fbbf24" color="#fbbf24" />,
            duration: 1500,
          })
        }
      />
    </>
  )
}
`}},title:"自定义图标",identifier:"toast-customicon",lang:"tsx",meta:{title:"自定义图标"}},{Component:u,key:"toast-forbidclick",sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastInteractionDemo() {
  return (
    <Cell.Group>
      <Cell
        title="禁止背景点击"
        isLink
        onPress={() => Toast.show({ message: '请求处理中...', forbidClick: true, duration: 1500 })}
      />
      <Cell
        title="展示遮罩"
        isLink
        onPress={() => Toast.show({ message: '带遮罩提示', overlay: true, duration: 1500 })}
      />
      <Cell
        title="点击遮罩关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击遮罩关闭',
            overlay: true,
            closeOnClickOverlay: true,
            duration: 0,
          })
        }
      />
      <Cell
        title="点击提示即可关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击我即可关闭',
            closeOnClick: true,
            duration: 0,
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastInteractionDemo() {
  return (
    <Cell.Group>
      <Cell
        title="禁止背景点击"
        isLink
        onPress={() => Toast.show({ message: '请求处理中...', forbidClick: true, duration: 1500 })}
      />
      <Cell
        title="展示遮罩"
        isLink
        onPress={() => Toast.show({ message: '带遮罩提示', overlay: true, duration: 1500 })}
      />
      <Cell
        title="点击遮罩关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击遮罩关闭',
            overlay: true,
            closeOnClickOverlay: true,
            duration: 0,
          })
        }
      />
      <Cell
        title="点击提示即可关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击我即可关闭',
            closeOnClick: true,
            duration: 0,
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"禁止点击",identifier:"toast-forbidclick",lang:"tsx",meta:{title:"禁止点击"}},{Component:m,key:"toast-multiple",sources:{_:{tsx:`import React from 'react'

import { Cell, Switch, Toast } from 'react-native-system-ui'

export default function ToastMultipleDemo() {
  const firstRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const secondRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const [multiple, setMultiple] = React.useState(false)

  React.useEffect(() => {
    Toast.allowMultiple(multiple)
  }, [multiple])

  React.useEffect(() => {
    return () => {
      Toast.allowMultiple(false)
      Toast.clear()
    }
  }, [])

  const showFirst = () => {
    firstRef.current = Toast.show({
      message: '第一个 Toast',
      duration: 0,
    })
  }

  const showSecond = () => {
    secondRef.current = Toast.show({
      message: '第二个 Toast',
      duration: 0,
    })
  }

  return (
    <>
      <Cell title="允许多个 Toast" value={<Switch checked={multiple} onChange={val => setMultiple(val)} />} />
      <Cell title="显示第一个 Toast" isLink onPress={showFirst} />
      <Cell title="显示第二个 Toast" isLink onPress={showSecond} />
      <Cell title="清除第一个" isLink onPress={() => firstRef.current?.clear()} />
      <Cell title="清除第二个" isLink onPress={() => secondRef.current?.clear()} />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Switch, Toast } from 'react-native-system-ui'

export default function ToastMultipleDemo() {
  const firstRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const secondRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const [multiple, setMultiple] = React.useState(false)

  React.useEffect(() => {
    Toast.allowMultiple(multiple)
  }, [multiple])

  React.useEffect(() => {
    return () => {
      Toast.allowMultiple(false)
      Toast.clear()
    }
  }, [])

  const showFirst = () => {
    firstRef.current = Toast.show({
      message: '第一个 Toast',
      duration: 0,
    })
  }

  const showSecond = () => {
    secondRef.current = Toast.show({
      message: '第二个 Toast',
      duration: 0,
    })
  }

  return (
    <>
      <Cell title="允许多个 Toast" value={<Switch checked={multiple} onChange={val => setMultiple(val)} />} />
      <Cell title="显示第一个 Toast" isLink onPress={showFirst} />
      <Cell title="显示第二个 Toast" isLink onPress={showSecond} />
      <Cell title="清除第一个" isLink onPress={() => firstRef.current?.clear()} />
      <Cell title="清除第二个" isLink onPress={() => secondRef.current?.clear()} />
    </>
  )
}
`}},title:"多条提示",identifier:"toast-multiple",lang:"tsx",meta:{title:"多条提示"}},{Component:p,key:"toast-global",sources:{_:{tsx:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastGlobalDemo() {
  const setPrimary = () => {
    Toast.setDefaultOptions({ duration: 3000, position: 'top' })
    Toast.success('之后默认 3 秒并展示在顶部')
  }

  const setLoadingDefault = () => {
    Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 })
    Toast.loading({ message: 'loading 默认禁止点击', duration: 1000 })
  }

  const reset = () => {
    Toast.resetDefaultOptions()
    Toast.show('配置已还原')
  }

  return (
    <Cell.Group>
      <Cell title="设置默认样式" isLink onPress={setPrimary} />
      <Cell title="配置 Loading 默认值" isLink onPress={setLoadingDefault} />
      <Cell title="重置默认配置" isLink onPress={reset} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastGlobalDemo() {
  const setPrimary = () => {
    Toast.setDefaultOptions({ duration: 3000, position: 'top' })
    Toast.success('之后默认 3 秒并展示在顶部')
  }

  const setLoadingDefault = () => {
    Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 })
    Toast.loading({ message: 'loading 默认禁止点击', duration: 1000 })
  }

  const reset = () => {
    Toast.resetDefaultOptions()
    Toast.show('配置已还原')
  }

  return (
    <Cell.Group>
      <Cell title="设置默认样式" isLink onPress={setPrimary} />
      <Cell title="配置 Loading 默认值" isLink onPress={setLoadingDefault} />
      <Cell title="重置默认配置" isLink onPress={reset} />
    </Cell.Group>
  )
}
`}},title:"默认配置",identifier:"toast-global",lang:"tsx",meta:{title:"默认配置"}}],E={simulator:{compact:!0}},F=[{depth:1,text:"Toast 轻提示",id:"toast-轻提示"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"位置控制",id:"位置控制"},{depth:3,text:"加载与动态更新",id:"加载与动态更新"},{depth:3,text:"自定义图标",id:"自定义图标"},{depth:3,text:"禁止背景点击",id:"禁止背景点击"},{depth:3,text:"多条提示并行",id:"多条提示并行"},{depth:3,text:"全局配置",id:"全局配置"},{depth:3,text:"静态调用",id:"静态调用"},{depth:2,text:"API",id:"api"},{depth:3,text:"静态方法",id:"静态方法"},{depth:2,text:"差异说明",id:"差异说明"}],z="/docs/components/toast.md",$="Toast 轻提示",B="1770032075000",je=i=>i.children({MdContent:I,demos:N,frontmatter:E,slugs:F,filePath:z,title:$,updatedTime:B});export{I as MdContent,je as default,N as demos,z as filePath,E as frontmatter,F as slugs,$ as title,B as updatedTime};
