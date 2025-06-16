import { ROUTES } from '@/shared/model/routes';
import { createBrowserRouter } from 'react-router-dom';
import { App } from './app';
import { AppProviders } from './providers';

export const appRouter = createBrowserRouter([
  {
    element: (
      <AppProviders>
        <App />
      </AppProviders>
    ),
    children: [
      {
        element: (
          <>
            <div />
          </>
        ),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page'),
      },
    ],
  },
]);
