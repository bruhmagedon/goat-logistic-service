import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { useAuthStore } from '../hooks/useAuth';
import { CONFIG } from '../model/config';
import { ApiPaths } from './schema';

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});
export const rqClient = createClient(fetchClient);

export const publicFetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});
export const publicRqClient = createClient(publicFetchClient);

fetchClient.use({
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async onRequest({ request }) {
    const { accessToken } = useAuthStore();

    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    } else {
      return new Response(
        JSON.stringify({
          code: 'NOT_AUTHOIZED',
          message: 'You are not authorized to access this resource',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
  },
});
