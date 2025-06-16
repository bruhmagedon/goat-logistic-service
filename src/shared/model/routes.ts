export const ROUTES = {
  // Другие Роуты
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CATALOG: '/shop',
  NOT_FOUND: '*',
  // Роуты Потребителя
  PRODUCT_DETAIL: '/shop/product/:productId',
  CART_AND_ORDERS: '/shop/cart_and_orders',
  SHOP_PROFILE: '/shop/profile',
  // Роуты Поставщика
  PRODUCTS: '/factory/products',
  DELIVERIES: '/factory/deliveries',
  FACTORY_PROFILE: '/factory/profile',
  // Роуты Админа
  DASHBOARD: '/admin',
  USER_MANAGEMENT: '/admin/users',
  PRODUCT_MANAGEMENT: '/admin/products',
  NETWORK_MONITORING: '/admin/network-monitoring',
  ROUTE_FINDER: '/admin/route-finder',
} as const;
