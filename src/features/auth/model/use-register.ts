import { publicRqClient } from '@/shared/api/instance';
import { ApiSchemas } from '@/shared/api/schema';
import { useNavigate } from 'react-router-dom';

// Отделение бизнес логики работы с логином от ui формы
export function useRegister() {
  const navigate = useNavigate();

  const loginMutation = publicRqClient.useMutation('post', '/auth/register', {
    onSuccess(data) {
      session.login(data.accessToken);
      navigate(ROUTES.HOME);
    },
  });

  const register = (data: ApiSchemas['authservice.RegisterData']) => {
    loginMutation.mutate({ body: data });
  };

  const errorMessage = loginMutation.isError ? loginMutation.error.message : undefined;

  return {
    register,
    isPending: loginMutation.isPending,
    errorMessage,
  };
}
