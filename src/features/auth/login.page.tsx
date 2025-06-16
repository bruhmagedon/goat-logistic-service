import { AuthLayout } from './ui/auth-layout';
import { LoginForm } from './ui/login-form';

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      form={<LoginForm />}
    />
  );
}

export const Component = LoginPage;
