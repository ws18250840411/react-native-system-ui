import{j as e,V as i,s as c,r as B}from"./main-CX5QgiXt.js";import{S as r}from"./index-Clwguwvk.js";import{T as o}from"./createComponentTokensHook-Hc3l7riF.js";import{I as P}from"./index-BDzwQtXM.js";import{T as D}from"./index-BUHqkOou.js";import{B as u}from"./index-B1BD4WKR.js";import"./number-DMCxwktP.js";import"./index-4qDXDIEs.js";import"./index-CTcRCRb2.js";import"./index-BEnr4R_B.js";import"./extends-CF3RwP-h.js";import"./index-CJrLMJTa.js";import"./Portal-BtmwX5Pt.js";import"./Overlay-uC1_KEGM.js";import"./Loading-Dy4Xe7Yb.js";import"./index-quLIWFrm.js";import"./Checked-C5Dq4Yeg.js";import"./IconBase-D_kjvpJY.js";import"./Close-D6NXA1XS.js";import"./Animated-rPtBS5kg.js";import"./index-CQ2P49YQ.js";import"./SafeAreaView-DiARkPwI.js";import"./useSafeAreaPadding-Du1CT4G_.js";import"./useOverlayStack-CF7tueuh.js";import"./animation-BpxpeSKC.js";import"./useAriaPress-sIRcrStb.js";import"./color-Cjzk_5VY.js";import"./createPlatformShadow-BbOkyb5V.js";const z=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#6c5ce7"],j=()=>e.jsx(i,{style:p.container,children:e.jsx(r,{indicator:!0,style:p.swiper,children:z.map((t,n)=>e.jsx(r.Item,{children:e.jsx(i,{style:[p.slide,{backgroundColor:t}],children:e.jsx(o,{style:p.text,children:n+1})})},n))})}),p=c.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:48,color:"#fff",fontWeight:"bold"}}),R=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`,k={code:R,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},title:"基础",identifier:"swiper-basic",lang:"tsx",meta:{title:"基础"}},M=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#6c5ce7"],b=()=>e.jsx(i,{style:y.container,children:e.jsx(r,{autoplay:3e3,indicator:!0,loop:!0,style:y.swiper,children:M.map((t,n)=>e.jsx(r.Item,{children:e.jsx(i,{style:[y.slide,{backgroundColor:t}],children:e.jsx(o,{style:y.text,children:n+1})})},n))})}),y=c.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:48,color:"#fff",fontWeight:"bold"}}),N=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator loop style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`,_={code:N,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator loop style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator loop style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},title:"自动播放",identifier:"swiper-autoplay",lang:"tsx",meta:{title:"自动播放"}},W=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg","https://img.yzcdn.cn/vant/apple-4.jpg"],v=()=>e.jsx(i,{style:w.container,children:e.jsx(r,{autoplay:3e3,indicator:!0,style:w.swiper,children:W.map(t=>e.jsx(r.Item,{children:e.jsx(P,{source:{uri:t},style:w.image,resizeMode:"cover"})},t))})}),w=c.create({container:{height:200},swiper:{height:200},image:{width:"100%",height:"100%"}}),$=`import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator style={styles.swiper}>
        {images.map((uri) => (
          <Swiper.Item key={uri}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})


`,L={code:$,sources:{_:{tsx:`import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator style={styles.swiper}>
        {images.map((uri) => (
          <Swiper.Item key={uri}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})


`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator style={styles.swiper}>
        {images.map((uri) => (
          <Swiper.Item key={uri}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})


`}},title:"图片轮播",identifier:"swiper-images",lang:"tsx",meta:{title:"图片轮播"}},H=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#6c5ce7"],V=()=>e.jsx(i,{style:h.container,children:e.jsx(r,{indicator:!0,onChange:t=>{D.info(`当前索引: ${t}`)},style:h.swiper,children:H.map((t,n)=>e.jsx(r.Item,{children:e.jsx(i,{style:[h.slide,{backgroundColor:t}],children:e.jsx(o,{style:h.text,children:n+1})})},n))})}),h=c.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:48,color:"#fff",fontWeight:"bold"}}),q=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => {
          Toast.info(\`当前索引: \${index}\`)
        }}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`,G={code:q,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => {
          Toast.info(\`当前索引: \${index}\`)
        }}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => {
          Toast.info(\`当前索引: \${index}\`)
        }}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},title:"监听切换",identifier:"swiper-onchange",lang:"tsx",meta:{title:"监听切换"}},J=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#6c5ce7"],F=()=>e.jsx(i,{style:x.container,children:e.jsx(r,{vertical:!0,indicator:!0,autoplay:3e3,style:x.swiper,children:J.map((t,n)=>e.jsx(r.Item,{children:e.jsx(i,{style:[x.slide,{backgroundColor:t}],children:e.jsx(o,{style:x.text,children:n+1})})},n))})}),x=c.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:48,color:"#fff",fontWeight:"bold"}}),K=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper vertical indicator autoplay={3000} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`,O={code:K,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper vertical indicator autoplay={3000} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper vertical indicator autoplay={3000} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},title:"纵向滚动",identifier:"swiper-vertical",lang:"tsx",meta:{title:"纵向滚动"}},Q=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#6c5ce7"],I=()=>e.jsx(i,{style:a.container,children:e.jsx(r,{indicator:(t,n)=>e.jsx(i,{style:a.customIndicator,children:e.jsxs(o,{style:a.indicatorText,children:[n+1," / ",t]})}),style:a.swiper,children:Q.map((t,n)=>e.jsx(r.Item,{children:e.jsx(i,{style:[a.slide,{backgroundColor:t}],children:e.jsx(o,{style:a.text,children:n+1})})},n))})}),a=c.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:48,color:"#fff",fontWeight:"bold"},customIndicator:{position:"absolute",bottom:16,left:0,right:0,alignItems:"center"},indicatorText:{backgroundColor:"rgba(0, 0, 0, 0.5)",color:"#fff",paddingHorizontal:12,paddingVertical:4,borderRadius:12,fontSize:14,fontWeight:"500"}}),U=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.customIndicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  customIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  indicatorText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '500',
  },
})
`,X={code:U,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.customIndicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  customIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  indicatorText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '500',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.customIndicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  customIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  indicatorText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '500',
  },
})
`}},title:"自定义指示器",identifier:"swiper-custom-indicator",lang:"tsx",meta:{title:"自定义指示器"}},Y=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#6c5ce7"],E=()=>e.jsx(i,{style:m.container,children:e.jsx(r,{indicator:!1,style:m.swiper,children:Y.map((t,n)=>e.jsx(r.Item,{children:e.jsx(i,{style:[m.slide,{backgroundColor:t}],children:e.jsx(o,{style:m.text,children:n+1})})},n))})}),m=c.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:48,color:"#fff",fontWeight:"bold"}}),Z=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator={false} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`,ee={code:Z,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator={false} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator={false} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`}},title:"关闭指示器",identifier:"swiper-indicator-off",lang:"tsx",meta:{title:"关闭指示器"}},te=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#6c5ce7"],C=()=>e.jsx(i,{style:f.container,children:e.jsx(r,{loop:!1,indicator:!0,style:f.swiper,children:te.map((t,n)=>e.jsx(r.Item,{children:e.jsx(i,{style:[f.slide,{backgroundColor:t}],children:e.jsx(o,{style:f.text,children:n+1})})},n))})}),f=c.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:48,color:"#fff",fontWeight:"bold"}}),ne=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper loop={false} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`,ie={code:ne,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper loop={false} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper loop={false} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`}},title:"关闭循环",identifier:"swiper-loop",lang:"tsx",meta:{title:"关闭循环"}},S=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#6c5ce7"],T=()=>{const t=B.useRef(null),n=S.length-1;return e.jsxs(i,{style:l.container,children:[e.jsx(r,{ref:t,indicator:!0,style:l.swiper,children:S.map((s,g)=>e.jsx(r.Item,{children:e.jsx(i,{style:[l.slide,{backgroundColor:s}],children:e.jsx(o,{style:l.text,children:g+1})})},g))}),e.jsxs(i,{style:l.controls,children:[e.jsx(u,{size:"small",text:"上一张",onPress:()=>{t.current?.swipePrev()}}),e.jsx(i,{style:l.spacer}),e.jsx(u,{size:"small",text:"下一张",onPress:()=>{t.current?.swipeNext()}}),e.jsx(i,{style:l.spacer}),e.jsx(u,{size:"small",text:"第一张",onPress:()=>{t.current?.swipeTo(0)}}),e.jsx(i,{style:l.spacer}),e.jsx(u,{size:"small",text:"最后一张",onPress:()=>{t.current?.swipeTo(n)}})]})]})},l=c.create({container:{height:300},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:48,color:"#fff",fontWeight:"bold"},controls:{flexDirection:"row",padding:16,justifyContent:"center",alignItems:"center"},spacer:{width:8}}),re=`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button
          size="small"
          text="上一张"
          onPress={() => {
            swiperRef.current?.swipePrev()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="下一张"
          onPress={() => {
            swiperRef.current?.swipeNext()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="第一张"
          onPress={() => {
            swiperRef.current?.swipeTo(0)
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="最后一张"
          onPress={() => {
            swiperRef.current?.swipeTo(lastIndex)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: 8,
  },
})
`,se={code:re,sources:{_:{tsx:`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button
          size="small"
          text="上一张"
          onPress={() => {
            swiperRef.current?.swipePrev()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="下一张"
          onPress={() => {
            swiperRef.current?.swipeNext()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="第一张"
          onPress={() => {
            swiperRef.current?.swipeTo(0)
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="最后一张"
          onPress={() => {
            swiperRef.current?.swipeTo(lastIndex)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: 8,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button
          size="small"
          text="上一张"
          onPress={() => {
            swiperRef.current?.swipePrev()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="下一张"
          onPress={() => {
            swiperRef.current?.swipeNext()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="第一张"
          onPress={() => {
            swiperRef.current?.swipeTo(0)
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="最后一张"
          onPress={() => {
            swiperRef.current?.swipeTo(lastIndex)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: 8,
  },
})
`}},title:"Ref 控制",identifier:"swiper-ref",lang:"tsx",meta:{title:"Ref 控制"}},oe=[{id:1,color:"#ff6b6b",title:"第一张"},{id:2,color:"#4ecdc4",title:"第二张"},{id:3,color:"#45b7d1",title:"第三张"},{id:4,color:"#f9ca24",title:"第四张"},{id:5,color:"#6c5ce7",title:"第五张"}],A=()=>e.jsx(i,{style:d.container,children:e.jsx(r,{data:oe,renderItem:({item:t})=>e.jsxs(i,{style:[d.slide,{backgroundColor:t.color}],children:[e.jsx(o,{style:d.text,children:t.title}),e.jsxs(o,{style:d.subText,children:["ID: ",t.id]})]}),indicator:!0,autoplay:3e3,loop:!0,style:d.swiper})}),d=c.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:32,color:"#fff",fontWeight:"bold",marginBottom:8},subText:{fontSize:16,color:"rgba(255, 255, 255, 0.8)"}}),ce=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

interface SlideItem {
  id: number
  color: string
  title: string
}

const data: SlideItem[] = [
  { id: 1, color: '#ff6b6b', title: '第一张' },
  { id: 2, color: '#4ecdc4', title: '第二张' },
  { id: 3, color: '#45b7d1', title: '第三张' },
  { id: 4, color: '#f9ca24', title: '第四张' },
  { id: 5, color: '#6c5ce7', title: '第五张' },
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.color }]}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.subText}>ID: {item.id}</Text>
          </View>
        )}
        indicator
        autoplay={3000}
        loop
        style={styles.swiper}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
})
`,le={code:ce,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

interface SlideItem {
  id: number
  color: string
  title: string
}

const data: SlideItem[] = [
  { id: 1, color: '#ff6b6b', title: '第一张' },
  { id: 2, color: '#4ecdc4', title: '第二张' },
  { id: 3, color: '#45b7d1', title: '第三张' },
  { id: 4, color: '#f9ca24', title: '第四张' },
  { id: 5, color: '#6c5ce7', title: '第五张' },
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.color }]}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.subText}>ID: {item.id}</Text>
          </View>
        )}
        indicator
        autoplay={3000}
        loop
        style={styles.swiper}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

interface SlideItem {
  id: number
  color: string
  title: string
}

const data: SlideItem[] = [
  { id: 1, color: '#ff6b6b', title: '第一张' },
  { id: 2, color: '#4ecdc4', title: '第二张' },
  { id: 3, color: '#45b7d1', title: '第三张' },
  { id: 4, color: '#f9ca24', title: '第四张' },
  { id: 5, color: '#6c5ce7', title: '第五张' },
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.color }]}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.subText}>ID: {item.id}</Text>
          </View>
        )}
        indicator
        autoplay={3000}
        loop
        style={styles.swiper}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
})
`}},title:"数据模式",identifier:"swiper-data-mode",lang:"tsx",meta:{title:"数据模式"}},ae=function({previewer:t=()=>null,api:n=()=>null}){const s=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"swiper-轮播","data-anchor":"swiper-轮播",children:"Swiper 轮播"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于循环播放一组图片或内容，基于 FlatList 实现，支持虚拟化，具备高性能。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(s,{code:"import { Swiper } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("p",{children:"每个 Swiper.Item 代表一张轮播卡片。"}),e.jsx("div",{children:e.jsx(s,{...k,children:e.jsx(j,{})})}),e.jsx("h3",{id:"自动播放","data-anchor":"自动播放",children:"自动播放"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"autoplay"})," 属性设置自动轮播的间隔。"]}),e.jsx("div",{children:e.jsx(s,{..._,children:e.jsx(b,{})})}),e.jsx("h3",{id:"图片轮播","data-anchor":"图片轮播",children:"图片轮播"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"Image"})," 组件渲染图片内容。"]}),e.jsx("div",{children:e.jsx(s,{...L,children:e.jsx(v,{})})}),e.jsx("h3",{id:"监听切换事件","data-anchor":"监听切换事件",children:"监听切换事件"}),e.jsxs("p",{children:["在每一页轮播结束后，会触发 ",e.jsx("code",{children:"onChange"})," 事件。"]}),e.jsx("div",{children:e.jsx(s,{...G,children:e.jsx(V,{})})}),e.jsx("h3",{id:"纵向滚动","data-anchor":"纵向滚动",children:"纵向滚动"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"vertical"})," 属性后滑块会纵向排列。"]}),e.jsx("div",{children:e.jsx(s,{...O,children:e.jsx(F,{})})}),e.jsx("h3",{id:"自定义指示器","data-anchor":"自定义指示器",children:"自定义指示器"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"indicator"})," 属性可以自定义指示器的样式。"]}),e.jsx("div",{children:e.jsx(s,{...X,children:e.jsx(I,{})})}),e.jsx("h3",{id:"关闭指示器","data-anchor":"关闭指示器",children:"关闭指示器"}),e.jsxs("p",{children:["将 ",e.jsx("code",{children:"indicator"})," 设置为 ",e.jsx("code",{children:"false"})," 可隐藏指示器。"]}),e.jsx("div",{children:e.jsx(s,{...ee,children:e.jsx(E,{})})}),e.jsx("h3",{id:"关闭循环","data-anchor":"关闭循环",children:"关闭循环"}),e.jsxs("p",{children:["将 ",e.jsx("code",{children:"loop"})," 设置为 ",e.jsx("code",{children:"false"})," 可关闭循环播放。"]}),e.jsx("div",{children:e.jsx(s,{...ie,children:e.jsx(C,{})})}),e.jsx("h3",{id:"使用-ref-控制","data-anchor":"使用-ref-控制",children:"使用 ref 控制"}),e.jsx("p",{children:"通过 ref 可以获取到 Swiper 实例并调用实例方法。"}),e.jsx("div",{children:e.jsx(s,{...se,children:e.jsx(T,{})})}),e.jsx("h3",{id:"数据模式高性能","data-anchor":"数据模式高性能",children:"数据模式（高性能）"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"data"})," 和 ",e.jsx("code",{children:"renderItem"})," 模式，适合动态数据或大量项目，性能更优。"]}),e.jsx("div",{children:e.jsx(s,{...le,children:e.jsx(A,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"swiper-props","data-anchor":"swiper-props",children:"Swiper Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"initialSwipe"})}),e.jsx("td",{children:"初始位置索引值"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"touchable"})}),e.jsx("td",{children:"是否允许手势滑动"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoplay"})}),e.jsxs("td",{children:["自动轮播间隔（ms），传 ",e.jsx("code",{children:"true"})," 使用默认间隔"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean | number"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loop"})}),e.jsx("td",{children:"是否开启循环播放"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"vertical"})}),e.jsx("td",{children:"是否为纵向滚动"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"每一页轮播结束后触发"}),e.jsx("td",{children:e.jsx("code",{children:"(index: number) => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"indicator"})}),e.jsx("td",{children:"自定义指示器"}),e.jsx("td",{children:e.jsx("code",{children:"boolean | ((total: number, current: number) => ReactNode)"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"indicatorProps"})}),e.jsx("td",{children:"指示器属性"}),e.jsx("td",{children:e.jsxs("code",{children:["{"," style?: StyleProp<ViewStyle> ","}"]})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"自定义样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"子元素（children 模式）"}),e.jsx("td",{children:e.jsx("code",{children:"React.ReactElement | React.ReactElement[]"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"data"})}),e.jsx("td",{children:"数据源（data 模式，与 children 二选一）"}),e.jsx("td",{children:e.jsx("code",{children:"T[]"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"renderItem"})}),e.jsx("td",{children:"渲染函数（data 模式）"}),e.jsx("td",{children:e.jsx("code",{children:"FlatListProps<T>['renderItem']"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"testID"})}),e.jsx("td",{children:"测试 ID"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]})]})]}),e.jsx("h3",{id:"swiper-方法","data-anchor":"swiper-方法",children:"Swiper 方法"}),e.jsx("p",{children:"通过 ref 可以获取到 Swiper 实例并调用实例方法。"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"参数"}),e.jsx("th",{children:"返回值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeTo"})}),e.jsx("td",{children:"切换到指定位置"}),e.jsx("td",{children:e.jsx("code",{children:"(index: number, animated?: boolean) => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeNext"})}),e.jsx("td",{children:"切换到下一轮播"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipePrev"})}),e.jsx("td",{children:"切换到上一轮播"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"getCurrentIndex"})}),e.jsx("td",{children:"获取当前索引"}),e.jsx("td",{children:e.jsx("code",{children:"() => number"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]})]})]}),e.jsx("h3",{id:"swiperitem-props","data-anchor":"swiperitem-props",children:"SwiperItem Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"自定义样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"子元素"}),e.jsx("td",{children:e.jsx("code",{children:"React.ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"testID"})}),e.jsx("td",{children:"测试 ID"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]})]})]}),e.jsx("h3",{id:"类型定义","data-anchor":"类型定义",children:"类型定义"}),e.jsx("p",{children:"组件导出以下类型定义："}),e.jsx(s,{code:"import type { SwiperInstance, SwiperProps } from 'react-native-system-ui'",lang:"ts"}),e.jsx("h2",{id:"性能说明","data-anchor":"性能说明",children:"性能说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["使用 ",e.jsx("strong",{children:"FlatList"})," 实现，支持虚拟化，仅渲染可见项"]}),e.jsx("li",{children:"适合大量数据或动态数据源"}),e.jsxs("li",{children:["支持 ",e.jsx("code",{children:"getItemLayout"})," 优化，提升滚动性能"]}),e.jsxs("li",{children:["支持 ",e.jsx("code",{children:"data"})," + ",e.jsx("code",{children:"renderItem"})," 模式，性能更优"]})]}),e.jsx("h2",{id:"注意事项","data-anchor":"注意事项",children:"注意事项"}),e.jsxs("ol",{children:[e.jsxs("li",{children:["当使用 ",e.jsx("code",{children:"children"})," 模式时，子元素可以是任意可渲染的节点"]}),e.jsxs("li",{children:["当使用 ",e.jsx("code",{children:"data"})," 模式时，需要提供 ",e.jsx("code",{children:"renderItem"})," 函数"]}),e.jsx("li",{children:"循环模式下，会自动复制首尾元素以实现无缝循环"}),e.jsx("li",{children:"建议为 Swiper 容器设置明确高度（纵向时设置高度，横向时设置宽度）"})]})]})})},de=[{Component:j,key:"swiper-basic",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},title:"基础",identifier:"swiper-basic",lang:"tsx",meta:{title:"基础"}},{Component:b,key:"swiper-autoplay",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator loop style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator loop style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},title:"自动播放",identifier:"swiper-autoplay",lang:"tsx",meta:{title:"自动播放"}},{Component:v,key:"swiper-images",sources:{_:{tsx:`import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator style={styles.swiper}>
        {images.map((uri) => (
          <Swiper.Item key={uri}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})


`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator style={styles.swiper}>
        {images.map((uri) => (
          <Swiper.Item key={uri}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})


`}},title:"图片轮播",identifier:"swiper-images",lang:"tsx",meta:{title:"图片轮播"}},{Component:V,key:"swiper-onchange",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => {
          Toast.info(\`当前索引: \${index}\`)
        }}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => {
          Toast.info(\`当前索引: \${index}\`)
        }}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},title:"监听切换",identifier:"swiper-onchange",lang:"tsx",meta:{title:"监听切换"}},{Component:F,key:"swiper-vertical",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper vertical indicator autoplay={3000} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper vertical indicator autoplay={3000} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
`}},title:"纵向滚动",identifier:"swiper-vertical",lang:"tsx",meta:{title:"纵向滚动"}},{Component:I,key:"swiper-custom-indicator",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.customIndicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  customIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  indicatorText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '500',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.customIndicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  customIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  indicatorText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '500',
  },
})
`}},title:"自定义指示器",identifier:"swiper-custom-indicator",lang:"tsx",meta:{title:"自定义指示器"}},{Component:E,key:"swiper-indicator-off",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator={false} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator={false} style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`}},title:"关闭指示器",identifier:"swiper-indicator-off",lang:"tsx",meta:{title:"关闭指示器"}},{Component:C,key:"swiper-loop",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper loop={false} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper loop={false} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})


`}},title:"关闭循环",identifier:"swiper-loop",lang:"tsx",meta:{title:"关闭循环"}},{Component:T,key:"swiper-ref",sources:{_:{tsx:`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button
          size="small"
          text="上一张"
          onPress={() => {
            swiperRef.current?.swipePrev()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="下一张"
          onPress={() => {
            swiperRef.current?.swipeNext()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="第一张"
          onPress={() => {
            swiperRef.current?.swipeTo(0)
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="最后一张"
          onPress={() => {
            swiperRef.current?.swipeTo(lastIndex)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: 8,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef} indicator style={styles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button
          size="small"
          text="上一张"
          onPress={() => {
            swiperRef.current?.swipePrev()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="下一张"
          onPress={() => {
            swiperRef.current?.swipeNext()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="第一张"
          onPress={() => {
            swiperRef.current?.swipeTo(0)
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="最后一张"
          onPress={() => {
            swiperRef.current?.swipeTo(lastIndex)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: 8,
  },
})
`}},title:"Ref 控制",identifier:"swiper-ref",lang:"tsx",meta:{title:"Ref 控制"}},{Component:A,key:"swiper-data-mode",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

interface SlideItem {
  id: number
  color: string
  title: string
}

const data: SlideItem[] = [
  { id: 1, color: '#ff6b6b', title: '第一张' },
  { id: 2, color: '#4ecdc4', title: '第二张' },
  { id: 3, color: '#45b7d1', title: '第三张' },
  { id: 4, color: '#f9ca24', title: '第四张' },
  { id: 5, color: '#6c5ce7', title: '第五张' },
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.color }]}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.subText}>ID: {item.id}</Text>
          </View>
        )}
        indicator
        autoplay={3000}
        loop
        style={styles.swiper}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

interface SlideItem {
  id: number
  color: string
  title: string
}

const data: SlideItem[] = [
  { id: 1, color: '#ff6b6b', title: '第一张' },
  { id: 2, color: '#4ecdc4', title: '第二张' },
  { id: 3, color: '#45b7d1', title: '第三张' },
  { id: 4, color: '#f9ca24', title: '第四张' },
  { id: 5, color: '#6c5ce7', title: '第五张' },
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.color }]}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.subText}>ID: {item.id}</Text>
          </View>
        )}
        indicator
        autoplay={3000}
        loop
        style={styles.swiper}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
})
`}},title:"数据模式",identifier:"swiper-data-mode",lang:"tsx",meta:{title:"数据模式"}}],ue={simulator:{compact:!0}},pe=[{depth:1,text:"Swiper 轮播",id:"swiper-轮播"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自动播放",id:"自动播放"},{depth:3,text:"图片轮播",id:"图片轮播"},{depth:3,text:"监听切换事件",id:"监听切换事件"},{depth:3,text:"纵向滚动",id:"纵向滚动"},{depth:3,text:"自定义指示器",id:"自定义指示器"},{depth:3,text:"关闭指示器",id:"关闭指示器"},{depth:3,text:"关闭循环",id:"关闭循环"},{depth:3,text:"使用 ref 控制",id:"使用-ref-控制"},{depth:3,text:"数据模式（高性能）",id:"数据模式高性能"},{depth:2,text:"API",id:"api"},{depth:3,text:"Swiper Props",id:"swiper-props"},{depth:3,text:"Swiper 方法",id:"swiper-方法"},{depth:3,text:"SwiperItem Props",id:"swiperitem-props"},{depth:3,text:"类型定义",id:"类型定义"},{depth:2,text:"性能说明",id:"性能说明"},{depth:2,text:"注意事项",id:"注意事项"}],ye="/docs/components/swiper.md",he="Swiper 轮播",xe="1770261692000",qe=t=>t.children({MdContent:ae,demos:de,frontmatter:ue,slugs:pe,filePath:ye,title:he,updatedTime:xe});export{ae as MdContent,qe as default,de as demos,ye as filePath,ue as frontmatter,pe as slugs,he as title,xe as updatedTime};
