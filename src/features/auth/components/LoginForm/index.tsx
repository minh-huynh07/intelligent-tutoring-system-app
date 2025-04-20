import { Button, Form, Input } from 'antd'

import './styles.scss'

type FieldType = {
  email?: string
  password?: string
}

const RegisterForm: React.FC = () => {
  const [_form] = Form.useForm<FieldType>()

  const handleSubmit = (values: FieldType) => {
    console.log('Form values:', values)
    // TODO: Handle submitting register
  }

  return (
    <Form
      name='basic'
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      // onFinishFailed={onFinishFailed}
      autoComplete='off'
      className='register-form'
    >
      <Form.Item<FieldType>
        name='email'
        className='register-form__form-item'
        rules={[{ required: true, message: 'Please input your email address!' }]}
      >
        <Input placeholder='Email Address' className='register-form__input' />
      </Form.Item>

      <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder='Password' className='register-form__input' />
      </Form.Item>

      <Form.Item label={null} className='register-form__form-item'>
        <Button type='primary' htmlType='submit' className='register-form__submit-btn'>
          Create Account
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm
