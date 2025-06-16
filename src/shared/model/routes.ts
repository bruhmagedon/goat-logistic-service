import 'react-router-dom';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  LOGISTICS_NETWORK: '/logistics-network',
} as const;

// export type PathParams = {
//   [ROUTES.BOARD]: {
//     boardId: string;
//   };
// };

// declare module "react-router-dom" {
//   interface Register {
//     params: PathParams;
//   }
// }
