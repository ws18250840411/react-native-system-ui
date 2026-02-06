import{R as g,r as B,j as e,V as r,i as x,s as C}from"./main-CC2DK3OK.js";import{c as G,T as k}from"./createComponentTokensHook-BcXZOvON.js";const L=n=>({defaults:{direction:"row",wrap:"nowrap",gutter:0,align:"start",justify:"start",columns:24},layout:{container:{}}}),O=G("flex",L),v=g.createContext({horizontalGap:0,verticalGap:0,columns:24}),q={start:"flex-start",center:"center",end:"flex-end",baseline:"baseline",stretch:"stretch"},J={start:"flex-start",end:"flex-end",center:"center",around:"space-around",between:"space-between"},K=n=>{const{tokensOverride:t,children:o,direction:s,wrap:f,gutter:m,align:c,justify:i,style:a,columns:d}=n,u=O(t),A=s??u.defaults.direction,M=f??u.defaults.wrap,h=m??u.defaults.gutter,_=c??u.defaults.align,N=i??u.defaults.justify,$=d??u.defaults.columns,V=Math.max(1,$),[z,H]=Array.isArray(h)?h:[h,0],F=Math.max(0,z??0),y=Math.max(0,H??0),W=B.useMemo(()=>({horizontalGap:F,verticalGap:y,columns:V}),[F,y,V]);return e.jsx(v.Provider,{value:W,children:e.jsx(r,{style:[u.layout.container,{flexDirection:A,flexWrap:M,alignItems:q[_],justifyContent:J[N],marginHorizontal:void 0,marginVertical:void 0,columnGap:F,rowGap:y},a],children:o})})},E=g.memo(K);E.displayName="Flex";const Q=n=>{if(x(n))return{flex:n};if(!n)return;const t=n.trim();if(!t)return;if(t==="auto")return{flexGrow:1,flexShrink:1,flexBasis:"auto"};if(t==="none")return{flexGrow:0,flexShrink:0,flexBasis:"auto"};const o=Number(t);if(x(o))return{flex:o};const s=t.split(/\s+/);if(s.length>=2){const[f,m]=s.map(Number);if(x(f)&&x(m)){const c=s.slice(2).join(" ");let i;if(c==="auto")i="auto";else if(c){const a=c.match(/^(-?\d+(?:\.\d+)?)px$/),d=Number(a?a[1]:c);x(d)&&(i=d)}return{flexGrow:f,flexShrink:m,flexBasis:i}}}},U=({span:n,flex:t,style:o,children:s})=>{const{horizontalGap:f,verticalGap:m,columns:c}=B.useContext(v);if(x(n)&&n<=0)return null;const i={};if(x(n)){const a=Math.max(1,c),d=Math.min(Math.max(n,0),a)/a;i.width=`${d*100}%`,i.flexGrow=0,i.flexShrink=0}return e.jsx(r,{style:[null,i,Q(t),o],children:s})},S=g.memo(U);S.displayName="FlexItem";const l=Object.assign(E,{Item:S}),X={"tone-1":"#3f45ff","tone-2":"#4c52ff","tone-3":"#5a60ff","tone-4":"#686eff"},p=({label:n,tone:t})=>e.jsx(r,{style:[w.block,{backgroundColor:X[t]}],children:e.jsx(k,{style:w.blockText,children:n})});function D(){return e.jsxs(r,{children:[e.jsx(r,{style:w.row,children:e.jsxs(l,{justify:"center",align:"center",children:[e.jsx(l.Item,{span:12,children:e.jsx(p,{label:"span: 12",tone:"tone-1"})}),e.jsx(l.Item,{span:12,children:e.jsx(p,{label:"span: 12",tone:"tone-2"})})]})}),e.jsx(r,{children:e.jsxs(l,{children:[e.jsx(l.Item,{span:8,children:e.jsx(p,{label:"span: 8",tone:"tone-2"})}),e.jsx(l.Item,{span:8,children:e.jsx(p,{label:"span: 8",tone:"tone-3"})}),e.jsx(l.Item,{span:8,children:e.jsx(p,{label:"span: 8",tone:"tone-4"})})]})})]})}const w=C.create({row:{marginBottom:10},block:{height:30,alignItems:"center",justifyContent:"center"},blockText:{fontSize:13,lineHeight:30,fontWeight:"600",color:"#ffffff"}}),Y=`import React from 'react'
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

export default function FlexBaseDemo() {
  return (
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
}

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

export default function FlexBaseDemo() {
  return (
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
}

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

export default function FlexBaseDemo() {
  return (
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
}

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
`}},title:"基础用法",identifier:"flex-base",lang:"tsx",meta:{title:"基础用法"}},I=({label:n})=>e.jsx(r,{style:j.cell,children:e.jsx(k,{style:j.cellText,children:n})});function R(){return e.jsxs(r,{children:[e.jsx(r,{style:j.row,children:e.jsx(l,{gutter:[12,12],children:new Array(3).fill(null).map((n,t)=>e.jsx(l.Item,{span:8,children:e.jsx(I,{label:"span: 8"})},`row1-${t}`))})}),e.jsx(r,{children:e.jsx(l,{gutter:[12,12],children:new Array(3).fill(null).map((n,t)=>e.jsx(l.Item,{span:8,children:e.jsx(I,{label:"span: 8"})},`row2-${t}`))})})]})}const j=C.create({row:{marginBottom:10},cell:{height:30,alignItems:"center",justifyContent:"center",backgroundColor:"#dfe4ff"},cellText:{fontSize:13,lineHeight:30,fontWeight:"600",color:"#4f5bff"}}),ee=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default function FlexGutterDemo() {
  return (
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
}

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
`,ne={code:ee,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default function FlexGutterDemo() {
  return (
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
}

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

export default function FlexGutterDemo() {
  return (
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
}

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
`}},title:"区域间隔",identifier:"flex-gutter",lang:"tsx",meta:{title:"区域间隔"}},te={"tone-1":"#3f45ff","tone-2":"#4c52ff","tone-3":"#5a60ff"},oe=({label:n,tone:t})=>e.jsx(r,{style:[b.block,{backgroundColor:te[t]}],children:e.jsx(k,{style:b.blockText,children:n})}),T=({direction:n})=>{const t=["tone-1","tone-2","tone-3"];return e.jsx(r,{style:b.row,children:e.jsx(l,{direction:n,children:t.map((o,s)=>e.jsx(l.Item,{span:8,children:e.jsx(oe,{label:`span: 8-${s+1}`,tone:o})},o))})})};function P(){return e.jsxs(r,{children:[e.jsx(T,{direction:"row"}),e.jsx(T,{direction:"row-reverse"})]})}const b=C.create({row:{marginBottom:10},block:{height:30,alignItems:"center",justifyContent:"center"},blockText:{fontSize:13,lineHeight:30,fontWeight:"600",color:"#ffffff"}}),le=`import React from 'react'
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

export default function FlexDirectionDemo() {
  return (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
  )
}

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

export default function FlexDirectionDemo() {
  return (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
  )
}

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

export default function FlexDirectionDemo() {
  return (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
  )
}

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
`}},title:"方向",identifier:"flex-direction",lang:"tsx",meta:{title:"方向"}},ie=function({previewer:n=()=>null,api:t=()=>null}){const o=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"flex-布局","data-anchor":"flex-布局",children:"Flex 布局"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsxs("p",{children:[e.jsx("code",{children:"Flex"})," 组件基于 Flexbox 提供 24 栅格、间距与方向控制能力，适用于快速构建响应式布局。"]}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Flex } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"Flex"})," 与 ",e.jsx("code",{children:"Flex.Item"})," 即可快速构建 24 列栅格系统，所有列必须放在 ",e.jsx("code",{children:"Flex"})," 内。"]}),e.jsx("div",{children:e.jsx(o,{...Z,children:e.jsx(D,{})})}),e.jsx("h3",{id:"区域间隔","data-anchor":"区域间隔",children:"区域间隔"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"gutter"})," 属性设置列元素之间的间距，数组写法可以同时指定水平/垂直间距。"]}),e.jsx("div",{children:e.jsx(o,{...ne,children:e.jsx(R,{})})}),e.jsx("h3",{id:"方向","data-anchor":"方向",children:"方向"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"direction"})," 属性设置弹性布局方向。默认是 ",e.jsx("code",{children:"row"}),"。"]}),e.jsx("div",{children:e.jsx(o,{...re,children:e.jsx(P,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"flex-props","data-anchor":"flex-props",children:"Flex Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"direction"})}),e.jsx("td",{children:"项目定位方向"}),e.jsx("td",{children:e.jsx("code",{children:"'row' | 'row-reverse' | 'column' | 'column-reverse'"})}),e.jsx("td",{children:e.jsx("code",{children:"'row'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"wrap"})}),e.jsx("td",{children:"子元素换行方式"}),e.jsx("td",{children:e.jsx("code",{children:"'nowrap' | 'wrap' | 'wrap-reverse'"})}),e.jsx("td",{children:e.jsx("code",{children:"'nowrap'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gutter"})}),e.jsxs("td",{children:["列间距，支持 ",e.jsx("code",{children:"[水平, 垂直]"})]}),e.jsx("td",{children:e.jsx("code",{children:"number | [number, number]"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"align"})}),e.jsx("td",{children:"垂直对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'center' | 'end' | 'baseline' | 'stretch'"})}),e.jsx("td",{children:e.jsx("code",{children:"'start'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"justify"})}),e.jsx("td",{children:"水平排列方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'end' | 'center' | 'around' | 'between'"})}),e.jsx("td",{children:e.jsx("code",{children:"'start'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columns"})}),e.jsxs("td",{children:["栅格总列数，用于计算 ",e.jsx("code",{children:"span"})]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"24"})})]})]})]}),e.jsx("h3",{id:"flexitem-props","data-anchor":"flexitem-props",children:"Flex.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"span"})}),e.jsx("td",{children:"栅格占位格数，为 0 时不渲染"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"flex"})}),e.jsxs("td",{children:["Flex 布局属性，支持数字或 ",e.jsx("code",{children:"auto"}),"、",e.jsx("code",{children:"none"})," 以及 ",e.jsx("code",{children:"flex-grow flex-shrink flex-basis"})," 字符串写法（第三项支持 ",e.jsx("code",{children:"auto"})," 或数字/px）"]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["示例：",e.jsx("code",{children:'flex="auto"'}),"、",e.jsx("code",{children:'flex="0 0 auto"'}),"、",e.jsx("code",{children:'flex="2 1 120px"'}),"。由于 React Native 限制，目前不支持百分比等单位。",e.jsx("br",{}),"React Native 环境不支持 DOM 维度的 ",e.jsx("code",{children:"order"}),"、",e.jsx("code",{children:"offset"})," 等属性，如需更复杂的布局可以直接使用 ",e.jsx("code",{children:"View"})," + ",e.jsx("code",{children:"StyleSheet"})," 来实现。"]})})]})})},se=[{Component:D,key:"flex-base",sources:{_:{tsx:`import React from 'react'
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

export default function FlexBaseDemo() {
  return (
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
}

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

export default function FlexBaseDemo() {
  return (
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
}

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

export default function FlexGutterDemo() {
  return (
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
}

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

export default function FlexGutterDemo() {
  return (
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
}

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

export default function FlexDirectionDemo() {
  return (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
  )
}

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

export default function FlexDirectionDemo() {
  return (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
  )
}

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
`}},title:"方向",identifier:"flex-direction",lang:"tsx",meta:{title:"方向"}}],ce={simulator:{compact:!0}},ae=[{depth:1,text:"Flex 布局",id:"flex-布局"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"区域间隔",id:"区域间隔"},{depth:3,text:"方向",id:"方向"},{depth:2,text:"API",id:"api"},{depth:3,text:"Flex Props",id:"flex-props"},{depth:3,text:"Flex.Item Props",id:"flexitem-props"}],ue="/docs/components/flex.md",xe="Flex 布局",de="1770373480000",pe=n=>n.children({MdContent:ie,demos:se,frontmatter:ce,slugs:ae,filePath:ue,title:xe,updatedTime:de});export{ie as MdContent,pe as default,se as demos,ue as filePath,ce as frontmatter,ae as slugs,xe as title,de as updatedTime};
