import { BrowserRouter, Routes, Route } from 'react-router'

import MainLayout from '@/layouts/MainLayout'
import { AuthenticationPage, AccountPage, AccountStatPage, CourseWatchPage } from '@/pages'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/authentication' element={<AuthenticationPage />} />
          <Route path='/my-account' element={<AccountPage />}>
            <Route path='stats' element={<AccountStatPage />} />
          </Route>

          <Route path='/courses/watch' element={<CourseWatchPage />} />

          {/* <Route path='/account' element={<AccountPage />} /> */}
          {/* <Route path='/admin/videos' element={<AdminVideosPage />} /> */}
          {/* <Route path='/videos' element={<VideosPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
