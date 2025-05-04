// src/features/courses/CreateCourseForm.tsx
import React, { useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import CourseService from '@/services/CourseService'
import './styles.scss'
import { CourseCreatePayload, CourseType } from '@/types'
import { toast } from 'react-toastify'
import { useUser } from '@/contexts/UserContext'

const CreateCourseForm: React.FC = () => {
  const [form] = Form.useForm<CourseCreatePayload & { heroesInput: string }>()
  const [loading, setLoading] = useState(false)
  const { user } = useUser();

  const handleFinish = async (values: CourseCreatePayload & { heroesInput: string }) => {
    setLoading(true)
    try {
      // parse heroes comma-separated into number[]
      const heroes = values.heroesInput
        .split(',')
        .map((h) => parseInt(h.trim(), 10))
        .filter((n) => !isNaN(n))

      // prepare payload
      const payload: CourseCreatePayload = {
        title: values.title,
        description: values.description,
        type: values.type as CourseType,
        user_id: values.user_id,
        heroes
      }

      await CourseService.createCourse(payload)
      toast.success('Course created successfully!')
      form.resetFields()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong…')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='create-course-form'>
      <h2 className='create-course-form__title'>Create Course</h2>
      <Form
        form={form}
        name='create-course'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
        autoComplete='off'
        initialValues={{
          user_id: user?.id
        }}
      >
        <Form.Item
          label='Instructor ID'
          name='user_id'
          rules={[{ required: true, message: 'Please input instructor ID' }]}
        >
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Please input course title' }]}>
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <Input.TextArea rows={3} disabled={loading} />
        </Form.Item>

        <Form.Item label='Type' name='type' rules={[{ required: true, message: 'Please select a course type' }]}>
          <Select placeholder='Select course type' disabled={loading}>
            {Object.values(CourseType).map((t) => (
              <Select.Option key={t} value={t}>
                {t}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Target Heroes'
          name='heroesInput'
          rules={[{ required: true, message: 'Please input hero IDs separated by commas' }]}
        >
          <Input placeholder='e.g. 1,2,3' disabled={loading} />
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

export default CreateCourseForm
