import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import Chat from '../pages/Chat';
import Conversation from '../pages/Conversation';

export const router = createBrowserRouter([
  // 🔑 Auth Flow
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },

  // 💬 App Flow (bảo vệ bằng ProtectedRoute)
  {
    element: <ProtectedRoute />, // kiểm tra token
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Chat /> }, // trang chính hiển thị danh sách chat
          { path: 'conversation/:id', element: <Conversation /> },
        ],
      },
    ],
  },

  // 🚫 Fallback
  { path: '*', element: <NotFound /> },
]);
