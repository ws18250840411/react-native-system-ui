import{j as e,V as a,s as c}from"./main-BXb8DOxl.js";import{I as s}from"./Image-BkUMp8ay.js";import{S as u}from"./Space-Q2CXJN-f.js";import{T as i}from"./createComponentTokensHook-C7GS3cUR.js";import"./index-BPY4IQIH.js";import"./extends-CF3RwP-h.js";import"./index-CysvSvJu.js";import"./index-9yrhdMQu.js";import"./index-DkTYenKX.js";import"./number-BrRWL1fO.js";import"./useAriaPress-6bm6-278.js";import"./index-CJrLMJTa.js";const p=()=>e.jsxs(u,{wrap:!0,gap:12,children:[e.jsx(s,{width:120,height:120,src:"https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",round:!0}),e.jsx(s,{width:140,height:100,radius:16,fit:"cover",src:"https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"})]}),x=`import React from 'react'
import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <Image width={120} height={120} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" round />
    <Image width={140} height={100} radius={16} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" />
  </Space>
)
`,y={code:x,sources:{_:{tsx:`import React from 'react'
import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <Image width={120} height={120} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" round />
    <Image width={140} height={100} radius={16} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <Image width={120} height={120} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" round />
    <Image width={140} height={100} radius={16} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" />
  </Space>
)
`}},title:"基础",identifier:"image-basic",lang:"tsx",meta:{title:"基础"}},g=["contain","cover","fill","none","scale-down"],o=()=>e.jsx(u,{wrap:!0,gap:12,children:g.map(t=>e.jsxs(a,{style:d.item,children:[e.jsx(s,{width:96,height:64,fit:t,src:"https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg",radius:12}),e.jsx(i,{style:d.label,children:t})]},t))}),d=c.create({item:{alignItems:"center"},label:{marginTop:6,fontSize:12,color:"#667085"}}),j=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'
import type { ImageFit } from 'react-native-system-ui'

const fits: ImageFit[] = ['contain', 'cover', 'fill', 'none', 'scale-down']

export default () => (
  <Space wrap gap={12}>
    {fits.map(fit => (
      <View style={styles.item} key={fit}>
        <Image width={96} height={64} fit={fit} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" radius={12} />
        <Text style={styles.label}>{fit}</Text>
      </View>
    ))}
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`,f={code:j,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'
import type { ImageFit } from 'react-native-system-ui'

const fits: ImageFit[] = ['contain', 'cover', 'fill', 'none', 'scale-down']

export default () => (
  <Space wrap gap={12}>
    {fits.map(fit => (
      <View style={styles.item} key={fit}>
        <Image width={96} height={64} fit={fit} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" radius={12} />
        <Text style={styles.label}>{fit}</Text>
      </View>
    ))}
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'
import type { ImageFit } from 'react-native-system-ui'

const fits: ImageFit[] = ['contain', 'cover', 'fill', 'none', 'scale-down']

export default () => (
  <Space wrap gap={12}>
    {fits.map(fit => (
      <View style={styles.item} key={fit}>
        <Image width={96} height={64} fit={fit} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" radius={12} />
        <Text style={styles.label}>{fit}</Text>
      </View>
    ))}
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},title:"填充模式",identifier:"image-fit",lang:"tsx",meta:{title:"填充模式"}},m=()=>e.jsxs(u,{wrap:!0,gap:12,children:[e.jsxs(a,{style:r.item,children:[e.jsx(s,{width:96,height:96,round:!0,src:"https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"}),e.jsx(i,{style:r.label,children:"圆形"})]}),e.jsxs(a,{style:r.item,children:[e.jsx(s,{width:120,height:80,radius:20,fit:"cover",src:"https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg"}),e.jsx(i,{style:r.label,children:"自定义圆角"})]})]}),r=c.create({item:{alignItems:"center"},label:{marginTop:6,fontSize:12,color:"#667085"}}),F=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image width={96} height={96} round src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png" />
      <Text style={styles.label}>圆形</Text>
    </View>
    <View style={styles.item}>
      <Image width={120} height={80} radius={20} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg" />
      <Text style={styles.label}>自定义圆角</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`,v={code:F,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image width={96} height={96} round src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png" />
      <Text style={styles.label}>圆形</Text>
    </View>
    <View style={styles.item}>
      <Image width={120} height={80} radius={20} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg" />
      <Text style={styles.label}>自定义圆角</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image width={96} height={96} round src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png" />
      <Text style={styles.label}>圆形</Text>
    </View>
    <View style={styles.item}>
      <Image width={120} height={80} radius={20} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg" />
      <Text style={styles.label}>自定义圆角</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},title:"圆形 & 圆角",identifier:"image-round",lang:"tsx",meta:{title:"圆形 & 圆角"}},h=()=>e.jsxs(u,{wrap:!0,gap:12,children:[e.jsxs(a,{style:l.item,children:[e.jsx(s,{width:120,height:80,src:"https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg",loadingText:"加载中..."}),e.jsx(i,{style:l.label,children:"加载提示"})]}),e.jsxs(a,{style:l.item,children:[e.jsx(s,{width:120,height:80,src:"https://example.com/404.png",fallback:e.jsx(i,{children:"自定义错误"})}),e.jsx(i,{style:l.label,children:"失败占位"})]})]}),l=c.create({item:{alignItems:"center"},label:{marginTop:6,fontSize:12,color:"#667085"}}),S=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg"
        loadingText="加载中..."
      />
      <Text style={styles.label}>加载提示</Text>
    </View>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://example.com/404.png"
        fallback={<Text>自定义错误</Text>}
      />
      <Text style={styles.label}>失败占位</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`,w={code:S,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg"
        loadingText="加载中..."
      />
      <Text style={styles.label}>加载提示</Text>
    </View>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://example.com/404.png"
        fallback={<Text>自定义错误</Text>}
      />
      <Text style={styles.label}>失败占位</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg"
        loadingText="加载中..."
      />
      <Text style={styles.label}>加载提示</Text>
    </View>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://example.com/404.png"
        fallback={<Text>自定义错误</Text>}
      />
      <Text style={styles.label}>失败占位</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},title:"状态提示",identifier:"image-loading",lang:"tsx",meta:{title:"状态提示"}},E=function({previewer:t=()=>null,api:C=()=>null}){const n=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"image-图片","data-anchor":"image-图片",children:"Image 图片"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于展示网络图片，支持加载/失败状态与圆形样式。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { Image } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("p",{children:"展示圆形头像与常规矩形图片。"}),e.jsx("div",{children:e.jsx(n,{...y,children:e.jsx(p,{})})}),e.jsx("h3",{id:"填充模式","data-anchor":"填充模式",children:"填充模式"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"fit"})," 控制拉伸模式，对应 CSS 的 object-fit。"]}),e.jsx("div",{children:e.jsx(n,{...f,children:e.jsx(o,{})})}),e.jsx("h3",{id:"圆形自定义圆角","data-anchor":"圆形自定义圆角",children:"圆形/自定义圆角"}),e.jsxs("p",{children:[e.jsx("code",{children:"round"})," 会将容器裁剪为圆角（宽高相等时为圆形，否则为椭圆/胶囊形），也可以通过 ",e.jsx("code",{children:"radius"})," 传入任意圆角。"]}),e.jsx("div",{children:e.jsx(n,{...v,children:e.jsx(m,{})})}),e.jsx("h3",{id:"加载与失败提示","data-anchor":"加载与失败提示",children:"加载与失败提示"}),e.jsxs("p",{children:["默认会展示一个加载中蒙层与错误提示，可通过 ",e.jsx("code",{children:"loadingText"}),"、",e.jsx("code",{children:"fallback"})," 自定义内容。"]}),e.jsx("div",{children:e.jsx(n,{...w,children:e.jsx(h,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"src"})}),e.jsx("td",{children:"图片地址"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"source"})}),e.jsx("td",{children:"ImageSourcePropType"}),e.jsx("td",{children:e.jsx("code",{children:"ImageSourcePropType"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"width"})}),e.jsx("td",{children:"宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"height"})}),e.jsx("td",{children:"高度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"radius"})}),e.jsx("td",{children:"圆角"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"round"})}),e.jsx("td",{children:"是否显示为圆形"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fit"})}),e.jsx("td",{children:"填充方式（cover/contain 等）"}),e.jsx("td",{children:e.jsx("code",{children:"'cover' | 'contain' | 'fill' | 'none' | 'scale-down'"})}),e.jsx("td",{children:e.jsx("code",{children:"'cover'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showLoading"})}),e.jsx("td",{children:"是否展示加载状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showError"})}),e.jsx("td",{children:"是否展示错误状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loadingText"})}),e.jsx("td",{children:"加载中文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"加载中…"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"errorText"})}),e.jsx("td",{children:"错误文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"加载失败"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fallback"})}),e.jsx("td",{children:"自定义错误内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"containerStyle"})}),e.jsx("td",{children:"容器样式，可定制背景或圆角"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"其余"}),e.jsxs("td",{children:["继承 RN ",e.jsx("code",{children:"Image"})," 属性"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["组件内部未实现懒加载，如需按需加载可结合 ",e.jsx("code",{children:"FlatList"})," 的虚拟化或 intersection observer 库实现。"]})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["提示：如果通过 ",e.jsx("code",{children:"style"})," 传入了布局属性（如 ",e.jsx("code",{children:"width/height/flex/margin"}),"），组件会同步应用到外层容器以保证占位层与圆角裁剪一致。"]})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["Web 端对齐 Gluestack：图片元素会应用 ",e.jsx("code",{children:"revert-layer"})," 修复尺寸样式。"]})}),e.jsx("h2",{id:"差异说明","data-anchor":"差异说明",children:"差异说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["React Vant 的 ",e.jsx("code",{children:"fit"})," 默认值为 ",e.jsx("code",{children:"fill"}),"（对齐 CSS ",e.jsx("code",{children:"object-fit"})," 默认值）；本库默认值为 ",e.jsx("code",{children:"cover"}),"（对齐 React Native 默认行为并避免拉伸变形），如需保持一致可显式传 ",e.jsx("code",{children:'fit="fill"'}),"。"]}),e.jsxs("li",{children:["React Vant 支持 ",e.jsx("code",{children:"alt"}),"、",e.jsx("code",{children:"lazyload"})," 等 DOM 能力；本库在 React Native 环境不支持对应能力（可用 ",e.jsx("code",{children:"FlatList"})," 虚拟化或业务层懒加载替代）。"]}),e.jsxs("li",{children:["React Vant 提供 ",e.jsx("code",{children:"loadingIcon/errorIcon/iconSize"})," 等占位能力；本库默认使用 ",e.jsx("code",{children:"ActivityIndicator + loadingText/errorText/fallback"}),"（均支持传入 ",e.jsx("code",{children:"ReactNode"})," 进行自定义）。"]})]})]})})},T=[{Component:p,key:"image-basic",sources:{_:{tsx:`import React from 'react'
import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <Image width={120} height={120} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" round />
    <Image width={140} height={100} radius={16} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <Image width={120} height={120} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" round />
    <Image width={140} height={100} radius={16} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" />
  </Space>
)
`}},title:"基础",identifier:"image-basic",lang:"tsx",meta:{title:"基础"}},{Component:o,key:"image-fit",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'
import type { ImageFit } from 'react-native-system-ui'

const fits: ImageFit[] = ['contain', 'cover', 'fill', 'none', 'scale-down']

export default () => (
  <Space wrap gap={12}>
    {fits.map(fit => (
      <View style={styles.item} key={fit}>
        <Image width={96} height={64} fit={fit} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" radius={12} />
        <Text style={styles.label}>{fit}</Text>
      </View>
    ))}
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'
import type { ImageFit } from 'react-native-system-ui'

const fits: ImageFit[] = ['contain', 'cover', 'fill', 'none', 'scale-down']

export default () => (
  <Space wrap gap={12}>
    {fits.map(fit => (
      <View style={styles.item} key={fit}>
        <Image width={96} height={64} fit={fit} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" radius={12} />
        <Text style={styles.label}>{fit}</Text>
      </View>
    ))}
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},title:"填充模式",identifier:"image-fit",lang:"tsx",meta:{title:"填充模式"}},{Component:m,key:"image-round",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image width={96} height={96} round src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png" />
      <Text style={styles.label}>圆形</Text>
    </View>
    <View style={styles.item}>
      <Image width={120} height={80} radius={20} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg" />
      <Text style={styles.label}>自定义圆角</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image width={96} height={96} round src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png" />
      <Text style={styles.label}>圆形</Text>
    </View>
    <View style={styles.item}>
      <Image width={120} height={80} radius={20} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg" />
      <Text style={styles.label}>自定义圆角</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},title:"圆形 & 圆角",identifier:"image-round",lang:"tsx",meta:{title:"圆形 & 圆角"}},{Component:h,key:"image-loading",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg"
        loadingText="加载中..."
      />
      <Text style={styles.label}>加载提示</Text>
    </View>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://example.com/404.png"
        fallback={<Text>自定义错误</Text>}
      />
      <Text style={styles.label}>失败占位</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg"
        loadingText="加载中..."
      />
      <Text style={styles.label}>加载提示</Text>
    </View>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://example.com/404.png"
        fallback={<Text>自定义错误</Text>}
      />
      <Text style={styles.label}>失败占位</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
`}},title:"状态提示",identifier:"image-loading",lang:"tsx",meta:{title:"状态提示"}}],I={simulator:{compact:!1}},A=[{depth:1,text:"Image 图片",id:"image-图片"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"填充模式",id:"填充模式"},{depth:3,text:"圆形/自定义圆角",id:"圆形自定义圆角"},{depth:3,text:"加载与失败提示",id:"加载与失败提示"},{depth:2,text:"API",id:"api"},{depth:2,text:"差异说明",id:"差异说明"}],D="/docs/components/image.md",b="Image 图片",B="1770189574000",O=t=>t.children({MdContent:E,demos:T,frontmatter:I,slugs:A,filePath:D,title:b,updatedTime:B});export{E as MdContent,O as default,T as demos,D as filePath,I as frontmatter,A as slugs,b as title,B as updatedTime};
