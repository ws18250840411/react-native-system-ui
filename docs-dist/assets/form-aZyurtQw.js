import{j as e,V as c,R as F}from"./main-CX5QgiXt.js";import{F as r}from"./index-BHhMpEYB.js";import{F as a}from"./Field-D9GqoDnQ.js";import{B as m}from"./index-B1BD4WKR.js";import{T as d}from"./index-BUHqkOou.js";import{C as p}from"./index-D361XNui.js";import{S as N}from"./Switch-DueD5EjM.js";import{S as z}from"./Stepper-CP7nwkVM.js";import{S as A}from"./Slider-86JKHzhb.js";import{R as b}from"./index-D04_eqy9.js";import{C as f}from"./index-CzaTCRjW.js";import{S as C}from"./Space-Cp0dJ6Ia.js";import{S as O}from"./AddO-Cw8bSrK5.js";import{T as M}from"./createComponentTokensHook-Hc3l7riF.js";import{P as j}from"./Popup-DLZFaqRn.js";import{P as V}from"./Picker-C-bovegc.js";import{D as H}from"./DatetimePicker-CrQdBQ1o.js";import{C as _}from"./Calendar-Cg8-8G06.js";import{S as L}from"./Selector-TCQqZY7r.js";import"./promise-Qds5Ah4Z.js";import"./compare-B0QhPEQa.js";import"./IconBase-D_kjvpJY.js";import"./index-D5gHWa6o.js";import"./useLocale-CcH7XcZU.js";import"./hairline-6DGjxZ3L.js";import"./Close-D6NXA1XS.js";import"./Animated-rPtBS5kg.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-BEnr4R_B.js";import"./index-CTcRCRb2.js";import"./index-BDzwQtXM.js";import"./index-CQ2P49YQ.js";import"./index-quLIWFrm.js";import"./animation-BpxpeSKC.js";import"./Portal-BtmwX5Pt.js";import"./Overlay-uC1_KEGM.js";import"./index-yde5mSE_.js";import"./color-Cjzk_5VY.js";import"./number-DMCxwktP.js";import"./createPlatformShadow-BbOkyb5V.js";import"./useAriaPress-sIRcrStb.js";import"./Loading-Dy4Xe7Yb.js";import"./Checked-C5Dq4Yeg.js";import"./index-4qDXDIEs.js";import"./SafeAreaView-DiARkPwI.js";import"./useSafeAreaPadding-Du1CT4G_.js";import"./useOverlayStack-CF7tueuh.js";import"./Arrow-CFMZgj_G.js";import"./useControllableValue-wnptCJgI.js";import"./useLabel-DPV7AKHL.js";import"./useFormValidationState-CwUf-lJH.js";import"./date-DjZXGQxL.js";const R=()=>{const t=r.useForm();return e.jsxs(r,{ref:t,onFinish:l=>d.info(JSON.stringify(l)),style:{paddingHorizontal:12},footer:e.jsx(m,{round:!0,block:!0,type:"primary",text:"提交",onPress:()=>t.current?.submit(),style:{marginTop:12}}),children:[e.jsx(r.Item,{name:"username",label:"用户名",rules:[{required:!0,message:"请填写用户名"}],children:e.jsx(a,{placeholder:"请输入用户名",clearable:!0})}),e.jsx(r.Item,{name:"password",label:"密码",rules:[{required:!0,message:"请填写密码"}],children:e.jsx(a,{placeholder:"请输入密码",type:"password",border:!1})})]})},J=`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请填写用户名' }]}>
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请填写密码' }]}>
        <Field placeholder="请输入密码" type="password" border={false} />
      </Form.Item>
    </Form>
  )
}
`,W={code:J,sources:{_:{tsx:`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请填写用户名' }]}>
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请填写密码' }]}>
        <Field placeholder="请输入密码" type="password" border={false} />
      </Form.Item>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请填写用户名' }]}>
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请填写密码' }]}>
        <Field placeholder="请输入密码" type="password" border={false} />
      </Form.Item>
    </Form>
  )
}
`}},title:"基础用法",identifier:"form-basic",lang:"tsx",meta:{title:"基础用法"}},I=()=>{const t=r.useForm(),l=async n=>(d.info({message:"验证中...",duration:800}),await new Promise(o=>setTimeout(o,800)),/^\d{6}$/.test(n??"")?!0:"请输入正确内容");return e.jsxs(r,{ref:t,onFinish:n=>d.info(JSON.stringify(n)),style:{paddingHorizontal:12},footer:e.jsx(m,{round:!0,block:!0,type:"primary",text:"提交",onPress:()=>t.current?.submit(),style:{marginTop:12}}),children:[e.jsx(r.Item,{name:"pattern",label:"正则校验",rules:[{pattern:/^\d{6}$/,message:"请输入 6 位数字"}],children:e.jsx(a,{placeholder:"请输入 6 位数字",clearable:!0})}),e.jsx(r.Item,{name:"validator",label:"函数校验",rules:[{validator:n=>/^1\d{10}$/.test(n??"")?!0:"请输入正确的手机号码"}],children:e.jsx(a,{placeholder:"请输入手机号",clearable:!0})}),e.jsx(r.Item,{name:"async",label:"异步校验",validateTrigger:"onBlur",rules:[{validateTrigger:"onBlur",validator:l}],children:e.jsx(a,{placeholder:"请输入 6 位数字",border:!1})})]})},$=`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  const asyncValidator = async (value?: string) => {
    Toast.info({ message: '验证中...', duration: 800 })
    await new Promise(resolve => setTimeout(resolve, 800))
    return /^\\d{6}$/.test(value ?? '') ? true : '请输入正确内容'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="pattern" label="正则校验" rules={[{ pattern: /^\\d{6}$/, message: '请输入 6 位数字' }]}>
        <Field placeholder="请输入 6 位数字" clearable />
      </Form.Item>

      <Form.Item
        name="validator"
        label="函数校验"
        rules={[{
          validator: value => (/^1\\d{10}$/.test(value ?? '') ? true : '请输入正确的手机号码'),
        }]}
      >
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Form.Item
        name="async"
        label="异步校验"
        validateTrigger="onBlur"
        rules={[{
          validateTrigger: 'onBlur',
          validator: asyncValidator,
        }]}
      >
        <Field placeholder="请输入 6 位数字" border={false} />
      </Form.Item>
    </Form>
  )
}
`,q={code:$,sources:{_:{tsx:`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  const asyncValidator = async (value?: string) => {
    Toast.info({ message: '验证中...', duration: 800 })
    await new Promise(resolve => setTimeout(resolve, 800))
    return /^\\d{6}$/.test(value ?? '') ? true : '请输入正确内容'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="pattern" label="正则校验" rules={[{ pattern: /^\\d{6}$/, message: '请输入 6 位数字' }]}>
        <Field placeholder="请输入 6 位数字" clearable />
      </Form.Item>

      <Form.Item
        name="validator"
        label="函数校验"
        rules={[{
          validator: value => (/^1\\d{10}$/.test(value ?? '') ? true : '请输入正确的手机号码'),
        }]}
      >
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Form.Item
        name="async"
        label="异步校验"
        validateTrigger="onBlur"
        rules={[{
          validateTrigger: 'onBlur',
          validator: asyncValidator,
        }]}
      >
        <Field placeholder="请输入 6 位数字" border={false} />
      </Form.Item>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  const asyncValidator = async (value?: string) => {
    Toast.info({ message: '验证中...', duration: 800 })
    await new Promise(resolve => setTimeout(resolve, 800))
    return /^\\d{6}$/.test(value ?? '') ? true : '请输入正确内容'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="pattern" label="正则校验" rules={[{ pattern: /^\\d{6}$/, message: '请输入 6 位数字' }]}>
        <Field placeholder="请输入 6 位数字" clearable />
      </Form.Item>

      <Form.Item
        name="validator"
        label="函数校验"
        rules={[{
          validator: value => (/^1\\d{10}$/.test(value ?? '') ? true : '请输入正确的手机号码'),
        }]}
      >
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Form.Item
        name="async"
        label="异步校验"
        validateTrigger="onBlur"
        rules={[{
          validateTrigger: 'onBlur',
          validator: asyncValidator,
        }]}
      >
        <Field placeholder="请输入 6 位数字" border={false} />
      </Form.Item>
    </Form>
  )
}
`}},title:"校验规则",identifier:"form-rules",lang:"tsx",meta:{title:"校验规则"}};function k(){const t=r.useForm();return e.jsxs(r,{ref:t,style:{paddingHorizontal:12},initialValues:{switch:!0,checkbox:!0,checkbox_group:["a","b"],radio:"a",slider:25,stepper:1},onFinish:l=>d.info(JSON.stringify(l)),footer:e.jsx(m,{round:!0,block:!0,type:"primary",text:"提交",onPress:()=>t.current?.submit(),style:{marginTop:12}}),children:[e.jsxs(c,{children:[e.jsx(p,{title:"开关",style:{paddingHorizontal:0,backgroundColor:"transparent"},children:e.jsx(r.Item,{name:"switch",valuePropName:"checked",trigger:"onChange",children:e.jsx(N,{size:24})})}),e.jsx(p,{title:"步进器",style:{paddingHorizontal:0,backgroundColor:"transparent"},children:e.jsx(r.Item,{name:"stepper",valuePropName:"value",trigger:"onChange",children:e.jsx(z,{})})}),e.jsx(p,{title:"滑块",border:!1,style:{paddingHorizontal:0,backgroundColor:"transparent"},children:e.jsx(r.Item,{name:"slider",valuePropName:"value",trigger:"onChange",children:e.jsx(A,{style:{width:200}})})})]}),e.jsxs(c,{children:[e.jsx(p,{title:"复选框",style:{paddingHorizontal:0,backgroundColor:"transparent"},children:e.jsx(r.Item,{name:"checkbox",valuePropName:"checked",trigger:"onChange",children:e.jsx(f,{shape:"square",children:"复选框"})})}),e.jsx(p,{title:"复选框组",style:{paddingHorizontal:0,backgroundColor:"transparent"},children:e.jsx(r.Item,{name:"checkbox_group",valuePropName:"value",trigger:"onChange",children:e.jsx(f.Group,{direction:"horizontal",children:e.jsxs(C,{gap:12,children:[e.jsx(f,{shape:"square",name:"a",children:"复选框a"}),e.jsx(f,{shape:"square",name:"b",children:"复选框b"})]})})})}),e.jsx(p,{title:"单选框",border:!1,style:{paddingHorizontal:0,backgroundColor:"transparent"},children:e.jsx(r.Item,{name:"radio",valuePropName:"value",trigger:"onChange",children:e.jsx(b.Group,{direction:"horizontal",children:e.jsxs(C,{gap:12,children:[e.jsx(b,{name:"a",children:"单选框a"}),e.jsx(b,{name:"b",children:"单选框b"})]})})})})]}),e.jsx(c,{children:e.jsx(r.Item,{name:"textarea",label:"详细地址",children:e.jsx(a,{placeholder:"请输入详细地址",type:"textarea",rows:3,showWordLimit:!0,maxLength:140,border:!1,style:{paddingHorizontal:0}})})})]})}const G=`import React from 'react'
import { View, Text } from 'react-native'

import {
  Button,
  Cell,
  Checkbox,
  Field,
  Form,
  Radio,
  Slider,
  Space,
  Stepper,
  Switch,
  Toast,
} from 'react-native-system-ui'

const GroupTitle = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 14,
      color: '#969799',
      paddingVertical: 12,
      lineHeight: 16,
    }}
  >
    {title}
  </Text>
)

export default function FormTypeDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      style={{ paddingHorizontal: 12 }}
      initialValues={{
        switch: true,
        checkbox: true,
        checkbox_group: ['a', 'b'],
        radio: 'a',
        slider: 25,
        stepper: 1,
      }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <View>
        <Cell title="开关" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="switch" valuePropName="checked" trigger="onChange">
            <Switch size={24} />
          </Form.Item>
        </Cell>

        <Cell title="步进器" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="stepper" valuePropName="value" trigger="onChange">
            <Stepper />
          </Form.Item>
        </Cell>

        <Cell title="滑块" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="slider" valuePropName="value" trigger="onChange">
            <Slider style={{ width: 200 }} />
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Cell title="复选框" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox" valuePropName="checked" trigger="onChange">
            <Checkbox shape="square">复选框</Checkbox>
          </Form.Item>
        </Cell>

        <Cell title="复选框组" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox_group" valuePropName="value" trigger="onChange">
            <Checkbox.Group direction="horizontal">
              <Space gap={12}>
                <Checkbox shape="square" name="a">复选框a</Checkbox>
                <Checkbox shape="square" name="b">复选框b</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Cell>

        <Cell title="单选框" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="radio" valuePropName="value" trigger="onChange">
            <Radio.Group direction="horizontal">
              <Space gap={12}>
                <Radio name="a">单选框a</Radio>
                <Radio name="b">单选框b</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Form.Item name="textarea" label="详细地址">
          <Field
            placeholder="请输入详细地址"
            type="textarea"
            rows={3}
            showWordLimit
            maxLength={140}
            border={false}
            style={{ paddingHorizontal: 0 }}
          />
        </Form.Item>
      </View>
    </Form>
  )
}
`,U={code:G,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'

import {
  Button,
  Cell,
  Checkbox,
  Field,
  Form,
  Radio,
  Slider,
  Space,
  Stepper,
  Switch,
  Toast,
} from 'react-native-system-ui'

const GroupTitle = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 14,
      color: '#969799',
      paddingVertical: 12,
      lineHeight: 16,
    }}
  >
    {title}
  </Text>
)

export default function FormTypeDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      style={{ paddingHorizontal: 12 }}
      initialValues={{
        switch: true,
        checkbox: true,
        checkbox_group: ['a', 'b'],
        radio: 'a',
        slider: 25,
        stepper: 1,
      }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <View>
        <Cell title="开关" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="switch" valuePropName="checked" trigger="onChange">
            <Switch size={24} />
          </Form.Item>
        </Cell>

        <Cell title="步进器" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="stepper" valuePropName="value" trigger="onChange">
            <Stepper />
          </Form.Item>
        </Cell>

        <Cell title="滑块" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="slider" valuePropName="value" trigger="onChange">
            <Slider style={{ width: 200 }} />
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Cell title="复选框" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox" valuePropName="checked" trigger="onChange">
            <Checkbox shape="square">复选框</Checkbox>
          </Form.Item>
        </Cell>

        <Cell title="复选框组" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox_group" valuePropName="value" trigger="onChange">
            <Checkbox.Group direction="horizontal">
              <Space gap={12}>
                <Checkbox shape="square" name="a">复选框a</Checkbox>
                <Checkbox shape="square" name="b">复选框b</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Cell>

        <Cell title="单选框" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="radio" valuePropName="value" trigger="onChange">
            <Radio.Group direction="horizontal">
              <Space gap={12}>
                <Radio name="a">单选框a</Radio>
                <Radio name="b">单选框b</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Form.Item name="textarea" label="详细地址">
          <Field
            placeholder="请输入详细地址"
            type="textarea"
            rows={3}
            showWordLimit
            maxLength={140}
            border={false}
            style={{ paddingHorizontal: 0 }}
          />
        </Form.Item>
      </View>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text } from 'react-native'

import {
  Button,
  Cell,
  Checkbox,
  Field,
  Form,
  Radio,
  Slider,
  Space,
  Stepper,
  Switch,
  Toast,
} from 'react-native-system-ui'

const GroupTitle = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 14,
      color: '#969799',
      paddingVertical: 12,
      lineHeight: 16,
    }}
  >
    {title}
  </Text>
)

export default function FormTypeDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      style={{ paddingHorizontal: 12 }}
      initialValues={{
        switch: true,
        checkbox: true,
        checkbox_group: ['a', 'b'],
        radio: 'a',
        slider: 25,
        stepper: 1,
      }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <View>
        <Cell title="开关" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="switch" valuePropName="checked" trigger="onChange">
            <Switch size={24} />
          </Form.Item>
        </Cell>

        <Cell title="步进器" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="stepper" valuePropName="value" trigger="onChange">
            <Stepper />
          </Form.Item>
        </Cell>

        <Cell title="滑块" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="slider" valuePropName="value" trigger="onChange">
            <Slider style={{ width: 200 }} />
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Cell title="复选框" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox" valuePropName="checked" trigger="onChange">
            <Checkbox shape="square">复选框</Checkbox>
          </Form.Item>
        </Cell>

        <Cell title="复选框组" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox_group" valuePropName="value" trigger="onChange">
            <Checkbox.Group direction="horizontal">
              <Space gap={12}>
                <Checkbox shape="square" name="a">复选框a</Checkbox>
                <Checkbox shape="square" name="b">复选框b</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Cell>

        <Cell title="单选框" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="radio" valuePropName="value" trigger="onChange">
            <Radio.Group direction="horizontal">
              <Space gap={12}>
                <Radio name="a">单选框a</Radio>
                <Radio name="b">单选框b</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Form.Item name="textarea" label="详细地址">
          <Field
            placeholder="请输入详细地址"
            type="textarea"
            rows={3}
            showWordLimit
            maxLength={140}
            border={false}
            style={{ paddingHorizontal: 0 }}
          />
        </Form.Item>
      </View>
    </Form>
  )
}
`}},title:"表单项类型",identifier:"form-type",lang:"tsx",meta:{title:"表单项类型"}};function P(){const t=r.useForm();return e.jsx(r,{ref:t,initialValues:{users:[{name:"",age:""}]},onFinish:l=>d.info(JSON.stringify(l)),style:{paddingHorizontal:12},footer:e.jsx(m,{round:!0,block:!0,type:"primary",text:"提交",onPress:()=>t.current?.submit(),style:{marginTop:12}}),children:e.jsx(r.List,{name:"users",children:(l,{add:n,remove:o})=>e.jsxs(e.Fragment,{children:[l.map((i,s)=>e.jsxs(c,{style:{marginBottom:24},children:[e.jsxs(M,{style:{fontSize:14,color:"#969799",paddingVertical:12,lineHeight:16},children:["用户 ",s+1]}),e.jsx(r.Item,{name:[i.name,"name"],children:e.jsx(a,{label:"姓名",placeholder:"请输入姓名",clearable:!0})}),e.jsx(r.Item,{name:[i.name,"age"],children:e.jsx(a,{label:"年龄",placeholder:"请输入年龄",clearable:!0})}),e.jsx(m,{size:"small",type:"danger",text:"删除",onPress:()=>o(s),style:{marginTop:8}})]},i.key)),e.jsx(m,{plain:!0,block:!0,icon:e.jsx(O,{size:16}),text:"新增用户",onPress:()=>n({name:"",age:""})})]})})})}const K=`import React from 'react'
import { View, Text } from 'react-native'

import { AddO } from 'react-native-system-icon'
import { Button, Form, Field, Toast } from 'react-native-system-ui'

export default function FormListDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ users: [{ name: '', age: '' }] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, idx) => (
              <View key={field.key} style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#969799',
                    paddingVertical: 12,
                    lineHeight: 16,
                  }}
                >
                  用户 {idx + 1}
                </Text>
                <Form.Item name={[field.name, 'name']}>
                  <Field label="姓名" placeholder="请输入姓名" clearable />
                </Form.Item>
                <Form.Item name={[field.name, 'age']}>
                  <Field label="年龄" placeholder="请输入年龄" clearable />
                </Form.Item>
                <Button
                  size="small"
                  type="danger"
                  text="删除"
                  onPress={() => remove(idx)}
                  style={{ marginTop: 8 }}
                />
              </View>
            ))}
            <Button
              plain
              block
              icon={<AddO size={16} />}
              text="新增用户"
              onPress={() => add({ name: '', age: '' })}
            />
          </>
        )}
      </Form.List>
    </Form>
  )
}
`,Q={code:K,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'

import { AddO } from 'react-native-system-icon'
import { Button, Form, Field, Toast } from 'react-native-system-ui'

export default function FormListDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ users: [{ name: '', age: '' }] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, idx) => (
              <View key={field.key} style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#969799',
                    paddingVertical: 12,
                    lineHeight: 16,
                  }}
                >
                  用户 {idx + 1}
                </Text>
                <Form.Item name={[field.name, 'name']}>
                  <Field label="姓名" placeholder="请输入姓名" clearable />
                </Form.Item>
                <Form.Item name={[field.name, 'age']}>
                  <Field label="年龄" placeholder="请输入年龄" clearable />
                </Form.Item>
                <Button
                  size="small"
                  type="danger"
                  text="删除"
                  onPress={() => remove(idx)}
                  style={{ marginTop: 8 }}
                />
              </View>
            ))}
            <Button
              plain
              block
              icon={<AddO size={16} />}
              text="新增用户"
              onPress={() => add({ name: '', age: '' })}
            />
          </>
        )}
      </Form.List>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text } from 'react-native'

import { AddO } from 'react-native-system-icon'
import { Button, Form, Field, Toast } from 'react-native-system-ui'

export default function FormListDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ users: [{ name: '', age: '' }] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, idx) => (
              <View key={field.key} style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#969799',
                    paddingVertical: 12,
                    lineHeight: 16,
                  }}
                >
                  用户 {idx + 1}
                </Text>
                <Form.Item name={[field.name, 'name']}>
                  <Field label="姓名" placeholder="请输入姓名" clearable />
                </Form.Item>
                <Form.Item name={[field.name, 'age']}>
                  <Field label="年龄" placeholder="请输入年龄" clearable />
                </Form.Item>
                <Button
                  size="small"
                  type="danger"
                  text="删除"
                  onPress={() => remove(idx)}
                  style={{ marginTop: 8 }}
                />
              </View>
            ))}
            <Button
              plain
              block
              icon={<AddO size={16} />}
              text="新增用户"
              onPress={() => add({ name: '', age: '' })}
            />
          </>
        )}
      </Form.List>
    </Form>
  )
}
`}},title:"动态增减表单项",identifier:"form-list",lang:"tsx",meta:{title:"动态增减表单项"}},X=[{label:"南京",value:"南京"},{label:"苏州",value:"苏州"},{label:"常州",value:"常州"},{label:"淮安",value:"淮安"},{label:"扬州",value:"扬州"},{label:"南通",value:"南通"},{label:"宿迁",value:"宿迁"},{label:"泰州",value:"泰州"},{label:"无锡",value:"无锡"}],Y=({formRef:t})=>{const[l,n]=F.useState(!1),[o,i]=F.useState(!1),[s,x]=F.useState(!1),h=r.useWatch("city",t),v=r.useWatch("date",t),y=r.useWatch("calendar",t),g=u=>u?new Date(u).toLocaleDateString():"";return e.jsxs(e.Fragment,{children:[e.jsx(r.Item,{name:"city",label:"城市",children:e.jsx(a,{readOnly:!0,clickable:!0,isLink:!0,value:h?String(h):"",placeholder:"请选择城市",onClick:()=>n(!0)})}),e.jsx(r.Item,{name:"date",label:"日期",children:e.jsx(a,{readOnly:!0,clickable:!0,isLink:!0,value:g(v),placeholder:"请选择日期",onClick:()=>i(!0)})}),e.jsx(r.Item,{name:"calendar",label:"日历",children:e.jsx(a,{readOnly:!0,clickable:!0,isLink:!0,value:g(y),placeholder:"请选择日期",onClick:()=>x(!0),border:!1})}),e.jsx(j,{visible:l,placement:"bottom",round:!0,onClose:()=>n(!1),children:e.jsx(V,{title:"城市选择",columns:X,value:h,onConfirm:u=>{t.current?.setFieldsValue({city:u[0]}),n(!1)},onCancel:()=>n(!1)})}),e.jsx(H,{popup:!0,popupVisible:o,onPopupVisibleChange:i,type:"date",value:v??new Date,onConfirm:u=>t.current?.setFieldsValue({date:u}),onCancel:()=>i(!1),showToolbar:!0}),e.jsx(_,{poppable:!0,visible:s,onVisibleChange:x,value:y,onConfirm:u=>{const w=Array.isArray(u)?u[0]:u;t.current?.setFieldsValue({calendar:w})}})]})},B=()=>{const t=r.useForm();return e.jsx(r,{ref:t,onFinish:l=>d.info(JSON.stringify(l)),style:{paddingHorizontal:12},footer:e.jsx(m,{round:!0,block:!0,type:"primary",text:"提交",onPress:()=>t.current?.submit(),style:{marginTop:12}}),children:e.jsx(Y,{formRef:t})})},Z=`import React from 'react'

import {
  Button,
  Calendar,
  DatetimePicker,
  Field,
  Form,
  Picker,
  Popup,
  Toast,
  type PickerOption,
} from 'react-native-system-ui'

const cityColumns: PickerOption[] = [
  { label: '南京', value: '南京' },
  { label: '苏州', value: '苏州' },
  { label: '常州', value: '常州' },
  { label: '淮安', value: '淮安' },
  { label: '扬州', value: '扬州' },
  { label: '南通', value: '南通' },
  { label: '宿迁', value: '宿迁' },
  { label: '泰州', value: '泰州' },
  { label: '无锡', value: '无锡' },
]

const Fields: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const [cityVisible, setCityVisible] = React.useState(false)
  const [dateVisible, setDateVisible] = React.useState(false)
  const [calendarVisible, setCalendarVisible] = React.useState(false)

  const city = Form.useWatch('city', formRef) as string | undefined
  const date = Form.useWatch('date', formRef) as Date | undefined
  const calendar = Form.useWatch('calendar', formRef) as Date | undefined

  const formatDate = (val?: Date) => (val ? new Date(val).toLocaleDateString() : '')

  return (
    <>
      <Form.Item name="city" label="城市">
        <Field
          readOnly
          clickable
          isLink
          value={city ? String(city) : ''}
          placeholder="请选择城市"
          onClick={() => setCityVisible(true)}
        />
      </Form.Item>

      <Form.Item name="date" label="日期">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(date)}
          placeholder="请选择日期"
          onClick={() => setDateVisible(true)}
        />
      </Form.Item>

      <Form.Item name="calendar" label="日历">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(calendar)}
          placeholder="请选择日期"
          onClick={() => setCalendarVisible(true)}
          border={false}
        />
      </Form.Item>

      <Popup
        visible={cityVisible}
        placement="bottom"
        round
        onClose={() => setCityVisible(false)}
      >
        <Picker
          title="城市选择"
          columns={cityColumns}
          value={city}
          onConfirm={vals => {
            formRef.current?.setFieldsValue({ city: vals[0] })
            setCityVisible(false)
          }}
          onCancel={() => setCityVisible(false)}
        />
      </Popup>

      <DatetimePicker
        popup
        popupVisible={dateVisible}
        onPopupVisibleChange={setDateVisible}
        type="date"
        value={date ?? new Date()}
        onConfirm={val => formRef.current?.setFieldsValue({ date: val })}
        onCancel={() => setDateVisible(false)}
        showToolbar
      />

      <Calendar
        poppable
        visible={calendarVisible}
        onVisibleChange={setCalendarVisible}
        value={calendar}
        onConfirm={val => {
          const next = Array.isArray(val) ? val[0] : val
          formRef.current?.setFieldsValue({ calendar: next })
        }}
      />
    </>
  )
}

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Fields formRef={formRef} />
    </Form>
  )
}
`,ee={code:Z,sources:{_:{tsx:`import React from 'react'

import {
  Button,
  Calendar,
  DatetimePicker,
  Field,
  Form,
  Picker,
  Popup,
  Toast,
  type PickerOption,
} from 'react-native-system-ui'

const cityColumns: PickerOption[] = [
  { label: '南京', value: '南京' },
  { label: '苏州', value: '苏州' },
  { label: '常州', value: '常州' },
  { label: '淮安', value: '淮安' },
  { label: '扬州', value: '扬州' },
  { label: '南通', value: '南通' },
  { label: '宿迁', value: '宿迁' },
  { label: '泰州', value: '泰州' },
  { label: '无锡', value: '无锡' },
]

const Fields: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const [cityVisible, setCityVisible] = React.useState(false)
  const [dateVisible, setDateVisible] = React.useState(false)
  const [calendarVisible, setCalendarVisible] = React.useState(false)

  const city = Form.useWatch('city', formRef) as string | undefined
  const date = Form.useWatch('date', formRef) as Date | undefined
  const calendar = Form.useWatch('calendar', formRef) as Date | undefined

  const formatDate = (val?: Date) => (val ? new Date(val).toLocaleDateString() : '')

  return (
    <>
      <Form.Item name="city" label="城市">
        <Field
          readOnly
          clickable
          isLink
          value={city ? String(city) : ''}
          placeholder="请选择城市"
          onClick={() => setCityVisible(true)}
        />
      </Form.Item>

      <Form.Item name="date" label="日期">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(date)}
          placeholder="请选择日期"
          onClick={() => setDateVisible(true)}
        />
      </Form.Item>

      <Form.Item name="calendar" label="日历">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(calendar)}
          placeholder="请选择日期"
          onClick={() => setCalendarVisible(true)}
          border={false}
        />
      </Form.Item>

      <Popup
        visible={cityVisible}
        placement="bottom"
        round
        onClose={() => setCityVisible(false)}
      >
        <Picker
          title="城市选择"
          columns={cityColumns}
          value={city}
          onConfirm={vals => {
            formRef.current?.setFieldsValue({ city: vals[0] })
            setCityVisible(false)
          }}
          onCancel={() => setCityVisible(false)}
        />
      </Popup>

      <DatetimePicker
        popup
        popupVisible={dateVisible}
        onPopupVisibleChange={setDateVisible}
        type="date"
        value={date ?? new Date()}
        onConfirm={val => formRef.current?.setFieldsValue({ date: val })}
        onCancel={() => setDateVisible(false)}
        showToolbar
      />

      <Calendar
        poppable
        visible={calendarVisible}
        onVisibleChange={setCalendarVisible}
        value={calendar}
        onConfirm={val => {
          const next = Array.isArray(val) ? val[0] : val
          formRef.current?.setFieldsValue({ calendar: next })
        }}
      />
    </>
  )
}

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Fields formRef={formRef} />
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import {
  Button,
  Calendar,
  DatetimePicker,
  Field,
  Form,
  Picker,
  Popup,
  Toast,
  type PickerOption,
} from 'react-native-system-ui'

const cityColumns: PickerOption[] = [
  { label: '南京', value: '南京' },
  { label: '苏州', value: '苏州' },
  { label: '常州', value: '常州' },
  { label: '淮安', value: '淮安' },
  { label: '扬州', value: '扬州' },
  { label: '南通', value: '南通' },
  { label: '宿迁', value: '宿迁' },
  { label: '泰州', value: '泰州' },
  { label: '无锡', value: '无锡' },
]

const Fields: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const [cityVisible, setCityVisible] = React.useState(false)
  const [dateVisible, setDateVisible] = React.useState(false)
  const [calendarVisible, setCalendarVisible] = React.useState(false)

  const city = Form.useWatch('city', formRef) as string | undefined
  const date = Form.useWatch('date', formRef) as Date | undefined
  const calendar = Form.useWatch('calendar', formRef) as Date | undefined

  const formatDate = (val?: Date) => (val ? new Date(val).toLocaleDateString() : '')

  return (
    <>
      <Form.Item name="city" label="城市">
        <Field
          readOnly
          clickable
          isLink
          value={city ? String(city) : ''}
          placeholder="请选择城市"
          onClick={() => setCityVisible(true)}
        />
      </Form.Item>

      <Form.Item name="date" label="日期">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(date)}
          placeholder="请选择日期"
          onClick={() => setDateVisible(true)}
        />
      </Form.Item>

      <Form.Item name="calendar" label="日历">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(calendar)}
          placeholder="请选择日期"
          onClick={() => setCalendarVisible(true)}
          border={false}
        />
      </Form.Item>

      <Popup
        visible={cityVisible}
        placement="bottom"
        round
        onClose={() => setCityVisible(false)}
      >
        <Picker
          title="城市选择"
          columns={cityColumns}
          value={city}
          onConfirm={vals => {
            formRef.current?.setFieldsValue({ city: vals[0] })
            setCityVisible(false)
          }}
          onCancel={() => setCityVisible(false)}
        />
      </Popup>

      <DatetimePicker
        popup
        popupVisible={dateVisible}
        onPopupVisibleChange={setDateVisible}
        type="date"
        value={date ?? new Date()}
        onConfirm={val => formRef.current?.setFieldsValue({ date: val })}
        onCancel={() => setDateVisible(false)}
        showToolbar
      />

      <Calendar
        poppable
        visible={calendarVisible}
        onVisibleChange={setCalendarVisible}
        value={calendar}
        onConfirm={val => {
          const next = Array.isArray(val) ? val[0] : val
          formRef.current?.setFieldsValue({ calendar: next })
        }}
      />
    </>
  )
}

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Fields formRef={formRef} />
    </Form>
  )
}
`}},title:"弹层选择",identifier:"form-popup",lang:"tsx",meta:{title:"弹层选择"}},re=[{label:"+86",value:"86"},{label:"+1",value:"1"},{label:"+81",value:"81"}],te=({value:t={prefix:"86",value:""},onChange:l})=>{const[n,o]=F.useState(!1),i=s=>{l?.({...t,...s})};return e.jsxs(e.Fragment,{children:[e.jsxs(c,{style:{flexDirection:"row",alignItems:"center"},children:[e.jsx(c,{style:{width:100,marginRight:12},children:e.jsx(a,{readOnly:!0,clickable:!0,isLink:!0,value:`+${t.prefix}`,onClick:()=>o(!0)})}),e.jsx(c,{style:{flex:1},children:e.jsx(a,{value:t.value,placeholder:"请输入手机号",onChangeText:s=>i({value:s})})})]}),e.jsx(j,{visible:n,placement:"bottom",round:!0,onClose:()=>o(!1),children:e.jsx(V,{title:"选择区号",columns:re,value:t.prefix,onConfirm:s=>{i({prefix:String(s[0]??t.prefix)}),o(!1)},onCancel:()=>o(!1)})})]})};function D(){const t=r.useForm(),l=n=>n?.prefix&&n?.value?!0:"请输入区号和手机号";return e.jsxs(r,{ref:t,onFinish:n=>d.info(JSON.stringify(n)),style:{paddingHorizontal:12},footer:e.jsx(m,{round:!0,block:!0,type:"primary",text:"提交",onPress:()=>t.current?.submit(),style:{marginTop:12}}),children:[e.jsx(r.Item,{name:"name",label:"姓名",children:e.jsx(a,{placeholder:"请输入姓名"})}),e.jsx(r.Item,{name:"mobile",label:"手机号",initialValue:{prefix:"86",value:""},rules:[{validator:l}],trigger:"onChange",valuePropName:"value",children:e.jsx(te,{})})]})}const ne=`import React from 'react'
import { View } from 'react-native'

import { Button, Field, Form, Picker, Popup, Space, Toast, type PickerOption } from 'react-native-system-ui'

interface MobileValue {
  prefix: string
  value: string
}

type MobileInputProps = {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

const areaCodeColumns: PickerOption[] = [
  { label: '+86', value: '86' },
  { label: '+1', value: '1' },
  { label: '+81', value: '81' },
]

const MobileInput: React.FC<MobileInputProps> = ({ value = { prefix: '86', value: '' }, onChange }) => {
  const [visible, setVisible] = React.useState(false)

  const trigger = (partial: Partial<MobileValue>) => {
    onChange?.({ ...value, ...partial })
  }

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 100, marginRight: 12 }}>
          <Field
            readOnly
            clickable
            isLink
            value={\`+\${value.prefix}\`}
            onClick={() => setVisible(true)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Field
            value={value.value}
            placeholder="请输入手机号"
            onChangeText={val => trigger({ value: val })}
          />
        </View>
      </View>

      <Popup
        visible={visible}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      >
        <Picker
          title="选择区号"
          columns={areaCodeColumns}
          value={value.prefix}
          onConfirm={vals => {
            trigger({ prefix: String(vals[0] ?? value.prefix) })
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}

export default function FormCustomDemo() {
  const formRef = Form.useForm()

  const checkMobile = (val?: MobileValue) => {
    if (val?.prefix && val?.value) return true
    return '请输入区号和手机号'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="name" label="姓名">
        <Field placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="手机号"
        initialValue={{ prefix: '86', value: '' }}
        rules={[{ validator: checkMobile }]}
        trigger="onChange"
        valuePropName="value"
      >
        <MobileInput />
      </Form.Item>
    </Form>
  )
}
`,le={code:ne,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Button, Field, Form, Picker, Popup, Space, Toast, type PickerOption } from 'react-native-system-ui'

interface MobileValue {
  prefix: string
  value: string
}

type MobileInputProps = {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

const areaCodeColumns: PickerOption[] = [
  { label: '+86', value: '86' },
  { label: '+1', value: '1' },
  { label: '+81', value: '81' },
]

const MobileInput: React.FC<MobileInputProps> = ({ value = { prefix: '86', value: '' }, onChange }) => {
  const [visible, setVisible] = React.useState(false)

  const trigger = (partial: Partial<MobileValue>) => {
    onChange?.({ ...value, ...partial })
  }

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 100, marginRight: 12 }}>
          <Field
            readOnly
            clickable
            isLink
            value={\`+\${value.prefix}\`}
            onClick={() => setVisible(true)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Field
            value={value.value}
            placeholder="请输入手机号"
            onChangeText={val => trigger({ value: val })}
          />
        </View>
      </View>

      <Popup
        visible={visible}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      >
        <Picker
          title="选择区号"
          columns={areaCodeColumns}
          value={value.prefix}
          onConfirm={vals => {
            trigger({ prefix: String(vals[0] ?? value.prefix) })
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}

export default function FormCustomDemo() {
  const formRef = Form.useForm()

  const checkMobile = (val?: MobileValue) => {
    if (val?.prefix && val?.value) return true
    return '请输入区号和手机号'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="name" label="姓名">
        <Field placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="手机号"
        initialValue={{ prefix: '86', value: '' }}
        rules={[{ validator: checkMobile }]}
        trigger="onChange"
        valuePropName="value"
      >
        <MobileInput />
      </Form.Item>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Button, Field, Form, Picker, Popup, Space, Toast, type PickerOption } from 'react-native-system-ui'

interface MobileValue {
  prefix: string
  value: string
}

type MobileInputProps = {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

const areaCodeColumns: PickerOption[] = [
  { label: '+86', value: '86' },
  { label: '+1', value: '1' },
  { label: '+81', value: '81' },
]

const MobileInput: React.FC<MobileInputProps> = ({ value = { prefix: '86', value: '' }, onChange }) => {
  const [visible, setVisible] = React.useState(false)

  const trigger = (partial: Partial<MobileValue>) => {
    onChange?.({ ...value, ...partial })
  }

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 100, marginRight: 12 }}>
          <Field
            readOnly
            clickable
            isLink
            value={\`+\${value.prefix}\`}
            onClick={() => setVisible(true)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Field
            value={value.value}
            placeholder="请输入手机号"
            onChangeText={val => trigger({ value: val })}
          />
        </View>
      </View>

      <Popup
        visible={visible}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      >
        <Picker
          title="选择区号"
          columns={areaCodeColumns}
          value={value.prefix}
          onConfirm={vals => {
            trigger({ prefix: String(vals[0] ?? value.prefix) })
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}

export default function FormCustomDemo() {
  const formRef = Form.useForm()

  const checkMobile = (val?: MobileValue) => {
    if (val?.prefix && val?.value) return true
    return '请输入区号和手机号'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="name" label="姓名">
        <Field placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="手机号"
        initialValue={{ prefix: '86', value: '' }}
        rules={[{ validator: checkMobile }]}
        trigger="onChange"
        valuePropName="value"
      >
        <MobileInput />
      </Form.Item>
    </Form>
  )
}
`}},title:"自定义表单项",identifier:"form-custom",lang:"tsx",meta:{title:"自定义表单项"}},ae=[{label:"手机号",value:"mobile"},{label:"住址",value:"address"}];function S(){const t=r.useForm();return e.jsxs(r,{ref:t,initialValues:{type:["mobile"]},onFinish:l=>d.info(JSON.stringify(l)),style:{paddingHorizontal:12},footer:e.jsx(m,{round:!0,block:!0,type:"primary",text:"提交",onPress:()=>t.current?.submit(),style:{marginTop:12}}),children:[e.jsx(r.Item,{name:"type",label:"联系方式",trigger:"onChange",children:e.jsx(L,{multiple:!0,options:ae})}),e.jsx(r.Item,{shouldUpdate:(l,n)=>l.type!==n.type,children:({getFieldValue:l})=>{const n=l("type")??[];return e.jsxs(e.Fragment,{children:[n.includes("mobile")?e.jsx(r.Item,{name:"mobile",label:"手机号",children:e.jsx(a,{placeholder:"请输入手机号",clearable:!0})}):null,n.includes("address")?e.jsxs(e.Fragment,{children:[e.jsx(r.Item,{name:"area",label:"地区",children:e.jsx(a,{placeholder:"请输入地区",clearable:!0})}),e.jsx(r.Item,{name:"address",label:"详细地址",children:e.jsx(a,{placeholder:"请输入详细地址",border:!1})})]}):null]})}})]})}const oe=`import React from 'react'

import { Button, Field, Form, Selector, Toast } from 'react-native-system-ui'

const options = [
  { label: '手机号', value: 'mobile' },
  { label: '住址', value: 'address' },
]

export default function FormShouldUpdateDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ type: ['mobile'] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="type" label="联系方式" trigger="onChange">
        <Selector
          multiple
          options={options}
        />
      </Form.Item>

      <Form.Item shouldUpdate={(prev, next) => prev.type !== next.type}>
        {({ getFieldValue }) => {
          const selected = (getFieldValue('type') ?? []) as string[]

          return (
            <>
              {selected.includes('mobile') ? (
                <Form.Item name="mobile" label="手机号">
                  <Field placeholder="请输入手机号" clearable />
                </Form.Item>
              ) : null}

              {selected.includes('address') ? (
                <>
                  <Form.Item name="area" label="地区">
                    <Field placeholder="请输入地区" clearable />
                  </Form.Item>
                  <Form.Item name="address" label="详细地址">
                    <Field placeholder="请输入详细地址" border={false} />
                  </Form.Item>
                </>
              ) : null}
            </>
          )
        }}
      </Form.Item>
    </Form>
  )
}
`,ie={code:oe,sources:{_:{tsx:`import React from 'react'

import { Button, Field, Form, Selector, Toast } from 'react-native-system-ui'

const options = [
  { label: '手机号', value: 'mobile' },
  { label: '住址', value: 'address' },
]

export default function FormShouldUpdateDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ type: ['mobile'] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="type" label="联系方式" trigger="onChange">
        <Selector
          multiple
          options={options}
        />
      </Form.Item>

      <Form.Item shouldUpdate={(prev, next) => prev.type !== next.type}>
        {({ getFieldValue }) => {
          const selected = (getFieldValue('type') ?? []) as string[]

          return (
            <>
              {selected.includes('mobile') ? (
                <Form.Item name="mobile" label="手机号">
                  <Field placeholder="请输入手机号" clearable />
                </Form.Item>
              ) : null}

              {selected.includes('address') ? (
                <>
                  <Form.Item name="area" label="地区">
                    <Field placeholder="请输入地区" clearable />
                  </Form.Item>
                  <Form.Item name="address" label="详细地址">
                    <Field placeholder="请输入详细地址" border={false} />
                  </Form.Item>
                </>
              ) : null}
            </>
          )
        }}
      </Form.Item>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Field, Form, Selector, Toast } from 'react-native-system-ui'

const options = [
  { label: '手机号', value: 'mobile' },
  { label: '住址', value: 'address' },
]

export default function FormShouldUpdateDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ type: ['mobile'] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="type" label="联系方式" trigger="onChange">
        <Selector
          multiple
          options={options}
        />
      </Form.Item>

      <Form.Item shouldUpdate={(prev, next) => prev.type !== next.type}>
        {({ getFieldValue }) => {
          const selected = (getFieldValue('type') ?? []) as string[]

          return (
            <>
              {selected.includes('mobile') ? (
                <Form.Item name="mobile" label="手机号">
                  <Field placeholder="请输入手机号" clearable />
                </Form.Item>
              ) : null}

              {selected.includes('address') ? (
                <>
                  <Form.Item name="area" label="地区">
                    <Field placeholder="请输入地区" clearable />
                  </Form.Item>
                  <Form.Item name="address" label="详细地址">
                    <Field placeholder="请输入详细地址" border={false} />
                  </Form.Item>
                </>
              ) : null}
            </>
          )
        }}
      </Form.Item>
    </Form>
  )
}
`}},title:"条件渲染/shouldUpdate",identifier:"form-shouldupdate",lang:"tsx",meta:{title:"条件渲染/shouldUpdate"}},se=t=>Object.entries(t).map(([l,n])=>`${l}: ${n??""}`).join("，");function T(){const t=r.useForm();return e.jsxs(r,{ref:t,initialValues:{a:"",b:""},style:{paddingHorizontal:12},children:[e.jsx(r.Item,{name:"a",label:"字段 A",children:e.jsx(a,{placeholder:"请输入内容",clearable:!0})}),e.jsx(r.Item,{name:"b",label:"字段 B",children:e.jsx(a,{placeholder:"请输入内容",clearable:!0})}),e.jsx(r.Subscribe,{to:["a","b"],children:(l,n)=>e.jsx(a,{readOnly:!0,label:"最近变更",value:Object.keys(l).length?se(l):"",placeholder:"输入字段 A / 字段 B 触发",border:!1})})]})}const ue=`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const formatPairs = (values: Record<string, any>) =>
  Object.entries(values)
    .map(([key, value]) => \`\${key}: \${value ?? ''}\`)
    .join('，')

export default function FormSubscribeDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ a: '', b: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="a" label="字段 A">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>
      <Form.Item name="b" label="字段 B">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>

      <Form.Subscribe to={['a', 'b']}>
        {(changed, form) => (
          <Field
            readOnly
            label="最近变更"
            value={Object.keys(changed).length ? formatPairs(changed) : ''}
            placeholder="输入字段 A / 字段 B 触发"
            border={false}
          />
        )}
      </Form.Subscribe>
    </Form>
  )
}
`,me={code:ue,sources:{_:{tsx:`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const formatPairs = (values: Record<string, any>) =>
  Object.entries(values)
    .map(([key, value]) => \`\${key}: \${value ?? ''}\`)
    .join('，')

export default function FormSubscribeDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ a: '', b: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="a" label="字段 A">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>
      <Form.Item name="b" label="字段 B">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>

      <Form.Subscribe to={['a', 'b']}>
        {(changed, form) => (
          <Field
            readOnly
            label="最近变更"
            value={Object.keys(changed).length ? formatPairs(changed) : ''}
            placeholder="输入字段 A / 字段 B 触发"
            border={false}
          />
        )}
      </Form.Subscribe>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const formatPairs = (values: Record<string, any>) =>
  Object.entries(values)
    .map(([key, value]) => \`\${key}: \${value ?? ''}\`)
    .join('，')

export default function FormSubscribeDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ a: '', b: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="a" label="字段 A">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>
      <Form.Item name="b" label="字段 B">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>

      <Form.Subscribe to={['a', 'b']}>
        {(changed, form) => (
          <Field
            readOnly
            label="最近变更"
            value={Object.keys(changed).length ? formatPairs(changed) : ''}
            placeholder="输入字段 A / 字段 B 触发"
            border={false}
          />
        )}
      </Form.Subscribe>
    </Form>
  )
}
`}},title:"订阅",identifier:"form-subscribe",lang:"tsx",meta:{title:"订阅"}},de=({formRef:t})=>{const l=r.useWatch("username",t),n=r.useWatch(void 0,t);return e.jsxs(e.Fragment,{children:[e.jsx(a,{readOnly:!0,label:"实时用户名",value:l?String(l):""}),e.jsx(a,{readOnly:!0,label:"所有值",value:n?JSON.stringify(n):"",border:!1})]})};function E(){const t=r.useForm();return e.jsxs(r,{ref:t,initialValues:{username:"Jack",phone:""},style:{paddingHorizontal:12},children:[e.jsx(r.Item,{name:"username",label:"用户名",children:e.jsx(a,{placeholder:"请输入用户名",clearable:!0})}),e.jsx(r.Item,{name:"phone",label:"手机号",children:e.jsx(a,{placeholder:"请输入手机号",clearable:!0})}),e.jsx(de,{formRef:t})]})}const ce=`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const Values: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const username = Form.useWatch('username', formRef)
  const allValues = Form.useWatch(undefined, formRef)

  return (
    <>
      <Field readOnly label="实时用户名" value={username ? String(username) : ''} />
      <Field readOnly label="所有值" value={allValues ? JSON.stringify(allValues) : ''} border={false} />
    </>
  )
}

export default function FormWatchDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ username: 'Jack', phone: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="username" label="用户名">
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Values formRef={formRef} />
    </Form>
  )
}
`,pe={code:ce,sources:{_:{tsx:`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const Values: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const username = Form.useWatch('username', formRef)
  const allValues = Form.useWatch(undefined, formRef)

  return (
    <>
      <Field readOnly label="实时用户名" value={username ? String(username) : ''} />
      <Field readOnly label="所有值" value={allValues ? JSON.stringify(allValues) : ''} border={false} />
    </>
  )
}

export default function FormWatchDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ username: 'Jack', phone: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="username" label="用户名">
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Values formRef={formRef} />
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const Values: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const username = Form.useWatch('username', formRef)
  const allValues = Form.useWatch(undefined, formRef)

  return (
    <>
      <Field readOnly label="实时用户名" value={username ? String(username) : ''} />
      <Field readOnly label="所有值" value={allValues ? JSON.stringify(allValues) : ''} border={false} />
    </>
  )
}

export default function FormWatchDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ username: 'Jack', phone: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="username" label="用户名">
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Values formRef={formRef} />
    </Form>
  )
}
`}},title:"useWatch",identifier:"form-watch",lang:"tsx",meta:{title:"useWatch"}},fe=function({previewer:t=()=>null,api:l=()=>null}){const n=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"form-表单","data-anchor":"form-表单",children:"Form 表单"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"提供表单上下文，协调 Field 值的收集、验证与提交。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { Form } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(n,{...W,children:e.jsx(R,{})})}),e.jsx("h3",{id:"校验规则","data-anchor":"校验规则",children:"校验规则"}),e.jsx("div",{children:e.jsx(n,{...q,children:e.jsx(I,{})})}),e.jsx("h3",{id:"表单项类型","data-anchor":"表单项类型",children:"表单项类型"}),e.jsx("div",{children:e.jsx(n,{...U,children:e.jsx(k,{})})}),e.jsx("h3",{id:"动态增减表单项","data-anchor":"动态增减表单项",children:"动态增减表单项"}),e.jsx("div",{children:e.jsx(n,{...Q,children:e.jsx(P,{})})}),e.jsx("h3",{id:"弹层选择","data-anchor":"弹层选择",children:"弹层选择"}),e.jsx("div",{children:e.jsx(n,{...ee,children:e.jsx(B,{})})}),e.jsx("h3",{id:"自定义表单项","data-anchor":"自定义表单项",children:"自定义表单项"}),e.jsx("div",{children:e.jsx(n,{...le,children:e.jsx(D,{})})}),e.jsx("h3",{id:"条件渲染shouldupdate","data-anchor":"条件渲染shouldupdate",children:"条件渲染/shouldUpdate"}),e.jsx("div",{children:e.jsx(n,{...ie,children:e.jsx(S,{})})}),e.jsx("h3",{id:"订阅","data-anchor":"订阅",children:"订阅"}),e.jsx("div",{children:e.jsx(n,{...me,children:e.jsx(T,{})})}),e.jsx("h3",{id:"usewatch","data-anchor":"usewatch",children:"useWatch"}),e.jsx("div",{children:e.jsx(n,{...pe,children:e.jsx(E,{})})}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"Form.List"})," 支持动态增删/移动数组项：",e.jsx("code",{children:"add(value?, index?)"}),"、",e.jsx("code",{children:"remove(index)"}),"、",e.jsx("code",{children:"move(from, to)"}),"，子项 name 使用路径写法，如 ",e.jsxs("code",{children:["name=","{","[field.name, 'name']","}"]}),"。"]})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"form-props","data-anchor":"form-props",children:"Form Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"initialValues"})}),e.jsx("td",{children:"初始表单值"}),e.jsx("td",{children:e.jsx("code",{children:"Record<string, any>"})}),e.jsx("td",{children:e.jsxs("code",{children:["{","}"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"colon"})}),e.jsx("td",{children:"是否在 label 后展示冒号（下发给 Field）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"labelWidth"})}),e.jsx("td",{children:"label 统一宽度（下发给 Field）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"96"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showValidateMessage"})}),e.jsx("td",{children:"是否默认展示 Form.Item 的验证信息"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"footer"})}),e.jsx("td",{children:"底部区域，一般放提交按钮"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onValuesChange"})}),e.jsx("td",{children:"任一字段变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(values, name, value) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsxs("td",{children:["调用 ",e.jsx("code",{children:"submit"})," 且全部字段通过校验时触发"]}),e.jsx("td",{children:e.jsx("code",{children:"(values) => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"form-实例方法","data-anchor":"form-实例方法",children:"Form 实例方法"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"const formRef = Form.useForm()"})," 获取 ref，在 ",e.jsxs("code",{children:["<Form ref=","{","formRef","}"," />"]})," 中使用。"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"submit()"})}),e.jsxs("td",{children:["触发 ",e.jsx("code",{children:"onFinish"}),"，返回当前值"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"getFieldsValue()"})}),e.jsx("td",{children:"获取全部字段值"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"setFieldsValue(values)"})}),e.jsx("td",{children:"批量设置字段值"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"resetFields()"})}),e.jsxs("td",{children:["重置为 ",e.jsx("code",{children:"initialValues"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"validateFields(names?)"})}),e.jsx("td",{children:"主动触发校验（默认校验全部字段），成功时返回最新值，失败时抛出错误"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"getFieldError(name)"})}),e.jsx("td",{children:"获取某个字段的错误信息"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"subscribe(listener)"})}),e.jsx("td",{children:"订阅字段变更，返回取消订阅函数"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"useWatch(name?, formRef?)"})}),e.jsx("td",{children:"hook 形式监听字段或全部值"})]})]})]}),e.jsx("h3",{id:"formitem-props","data-anchor":"formitem-props",children:"Form.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"字段名"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"标签文案（透传给子组件）"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"描述文案（透传给子组件）"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"intro"})}),e.jsx("td",{children:"额外提示信息（透传给 Field）"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tooltip"})}),e.jsx("td",{children:"标签提示信息（透传给 Field）"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rules"})}),e.jsxs("td",{children:["校验规则，支持 ",e.jsx("code",{children:"required"})," / ",e.jsx("code",{children:"pattern"})," / ",e.jsx("code",{children:"min"})," / ",e.jsx("code",{children:"max"})," / ",e.jsx("code",{children:"len"})," / ",e.jsx("code",{children:"validator"})," 等"]}),e.jsx("td",{children:e.jsx("code",{children:"FormItemRule[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"valuePropName"})}),e.jsx("td",{children:"绑定值的 prop 名"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"value"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"trigger"})}),e.jsx("td",{children:"触发更新的事件名"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"onChangeText"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"validateTrigger"})}),e.jsxs("td",{children:["触发校验的事件，默认为 ",e.jsx("code",{children:"trigger"})]}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:e.jsx("code",{children:"onChangeText"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showValidateMessage"})}),e.jsx("td",{children:"是否展示该表单项的错误提示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"required"})}),e.jsxs("td",{children:["强制展示必填星号（默认为 ",e.jsx("code",{children:"rules"})," 中的 required 值）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"noStyle"})}),e.jsx("td",{children:"不渲染额外样式容器（当前实现中等价于默认表现）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"shouldUpdate"})}),e.jsx("td",{children:"是否在依赖字段变化时重新渲染，可用于条件渲染"}),e.jsx("td",{children:e.jsx("code",{children:"(prev, next) => boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"initialValue"})}),e.jsx("td",{children:"该字段的初始值（当表单没有同名初始值时生效）"}),e.jsx("td",{children:e.jsx("code",{children:"any"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"dependencies"})}),e.jsx("td",{children:"依赖的字段名，依赖字段变化时触发当前项校验"}),e.jsx("td",{children:e.jsx("code",{children:"string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"必须是受控组件，如 Field"}),e.jsx("td",{children:e.jsx("code",{children:"ReactElement"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"FormItemRule"})," 类型可通过 ",e.jsxs("code",{children:["import type ","{"," FormItemRule ","}"," from 'react-native-system-ui'"]})," 获取。"]})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["Form.Item 会自动向子组件注入 ",e.jsx("code",{children:"value"}),"、",e.jsx("code",{children:"trigger"}),"、",e.jsx("code",{children:"validateTrigger"}),"、",e.jsx("code",{children:"errorMessage"}),"、",e.jsx("code",{children:"labelWidth/colon"})," 等属性，用来与 Field 协作。"]})}),e.jsx("h3",{id:"规则结构","data-anchor":"规则结构",children:"规则结构"}),e.jsxs("p",{children:["Form.Item 的 ",e.jsx("code",{children:"rules"})," 属性支持以下字段："]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"键名"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"required"})}),e.jsxs("td",{children:["是否为必填字段，支持配合 ",e.jsx("code",{children:"message"})," 或默认提示"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pattern"})}),e.jsx("td",{children:"正则表达式校验，通常用于手机号、邮箱等格式"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"min"}),"/",e.jsx("code",{children:"max"})]}),e.jsx("td",{children:"字符串长度或数字大小范围"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"len"})}),e.jsx("td",{children:"固定长度或特定数值"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"validator"})}),e.jsxs("td",{children:["自定义校验函数 ",e.jsx("code",{children:"(value, values) => boolean | string | Promise"}),"，返回 ",e.jsx("code",{children:"false"})," 或字符串代表失败"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"validateTrigger"})}),e.jsx("td",{children:"限定规则触发的事件名"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"message"})}),e.jsx("td",{children:"当前规则失败时展示的文案"})]})]})]}),e.jsx("h3",{id:"订阅与监听","data-anchor":"订阅与监听",children:"订阅与监听"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Form.Subscribe"}),"：",e.jsx("code",{children:"children(changedValues, form) => ReactNode"}),"，可通过 ",e.jsx("code",{children:"to"})," 指定监听字段。"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Form.useWatch(name?, formRef?)"}),"：实时返回指定字段或整个表单的值，保持受控/非受控同步。"]})]})]})})},Fe=[{Component:R,key:"form-basic",sources:{_:{tsx:`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请填写用户名' }]}>
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请填写密码' }]}>
        <Field placeholder="请输入密码" type="password" border={false} />
      </Form.Item>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请填写用户名' }]}>
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请填写密码' }]}>
        <Field placeholder="请输入密码" type="password" border={false} />
      </Form.Item>
    </Form>
  )
}
`}},title:"基础用法",identifier:"form-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:I,key:"form-rules",sources:{_:{tsx:`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  const asyncValidator = async (value?: string) => {
    Toast.info({ message: '验证中...', duration: 800 })
    await new Promise(resolve => setTimeout(resolve, 800))
    return /^\\d{6}$/.test(value ?? '') ? true : '请输入正确内容'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="pattern" label="正则校验" rules={[{ pattern: /^\\d{6}$/, message: '请输入 6 位数字' }]}>
        <Field placeholder="请输入 6 位数字" clearable />
      </Form.Item>

      <Form.Item
        name="validator"
        label="函数校验"
        rules={[{
          validator: value => (/^1\\d{10}$/.test(value ?? '') ? true : '请输入正确的手机号码'),
        }]}
      >
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Form.Item
        name="async"
        label="异步校验"
        validateTrigger="onBlur"
        rules={[{
          validateTrigger: 'onBlur',
          validator: asyncValidator,
        }]}
      >
        <Field placeholder="请输入 6 位数字" border={false} />
      </Form.Item>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  const asyncValidator = async (value?: string) => {
    Toast.info({ message: '验证中...', duration: 800 })
    await new Promise(resolve => setTimeout(resolve, 800))
    return /^\\d{6}$/.test(value ?? '') ? true : '请输入正确内容'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="pattern" label="正则校验" rules={[{ pattern: /^\\d{6}$/, message: '请输入 6 位数字' }]}>
        <Field placeholder="请输入 6 位数字" clearable />
      </Form.Item>

      <Form.Item
        name="validator"
        label="函数校验"
        rules={[{
          validator: value => (/^1\\d{10}$/.test(value ?? '') ? true : '请输入正确的手机号码'),
        }]}
      >
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Form.Item
        name="async"
        label="异步校验"
        validateTrigger="onBlur"
        rules={[{
          validateTrigger: 'onBlur',
          validator: asyncValidator,
        }]}
      >
        <Field placeholder="请输入 6 位数字" border={false} />
      </Form.Item>
    </Form>
  )
}
`}},title:"校验规则",identifier:"form-rules",lang:"tsx",meta:{title:"校验规则"}},{Component:k,key:"form-type",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'

import {
  Button,
  Cell,
  Checkbox,
  Field,
  Form,
  Radio,
  Slider,
  Space,
  Stepper,
  Switch,
  Toast,
} from 'react-native-system-ui'

const GroupTitle = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 14,
      color: '#969799',
      paddingVertical: 12,
      lineHeight: 16,
    }}
  >
    {title}
  </Text>
)

export default function FormTypeDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      style={{ paddingHorizontal: 12 }}
      initialValues={{
        switch: true,
        checkbox: true,
        checkbox_group: ['a', 'b'],
        radio: 'a',
        slider: 25,
        stepper: 1,
      }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <View>
        <Cell title="开关" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="switch" valuePropName="checked" trigger="onChange">
            <Switch size={24} />
          </Form.Item>
        </Cell>

        <Cell title="步进器" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="stepper" valuePropName="value" trigger="onChange">
            <Stepper />
          </Form.Item>
        </Cell>

        <Cell title="滑块" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="slider" valuePropName="value" trigger="onChange">
            <Slider style={{ width: 200 }} />
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Cell title="复选框" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox" valuePropName="checked" trigger="onChange">
            <Checkbox shape="square">复选框</Checkbox>
          </Form.Item>
        </Cell>

        <Cell title="复选框组" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox_group" valuePropName="value" trigger="onChange">
            <Checkbox.Group direction="horizontal">
              <Space gap={12}>
                <Checkbox shape="square" name="a">复选框a</Checkbox>
                <Checkbox shape="square" name="b">复选框b</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Cell>

        <Cell title="单选框" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="radio" valuePropName="value" trigger="onChange">
            <Radio.Group direction="horizontal">
              <Space gap={12}>
                <Radio name="a">单选框a</Radio>
                <Radio name="b">单选框b</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Form.Item name="textarea" label="详细地址">
          <Field
            placeholder="请输入详细地址"
            type="textarea"
            rows={3}
            showWordLimit
            maxLength={140}
            border={false}
            style={{ paddingHorizontal: 0 }}
          />
        </Form.Item>
      </View>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text } from 'react-native'

import {
  Button,
  Cell,
  Checkbox,
  Field,
  Form,
  Radio,
  Slider,
  Space,
  Stepper,
  Switch,
  Toast,
} from 'react-native-system-ui'

const GroupTitle = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 14,
      color: '#969799',
      paddingVertical: 12,
      lineHeight: 16,
    }}
  >
    {title}
  </Text>
)

export default function FormTypeDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      style={{ paddingHorizontal: 12 }}
      initialValues={{
        switch: true,
        checkbox: true,
        checkbox_group: ['a', 'b'],
        radio: 'a',
        slider: 25,
        stepper: 1,
      }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <View>
        <Cell title="开关" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="switch" valuePropName="checked" trigger="onChange">
            <Switch size={24} />
          </Form.Item>
        </Cell>

        <Cell title="步进器" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="stepper" valuePropName="value" trigger="onChange">
            <Stepper />
          </Form.Item>
        </Cell>

        <Cell title="滑块" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="slider" valuePropName="value" trigger="onChange">
            <Slider style={{ width: 200 }} />
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Cell title="复选框" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox" valuePropName="checked" trigger="onChange">
            <Checkbox shape="square">复选框</Checkbox>
          </Form.Item>
        </Cell>

        <Cell title="复选框组" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox_group" valuePropName="value" trigger="onChange">
            <Checkbox.Group direction="horizontal">
              <Space gap={12}>
                <Checkbox shape="square" name="a">复选框a</Checkbox>
                <Checkbox shape="square" name="b">复选框b</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Cell>

        <Cell title="单选框" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="radio" valuePropName="value" trigger="onChange">
            <Radio.Group direction="horizontal">
              <Space gap={12}>
                <Radio name="a">单选框a</Radio>
                <Radio name="b">单选框b</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Form.Item name="textarea" label="详细地址">
          <Field
            placeholder="请输入详细地址"
            type="textarea"
            rows={3}
            showWordLimit
            maxLength={140}
            border={false}
            style={{ paddingHorizontal: 0 }}
          />
        </Form.Item>
      </View>
    </Form>
  )
}
`}},title:"表单项类型",identifier:"form-type",lang:"tsx",meta:{title:"表单项类型"}},{Component:P,key:"form-list",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'

import { AddO } from 'react-native-system-icon'
import { Button, Form, Field, Toast } from 'react-native-system-ui'

export default function FormListDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ users: [{ name: '', age: '' }] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, idx) => (
              <View key={field.key} style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#969799',
                    paddingVertical: 12,
                    lineHeight: 16,
                  }}
                >
                  用户 {idx + 1}
                </Text>
                <Form.Item name={[field.name, 'name']}>
                  <Field label="姓名" placeholder="请输入姓名" clearable />
                </Form.Item>
                <Form.Item name={[field.name, 'age']}>
                  <Field label="年龄" placeholder="请输入年龄" clearable />
                </Form.Item>
                <Button
                  size="small"
                  type="danger"
                  text="删除"
                  onPress={() => remove(idx)}
                  style={{ marginTop: 8 }}
                />
              </View>
            ))}
            <Button
              plain
              block
              icon={<AddO size={16} />}
              text="新增用户"
              onPress={() => add({ name: '', age: '' })}
            />
          </>
        )}
      </Form.List>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text } from 'react-native'

import { AddO } from 'react-native-system-icon'
import { Button, Form, Field, Toast } from 'react-native-system-ui'

export default function FormListDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ users: [{ name: '', age: '' }] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, idx) => (
              <View key={field.key} style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#969799',
                    paddingVertical: 12,
                    lineHeight: 16,
                  }}
                >
                  用户 {idx + 1}
                </Text>
                <Form.Item name={[field.name, 'name']}>
                  <Field label="姓名" placeholder="请输入姓名" clearable />
                </Form.Item>
                <Form.Item name={[field.name, 'age']}>
                  <Field label="年龄" placeholder="请输入年龄" clearable />
                </Form.Item>
                <Button
                  size="small"
                  type="danger"
                  text="删除"
                  onPress={() => remove(idx)}
                  style={{ marginTop: 8 }}
                />
              </View>
            ))}
            <Button
              plain
              block
              icon={<AddO size={16} />}
              text="新增用户"
              onPress={() => add({ name: '', age: '' })}
            />
          </>
        )}
      </Form.List>
    </Form>
  )
}
`}},title:"动态增减表单项",identifier:"form-list",lang:"tsx",meta:{title:"动态增减表单项"}},{Component:B,key:"form-popup",sources:{_:{tsx:`import React from 'react'

import {
  Button,
  Calendar,
  DatetimePicker,
  Field,
  Form,
  Picker,
  Popup,
  Toast,
  type PickerOption,
} from 'react-native-system-ui'

const cityColumns: PickerOption[] = [
  { label: '南京', value: '南京' },
  { label: '苏州', value: '苏州' },
  { label: '常州', value: '常州' },
  { label: '淮安', value: '淮安' },
  { label: '扬州', value: '扬州' },
  { label: '南通', value: '南通' },
  { label: '宿迁', value: '宿迁' },
  { label: '泰州', value: '泰州' },
  { label: '无锡', value: '无锡' },
]

const Fields: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const [cityVisible, setCityVisible] = React.useState(false)
  const [dateVisible, setDateVisible] = React.useState(false)
  const [calendarVisible, setCalendarVisible] = React.useState(false)

  const city = Form.useWatch('city', formRef) as string | undefined
  const date = Form.useWatch('date', formRef) as Date | undefined
  const calendar = Form.useWatch('calendar', formRef) as Date | undefined

  const formatDate = (val?: Date) => (val ? new Date(val).toLocaleDateString() : '')

  return (
    <>
      <Form.Item name="city" label="城市">
        <Field
          readOnly
          clickable
          isLink
          value={city ? String(city) : ''}
          placeholder="请选择城市"
          onClick={() => setCityVisible(true)}
        />
      </Form.Item>

      <Form.Item name="date" label="日期">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(date)}
          placeholder="请选择日期"
          onClick={() => setDateVisible(true)}
        />
      </Form.Item>

      <Form.Item name="calendar" label="日历">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(calendar)}
          placeholder="请选择日期"
          onClick={() => setCalendarVisible(true)}
          border={false}
        />
      </Form.Item>

      <Popup
        visible={cityVisible}
        placement="bottom"
        round
        onClose={() => setCityVisible(false)}
      >
        <Picker
          title="城市选择"
          columns={cityColumns}
          value={city}
          onConfirm={vals => {
            formRef.current?.setFieldsValue({ city: vals[0] })
            setCityVisible(false)
          }}
          onCancel={() => setCityVisible(false)}
        />
      </Popup>

      <DatetimePicker
        popup
        popupVisible={dateVisible}
        onPopupVisibleChange={setDateVisible}
        type="date"
        value={date ?? new Date()}
        onConfirm={val => formRef.current?.setFieldsValue({ date: val })}
        onCancel={() => setDateVisible(false)}
        showToolbar
      />

      <Calendar
        poppable
        visible={calendarVisible}
        onVisibleChange={setCalendarVisible}
        value={calendar}
        onConfirm={val => {
          const next = Array.isArray(val) ? val[0] : val
          formRef.current?.setFieldsValue({ calendar: next })
        }}
      />
    </>
  )
}

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Fields formRef={formRef} />
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import {
  Button,
  Calendar,
  DatetimePicker,
  Field,
  Form,
  Picker,
  Popup,
  Toast,
  type PickerOption,
} from 'react-native-system-ui'

const cityColumns: PickerOption[] = [
  { label: '南京', value: '南京' },
  { label: '苏州', value: '苏州' },
  { label: '常州', value: '常州' },
  { label: '淮安', value: '淮安' },
  { label: '扬州', value: '扬州' },
  { label: '南通', value: '南通' },
  { label: '宿迁', value: '宿迁' },
  { label: '泰州', value: '泰州' },
  { label: '无锡', value: '无锡' },
]

const Fields: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const [cityVisible, setCityVisible] = React.useState(false)
  const [dateVisible, setDateVisible] = React.useState(false)
  const [calendarVisible, setCalendarVisible] = React.useState(false)

  const city = Form.useWatch('city', formRef) as string | undefined
  const date = Form.useWatch('date', formRef) as Date | undefined
  const calendar = Form.useWatch('calendar', formRef) as Date | undefined

  const formatDate = (val?: Date) => (val ? new Date(val).toLocaleDateString() : '')

  return (
    <>
      <Form.Item name="city" label="城市">
        <Field
          readOnly
          clickable
          isLink
          value={city ? String(city) : ''}
          placeholder="请选择城市"
          onClick={() => setCityVisible(true)}
        />
      </Form.Item>

      <Form.Item name="date" label="日期">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(date)}
          placeholder="请选择日期"
          onClick={() => setDateVisible(true)}
        />
      </Form.Item>

      <Form.Item name="calendar" label="日历">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(calendar)}
          placeholder="请选择日期"
          onClick={() => setCalendarVisible(true)}
          border={false}
        />
      </Form.Item>

      <Popup
        visible={cityVisible}
        placement="bottom"
        round
        onClose={() => setCityVisible(false)}
      >
        <Picker
          title="城市选择"
          columns={cityColumns}
          value={city}
          onConfirm={vals => {
            formRef.current?.setFieldsValue({ city: vals[0] })
            setCityVisible(false)
          }}
          onCancel={() => setCityVisible(false)}
        />
      </Popup>

      <DatetimePicker
        popup
        popupVisible={dateVisible}
        onPopupVisibleChange={setDateVisible}
        type="date"
        value={date ?? new Date()}
        onConfirm={val => formRef.current?.setFieldsValue({ date: val })}
        onCancel={() => setDateVisible(false)}
        showToolbar
      />

      <Calendar
        poppable
        visible={calendarVisible}
        onVisibleChange={setCalendarVisible}
        value={calendar}
        onConfirm={val => {
          const next = Array.isArray(val) ? val[0] : val
          formRef.current?.setFieldsValue({ calendar: next })
        }}
      />
    </>
  )
}

export default () => {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Fields formRef={formRef} />
    </Form>
  )
}
`}},title:"弹层选择",identifier:"form-popup",lang:"tsx",meta:{title:"弹层选择"}},{Component:D,key:"form-custom",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Button, Field, Form, Picker, Popup, Space, Toast, type PickerOption } from 'react-native-system-ui'

interface MobileValue {
  prefix: string
  value: string
}

type MobileInputProps = {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

const areaCodeColumns: PickerOption[] = [
  { label: '+86', value: '86' },
  { label: '+1', value: '1' },
  { label: '+81', value: '81' },
]

const MobileInput: React.FC<MobileInputProps> = ({ value = { prefix: '86', value: '' }, onChange }) => {
  const [visible, setVisible] = React.useState(false)

  const trigger = (partial: Partial<MobileValue>) => {
    onChange?.({ ...value, ...partial })
  }

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 100, marginRight: 12 }}>
          <Field
            readOnly
            clickable
            isLink
            value={\`+\${value.prefix}\`}
            onClick={() => setVisible(true)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Field
            value={value.value}
            placeholder="请输入手机号"
            onChangeText={val => trigger({ value: val })}
          />
        </View>
      </View>

      <Popup
        visible={visible}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      >
        <Picker
          title="选择区号"
          columns={areaCodeColumns}
          value={value.prefix}
          onConfirm={vals => {
            trigger({ prefix: String(vals[0] ?? value.prefix) })
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}

export default function FormCustomDemo() {
  const formRef = Form.useForm()

  const checkMobile = (val?: MobileValue) => {
    if (val?.prefix && val?.value) return true
    return '请输入区号和手机号'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="name" label="姓名">
        <Field placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="手机号"
        initialValue={{ prefix: '86', value: '' }}
        rules={[{ validator: checkMobile }]}
        trigger="onChange"
        valuePropName="value"
      >
        <MobileInput />
      </Form.Item>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Button, Field, Form, Picker, Popup, Space, Toast, type PickerOption } from 'react-native-system-ui'

interface MobileValue {
  prefix: string
  value: string
}

type MobileInputProps = {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

const areaCodeColumns: PickerOption[] = [
  { label: '+86', value: '86' },
  { label: '+1', value: '1' },
  { label: '+81', value: '81' },
]

const MobileInput: React.FC<MobileInputProps> = ({ value = { prefix: '86', value: '' }, onChange }) => {
  const [visible, setVisible] = React.useState(false)

  const trigger = (partial: Partial<MobileValue>) => {
    onChange?.({ ...value, ...partial })
  }

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 100, marginRight: 12 }}>
          <Field
            readOnly
            clickable
            isLink
            value={\`+\${value.prefix}\`}
            onClick={() => setVisible(true)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Field
            value={value.value}
            placeholder="请输入手机号"
            onChangeText={val => trigger({ value: val })}
          />
        </View>
      </View>

      <Popup
        visible={visible}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      >
        <Picker
          title="选择区号"
          columns={areaCodeColumns}
          value={value.prefix}
          onConfirm={vals => {
            trigger({ prefix: String(vals[0] ?? value.prefix) })
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}

export default function FormCustomDemo() {
  const formRef = Form.useForm()

  const checkMobile = (val?: MobileValue) => {
    if (val?.prefix && val?.value) return true
    return '请输入区号和手机号'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="name" label="姓名">
        <Field placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="手机号"
        initialValue={{ prefix: '86', value: '' }}
        rules={[{ validator: checkMobile }]}
        trigger="onChange"
        valuePropName="value"
      >
        <MobileInput />
      </Form.Item>
    </Form>
  )
}
`}},title:"自定义表单项",identifier:"form-custom",lang:"tsx",meta:{title:"自定义表单项"}},{Component:S,key:"form-shouldupdate",sources:{_:{tsx:`import React from 'react'

import { Button, Field, Form, Selector, Toast } from 'react-native-system-ui'

const options = [
  { label: '手机号', value: 'mobile' },
  { label: '住址', value: 'address' },
]

export default function FormShouldUpdateDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ type: ['mobile'] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="type" label="联系方式" trigger="onChange">
        <Selector
          multiple
          options={options}
        />
      </Form.Item>

      <Form.Item shouldUpdate={(prev, next) => prev.type !== next.type}>
        {({ getFieldValue }) => {
          const selected = (getFieldValue('type') ?? []) as string[]

          return (
            <>
              {selected.includes('mobile') ? (
                <Form.Item name="mobile" label="手机号">
                  <Field placeholder="请输入手机号" clearable />
                </Form.Item>
              ) : null}

              {selected.includes('address') ? (
                <>
                  <Form.Item name="area" label="地区">
                    <Field placeholder="请输入地区" clearable />
                  </Form.Item>
                  <Form.Item name="address" label="详细地址">
                    <Field placeholder="请输入详细地址" border={false} />
                  </Form.Item>
                </>
              ) : null}
            </>
          )
        }}
      </Form.Item>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Field, Form, Selector, Toast } from 'react-native-system-ui'

const options = [
  { label: '手机号', value: 'mobile' },
  { label: '住址', value: 'address' },
]

export default function FormShouldUpdateDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ type: ['mobile'] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="type" label="联系方式" trigger="onChange">
        <Selector
          multiple
          options={options}
        />
      </Form.Item>

      <Form.Item shouldUpdate={(prev, next) => prev.type !== next.type}>
        {({ getFieldValue }) => {
          const selected = (getFieldValue('type') ?? []) as string[]

          return (
            <>
              {selected.includes('mobile') ? (
                <Form.Item name="mobile" label="手机号">
                  <Field placeholder="请输入手机号" clearable />
                </Form.Item>
              ) : null}

              {selected.includes('address') ? (
                <>
                  <Form.Item name="area" label="地区">
                    <Field placeholder="请输入地区" clearable />
                  </Form.Item>
                  <Form.Item name="address" label="详细地址">
                    <Field placeholder="请输入详细地址" border={false} />
                  </Form.Item>
                </>
              ) : null}
            </>
          )
        }}
      </Form.Item>
    </Form>
  )
}
`}},title:"条件渲染/shouldUpdate",identifier:"form-shouldupdate",lang:"tsx",meta:{title:"条件渲染/shouldUpdate"}},{Component:T,key:"form-subscribe",sources:{_:{tsx:`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const formatPairs = (values: Record<string, any>) =>
  Object.entries(values)
    .map(([key, value]) => \`\${key}: \${value ?? ''}\`)
    .join('，')

export default function FormSubscribeDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ a: '', b: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="a" label="字段 A">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>
      <Form.Item name="b" label="字段 B">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>

      <Form.Subscribe to={['a', 'b']}>
        {(changed, form) => (
          <Field
            readOnly
            label="最近变更"
            value={Object.keys(changed).length ? formatPairs(changed) : ''}
            placeholder="输入字段 A / 字段 B 触发"
            border={false}
          />
        )}
      </Form.Subscribe>
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const formatPairs = (values: Record<string, any>) =>
  Object.entries(values)
    .map(([key, value]) => \`\${key}: \${value ?? ''}\`)
    .join('，')

export default function FormSubscribeDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ a: '', b: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="a" label="字段 A">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>
      <Form.Item name="b" label="字段 B">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>

      <Form.Subscribe to={['a', 'b']}>
        {(changed, form) => (
          <Field
            readOnly
            label="最近变更"
            value={Object.keys(changed).length ? formatPairs(changed) : ''}
            placeholder="输入字段 A / 字段 B 触发"
            border={false}
          />
        )}
      </Form.Subscribe>
    </Form>
  )
}
`}},title:"订阅",identifier:"form-subscribe",lang:"tsx",meta:{title:"订阅"}},{Component:E,key:"form-watch",sources:{_:{tsx:`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const Values: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const username = Form.useWatch('username', formRef)
  const allValues = Form.useWatch(undefined, formRef)

  return (
    <>
      <Field readOnly label="实时用户名" value={username ? String(username) : ''} />
      <Field readOnly label="所有值" value={allValues ? JSON.stringify(allValues) : ''} border={false} />
    </>
  )
}

export default function FormWatchDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ username: 'Jack', phone: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="username" label="用户名">
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Values formRef={formRef} />
    </Form>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const Values: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const username = Form.useWatch('username', formRef)
  const allValues = Form.useWatch(undefined, formRef)

  return (
    <>
      <Field readOnly label="实时用户名" value={username ? String(username) : ''} />
      <Field readOnly label="所有值" value={allValues ? JSON.stringify(allValues) : ''} border={false} />
    </>
  )
}

export default function FormWatchDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ username: 'Jack', phone: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="username" label="用户名">
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Values formRef={formRef} />
    </Form>
  )
}
`}},title:"useWatch",identifier:"form-watch",lang:"tsx",meta:{title:"useWatch"}}],he={simulator:{compact:!0}},be=[{depth:1,text:"Form 表单",id:"form-表单"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"校验规则",id:"校验规则"},{depth:3,text:"表单项类型",id:"表单项类型"},{depth:3,text:"动态增减表单项",id:"动态增减表单项"},{depth:3,text:"弹层选择",id:"弹层选择"},{depth:3,text:"自定义表单项",id:"自定义表单项"},{depth:3,text:"条件渲染/shouldUpdate",id:"条件渲染shouldupdate"},{depth:3,text:"订阅",id:"订阅"},{depth:3,text:"useWatch",id:"usewatch"},{depth:2,text:"API",id:"api"},{depth:3,text:"Form Props",id:"form-props"},{depth:3,text:"Form 实例方法",id:"form-实例方法"},{depth:3,text:"Form.Item Props",id:"formitem-props"},{depth:3,text:"规则结构",id:"规则结构"},{depth:3,text:"订阅与监听",id:"订阅与监听"}],xe="/docs/components/form.md",ve="Form 表单",ye="1766029030000",yr=t=>t.children({MdContent:fe,demos:Fe,frontmatter:he,slugs:be,filePath:xe,title:ve,updatedTime:ye});export{fe as MdContent,yr as default,Fe as demos,xe as filePath,he as frontmatter,be as slugs,ve as title,ye as updatedTime};
