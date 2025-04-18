import React from 'react'
import { Form, Input, Button, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './styles.scss'

interface CreateCourseFormState {
  title: string
  description?: string
  heroes?: string
  instructorID: number
}

const CreateCourseForm: React.FC = () => {
  const [form] = Form.useForm<CreateCourseFormState>()

  const handleFinish = (data: any) => {
    console.log(data);
    // TODO: Handle submit creating course
  }

  return (
    <div className='create-course-form'>
      <h2 className='create-course-form__title'>Create Course</h2>
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
          label='Instructor ID'
          name='instructorID'
          rules={[{ required: true, message: 'Please input your instructor ID!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Course Title'
          name='title'
          rules={[{ required: true, message: 'Please input course title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label='Description' name='description' rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item label='Target Heroes' name='heroes' rules={[]}>
          <Input />
        </Form.Item>



        {/* <Form.Item
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
        </Form.Item> */}

        <Form.Item label={null}>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateCourseForm
