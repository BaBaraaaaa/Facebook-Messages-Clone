import { Navigate, Outlet } from 'react-router-dom';
import {  useAppSelector } from '../redux/hook';

// Ví dụ check token từ localStorage, bạn có thể dùng Redux/Context
export default function ProtectedRoute() {
  const token = useAppSelector((s) => s.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
