import { Routes, Route } from 'react-router-dom'
import { AuthenticationPage } from '@/pages'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/authentication" element={<AuthenticationPage />} />
      {/* ...other routes */}
    </Routes>
  )
}

