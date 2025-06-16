import { useAuthStore } from '@/shared/hooks/useAuth';
import { ROUTES } from '@/shared/model/routes';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
};
