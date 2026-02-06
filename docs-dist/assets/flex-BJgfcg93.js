import{R as g,r as B,j as e,V as r,i as u,s as C}from"./main-BuQiU471.js";import{c as G,T as k}from"./createComponentTokensHook-BZh_OSSd.js";const L=t=>({defaults:{direction:"row",wrap:"nowrap",gutter:0,align:"start",justify:"start",columns:24},layout:{container:{}}}),O=G("flex",L),v=g.createContext({horizontalGap:0,verticalGap:0,columns:24}),q={start:"flex-start",center:"center",end:"flex-end",baseline:"baseline",stretch:"stretch"},J={start:"flex-start",end:"flex-end",center:"center",around:"space-around",between:"space-between"},K=t=>{const{tokensOverride:n,children:o,direction:i,wrap:f,gutter:m,align:c,justify:s,style:a,columns:d}=t,x=O(n),A=i??x.defaults.direction,M=f??x.defaults.wrap,p=m??x.defaults.gutter,_=c??x.defaults.align,N=s??x.defaults.justify,$=d??x.defaults.columns,V=Math.max(1,$),[z,H]=Array.isArray(p)?p:[p,0],y=Math.max(0,z??0),F=Math.max(0,H??0),W=B.useMemo(()=>({horizontalGap:y,verticalGap:F,columns:V}),[y,F,V]);return e.jsx(v.Provider,{value:W,children:e.jsx(r,{style:[x.layout.container,{flexDirection:A,flexWrap:M,alignItems:q[_],justifyContent:J[N],marginHorizontal:void 0,marginVertical:void 0,columnGap:y,rowGap:F},a],children:o})})},S=g.memo(K);S.displayName="Flex";const Q=t=>{if(u(t))return{flex:t};if(!t)return;const n=t.trim();if(!n)return;if(n==="auto")return{flexGrow:1,flexShrink:1,flexBasis:"auto"};if(n==="none")return{flexGrow:0,flexShrink:0,flexBasis:"auto"};const o=Number(n);if(u(o))return{flex:o};const i=n.split(/\s+/);if(i.length>=2){const[f,m]=i.map(Number);if(u(f)&&u(m)){const c=i.slice(2).join(" ");let s;if(c==="auto")s="auto";else if(c){const a=c.match(/^(-?\d+(?:\.\d+)?)px$/),d=Number(a?a[1]:c);u(d)&&(s=d)}return{flexGrow:f,flexShrink:m,flexBasis:s}}}},U=({span:t,flex:n,style:o,children:i})=>{const{horizontalGap:f,verticalGap:m,columns:c}=B.useContext(v);if(u(t)&&t<=0)return null;const s={};if(u(t)){const a=Math.max(1,c),d=Math.min(Math.max(t,0),a)/a;s.width=`${d*100}%`,s.flexGrow=0,s.flexShrink=0}return e.jsx(r,{style:[null,s,Q(n),o],children:i})},E=g.memo(U);E.displayName="FlexItem";const l=Object.assign(S,{Item:E}),X={"tone-1":"#3f45ff","tone-2":"#4c52ff","tone-3":"#5a60ff","tone-4":"#686eff"},h=({label:t,tone:n})=>e.jsx(r,{style:[w.block,{backgroundColor:X[n]}],children:e.jsx(k,{style:w.blockText,children:t})}),D=()=>e.jsxs(r,{children:[e.jsx(r,{style:w.row,children:e.jsxs(l,{justify:"center",align:"center",children:[e.jsx(l.Item,{span:12,children:e.jsx(h,{label:"span: 12",tone:"tone-1"})}),e.jsx(l.Item,{span:12,children:e.jsx(h,{label:"span: 12",tone:"tone-2"})})]})}),e.jsx(r,{children:e.jsxs(l,{children:[e.jsx(l.Item,{span:8,children:e.jsx(h,{label:"span: 8",tone:"tone-2"})}),e.jsx(l.Item,{span:8,children:e.jsx(h,{label:"span: 8",tone:"tone-3"})}),e.jsx(l.Item,{span:8,children:e.jsx(h,{label:"span: 8",tone:"tone-4"})})]})})]}),w=C.create({row:{marginBottom:10},block:{height:30,alignItems:"center",justifyContent:"center"},blockText:{fontSize:13,lineHeight:30,fontWeight:"600",color:"#ffffff"}}),Y=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`,Z={code:Y,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},title:"基础用法",identifier:"flex-base",lang:"tsx",meta:{title:"基础用法"}},I=({label:t})=>e.jsx(r,{style:j.cell,children:e.jsx(k,{style:j.cellText,children:t})}),R=()=>e.jsxs(r,{children:[e.jsx(r,{style:j.row,children:e.jsx(l,{gutter:[12,12],children:new Array(3).fill(null).map((t,n)=>e.jsx(l.Item,{span:8,children:e.jsx(I,{label:"span: 8"})},`row1-${n}`))})}),e.jsx(r,{children:e.jsx(l,{gutter:[12,12],children:new Array(3).fill(null).map((t,n)=>e.jsx(l.Item,{span:8,children:e.jsx(I,{label:"span: 8"})},`row2-${n}`))})})]}),j=C.create({row:{marginBottom:10},cell:{height:30,alignItems:"center",justifyContent:"center",backgroundColor:"#dfe4ff"},cellText:{fontSize:13,lineHeight:30,fontWeight:"600",color:"#4f5bff"}}),ee=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`,te={code:ee,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`}},title:"区域间隔",identifier:"flex-gutter",lang:"tsx",meta:{title:"区域间隔"}},ne={"tone-1":"#3f45ff","tone-2":"#4c52ff","tone-3":"#5a60ff"},oe=({label:t,tone:n})=>e.jsx(r,{style:[b.block,{backgroundColor:ne[n]}],children:e.jsx(k,{style:b.blockText,children:t})}),T=({direction:t})=>{const n=["tone-1","tone-2","tone-3"];return e.jsx(r,{style:b.row,children:e.jsx(l,{direction:t,children:n.map((o,i)=>e.jsx(l.Item,{span:8,children:e.jsx(oe,{label:`span: 8-${i+1}`,tone:o})},o))})})},P=()=>e.jsxs(r,{children:[e.jsx(T,{direction:"row"}),e.jsx(T,{direction:"row-reverse"})]}),b=C.create({row:{marginBottom:10},block:{height:30,alignItems:"center",justifyContent:"center"},blockText:{fontSize:13,lineHeight:30,fontWeight:"600",color:"#ffffff"}}),le=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`,re={code:le,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},title:"方向",identifier:"flex-direction",lang:"tsx",meta:{title:"方向"}},se=function({previewer:t=()=>null,api:n=()=>null}){const o=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"flex-布局","data-anchor":"flex-布局",children:"Flex 布局"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsxs("p",{children:[e.jsx("code",{children:"Flex"})," 组件是 CSS ",e.jsx("code",{children:"flex"})," 布局的一个封装，提供 24 栅格、间距和方向控制能力。"]}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Flex } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"Flex"})," 与 ",e.jsx("code",{children:"Flex.Item"})," 即可快速构建 24 列栅格系统，所有列必须放在 ",e.jsx("code",{children:"Flex"})," 内。"]}),e.jsx("div",{children:e.jsx(o,{...Z,children:e.jsx(D,{})})}),e.jsx("h3",{id:"区域间隔","data-anchor":"区域间隔",children:"区域间隔"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"gutter"})," 属性设置列元素之间的间距，数组写法可以同时指定水平/垂直间距。"]}),e.jsx("div",{children:e.jsx(o,{...te,children:e.jsx(R,{})})}),e.jsx("h3",{id:"方向","data-anchor":"方向",children:"方向"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"direction"})," 属性设置弹性布局方向。默认是 ",e.jsx("code",{children:"row"}),"。"]}),e.jsx("div",{children:e.jsx(o,{...re,children:e.jsx(P,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"flex-props","data-anchor":"flex-props",children:"Flex Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"direction"})}),e.jsx("td",{children:"项目定位方向"}),e.jsx("td",{children:e.jsx("code",{children:"'row' | 'row-reverse' | 'column' | 'column-reverse'"})}),e.jsx("td",{children:e.jsx("code",{children:"'row'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"wrap"})}),e.jsx("td",{children:"子元素换行方式"}),e.jsx("td",{children:e.jsx("code",{children:"'nowrap' | 'wrap' | 'wrap-reverse'"})}),e.jsx("td",{children:e.jsx("code",{children:"'nowrap'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gutter"})}),e.jsxs("td",{children:["列间距，支持 ",e.jsx("code",{children:"[水平, 垂直]"})]}),e.jsx("td",{children:e.jsx("code",{children:"number | [number, number]"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"align"})}),e.jsx("td",{children:"垂直对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'center' | 'end' | 'baseline' | 'stretch'"})}),e.jsx("td",{children:e.jsx("code",{children:"'start'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"justify"})}),e.jsx("td",{children:"水平排列方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'end' | 'center' | 'around' | 'between'"})}),e.jsx("td",{children:e.jsx("code",{children:"'start'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columns"})}),e.jsxs("td",{children:["栅格总列数，用于计算 ",e.jsx("code",{children:"span"})]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"24"})})]})]})]}),e.jsx("h3",{id:"flexitem-props","data-anchor":"flexitem-props",children:"Flex.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"span"})}),e.jsx("td",{children:"栅格占位格数，为 0 时不渲染"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"flex"})}),e.jsxs("td",{children:["Flex 布局属性，支持数字或 ",e.jsx("code",{children:"auto"}),"、",e.jsx("code",{children:"none"})," 以及 ",e.jsx("code",{children:"flex-grow flex-shrink flex-basis"})," 字符串写法（第三项支持 ",e.jsx("code",{children:"auto"})," 或数字/px）"]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["示例：",e.jsx("code",{children:'flex="auto"'}),"、",e.jsx("code",{children:'flex="0 0 auto"'}),"、",e.jsx("code",{children:'flex="2 1 120px"'}),"。由于 React Native 限制，目前不支持百分比等单位。",e.jsx("br",{}),"React Native 环境不支持 DOM 维度的 ",e.jsx("code",{children:"order"}),"、",e.jsx("code",{children:"offset"})," 等属性，如需更复杂的布局可以直接使用 ",e.jsx("code",{children:"View"})," + ",e.jsx("code",{children:"StyleSheet"})," 来实现。"]})})]})})},ie=[{Component:D,key:"flex-base",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},title:"基础用法",identifier:"flex-base",lang:"tsx",meta:{title:"基础用法"}},{Component:R,key:"flex-gutter",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`}},title:"区域间隔",identifier:"flex-gutter",lang:"tsx",meta:{title:"区域间隔"}},{Component:P,key:"flex-direction",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},title:"方向",identifier:"flex-direction",lang:"tsx",meta:{title:"方向"}}],ce={simulator:{compact:!0}},ae=[{depth:1,text:"Flex 布局",id:"flex-布局"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"区域间隔",id:"区域间隔"},{depth:3,text:"方向",id:"方向"},{depth:2,text:"API",id:"api"},{depth:3,text:"Flex Props",id:"flex-props"},{depth:3,text:"Flex.Item Props",id:"flexitem-props"}],xe="/docs/components/flex.md",ue="Flex 布局",de="1769570039000",he=t=>t.children({MdContent:se,demos:ie,frontmatter:ce,slugs:ae,filePath:xe,title:ue,updatedTime:de});export{se as MdContent,he as default,ie as demos,xe as filePath,ce as frontmatter,ae as slugs,ue as title,de as updatedTime};
