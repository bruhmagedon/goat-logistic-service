import { publicRqClient } from '@/shared/api/instance';
import { ApiSchemas } from '@/shared/api/schema';
import { useAuthStore } from '@/shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const storeLogin = useAuthStore((state) => state.login);

  const loginMutation = publicRqClient.useMutation('post', '/auth/login', {
    onSuccess(data) {
      console.log('Успешный вход в систему, получены токены.');

      const user = storeLogin(data.access_token!, data.refresh_token!);

      console.log(`Пользователь ${user.username} вошел. Роль: ${user.role}. Перенаправление...`);

      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'shop':
          navigate('/shop');
          break;
        default:
          navigate('/factory');
      }
    },
    onError(error) {
      console.error('Ошибка входа:', error);
    },
  });

  const login = (data: ApiSchemas['authservice.LoginData']) => {
    loginMutation.mutate({ body: data });
  };

  return {
    login,
    isPending: loginMutation.isPending,
    error: loginMutation.error,
  };
}
