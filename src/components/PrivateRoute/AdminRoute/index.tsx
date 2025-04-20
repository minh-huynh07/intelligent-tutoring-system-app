// src/components/PrivateRoute/AdminRoute.tsx
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'

const AdminRoute: React.FC = () => {
  const { user } = useUser()
  const location = useLocation()

  if (!user) {
    // chưa login → chuyển sang admin login
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }
  if (!user.isAdmin) {
    // đã login nhưng không phải admin → về trang chủ
    return <Navigate to="/" replace />
  }
  // OK, render các route con
  return <Outlet />
}

export default AdminRoute
