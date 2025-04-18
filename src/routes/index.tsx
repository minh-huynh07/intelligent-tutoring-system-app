import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import {
  AuthenticationPage,
  AccountPage,
  AccountStatPage,
  CourseWatchPage,
  AdminCoursePage,
  LoginSuccessPage,
} from '@/pages';
import AdminLecturePage from '@/pages/admin/AdminLecturePage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* index route (= "/" ) */}
          <Route index element={<AuthenticationPage />} />

          {/* các route còn lại */}
          <Route path='authentication' element={<AuthenticationPage />} />
          <Route path='login-success' element={<LoginSuccessPage />} />
          
          <Route path='my-account' element={<AccountPage />}>
            <Route path='stats' element={<AccountStatPage />} />
          </Route>

          <Route path='courses/watch' element={<CourseWatchPage />} />
          <Route path='admin/courses' element={<AdminCoursePage />} />
          <Route path='admin/lectures' element={<AdminLecturePage />} />

          {/* redirect fallback */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
