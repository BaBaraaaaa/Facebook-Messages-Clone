import { Navigate, Outlet } from 'react-router-dom';

// Ví dụ check token từ localStorage, bạn có thể dùng Redux/Context
export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
