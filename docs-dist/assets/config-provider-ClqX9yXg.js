import{R as m,j as e,V as n,C as y,z as w,s as c}from"./main-BuQiU471.js";import{T as r}from"./createComponentTokensHook-BZh_OSSd.js";import{B as u}from"./index-CvolElyI.js";import{u as v}from"./useLocale-37vdikYq.js";import{S as d}from"./Space-BsyLL5rO.js";import{S}from"./Slider-QkvCLgzO.js";import{S as C,a as p}from"./index-D2ejmnaI.js";import"./createPlatformShadow-BbOkyb5V.js";import"./color-DLepBbWK.js";import"./number-DwcHNqSr.js";import"./useAriaPress-D5uAXibC.js";import"./index-CJrLMJTa.js";import"./index-BRfylSA6.js";import"./extends-CF3RwP-h.js";import"./index-CA-bMxjH.js";import"./useLabel-CxgFAoPc.js";import"./index-COVjMqe7.js";import"./index-BAZkLH96.js";import"./index-CfLKkUWT.js";const B={name:"Name",tel:"Phone",save:"Save",confirm:"Confirm",cancel:"Cancel",delete:"Delete",loading:"Loading...",noCoupon:"No coupons",nameEmpty:"Please enter a name",telInvalid:"Please enter a valid phone number",vanCalendar:{end:"End",start:"Start",title:"Select Date",confirm:"Confirm",startEnd:"Start/End",weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],monthTitle:(t,s)=>`${t}/${s}`,rangePrompt:t=>`Select up to ${t} days`},vanPicker:{select:"Please select"},vanContactCard:{addText:"Add contact"},vanContactList:{addText:"New contact"},vanPagination:{prev:"Previous",next:"Next"},vanPullRefresh:{pulling:"Pull to refresh...",loosing:"Release to refresh...",loading:"Loading..."},vanSubmitBar:{label:"Total:"},vanCoupon:{unlimited:"No minimum spend",discount:t=>`${t}% off`,condition:t=>`Valid on orders over ${t}`},vanCouponCell:{title:"Coupon",count:t=>`${t} available`},vanCouponList:{exchange:"Redeem",close:"Do not use coupons",enable:"Available",disabled:"Unavailable",placeholder:"Enter coupon code"},vanAddressEdit:{area:"Area",postal:"Postal code",areaEmpty:"Please select an area",addressEmpty:"Please enter the address",postalEmpty:"Invalid postal code",defaultAddress:"Set as default address"},vanAddressEditDetail:{label:"Address",placeholder:"Street, building, etc."},vanAddressList:{add:"Add address"}},b=()=>{const t=v();return e.jsxs(n,{style:o.localePreview,children:[e.jsxs(n,{style:o.localeRow,children:[e.jsx(r,{style:o.localeLabel,children:"Loading"}),e.jsx(r,{style:o.localeValue,children:t.loading})]}),e.jsxs(n,{style:o.localeRow,children:[e.jsx(r,{style:o.localeLabel,children:"Confirm"}),e.jsx(r,{style:o.localeValue,children:t.confirm})]}),e.jsxs(n,{style:o.localeRow,children:[e.jsx(r,{style:o.localeLabel,children:"Cancel"}),e.jsx(r,{style:o.localeValue,children:t.cancel})]})]})},g=()=>{const[t,s]=m.useState("en"),i=t==="en"?B:w;return e.jsx(n,{style:o.root,children:e.jsxs(n,{style:o.panel,children:[e.jsx(r,{style:o.title,children:"语言切换"}),e.jsxs(d,{wrap:!0,gap:8,style:o.actions,children:[e.jsx(u,{text:"中文",size:"small",type:t==="zh"?"primary":"default",onPress:()=>s("zh")}),e.jsx(u,{text:"English",size:"small",type:t==="en"?"primary":"default",onPress:()=>s("en")})]}),e.jsx(y,{locale:i,children:e.jsx(b,{})})]})})},o=c.create({root:{width:"100%"},panel:{backgroundColor:"#ffffff",borderRadius:16,padding:16},title:{marginBottom:12,fontSize:14,fontWeight:"600",color:"#1d1f2c"},actions:{marginBottom:12,width:"100%"},localePreview:{padding:12,borderRadius:12,backgroundColor:"#f4f7ff"},localeRow:{flexDirection:"row",alignItems:"center",marginBottom:6},localeLabel:{fontSize:13,fontWeight:"600",color:"#475467",marginRight:6,minWidth:56},localeValue:{fontSize:13,color:"#101828",flexShrink:1}}),V=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Space, enUS, useLocale, zhCN } from 'react-native-system-ui'

const LocaleViewer = () => {
  const locale = useLocale()
  return (
    <View style={styles.localePreview}>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Loading</Text>
        <Text style={styles.localeValue}>{locale.loading}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Confirm</Text>
        <Text style={styles.localeValue}>{locale.confirm}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Cancel</Text>
        <Text style={styles.localeValue}>{locale.cancel}</Text>
      </View>
    </View>
  )
}

export default () => {
  const [language, setLanguage] = React.useState<'zh' | 'en'>('en')
  const locale = language === 'en' ? enUS : zhCN

  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>语言切换</Text>
        <Space wrap gap={8} style={styles.actions}>
          <Button
            text="中文"
            size="small"
            type={language === 'zh' ? 'primary' : 'default'}
            onPress={() => setLanguage('zh')}
          />
          <Button
            text="English"
            size="small"
            type={language === 'en' ? 'primary' : 'default'}
            onPress={() => setLanguage('en')}
          />
        </Space>
        <ConfigProvider locale={locale}>
          <LocaleViewer />
        </ConfigProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  actions: {
    marginBottom: 12,
    width: '100%',
  },
  localePreview: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f4f7ff',
  },
  localeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  localeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475467',
    marginRight: 6,
    minWidth: 56,
  },
  localeValue: {
    fontSize: 13,
    color: '#101828',
    flexShrink: 1,
  },
})
`,F={code:V,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Space, enUS, useLocale, zhCN } from 'react-native-system-ui'

const LocaleViewer = () => {
  const locale = useLocale()
  return (
    <View style={styles.localePreview}>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Loading</Text>
        <Text style={styles.localeValue}>{locale.loading}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Confirm</Text>
        <Text style={styles.localeValue}>{locale.confirm}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Cancel</Text>
        <Text style={styles.localeValue}>{locale.cancel}</Text>
      </View>
    </View>
  )
}

export default () => {
  const [language, setLanguage] = React.useState<'zh' | 'en'>('en')
  const locale = language === 'en' ? enUS : zhCN

  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>语言切换</Text>
        <Space wrap gap={8} style={styles.actions}>
          <Button
            text="中文"
            size="small"
            type={language === 'zh' ? 'primary' : 'default'}
            onPress={() => setLanguage('zh')}
          />
          <Button
            text="English"
            size="small"
            type={language === 'en' ? 'primary' : 'default'}
            onPress={() => setLanguage('en')}
          />
        </Space>
        <ConfigProvider locale={locale}>
          <LocaleViewer />
        </ConfigProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  actions: {
    marginBottom: 12,
    width: '100%',
  },
  localePreview: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f4f7ff',
  },
  localeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  localeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475467',
    marginRight: 6,
    minWidth: 56,
  },
  localeValue: {
    fontSize: 13,
    color: '#101828',
    flexShrink: 1,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Space, enUS, useLocale, zhCN } from 'react-native-system-ui'

const LocaleViewer = () => {
  const locale = useLocale()
  return (
    <View style={styles.localePreview}>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Loading</Text>
        <Text style={styles.localeValue}>{locale.loading}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Confirm</Text>
        <Text style={styles.localeValue}>{locale.confirm}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Cancel</Text>
        <Text style={styles.localeValue}>{locale.cancel}</Text>
      </View>
    </View>
  )
}

export default () => {
  const [language, setLanguage] = React.useState<'zh' | 'en'>('en')
  const locale = language === 'en' ? enUS : zhCN

  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>语言切换</Text>
        <Space wrap gap={8} style={styles.actions}>
          <Button
            text="中文"
            size="small"
            type={language === 'zh' ? 'primary' : 'default'}
            onPress={() => setLanguage('zh')}
          />
          <Button
            text="English"
            size="small"
            type={language === 'en' ? 'primary' : 'default'}
            onPress={() => setLanguage('en')}
          />
        </Space>
        <ConfigProvider locale={locale}>
          <LocaleViewer />
        </ConfigProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  actions: {
    marginBottom: 12,
    width: '100%',
  },
  localePreview: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f4f7ff',
  },
  localeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  localeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475467',
    marginRight: 6,
    minWidth: 56,
  },
  localeValue: {
    fontSize: 13,
    color: '#101828',
    flexShrink: 1,
  },
})
`}},title:"语言切换",identifier:"config-provider-locale",lang:"tsx",meta:{title:"语言切换"}},E={components:{button:{colors:{tones:{primary:{background:"#8a46ff",border:"#8a46ff",text:"#ffffff"}}}},slider:{track:{height:4},colors:{active:"#8a46ff",inactive:"#e5e8f0"},thumb:{size:22}}}},h=()=>{const[t,s]=m.useState(60),i=f=>{s(Array.isArray(f)?f[0]:f)};return e.jsx(y,{theme:E,children:e.jsxs(d,{direction:"vertical",gap:16,children:[e.jsxs(n,{style:a.card,children:[e.jsx(r,{style:a.title,children:"定制主题"}),e.jsxs(n,{style:[a.row,a.rowLast],children:[e.jsx(r,{style:a.label,children:"滑块"}),e.jsxs(n,{style:a.sliderControl,children:[e.jsx(S,{value:t,onChange:i,style:{flex:1}}),e.jsx(r,{style:a.value,children:t})]})]})]}),e.jsx(u,{text:"提交",type:"primary",block:!0,round:!0})]})})},a=c.create({card:{backgroundColor:"#ffffff",borderRadius:18,padding:20},title:{marginBottom:12,fontSize:14,fontWeight:"600",color:"#1d1f2c"},row:{flexDirection:"row",alignItems:"center",paddingVertical:8,borderBottomWidth:c.hairlineWidth,borderBottomColor:"#f0f2f6"},rowLast:{borderBottomWidth:0,paddingBottom:0},label:{fontSize:13,color:"#4a5465",minWidth:48,marginRight:16},sliderControl:{flex:1,flexDirection:"row",alignItems:"center",gap:12},value:{fontSize:12,color:"#475467",minWidth:28,textAlign:"right"}}),j=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Slider, Space } from 'react-native-system-ui'

const theme = {
  components: {
    button: {
      colors: {
        tones: {
          primary: {
            background: '#8a46ff',
            border: '#8a46ff',
            text: '#ffffff',
          },
        },
      }
    },
    slider: {
      track: {
        height: 4,
      },
      colors: {
        active: '#8a46ff',
        inactive: '#e5e8f0',
      },
      thumb: {
        size: 22,
      },
    },
  },
}

export default () => {
  const [progress, setProgress] = React.useState(60)

  const handleSliderChange = (value: number | [number, number]) => {
    setProgress(Array.isArray(value) ? value[0] : value)
  }

  return (
    <ConfigProvider theme={theme}>
      <Space direction="vertical" gap={16}>
        <View style={styles.card}>
          <Text style={styles.title}>定制主题</Text>

          <View style={[styles.row, styles.rowLast]}>
            <Text style={styles.label}>滑块</Text>
            <View style={styles.sliderControl}>
              <Slider value={progress} onChange={handleSliderChange} style={{ flex: 1 }} />
              <Text style={styles.value}>{progress}</Text>
            </View>
          </View>
        </View>

        <Button text="提交" type="primary" block round />
      </Space>
    </ConfigProvider>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f2f6',
  },
  rowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    fontSize: 13,
    color: '#4a5465',
    minWidth: 48,
    marginRight: 16,
  },
  sliderControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  value: {
    fontSize: 12,
    color: '#475467',
    minWidth: 28,
    textAlign: 'right',
  },
})
`,T={code:j,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Slider, Space } from 'react-native-system-ui'

const theme = {
  components: {
    button: {
      colors: {
        tones: {
          primary: {
            background: '#8a46ff',
            border: '#8a46ff',
            text: '#ffffff',
          },
        },
      }
    },
    slider: {
      track: {
        height: 4,
      },
      colors: {
        active: '#8a46ff',
        inactive: '#e5e8f0',
      },
      thumb: {
        size: 22,
      },
    },
  },
}

export default () => {
  const [progress, setProgress] = React.useState(60)

  const handleSliderChange = (value: number | [number, number]) => {
    setProgress(Array.isArray(value) ? value[0] : value)
  }

  return (
    <ConfigProvider theme={theme}>
      <Space direction="vertical" gap={16}>
        <View style={styles.card}>
          <Text style={styles.title}>定制主题</Text>

          <View style={[styles.row, styles.rowLast]}>
            <Text style={styles.label}>滑块</Text>
            <View style={styles.sliderControl}>
              <Slider value={progress} onChange={handleSliderChange} style={{ flex: 1 }} />
              <Text style={styles.value}>{progress}</Text>
            </View>
          </View>
        </View>

        <Button text="提交" type="primary" block round />
      </Space>
    </ConfigProvider>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f2f6',
  },
  rowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    fontSize: 13,
    color: '#4a5465',
    minWidth: 48,
    marginRight: 16,
  },
  sliderControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  value: {
    fontSize: 12,
    color: '#475467',
    minWidth: 28,
    textAlign: 'right',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Slider, Space } from 'react-native-system-ui'

const theme = {
  components: {
    button: {
      colors: {
        tones: {
          primary: {
            background: '#8a46ff',
            border: '#8a46ff',
            text: '#ffffff',
          },
        },
      }
    },
    slider: {
      track: {
        height: 4,
      },
      colors: {
        active: '#8a46ff',
        inactive: '#e5e8f0',
      },
      thumb: {
        size: 22,
      },
    },
  },
}

export default () => {
  const [progress, setProgress] = React.useState(60)

  const handleSliderChange = (value: number | [number, number]) => {
    setProgress(Array.isArray(value) ? value[0] : value)
  }

  return (
    <ConfigProvider theme={theme}>
      <Space direction="vertical" gap={16}>
        <View style={styles.card}>
          <Text style={styles.title}>定制主题</Text>

          <View style={[styles.row, styles.rowLast]}>
            <Text style={styles.label}>滑块</Text>
            <View style={styles.sliderControl}>
              <Slider value={progress} onChange={handleSliderChange} style={{ flex: 1 }} />
              <Text style={styles.value}>{progress}</Text>
            </View>
          </View>
        </View>

        <Button text="提交" type="primary" block round />
      </Space>
    </ConfigProvider>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f2f6',
  },
  rowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    fontSize: 13,
    color: '#4a5465',
    minWidth: 48,
    marginRight: 16,
  },
  sliderControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  value: {
    fontSize: 12,
    color: '#475467',
    minWidth: 28,
    textAlign: 'right',
  },
})
`}},title:"定制主题",identifier:"config-provider-theme",lang:"tsx",meta:{title:"定制主题"}},x=()=>e.jsx(n,{style:l.root,children:e.jsxs(n,{style:l.panel,children:[e.jsx(r,{style:l.title,children:"实例级 tokensOverride"}),e.jsxs(d,{direction:"vertical",gap:16,children:[e.jsx(u,{type:"primary",text:"自定义 Ripple",tokensOverride:{colors:{ripple:"rgba(255,255,255,0.25)"}}}),e.jsxs(d,{size:"normal",tokensOverride:{sizing:{presets:{normal:24}}},children:[e.jsx(u,{text:"Item A"}),e.jsx(u,{text:"Item B"})]}),e.jsx(n,{style:l.swiperBox,children:e.jsxs(C,{autoplay:!0,loop:!0,indicator:!0,style:l.swiper,indicatorProps:{tokensOverride:{colors:{active:"#ffffff",inactive:"rgba(255,255,255,0.35)"}}},children:[e.jsx(p,{children:e.jsx(n,{style:[l.swiperItem,{backgroundColor:"#8a46ff"}]})}),e.jsx(p,{children:e.jsx(n,{style:[l.swiperItem,{backgroundColor:"#16a34a"}]})}),e.jsx(p,{children:e.jsx(n,{style:[l.swiperItem,{backgroundColor:"#2563eb"}]})})]})})]})]})}),l=c.create({root:{width:"100%"},panel:{backgroundColor:"#ffffff",borderRadius:16,padding:16},title:{marginBottom:12,fontSize:14,fontWeight:"600",color:"#1d1f2c"},swiperBox:{borderRadius:16,overflow:"hidden"},swiper:{height:120,width:"100%"},swiperItem:{flex:1}}),P=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Space, Swiper, SwiperItem } from 'react-native-system-ui'

export default () => {
  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>实例级 tokensOverride</Text>

        <Space direction="vertical" gap={16}>
          <Button
            type="primary"
            text="自定义 Ripple"
            tokensOverride={{
              colors: {
                ripple: 'rgba(255,255,255,0.25)',
              },
            }}
          />

          <Space
            size="normal"
            tokensOverride={{
              sizing: {
                presets: {
                  normal: 24,
                },
              }
            }}
          >
            <Button text="Item A" />
            <Button text="Item B" />
          </Space>

          <View style={styles.swiperBox}>
            <Swiper
              autoplay
              loop
              indicator
              style={styles.swiper}
              indicatorProps={{
                tokensOverride: {
                  colors: {
                    active: '#ffffff',
                    inactive: 'rgba(255,255,255,0.35)',
                  },
                },
              }}
            >
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#8a46ff' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#16a34a' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#2563eb' }]} />
              </SwiperItem>
            </Swiper>
          </View>
        </Space>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  swiperBox: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  swiper: {
    height: 120,
    width: '100%',
  },
  swiperItem: {
    flex: 1,
  },
})
`,k={code:P,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Space, Swiper, SwiperItem } from 'react-native-system-ui'

export default () => {
  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>实例级 tokensOverride</Text>

        <Space direction="vertical" gap={16}>
          <Button
            type="primary"
            text="自定义 Ripple"
            tokensOverride={{
              colors: {
                ripple: 'rgba(255,255,255,0.25)',
              },
            }}
          />

          <Space
            size="normal"
            tokensOverride={{
              sizing: {
                presets: {
                  normal: 24,
                },
              }
            }}
          >
            <Button text="Item A" />
            <Button text="Item B" />
          </Space>

          <View style={styles.swiperBox}>
            <Swiper
              autoplay
              loop
              indicator
              style={styles.swiper}
              indicatorProps={{
                tokensOverride: {
                  colors: {
                    active: '#ffffff',
                    inactive: 'rgba(255,255,255,0.35)',
                  },
                },
              }}
            >
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#8a46ff' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#16a34a' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#2563eb' }]} />
              </SwiperItem>
            </Swiper>
          </View>
        </Space>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  swiperBox: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  swiper: {
    height: 120,
    width: '100%',
  },
  swiperItem: {
    flex: 1,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Space, Swiper, SwiperItem } from 'react-native-system-ui'

export default () => {
  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>实例级 tokensOverride</Text>

        <Space direction="vertical" gap={16}>
          <Button
            type="primary"
            text="自定义 Ripple"
            tokensOverride={{
              colors: {
                ripple: 'rgba(255,255,255,0.25)',
              },
            }}
          />

          <Space
            size="normal"
            tokensOverride={{
              sizing: {
                presets: {
                  normal: 24,
                },
              }
            }}
          >
            <Button text="Item A" />
            <Button text="Item B" />
          </Space>

          <View style={styles.swiperBox}>
            <Swiper
              autoplay
              loop
              indicator
              style={styles.swiper}
              indicatorProps={{
                tokensOverride: {
                  colors: {
                    active: '#ffffff',
                    inactive: 'rgba(255,255,255,0.35)',
                  },
                },
              }}
            >
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#8a46ff' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#16a34a' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#2563eb' }]} />
              </SwiperItem>
            </Swiper>
          </View>
        </Space>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  swiperBox: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  swiper: {
    height: 120,
    width: '100%',
  },
  swiperItem: {
    flex: 1,
  },
})
`}},title:"实例级 tokensOverride",identifier:"config-provider-tokens-override",lang:"tsx",meta:{title:"实例级 tokensOverride"}},R=function({previewer:t=()=>null,api:s=()=>null}){const i=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"configprovider-全局配置","data-anchor":"configprovider-全局配置",children:"ConfigProvider 全局配置"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"为组件提供统一的全局配置（主题 / 语言）。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { ConfigProvider } from 'react-native-system-ui'",lang:"js"}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"ConfigProvider"})," 内部会自动包裹 ",e.jsx("code",{children:"ThemeProvider"})," 与 ",e.jsx("code",{children:"PortalHost"}),"，作为主题与弹层能力的统一出口（使用 ",e.jsx("code",{children:"Popup"}),"/",e.jsx("code",{children:"Toast"}),"/",e.jsx("code",{children:"Dialog"})," 等无需再额外渲染 ",e.jsx("code",{children:"PortalHost"}),"）。"]})}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"语言切换","data-anchor":"语言切换",children:"语言切换"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"locale"})," 属性切换语言。"]}),e.jsx("div",{children:e.jsx(i,{...F,children:e.jsx(g,{})})}),e.jsx("h3",{id:"定制主题","data-anchor":"定制主题",children:"定制主题"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"theme"})," 属性覆盖设计 tokens，进而自定义组件主题。"]}),e.jsx("div",{children:e.jsx(i,{...T,children:e.jsx(h,{})})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["如果仅需要快速切换预设，可直接传入 ",e.jsx("code",{children:"themePresets.dark"}),"、",e.jsx("code",{children:"themePresets.aurora"})," 等对象，无需手动创建 tokens。"]})}),e.jsx("h3",{id:"实例级-tokensoverride按组件覆盖","data-anchor":"实例级-tokensoverride按组件覆盖",children:"实例级 tokensOverride（按组件覆盖）"}),e.jsxs("p",{children:["除了通过 ",e.jsx("code",{children:"ConfigProvider.theme"})," 做全局主题定制之外，本库的大部分组件还支持在组件实例上直接传入 ",e.jsx("code",{children:"tokensOverride"}),"，用来做“这一处”样式/尺寸等 tokens 的局部覆盖。"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["生效优先级：组件默认 tokens < ",e.jsx("code",{children:"ConfigProvider.theme.components"}),"（全局组件 tokens）< 组件 ",e.jsx("code",{children:"tokensOverride"}),"（实例覆盖）"]}),e.jsxs("li",{children:["类型：",e.jsx("code",{children:"tokensOverride"})," 的类型为 ",e.jsx("code",{children:"DeepPartial<该组件对应的 Tokens>"}),"，只需要填你要改的字段即可（TS 会自动提示）"]})]}),e.jsx("div",{children:e.jsx(i,{...k,children:e.jsx(x,{})})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["注意：少数组件是“组合封装”形式，可能会提供多个覆盖入口。例如 ",e.jsx("code",{children:"Input"})," 同时提供 ",e.jsx("code",{children:"tokensOverride"}),"（影响 Input 外层样式）与 ",e.jsx("code",{children:"fieldTokensOverride"}),"（影响内部 Field 的 tokens）。"]})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"theme"})}),e.jsxs("td",{children:["主题配置，等同于 ",e.jsx("code",{children:"ThemeProvider"})," 的 ",e.jsx("code",{children:"value"})]}),e.jsx("td",{children:e.jsx("code",{children:"ThemeProviderValue"})}),e.jsx("td",{children:e.jsx("code",{children:"undefined"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"locale"})}),e.jsxs("td",{children:["语言包（可与 ",e.jsx("code",{children:"zhCN"}),"、",e.jsx("code",{children:"enUS"})," merge）"]}),e.jsx("td",{children:e.jsx("code",{children:"Locale"})}),e.jsx("td",{children:e.jsx("code",{children:"zhCN"})})]})]})]}),e.jsx("h3",{id:"类型定义","data-anchor":"类型定义",children:"类型定义"}),e.jsx(i,{code:"import { ConfigProvider, zhCN, enUS, useLocale } from 'react-native-system-ui'",lang:"ts"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["React Native 环境不存在 ",e.jsx("code",{children:"tag"}),"、",e.jsx("code",{children:"prefers-color-scheme"})," 等 DOM 能力，如需深度主题切换，可结合 ",e.jsx("code",{children:"ConfigProvider"})," + ",e.jsx("code",{children:"ThemeProvider"})," 自行注入 tokens。"]})}),e.jsx("h2",{id:"差异说明","data-anchor":"差异说明",children:"差异说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["React Vant 通过 ",e.jsx("code",{children:"themeVars"})," 覆盖 CSS 变量实现主题定制；本库以设计 tokens（",e.jsx("code",{children:"theme"}),"）驱动样式，适配 React Native 的跨端渲染模型。"]}),e.jsxs("li",{children:["React Vant 支持 ",e.jsx("code",{children:"tag"})," 指定根节点标签；本库在 React Native 环境不支持对应 DOM 能力。"]}),e.jsxs("li",{children:["本库在 ",e.jsx("code",{children:"ConfigProvider"})," 内置 ",e.jsx("code",{children:"PortalHost"}),"，保证弹层组件有统一的渲染出口。"]})]})]})})},z=[{Component:g,key:"config-provider-locale",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Space, enUS, useLocale, zhCN } from 'react-native-system-ui'

const LocaleViewer = () => {
  const locale = useLocale()
  return (
    <View style={styles.localePreview}>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Loading</Text>
        <Text style={styles.localeValue}>{locale.loading}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Confirm</Text>
        <Text style={styles.localeValue}>{locale.confirm}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Cancel</Text>
        <Text style={styles.localeValue}>{locale.cancel}</Text>
      </View>
    </View>
  )
}

export default () => {
  const [language, setLanguage] = React.useState<'zh' | 'en'>('en')
  const locale = language === 'en' ? enUS : zhCN

  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>语言切换</Text>
        <Space wrap gap={8} style={styles.actions}>
          <Button
            text="中文"
            size="small"
            type={language === 'zh' ? 'primary' : 'default'}
            onPress={() => setLanguage('zh')}
          />
          <Button
            text="English"
            size="small"
            type={language === 'en' ? 'primary' : 'default'}
            onPress={() => setLanguage('en')}
          />
        </Space>
        <ConfigProvider locale={locale}>
          <LocaleViewer />
        </ConfigProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  actions: {
    marginBottom: 12,
    width: '100%',
  },
  localePreview: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f4f7ff',
  },
  localeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  localeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475467',
    marginRight: 6,
    minWidth: 56,
  },
  localeValue: {
    fontSize: 13,
    color: '#101828',
    flexShrink: 1,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Space, enUS, useLocale, zhCN } from 'react-native-system-ui'

const LocaleViewer = () => {
  const locale = useLocale()
  return (
    <View style={styles.localePreview}>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Loading</Text>
        <Text style={styles.localeValue}>{locale.loading}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Confirm</Text>
        <Text style={styles.localeValue}>{locale.confirm}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Cancel</Text>
        <Text style={styles.localeValue}>{locale.cancel}</Text>
      </View>
    </View>
  )
}

export default () => {
  const [language, setLanguage] = React.useState<'zh' | 'en'>('en')
  const locale = language === 'en' ? enUS : zhCN

  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>语言切换</Text>
        <Space wrap gap={8} style={styles.actions}>
          <Button
            text="中文"
            size="small"
            type={language === 'zh' ? 'primary' : 'default'}
            onPress={() => setLanguage('zh')}
          />
          <Button
            text="English"
            size="small"
            type={language === 'en' ? 'primary' : 'default'}
            onPress={() => setLanguage('en')}
          />
        </Space>
        <ConfigProvider locale={locale}>
          <LocaleViewer />
        </ConfigProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  actions: {
    marginBottom: 12,
    width: '100%',
  },
  localePreview: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f4f7ff',
  },
  localeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  localeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475467',
    marginRight: 6,
    minWidth: 56,
  },
  localeValue: {
    fontSize: 13,
    color: '#101828',
    flexShrink: 1,
  },
})
`}},title:"语言切换",identifier:"config-provider-locale",lang:"tsx",meta:{title:"语言切换"}},{Component:h,key:"config-provider-theme",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Slider, Space } from 'react-native-system-ui'

const theme = {
  components: {
    button: {
      colors: {
        tones: {
          primary: {
            background: '#8a46ff',
            border: '#8a46ff',
            text: '#ffffff',
          },
        },
      }
    },
    slider: {
      track: {
        height: 4,
      },
      colors: {
        active: '#8a46ff',
        inactive: '#e5e8f0',
      },
      thumb: {
        size: 22,
      },
    },
  },
}

export default () => {
  const [progress, setProgress] = React.useState(60)

  const handleSliderChange = (value: number | [number, number]) => {
    setProgress(Array.isArray(value) ? value[0] : value)
  }

  return (
    <ConfigProvider theme={theme}>
      <Space direction="vertical" gap={16}>
        <View style={styles.card}>
          <Text style={styles.title}>定制主题</Text>

          <View style={[styles.row, styles.rowLast]}>
            <Text style={styles.label}>滑块</Text>
            <View style={styles.sliderControl}>
              <Slider value={progress} onChange={handleSliderChange} style={{ flex: 1 }} />
              <Text style={styles.value}>{progress}</Text>
            </View>
          </View>
        </View>

        <Button text="提交" type="primary" block round />
      </Space>
    </ConfigProvider>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f2f6',
  },
  rowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    fontSize: 13,
    color: '#4a5465',
    minWidth: 48,
    marginRight: 16,
  },
  sliderControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  value: {
    fontSize: 12,
    color: '#475467',
    minWidth: 28,
    textAlign: 'right',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Slider, Space } from 'react-native-system-ui'

const theme = {
  components: {
    button: {
      colors: {
        tones: {
          primary: {
            background: '#8a46ff',
            border: '#8a46ff',
            text: '#ffffff',
          },
        },
      }
    },
    slider: {
      track: {
        height: 4,
      },
      colors: {
        active: '#8a46ff',
        inactive: '#e5e8f0',
      },
      thumb: {
        size: 22,
      },
    },
  },
}

export default () => {
  const [progress, setProgress] = React.useState(60)

  const handleSliderChange = (value: number | [number, number]) => {
    setProgress(Array.isArray(value) ? value[0] : value)
  }

  return (
    <ConfigProvider theme={theme}>
      <Space direction="vertical" gap={16}>
        <View style={styles.card}>
          <Text style={styles.title}>定制主题</Text>

          <View style={[styles.row, styles.rowLast]}>
            <Text style={styles.label}>滑块</Text>
            <View style={styles.sliderControl}>
              <Slider value={progress} onChange={handleSliderChange} style={{ flex: 1 }} />
              <Text style={styles.value}>{progress}</Text>
            </View>
          </View>
        </View>

        <Button text="提交" type="primary" block round />
      </Space>
    </ConfigProvider>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f2f6',
  },
  rowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    fontSize: 13,
    color: '#4a5465',
    minWidth: 48,
    marginRight: 16,
  },
  sliderControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  value: {
    fontSize: 12,
    color: '#475467',
    minWidth: 28,
    textAlign: 'right',
  },
})
`}},title:"定制主题",identifier:"config-provider-theme",lang:"tsx",meta:{title:"定制主题"}},{Component:x,key:"config-provider-tokens-override",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Space, Swiper, SwiperItem } from 'react-native-system-ui'

export default () => {
  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>实例级 tokensOverride</Text>

        <Space direction="vertical" gap={16}>
          <Button
            type="primary"
            text="自定义 Ripple"
            tokensOverride={{
              colors: {
                ripple: 'rgba(255,255,255,0.25)',
              },
            }}
          />

          <Space
            size="normal"
            tokensOverride={{
              sizing: {
                presets: {
                  normal: 24,
                },
              }
            }}
          >
            <Button text="Item A" />
            <Button text="Item B" />
          </Space>

          <View style={styles.swiperBox}>
            <Swiper
              autoplay
              loop
              indicator
              style={styles.swiper}
              indicatorProps={{
                tokensOverride: {
                  colors: {
                    active: '#ffffff',
                    inactive: 'rgba(255,255,255,0.35)',
                  },
                },
              }}
            >
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#8a46ff' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#16a34a' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#2563eb' }]} />
              </SwiperItem>
            </Swiper>
          </View>
        </Space>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  swiperBox: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  swiper: {
    height: 120,
    width: '100%',
  },
  swiperItem: {
    flex: 1,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Space, Swiper, SwiperItem } from 'react-native-system-ui'

export default () => {
  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>实例级 tokensOverride</Text>

        <Space direction="vertical" gap={16}>
          <Button
            type="primary"
            text="自定义 Ripple"
            tokensOverride={{
              colors: {
                ripple: 'rgba(255,255,255,0.25)',
              },
            }}
          />

          <Space
            size="normal"
            tokensOverride={{
              sizing: {
                presets: {
                  normal: 24,
                },
              }
            }}
          >
            <Button text="Item A" />
            <Button text="Item B" />
          </Space>

          <View style={styles.swiperBox}>
            <Swiper
              autoplay
              loop
              indicator
              style={styles.swiper}
              indicatorProps={{
                tokensOverride: {
                  colors: {
                    active: '#ffffff',
                    inactive: 'rgba(255,255,255,0.35)',
                  },
                },
              }}
            >
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#8a46ff' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#16a34a' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#2563eb' }]} />
              </SwiperItem>
            </Swiper>
          </View>
        </Space>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  swiperBox: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  swiper: {
    height: 120,
    width: '100%',
  },
  swiperItem: {
    flex: 1,
  },
})
`}},title:"实例级 tokensOverride",identifier:"config-provider-tokens-override",lang:"tsx",meta:{title:"实例级 tokensOverride"}}],I={simulator:{compact:!0}},A=[{depth:1,text:"ConfigProvider 全局配置",id:"configprovider-全局配置"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"语言切换",id:"语言切换"},{depth:3,text:"定制主题",id:"定制主题"},{depth:3,text:"实例级 tokensOverride（按组件覆盖）",id:"实例级-tokensoverride按组件覆盖"},{depth:2,text:"API",id:"api"},{depth:3,text:"类型定义",id:"类型定义"},{depth:2,text:"差异说明",id:"差异说明"}],L="/docs/components/config-provider.md",D="ConfigProvider 全局配置",W="1767692458000",re=t=>t.children({MdContent:R,demos:z,frontmatter:I,slugs:A,filePath:L,title:D,updatedTime:W});export{R as MdContent,re as default,z as demos,L as filePath,I as frontmatter,A as slugs,D as title,W as updatedTime};
