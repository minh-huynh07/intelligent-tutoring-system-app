import React from 'react'
import { Form, Input, Button, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/es/upload'

import './styles.scss'

interface CreateLectureFormState {
  title: string
  chapter?: string
  heroes?: string
  video?: RcFile | null
  materials?: RcFile | null
}

const CreateLectureForm: React.FC = () => {
  const [form] = Form.useForm<CreateLectureFormState>()

  const handleFinish = (data: any) => {
    // TODO: Handle submit creating lecture
  }

  return (
    <div className='create-lecture-form'>
      <h2 className='create-lecture-form__title'>Create Lecture</h2>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Lecture Title'
          name='title'
          rules={[{ required: true, message: 'Please input lecture title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label='Chapter' name='chapter' rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item label='Target Heroes' name='heroes' rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='video'
          label='Upload'
          valuePropName='file'
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            beforeUpload={() => false} // prevent auto upload
            customRequest={({ onSuccess }) => {
              setTimeout(() => {
                onSuccess?.('ok')
              }, 0)
            }}
            listType='picture-card'
            accept='video/*'
          >
            <button style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }} type='button'>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item
          name='material'
          label='Material'
          valuePropName='material-file'
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            beforeUpload={() => false} // prevent auto upload
            // customRequest={({ onSuccess }) => {
            //   setTimeout(() => {
            //     onSuccess?.('ok')
            //   }, 0)
            // }}
            listType='picture-card'
            accept='image/*'
          >
            <button style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }} type='button'>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item label={null}>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateLectureForm
