// src/components/RequireAuth.tsx
import { useUser } from '@/contexts/UserContext'
import React, { JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface RequireAuthProps {
  children: JSX.Element
}

const UserRoute: React.FC<RequireAuthProps> = ({ children }) => {
  const { user } = useUser()
  const location = useLocation()

  if (!user) {
    // Redirect về trang login, giữ lại nơi đã vào để có thể navigate về sau
    return <Navigate to="/authentication" state={{ from: location }} replace />
  }

  return children
}

export default UserRoute
