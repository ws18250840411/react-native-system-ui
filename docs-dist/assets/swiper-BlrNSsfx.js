import{s as p,j as e,V as i,r as I}from"./main-CC2DK3OK.js";import{S as s}from"./index-Nb5Zafj3.js";import{T as c}from"./createComponentTokensHook-BcXZOvON.js";import{I as E}from"./index-D_JlQYPg.js";import{T as C}from"./index-CYc3exVx.js";import{B as u}from"./index-BfHwmVBQ.js";import"./number-BG570ZaL.js";import"./index-BP7Blb5n.js";import"./index-CCOraIhd.js";import"./index-Cakcz3d2.js";import"./extends-CF3RwP-h.js";import"./index-CJrLMJTa.js";import"./Portal-D9I31KH1.js";import"./Loading-_9EKEhr2.js";import"./index-BnjI8SiS.js";import"./Checked-BJm2Hkef.js";import"./IconBase-BNmvoXvm.js";import"./Close-BKbx2ovl.js";import"./Animated-C-b5K9fC.js";import"./index-CN-rk8sC.js";import"./SafeAreaView-CgItGtgs.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./useOverlayStack-xa377Hoz.js";import"./animation-BpxpeSKC.js";import"./useAriaPress-DVn62gIQ.js";import"./createPlatformShadow-BbOkyb5V.js";import"./hairline-Bq3nniT3.js";import"./color-BplLcdBL.js";const l=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#6c5ce7"],n=p.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:48,color:"#fff",fontWeight:"bold"}});function w(){return e.jsx(i,{style:n.container,children:e.jsx(s,{indicator:!0,style:n.swiper,children:l.map((t,r)=>e.jsx(s.Item,{children:e.jsx(i,{style:[n.slide,{backgroundColor:t}],children:e.jsx(c,{style:n.text,children:r+1})})},r))})})}const T=`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperBasicDemo() {
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
`,D={code:T,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperBasicDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperBasicDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"基础",identifier:"swiper-basic",lang:"tsx",meta:{title:"基础"}};function x(){return e.jsx(i,{style:n.container,children:e.jsx(s,{autoplay:3e3,indicator:!0,loop:!0,style:n.swiper,children:l.map((t,r)=>e.jsx(s.Item,{children:e.jsx(i,{style:[n.slide,{backgroundColor:t}],children:e.jsx(c,{style:n.text,children:r+1})})},r))})})}const A=`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperAutoplayDemo() {
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
`,B={code:A,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperAutoplayDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperAutoplayDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"自动播放",identifier:"swiper-autoplay",lang:"tsx",meta:{title:"自动播放"}},P=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg","https://img.yzcdn.cn/vant/apple-4.jpg"];function f(){return e.jsx(i,{style:y.container,children:e.jsx(s,{autoplay:3e3,indicator:!0,style:y.swiper,children:P.map(t=>e.jsx(s.Item,{children:e.jsx(E,{source:{uri:t},style:y.image,resizeMode:"cover"})},t))})})}const y=p.create({container:{height:200},swiper:{height:200},image:{width:"100%",height:"100%"}}),k=`import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
]

export default function SwiperImagesDemo() {
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
`,R={code:k,sources:{_:{tsx:`import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
]

export default function SwiperImagesDemo() {
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

export default function SwiperImagesDemo() {
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
`}},title:"图片轮播",identifier:"swiper-images",lang:"tsx",meta:{title:"图片轮播"}};function S(){return e.jsx(i,{style:n.container,children:e.jsx(s,{indicator:!0,onChange:t=>C.info(`当前索引: ${t}`),style:n.swiper,children:l.map((t,r)=>e.jsx(s.Item,{children:e.jsx(i,{style:[n.slide,{backgroundColor:t}],children:e.jsx(c,{style:n.text,children:r+1})})},r))})})}const z=`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperOnChangeDemo() {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => Toast.info(\`当前索引: \${index}\`)}
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
`,M={code:z,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperOnChangeDemo() {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => Toast.info(\`当前索引: \${index}\`)}
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperOnChangeDemo() {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => Toast.info(\`当前索引: \${index}\`)}
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"监听切换",identifier:"swiper-onchange",lang:"tsx",meta:{title:"监听切换"}};function g(){return e.jsx(i,{style:n.container,children:e.jsx(s,{vertical:!0,indicator:!0,autoplay:3e3,style:n.swiper,children:l.map((t,r)=>e.jsx(s.Item,{children:e.jsx(i,{style:[n.slide,{backgroundColor:t}],children:e.jsx(c,{style:n.text,children:r+1})})},r))})})}const N=`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperVerticalDemo() {
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
`,_={code:N,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperVerticalDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperVerticalDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"纵向滚动",identifier:"swiper-vertical",lang:"tsx",meta:{title:"纵向滚动"}};function j(){return e.jsx(i,{style:n.container,children:e.jsx(s,{indicator:(t,r)=>e.jsx(i,{style:h.indicator,children:e.jsxs(c,{style:h.indicatorText,children:[r+1," / ",t]})}),style:n.swiper,children:l.map((t,r)=>e.jsx(s.Item,{children:e.jsx(i,{style:[n.slide,{backgroundColor:t}],children:e.jsx(c,{style:n.text,children:r+1})})},r))})})}const h=p.create({indicator:{position:"absolute",bottom:16,left:0,right:0,alignItems:"center"},indicatorText:{backgroundColor:"rgba(0, 0, 0, 0.5)",color:"#fff",paddingHorizontal:12,paddingVertical:4,borderRadius:12,fontSize:14,fontWeight:"500"}}),W=`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperCustomIndicatorDemo() {
  return (
    <View style={swiperStyles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={swiperStyles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
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
`,L={code:W,sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperCustomIndicatorDemo() {
  return (
    <View style={swiperStyles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={swiperStyles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { colors, swiperStyles } from './shared'

export default function SwiperCustomIndicatorDemo() {
  return (
    <View style={swiperStyles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={swiperStyles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"自定义指示器",identifier:"swiper-custom-indicator",lang:"tsx",meta:{title:"自定义指示器"}};function v(){return e.jsx(i,{style:n.container,children:e.jsx(s,{indicator:!1,style:n.swiper,children:l.map((t,r)=>e.jsx(s.Item,{children:e.jsx(i,{style:[n.slide,{backgroundColor:t}],children:e.jsx(c,{style:n.text,children:r+1})})},r))})})}const $=`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperIndicatorOffDemo() {
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
`,U={code:$,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperIndicatorOffDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperIndicatorOffDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"关闭指示器",identifier:"swiper-indicator-off",lang:"tsx",meta:{title:"关闭指示器"}};function F(){return e.jsx(i,{style:n.container,children:e.jsx(s,{loop:!1,indicator:!0,style:n.swiper,children:l.map((t,r)=>e.jsx(s.Item,{children:e.jsx(i,{style:[n.slide,{backgroundColor:t}],children:e.jsx(c,{style:n.text,children:r+1})})},r))})})}const O=`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperLoopDemo() {
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
`,H={code:O,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperLoopDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperLoopDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"关闭循环",identifier:"swiper-loop",lang:"tsx",meta:{title:"关闭循环"}};function V(){const t=I.useRef(null),r=l.length-1;return e.jsxs(i,{style:a.wrapper,children:[e.jsx(s,{ref:t,indicator:!0,style:n.swiper,children:l.map((o,m)=>e.jsx(s.Item,{children:e.jsx(i,{style:[n.slide,{backgroundColor:o}],children:e.jsx(c,{style:n.text,children:m+1})})},m))}),e.jsxs(i,{style:a.controls,children:[e.jsx(u,{size:"small",text:"上一张",onPress:()=>t.current?.swipePrev()}),e.jsx(i,{style:a.spacer}),e.jsx(u,{size:"small",text:"下一张",onPress:()=>t.current?.swipeNext()}),e.jsx(i,{style:a.spacer}),e.jsx(u,{size:"small",text:"第一张",onPress:()=>t.current?.swipeTo(0)}),e.jsx(i,{style:a.spacer}),e.jsx(u,{size:"small",text:"最后一张",onPress:()=>t.current?.swipeTo(r)})]})]})}const a=p.create({wrapper:{height:300},controls:{flexDirection:"row",padding:16,justifyContent:"center",alignItems:"center"},spacer:{width:8}}),q=`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperRefDemo() {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.wrapper}>
      <Swiper ref={swiperRef} indicator style={swiperStyles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button size="small" text="上一张" onPress={() => swiperRef.current?.swipePrev()} />
        <View style={styles.spacer} />
        <Button size="small" text="下一张" onPress={() => swiperRef.current?.swipeNext()} />
        <View style={styles.spacer} />
        <Button size="small" text="第一张" onPress={() => swiperRef.current?.swipeTo(0)} />
        <View style={styles.spacer} />
        <Button size="small" text="最后一张" onPress={() => swiperRef.current?.swipeTo(lastIndex)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { height: 300 },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: { width: 8 },
})
`,G={code:q,sources:{_:{tsx:`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperRefDemo() {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.wrapper}>
      <Swiper ref={swiperRef} indicator style={swiperStyles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button size="small" text="上一张" onPress={() => swiperRef.current?.swipePrev()} />
        <View style={styles.spacer} />
        <Button size="small" text="下一张" onPress={() => swiperRef.current?.swipeNext()} />
        <View style={styles.spacer} />
        <Button size="small" text="第一张" onPress={() => swiperRef.current?.swipeTo(0)} />
        <View style={styles.spacer} />
        <Button size="small" text="最后一张" onPress={() => swiperRef.current?.swipeTo(lastIndex)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { height: 300 },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: { width: 8 },
})
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperRefDemo() {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.wrapper}>
      <Swiper ref={swiperRef} indicator style={swiperStyles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button size="small" text="上一张" onPress={() => swiperRef.current?.swipePrev()} />
        <View style={styles.spacer} />
        <Button size="small" text="下一张" onPress={() => swiperRef.current?.swipeNext()} />
        <View style={styles.spacer} />
        <Button size="small" text="第一张" onPress={() => swiperRef.current?.swipeTo(0)} />
        <View style={styles.spacer} />
        <Button size="small" text="最后一张" onPress={() => swiperRef.current?.swipeTo(lastIndex)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { height: 300 },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: { width: 8 },
})
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"Ref 控制",identifier:"swiper-ref",lang:"tsx",meta:{title:"Ref 控制"}},J=[{id:1,color:"#ff6b6b",title:"第一张"},{id:2,color:"#4ecdc4",title:"第二张"},{id:3,color:"#45b7d1",title:"第三张"},{id:4,color:"#f9ca24",title:"第四张"},{id:5,color:"#6c5ce7",title:"第五张"}];function b(){return e.jsx(i,{style:d.container,children:e.jsx(s,{data:J,renderItem:({item:t})=>e.jsxs(i,{style:[d.slide,{backgroundColor:t.color}],children:[e.jsx(c,{style:d.text,children:t.title}),e.jsxs(c,{style:d.subText,children:["ID: ",t.id]})]}),indicator:!0,autoplay:3e3,loop:!0,style:d.swiper})})}const d=p.create({container:{height:200},swiper:{height:200},slide:{width:"100%",height:200,justifyContent:"center",alignItems:"center"},text:{fontSize:32,color:"#fff",fontWeight:"bold",marginBottom:8},subText:{fontSize:16,color:"rgba(255, 255, 255, 0.8)"}}),K=`import React from 'react'
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

export default function SwiperDataModeDemo() {
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
`,Q={code:K,sources:{_:{tsx:`import React from 'react'
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

export default function SwiperDataModeDemo() {
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

export default function SwiperDataModeDemo() {
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
`}},title:"数据模式",identifier:"swiper-data-mode",lang:"tsx",meta:{title:"数据模式"}},X=function({previewer:t=()=>null,api:r=()=>null}){const o=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"swiper-轮播","data-anchor":"swiper-轮播",children:"Swiper 轮播"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于循环播放一组图片或内容，基于 FlatList 实现，支持虚拟化，具备高性能。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Swiper } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("p",{children:"每个 Swiper.Item 代表一张轮播卡片。"}),e.jsx("div",{children:e.jsx(o,{...D,children:e.jsx(w,{})})}),e.jsx("h3",{id:"自动播放","data-anchor":"自动播放",children:"自动播放"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"autoplay"})," 属性设置自动轮播的间隔。"]}),e.jsx("div",{children:e.jsx(o,{...B,children:e.jsx(x,{})})}),e.jsx("h3",{id:"图片轮播","data-anchor":"图片轮播",children:"图片轮播"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"Image"})," 组件渲染图片内容。"]}),e.jsx("div",{children:e.jsx(o,{...R,children:e.jsx(f,{})})}),e.jsx("h3",{id:"监听切换事件","data-anchor":"监听切换事件",children:"监听切换事件"}),e.jsxs("p",{children:["在每一页轮播结束后，会触发 ",e.jsx("code",{children:"onChange"})," 事件。"]}),e.jsx("div",{children:e.jsx(o,{...M,children:e.jsx(S,{})})}),e.jsx("h3",{id:"纵向滚动","data-anchor":"纵向滚动",children:"纵向滚动"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"vertical"})," 属性后滑块会纵向排列。"]}),e.jsx("div",{children:e.jsx(o,{..._,children:e.jsx(g,{})})}),e.jsx("h3",{id:"自定义指示器","data-anchor":"自定义指示器",children:"自定义指示器"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"indicator"})," 属性可以自定义指示器的样式。"]}),e.jsx("div",{children:e.jsx(o,{...L,children:e.jsx(j,{})})}),e.jsx("h3",{id:"关闭指示器","data-anchor":"关闭指示器",children:"关闭指示器"}),e.jsxs("p",{children:["将 ",e.jsx("code",{children:"indicator"})," 设置为 ",e.jsx("code",{children:"false"})," 可隐藏指示器。"]}),e.jsx("div",{children:e.jsx(o,{...U,children:e.jsx(v,{})})}),e.jsx("h3",{id:"关闭循环","data-anchor":"关闭循环",children:"关闭循环"}),e.jsxs("p",{children:["将 ",e.jsx("code",{children:"loop"})," 设置为 ",e.jsx("code",{children:"false"})," 可关闭循环播放。"]}),e.jsx("div",{children:e.jsx(o,{...H,children:e.jsx(F,{})})}),e.jsx("h3",{id:"使用-ref-控制","data-anchor":"使用-ref-控制",children:"使用 ref 控制"}),e.jsx("p",{children:"通过 ref 可以获取到 Swiper 实例并调用实例方法。"}),e.jsx("div",{children:e.jsx(o,{...G,children:e.jsx(V,{})})}),e.jsx("h3",{id:"数据模式高性能","data-anchor":"数据模式高性能",children:"数据模式（高性能）"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"data"})," 和 ",e.jsx("code",{children:"renderItem"})," 模式，适合动态数据或大量项目，性能更优。"]}),e.jsx("div",{children:e.jsx(o,{...Q,children:e.jsx(b,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"swiper-props","data-anchor":"swiper-props",children:"Swiper Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"initialSwipe"})}),e.jsx("td",{children:"初始位置索引值"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"touchable"})}),e.jsx("td",{children:"是否允许手势滑动"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoplay"})}),e.jsxs("td",{children:["自动轮播间隔（ms），传 ",e.jsx("code",{children:"true"})," 使用默认间隔"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean | number"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loop"})}),e.jsx("td",{children:"是否开启循环播放"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"vertical"})}),e.jsx("td",{children:"是否为纵向滚动"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"每一页轮播结束后触发"}),e.jsx("td",{children:e.jsx("code",{children:"(index: number) => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"indicator"})}),e.jsx("td",{children:"自定义指示器"}),e.jsx("td",{children:e.jsx("code",{children:"boolean | ((total: number, current: number) => ReactNode)"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"indicatorProps"})}),e.jsx("td",{children:"指示器属性"}),e.jsx("td",{children:e.jsxs("code",{children:["{"," style?: StyleProp<ViewStyle> ","}"]})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"自定义样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"子元素（children 模式）"}),e.jsx("td",{children:e.jsx("code",{children:"React.ReactElement | React.ReactElement[]"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"data"})}),e.jsx("td",{children:"数据源（data 模式，与 children 二选一）"}),e.jsx("td",{children:e.jsx("code",{children:"T[]"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"renderItem"})}),e.jsx("td",{children:"渲染函数（data 模式）"}),e.jsx("td",{children:e.jsx("code",{children:"FlatListProps<T>['renderItem']"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"testID"})}),e.jsx("td",{children:"测试 ID"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]})]})]}),e.jsx("h3",{id:"swiper-方法","data-anchor":"swiper-方法",children:"Swiper 方法"}),e.jsx("p",{children:"通过 ref 可以获取到 Swiper 实例并调用实例方法。"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"参数"}),e.jsx("th",{children:"返回值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeTo"})}),e.jsx("td",{children:"切换到指定位置"}),e.jsx("td",{children:e.jsx("code",{children:"(index: number, animated?: boolean) => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeNext"})}),e.jsx("td",{children:"切换到下一轮播"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipePrev"})}),e.jsx("td",{children:"切换到上一轮播"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"getCurrentIndex"})}),e.jsx("td",{children:"获取当前索引"}),e.jsx("td",{children:e.jsx("code",{children:"() => number"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]})]})]}),e.jsx("h3",{id:"swiperitem-props","data-anchor":"swiperitem-props",children:"SwiperItem Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"自定义样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"子元素"}),e.jsx("td",{children:e.jsx("code",{children:"React.ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"testID"})}),e.jsx("td",{children:"测试 ID"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]})]})]}),e.jsx("h3",{id:"类型定义","data-anchor":"类型定义",children:"类型定义"}),e.jsx("p",{children:"组件导出以下类型定义："}),e.jsx(o,{code:"import type { SwiperInstance, SwiperProps } from 'react-native-system-ui'",lang:"ts"}),e.jsx("h2",{id:"性能说明","data-anchor":"性能说明",children:"性能说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["使用 ",e.jsx("strong",{children:"FlatList"})," 实现，支持虚拟化，仅渲染可见项"]}),e.jsx("li",{children:"适合大量数据或动态数据源"}),e.jsxs("li",{children:["支持 ",e.jsx("code",{children:"getItemLayout"})," 优化，提升滚动性能"]}),e.jsxs("li",{children:["支持 ",e.jsx("code",{children:"data"})," + ",e.jsx("code",{children:"renderItem"})," 模式，性能更优"]})]}),e.jsx("h2",{id:"注意事项","data-anchor":"注意事项",children:"注意事项"}),e.jsxs("ol",{children:[e.jsxs("li",{children:["当使用 ",e.jsx("code",{children:"children"})," 模式时，子元素可以是任意可渲染的节点"]}),e.jsxs("li",{children:["当使用 ",e.jsx("code",{children:"data"})," 模式时，需要提供 ",e.jsx("code",{children:"renderItem"})," 函数"]}),e.jsx("li",{children:"循环模式下，会自动复制首尾元素以实现无缝循环"}),e.jsx("li",{children:"建议为 Swiper 容器设置明确高度（纵向时设置高度，横向时设置宽度）"})]})]})})},Y=[{Component:w,key:"swiper-basic",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperBasicDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperBasicDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"基础",identifier:"swiper-basic",lang:"tsx",meta:{title:"基础"}},{Component:x,key:"swiper-autoplay",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperAutoplayDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperAutoplayDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"自动播放",identifier:"swiper-autoplay",lang:"tsx",meta:{title:"自动播放"}},{Component:f,key:"swiper-images",sources:{_:{tsx:`import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
]

export default function SwiperImagesDemo() {
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

export default function SwiperImagesDemo() {
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
`}},title:"图片轮播",identifier:"swiper-images",lang:"tsx",meta:{title:"图片轮播"}},{Component:S,key:"swiper-onchange",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperOnChangeDemo() {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => Toast.info(\`当前索引: \${index}\`)}
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperOnChangeDemo() {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => Toast.info(\`当前索引: \${index}\`)}
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"监听切换",identifier:"swiper-onchange",lang:"tsx",meta:{title:"监听切换"}},{Component:g,key:"swiper-vertical",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperVerticalDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperVerticalDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"纵向滚动",identifier:"swiper-vertical",lang:"tsx",meta:{title:"纵向滚动"}},{Component:j,key:"swiper-custom-indicator",sources:{_:{tsx:`import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperCustomIndicatorDemo() {
  return (
    <View style={swiperStyles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={swiperStyles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { colors, swiperStyles } from './shared'

export default function SwiperCustomIndicatorDemo() {
  return (
    <View style={swiperStyles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={swiperStyles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"自定义指示器",identifier:"swiper-custom-indicator",lang:"tsx",meta:{title:"自定义指示器"}},{Component:v,key:"swiper-indicator-off",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperIndicatorOffDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperIndicatorOffDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"关闭指示器",identifier:"swiper-indicator-off",lang:"tsx",meta:{title:"关闭指示器"}},{Component:F,key:"swiper-loop",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperLoopDemo() {
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
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
import { View, Text } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperLoopDemo() {
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
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"关闭循环",identifier:"swiper-loop",lang:"tsx",meta:{title:"关闭循环"}},{Component:V,key:"swiper-ref",sources:{_:{tsx:`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperRefDemo() {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.wrapper}>
      <Swiper ref={swiperRef} indicator style={swiperStyles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button size="small" text="上一张" onPress={() => swiperRef.current?.swipePrev()} />
        <View style={styles.spacer} />
        <Button size="small" text="下一张" onPress={() => swiperRef.current?.swipeNext()} />
        <View style={styles.spacer} />
        <Button size="small" text="第一张" onPress={() => swiperRef.current?.swipeTo(0)} />
        <View style={styles.spacer} />
        <Button size="small" text="最后一张" onPress={() => swiperRef.current?.swipeTo(lastIndex)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { height: 300 },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: { width: 8 },
})
`},"shared.ts":{import:"./shared",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/swiper/demo/shared.ts",content:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperRefDemo() {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.wrapper}>
      <Swiper ref={swiperRef} indicator style={swiperStyles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button size="small" text="上一张" onPress={() => swiperRef.current?.swipePrev()} />
        <View style={styles.spacer} />
        <Button size="small" text="下一张" onPress={() => swiperRef.current?.swipeNext()} />
        <View style={styles.spacer} />
        <Button size="small" text="第一张" onPress={() => swiperRef.current?.swipeTo(0)} />
        <View style={styles.spacer} />
        <Button size="small" text="最后一张" onPress={() => swiperRef.current?.swipeTo(lastIndex)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { height: 300 },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: { width: 8 },
})
`},"shared.ts":{type:"FILE",value:`import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
`}},title:"Ref 控制",identifier:"swiper-ref",lang:"tsx",meta:{title:"Ref 控制"}},{Component:b,key:"swiper-data-mode",sources:{_:{tsx:`import React from 'react'
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

export default function SwiperDataModeDemo() {
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

export default function SwiperDataModeDemo() {
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
`}},title:"数据模式",identifier:"swiper-data-mode",lang:"tsx",meta:{title:"数据模式"}}],Z={simulator:{compact:!0}},ee=[{depth:1,text:"Swiper 轮播",id:"swiper-轮播"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自动播放",id:"自动播放"},{depth:3,text:"图片轮播",id:"图片轮播"},{depth:3,text:"监听切换事件",id:"监听切换事件"},{depth:3,text:"纵向滚动",id:"纵向滚动"},{depth:3,text:"自定义指示器",id:"自定义指示器"},{depth:3,text:"关闭指示器",id:"关闭指示器"},{depth:3,text:"关闭循环",id:"关闭循环"},{depth:3,text:"使用 ref 控制",id:"使用-ref-控制"},{depth:3,text:"数据模式（高性能）",id:"数据模式高性能"},{depth:2,text:"API",id:"api"},{depth:3,text:"Swiper Props",id:"swiper-props"},{depth:3,text:"Swiper 方法",id:"swiper-方法"},{depth:3,text:"SwiperItem Props",id:"swiperitem-props"},{depth:3,text:"类型定义",id:"类型定义"},{depth:2,text:"性能说明",id:"性能说明"},{depth:2,text:"注意事项",id:"注意事项"}],te="/docs/components/swiper.md",ne="Swiper 轮播",re="1770261692000",Be=t=>t.children({MdContent:X,demos:Y,frontmatter:Z,slugs:ee,filePath:te,title:ne,updatedTime:re});export{X as MdContent,Be as default,Y as demos,te as filePath,Z as frontmatter,ee as slugs,ne as title,re as updatedTime};
