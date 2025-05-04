// src/components/AdminLoginPage.tsx
import AdminAuthModal from '@/features/auth/components/AdminAuthModal'
import React from 'react'

const AdminLoginPage: React.FC = () => {
  return <AdminAuthModal mode='login' />
}

export default AdminLoginPage
