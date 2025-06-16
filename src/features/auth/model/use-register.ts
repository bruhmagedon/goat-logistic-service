import { publicRqClient } from '@/shared/api/instance';
import { ApiSchemas } from '@/shared/api/schema';
import { useAuthStore } from '@/shared/hooks/useAuth';
import { generateRandomInn } from '@/shared/lib/helpers/generateRandomInn';
import { ROUTES } from '@/shared/model/routes';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const registerMutation = publicRqClient.useMutation('post', '/auth/register', {
    onSuccess(data) {
      console.log('Успешная регистрация, получены токены.');
      const user = loginUser(data.access_token!, data.refresh_token!);

      console.log(`Пользователь ${user.username} вошел. Роль: ${user.role}. Перенаправление...`);

      switch (user.role) {
        case 'shop':
          navigate(ROUTES.CATALOG);
          break;
        case 'factory':
          navigate(ROUTES.PRODUCTS);
          break;
        default:
          navigate(ROUTES.DASHBOARD);
      }
    },
    onError(error) {
      console.error('Ошибка регистрации:', error);
    },
  });

  const register = (data: Omit<ApiSchemas['authservice.RegisterData'], 'inn'>) => {
    const registrationData: ApiSchemas['authservice.RegisterData'] = {
      ...data,
      inn: generateRandomInn(),
    };

    registerMutation.mutate({ body: registrationData });
  };

  return {
    register,
    isPending: registerMutation.isPending,
    error: registerMutation.error,
  };
}
