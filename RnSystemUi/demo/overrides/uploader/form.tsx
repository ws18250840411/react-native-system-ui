import React from 'react'

import { Button, Form, Uploader, type UploaderValueItem } from 'react-native-system-ui'

import { useNativeImagePickerUpload } from './utils'

type AvatarUploaderProps = {
  value?: string
  onChange?: (val?: string) => void
}

const AvatarUploader = (props: AvatarUploaderProps) => {
  const [files, setFiles] = React.useState<UploaderValueItem[]>([])
  const idRef = React.useRef(0)
  const onUpload = useNativeImagePickerUpload({ maxCount: 1 })

  React.useEffect(() => {
    if (props.value === undefined) return
    if (!files[0] || props.value !== files[0].url) {
      setFiles([{ url: props.value, key: idRef.current++ }])
    }
  }, [files, props.value])

  const innerChange = (items: UploaderValueItem[]) => {
    setFiles(items)
    props.onChange?.(items[0]?.url)
  }

  return (
    <Uploader value={files} maxCount={1} onUpload={onUpload} onChange={innerChange} />
  )
}

export default () => {
  const formRef = Form.useForm()
  const onUploadFiles = useNativeImagePickerUpload({ multiple: true })

  return (
    <Form
      ref={formRef}
      colon
      style={{ paddingHorizontal: 12 }}
      onFinish={values => console.log(values)}
      footer={(
        <Button
          style={{ marginTop: 20 }}
          onPress={() => formRef.current?.submit()}
          type="primary"
          round
          block
          text="确认"
        />
      )}
    >
      <Form.Item
        rules={[{ required: true, message: '请上传头像' }]}
        label="上传头像"
        name="avatar"
        initialValue="https://iili.io/NZiS9e.png"
      >
        <AvatarUploader />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: '请上传附件' }]}
        label="上传附件"
        name="files"
        valuePropName="value"
        trigger="onChange"
      >
        <Uploader accept="*" multiple onUpload={onUploadFiles} />
      </Form.Item>
    </Form>
  )
}

