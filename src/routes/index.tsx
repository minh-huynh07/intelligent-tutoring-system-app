// src/AppRouter.tsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

// Public/User pages & guard
import HomePage from '@/pages/home/HomePage'

import UserRoute from '@/components/PrivateRoute/UserRoute'

// Admin pages & guard

import InstructorHomePage from '@/pages/admin/ListPage'
import AdminCoursePage from '@/pages/admin/AdminCoursePage'
import AdminLecturePage from '@/pages/admin/AdminLecturePage'
import AdminRoute from '@/components/PrivateRoute/AdminRoute'
import {
  AccountPage,
  AccountStatPage,
  AdminLoginPage,
  AdminSignUpPage,
  AuthenticationPage,
  CourseWatchPage,
  LoginSuccessPage
} from '@/pages'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap tất cả trong MainLayout */}
        <Route element={<MainLayout />}>
          {/* === Public/User routes === */}
          <Route
            index
            element={
              <UserRoute>
                <HomePage />
              </UserRoute>
            }
          />
          <Route path='authentication' element={<AuthenticationPage />} />
          <Route path='login-success' element={<LoginSuccessPage />} />

          <Route
            path='my-account/*'
            element={
              <UserRoute>
                <Routes>
                  <Route index element={<AccountPage />} />
                  <Route path='stats' element={<AccountStatPage />} />
                </Routes>
              </UserRoute>
            }
          />

          <Route
            path='courses/watch'
            element={
              <UserRoute>
                <CourseWatchPage />
              </UserRoute>
            }
          />

          {/* === Admin routes === */}
          <Route path='admin'>
            {/* — Auth không cần wrapper */}
            <Route path='login' element={<AdminLoginPage />} />
            <Route path='signup' element={<AdminSignUpPage />} />

            {/* — Tất cả các route con dưới đây sẽ phải pass AdminRoute */}
            <Route element={<AdminRoute />}>
              <Route path='courses'>
                <Route index element={<InstructorHomePage />} /> {/* /admin/courses */}
                <Route path='new' element={<AdminCoursePage />} /> {/* /admin/courses/new */}
              </Route>
              <Route path='lectures'>
                <Route index element={<AdminLecturePage />} /> {/* /admin/lectures */}
                <Route path='new' element={<AdminLecturePage />} /> {/* /admin/lectures/new */}
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
