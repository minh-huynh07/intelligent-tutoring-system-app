// src/features/lectures/CreateLectureForm.tsx
import React, { useState } from 'react'
import { Form, Input, Button, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/es/upload'
import { toast } from 'react-toastify'
import './styles.scss'

interface CreateLectureFormState {
  title: string
  courseID: string
  video?: RcFile[] // note: Upload fileList is RcFile[]
}

const CreateLectureForm: React.FC = () => {
  const [form] = Form.useForm<CreateLectureFormState>()
  const [loading, setLoading] = useState(false)

  const handleFinish = async (values: CreateLectureFormState) => {
    setLoading(true)
    try {
      toast.success('Lecture created successfully!')
      form.resetFields()
    } catch (error) {
      console.error(error)
      toast.error('Failed to create lecture.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='create-lecture-form'>
      <h2 className='create-lecture-form__title'>Create Lecture</h2>
      <Form
        form={form}
        name='create-lecture'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
        autoComplete='off'
      >
        <Form.Item
          label='Lecture Title'
          name='title'
          rules={[{ required: true, message: 'Please input lecture title!' }]}
        >
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item
          label='Course ID'
          name='courseID'
          rules={[{ required: true, message: 'Please input your course ID!' }]}
        >
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item
          name='video'
          label='Upload'
          valuePropName='fileList'
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            beforeUpload={() => false}
            customRequest={({ onSuccess }) => {
              setTimeout(() => onSuccess?.('ok'), 0)
            }}
            listType='picture-card'
            accept='video/*'
            disabled={loading}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateLectureForm
