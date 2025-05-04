/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AdminAuthModal.tsx
import React from 'react'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthService from '@/services/AuthService' // your AuthService export
import AppLogo from '@/assets/main-logo.png'
import AdminModalThumbnailImg from '@/assets/admin-thumbnail.jpg'
import './styles.scss'
import { LoginRequestSchema, SignupRequestSchema } from '@/types/auth'
import { useUser } from '@/contexts/UserContext'

interface AdminAuthModalProps {
  mode: 'login' | 'signup'
}

const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ mode }) => {
  const navigate = useNavigate()
  const { setUser: _setUser } = useUser()
  const [loading, setLoading] = React.useState<{ login: boolean; signup: boolean }>({
    login: false,
    signup: false
  })

  const onLoginFinish = async (values: LoginRequestSchema) => {
    setLoading((l) => ({ ...l, login: true }))
    try {
      const { user: data } = await AuthService.login(values)
      toast.success('Logged in successfully!')
      localStorage.setItem('user', JSON.stringify(data))
      _setUser(data)
      navigate('/admin/courses')
    } catch (err) {
      console.error(err)
      toast.error('Login failed: ' + (err as any).message)
    } finally {
      setLoading((l) => ({ ...l, login: false }))
    }
  }

  const onSignupFinish = async (values: SignupRequestSchema) => {
    setLoading((l) => ({ ...l, signup: true }))
    try {
      await AuthService.signUp(values)
      toast.success('Account created! Please log in.')
      navigate('/admin/login')
    } catch (err) {
      console.error(err)
      toast.error('Signup failed: ' + (err as any).message)
    } finally {
      setLoading((l) => ({ ...l, signup: false }))
    }
  }

  return (
    <div className='admin-modal'>
      <div className='admin-modal__thumbnail'>
        <img src={AdminModalThumbnailImg} alt='Admin Modal Thumbnail' />
      </div>

      <div className='admin-modal__content'>
        <div className='content__logo'>
          <img src={AppLogo} alt='App Logo' />
        </div>

        <h2 className='auth-title'>{mode === 'login' ? 'Admin Portal – Login' : 'Admin Portal – Sign Up'}</h2>
        <p className='auth-subtitle'>This portal is for course instructors and administrators only.</p>

        {mode === 'login' ? (
          <Form name='admin_login' layout='vertical' onFinish={onLoginFinish}>
            <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Please enter your email!' }]}>
              <Input placeholder='admin@yourdomain.com' disabled={loading.login} />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password placeholder='Enter your password' disabled={loading.login} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block loading={loading.login}>
                Login
              </Button>
            </Form.Item>
            <div className='switch-mode'>
              <span>
                Don’t have an admin account? <a onClick={() => navigate('/admin/signup')}>Sign up</a>
              </span>
            </div>
          </Form>
        ) : (
          <Form name='admin_signup' layout='vertical' onFinish={onSignupFinish}>
            <Form.Item
              name='name'
              label='Full Name'
              rules={[{ required: true, message: 'Please enter your full name!' }]}
            >
              <Input placeholder='John Doe' disabled={loading.signup} />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Please enter your email!' }]}>
              <Input placeholder='admin@yourdomain.com' disabled={loading.signup} />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[{ required: true, message: 'Please create a password!' }]}
            >
              <Input.Password placeholder='Create a password' disabled={loading.signup} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block loading={loading.signup}>
                Sign Up
              </Button>
            </Form.Item>
            <div className='switch-mode'>
              <span>
                Already have an admin account? <a onClick={() => navigate('/admin/login')}>Login</a>
              </span>
            </div>
          </Form>
        )}
      </div>
    </div>
  )
}

export default AdminAuthModal
