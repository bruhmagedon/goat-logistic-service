
import { Layout } from '@/features/layout';
import { ROUTES } from '@/shared/model/routes';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { App } from './app';
import { ProtectedRoute } from './protected-route';
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
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: ROUTES.CATALOG,
                lazy: () => import("@/features/product-catalog/product-list.page"),
              },
            
              {
                path: ROUTES.PRODUCT_DETAIL,
                lazy: () => import('@/features/shop/pages/product.page'),
              },
            ],
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page"),
      },
     
      {
        // TODO: Поменять на
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.CATALOG),
      },
    ],
  },
]);
