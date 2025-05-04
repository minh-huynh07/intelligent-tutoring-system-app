// src/features/lectures/CreateLectureForm.tsx
import React, { useState } from 'react'
import { Form, Input, Button, Upload, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/es/upload'
import { toast } from 'react-toastify'
import './styles.scss'
import LectureService from '@/services/LectureService'
import { useUser } from '@/contexts/UserContext'

interface CreateLectureFormState {
  title: string
  video?: RcFile[]
}

const CreateLectureForm: React.FC = () => {
  const [form] = Form.useForm<CreateLectureFormState>()
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  const handleFinish = async (values: CreateLectureFormState) => {
    const file = values.video?.[0]
    if (!file) return toast.error('Please upload a video')

    const fileWrapper = file as unknown as { originFileObj: File }
    const realFile = fileWrapper.originFileObj
    setLoading(true)
    try {
      // 1. Lấy presigned URL
      const { url, video_id } = await LectureService.getPresignedUrl()
      // console.log(url)
      // console.log(video_id)
      // 2. Upload video lên S3
      await LectureService.uploadToS3(url, realFile)

      // 3. Gửi metadata về backend
      await LectureService.createVideoLecture({
        video_s3_key: video_id,
        title: values.title,
        type: 'VIDEO',
        visibility: 'PUBLIC',
        user_id: `${user?.id}`,
        processing_status: ''
      })

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

      {/* Spin sẽ che phủ form khi loading=true */}
      <Spin spinning={loading}>
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
            name='video'
            label='Upload'
            valuePropName='fileList'
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[{ required: true, message: 'Please upload a video file' }]}
          >
            <Upload beforeUpload={() => false} listType='picture-card' accept='video/mp4' disabled={loading}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit' disabled={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
}

export default CreateLectureForm
