import { BrowserRouter, Routes, Route } from 'react-router'
import AuthenticationPage from '@/pages/AuthenticationPage'
import MainLayout from '@/layouts/MainLayout'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/authentication' element={<AuthenticationPage />} />
          {/* <Route path='/account' element={<AccountPage />} /> */}
          {/* <Route path='/admin/videos' element={<AdminVideosPage />} /> */}
          {/* <Route path='/videos' element={<VideosPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
