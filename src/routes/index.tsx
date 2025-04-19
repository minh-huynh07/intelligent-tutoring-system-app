// src/AppRouter.tsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

// Public/User pages
import HomePage from '@/pages/home/HomePage'
import AdminLecturePage from '@/pages/admin/AdminLecturePage'
import {
  AccountPage,
  AccountStatPage,
  AdminCoursePage,
  AdminLoginPage,
  AdminSignUpPage,
  AuthenticationPage,
  CourseWatchPage,
  LoginSuccessPage
} from '@/pages'
import InstructorHomePage from '@/pages/admin/ListPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap tất cả trong MainLayout */}
        <Route element={<MainLayout />}>
          {/* === Public/User routes === */}
          <Route index element={<HomePage />} />
          <Route path='authentication' element={<AuthenticationPage />} />
          <Route path='login-success' element={<LoginSuccessPage />} />

          <Route path='my-account'>
            <Route index element={<AccountPage />} />
            <Route path='stats' element={<AccountStatPage />} />
          </Route>

          <Route path='courses'>
            <Route path='watch' element={<CourseWatchPage />} />
          </Route>

          {/* === Admin routes === */}
          <Route path='admin'>
            {/* — Auth */}
            <Route path='login' element={<AdminLoginPage />} />
            <Route path='signup' element={<AdminSignUpPage />} />

            {/* — Dashboard */}
            <Route path='courses'>
              <Route index element={<InstructorHomePage />} /> {/* /admin/courses — danh sách & quản lý */}
              <Route path='new' element={<AdminCoursePage />} /> {/* /admin/courses/new — tạo course mới */}
            </Route>
            <Route path='courses'>
              <Route path='new' element={<AdminLecturePage />} /> {/* /admin/courses/new — tạo course mới */}
            </Route>
            <Route path='lectures' element={<AdminLecturePage />} />
          </Route>

          {/* Fallback: nếu không khớp route nào, chuyển về Home */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
