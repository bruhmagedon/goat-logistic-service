import { AuthLayout } from './ui/auth-layout';
import { RegisterForm } from './ui/register-form';

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Зарегистрируйтесь в логистической системе"
      form={<RegisterForm />}
    />
  );
}

export const Component = RegisterPage;
