import { Layout } from '@/features/layout';
import AdminLayout from '@/features/layout/admin-layout';
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
                lazy: () => import('@/features/product-catalog/product-list.page'),
              },
              {
                path: ROUTES.PRODUCT_DETAIL,
                lazy: () => import('@/features/shop/pages/product.page'),
              },
              {
                path: ROUTES.CART_AND_ORDERS,
                lazy: () => import('@/features/orders/orders.page'),
              },
              {
                path: ROUTES.PRODUCTS,
                lazy: () => import('@/features/factory-products/factory-product-list.page'),
              },
              {
                path: ROUTES.DELIVERIES,
                lazy: () => import('@/features/factory-deliveries/deliveries.page'),
              },
              {
                path: ROUTES.FACTORY_PROFILE,
                lazy: () => import('@/features/factory-profile/factory-profile.page'),
              },
              {
                path: ROUTES.SHOP_PROFILE,
                lazy: () => import('@/features/user-profile/user-profile.page'),
              },
              {
                path: ROUTES.FACTORY_PROFILE,
                lazy: () => import('@/features/factory-profile/factory-profile.page'),
              },
            ],
          },
          {
            element: <AdminLayout />,
            children: [
              {
                path: ROUTES.DASHBOARD,
                lazy: () => import('@/features/admin-main/admin.page'),
              },
              {
                path: ROUTES.USER_MANAGEMENT,
                lazy: () => import('@/features/admin-products/admin-products.page'),
              },
              {
                path: ROUTES.PRODUCT_MANAGEMENT,
                lazy: () => import('@/features/admin-users/page'),
              },
              {
                path: ROUTES.NETWORK_MONITORING,
                lazy: () => import('@/features/admin-network-monitoring/page'),
              },
            ],
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page'),
      },
      {
        // TODO: Немного костыль, что у любого юзера будет редирект на каталог (но пока пофиг)
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.CATALOG),
      },
    ],
  },
]);
